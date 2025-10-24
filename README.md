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

