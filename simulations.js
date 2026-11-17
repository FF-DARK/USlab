// ============================================================================
// 醫用超音波六大主題：即時互動物理與生醫模擬引擎 (HTML5 Canvas)
// ============================================================================

class UltrasoundSimEngine {
  constructor(canvas, simType, getLang) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.simType = simType;
    this.getLang = getLang;
    this.intensity = 0.72; // 0.0 ~ 1.0 (由滑桿控制)
    this.time = 0;
    this.running = false;
    this.animId = null;

    this.initEntities();
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 460;
    this.height = rect.height || 230;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  setIntensity(val) {
    this.intensity = Math.max(0.05, Math.min(1.0, parseFloat(val)));
  }

  initEntities() {
    this.particles = [];
    this.bubbles = [];
    this.neurons = [];
    this.spikes = [];
    this.cells = [];
    this.streamParticles = [];

    // 1. BBB & Drug Delivery bubbles + drugs
    for (let i = 0; i < 9; i++) {
      this.bubbles.push({
        x: Math.random() * 460,
        y: 95 + (Math.random() - 0.5) * 28,
        r: 7 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.7 + Math.random() * 0.5
      });
    }
    for (let i = 0; i < 45; i++) {
      this.particles.push({
        x: Math.random() * 460,
        y: 95 + (Math.random() - 0.5) * 34,
        vx: 1.0 + Math.random() * 0.8,
        vy: 0,
        extravasated: false,
        alpha: 0.9,
        color: i % 2 === 0 ? "#fbbf24" : "#f472b6"
      });
    }

    // 2. Neuromodulation neural network
    const nodeCoords = [
      { x: 230, y: 105, focal: true },
      { x: 175, y: 80, focal: true },
      { x: 280, y: 82, focal: true },
      { x: 120, y: 130, focal: false },
      { x: 195, y: 155, focal: true },
      { x: 270, y: 150, focal: true },
      { x: 345, y: 125, focal: false },
      { x: 90, y: 70, focal: false },
      { x: 365, y: 68, focal: false }
    ];
    this.neurons = nodeCoords.map((n, idx) => ({
      ...n,
      id: idx,
      potential: 0,
      cooldown: Math.random() * 30
    }));
    this.edges = [
      [0, 1], [0, 2], [0, 4], [0, 5],
      [1, 3], [1, 7], [2, 6], [2, 8],
      [4, 3], [5, 6], [4, 5]
    ];
    this.eegTrace = new Array(120).fill(0);

    // 4. Cell Spheroid Assembly (Acoustic Tweezers)
    for (let i = 0; i < 55; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 25 + Math.random() * 140;
      this.cells.push({
        x: 230 + Math.cos(angle) * dist,
        y: 115 + Math.sin(angle) * (dist * 0.65),
        vx: 0,
        vy: 0,
        r: 5.5 + (i % 3),
        targetAngle: angle,
        targetDist: Math.sqrt(i) * 4.2,
        hue: 150 + (i % 4) * 12
      });
    }

    // 6. Acoustic Microstreaming & Shear Flow Field
    for (let i = 0; i < 140; i++) {
      this.streamParticles.push({
        x: 40 + Math.random() * 380,
        y: 25 + Math.random() * 180,
        history: []
      });
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.time += 0.045;
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    ctx.clearRect(0, 0, w, h);

    // 深色科技生醫背景網格
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#061320");
    grad.addColorStop(1, "#0a1e2e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    switch (this.simType) {
      case "bbb":
        this.renderBBB(ctx, w, h);
        break;
      case "neuro":
        this.renderNeuro(ctx, w, h);
        break;
      case "drug":
        this.renderDrugDelivery(ctx, w, h);
        break;
      case "spheroid":
        this.renderSpheroid(ctx, w, h);
        break;
      case "signaling":
        this.renderSignaling(ctx, w, h);
        break;
      case "streaming":
        this.renderStreaming(ctx, w, h);
        break;
      default:
        this.renderStreaming(ctx, w, h);
    }
  }

  // ==========================================================================
  // 1. 血腦屏障開啟 (BBB Opening)
  // ==========================================================================
  renderBBB(ctx, w, h) {
    const lang = this.getLang();
    const cx = w * 0.5;
    const vesselTop = 68;
    const vesselBot = 122;

    // 聚焦超音波聲束 (FUS Beam Cone)
    const beamAlpha = 0.12 + this.intensity * 0.25;
    const beamGrad = ctx.createLinearGradient(cx, 0, cx, h);
    beamGrad.addColorStop(0, `rgba(56, 189, 248, ${beamAlpha})`);
    beamGrad.addColorStop(0.5, `rgba(56, 189, 248, ${beamAlpha * 1.4})`);
    beamGrad.addColorStop(1, `rgba(56, 189, 248, 0.03)`);
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 85, 0);
    ctx.lineTo(cx + 85, 0);
    ctx.lineTo(cx + 42, h);
    ctx.lineTo(cx - 42, h);
    ctx.closePath();
    ctx.fill();

    // 聲波波前弧線
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 + this.intensity * 0.45})`;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const yWave = ((this.time * 38 + i * 45) % 180);
      ctx.beginPath();
      ctx.arc(cx, yWave - 30, 50, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();
    }

    // 腦微血管管腔背景
    ctx.fillStyle = "rgba(244, 63, 94, 0.14)";
    ctx.fillRect(0, vesselTop, w, vesselBot - vesselTop);

    // 內皮細胞與緊密連接 (Tight Junctions) - 在聲場焦點處隨強度打開間隙
    const cellCount = 9;
    const cellW = w / cellCount;
    for (let i = 0; i < cellCount; i++) {
      const cellCenter = (i + 0.5) * cellW;
      const inFocus = Math.abs(cellCenter - cx) < 75;
      const gapOpening = inFocus ? this.intensity * 11 : 1.5;

      // 上下血管壁內皮細胞
      [vesselTop, vesselBot].forEach((vy) => {
        ctx.fillStyle = inFocus ? "rgba(56, 189, 248, 0.35)" : "rgba(148, 163, 184, 0.35)";
        ctx.strokeStyle = inFocus ? "#38bdf8" : "#64748b";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(i * cellW + gapOpening, vy - 6, cellW - gapOpening * 2, 12, 5);
        ctx.fill();
        ctx.stroke();
      });
    }

    // 微氣泡穩態空化振盪 (Oscillating Microbubbles)
    this.bubbles.forEach((b) => {
      b.x += b.speed;
      if (b.x > w + 15) b.x = -15;
      const inFocus = Math.abs(b.x - cx) < 65;
      const osc = inFocus
        ? Math.sin(this.time * 9 + b.phase) * (this.intensity * 4.5)
        : Math.sin(this.time * 3 + b.phase) * 0.5;
      const r = Math.max(3, b.r + osc);

      // 微泡周圍局部聲波環
      if (inFocus && this.intensity > 0.3) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * this.intensity})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r + 5 + Math.abs(osc), 0, Math.PI * 2);
        ctx.stroke();
      }

      const bGrad = ctx.createRadialGradient(b.x - r * 0.3, b.y - r * 0.3, 1, b.x, b.y, r);
      bGrad.addColorStop(0, "#ffffff");
      bGrad.addColorStop(0.5, "#38bdf8");
      bGrad.addColorStop(1, "rgba(14, 165, 233, 0.2)");
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 藥物分子穿透開啟的血腦屏障進入腦實質
    this.particles.forEach((p) => {
      if (!p.extravasated) {
        p.x += p.vx;
        const inFocus = Math.abs(p.x - cx) < 60;
        if (inFocus && Math.random() < this.intensity * 0.065) {
          p.extravasated = true;
          p.vy = (Math.random() > 0.3 ? 1 : -1) * (0.6 + this.intensity * 1.1);
        }
        if (p.x > w) p.x = 0;
      } else {
        p.x += (Math.random() - 0.5) * 0.8;
        p.y += p.vy;
        if (p.y > h - 12 || p.y < 12) {
          p.extravasated = false;
          p.x = 0;
          p.y = 95 + (Math.random() - 0.5) * 26;
          p.vy = 0;
        }
      }
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // 圖例說明
    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText(
      lang === "zh"
        ? `機械指數 MI: ${(0.15 + this.intensity * 0.32).toFixed(2)} (穩態空化) · 緊密連接開孔率: ${Math.round(this.intensity * 92)}%`
        : `Mechanical Index: ${(0.15 + this.intensity * 0.32).toFixed(2)} (Stable Cavitation) · BBB Permeability: ${Math.round(this.intensity * 92)}%`,
      12,
      h - 10
    );
  }

  // ==========================================================================
  // 2. 神經刺激 (Ultrasonic Neuromodulation)
  // ==========================================================================
  renderNeuro(ctx, w, h) {
    const lang = this.getLang();
    const cx = w * 0.5;
    const cy = 105;

    // 聚焦聲場熱區
    const focusR = 65;
    const fGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, focusR);
    fGrad.addColorStop(0, `rgba(168, 85, 247, ${0.22 + this.intensity * 0.35})`);
    fGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
    ctx.fillStyle = fGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, focusR, 0, Math.PI * 2);
    ctx.fill();

    // 繪製突觸連線
    ctx.lineWidth = 1.6;
    this.edges.forEach(([i, j]) => {
      const n1 = this.neurons[i];
      const n2 = this.neurons[j];
      ctx.strokeStyle = "rgba(168, 85, 247, 0.28)";
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
    });

    // 觸發動作電位脈衝 (Spikes)
    if (Math.random() < 0.06 + this.intensity * 0.25) {
      const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
      const n1 = this.neurons[edge[0]];
      const n2 = this.neurons[edge[1]];
      if (n1.focal) {
        n1.potential = 1.0;
        this.spikes.push({ x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, t: 0, target: n2 });
      }
    }

    // 更新並繪製傳遞中的神經脈衝
    this.spikes = this.spikes.filter((s) => {
      s.t += 0.06 + this.intensity * 0.04;
      const sx = s.x1 + (s.x2 - s.x1) * s.t;
      const sy = s.y1 + (s.y2 - s.y1) * s.t;
      ctx.fillStyle = "#fde047";
      ctx.shadowColor = "#fde047";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (s.t >= 1) {
        s.target.potential = 1.0;
        return false;
      }
      return true;
    });

    // 繪製神經元本體 (Soma)
    this.neurons.forEach((n) => {
      n.potential *= 0.92;
      const r = 8 + n.potential * 4;
      ctx.fillStyle = n.potential > 0.25 ? "#facc15" : n.focal ? "#c084fc" : "#64748b";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // 底部即時神經放電波形 (LFP / Spike Train)
    const spikeVal =
      Math.sin(this.time * 6) * 3 +
      (Math.random() < this.intensity * 0.35 ? (Math.random() * 22 + 10) * this.intensity : 0);
    this.eegTrace.push(spikeVal);
    this.eegTrace.shift();

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    this.eegTrace.forEach((v, idx) => {
      const tx = 14 + (idx / this.eegTrace.length) * (w - 28);
      const ty = h - 24 - v;
      if (idx === 0) ctx.moveTo(tx, ty);
      else ctx.lineTo(tx, ty);
    });
    ctx.stroke();

    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText(
      lang === "zh"
        ? `脈衝重複頻率 PRF: ${Math.round(200 + this.intensity * 1800)} Hz · 神經放電頻率: ${Math.round(8 + this.intensity * 65)} spikes/s`
        : `Pulse Rep. Freq (PRF): ${Math.round(200 + this.intensity * 1800)} Hz · Firing Rate: ${Math.round(8 + this.intensity * 65)} spikes/s`,
      12,
      h - 7
    );
  }

  // ==========================================================================
  // 3. 精準藥物遞送 (Targeted Drug Delivery & Sonoporation)
  // ==========================================================================
  renderDrugDelivery(ctx, w, h) {
    const lang = this.getLang();
    const cx = w * 0.52;

    // 底部腫瘤組織細胞層
    for (let i = 0; i < 11; i++) {
      const tx = 22 + i * 40;
      const ty = 172 + (i % 2) * 18;
      const inFocal = Math.abs(tx - cx) < 85;
      const drugAbsorbed = inFocal ? this.intensity : 0.1;
      ctx.fillStyle = `rgba(244, 63, 94, ${0.15 + drugAbsorbed * 0.55})`;
      ctx.strokeStyle = inFocal ? "#fb7185" : "rgba(148, 163, 184, 0.4)";
      ctx.beginPath();
      ctx.arc(tx, ty, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 血管流道
    ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
    ctx.fillRect(0, 55, w, 65);
    ctx.strokeStyle = "rgba(244, 63, 94, 0.5)";
    ctx.beginPath();
    ctx.moveTo(0, 55);
    ctx.lineTo(w, 55);
    ctx.moveTo(0, 120);
    ctx.lineTo(w, 120);
    ctx.stroke();

    // 聚焦超音波擊破聲束
    const grad = ctx.createLinearGradient(cx, 0, cx, h);
    grad.addColorStop(0, `rgba(244, 63, 94, ${0.15 + this.intensity * 0.35})`);
    grad.addColorStop(1, "rgba(244, 63, 94, 0.05)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(cx - 70, 0);
    ctx.lineTo(cx + 70, 0);
    ctx.lineTo(cx + 45, h);
    ctx.lineTo(cx - 45, h);
    ctx.closePath();
    ctx.fill();

    // 載藥微泡與相變奈米液滴通過焦點時釋放藥物微射流
    this.bubbles.forEach((b) => {
      b.x += b.speed * 1.15;
      if (b.x > w + 20) b.x = -20;
      const inFocal = Math.abs(b.x - cx) < 48;
      const r = inFocal ? b.r * (1 + this.intensity * 0.6 * Math.sin(this.time * 12)) : b.r;

      ctx.strokeStyle = "#38bdf8";
      ctx.fillStyle = inFocal ? "rgba(244, 63, 94, 0.65)" : "rgba(56, 189, 248, 0.35)";
      ctx.beginPath();
      ctx.arc(b.x, b.y - 8, Math.max(3, r), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 微射流 (Microjet) 向下注入腫瘤組織
      if (inFocal && this.intensity > 0.35) {
        ctx.strokeStyle = `rgba(251, 191, 36, ${this.intensity * 0.8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x + (Math.random() - 0.5) * 10, 155);
        ctx.stroke();
      }
    });

    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText(
      lang === "zh"
        ? `聲致相變與聲孔效應強度: ${Math.round(this.intensity * 100)}% · 局部腫瘤藥物累積提升: ${(1 + this.intensity * 16.5).toFixed(1)} 倍`
        : `Sonoporation & ADV Efficiency: ${Math.round(this.intensity * 100)}% · Local Tumor Uptake: ${(1 + this.intensity * 16.5).toFixed(1)}×`,
      12,
      h - 10
    );
  }

  // ==========================================================================
  // 4. 聚集細胞球 (3D Cell Spheroid Assembly via Standing Acoustic Waves)
  // ==========================================================================
  renderSpheroid(ctx, w, h) {
    const lang = this.getLang();
    const cx = w * 0.5;
    const cy = h * 0.5;

    // 繪製駐波聲壓節點位能場 (Standing Wave Potential Well)
    for (let ring = 3; ring >= 1; ring--) {
      const radius = ring * 34 - Math.sin(this.time * 4) * 3;
      ctx.strokeStyle = `rgba(16, 185, 129, ${(0.12 + this.intensity * 0.25) / ring})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 左右兩側對稱超音波換能器駐波波紋
    ctx.fillStyle = "#10b981";
    ctx.fillRect(8, cy - 45, 8, 90);
    ctx.fillRect(w - 16, cy - 45, 8, 90);

    // 細胞受 Gor'kov 聲輻射力向中心聲壓節點聚集形成 3D 細胞球
    this.cells.forEach((c) => {
      const targetX = cx + Math.cos(c.targetAngle + this.time * 0.15) * (c.targetDist + (1 - this.intensity) * 95);
      const targetY = cy + Math.sin(c.targetAngle + this.time * 0.15) * ((c.targetDist + (1 - this.intensity) * 70) * 0.85);

      c.x += (targetX - c.x) * (0.04 + this.intensity * 0.08) + (Math.random() - 0.5) * (1.2 - this.intensity);
      c.y += (targetY - c.y) * (0.04 + this.intensity * 0.08) + (Math.random() - 0.5) * (1.2 - this.intensity);

      const cellGrad = ctx.createRadialGradient(c.x - 2, c.y - 2, 1, c.x, c.y, c.r);
      cellGrad.addColorStop(0, "#a7f3d0");
      cellGrad.addColorStop(0.6, "#10b981");
      cellGrad.addColorStop(1, "#065f46");
      ctx.fillStyle = cellGrad;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText(
      lang === "zh"
        ? `駐波聲輻射位能井強度: ${Math.round(this.intensity * 100)}% · 3D 細胞球緊密聚集度: ${Math.round(20 + this.intensity * 79)}%`
        : `Standing Wave Trap Strength: ${Math.round(this.intensity * 100)}% · 3D Spheroid Compaction: ${Math.round(20 + this.intensity * 79)}%`,
      12,
      h - 10
    );
  }

  // ==========================================================================
  // 5. 細胞訊息傳導 (Cellular Mechanotransduction & Piezo1 Ca2+ Wave)
  // ==========================================================================
  renderSignaling(ctx, w, h) {
    const lang = this.getLang();
    const cx = w * 0.5;
    const membraneY = 78;

    // 繪製磷脂雙分子層細胞膜 (隨超音波機械波產生形變)
    for (let x = 20; x < w - 20; x += 14) {
      const waveDeform = Math.sin(x * 0.05 - this.time * 5) * (this.intensity * 7);
      const y = membraneY + waveDeform;

      // 磷脂頭部與尾部
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(x, y - 6, 3.5, 0, Math.PI * 2);
      ctx.arc(x, y + 6, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 中央 Piezo1 機械敏感離子通道閘門 (隨超音波強度打開)
    const gateOpen = 6 + this.intensity * 18;
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(cx - gateOpen - 14, membraneY - 16, 14, 32, 4);
    ctx.roundRect(cx + gateOpen, membraneY - 16, 14, 32, 4);
    ctx.fill();

    // 細胞核 (Nucleus) - 接收鈣離子波後點亮 YAP/TAZ 基因轉錄
    const nucY = 165;
    const nucGlow = 0.2 + this.intensity * 0.65;
    const nGrad = ctx.createRadialGradient(cx, nucY, 5, cx, nucY, 42);
    nGrad.addColorStop(0, `rgba(250, 204, 21, ${nucGlow})`);
    nGrad.addColorStop(0.6, `rgba(245, 158, 11, ${nucGlow * 0.6})`);
    nGrad.addColorStop(1, "rgba(245, 158, 11, 0.05)");
    ctx.fillStyle = nGrad;
    ctx.beginPath();
    ctx.arc(cx, nucY, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fbbf24";
    ctx.stroke();

    // Ca2+ 鈣離子流由 Piezo1 通道湧入細胞質並擴散鈣離子波
    const ionCount = Math.floor(6 + this.intensity * 26);
    for (let i = 0; i < ionCount; i++) {
      const progress = ((this.time * 0.55 + i * 0.13) % 1);
      const spread = (i % 7 - 3) * 18 * progress;
      const ix = cx + spread;
      const iy = membraneY + progress * (nucY - membraneY);
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(ix, iy, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText(
      lang === "zh"
        ? `Piezo1 通道開啟機率: ${Math.round(12 + this.intensity * 85)}% · 細胞內 Ca²⁺ 訊號與外泌體釋放倍率: ${(1 + this.intensity * 4.8).toFixed(1)}×`
        : `Piezo1 Open Probability: ${Math.round(12 + this.intensity * 85)}% · Intracellular Ca²⁺ & Exosome Fold: ${(1 + this.intensity * 4.8).toFixed(1)}×`,
      12,
      h - 10
    );
  }

  // ==========================================================================
  // 6. 產生局部特殊剪切力的流場 (Acoustic Microstreaming & Shear Flow Field)
  // ==========================================================================
  renderStreaming(ctx, w, h) {
    const lang = this.getLang();
    const cx = w * 0.5;
    const cy = h * 0.5;
    const coreR = 18 + Math.sin(this.time * 10) * (this.intensity * 4);

    // 繪製局部高剪切應力熱區 (Shear Stress τ Color Field)
    const shearGrad = ctx.createRadialGradient(cx, cy, coreR, cx, cy, 95);
    shearGrad.addColorStop(0, `rgba(244, 63, 94, ${0.35 * this.intensity})`);
    shearGrad.addColorStop(0.45, `rgba(6, 182, 212, ${0.28 * this.intensity})`);
    shearGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
    ctx.fillStyle = shearGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 95, 0, Math.PI * 2);
    ctx.fill();

    // 四極微聲流渦旋流場計算 (Quadrupole Schlichting/Rayleigh Microstreaming Vortices)
    const centers = [
      { x: cx - 65, y: cy - 42, dir: 1 },
      { x: cx + 65, y: cy - 42, dir: -1 },
      { x: cx - 65, y: cy + 42, dir: -1 },
      { x: cx + 65, y: cy + 42, dir: 1 }
    ];

    this.streamParticles.forEach((p) => {
      let vx = 0;
      let vy = 0;
      centers.forEach((vortex) => {
        const dx = p.x - vortex.x;
        const dy = p.y - vortex.y;
        const r2 = dx * dx + dy * dy + 350;
        const factor = (vortex.dir * 1800 * (0.2 + this.intensity * 1.3)) / r2;
        vx += -dy * factor;
        vy += dx * factor;
      });

      p.x += vx;
      p.y += vy;

      // 邊界維持
      if (p.x < 15 || p.x > w - 15 || p.y < 15 || p.y > h - 25) {
        p.x = 30 + Math.random() * (w - 60);
        p.y = 25 + Math.random() * (h - 55);
        p.history = [];
      }

      p.history.push({ x: p.x, y: p.y });
      if (p.history.length > 9) p.history.shift();

      // 依速度梯度/局部剪切力大小決定流線顏色 (青藍 -> 琥珀/洋紅高剪切區)
      const speed = Math.hypot(vx, vy);
      const isHighShear = speed > 2.2;
      ctx.strokeStyle = isHighShear ? "#fb7185" : speed > 1.2 ? "#fbbf24" : "#22d3ee";
      ctx.lineWidth = isHighShear ? 2.0 : 1.4;
      if (p.history.length > 1) {
        ctx.beginPath();
        p.history.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }
    });

    // 中央振盪微氣泡 / 微結構核心
    const cGrad = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, coreR);
    cGrad.addColorStop(0, "#ffffff");
    cGrad.addColorStop(0.6, "#06b6d4");
    cGrad.addColorStop(1, "#0e7490");
    ctx.fillStyle = cGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText(
      lang === "zh"
        ? `局部最大剪切應力 τ_max: ${(0.4 + this.intensity * 14.2).toFixed(1)} Pa · 聲流渦旋切線流速: ${(1.2 + this.intensity * 18.5).toFixed(1)} mm/s`
        : `Peak Local Shear Stress τ_max: ${(0.4 + this.intensity * 14.2).toFixed(1)} Pa · Streaming Velocity: ${(1.2 + this.intensity * 18.5).toFixed(1)} mm/s`,
      12,
      h - 10
    );
  }
}

window.UltrasoundSimEngine = UltrasoundSimEngine;
