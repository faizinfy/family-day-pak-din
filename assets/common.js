// Shared by the event pages (lucky-draw, game-prizes, best-dress, result, settings):
// starry background, sound on/off, Web Audio notes, the Malay voice and confetti.
window.FDK = (function () {
  const SND_KEY = 'fd-lucky-draw-sound', VOICE_KEY = 'fd-lucky-draw-voice';
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  // Twinkling stars in <div id="stars">
  function stars(n = 70) {
    const box = document.getElementById('stars');
    if (!box) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 3 + 's';
      box.appendChild(s);
    }
  }

  // Sound on/off is shared by every page (and remembered on this device)
  let ctx;
  function ac() {
    if (!ctx) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  const sound = {
    get on() { return store.get(SND_KEY) !== 'off'; },
    toggle() {
      const on = !this.on;
      store.set(SND_KEY, on ? 'on' : 'off');
      if (on) ac(); else if (window.speechSynthesis) speechSynthesis.cancel();
      return on;
    },
    ctx: ac,
    unlock() { if (this.on) ac(); },
    // one synthesized note: frequency, start offset (s), length (s), wave type, volume
    note(freq, start, dur, type, vol) {
      const c = this.on && ac(); if (!c) return;
      const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + start;
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(c.destination);
      o.start(t); o.stop(t + dur + 0.05);
    },
    // Hijaz flourish (D Eb F# G A) then a bright chord
    fanfare() {
      [293.66, 311.13, 369.99, 392, 440, 392, 369.99, 440].forEach((f, i) => this.note(f * 2, i * 0.08, 0.24, 'triangle', 0.17));
      [587.33, 739.99, 880, 1174.66].forEach(f => this.note(f, 0.68, 1.8, 'triangle', 0.12));
      [1760, 2349.32, 2637.02, 3520].forEach((f, i) => this.note(f, 0.75 + i * 0.08, 0.6, 'sine', 0.045));
    }
  };

  // Malay voices: Edge has "Microsoft Yasmin/Osman Online (Natural)", Android has Google Malay,
  // Chrome desktop has "Google Bahasa Indonesia". Natural/online voices sound best.
  function malayVoices() {
    if (!window.speechSynthesis) return [];
    const score = v => {
      const l = v.lang.toLowerCase();
      const base = l.startsWith('ms') ? 20 : l.startsWith('id') ? 10 : 0;
      return base && base + (/natural|online|google/i.test(v.name) ? 5 : 0);
    };
    return speechSynthesis.getVoices().filter(score).sort((a, b) => score(b) - score(a));
  }
  function pickVoice() {
    const list = malayVoices(), chosen = store.get(VOICE_KEY);
    return list.find(v => v.name === chosen) || list[0] || null;
  }
  const voiceLabel = v => v.name.replace(/^(Microsoft|Google)\s+/, '').replace(/\s*-\s*/, ' · ')
    .replace(/\s*\((Natural)\)/, '') + (/^ms/i.test(v.lang) ? ' 🇲🇾' : ' 🇮🇩');
  const voice = {
    list: malayVoices,
    pick: pickVoice,
    label: voiceLabel,
    choose(name) { store.set(VOICE_KEY, name); },
    // read text aloud; resolves when speech ends (or straight away when muted), so callers can wait on it
    say(text, delay) {
      return new Promise(resolve => {
        if (!sound.on || !window.speechSynthesis) return resolve();
        const speak = () => {
          const u = new SpeechSynthesisUtterance(text);
          const v = pickVoice();
          if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'ms-MY';
          u.rate = 0.9;
          let done = false;
          const finish = () => { if (!done) { done = true; resolve(); } };
          u.onend = u.onerror = finish;
          setTimeout(finish, 1500 + text.length * 110); // some browsers never fire onend
          speechSynthesis.cancel();
          speechSynthesis.speak(u);
        };
        delay ? setTimeout(speak, delay) : speak(); // speak synchronously inside a tap for iOS
      });
    },
    // iOS only allows speech that starts inside a tap, so prime it on the button tap
    unlock() {
      if (!sound.on || !window.speechSynthesis) return;
      speechSynthesis.getVoices();
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      speechSynthesis.speak(u);
    },
    // names as they should be read: "Abg Man" → "Abang Man", "A & B" → "A dan B"
    spoken: s => s.replace(/\bAbg\b/g, 'Abang').replace(/\s*&\s*/g, ' dan ')
  };
  if (window.speechSynthesis) speechSynthesis.getVoices(); // voices load asynchronously

  // Confetti into <div class="confetti" id="confetti">
  function confetti(n = 90) {
    const box = document.getElementById('confetti'), colors = ['#e8c476', '#f6dfa4', '#d9677a', '#b98a3e', '#ffffff', '#8f7cf0'];
    if (!box) return;
    for (let i = 0; i < n; i++) {
      const c = document.createElement('i');
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
      c.style.setProperty('--r', (Math.random() * 900 - 450) + 'deg');
      c.style.animationDuration = 2.2 + Math.random() * 2.2 + 's';
      c.style.animationDelay = Math.random() * .5 + 's';
      box.appendChild(c);
      c.addEventListener('animationend', () => c.remove());
    }
  }

  // Browser fullscreen
  const fullscreen = {
    get on() { return !!document.fullscreenElement; },
    enter() { if (!document.fullscreenElement) try { document.documentElement.requestFullscreen()?.catch(() => {}); } catch (e) {} },
    exit() { if (document.fullscreenElement) try { document.exitFullscreen(); } catch (e) {} },
    toggle() { this.on ? this.exit() : this.enter(); }
  };

  return { store, esc, stars, sound, voice, confetti, fullscreen, wait: ms => new Promise(r => setTimeout(r, ms)) };
})();
