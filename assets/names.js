// Shared name lists for index.html (Tukar-Tukar Hadiah) and lucky-draw.html.
// Edit names here only — both pages read from this file.
window.FD = {
  site: 'https://family-day-pak-din.vercel.app',

  // Shared photo album (Google Photos etc.). Leave url empty until it's ready —
  // the main page then says the link is coming soon, and /qr shows only the site QR.
  album: { url: 'https://photos.app.goo.gl/WbjyKHk9gxvnGcdJ6', name: 'Album Family Day Pak Din 2026' },

  // Tukar-Tukar Hadiah participants, by category
  gift: {
    dewasa: ['Asma', 'Azila', "Ca'e", 'Wan Nyah', 'Kak Long', 'Along', 'Mak Uda', 'Pak Uda', 'Ana', 'Paeh', 'Dayah', 'Mirul', 'Emy', 'Rahim', 'Ain', 'Heidi', 'Aya', 'Mak Lang', 'Pak Lang', 'Hanim', 'Hisham', 'Azim', 'Syuhada', 'Naim', 'Abg Man', 'Kak Mah', 'Syahirah', 'Syahir', 'Illiyana', 'Zamri', 'Ayu', 'Kay', "Le'a", 'Mak Long', 'Rahmat'],
    muda: ['Syafiqah', 'Syamim', 'Hadif', 'Haziq', 'Iqa', 'Aleesya', 'Haqimy', 'Hanis', 'Hadirah', 'Syafiq', 'Hairul', 'Aiman', 'Farina', 'Azib', 'Aqeela'],
    kanak: ['Medina', 'Aralyn', 'Aaira', 'Ayana', 'Matteen', 'Ilyas', 'Husna', 'Hafiya', 'Haikal', 'Ayyash', "I'zan", "Il'man"]
  },

  // Lucky Draw — 10 families (anak-anak Pak Din)
  families: ['Osman', 'Azila', 'Heidi', 'Asmawati', 'Zamri', 'Nor Lida', 'Hanim', 'Roslina', 'Rohana', 'Kak Mar'],

  // Lucky Draw prizes, hadiah #1 (top) to #10. img: product photo in assets/prizes.
  prizes: [
    { name: 'TEFAL Express Optimal Steam Generator Iron SV4111', img: 'assets/prizes/prize-01.jpg' },
    { name: 'VIVO Y27 5G', img: 'assets/prizes/prize-02.png' },
    { name: 'KHIND Electric Oven OT4500B', img: 'assets/prizes/prize-03.jpg' },
    { name: 'CASIO G-SHOCK (GD-B500-7DR) – White', img: 'assets/prizes/prize-04.jpg' },
    { name: 'SMEG Knife Set', img: 'assets/prizes/prize-05.jpg' },
    { name: 'PENSONIC Wired Stick Vacuum Cleaner PVC-1005H', img: 'assets/prizes/prize-06.jpg' },
    { name: 'MAG Air Fryer 4.5L AF4203', img: 'assets/prizes/prize-07.jpg' },
    { name: 'PERYSMITH High Speed Blender EasyCooking Series PS3250', img: 'assets/prizes/prize-08.jpg' },
    { name: 'PENSONIC Coffee Machine PCM-1902', img: 'assets/prizes/prize-09.jpg' },
    { name: 'PENSONIC Bread Toaster PT-929', img: 'assets/prizes/prize-10.jpg' }
  ],

  // Games with 1st/2nd/3rd winners (game-prizes.html, result.html), in the order they are played.
  // team: several names per place (Team / Berpasangan)
  games: [
    { id: 'cups', e: '🥤', name: 'Susun Paper Cups', cat: 'Sek Ren / Tadika' },
    { id: 'gula', e: '🍭', name: 'Cari Gula-gula dalam Tepung', cat: 'Sek Ren / Tadika' },
    { id: 'belon', e: '🎈', name: 'Rally Pass Belon', cat: 'Muda-Mudi', team: 'Team' },
    { id: 'bola', e: '⚽️', name: 'Pass Bola Guna Kain Pelikat', cat: 'Muda-Mudi', team: 'Team' },
    { id: 'belon-air', e: '🎈', name: 'Rally Pass Belon Berisi Air', cat: 'Dewasa', team: 'Berpasangan' },
    { id: 'suara', e: '🎙️', name: 'Teka Suara', cat: 'Warga Emas' },
    { id: 'mc-muda', e: '🪑', name: 'Musical Chair', cat: 'Muda-Mudi' },
    { id: 'mc-dewasa', e: '🪑', name: 'Musical Chair', cat: 'Dewasa' },
    { id: 'mc-adik', e: '🩴', name: 'Musical Chair / Sandals', cat: 'Adik-beradik' },
    { id: 'itik', e: '🐥', name: 'Tangkap Itik dalam Kolam', cat: 'Sek Ren / Tadika' }
  ]
};
