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


/*PARTÍCULAS*/
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


/*REPRODUCTOR + BARRA DE PROGRESO*/
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

       
        wraps.forEach(w => {
          const b = w.querySelector('.music-btn');
          if (b) b.textContent = b.textContent.replace('⏸', '🎵');
        });
        btn.textContent = btn.textContent.replace('🎵', '⏸');
      }).catch(() => {});
    });
  });

 
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
      icono: '/Mi-pagina-web/assets/iconos/naturaleza/explorador.svg',
      nombre: 'Explorador',
      texto: 'Vas donde otros dudan, porque tu alma florece cuando descubre.'
    },
    {
      icono: '/Mi-pagina-web/assets/iconos/naturaleza/sword.svg',
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
      icono: '/Mi-pagina-web/assets/iconos/naturaleza/sabio.svg',
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

    resultado.classList.add('hidden');
    requestAnimationFrame(() => {
      resultado.classList.remove('hidden');
    });
  });
})();

(function () {

  const textosFallo = [
    'Tu elección abrió un nuevo camino en la vida de Timit.',
    'Tu reacción cambió la historia como la conocemos.',
    'Estás destinado a crear tu propia historia.',
    'La historia no coincide; una nueva línea temporal acaba de abrirse.',
  ];

  const escenarios = [

    /* ── EVENTO 1: La lluvia / Sócrates ── */
    {
      escena: 'Estás herido bajo la lluvia. Una lámpara se enciende entre el agua. Un hombre de barba te observa con calma; parece misterioso, pero tranquilo.',
      opciones: [
        { texto: 'Conversas con él',                        correcta: true  },
        { texto: 'Te vas sin decir nada',                   correcta: false },
        { texto: 'Agradeces la compañía, pero guardas silencio', correcta: false },
        { texto: 'Preguntas quién es',                      correcta: false },
      ],
      textoAcierto: 'Elegiste hablar. La lluvia no fue un obstáculo, sino la puerta de entrada a un encuentro histórico; ese hombre era Sócrates y en Tiempo y Vida, esa conversación se volvió un destello decisivo para Timit.',
      extracto: 'Me llamo Sócrates, ¿Me conoces de algún lado, pequeño?', /* ← PON AQUÍ EL EXTRACTO DEL LIBRO */
    },

    /* ── EVENTO 2: El reloj viejo ── */
    {
      escena: 'Te detienes frente a un reloj viejo. Sientes que el tiempo pesa más de lo normal.',
      opciones: [
        { texto: 'Lo observas con atención',        correcta: true  },
        { texto: 'Lo ignoras y sigues caminando',   correcta: false },
        { texto: 'Intentas arreglarlo',              correcta: false },
        { texto: 'Preguntas por qué es tan importante', correcta: false },
      ],
      textoAcierto: 'Mirarlo fue entenderlo. El reloj no era solo un objeto, era una advertencia. En el libro, el tiempo aparece como algo que debe ser respetado, no perseguido.',
      extracto: 'el tiempo es valioso, y la vida depende de nuestras acciones, debes mantenerte consciente para lograr controlarla',
    },

    /* ── EVENTO 3: El cuaderno vacío ── */
    {
      escena: 'Tienes un cuaderno vacío. Quieres escribir algo, pero la caligrafía te traiciona.',
      opciones: [
        { texto: 'Escribes de todos modos',          correcta: false },
        { texto: 'Reescribes hasta que quede bien',  correcta: true  },
        { texto: 'Cierras el cuaderno y lo dejas',   correcta: false },
        { texto: 'Pides ayuda',                      correcta: false },
      ],
      textoAcierto: 'Reescribir fue un pequeño sacrificio, pero también una victoria. En Tiempo y Vida, la escritura se vuelve una forma de disciplina, paciencia y crecimiento interior.',
      extracto: 'Mi ortografia es horrible, escribí una página, y entiendo la mitad', /* ← PON AQUÍ EL EXTRACTO DEL LIBRO */
    },

    /* ── EVENTO 4: La discusión familiar ── */
    {
      escena: 'Escuchas una discusión en casa. La tensión pesa más que cualquier ruido.',
      opciones: [
        { texto: 'Intervienes',                               correcta: false },
        { texto: 'Te quedas callado',                         correcta: false },
        { texto: 'Sales de la casa',                          correcta: true  },
        { texto: 'Intentas calmar el ambiente con una frase', correcta: false },
      ],
      textoAcierto: 'Salir fue la respuesta de Timit; no para huir, sino para buscar aire, sentido y un camino propio dentro del conflicto.',
      extracto: '¡Ya basta!! la luz del dia apenas nos acomapaña, no es tiempo de discutir', /* ← PON AQUÍ EL EXTRACTO DEL LIBRO */
    },

    /* ── EVENTO 5: El fuego ── */
    {
      escena: 'Un fuego arde frente a ti. Sientes que su luz responde al estado de tu mente.',
      opciones: [
        { texto: 'Te acercas',                  correcta: false },
        { texto: 'Lo contemplas de lejos',      correcta: true  },
        { texto: 'Intentas apagarlo',           correcta: false },
        { texto: 'Preguntas qué representa',    correcta: false },
      ],
      textoAcierto: 'El fuego no solo calienta: enseña. En el libro, el abuelo lo usa como símbolo de reflexión, energía y tiempo que se consume.',
      extracto: 'La hoguera parece estar débil, sus llamas quieren apagarse', /* ← PON AQUÍ EL EXTRACTO DEL LIBRO */
    },

  ];

  /*LÓGICA */

  const iconoPuerta = '/Mi-pagina-web/assets/iconos/eventos/puerta.svg';

  const elEscena      = document.getElementById('evento-escena');
  const elPuertas     = document.getElementById('evento-puertas');
  const elIntro       = document.getElementById('evento-intro');
  const elResultado   = document.getElementById('evento-resultado');
  const elResTexto    = document.getElementById('evento-resultado-texto');
  const elExtracto    = document.getElementById('evento-extracto');
  const elReiniciar   = document.getElementById('evento-reiniciar');

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function cargarEscenario() {
    const s = escenarios[Math.floor(Math.random() * escenarios.length)];
    elEscena.textContent = s.escena;
    elPuertas.innerHTML  = '';

    const opcionesOrdenadas = shuffle(s.opciones);

    opcionesOrdenadas.forEach(op => {
      const btn = document.createElement('button');
      btn.className = 'puerta-btn';
      btn.innerHTML = `
        <img src="${iconoPuerta}" alt="Puerta">
        <span>${op.texto}</span>
      `;
      btn.addEventListener('click', () => mostrarResultado(op, s));
      elPuertas.appendChild(btn);
    });

    elIntro.style.display     = '';
    elResultado.classList.add('hidden');
  }

  function mostrarResultado(opcion, escenario) {
    elIntro.style.display = 'none';

    if (opcion.correcta) {
      elResTexto.textContent = escenario.textoAcierto;

      if (escenario.extracto && escenario.extracto.trim() !== '') {
        elExtracto.textContent = escenario.extracto;
        elExtracto.classList.remove('hidden');
      } else {
        elExtracto.classList.add('hidden');
      }
    } else {
      elResTexto.textContent = textosFallo[Math.floor(Math.random() * textosFallo.length)];
      elExtracto.classList.add('hidden');
    }

    elResultado.classList.remove('hidden');
  }

  elReiniciar.addEventListener('click', cargarEscenario);

  cargarEscenario();

})();
