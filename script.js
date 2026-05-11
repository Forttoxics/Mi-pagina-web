/* ════════════════════════════════
   1. TYPEWRITER — título "TIEMPO Y VIDA"
   ════════════════════════════════ */
(function () {
  const el = document.getElementById('bookTitle');
  const text = 'TIEMPO Y VIDA';
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 95);
    } else {
      el.classList.add('done'); // oculta el cursor parpadeante
    }
  }

  setTimeout(type, 400); // pequeño delay para que se note al cargar
})();


/* ════════════════════════════════
   2. CITA FLOTANTE ALEATORIA
   ════════════════════════════════ */
(function () {
  const quotes = [
    '"El tiempo no espera a nadie, pero la vida sí."',
    '"Hay decisiones que duran segundos y consecuencias que duran toda la vida."',
    '"No todo lo que se pierde es una pérdida."',
    '"A veces el destino se escribe con errores."',
  ];

  const el = document.getElementById('floatingQuote');
  el.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // Aparece con fade-in tras el typewriter
  setTimeout(() => el.classList.add('visible'), 1600);
})();


/* ════════════════════════════════
   3. PARTÍCULAS SUTILES EN EL FONDO
   ════════════════════════════════ */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.floor((W * H) / 14000); // densidad relativa al tamaño
    particles = Array.from({ length: count }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * 1.4 + 0.3,          // radio 0.3–1.7 px
      dx:  (Math.random() - 0.5) * 0.18,
      dy:  (Math.random() - 0.5) * 0.18,
      o:   Math.random() * 0.5 + 0.15,         // opacidad 0.15–0.65
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(143,211,255,${p.o})`; // acento azul suave
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      // rebote en bordes
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  draw();
})();


/* ════════════════════════════════
   4. REPRODUCTOR + BARRA DE PROGRESO
   ════════════════════════════════ */
(function () {
  const audioPlayer = document.getElementById('audioPlayer');
  const wraps       = document.querySelectorAll('.music-btn-wrap');

  let activeWrap = null;
  let rafId      = null;

  function updateBar(wrap) {
    const bar = wrap.querySelector('.progress-bar');
    if (!bar) return;

    const pct = audioPlayer.duration
      ? (audioPlayer.currentTime / audioPlayer.duration) * 100
      : 0;
    bar.style.width = pct + '%';

    if (!audioPlayer.paused) {
      rafId = requestAnimationFrame(() => updateBar(wrap));
    }
  }

  function stopBar() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function activateWrap(wrap) {
    // desactiva el anterior
    if (activeWrap && activeWrap !== wrap) {
      activeWrap.classList.remove('playing');
      const prevBar = activeWrap.querySelector('.progress-bar');
      if (prevBar) prevBar.style.width = '0%';
      const prevBtn = activeWrap.querySelector('.music-btn');
      if (prevBtn) prevBtn.textContent = prevBtn.textContent.replace('⏸', '🎵');
    }
    activeWrap = wrap;
  }

  wraps.forEach(wrap => {
    const btn = wrap.querySelector('.music-btn');
    const src = btn.dataset.audio;
    if (!src) return;

    btn.addEventListener('click', () => {
      const isThisTrack = audioPlayer.src.includes(encodeURIComponent(src).replace(/%20/g, ' '))
                       || audioPlayer.src.endsWith(src);

      if (isThisTrack && !audioPlayer.paused) {
        // Pausar
        audioPlayer.pause();
        wrap.classList.remove('playing');
        btn.textContent = btn.textContent.replace('⏸', '🎵');
        stopBar();
        return;
      }

      // Cambiar pista
      activateWrap(wrap);
      audioPlayer.src = src;
      audioPlayer.currentTime = 0;

      audioPlayer.play().then(() => {
        wrap.classList.add('playing');
        stopBar();
        updateBar(wrap);

        // Resetear icono de todos, luego activar este
        wraps.forEach(w => {
          const b = w.querySelector('.music-btn');
          if (b) b.textContent = b.textContent.replace('⏸', '🎵');
        });
        btn.textContent = btn.textContent.replace('🎵', '⏸');
      }).catch(() => {});
    });
  });

  // Cuando la canción termina, resetear
  audioPlayer.addEventListener('ended', () => {
    if (activeWrap) {
      activeWrap.classList.remove('playing');
      const bar = activeWrap.querySelector('.progress-bar');
      if (bar) bar.style.width = '0%';
      const btn = activeWrap.querySelector('.music-btn');
      if (btn) btn.textContent = btn.textContent.replace('⏸', '🎵');
    }
    stopBar();
    activeWrap = null;
  });
})();
(function () {
  const naturalezas = [
    {
      icono: '/Mi-pagina-web/assets/iconos/naturaleza/Explorador.svg',
      nombre: 'Explorador',
      texto: 'Vas donde otros dudan, porque tu alma florece cuando descubre.'
    },
    {
      icono: '/Mi-pagina-web/assets/iconoa/naturaleza/Guerrero.svg',
      nombre: 'Guerrero',
      texto: 'Luchas por lo que quieres, pero nunca olvides que también mereces tu propia paz.'
    },
    {
      icono: '/Mi-pagina-web/assets/iconos/naturaleza/protector.svg',
      nombre: 'Protector',
      texto: 'Defiendes a quienes amas, pero tu corazón también merece refugio.'
    },
    {
      icono: '/Mi-pagina-web/assets/iconos/naturaleza/mediador.svg',
      nombre: 'Mediador',
      texto: 'Tu fuerza está en calmar, unir y darle forma al equilibrio.'
    },
    {
      icono: '/Mi-pagina-web/assets/iconos/naturaleza/Sabio.svg',
      nombre: 'Sabio',
      texto: 'Ves más allá de la prisa; tu poder está en comprender antes de decidir.'
    },
  ];

  const btn       = document.getElementById('naturaleza-btn');
  const resultado = document.getElementById('naturaleza-resultado');
  const icono     = document.getElementById('naturaleza-icono');
  const nombre    = document.getElementById('naturaleza-nombre');
  const texto     = document.getElementById('naturaleza-texto');

  btn.addEventListener('click', () => {
    const eleccion = naturalezas[Math.floor(Math.random() * naturalezas.length)];

    icono.src        = eleccion.icono;
    icono.alt        = eleccion.nombre;
    nombre.textContent = eleccion.nombre;
    texto.textContent  = eleccion.texto;

    // Reinicia la animación quitando y volviendo a poner la clase
    resultado.classList.add('hidden');
    requestAnimationFrame(() => {
      resultado.classList.remove('hidden');
    });
  });
})();
