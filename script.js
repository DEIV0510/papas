/* ============================================================
   FRITO MAX — interactions
   ============================================================ */
(() => {
  'use strict';

  /* ---------- Config ---------- */
  // ⚠️ Reemplaza por el WhatsApp comercial real de FRITO MAX.
  const WHATSAPP = '573000000000';
  const WA_MSG = 'Hola FRITO MAX 👋, quiero información comercial / ser distribuidor.';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- Inline SVG icon set ---------- */
  const I = (p, opt = '') => `<svg viewBox="0 0 24 24" fill="none" ${opt}>${p}</svg>`;
  const ICONS = {
    salt:     I('<path d="M9 9h6l1 11H8L9 9z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 9V6a2 2 0 0 1 4 0v3" stroke="currentColor" stroke-width="1.7"/><path d="M11 13v.01M13 15v.01M11 17v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
    flame:    I('<path d="M12 3c1 3-2 4-2 7a4 4 0 0 0 8 0c0-2-1-3-1-3 2 1 3 4 3 6a8 8 0 1 1-16 0c0-4 4-6 4-9 1 .5 2 .8 2 -1z" fill="currentColor"/>'),
    grill:    I('<rect x="4" y="4" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 8h8M8 11h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M8 15v5M16 15v5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'),
    citrus:   I('<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" stroke="currentColor" stroke-width="1.2" opacity=".8"/>'),
    drumstick:I('<path d="M13 4a5 5 0 0 1 4 8c-1.5 1.5-3 1.4-4 2.4-1 1-1 2.4-2.3 3.6a3 3 0 1 1-4-4c1.2-1.3 2.6-1.3 3.6-2.3 1-1 .9-2.5 2.4-4A5 5 0 0 1 13 4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'),
    leaf:     I('<path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 15c2-3 4-5 8-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
    banana:   I('<path d="M5 7c1 6 6 11 13 11 1 0 1.6-1.2.9-1.9C13 11 12 8 11.5 4.6 11.3 3.6 10 3.8 9.8 5 9.4 7.8 8 9 5.7 9c-.8 0-1 .8-.7 1z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'),
    spark:    I('<path d="M12 3l1.8 5.7L19.5 10l-5.7 1.8L12 17l-1.8-5.2L4.5 10l5.7-1.3L12 3z" fill="currentColor"/>'),
    heart:    I('<path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z" fill="currentColor"/>'),
    rotate:   I('<path d="M4 9a8 8 0 0 1 14-3l2 2M20 15a8 8 0 0 1-14 3l-2-2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 4v4h-4M4 20v-4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'),
    coin:     I('<ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" stroke-width="1.7"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="currentColor" stroke-width="1.7"/>'),
    truck:    I('<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="7" cy="18" r="2" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="18" r="2" stroke="currentColor" stroke-width="1.7"/>'),
    grid:     I('<rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/>'),
    star:     I('<path d="M12 3l2.6 5.6L21 9.3l-4.5 4.4 1.1 6.3L12 17l-5.6 3 1.1-6.3L3 9.3l6.4-.7L12 3z" fill="currentColor"/>'),
    phone:    I('<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'),
    mail:     I('<rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'),
    pin:      I('<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.7"/>'),
    zoom:     I('<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M20 20l-3.2-3.2M11 8v6M8 11h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
    star_sm:  I('<path d="M12 3l2.6 5.6L21 9.3l-4.5 4.4 1.1 6.3L12 17l-5.6 3 1.1-6.3L3 9.3l6.4-.7L12 3z" fill="currentColor"/>'),
  };

  /* ---------- Data (mirrors /assets/img — add an entry to add a product) ---------- */
  const PRODUCTS = [
    { id:'youkitas',  name:'You Kitas',             img:'youkitas',  ac:'#FFB300', badge:'Favorito',     tag:'Crujientes bocados de maíz que desaparecen en segundos.', flavors:['Natural','Picante'], count:'2 presentaciones' },
    { id:'papas',     name:'Papas',                 img:'papas',     ac:'#F59E0B', badge:'4 sabores',    tag:'La papa de siempre con el sabor de casa, en cuatro versiones.', flavors:['Natural','Limón','Pollo','BBQ'], count:'4 presentaciones' },
    { id:'olitas',    name:'Papas Olitas',          img:'olitas',    ac:'#E4002B', badge:'Onduladas',    tag:'Onduladas, más gruesas y mucho más crocantes.', flavors:['Natural','Limón','Pollo','BBQ'], count:'4 presentaciones' },
    { id:'chicharron',name:'Chicharrón',            img:'chicharron',ac:'#FF4D2E', badge:'Clásico',      tag:'Inflado, dorado y crocante. El clásico irresistible.', flavors:['Natural','Picante'], count:'2 presentaciones' },
    { id:'rosquitas', name:'Rosquitas Caleñísimas', img:'rosquitas', ac:'#2E9E5B', badge:'Caleñísimas',  tag:'El sabor del Valle del Cauca en cada rosca crocante.', flavors:['Natural'], count:'2 presentaciones' },
    { id:'platano',   name:'Chips de Plátano',      img:'platano',   ac:'#FFC83D', badge:'Natural',      tag:'Plátano verde y maduro, naturalmente delicioso.', flavors:['Plátano Verde','Plátano Maduro'], count:'2 presentaciones' },
  ];

  const FLAVORS = [
    { name:'Natural',        desc:'El punto perfecto de sal.',        c1:'#FFD54A', c2:'#F59E0B', icon:'salt',      tag:'Clásico' },
    { name:'Picante',        desc:'Para los que viven al límite.',    c1:'#FF6A4D', c2:'#C8102E', icon:'flame',     tag:'Intenso' },
    { name:'BBQ',            desc:'Ahumado, dulce e irresistible.',   c1:'#F0902B', c2:'#9E3B12', icon:'grill',     tag:'Ahumado' },
    { name:'Limón',          desc:'Cítrico que despierta el antojo.', c1:'#C6E84B', c2:'#6FAE1F', icon:'citrus',    tag:'Cítrico' },
    { name:'Pollo',          desc:'Sazón criollo en cada bocado.',    c1:'#FFC24B', c2:'#D97706', icon:'drumstick', tag:'Criollo' },
    { name:'Plátano Verde',  desc:'Crocante, fino y natural.',        c1:'#5BC47E', c2:'#1F7A43', icon:'leaf',      tag:'Natural' },
    { name:'Plátano Maduro', desc:'El dulce toque del trópico.',      c1:'#FFD06B', c2:'#F38E1C', icon:'banana',    tag:'Dulce' },
  ];

  const TESTIMONIALS = [
    { name:'Carolina Restrepo', city:'Tienda La Esquina · Medellín',      initials:'CR', quote:'Las Papas Olitas se venden solas. Mis clientes vuelven por ellas y el margen es buenísimo.' },
    { name:'Jorge Martínez',    city:'Distribuidora El Sol · Cali',        initials:'JM', quote:'Llevo dos años distribuyendo FRITO MAX. Entregas puntuales y un portafolio que la gente pide por su nombre.' },
    { name:'Diana Gómez',       city:'Mamá de familia · Bogotá',           initials:'DG', quote:'Los Chips de Plátano Maduro son el antojo de la casa. Saben a algo hecho de verdad, no a paquete cualquiera.' },
    { name:'Andrés Lozano',     city:'Supermercado Vida · Pereira',        initials:'AL', quote:'Rotan increíble. Las Rosquitas Caleñísimas y el Chicharrón no alcanzan a durar en la estantería.' },
    { name:'Valentina Ruiz',    city:'Fan de You Kitas · Barranquilla',    initials:'VR', quote:'Crocantes, con buen sabor y a un precio justo. Para mí son el mejor pasaboca del mercado.' },
  ];

  /* ============================================================
     RENDER
     ============================================================ */
  function fillIcons() {
    $$('[data-ic]').forEach(el => { el.innerHTML = ICONS[el.dataset.ic] || ''; });
  }

  function renderProducts() {
    const grid = $('#productsGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map((p, i) => `
      <article class="pcard reveal" style="--ac:${p.ac}; --rd:${i * 70}">
        <span class="pcard__badge">${p.badge}</span>
        <div class="pcard__stage">
          <span class="pcard__halo"></span>
          <img class="pcard__img" src="assets/img/${p.img}.webp" alt="${p.name} FRITO MAX" loading="lazy" decoding="async" />
        </div>
        <div class="pcard__body">
          <h3 class="pcard__name">${p.name}</h3>
          <p class="pcard__tag">${p.tag}</p>
          <div class="pcard__flavors">${p.flavors.map(f => `<span class="pcard__flavor">${f}</span>`).join('')}</div>
          <div class="pcard__foot">
            <span class="pcard__count">${p.count}</span>
            <a class="pcard__more" href="#distribuidores">Pedir<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          </div>
        </div>
      </article>`).join('');
  }

  function renderFlavors() {
    const grid = $('#flavorsGrid');
    if (!grid) return;
    grid.innerHTML = FLAVORS.map((f, i) => `
      <article class="fcard reveal" style="--c1:${f.c1}; --c2:${f.c2}; --rd:${i * 60}">
        <span class="fcard__tag">${f.tag}</span>
        <div class="fcard__icon">${ICONS[f.icon] || ICONS.spark}</div>
        <div>
          <h3 class="fcard__name">${f.name}</h3>
          <p class="fcard__desc">${f.desc}</p>
        </div>
      </article>`).join('');
  }

  function renderExperience() {
    const stage = $('#experienceStage');
    if (!stage) return;
    // Curated subset for the interactive 3D stage
    const picks = ['papas', 'chicharron', 'platano', 'youkitas'];
    const items = picks.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    stage.innerHTML = items.map(p => `
      <div class="tilt reveal" style="--ac:${p.ac}" data-tilt>
        <span class="tilt__halo"></span>
        <img class="tilt__img" src="assets/img/${p.img}.webp" alt="${p.name} FRITO MAX" loading="lazy" decoding="async" />
        <span class="tilt__glare"></span>
        <span class="tilt__name">${p.name}</span>
      </div>`).join('');
  }

  function renderGallery() {
    const grid = $('#galleryGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map((p, i) => `
      <figure class="gitem reveal" style="--rd:${i * 50}" data-index="${i}" tabindex="0" role="button" aria-label="Ver ${p.name} en grande">
        <img src="assets/img/${p.img}.webp" alt="${p.name} FRITO MAX" loading="lazy" decoding="async" />
        <span class="gitem__zoom" data-ic="zoom"></span>
        <figcaption class="gitem__cap">${p.name}</figcaption>
      </figure>`).join('');
  }

  function renderTestimonials() {
    const track = $('#testiTrack');
    const dots = $('#testiDots');
    if (!track) return;
    track.innerHTML = TESTIMONIALS.map(t => `
      <div class="tcard">
        <div class="tcard__inner">
          <div class="tcard__stars">${ICONS.star_sm.repeat(5)}</div>
          <p class="tcard__quote">${t.quote}</p>
          <div class="tcard__who">
            <span class="tcard__avatar">${t.initials}</span>
            <div>
              <div class="tcard__name">${t.name}</div>
              <div class="tcard__city">${t.city}</div>
            </div>
          </div>
        </div>
      </div>`).join('');
    if (dots) dots.innerHTML = TESTIMONIALS.map((_, i) =>
      `<button aria-label="Testimonio ${i + 1}"${i === 0 ? ' class="is-active"' : ''}></button>`).join('');
  }

  /* ============================================================
     LOADER
     ============================================================ */
  function initLoader() {
    const loader = $('#loader');
    const fill = $('#loaderFill');
    const pct = $('#loaderPct');
    if (!loader) return;

    document.body.classList.add('is-locked');
    let p = 0;
    const start = performance.now();
    const DURATION = reduceMotion ? 500 : 2100;

    const tick = (now) => {
      const t = clamp((now - start) / DURATION, 0, 1);
      // easeOutCubic with a little jitter for a "real" feel
      const eased = 1 - Math.pow(1 - t, 3);
      p = Math.min(100, Math.round(eased * 100));
      if (fill) fill.style.width = p + '%';
      if (pct) pct.textContent = p + '%';
      if (t < 1) requestAnimationFrame(tick);
      else finish();
    };
    requestAnimationFrame(tick);

    function finish() {
      loader.classList.add('is-done');
      document.body.classList.remove('is-locked');
      // reveal hero items already in view
      setTimeout(() => $$('#inicio .reveal').forEach(el => el.classList.add('in')), 60);
      setTimeout(() => loader.remove(), 900);
    }
  }

  /* ============================================================
     PARTICLES (lightweight canvas)
     ============================================================ */
  function particles(canvas, opts = {}) {
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    const colors = opts.colors || ['#FFC72C', '#E4002B', '#FFE49A'];
    let w, h, dpr, parts = [];
    const count = opts.count || 46;

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn() {
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 2.4 + .6,
        vx: (Math.random() - .5) * .3, vy: -(Math.random() * .5 + .15),
        a: Math.random() * .5 + .15,
        c: colors[(Math.random() * colors.length) | 0],
      }));
    }
    let raf;
    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (const o of parts) {
        o.x += o.vx; o.y += o.vy;
        if (o.y < -10) { o.y = h + 10; o.x = Math.random() * w; }
        if (o.x < -10) o.x = w + 10; if (o.x > w + 10) o.x = -10;
        ctx.globalAlpha = o.a;
        ctx.fillStyle = o.c;
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    }
    const ro = new ResizeObserver(() => { resize(); spawn(); });
    ro.observe(canvas);
    resize(); spawn(); loop();
    // pause when offscreen
    new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { if (!raf) loop(); } else { cancelAnimationFrame(raf); raf = null; } });
    }).observe(canvas);
  }

  /* ============================================================
     NAV
     ============================================================ */
  function initNav() {
    const nav = $('#nav');
    const burger = $('#navBurger');
    const links = $('#navLinks');
    const scrim = $('#navScrim');

    const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 30);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    const closeMenu = () => {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      scrim.classList.remove('in');
      setTimeout(() => { scrim.hidden = true; }, 300);
      document.body.classList.remove('is-locked');
    };
    const openMenu = () => {
      links.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('in'));
    };
    burger.addEventListener('click', () =>
      links.classList.contains('is-open') ? closeMenu() : openMenu());
    scrim.addEventListener('click', closeMenu);
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // active link via section observers
    const map = {};
    $$('.nav__links a[href^="#"]').forEach(a => { map[a.getAttribute('href').slice(1)] = a; });
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          $$('.nav__links a').forEach(a => a.classList.remove('is-active'));
          map[e.target.id]?.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'productos', 'sabores', 'experiencia', 'nosotros', 'galeria', 'distribuidores']
      .forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function initReveal() {
    const els = $$('.reveal');
    els.forEach(el => { if (el.dataset.revealDelay) el.style.setProperty('--rd', el.dataset.revealDelay); });
    if (reduceMotion) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    els.forEach(el => io.observe(el));
  }

  /* ============================================================
     COUNTERS
     ============================================================ */
  function initCounters() {
    const fmt = n => Math.round(n).toLocaleString('es-CO');
    const run = el => {
      const target = +el.dataset.count;
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = pre + fmt(target) + suf; return; }
      const dur = 1800; const start = performance.now();
      const step = now => {
        const t = clamp((now - start) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = pre + fmt(target * eased) + suf;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: .5 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  /* ============================================================
     HERO PARALLAX
     ============================================================ */
  function initParallax() {
    if (reduceMotion) return;
    const packs = $$('#heroPacks .pack');
    const auroras = $$('.hero__aurora');
    if (!packs.length) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

    const apply = () => {
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      packs.forEach(pk => {
        const d = +pk.dataset.depth || .15;
        pk.style.setProperty('--px', (cx * d * 60).toFixed(1) + 'px');
        pk.style.setProperty('--py', (cy * d * 60).toFixed(1) + 'px');
      });
      auroras.forEach((a, i) => {
        const d = (i + 1) * .4;
        a.style.transform = `translate(${cx * d * 18}px, ${cy * d * 18}px)`;
      });
      if (Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001) raf = requestAnimationFrame(apply);
      else raf = null;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };

    if (!coarse) {
      addEventListener('mousemove', e => {
        tx = (e.clientX / innerWidth - .5) * 2;
        ty = (e.clientY / innerHeight - .5) * 2;
        queue();
      }, { passive: true });
    } else if (window.DeviceOrientationEvent) {
      addEventListener('deviceorientation', e => {
        if (e.gamma == null) return;
        tx = clamp(e.gamma / 30, -1, 1);
        ty = clamp((e.beta - 45) / 30, -1, 1);
        queue();
      }, { passive: true });
    }
  }

  /* ============================================================
     3D TILT
     ============================================================ */
  function initTilt() {
    $$('[data-tilt]').forEach(card => {
      const img = $('.tilt__img', card);
      if (!coarse && !reduceMotion) {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.setProperty('--ry', ((px - .5) * 18).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((.5 - py) * 18).toFixed(2) + 'deg');
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
        card.addEventListener('mouseleave', () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        });
      } else {
        // touch: gentle press reaction
        card.addEventListener('touchstart', () => {
          card.style.transition = 'transform .3s ease';
          card.style.setProperty('--rx', '6deg'); card.style.setProperty('--ry', '-6deg');
          if (img) img.style.transform = 'translateZ(60px) scale(1.04)';
          setTimeout(() => {
            card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
            if (img) img.style.transform = '';
          }, 450);
        }, { passive: true });
      }
    });
  }

  /* ============================================================
     TESTIMONIALS CAROUSEL
     ============================================================ */
  function initTestimonials() {
    const track = $('#testiTrack');
    if (!track) return;
    const dots = $$('#testiDots button');
    const prev = $('#testiPrev'), next = $('#testiNext');
    const n = TESTIMONIALS.length;
    let i = 0, timer;

    const go = (k) => {
      i = (k + n) % n;
      track.style.transform = `translateX(${-i * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
    };
    const auto = () => { stop(); timer = setInterval(() => go(i + 1), 5500); };
    const stop = () => clearInterval(timer);

    next?.addEventListener('click', () => { go(i + 1); auto(); });
    prev?.addEventListener('click', () => { go(i - 1); auto(); });
    dots.forEach((d, j) => d.addEventListener('click', () => { go(j); auto(); }));

    // swipe
    let sx = 0;
    track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1));
      auto();
    }, { passive: true });

    const wrap = $('#testi');
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', auto);
    go(0); if (!reduceMotion) auto();
  }

  /* ============================================================
     GALLERY + LIGHTBOX
     ============================================================ */
  function initLightbox() {
    const lb = $('#lightbox');
    const img = $('#lbImg'), cap = $('#lbCaption');
    const items = $$('#galleryGrid .gitem');
    if (!lb || !items.length) return;
    const data = PRODUCTS.map(p => ({ src: `assets/img/${p.img}.webp`, cap: p.name }));
    let idx = 0;

    const show = (k) => {
      idx = (k + data.length) % data.length;
      img.classList.remove('zoomed');
      img.src = data[idx].src; img.alt = data[idx].cap; cap.textContent = data[idx].cap;
    };
    const open = (k) => {
      show(k); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
    };
    const close = () => {
      lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
    };

    items.forEach((it, k) => {
      it.addEventListener('click', () => open(k));
      it.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(k); } });
    });
    $('#lbClose').addEventListener('click', close);
    $('#lbNext').addEventListener('click', () => show(idx + 1));
    $('#lbPrev').addEventListener('click', () => show(idx - 1));
    img.addEventListener('click', () => img.classList.toggle('zoomed'));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
    // swipe in lightbox
    let sx = 0;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ============================================================
     FORM
     ============================================================ */
  function initForm() {
    const form = $('#distribForm');
    if (!form) return;
    const success = $('#formSuccess');

    const setErr = (input, msg) => {
      const field = input.closest('.field');
      field.classList.toggle('has-error', !!msg);
      const span = field.querySelector('[data-err]');
      if (span) span.textContent = msg || '';
    };
    const validate = () => {
      let ok = true;
      const req = [['#f-name', 'Cuéntanos tu nombre'], ['#f-city', '¿En qué ciudad estás?'], ['#f-phone', 'Necesitamos un número de contacto']];
      req.forEach(([sel, msg]) => {
        const el = $(sel);
        if (!el.value.trim()) { setErr(el, msg); ok = false; } else setErr(el, '');
      });
      const email = $('#f-email');
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { setErr(email, 'Correo no válido'); ok = false; }
      else setErr(email, '');
      const phone = $('#f-phone');
      if (phone.value.trim() && phone.value.replace(/\D/g, '').length < 7) { setErr(phone, 'Teléfono no válido'); ok = false; }
      return ok;
    };

    form.querySelectorAll('input').forEach(inp =>
      inp.addEventListener('blur', () => { if (inp.closest('.field').classList.contains('has-error')) validate(); }));

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate()) {
        form.querySelector('.has-error input')?.focus();
        return;
      }
      const v = id => (form.querySelector(id)?.value || '').trim();
      const msg =
        `*Solicitud de distribuidor — FRITO MAX*%0A%0A` +
        `*Nombre:* ${encodeURIComponent(v('#f-name'))}%0A` +
        `*Negocio:* ${encodeURIComponent(v('#f-business') || '—')}%0A` +
        `*Ciudad:* ${encodeURIComponent(v('#f-city'))}%0A` +
        `*Teléfono:* ${encodeURIComponent(v('#f-phone'))}%0A` +
        `*Correo:* ${encodeURIComponent(v('#f-email') || '—')}%0A` +
        `*Mensaje:* ${encodeURIComponent(v('#f-msg') || '—')}`;
      const url = `https://wa.me/${WHATSAPP}?text=${msg}`;
      form.querySelectorAll('.field, .btn, .form__note').forEach(el => el.style.display = 'none');
      if (success) success.hidden = false;
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ============================================================
     WHATSAPP LINKS + MARQUEE + MISC
     ============================================================ */
  function initMisc() {
    const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MSG)}`;
    ['#ctaWhats', '#footWhats', '#contactWhats'].forEach(s => { const el = $(s); if (el) el.href = wa; });
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

    // duplicate marquee for seamless loop
    const track = $('#marqueeTrack');
    if (track) track.innerHTML += track.innerHTML;

    // anchor smooth-scroll honoring reduced motion + nav offset is via CSS scroll-padding
    if (reduceMotion) {
      $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const t = document.getElementById(a.getAttribute('href').slice(1));
        if (t) { e.preventDefault(); t.scrollIntoView(); }
      }));
    }
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    fillIcons();           // static [data-ic] in markup
    renderProducts();
    renderFlavors();
    renderExperience();
    renderGallery();
    renderTestimonials();
    fillIcons();           // any [data-ic] injected by renders (gallery zoom)

    initLoader();
    initNav();
    initReveal();
    initCounters();
    initParallax();
    initTilt();
    initTestimonials();
    initLightbox();
    initForm();
    initMisc();

    particles($('#loaderParticles'), { count: 38 });
    particles($('#ctaParticles'), { count: 50 });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
