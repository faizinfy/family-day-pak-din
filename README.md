# Family Day Pak Din 2026 🐪✨

Laman web untuk **Family Day Keluarga Pak Din 2026** — tema *Arabian Nights*, di Kimi Chalet, Lekir.

**Live:** https://family-day-pak-din.vercel.app

## Halaman

| Laluan | Fail | Kegunaan |
|---|---|---|
| `/` | `index.html` | Laman utama: tarikh & lokasi, aturcara, acara games (permainan, peraturan, susunan & PIC), potluck, Tukar-Tukar Hadiah, Best Dress, AJK |
| `/lucky-draw` | `lucky-draw.html` | Cabutan bertuah: Lucky Draw 10 keluarga (dengan hadiah #10 → #1), Tukar Hadiah (Dewasa / Muda-Mudi / Kanak-kanak), Special Lucky Draw (semua peserta) |
| `/best-dress` | `best-dress.html` | Skrin dedah pemenang Best Dress (tirai, kiraan 3-2-1, confetti, suara) |
| `/game-prizes` | `game-prizes.html` | Skrin dedah pemenang tempat 1, 2, 3 bagi setiap permainan |

Halaman cabutan & dedah pemenang direka untuk **skrin desktop / projektor** (skrin penuh).

## Kemaskini data

- **Nama peserta, keluarga & hadiah Lucky Draw** — `assets/names.js` (dikongsi oleh `index.html` dan `lucky-draw.html`).
- **Permainan & peraturan** — senarai `GAMES` dalam `index.html`.
- **Senarai permainan untuk skrin pemenang** — senarai `GAMES` dalam `game-prizes.html`.
- **Gambar hadiah** — `assets/prizes/prize-01` hingga `prize-10`.

## Kawalan tersembunyi (hari acara)

| Halaman | Cara | Fungsi |
|---|---|---|
| `/best-dress` | `Shift+E` atau klik sudut kiri bawah | Masukkan nama pemenang Best Dress |
| `/game-prizes` | `Shift+E` atau klik sudut kiri bawah | Masukkan nama pemenang 🥇🥈🥉 bagi semua permainan |
| `/game-prizes` | `Space` · `←` `→` | Dedah tempat seterusnya · tukar permainan |
| `/lucky-draw` | `Space` / `Enter` | Cabut |

Nama pemenang dan keputusan cabutan disimpan dalam **browser itu sahaja** (localStorage). Gunakan laptop yang sama untuk masukkan nama dan untuk paparan pada hari acara.

Bunyi & suara (Web Audio + Web Speech) — gunakan Microsoft Edge atau Chrome untuk suara Bahasa Melayu online.

## Teknikal

- HTML/CSS/JS statik, tiada build step.
- Deploy automatik ke Vercel setiap kali push ke `main`. `vercel.json` (`cleanUrls`) membolehkan `/lucky-draw` dsb. tanpa `.html`.
- Untuk uji secara lokal, jalankan mana-mana static server di folder ini, contohnya:

  ```bash
  npx serve .
  ```
