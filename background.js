// Silme işlemini güçlü hale getirmek için birden fazla tetikleyici kullanılır:
// - Kimlikten çıkış tespiti (identity token kaybı üzerinden dolaylı)
// - Tarayıcı yeniden açılışında (onStartup)
// - Uzantı güncellendiğinde/yüklendiğinde (onInstalled)
// - Sistem idle -> locked geçişinde (kilitlemede sil)
// - Periyodik alarm ile güvenlik ağı (ör. 30 dk)

const STORAGE_KEYS = {
  lastWipeTime: 'lastWipeTime',
};

const WIPE_INTERVAL_MS = 5 * 60 * 1000; // En az bu sıklıkla tekrarlama koruması

async function safeNow() {
  return Date.now();
}

async function shouldThrottle() {
  const { lastWipeTime } = await chrome.storage.local.get(STORAGE_KEYS.lastWipeTime);
  const now = await safeNow();
  if (!lastWipeTime) return false;
  return now - lastWipeTime < WIPE_INTERVAL_MS;
}

async function markWiped() {
  const now = await safeNow();
  await chrome.storage.local.set({ [STORAGE_KEYS.lastWipeTime]: now });
}

async function wipeAllHistory({ force = false } = {}) {
  if (!force && (await shouldThrottle())) {
    return;
  }

  try {
    // 1) Geçmişi doğrudan API ile sil (tüm zamanlar)
    await chrome.history.deleteAll();

    // 2) İlgili diğer artıkları da temizle (tüm zamanlar)
    await chrome.browsingData.remove({ since: 0 }, {
      cache: true,
      cookies: true,
      downloads: true,
      fileSystems: true,
      formData: true,
      indexedDB: true,
      localStorage: true,
      passwords: true,
      serviceWorkers: true,
      webSQL: true
    });

    await markWiped();
  } catch (err) {
    console.error('Geçmiş silme başarısız:', err);
  }
}

// Başlangıçta (tarayıcı açıldığında) temizle - throttling BYPASS
chrome.runtime.onStartup.addListener(() => {
  wipeAllHistory({ force: true });
});

// İlk kurulum veya güncellemede güvenlik amaçlı temizle - throttling BYPASS
chrome.runtime.onInstalled.addListener(() => {
  wipeAllHistory({ force: true });
});

// Cihaz kilitlenince veya kullanıcı uzun süre idle olduğunda tetikleyici - throttling BYPASS
chrome.idle.setDetectionInterval(60); // 60 sn
chrome.idle.onStateChanged.addListener((state) => {
  if (state === 'locked') {
    wipeAllHistory({ force: true });
  }
});

// Periyodik alarm ile güvenlik ağı (throttling açık)
chrome.alarms.create('periodicWipe', { periodInMinutes: 30 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'periodicWipe') {
    wipeAllHistory({ force: false });
  }
});

// Kimlik durumu değişimi: Access token alınamazsa kullanıcı çıkmış olabilir (throttling açık)
async function checkIdentityAndWipe() {
  try {
    await chrome.identity.getAuthToken({ interactive: false });
  } catch (e) {
    wipeAllHistory({ force: false });
  }
}

// Oturum değişikliklerinde tetikle (doğrudan event yok; aralıklı kontrol)
chrome.alarms.create('identityCheck', { periodInMinutes: 10 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'identityCheck') {
    checkIdentityAndWipe();
  }
});

// Uzantı yüklendiğinde ilk kimlik kontrolünü de yap
checkIdentityAndWipe();


