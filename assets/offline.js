// Offline support (see sw.js) + a small notice while there's no internet,
// because the Malay voices in Edge / Chrome are online voices.
(function () {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  const pill = document.createElement('div');
  pill.setAttribute('role', 'status');
  pill.style.cssText = 'position:fixed;right:14px;bottom:14px;z-index:50;padding:8px 14px;border-radius:999px;' +
    'font:500 .8rem Poppins,system-ui,sans-serif;color:#120c2b;background:#f6dfa4;box-shadow:0 6px 20px rgba(0,0,0,.35);display:none';
  pill.textContent = '📴 Tiada internet — mod luar talian (suara Melayu mungkin tidak berfungsi)';
  const show = () => { pill.style.display = navigator.onLine ? 'none' : 'block'; };
  addEventListener('online', show);
  addEventListener('offline', show);
  addEventListener('DOMContentLoaded', () => { document.body.appendChild(pill); show(); });
})();
