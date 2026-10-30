# Family Day Pak Din 2026 🐪✨

Laman web untuk **Family Day Keluarga Pak Din 2026** — tema *Arabian Nights*, di Kimi Chalet, Lekir.

**Live:** https://family-day-pak-din.vercel.app

## Halaman

| Laluan | Fail | Kegunaan |
|---|---|---|
| `/` | `index.html` | Laman utama: tarikh & lokasi, aturcara, acara games (permainan, peraturan, susunan & PIC), potluck, Tukar-Tukar Hadiah, Best Dress, AJK |
| `/lucky-draw` | `lucky-draw.html` | Cabutan bertuah: Lucky Draw 10 keluarga (dengan hadiah #10 → #1), Tukar Hadiah (Dewasa / Muda-Mudi / Kanak-kanak), Special Lucky Draw (semua peserta) |
| `/best-dress` | `best-dress.html` | Skrin dedah pemenang Best Dress (tirai, kiraan 3-2-1, confetti, suara) |
| `/game-prizes` | `game-prizes.html` | Skrin dedah pemenang tempat 1, 2, 3 bagi setiap permainan. Permainan Sek Ren / Tadika ada langkah ke-4: **Hadiah Saguhati** untuk semua kanak-kanak lain (selain 3 pemenang) |
| `/result` | `result.html` | Semua pemenang dalam satu halaman — salin ke WhatsApp atau cetak / PDF |
| `/settings` | `settings.html` | Kawalan acara: pautan ke semua skrin, ujian bunyi / suara / lagu, status mod luar talian, simpan & pulih keputusan, padam keputusan ujian |
| `/qr` | `qr.html` | Poster kod QR saiz A4 untuk dicetak (laman web, dan album gambar jika ada) |

Halaman cabutan & dedah pemenang direka untuk **skrin desktop / projektor** (skrin penuh).

## Kemaskini data

- **Nama peserta, keluarga & hadiah Lucky Draw** — `assets/names.js` (dikongsi oleh semua halaman).
- **Permainan & peraturan** — senarai `GAMES` dalam `index.html`.
- **Senarai permainan untuk skrin pemenang** — `games` dalam `assets/names.js` (tambah `team: 'Team'` atau `team: 'Berpasangan'` untuk benarkan beberapa nama setiap tempat; `saguhati: true` untuk tunjuk hadiah saguhati selepas 3 pemenang).
- **Gambar hadiah** — `assets/prizes/prize-01` hingga `prize-10`.
- **Lagu MP3** — letak fail dalam `assets/music/` dan tambah dalam `assets/music/music.js` (`start` / `end` dalam saat untuk main bahagian korus sahaja).
- **Album gambar** — isi `album.url` dalam `assets/names.js`. Laman utama akan tunjuk butang album, dan `/qr` akan tambah kod QR album.

## Mod luar talian

`sw.js` (service worker) menyimpan semua halaman, gambar hadiah, lagu & font dalam browser selepas lawatan pertama, supaya skrin acara masih berfungsi jika Wi-Fi chalet terputus. Buka `/settings` dengan internet sebelum acara — status **Mod luar talian** akan tunjuk "Sedia". Suara Bahasa Melayu (Edge / Chrome online voice) tetap perlukan internet.

Halaman & skrip sentiasa diambil baru bila ada internet. Jika **gambar atau lagu diganti dengan nama fail yang sama**, naikkan versi `CACHE` dalam `sw.js` (cth. `fd-v1` → `fd-v2`) supaya fail lama dibuang.

## Kawalan tersembunyi (hari acara)

| Halaman | Cara | Fungsi |
|---|---|---|
| `/best-dress` | `Shift+E` atau klik sudut kiri bawah | Masukkan nama pemenang Best Dress |
| `/game-prizes` | `Shift+E` atau klik sudut kiri bawah | Masukkan nama pemenang 🥇🥈🥉 bagi semua permainan. Permainan team & berpasangan boleh ada beberapa nama: pilih / taip nama dan tekan `Enter` (atau pisahkan dengan koma), `×` untuk buang |
| `/game-prizes` | `Space` · `←` `→` | Dedah tempat seterusnya · tukar permainan |
| `/game-prizes` | 🎁 Hadiah Saguhati (selepas tempat pertama, permainan Sek Ren / Tadika) | Senarai peserta Sek Ren / Tadika bermula dengan senarai Kanak-kanak; ubah di bahagian bawah `Shift+E` |
| `/lucky-draw` | `Space` / `Enter` | Cabut |
| `/lucky-draw` | 🚫 Tiada di sini — cabut semula | Special Lucky Draw: pemenang tiada → direkod sebagai tiada, cabutan semula. Klik nama dalam senarai "Tiada" untuk masukkan semula |

Nama pemenang dan keputusan cabutan disimpan dalam **browser itu sahaja** (localStorage). Gunakan laptop yang sama untuk masukkan nama dan untuk paparan pada hari acara. Di `/settings`, **⬇ Simpan ke fail** untuk backup (atau pindah ke laptop lain dengan **⬆ Muat naik fail**), dan **🗑️ Padam semua keputusan** untuk buang cabutan ujian sebelum acara.

Bunyi & suara (Web Audio + Web Speech) — gunakan Microsoft Edge atau Chrome untuk suara Bahasa Melayu online.

## Teknikal

- HTML/CSS/JS statik, tiada build step.
- `assets/common.js` — kod dikongsi oleh skrin acara: latar bintang, bunyi on/off, nota Web Audio & fanfare, suara Bahasa Melayu, confetti, skrin penuh.
- Deploy automatik ke Vercel setiap kali push ke `main`. `vercel.json` (`cleanUrls`) membolehkan `/lucky-draw` dsb. tanpa `.html`.
- Untuk uji secara lokal, jalankan mana-mana static server di folder ini, contohnya:

  ```bash
  npx serve .
  ```
