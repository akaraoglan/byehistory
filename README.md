# Bye History - Chrome Extension

This extension automatically clears your browsing history and related data when you sign out of Chrome or restart the browser. It also triggers cleanup when the device is locked or at regular intervals.

Installation

Download this folder.

Go to chrome://extensions and enable Developer mode.

Click "Load unpacked" and select this folder.

How It Works

Cleans data on startup and during installation/update.

Cleans when the device is locked (idle: locked).

Runs a periodic cleanup check every 30 minutes.

If the identity token cannot be retrieved, assumes sign-out and triggers cleanup.

Includes a 5-minute throttling mechanism to prevent redundant cleanups.

Permissions

browsingData, history, identity, idle, alarms, sessions, storage

Files

manifest.json

background.js

## Privacy Policy

ByeHistory does not collect, store, or share any personal data.  
All browsing data deletion happens locally on the user's device using Chrome's built-in `browsingData` API.  
No information is sent or stored on any external servers.


# Çıkışta Geçmişi Sil - Chrome Uzantısı

Bu uzantı, Chrome oturumundan çıkış yaptığınızda veya tarayıcı yeniden açıldığında geçmiş ve ilgili verileri otomatik olarak temizlemeye çalışır. Ayrıca cihaz kilitlendiğinde ve periyodik aralıklarla da temizlik tetiklenir.

## Kurulum
1. Bu klasörü indirin.
2. `chrome://extensions` > Geliştirici modu.
3. "Paketlenmemiş yükle" > bu klasörü seçin.

## Çalışma Prensibi
- Başlangıçta ve kurulum/güncellemede temizler.
- Cihaz kilitlenince (idle: locked) temizler.
- 30 dakikada bir periyodik kontrol yapar.
- `identity` belirteci alınamazsa çıkış varsayarak temizler.
- 5 dakikalık throttling ile gereksiz tekrarları engeller.

## İzinler
`browsingData`, `history`, `identity`, `idle`, `alarms`, `sessions`, `storage`

## Dosyalar
- `manifest.json`
- `background.js`

## Gizlilik Politikası

ByeHistory hiçbir kişisel veriyi toplamaz, saklamaz veya paylaşmaz.
Tüm gezinme verilerinin silinmesi, Chrome’un yerleşik browsingData API’si kullanılarak yerel olarak kullanıcının cihazında gerçekleşir.
Herhangi bir bilgi harici sunuculara gönderilmez veya depolanmaz.
