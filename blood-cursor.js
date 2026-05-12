// ============================================================
//  BLOOD BRUSH CURSOR EFFECT
//  Portfolio: portfolioshahadat.vercel.app
//  Move cursor → blood brush strokes appear
//  Click → blood splatter burst
// ============================================================

(function () {

  // ── Canvas setup ────────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.id    = 'blood-canvas';
  Object.assign(canvas.style, {
    position:      'fixed',
    top:           '0',
    left:          '0',
    width:         '100%',
    height:        '100%',
    zIndex:        '9999',
    pointerEvents: 'none',   // clicks pass through to your site
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Hide default cursor ──────────────────────────────────────
  document.documentElement.style.cursor = 'none';

  // ── Blood color palette ──────────────────────────────────────
  const BLOOD_COLORS = [
    '#8B0000',   // dark blood red
    '#A00000',
    '#C0000A',
    '#6B0000',
    '#B22222',
    '#7F0000',
  ];

  function randColor() {
    return BLOOD_COLORS[Math.floor(Math.random() * BLOOD_COLORS.length)];
  }

  // ── State ────────────────────────────────────────────────────
  let mouseX = -200, mouseY = -200;
  let lastX  = -200, lastY  = -200;
  let isMoving = false;
  let moveTimer;

  const drops   = [];   // drip particles
  const strokes = [];   // brush stroke segments
  const splats  = [];   // click splatter particles

  // ── Mouse tracking ───────────────────────────────────────────
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => { isMoving = false; }, 80);

    // spawn brush stroke segment
    if (Math.hypot(mouseX - lastX, mouseY - lastY) > 4) {
      spawnStroke(lastX, lastY, mouseX, mouseY);
      // random drip chance while moving
      if (Math.random() < 0.18) spawnDrop(mouseX, mouseY);
      lastX = mouseX;
      lastY = mouseY;
    }
  });

  // Click = blood splatter burst
  window.addEventListener('click', e => {
    spawnSplatter(e.clientX, e.clientY, 22);
  });

  // ── Spawn helpers ────────────────────────────────────────────

  function spawnStroke(x1, y1, x2, y2) {
    strokes.push({
      x1, y1, x2, y2,
      color:   randColor(),
      width:   4 + Math.random() * 9,     // thick brush
      alpha:   0.75 + Math.random() * 0.2,
      life:    1.0,
      decay:   0.0008 + Math.random() * 0.0006,  // very slow fade
    });
  }

  function spawnDrop(x, y) {
    drops.push({
      x,
      y,
      vx:    (Math.random() - 0.5) * 1.2,
      vy:    1.5 + Math.random() * 3.5,   // drip downward
      r:     2 + Math.random() * 5,
      color: randColor(),
      alpha: 0.9,
      life:  1.0,
      decay: 0.003 + Math.random() * 0.004,
      trail: [],
    });
  }

  function spawnSplatter(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 9;
      splats.push({
        x, y,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed - 2,
        r:     1.5 + Math.random() * 5,
        color: randColor(),
        alpha: 1.0,
        life:  1.0,
        decay: 0.012 + Math.random() * 0.01,
        gravity: 0.25,
        trail: [],
      });
    }
    // also spawn a big drip cluster
    for (let i = 0; i < 5; i++) spawnDrop(x + (Math.random()-0.5)*30, y);
  }

  // ── Custom cursor dot ────────────────────────────────────────
  function drawCursor(x, y) {
    // outer glow
    const grd = ctx.createRadialGradient(x, y, 0, x, y, 18);
    grd.addColorStop(0, 'rgba(180,0,0,0.35)');
    grd.addColorStop(1, 'rgba(180,0,0,0)');
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // inner blood drop shape
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#CC0000';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FF2222';
    ctx.fill();
  }

  // ── Draw blood stroke (brush texture via multiple overlapping lines) ──
  function drawStroke(s) {
    ctx.save();
    ctx.globalAlpha = s.alpha * s.life;
    ctx.strokeStyle = s.color;
    ctx.lineWidth   = s.width;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    // main stroke
    ctx.beginPath();
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
    ctx.stroke();

    // roughen: 2 offset strokes to mimic bristles
    for (let i = 0; i < 2; i++) {
      const ox = (Math.random() - 0.5) * s.width * 0.5;
      const oy = (Math.random() - 0.5) * s.width * 0.5;
      ctx.globalAlpha = s.alpha * s.life * 0.3;
      ctx.lineWidth   = s.width * (0.3 + Math.random() * 0.4);
      ctx.beginPath();
      ctx.moveTo(s.x1 + ox, s.y1 + oy);
      ctx.lineTo(s.x2 + ox, s.y2 + oy);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ── Draw drip drop ───────────────────────────────────────────
  function drawDrop(d) {
    // trail
    d.trail.forEach((t, i) => {
      const a = (i / d.trail.length) * d.alpha * d.life * 0.4;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(t.x, t.y, d.r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.fill();
      ctx.restore();
    });

    // drop body (elongated teardrop)
    ctx.save();
    ctx.globalAlpha = d.alpha * d.life;
    ctx.fillStyle   = d.color;
    ctx.beginPath();
    ctx.ellipse(d.x, d.y, d.r * 0.7, d.r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── Draw splat particle ──────────────────────────────────────
  function drawSplat(s) {
    s.trail.forEach((t, i) => {
      const a = (i / s.trail.length) * s.alpha * s.life * 0.3;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(t.x, t.y, s.r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();
      ctx.restore();
    });

    ctx.save();
    ctx.globalAlpha = s.alpha * s.life;
    ctx.fillStyle   = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── Main loop ────────────────────────────────────────────────
  function loop() {
    requestAnimationFrame(loop);

    // DO NOT clear canvas fully — blood persists!
    // Only apply very faint fade to slowly dissolve old strokes
    ctx.fillStyle = 'rgba(0,0,0,0.012)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ── update & draw strokes
    for (let i = strokes.length - 1; i >= 0; i--) {
      const s = strokes[i];
      drawStroke(s);
      s.life -= s.decay;
      if (s.life <= 0) strokes.splice(i, 1);
    }

    // ── update & draw drops
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      d.trail.push({ x: d.x, y: d.y });
      if (d.trail.length > 12) d.trail.shift();
      d.x  += d.vx;
      d.y  += d.vy;
      d.vy += 0.12;   // gravity
      d.vx *= 0.98;
      drawDrop(d);
      d.life -= d.decay;
      if (d.life <= 0 || d.y > canvas.height + 50) drops.splice(i, 1);
    }

    // ── update & draw splats
    for (let i = splats.length - 1; i >= 0; i--) {
      const s = splats[i];
      s.trail.push({ x: s.x, y: s.y });
      if (s.trail.length > 10) s.trail.shift();
      s.x  += s.vx;
      s.y  += s.vy;
      s.vy += s.gravity;
      s.vx *= 0.94;
      drawSplat(s);
      s.life -= s.decay;
      if (s.life <= 0) splats.splice(i, 1);
    }

    // ── draw cursor last (always on top)
    drawCursor(mouseX, mouseY);
  }

  loop();

})();
