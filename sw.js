// Offline support: keeps every page, image, song and font on the device after the first visit,
// so the event screens still work if the chalet Wi-Fi drops.
// Pages & scripts: network first (fresh when online), cache when offline or slow.
// Images, songs & fonts: served from the cache, refreshed in the background.
const CACHE = 'fd-v1';
const FONTS = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,600;1,500&family=Poppins:wght@300;400;500;600&display=swap';
const FILES = [
  './', 'lucky-draw', 'game-prizes', 'best-dress', 'result', 'settings', 'qr',
  'assets/names.js', 'assets/offline.js', 'assets/music/music.js',
  'assets/icon-192.png', 'assets/logo.webp',
  ...Array.from({ length: 10 }, (_, i) => `assets/prizes/prize-${String(i + 1).padStart(2, '0')}.${i === 1 ? 'png' : 'jpg'}`),
  'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(FILES);
    // songs listed in music.js
    try {
      const js = await (await fetch('assets/music/music.js', { cache: 'no-store' })).text();
      const songs = [...js.replace(/\/\/.*$/gm, '').matchAll(/file:\s*['"]([^'"]+)['"]/g)].map(m => 'assets/music/' + m[1]);
      await c.addAll(songs);
    } catch (err) {}
    // the font files the font stylesheet points to (they depend on the browser)
    try {
      const css = await fetch(FONTS);
      await c.put(FONTS, css.clone());
      const urls = [...(await css.text()).matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]);
      await c.addAll(urls);
    } catch (err) {}
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

const timeout = ms => new Promise((_, no) => setTimeout(no, ms));
async function put(req, res) {
  if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
    const c = await caches.open(CACHE);
    await c.put(req, res.clone());
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;
  if (!same && !/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.host)) return;

  // a song requested in parts (Range) is answered with the whole cached file
  const key = req.headers.has('range') ? new Request(req.url) : req;
  const fresh = same && (req.mode === 'navigate' || /\.(js|html)$/.test(url.pathname) || !/\.\w+$/.test(url.pathname));

  if (fresh) {
    e.respondWith((async () => {
      try { return await put(key, await Promise.race([fetch(req), timeout(4000)])); }
      catch (err) {
        return (await caches.match(key, { ignoreSearch: true })) ||
          (req.mode === 'navigate' ? caches.match('./') : Response.error());
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const hit = await caches.match(key, { ignoreSearch: true });
    const net = fetch(key).then(res => put(key, res)).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || fetch(req);
  })());
});
