// ============================================================================
// 醫用超音波實驗室 - 聲波生醫島 (Acoustic Bio-Island) 主程式與視覺化編輯器
// ============================================================================

(function () {
  const STORAGE_KEY = "TU_LAB_CUSTOM_DATA_FINAL_V1";
  const DEFAULT_DATA = JSON.parse(JSON.stringify(window.LAB_DATA));

  // 優先載入使用者在瀏覽器視覺化編輯器儲存的資料
  let DATA = loadSavedData();

  let currentLang = "zh";
  let activeLandmarkId = null;
  let acousticFieldMode = false;
  let currentPubEra = "all";
  let currentPubType = "all";
  let currentPubFilter = "all";
  let currentPubSearch = "";
  let currentGalleryFilter = "all";
  let currentNewsFilter = "all";
  let currentLightboxIdx = 0;
  let leftBoardCollapsed = false;
  let simEngine = null;

  // 視覺化編輯器狀態
  let currentEditorTab = "meta";
  let selectedEditZoneId = "bbb-opening";

  function loadSavedData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.meta && parsed.landmarks) {
          if (!Array.isArray(parsed.videos) || parsed.videos.length === 0) {
            parsed.videos = JSON.parse(JSON.stringify(DEFAULT_DATA.videos || []));
          }
          window.LAB_DATA = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read custom lab data from localStorage:", e);
    }
    return window.LAB_DATA;
  }

  // 地圖平移與縮放狀態
  const state = {
    scale: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    dragMoved: false
  };

  // DOM 元素快取
  const viewport = document.getElementById("viewport");
  const islandStage = document.getElementById("island-stage");
  const hotspotsLayer = document.getElementById("hotspots-layer");
  const svgOverlay = document.getElementById("island-svg-overlay");
  const quickNav = document.getElementById("quick-nav");
  const detailDrawer = document.getElementById("detail-drawer");
  const drawerContent = document.getElementById("drawer-content");

  // 初始化
  function init() {
    initLeftBoard();
    renderLeftBoard();
    fitIslandToScreen();
    renderSVGConnections();
    renderHotspots();
    renderTopHUD();
    initPanAndZoom();
    initVisualEditor();
    initLightbox();
    initVideoModal();
    initOceanCanvas();

    window.addEventListener("resize", () => {
      if (!activeLandmarkId) fitIslandToScreen();
      if (simEngine) simEngine.resize();
    });
  }

  function getLang() {
    return currentLang;
  }

  function fitIslandToScreen() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const baseW = 1360;
    const baseH = 765;
    const scaleX = (vw * 0.92) / baseW;
    const scaleY = (vh * 0.84) / baseH;
    state.scale = Math.max(0.55, Math.min(1.12, Math.min(scaleX, scaleY)));
    // 若左側看板展開且在桌機寬螢幕上，將島嶼稍微往右偏置以避開左側看板
    state.panX = !leftBoardCollapsed && vw > 1100 ? 155 : 0;
    state.panY = 14;
    applyTransform(true);
  }

  function applyTransform(smooth = false) {
    if (smooth) {
      islandStage.classList.add("smooth-camera");
      clearTimeout(islandStage._smoothTimer);
      islandStage._smoothTimer = setTimeout(() => {
        islandStage.classList.remove("smooth-camera");
      }, 680);
    }
    islandStage.style.transform = `translate3d(${state.panX}px, ${state.panY}px, 0) scale(${state.scale})`;
  }

  function renderSVGConnections() {
    const core = DATA.landmarks.find((l) => l.id === "core-tower");
    if (!core) return;

    let svgHTML = `
      <circle class="core-ripple" cx="${core.x}%" cy="${core.y}%" r="20"></circle>
      <circle class="core-ripple" cx="${core.x}%" cy="${core.y}%" r="20"></circle>
      <circle class="core-ripple" cx="${core.x}%" cy="${core.y}%" r="20"></circle>
    `;

    DATA.landmarks.forEach((lm) => {
      if (lm.id === "core-tower") return;
      svgHTML += `
        <line
          id="link-${lm.id}"
          class="acoustic-link-line"
          x1="${core.x}%"
          y1="${core.y}%"
          x2="${lm.x}%"
          y2="${lm.y}%"
        />
      `;
    });

    svgOverlay.innerHTML = svgHTML;
  }

  function renderHotspots() {
    hotspotsLayer.innerHTML = "";
    DATA.landmarks.forEach((lm) => {
      const info = lm[currentLang];
      const pin = document.createElement("div");
      pin.className = `landmark-pin ${lm.category === "facility" ? "facility-pin" : ""} ${
        activeLandmarkId === lm.id ? "active" : ""
      }`;
      pin.dataset.id = lm.id;
      pin.style.left = `${lm.x}%`;
      pin.style.top = `${lm.y}%`;
      pin.style.setProperty("--pin-color", lm.badgeColor);
      pin.style.setProperty("--pin-glow", lm.GlowColor);

      pin.innerHTML = `
        <div class="pin-ring"></div>
        <div class="pin-badge" title="${info.topic}">${lm.icon}</div>
        <div class="pin-label-card">
          <span class="pin-code">${info.code}</span>
          <span class="pin-title">${info.name}</span>
        </div>
      `;

      pin.addEventListener("mouseenter", () => {
        const line = document.getElementById(`link-${lm.id}`);
        if (line) line.classList.add("highlighted");
      });
      pin.addEventListener("mouseleave", () => {
        const line = document.getElementById(`link-${lm.id}`);
        if (line && activeLandmarkId !== lm.id) line.classList.remove("highlighted");
      });

      pin.addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.dragMoved) return;
        selectLandmark(lm.id);
      });

      hotspotsLayer.appendChild(pin);
    });
  }

  function renderTopHUD() {
    const meta = DATA.meta[currentLang];
    document.getElementById("lab-title").textContent = meta.labName;
    document.getElementById("lab-subtitle").textContent = meta.islandSubtitle;
    document.getElementById("hud-hint").textContent = meta.hudHint;
    document.getElementById("btn-open-editor").textContent =
      currentLang === "zh" ? "✏️ 編輯資料" : "✏️ Edit Data";
    document.getElementById("btn-acoustic-mode").textContent = `〰️ ${meta.acousticModeLabel}`;
    document.getElementById("btn-reset-view").textContent = `🧭 ${meta.resetViewLabel}`;
    document.getElementById("btn-lang").textContent = currentLang === "zh" ? "🌐 EN / 繁中" : "🌐 繁中 / EN";

    quickNav.innerHTML = "";
    DATA.landmarks.forEach((lm) => {
      const info = lm[currentLang];
      const pill = document.createElement("button");
      pill.className = `nav-pill ${activeLandmarkId === lm.id ? "active" : ""}`;
      pill.innerHTML = `<span>${lm.icon}</span><span>${info.name}</span>`;
      pill.addEventListener("click", () => selectLandmark(lm.id));
      quickNav.appendChild(pill);
    });
  }

  // ==========================================================================
  // 左側常駐「實驗室核心簡介 & 最新捷報看板」
  // ==========================================================================
  function initLeftBoard() {
    const leftBoard = document.getElementById("left-board");
    const collapseBtn = document.getElementById("left-board-collapse-btn");
    const reopenBtn = document.getElementById("left-board-reopen");
    const jumpNewsEditorBtn = document.getElementById("btn-jump-news-editor");

    collapseBtn.addEventListener("click", () => {
      leftBoardCollapsed = true;
      leftBoard.classList.add("collapsed");
      reopenBtn.classList.add("visible");
      if (!activeLandmarkId) fitIslandToScreen();
    });

    reopenBtn.addEventListener("click", () => {
      leftBoardCollapsed = false;
      leftBoard.classList.remove("collapsed");
      reopenBtn.classList.remove("visible");
      if (!activeLandmarkId) fitIslandToScreen();
    });

    jumpNewsEditorBtn.addEventListener("click", () => {
      currentEditorTab = "news";
      document.querySelectorAll(".editor-tab").forEach((t) => {
        t.classList.toggle("active", t.dataset.tab === "news");
      });
      renderEditorTabContent();
      document.getElementById("editor-modal").classList.add("open");
    });

    const piCard = document.getElementById("lb-pi-card");
    if (piCard) {
      piCard.addEventListener("click", () => selectLandmark("pi-office"));
    }
  }

  function renderLeftBoard() {
    const meta = DATA.meta[currentLang];
    const researchZones = DATA.landmarks.filter((l) => l.category === "research");
    const newsList = DATA.news || [];
    const piInfo = DATA.team.pi[currentLang];

    document.getElementById("lb-header-tag").textContent =
      currentLang === "zh" ? "實驗室核心定位 ＆ 最新捷報" : "LAB CORE & LATEST NEWS";
    document.getElementById("left-board-collapse-btn").textContent =
      currentLang === "zh" ? "◀ 收合" : "◀ Hide";
    document.getElementById("lb-reopen-text").textContent =
      currentLang === "zh" ? `📣 展開核心簡介 & 最新捷報 (${newsList.length})` : `📣 Lab Core & News (${newsList.length})`;

    document.getElementById("lb-core-headline").textContent = meta.coreHeadline || "";
    document.getElementById("lb-core-mission").textContent = meta.coreMission || "";

    // 左側看板上的 PI 快速名片
    document.getElementById("lb-pi-avatar").src = DATA.team.pi.photo || DEFAULT_DATA.team.pi.photo;
    document.getElementById("lb-pi-tag").textContent =
      currentLang === "zh" ? "👨‍🔬 實驗室主持人 · 點擊認識教授" : "👨‍🔬 Principal Investigator · View Profile";
    document.getElementById("lb-pi-name").textContent = piInfo.name;
    document.getElementById("lb-pi-title").textContent = `${piInfo.title} · ${piInfo.dept}`;

    // 六大超音波研究核心快速標籤
    const pillarsEl = document.getElementById("lb-pillars");
    pillarsEl.innerHTML = researchZones
      .map(
        (z) => `
        <button class="lb-pillar-chip" data-pillar-jump="${z.id}" type="button" title="${escapeAttr(z[currentLang].tagline)}">
          <span>${z.icon}</span>
          <span>${z[currentLang].name}</span>
        </button>
      `
      )
      .join("");

    pillarsEl.querySelectorAll("[data-pillar-jump]").forEach((btn) => {
      btn.addEventListener("click", () => selectLandmark(btn.dataset.pillarJump));
    });

    // 左側看板上的研究介紹與專訪影片
    const videosHeading = document.getElementById("lb-videos-heading");
    const videosListEl = document.getElementById("lb-videos-list");
    if (videosHeading && videosListEl) {
      videosHeading.textContent =
        currentLang === "zh" ? "🎬 實驗室研究介紹與專訪影片" : "🎬 Lab Intro & Featured Videos";
      videosListEl.innerHTML = buildVideoCardsHTML(DATA.videos || []);
      bindVideoCardEvents(videosListEl);
    }

    // 最新消息區塊標題與分類篩選器
    document.getElementById("lb-news-heading").textContent =
      currentLang === "zh" ? "🔥 最新消息與榮譽捷報" : "🔥 Latest News & Honors";
    document.getElementById("btn-jump-news-editor").textContent =
      currentLang === "zh" ? "＋ 發布消息" : "＋ Post News";

    const newsCategories = [
      { id: "all", zh: "全部", en: "All" },
      { id: "award", zh: "🏆 得獎榮譽", en: "🏆 Awards" },
      { id: "talk", zh: "🎤 受邀演講", en: "🎤 Talks" },
      { id: "paper", zh: "📄 新論文", en: "📄 Papers" },
      { id: "member", zh: "🎉 團隊動態", en: "🎉 Team" }
    ];

    const filtersEl = document.getElementById("lb-news-filters");
    filtersEl.innerHTML = newsCategories
      .map(
        (c) => `
        <button class="lb-news-filter-btn ${currentNewsFilter === c.id ? "active" : ""}" data-news-filter="${c.id}" type="button">
          ${c[currentLang]}
        </button>
      `
      )
      .join("");

    filtersEl.querySelectorAll("[data-news-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentNewsFilter = btn.dataset.newsFilter;
        renderLeftBoard();
      });
    });

    const filteredNews =
      currentNewsFilter === "all"
        ? newsList
        : newsList.filter((n) => n.category === currentNewsFilter);

    const listEl = document.getElementById("lb-news-list");
    listEl.innerHTML = filteredNews
      .map((item) => {
        const badge = currentLang === "zh" ? item.badgeZh : item.badgeEn;
        const title = currentLang === "zh" ? item.titleZh : item.titleEn;
        const desc = currentLang === "zh" ? item.descZh : item.descEn;
        const linkedLm = DATA.landmarks.find((l) => l.id === item.linkZoneId);
        const jumpText = linkedLm
          ? currentLang === "zh"
            ? `👉 點擊前往：${linkedLm.icon} ${linkedLm.zh.name}`
            : `👉 Go to: ${linkedLm.icon} ${linkedLm.en.name}`
          : "";

        return `
          <article class="news-card cat-${item.category}" data-news-jump="${item.linkZoneId || ""}">
            <div class="news-meta-row">
              <div>
                <span class="news-badge">${badge}</span>
                ${item.isNew ? '<span class="news-new-tag">NEW</span>' : ""}
              </div>
              <span class="news-date">${item.date}</span>
            </div>
            <h4 class="news-title">${title}</h4>
            <p class="news-desc">${desc}</p>
            ${jumpText ? `<span class="news-jump-hint">${jumpText}</span>` : ""}
          </article>
        `;
      })
      .join("");

    listEl.querySelectorAll("[data-news-jump]").forEach((card) => {
      card.addEventListener("click", () => {
        const targetId = card.dataset.newsJump;
        if (targetId) selectLandmark(targetId);
      });
    });
  }

  function selectLandmark(id) {
    const lm = DATA.landmarks.find((item) => item.id === id);
    if (!lm) return;

    activeLandmarkId = id;

    // 在中小型螢幕打開右側詳情抽屜時，自動收合左側看板避免遮擋中間島嶼
    if (window.innerWidth < 1320 && !leftBoardCollapsed) {
      leftBoardCollapsed = true;
      document.getElementById("left-board").classList.add("collapsed");
      document.getElementById("left-board-reopen").classList.add("visible");
    }

    document.querySelectorAll(".landmark-pin").forEach((el) => {
      el.classList.toggle("active", el.dataset.id === id);
    });
    document.querySelectorAll(".acoustic-link-line").forEach((el) => {
      el.classList.toggle("highlighted", el.id === `link-${id}`);
    });
    renderTopHUD();

    const stageW = 1360;
    const stageH = 765;
    const targetScale = Math.max(state.scale, 1.02);
    const offsetX = (50 - lm.x) * (stageW / 100) * targetScale;
    const offsetY = (50 - lm.y) * (stageH / 100) * targetScale;
    const leftShift = !leftBoardCollapsed && window.innerWidth >= 1320 ? 150 : 0;
    const drawerShift = window.innerWidth > 900 ? -190 + leftShift : 0;

    state.scale = targetScale;
    state.panX = offsetX + drawerShift;
    state.panY = offsetY + 15;
    applyTransform(true);

    openDetailDrawer(lm);
  }

  function closeDetailDrawer() {
    activeLandmarkId = null;
    if (simEngine) {
      simEngine.stop();
      simEngine = null;
    }
    detailDrawer.classList.remove("open");
    document.querySelectorAll(".landmark-pin").forEach((el) => el.classList.remove("active"));
    document.querySelectorAll(".acoustic-link-line").forEach((el) => el.classList.remove("highlighted"));
    renderTopHUD();
    fitIslandToScreen();
  }

  function openDetailDrawer(lm) {
    if (simEngine) {
      simEngine.stop();
      simEngine = null;
    }

    const info = lm[currentLang];
    document.getElementById("drawer-code").textContent = `${lm.icon} ${info.code}`;
    document.getElementById("drawer-code").style.color = lm.badgeColor;
    document.getElementById("drawer-code").style.borderColor = lm.badgeColor;
    document.getElementById("drawer-title").textContent = info.topic;
    document.getElementById("drawer-tagline").textContent = info.tagline;

    detailDrawer.classList.toggle("wide-drawer", lm.id === "publications-library");

    if (lm.category === "research") {
      renderResearchZoneContent(lm, info);
    } else if (lm.id === "core-tower") {
      renderCoreFacilityContent();
    } else if (lm.id === "publications-library") {
      renderPublicationsContent();
    } else if (lm.id === "pi-office") {
      renderPIContent();
    } else if (lm.id === "members-camp") {
      renderTeamContent();
    } else if (lm.id === "join-harbor") {
      renderContactContent();
    } else if (lm.id === "lab-gallery") {
      renderGalleryContent();
    }

    detailDrawer.classList.add("open");
  }

  function renderResearchZoneContent(lm, info) {
    const relatedPubs = DATA.publications.filter(
      (p) => p.zoneId === lm.id || p.secondaryZoneId === lm.id
    );
    const labels =
      currentLang === "zh"
        ? {
            slider: "超音波能量調控",
            principle: "🔬 科學原理與聲學機制",
            params: "⚙️ 關鍵超音波參數",
            highlights: "🌟 實驗室研究亮點",
            pubs: "📄 本主題相關代表論文"
          }
        : {
            slider: "Ultrasound Intensity",
            principle: "🔬 Acoustic Mechanism & Principle",
            params: "⚙️ Key Acoustic Parameters",
            highlights: "🌟 Research Highlights",
            pubs: "📄 Related Publications"
          };

    drawerContent.innerHTML = `
      <div class="sim-card">
        <div class="sim-header">
          <span class="sim-title">${info.simTitle}</span>
        </div>
        <p class="sim-desc">${info.simDesc}</p>
        <canvas id="sim-canvas"></canvas>
        <div class="sim-controls">
          <label for="sim-intensity-slider">${labels.slider}</label>
          <input id="sim-intensity-slider" class="sim-slider" type="range" min="0.08" max="1" step="0.02" value="0.74" />
          <span id="sim-intensity-val" class="sim-val-badge">74%</span>
        </div>
      </div>

      <div>
        <h3 class="section-heading">${labels.principle}</h3>
        <p class="summary-text">${info.summary}</p>
      </div>

      <div>
        <h3 class="section-heading">${labels.params}</h3>
        <div class="param-grid">
          ${info.parameters
            .map(
              (p) => `
            <div class="param-item">
              <div class="param-label">${p.label}</div>
              <div class="param-value">${p.value}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div>
        <h3 class="section-heading">${labels.highlights}</h3>
        <ul class="highlight-list">
          ${info.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h3 class="section-heading">${labels.pubs} (${relatedPubs.length})</h3>
        <div class="card-stack">
          ${relatedPubs.map((pub, idx) => renderSinglePubCard(pub, idx + 1)).join("")}
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      const canvas = document.getElementById("sim-canvas");
      const slider = document.getElementById("sim-intensity-slider");
      const valBadge = document.getElementById("sim-intensity-val");
      if (canvas && window.UltrasoundSimEngine) {
        simEngine = new window.UltrasoundSimEngine(canvas, lm.simType, getLang);
        simEngine.start();
        slider.addEventListener("input", (e) => {
          const val = parseFloat(e.target.value);
          valBadge.textContent = `${Math.round(val * 100)}%`;
          simEngine.setIntensity(val);
        });
      }
    });
  }

  function renderCoreFacilityContent() {
    const facilities = DATA.facilities[currentLang];
    const researchZones = DATA.landmarks.filter((l) => l.category === "research");
    const hZones =
      currentLang === "zh"
        ? "🏝️ 點擊前往六大醫用超音波研究園區"
        : "🏝️ Explore Our 6 Therapeutic Ultrasound Zones";
    const hEquip =
      currentLang === "zh"
        ? "🛠️ 實驗室核心超音波與微流體設備"
        : "🛠️ Core Ultrasound & Microfluidic Facilities";

    drawerContent.innerHTML = `
      <div>
        <h3 class="section-heading">${hZones}</h3>
        <div class="card-stack">
          ${researchZones
            .map((z) => {
              const zi = z[currentLang];
              return `
                <div class="info-card" style="cursor:pointer" data-jump="${z.id}">
                  <div class="info-card-title">${z.icon} ${zi.topic}</div>
                  <div class="info-card-sub">${zi.tagline}</div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>

      <div>
        <h3 class="section-heading">${hEquip}</h3>
        <div class="card-stack">
          ${facilities
            .map(
              (f) => `
            <div class="info-card">
              <div class="info-card-title">${f.icon} ${f.name}</div>
              <div class="info-card-sub">${f.spec}</div>
              <div class="info-card-desc">${f.desc}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    drawerContent.querySelectorAll("[data-jump]").forEach((card) => {
      card.addEventListener("click", () => selectLandmark(card.dataset.jump));
    });
  }

  // 將作者欄中的 C.-H. Fan / Ching-Hsiang Fan 自動標示為亮藍色粗體底線
  function formatAuthorHighlight(authorsStr) {
    const safe = escapeAttr(authorsStr || "");
    return safe.replace(
      /(C\.-H\.\s*Fan[\*#]*|C\.\s*H\.\s*Fan[\*#]*|Ching-Hsiang\s*Fan[\*#]*|Fan,\s*C\.-H\.[\*#]*|Fan,\s*C\.\s*H\.[\*#]*)/g,
      '<span class="pub-pi-highlight">$1</span>'
    );
  }

  // 統一格式之單篇學術文獻卡片渲染器
  function renderSinglePubCard(pub, displayIdx) {
    const dateLabel = pub.dateStr || String(pub.year || "");
    const tagLabel = currentLang === "zh" ? pub.tagZh || "" : pub.tagEn || "";
    const typeMap = {
      journal: currentLang === "zh" ? "📘 期刊論文" : "📘 Journal",
      conference: currentLang === "zh" ? "🎤 研討會論文" : "🎤 Conference",
      book: currentLang === "zh" ? "📖 專書論文" : "📖 Book Chapter"
    };
    const typeBadge = pub.type ? typeMap[pub.type] || "" : "";

    return `
      <div class="pub-unified-card">
        <div class="pub-meta-top">
          <span class="pub-idx-badge">#${displayIdx}</span>
          <span class="pub-date-badge">(${escapeAttr(dateLabel)})</span>
          ${typeBadge ? `<span class="pub-zone-badge">${typeBadge}</span>` : ""}
          ${tagLabel ? `<span class="pub-zone-badge">${escapeAttr(tagLabel)}</span>` : ""}
          ${pub.metrics ? `<span class="pub-metrics-badge">${escapeAttr(pub.metrics)}</span>` : ""}
          ${pub.note ? `<span class="pub-role-badge">★ ${escapeAttr(pub.note)}</span>` : ""}
        </div>
        <div class="info-card-title">${escapeAttr(pub.title)}</div>
        <div class="pub-citation-text">
          ${formatAuthorHighlight(pub.authors)}. <em>${escapeAttr(pub.journal)}</em>.
        </div>
      </div>
    `;
  }

  // 3. 聲學文獻圖書館 (支援依三大時期、文獻類型、六大主題與關鍵字即時檢索)
  function renderPublicationsContent() {
    const allPubs = DATA.publications || [];
    const researchZones = DATA.landmarks.filter((l) => l.category === "research");
    const allLabel = DATA.meta[currentLang].filterAll;

    // 計算統計數據
    const totalJournals = allPubs.filter((p) => (p.type || "journal") === "journal").length;
    const totalConfs = allPubs.filter((p) => p.type === "conference").length;
    const totalBooks = allPubs.filter((p) => p.type === "book").length;

    const eraCount = {
      all: allPubs.length,
      "2026-present": allPubs.filter((p) => p.era === "2026-present").length,
      "post-ncku": allPubs.filter((p) => p.era === "post-ncku").length,
      "pre-ncku": allPubs.filter((p) => p.era === "pre-ncku").length
    };

    const eraTabs = [
      {
        id: "all",
        zh: `🌟 全部時期 (${eraCount.all})`,
        en: `🌟 All Eras (${eraCount.all})`
      },
      {
        id: "2026-present",
        zh: `🚀 2026.02 – present (${eraCount["2026-present"]})`,
        en: `🚀 2026.02 – present (${eraCount["2026-present"]})`
      },
      {
        id: "post-ncku",
        zh: `🏛️ 加入 NCKU 後 – 2026.02 (${eraCount["post-ncku"]})`,
        en: `🏛️ Post-NCKU – 2026.02 (${eraCount["post-ncku"]})`
      },
      {
        id: "pre-ncku",
        zh: `🎓 加入 NCKU 前 (${eraCount["pre-ncku"]})`,
        en: `🎓 Before NCKU (${eraCount["pre-ncku"]})`
      }
    ];

    const typeTabs = [
      { id: "all", zh: "全部類型", en: "All Types" },
      { id: "journal", zh: `📘 期刊論文 (${totalJournals})`, en: `📘 Journal Papers (${totalJournals})` },
      { id: "conference", zh: `🎤 研討會論文 (${totalConfs})`, en: `🎤 Conference Papers (${totalConfs})` },
      { id: "book", zh: `📖 專書論文 (${totalBooks})`, en: `📖 Book Chapters (${totalBooks})` }
    ];

    // 依條件篩選
    const q = currentPubSearch.trim().toLowerCase();
    const matched = allPubs.filter((p) => {
      if (currentPubEra !== "all" && p.era !== currentPubEra) return false;
      const pType = p.type || "journal";
      if (currentPubType !== "all" && pType !== currentPubType) return false;
      if (
        currentPubFilter !== "all" &&
        p.zoneId !== currentPubFilter &&
        p.secondaryZoneId !== currentPubFilter
      ) {
        return false;
      }
      if (q) {
        const hay = `${p.title} ${p.authors} ${p.journal} ${p.tagZh || ""} ${p.tagEn || ""} ${p.year}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    // 定義分類區塊順序 (嚴格依照使用者提供的分類結構呈現)
    const sectionDefs = [
      {
        era: "2026-present",
        type: "journal",
        zh: "【2026.02 – present】期刊論文 (Journal Papers)",
        en: "[2026.02 – present] Journal Papers"
      },
      {
        era: "post-ncku",
        type: "journal",
        zh: "【加入 NCKU 後 – 2026.02】期刊論文 (Journal Papers)",
        en: "[Joined NCKU – 2026.02] Journal Papers"
      },
      {
        era: "post-ncku",
        type: "conference",
        zh: "【加入 NCKU 後 – 2026.02】研討會論文 (Conference Papers)",
        en: "[Joined NCKU – 2026.02] Conference Papers"
      },
      {
        era: "post-ncku",
        type: "book",
        zh: "【加入 NCKU 後 – 2026.02】專書論文 (Book Chapters)",
        en: "[Joined NCKU – 2026.02] Book Chapters"
      },
      {
        era: "pre-ncku",
        type: "journal",
        zh: "【加入 NCKU 前】期刊論文 (Journal Papers)",
        en: "[Before Joining NCKU] Journal Papers"
      },
      {
        era: "pre-ncku",
        type: "conference",
        zh: "【加入 NCKU 前】研討會論文 (Conference Papers)",
        en: "[Before Joining NCKU] Conference Papers"
      }
    ];

    let groupedHTML = "";
    sectionDefs.forEach((sec) => {
      const items = matched.filter(
        (p) => (p.era || "post-ncku") === sec.era && (p.type || "journal") === sec.type
      );
      if (items.length === 0) return;
      groupedHTML += `
        <div class="pub-group-header">
          <span>${sec[currentLang]}</span>
          <span>${items.length} ${currentLang === "zh" ? "篇" : "items"}</span>
        </div>
        <div class="card-stack">
          ${items.map((pub, idx) => renderSinglePubCard(pub, idx + 1)).join("")}
        </div>
      `;
    });

    if (!groupedHTML) {
      groupedHTML = `
        <div class="info-card" style="text-align:center;color:#94a3b8;padding:24px">
          ${currentLang === "zh" ? "找不到符合篩選條件的文獻，請嘗試切換上方時期或主題標籤。" : "No publications match the current filter criteria."}
        </div>
      `;
    }

    drawerContent.innerHTML = `
      <div class="pub-stats-banner">
        <div class="pub-stat-box">
          <span class="pub-stat-num">${totalJournals}</span>
          <span class="pub-stat-label">${currentLang === "zh" ? "SCI 期刊論文" : "SCI Journals"}</span>
        </div>
        <div class="pub-stat-box">
          <span class="pub-stat-num">${totalConfs}</span>
          <span class="pub-stat-label">${currentLang === "zh" ? "國際研討會論文" : "Conferences"}</span>
        </div>
        <div class="pub-stat-box">
          <span class="pub-stat-num">${totalBooks}</span>
          <span class="pub-stat-label">${currentLang === "zh" ? "專書章節" : "Book Chapters"}</span>
        </div>
        <div class="pub-stat-box">
          <span class="pub-stat-num">3,485+</span>
          <span class="pub-stat-label">${currentLang === "zh" ? "總引用次數" : "Total Citations"}</span>
        </div>
      </div>

      <div>
        <div class="section-heading" style="margin-bottom:6px">
          ${currentLang === "zh" ? "📅 依時期分類檢視" : "📅 Filter by Period"}
        </div>
        <div class="pub-era-tabs">
          ${eraTabs
            .map(
              (t) => `
            <button class="pub-era-btn ${currentPubEra === t.id ? "active" : ""}" data-era="${t.id}" type="button">
              ${t[currentLang]}
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <div>
        <div class="section-heading" style="margin-bottom:6px">
          ${currentLang === "zh" ? "🗂️ 依文獻類型與六大研究主題篩選" : "🗂️ Filter by Document Type & Research Zone"}
        </div>
        <div class="filter-bar" style="margin-bottom:8px">
          ${typeTabs
            .map(
              (t) => `
            <button class="filter-chip ${currentPubType === t.id ? "active" : ""}" data-pub-type="${t.id}" type="button">
              ${t[currentLang]}
            </button>
          `
            )
            .join("")}
        </div>
        <div class="filter-bar">
          <button class="filter-chip ${currentPubFilter === "all" ? "active" : ""}" data-filter="all" type="button">${allLabel}</button>
          ${researchZones
            .map(
              (z) => `
            <button class="filter-chip ${currentPubFilter === z.id ? "active" : ""}" data-filter="${z.id}" type="button">
              ${z.icon} ${z[currentLang].name}
            </button>
          `
            )
            .join("")}
        </div>
        <input
          id="pub-search-box"
          class="pub-search-input"
          type="search"
          placeholder="${
            currentLang === "zh"
              ? "🔍 輸入關鍵字搜尋論文標題、期刊名稱或年份 (例如: ACS Nano, vortex, sonogenetics, epilepsy)..."
              : "🔍 Search by keyword, journal, author, or year (e.g., ACS Nano, vortex, sonogenetics)..."
          }"
          value="${escapeAttr(currentPubSearch)}"
        />
      </div>

      <div id="pub-grouped-results">
        ${groupedHTML}
      </div>
    `;

    drawerContent.querySelectorAll("[data-era]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPubEra = btn.dataset.era;
        renderPublicationsContent();
      });
    });

    drawerContent.querySelectorAll("[data-pub-type]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPubType = btn.dataset.pubType;
        renderPublicationsContent();
      });
    });

    drawerContent.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPubFilter = btn.dataset.filter;
        renderPublicationsContent();
      });
    });

    const searchInput = document.getElementById("pub-search-box");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentPubSearch = e.target.value;
        const pos = searchInput.selectionStart;
        renderPublicationsContent();
        const newSearch = document.getElementById("pub-search-box");
        if (newSearch) {
          newSearch.focus();
          newSearch.setSelectionRange(pos, pos);
        }
      });
    }
  }

  // 4A. 實驗室主持人 (PI) 專屬詳細介紹頁面
  function renderPIContent() {
    const piMeta = DATA.team.pi;
    const pi = piMeta[currentLang];
    const awards = pi.awards || [];
    const talks = pi.talks || [];

    const labels =
      currentLang === "zh"
        ? {
            bio: "🔬 研究專長與學術願景",
            edu: "🎓 學歷與主要經歷",
            awards: "🏆 重要學術榮譽與獎項",
            talks: "🎤 受邀演講與國際學會職務",
            editBtn: "✏️ 點此編輯教授照片與個人履歷",
            viewTeamBtn: "🧑‍🎓 前往查看實驗室研究團隊成員 ›"
          }
        : {
            bio: "🔬 Research Interests & Vision",
            edu: "🎓 Education & Academic Appointments",
            awards: "🏆 Honors & Awards",
            talks: "🎤 Invited Talks & Professional Service",
            editBtn: "✏️ Edit PI Portrait & Profile",
            viewTeamBtn: "🧑‍🎓 View Lab Team Members ›"
          };

    drawerContent.innerHTML = `
      <div class="pi-hero-card">
        <img class="pi-portrait-lg" src="${piMeta.photo || DEFAULT_DATA.team.pi.photo}" alt="${escapeAttr(pi.name)}" />
        <div class="pi-hero-meta">
          <div class="pi-hero-name">${pi.name}</div>
          <div class="pi-hero-title">${pi.title}</div>
          <div class="pi-hero-dept">${pi.dept}</div>
          <div class="pi-links-row">
            ${piMeta.email ? `<a class="pi-link-chip" href="mailto:${escapeAttr(piMeta.email)}">✉️ ${escapeAttr(piMeta.email)}</a>` : ""}
            ${piMeta.scholarUrl ? `<a class="pi-link-chip" href="${escapeAttr(piMeta.scholarUrl)}" target="_blank" rel="noopener">🎓 Google Scholar</a>` : ""}
            ${piMeta.orcidUrl ? `<a class="pi-link-chip" href="${escapeAttr(piMeta.orcidUrl)}" target="_blank" rel="noopener">🆔 ORCID</a>` : ""}
          </div>
        </div>
      </div>

      <button id="btn-jump-pi-editor" class="add-item-btn" style="width:100%;text-align:center" type="button">
        ${labels.editBtn}
      </button>

      <div>
        <h3 class="section-heading">${labels.bio}</h3>
        <p class="summary-text">${pi.bio}</p>
        ${piMeta.office ? `<p class="info-card-sub" style="margin-top:8px">📍 ${escapeAttr(piMeta.office)}</p>` : ""}
      </div>

      <div>
        <h3 class="section-heading">${labels.edu}</h3>
        <ul class="highlight-list">
          ${(pi.education || []).map((e) => `<li>${e}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h3 class="section-heading">${labels.awards}</h3>
        <ul class="highlight-list">
          ${awards.map((a) => `<li>${a}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h3 class="section-heading">${labels.talks}</h3>
        <ul class="highlight-list">
          ${talks.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>

      <div class="info-card" style="cursor:pointer;text-align:center;border-color:#34d399" id="btn-pi-to-members">
        <div class="info-card-title" style="color:#34d399">${labels.viewTeamBtn}</div>
      </div>
    `;

    document.getElementById("btn-jump-pi-editor").addEventListener("click", () => {
      currentEditorTab = "team";
      document.querySelectorAll(".editor-tab").forEach((t) => {
        t.classList.toggle("active", t.dataset.tab === "team");
      });
      renderEditorTabContent();
      document.getElementById("editor-modal").classList.add("open");
    });

    document.getElementById("btn-pi-to-members").addEventListener("click", () => {
      selectLandmark("members-camp");
    });
  }

  // 4B. 實驗室研究團隊成員頁面
  function renderTeamContent() {
    const pi = DATA.team.pi[currentLang];
    const members = DATA.team.members[currentLang];
    const hPI = currentLang === "zh" ? "👨‍🔬 實驗室主持人 (點擊查看完整履歷)" : "👨‍🔬 Principal Investigator (Click for Full CV)";
    const hMem = currentLang === "zh" ? "🧑‍🎓 研究團隊成員" : "🧑‍🎓 Research Team Members";

    drawerContent.innerHTML = `
      <div>
        <h3 class="section-heading">${hPI}</h3>
        <div id="team-jump-pi" class="pi-hero-card" style="cursor:pointer">
          <img class="lb-pi-avatar" src="${DATA.team.pi.photo || DEFAULT_DATA.team.pi.photo}" alt="${escapeAttr(pi.name)}" />
          <div class="pi-hero-meta">
            <div class="info-card-title">${pi.name}</div>
            <div class="info-card-sub">${pi.title} · ${pi.dept}</div>
          </div>
          <span class="lb-pi-arrow">›</span>
        </div>
      </div>

      <div>
        <h3 class="section-heading">${hMem}</h3>
        <div class="param-grid">
          ${members
            .map(
              (m) => `
            <div class="info-card">
              <div class="info-card-sub">${m.role} · ${m.badge}</div>
              <div class="info-card-title" style="margin-top:3px">${m.name}</div>
              <div class="info-card-desc">${m.topic}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    document.getElementById("team-jump-pi").addEventListener("click", () => {
      selectLandmark("pi-office");
    });
  }

  function renderContactContent() {
    const c = DATA.contact[currentLang];
    const hJoin = currentLang === "zh" ? "🚀 招募對象與研究機會" : "🚀 Open Positions & Opportunities";
    const hInfo = currentLang === "zh" ? "📍 聯絡方式與實驗室位置" : "📍 Contact Information";

    drawerContent.innerHTML = `
      <div>
        <p class="summary-text">${c.intro}</p>
      </div>

      <div>
        <h3 class="section-heading">${hJoin}</h3>
        <ul class="highlight-list">
          ${c.positions.map((p) => `<li>${p}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h3 class="section-heading">${hInfo}</h3>
        <div class="card-stack">
          <div class="info-card">
            <div class="info-card-sub">Email</div>
            <div class="info-card-title">${c.email}</div>
          </div>
          <div class="info-card">
            <div class="info-card-sub">${currentLang === "zh" ? "實驗室位置" : "Location"}</div>
            <div class="info-card-title">${c.location}</div>
          </div>
          <div class="info-card">
            <div class="info-card-sub">${currentLang === "zh" ? "聯絡電話" : "Phone"}</div>
            <div class="info-card-title">${c.phone}</div>
          </div>
        </div>
      </div>
    `;
  }

  // 6. 實驗室日常與活動相簿 (Lab Life & Photo Gallery)
  function renderGalleryContent() {
    const gallery = DATA.gallery || [];
    const categories = [
      { id: "all", zh: "全部活動", en: "All Photos" },
      { id: "conference", zh: "🎤 國際研討會", en: "🎤 Conferences" },
      { id: "experiment", zh: "🔬 實驗室日常", en: "🔬 Lab Life" },
      { id: "celebration", zh: "🎓 畢業與慶生", en: "🎓 Celebrations" },
      { id: "outing", zh: "🏞️ 聚餐與出遊", en: "🏞️ Outings" }
    ];

    const filtered =
      currentGalleryFilter === "all"
        ? gallery
        : gallery.filter((item) => item.category === currentGalleryFilter);

    const manageBtnLabel =
      currentLang === "zh"
        ? "➕ 點此新增或上傳電腦裡的實驗室照片"
        : "➕ Upload or Manage Lab Photos";

    drawerContent.innerHTML = `
      <div>
        <div class="filter-bar">
          ${categories
            .map(
              (cat) => `
            <button class="filter-chip ${currentGalleryFilter === cat.id ? "active" : ""}" data-gal-filter="${cat.id}">
              ${cat[currentLang]}
            </button>
          `
            )
            .join("")}
        </div>

        <button id="btn-jump-gallery-editor" class="add-item-btn" style="width:100%;margin-bottom:14px;text-align:center">
          ${manageBtnLabel}
        </button>

        <div class="gallery-grid">
          ${filtered
            .map((item) => {
              const realIdx = gallery.indexOf(item);
              const title = currentLang === "zh" ? item.titleZh : item.titleEn;
              const desc = currentLang === "zh" ? item.descZh : item.descEn;
              const tag = currentLang === "zh" ? item.tagZh : item.tagEn;
              return `
                <div class="photo-card" data-photo-idx="${realIdx}">
                  <div class="photo-thumb-wrap">
                    <img class="photo-thumb" src="${item.image}" alt="${escapeAttr(title)}" loading="lazy" />
                    <span class="photo-badge-overlay">${tag}</span>
                    <span class="photo-date-overlay">${item.date}</span>
                  </div>
                  <div class="photo-info">
                    <div class="photo-title">${title}</div>
                    <div class="photo-desc">${desc}</div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;

    drawerContent.querySelectorAll("[data-gal-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentGalleryFilter = btn.dataset.galFilter;
        renderGalleryContent();
      });
    });

    drawerContent.querySelectorAll("[data-photo-idx]").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = parseInt(card.dataset.photoIdx, 10);
        openLightbox(idx);
      });
    });

    const jumpBtn = document.getElementById("btn-jump-gallery-editor");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", () => {
        currentEditorTab = "gallery";
        document.querySelectorAll(".editor-tab").forEach((t) => {
          t.classList.toggle("active", t.dataset.tab === "gallery");
        });
        renderEditorTabContent();
        document.getElementById("editor-modal").classList.add("open");
      });
    }
  }

  // 照片放大檢視燈箱控制器
  function initLightbox() {
    const lb = document.getElementById("photo-lightbox");
    const closeBtn = document.getElementById("lightbox-close-btn");
    const prevBtn = document.getElementById("lightbox-prev-btn");
    const nextBtn = document.getElementById("lightbox-next-btn");

    closeBtn.addEventListener("click", () => lb.classList.remove("open"));
    lb.addEventListener("click", (e) => {
      if (e.target === lb) lb.classList.remove("open");
    });

    prevBtn.addEventListener("click", () => {
      const len = (DATA.gallery || []).length;
      if (!len) return;
      currentLightboxIdx = (currentLightboxIdx - 1 + len) % len;
      updateLightboxView();
    });

    nextBtn.addEventListener("click", () => {
      const len = (DATA.gallery || []).length;
      if (!len) return;
      currentLightboxIdx = (currentLightboxIdx + 1) % len;
      updateLightboxView();
    });

    window.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") lb.classList.remove("open");
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });
  }

  function openLightbox(idx) {
    const gallery = DATA.gallery || [];
    if (!gallery[idx]) return;
    currentLightboxIdx = idx;
    updateLightboxView();
    document.getElementById("photo-lightbox").classList.add("open");
  }

  function updateLightboxView() {
    const item = (DATA.gallery || [])[currentLightboxIdx];
    if (!item) return;
    document.getElementById("lightbox-img").src = item.image;
    document.getElementById("lightbox-tag").textContent = currentLang === "zh" ? item.tagZh : item.tagEn;
    document.getElementById("lightbox-date").textContent = item.date;
    document.getElementById("lightbox-title").textContent = currentLang === "zh" ? item.titleZh : item.titleEn;
    document.getElementById("lightbox-desc").textContent = currentLang === "zh" ? item.descZh : item.descEn;
  }

  // ==========================================================================
  // 實驗室研究與專訪 YouTube 影片卡片與播放彈窗控制器
  // ==========================================================================
  function buildVideoCardsHTML(videos) {
    return (videos || [])
      .map((v) => {
        const tag = currentLang === "zh" ? v.tagZh : v.tagEn;
        const title = currentLang === "zh" ? v.titleZh : v.titleEn;
        const thumbUrl = `https://i.ytimg.com/vi/${v.ytId}/hqdefault.jpg`;
        return `
          <div class="video-card" data-yt-id="${escapeAttr(v.ytId)}" title="${escapeAttr(title)}">
            <div class="video-thumb-box">
              <img class="video-thumb-img" src="${thumbUrl}" alt="${escapeAttr(title)}" loading="lazy" />
              <div class="video-play-badge">
                <span class="video-play-icon">▶</span>
              </div>
            </div>
            <div class="video-meta-col">
              <span class="video-tag-pill">${tag}</span>
              <div class="video-title-text">${title}</div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function bindVideoCardEvents(container) {
    if (!container) return;
    container.querySelectorAll(".video-card[data-yt-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const ytId = card.dataset.ytId;
        const vid = (DATA.videos || []).find((v) => v.ytId === ytId);
        if (vid) openVideoModal(vid);
      });
    });
  }

  function initVideoModal() {
    const modal = document.getElementById("video-modal");
    const closeBtn = document.getElementById("video-modal-close");
    const iframe = document.getElementById("video-modal-iframe");
    if (!modal || !closeBtn) return;

    const closeModal = () => {
      modal.classList.remove("open");
      iframe.src = "";
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener("keydown", (e) => {
      if (modal.classList.contains("open") && e.key === "Escape") closeModal();
    });
  }

  function openVideoModal(vid) {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-modal-iframe");
    const tagEl = document.getElementById("video-modal-tag");
    const titleEl = document.getElementById("video-modal-title");
    const descEl = document.getElementById("video-modal-desc");
    const extLink = document.getElementById("video-modal-ext-link");

    tagEl.textContent = currentLang === "zh" ? vid.tagZh : vid.tagEn;
    titleEl.textContent = currentLang === "zh" ? vid.titleZh : vid.titleEn;
    descEl.textContent = currentLang === "zh" ? vid.descZh : vid.descEn;
    extLink.href = vid.url || `https://www.youtube.com/watch?v=${vid.ytId}`;
    extLink.textContent =
      currentLang === "zh"
        ? "▶️ 在 YouTube 新分頁開啟觀看 (若無法直接播放請點此) ↗"
        : "▶️ Watch directly on YouTube in a new tab ↗";

    iframe.src = `https://www.youtube-nocookie.com/embed/${vid.ytId}?autoplay=1&rel=0`;
    modal.classList.add("open");
  }

  // ==========================================================================
  // 網頁內建視覺化編輯器 (In-Page Visual Editor)
  // ==========================================================================
  function initVisualEditor() {
    const modal = document.getElementById("editor-modal");
    const openBtn = document.getElementById("btn-open-editor");
    const closeBtn = document.getElementById("editor-close-btn");
    const saveBtn = document.getElementById("editor-save-btn");
    const exportBtn = document.getElementById("editor-export-btn");
    const resetBtn = document.getElementById("editor-reset-btn");
    const statusMsg = document.getElementById("editor-status-msg");
    const tabs = document.querySelectorAll(".editor-tab");

    openBtn.addEventListener("click", () => {
      statusMsg.textContent = "";
      renderEditorTabContent();
      modal.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        collectCurrentTabFormValues();
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        currentEditorTab = tab.dataset.tab;
        renderEditorTabContent();
      });
    });

    // 儲存至瀏覽器並立即更新整個島嶼畫面
    saveBtn.addEventListener("click", () => {
      collectCurrentTabFormValues();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
      window.LAB_DATA = DATA;
      refreshAllUI();
      statusMsg.textContent = "✓ 已儲存並即時更新網頁！";
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 3500);
    });

    // 匯出或直接覆蓋存回 data.js 檔案
    exportBtn.addEventListener("click", async () => {
      collectCurrentTabFormValues();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
      refreshAllUI();

      const fileContent =
        "// ============================================================================\n" +
        "// 醫用超音波實驗室 - 聲波生醫島 (Acoustic Bio-Island) 資料設定檔\n" +
        "// ============================================================================\n\n" +
        "window.LAB_DATA = " +
        JSON.stringify(DATA, null, 2) +
        ";\n";

      if (window.showSaveFilePicker) {
        try {
          const handle = await window.showSaveFilePicker({
            suggestedName: "data.js",
            types: [
              {
                description: "JavaScript Data File",
                accept: { "text/javascript": [".js"] }
              }
            ]
          });
          const writable = await handle.createWritable();
          await writable.write(fileContent);
          await writable.close();
          statusMsg.textContent = "✓ 已成功覆蓋寫入 data.js 檔案！";
          return;
        } catch (err) {
          if (err.name === "AbortError") return;
        }
      }

      // 備援：直接觸發瀏覽器下載 data.js
      const blob = new Blob([fileContent], { type: "text/javascript;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.js";
      a.click();
      URL.revokeObjectURL(url);
      statusMsg.textContent = "✓ 已下載更新後的 data.js！放到 test 資料夾即可永久生效。";
    });

    // 還原預設範本
    resetBtn.addEventListener("click", () => {
      if (!confirm("確定要還原成初始預設範本資料嗎？")) return;
      localStorage.removeItem(STORAGE_KEY);
      DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
      window.LAB_DATA = DATA;
      renderEditorTabContent();
      refreshAllUI();
      statusMsg.textContent = "✓ 已還原為預設範本資料！";
    });
  }

  function refreshAllUI() {
    renderLeftBoard();
    renderHotspots();
    renderTopHUD();
    if (activeLandmarkId) {
      const lm = DATA.landmarks.find((item) => item.id === activeLandmarkId);
      if (lm) openDetailDrawer(lm);
    }
  }

  function escapeAttr(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // 渲染當前選中的編輯器分頁表單
  function renderEditorTabContent() {
    const body = document.getElementById("editor-body");

    if (currentEditorTab === "meta") {
      body.innerHTML = `
        <div class="editor-grid-2">
          <div class="editor-card">
            <div class="editor-card-header">🇹🇼 繁體中文基本資訊與核心定位</div>
            <div class="form-field">
              <label>實驗室中文名稱 (左上角大標題)</label>
              <input id="ed-meta-zh-name" class="editor-input" value="${escapeAttr(DATA.meta.zh.labName)}" />
            </div>
            <div class="form-field">
              <label>島嶼導覽副標題</label>
              <input id="ed-meta-zh-sub" class="editor-input" value="${escapeAttr(DATA.meta.zh.islandSubtitle)}" />
            </div>
            <div class="form-field">
              <label>🎯 左側看板：實驗室核心標語 (Core Headline)</label>
              <input id="ed-meta-zh-headline" class="editor-input" value="${escapeAttr(DATA.meta.zh.coreHeadline)}" />
            </div>
            <div class="form-field">
              <label>🎯 左側看板：實驗室核心內容簡介 (Core Mission)</label>
              <textarea id="ed-meta-zh-mission" class="editor-textarea">${escapeAttr(DATA.meta.zh.coreMission)}</textarea>
            </div>
            <div class="form-field">
              <label>聯絡 Email</label>
              <input id="ed-contact-zh-email" class="editor-input" value="${escapeAttr(DATA.contact.zh.email)}" />
            </div>
            <div class="form-field">
              <label>實驗室位置</label>
              <input id="ed-contact-zh-loc" class="editor-input" value="${escapeAttr(DATA.contact.zh.location)}" />
            </div>
            <div class="form-field">
              <label>聯絡電話</label>
              <input id="ed-contact-zh-phone" class="editor-input" value="${escapeAttr(DATA.contact.zh.phone)}" />
            </div>
            <div class="form-field">
              <label>招生與歡迎介紹段落</label>
              <textarea id="ed-contact-zh-intro" class="editor-textarea">${escapeAttr(DATA.contact.zh.intro)}</textarea>
            </div>
            <div class="form-field">
              <label>招募對象條列 (每行一項)</label>
              <textarea id="ed-contact-zh-pos" class="editor-textarea">${escapeAttr(DATA.contact.zh.positions.join("\n"))}</textarea>
            </div>
          </div>

          <div class="editor-card">
            <div class="editor-card-header">🌐 英文版基本資訊與核心定位 (English)</div>
            <div class="form-field">
              <label>Lab Name (English)</label>
              <input id="ed-meta-en-name" class="editor-input" value="${escapeAttr(DATA.meta.en.labName)}" />
            </div>
            <div class="form-field">
              <label>Island Subtitle (English)</label>
              <input id="ed-meta-en-sub" class="editor-input" value="${escapeAttr(DATA.meta.en.islandSubtitle)}" />
            </div>
            <div class="form-field">
              <label>🎯 Core Headline (English)</label>
              <input id="ed-meta-en-headline" class="editor-input" value="${escapeAttr(DATA.meta.en.coreHeadline)}" />
            </div>
            <div class="form-field">
              <label>🎯 Core Mission Summary (English)</label>
              <textarea id="ed-meta-en-mission" class="editor-textarea">${escapeAttr(DATA.meta.en.coreMission)}</textarea>
            </div>
            <div class="form-field">
              <label>Contact Email</label>
              <input id="ed-contact-en-email" class="editor-input" value="${escapeAttr(DATA.contact.en.email)}" />
            </div>
            <div class="form-field">
              <label>Lab Location (English)</label>
              <input id="ed-contact-en-loc" class="editor-input" value="${escapeAttr(DATA.contact.en.location)}" />
            </div>
            <div class="form-field">
              <label>Phone</label>
              <input id="ed-contact-en-phone" class="editor-input" value="${escapeAttr(DATA.contact.en.phone)}" />
            </div>
            <div class="form-field">
              <label>Recruitment Intro (English)</label>
              <textarea id="ed-contact-en-intro" class="editor-textarea">${escapeAttr(DATA.contact.en.intro)}</textarea>
            </div>
            <div class="form-field">
              <label>Open Positions (One item per line)</label>
              <textarea id="ed-contact-en-pos" class="editor-textarea">${escapeAttr(DATA.contact.en.positions.join("\n"))}</textarea>
            </div>
          </div>
        </div>
      `;
    } else if (currentEditorTab === "news") {
      if (!Array.isArray(DATA.news)) DATA.news = [];
      const newsCatOptions = [
        { id: "award", zh: "🏆 學生/團隊得獎", en: "🏆 Award & Honor" },
        { id: "talk", zh: "🎤 受邀演講", en: "🎤 Invited Talk" },
        { id: "paper", zh: "📄 新發表論文", en: "📄 New Publication" },
        { id: "member", zh: "🎉 新人加入/團隊動態", en: "🎉 Team & New Members" }
      ];

      body.innerHTML = `
        <button id="btn-add-news" class="add-item-btn" type="button">＋ 新增一則最新消息（得獎 / 受邀演講 / 新論文 / 新人加入）</button>
        <div class="card-stack">
          ${DATA.news
            .map(
              (item, idx) => `
            <div class="editor-card news-edit-row" data-idx="${idx}">
              <div class="editor-card-header">
                <span>📣 最新消息 #${idx + 1}</span>
                <button class="delete-item-btn" data-del-news="${idx}" type="button">刪除此則消息</button>
              </div>
              <div class="editor-grid-2">
                <div class="form-field">
                  <label>日期 (例如 2026.10)</label>
                  <input class="editor-input news-date-in" value="${escapeAttr(item.date)}" />
                </div>
                <div class="form-field">
                  <label>消息類別與標籤顏色</label>
                  <select class="editor-select news-cat-in">
                    ${newsCatOptions
                      .map(
                        (c) => `
                      <option value="${c.id}" ${c.id === item.category ? "selected" : ""}>
                        ${c.zh} (${c.en})
                      </option>
                    `
                      )
                      .join("")}
                  </select>
                </div>
              </div>
              <div class="editor-grid-2">
                <div class="form-field">
                  <label>顯示徽章文字 (中文 / 英文，例如 🏆 學生得獎 / 🎤 受邀演講)</label>
                  <input class="editor-input news-badge-zh" placeholder="中文徽章" value="${escapeAttr(item.badgeZh)}" />
                  <input class="editor-input news-badge-en" placeholder="English Badge" value="${escapeAttr(item.badgeEn)}" />
                </div>
                <div class="form-field">
                  <label>點擊此消息時跳轉的島嶼地標 (選填)</label>
                  <select class="editor-select news-link-zone">
                    <option value="">-- 不跳轉 --</option>
                    ${DATA.landmarks
                      .map(
                        (lm) => `
                      <option value="${lm.id}" ${lm.id === item.linkZoneId ? "selected" : ""}>
                        ${lm.icon} ${lm.zh.name} (${lm.en.name})
                      </option>
                    `
                      )
                      .join("")}
                  </select>
                  <label style="margin-top:6px;display:inline-flex;align-items:center;gap:6px;cursor:pointer">
                    <input type="checkbox" class="news-is-new" ${item.isNew ? "checked" : ""} />
                    <span>顯示紅底「NEW」最新標記</span>
                  </label>
                </div>
              </div>
              <div class="editor-grid-2">
                <div class="form-field">
                  <label>消息標題 (中文 / 英文)</label>
                  <input class="editor-input news-title-zh" placeholder="中文標題" value="${escapeAttr(item.titleZh)}" />
                  <input class="editor-input news-title-en" placeholder="English Title" value="${escapeAttr(item.titleEn)}" />
                </div>
                <div class="form-field">
                  <label>消息內容補充說明 (中文 / 英文)</label>
                  <input class="editor-input news-desc-zh" placeholder="中文補充說明" value="${escapeAttr(item.descZh)}" />
                  <input class="editor-input news-desc-en" placeholder="English Description" value="${escapeAttr(item.descEn)}" />
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      document.getElementById("btn-add-news").addEventListener("click", () => {
        collectCurrentTabFormValues();
        const now = new Date();
        const ym = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;
        DATA.news.unshift({
          id: "news-" + Date.now(),
          date: ym,
          category: "award",
          badgeZh: "🏆 最新捷報",
          badgeEn: "🏆 Latest Honor",
          titleZh: "恭賀！實驗室最新得獎 / 受邀演講 / 論文發表好消息",
          titleEn: "Congrats! New Lab Award / Invited Talk / Publication",
          descZh: "請在此輸入詳細獲獎、演講或新成員加入說明文字。",
          descEn: "Enter details about the award, invited talk, or new team member here.",
          linkZoneId: "core-tower",
          isNew: true
        });
        renderEditorTabContent();
      });

      body.querySelectorAll("[data-del-news]").forEach((btn) => {
        btn.addEventListener("click", () => {
          collectCurrentTabFormValues();
          const idx = parseInt(btn.dataset.delNews, 10);
          DATA.news.splice(idx, 1);
          renderEditorTabContent();
        });
      });
    } else if (currentEditorTab === "zones") {
      const researchZones = DATA.landmarks.filter((l) => l.category === "research");
      const z = researchZones.find((item) => item.id === selectedEditZoneId) || researchZones[0];
      selectedEditZoneId = z.id;

      body.innerHTML = `
        <div class="editor-card">
          <div class="form-field">
            <label>選擇要編輯的島嶼研究園區地標：</label>
            <select id="ed-zone-selector" class="editor-select">
              ${researchZones
                .map(
                  (item) => `
                <option value="${item.id}" ${item.id === z.id ? "selected" : ""}>
                  ${item.icon} ${item.zh.code} - ${item.zh.name} (${item.zh.topic})
                </option>
              `
                )
                .join("")}
            </select>
          </div>
        </div>

        <div class="editor-grid-2">
          <div class="editor-card">
            <div class="editor-card-header">${z.icon} 繁體中文內容 (${z.zh.code})</div>
            <div class="form-field">
              <label>島嶼地標名稱 (短名稱)</label>
              <input id="ed-zone-zh-name" class="editor-input" value="${escapeAttr(z.zh.name)}" />
            </div>
            <div class="form-field">
              <label>研究主題完整標題</label>
              <input id="ed-zone-zh-topic" class="editor-input" value="${escapeAttr(z.zh.topic)}" />
            </div>
            <div class="form-field">
              <label>一句話核心標語 (Tagline)</label>
              <input id="ed-zone-zh-tagline" class="editor-input" value="${escapeAttr(z.zh.tagline)}" />
            </div>
            <div class="form-field">
              <label>科學原理與聲學機制說明</label>
              <textarea id="ed-zone-zh-summary" class="editor-textarea">${escapeAttr(z.zh.summary)}</textarea>
            </div>
            <div class="form-field">
              <label>關鍵超音波參數 (格式：參數名稱: 數值，每行一項)</label>
              <textarea id="ed-zone-zh-params" class="editor-textarea">${escapeAttr(
                z.zh.parameters.map((p) => `${p.label}: ${p.value}`).join("\n")
              )}</textarea>
            </div>
            <div class="form-field">
              <label>研究亮點條列 (每行一項)</label>
              <textarea id="ed-zone-zh-highlights" class="editor-textarea">${escapeAttr(
                z.zh.highlights.join("\n")
              )}</textarea>
            </div>
          </div>

          <div class="editor-card">
            <div class="editor-card-header">${z.icon} English Content (${z.en.code})</div>
            <div class="form-field">
              <label>Landmark Short Name</label>
              <input id="ed-zone-en-name" class="editor-input" value="${escapeAttr(z.en.name)}" />
            </div>
            <div class="form-field">
              <label>Research Topic Title</label>
              <input id="ed-zone-en-topic" class="editor-input" value="${escapeAttr(z.en.topic)}" />
            </div>
            <div class="form-field">
              <label>Tagline</label>
              <input id="ed-zone-en-tagline" class="editor-input" value="${escapeAttr(z.en.tagline)}" />
            </div>
            <div class="form-field">
              <label>Scientific Summary</label>
              <textarea id="ed-zone-en-summary" class="editor-textarea">${escapeAttr(z.en.summary)}</textarea>
            </div>
            <div class="form-field">
              <label>Key Parameters (Format: Label: Value, one per line)</label>
              <textarea id="ed-zone-en-params" class="editor-textarea">${escapeAttr(
                z.en.parameters.map((p) => `${p.label}: ${p.value}`).join("\n")
              )}</textarea>
            </div>
            <div class="form-field">
              <label>Research Highlights (One per line)</label>
              <textarea id="ed-zone-en-highlights" class="editor-textarea">${escapeAttr(
                z.en.highlights.join("\n")
              )}</textarea>
            </div>
          </div>
        </div>
      `;

      document.getElementById("ed-zone-selector").addEventListener("change", (e) => {
        collectCurrentTabFormValues();
        selectedEditZoneId = e.target.value;
        renderEditorTabContent();
      });
    } else if (currentEditorTab === "team") {
      const piMeta = DATA.team.pi;
      const piZh = piMeta.zh;
      const piEn = piMeta.en;
      const memZh = DATA.team.members.zh;

      body.innerHTML = `
        <div class="editor-card">
          <div class="editor-card-header">👨‍🔬 實驗室主持人 (PI) 照片與學術連結</div>
          <div class="editor-photo-row">
            <img id="ed-pi-photo-preview" class="pi-portrait-lg" src="${piMeta.photo || DEFAULT_DATA.team.pi.photo}" alt="PI Portrait" />
            <div style="flex:1;display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <label class="upload-file-label">
                  📁 從電腦選擇教授照片上傳
                  <input id="ed-pi-file-input" type="file" accept="image/*" style="display:none" />
                </label>
                <span style="font-size:0.74rem;color:#94a3b8">支援 JPG / PNG，會自動裁切縮放並存入網頁</span>
              </div>
              <input id="ed-pi-photo-src" class="editor-input" placeholder="或貼上教授照片網址 / assets/pi.jpg" value="${escapeAttr(piMeta.photo || "")}" />
            </div>
          </div>
          <div class="editor-grid-2">
            <div class="form-field">
              <label>教授聯絡 Email</label>
              <input id="ed-pi-email" class="editor-input" value="${escapeAttr(piMeta.email || "")}" />
            </div>
            <div class="form-field">
              <label>教授辦公室位置</label>
              <input id="ed-pi-office" class="editor-input" value="${escapeAttr(piMeta.office || "")}" />
            </div>
            <div class="form-field">
              <label>Google Scholar 網址</label>
              <input id="ed-pi-scholar" class="editor-input" value="${escapeAttr(piMeta.scholarUrl || "")}" />
            </div>
            <div class="form-field">
              <label>ORCID 或個人 CV 網址</label>
              <input id="ed-pi-orcid" class="editor-input" value="${escapeAttr(piMeta.orcidUrl || "")}" />
            </div>
          </div>
        </div>

        <div class="editor-grid-2">
          <div class="editor-card">
            <div class="editor-card-header">👨‍🔬 指導教授資訊 (繁體中文)</div>
            <div class="form-field">
              <label>教授姓名</label>
              <input id="ed-pi-zh-name" class="editor-input" value="${escapeAttr(piZh.name)}" />
            </div>
            <div class="form-field">
              <label>職稱</label>
              <input id="ed-pi-zh-title" class="editor-input" value="${escapeAttr(piZh.title)}" />
            </div>
            <div class="form-field">
              <label>系所單位</label>
              <input id="ed-pi-zh-dept" class="editor-input" value="${escapeAttr(piZh.dept)}" />
            </div>
            <div class="form-field">
              <label>研究專長與願景簡介</label>
              <textarea id="ed-pi-zh-bio" class="editor-textarea">${escapeAttr(piZh.bio)}</textarea>
            </div>
            <div class="form-field">
              <label>🎓 學歷與主要經歷 (每行一項)</label>
              <textarea id="ed-pi-zh-edu" class="editor-textarea">${escapeAttr((piZh.education || []).join("\n"))}</textarea>
            </div>
            <div class="form-field">
              <label>🏆 重要學術榮譽與獎項 (每行一項)</label>
              <textarea id="ed-pi-zh-awards" class="editor-textarea">${escapeAttr((piZh.awards || []).join("\n"))}</textarea>
            </div>
            <div class="form-field">
              <label>🎤 受邀演講與國際學會職務 (每行一項)</label>
              <textarea id="ed-pi-zh-talks" class="editor-textarea">${escapeAttr((piZh.talks || []).join("\n"))}</textarea>
            </div>
          </div>

          <div class="editor-card">
            <div class="editor-card-header">👨‍🔬 Principal Investigator (English)</div>
            <div class="form-field">
              <label>PI Name (English)</label>
              <input id="ed-pi-en-name" class="editor-input" value="${escapeAttr(piEn.name)}" />
            </div>
            <div class="form-field">
              <label>Title (English)</label>
              <input id="ed-pi-en-title" class="editor-input" value="${escapeAttr(piEn.title)}" />
            </div>
            <div class="form-field">
              <label>Department (English)</label>
              <input id="ed-pi-en-dept" class="editor-input" value="${escapeAttr(piEn.dept)}" />
            </div>
            <div class="form-field">
              <label>Biography & Vision (English)</label>
              <textarea id="ed-pi-en-bio" class="editor-textarea">${escapeAttr(piEn.bio)}</textarea>
            </div>
            <div class="form-field">
              <label>🎓 Education & Academic Appointments (One per line)</label>
              <textarea id="ed-pi-en-edu" class="editor-textarea">${escapeAttr((piEn.education || []).join("\n"))}</textarea>
            </div>
            <div class="form-field">
              <label>🏆 Honors & Awards (One per line)</label>
              <textarea id="ed-pi-en-awards" class="editor-textarea">${escapeAttr((piEn.awards || []).join("\n"))}</textarea>
            </div>
            <div class="form-field">
              <label>🎤 Invited Talks & Editorial Service (One per line)</label>
              <textarea id="ed-pi-en-talks" class="editor-textarea">${escapeAttr((piEn.talks || []).join("\n"))}</textarea>
            </div>
          </div>
        </div>

        <div class="editor-card">
          <div class="editor-card-header">
            <span>🧑‍🎓 實驗室成員名單 (${memZh.length} 位)</span>
            <button id="btn-add-member" class="add-item-btn" type="button">＋ 新增一位成員</button>
          </div>
          <div id="ed-members-list" class="editor-grid-2">
            ${memZh
              .map((m, idx) => {
                const mEn = DATA.team.members.en[idx] || { role: "", name: "", topic: "", badge: "" };
                return `
                  <div class="editor-card member-edit-row" data-idx="${idx}">
                    <div class="editor-card-header">
                      <span>成員 #${idx + 1}</span>
                      <button class="delete-item-btn" data-del-member="${idx}" type="button">刪除</button>
                    </div>
                    <div class="form-field">
                      <label>姓名 (中 / 英)</label>
                      <input class="editor-input mem-zh-name" placeholder="中文姓名" value="${escapeAttr(m.name)}" />
                      <input class="editor-input mem-en-name" placeholder="English Name" value="${escapeAttr(mEn.name)}" />
                    </div>
                    <div class="form-field">
                      <label>身分職級 (例如：博士生 / 碩士生)</label>
                      <input class="editor-input mem-zh-role" placeholder="中文職級" value="${escapeAttr(m.role)}" />
                      <input class="editor-input mem-en-role" placeholder="English Role" value="${escapeAttr(mEn.role)}" />
                    </div>
                    <div class="form-field">
                      <label>領域標籤 (例如：局部剪切流場 / BBB)</label>
                      <input class="editor-input mem-zh-badge" placeholder="中文標籤" value="${escapeAttr(m.badge)}" />
                      <input class="editor-input mem-en-badge" placeholder="English Badge" value="${escapeAttr(mEn.badge)}" />
                    </div>
                    <div class="form-field">
                      <label>研究題目 (中 / 英)</label>
                      <input class="editor-input mem-zh-topic" placeholder="中文研究題目" value="${escapeAttr(m.topic)}" />
                      <input class="editor-input mem-en-topic" placeholder="English Research Topic" value="${escapeAttr(mEn.topic)}" />
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `;

      document.getElementById("btn-add-member").addEventListener("click", () => {
        collectCurrentTabFormValues();
        DATA.team.members.zh.push({
          role: "碩士生",
          name: "新成員姓名",
          topic: "醫用超音波研究方向",
          badge: "醫用超音波"
        });
        DATA.team.members.en.push({
          role: "M.S. Student",
          name: "New Member",
          topic: "Therapeutic ultrasound research",
          badge: "Ultrasound"
        });
        renderEditorTabContent();
      });

      body.querySelectorAll("[data-del-member]").forEach((btn) => {
        btn.addEventListener("click", () => {
          collectCurrentTabFormValues();
          const idx = parseInt(btn.dataset.delMember, 10);
          DATA.team.members.zh.splice(idx, 1);
          DATA.team.members.en.splice(idx, 1);
          renderEditorTabContent();
        });
      });

      const piFileIn = document.getElementById("ed-pi-file-input");
      if (piFileIn) {
        piFileIn.addEventListener("change", (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          compressImageFile(file, 480, 0.86, (dataUrl) => {
            document.getElementById("ed-pi-photo-src").value = dataUrl;
            document.getElementById("ed-pi-photo-preview").src = dataUrl;
          });
        });
      }
    } else if (currentEditorTab === "pubs") {
      const researchZones = DATA.landmarks.filter((l) => l.category === "research");
      const eraOpts = [
        { id: "2026-present", label: "2026.02 – present" },
        { id: "post-ncku", label: "加入 NCKU 後 – 2026.02" },
        { id: "pre-ncku", label: "加入 NCKU 前" }
      ];
      const typeOpts = [
        { id: "journal", label: "📘 期刊論文 (Journal)" },
        { id: "conference", label: "🎤 研討會論文 (Conference)" },
        { id: "book", label: "📖 專書論文 (Book Chapter)" }
      ];
      body.innerHTML = `
        <button id="btn-add-pub" class="add-item-btn" type="button">＋ 新增一篇文獻（期刊 / 研討會 / 專書）</button>
        <div class="card-stack">
          ${DATA.publications
            .map(
              (pub, idx) => `
            <div class="editor-card pub-edit-row" data-idx="${idx}">
              <div class="editor-card-header">
                <span>📄 文獻 #${idx + 1} (${escapeAttr(pub.dateStr || pub.year)})</span>
                <button class="delete-item-btn" data-del-pub="${idx}" type="button">刪除此篇</button>
              </div>
              <div class="editor-grid-2">
                <div class="form-field">
                  <label>時期分類 (Era)</label>
                  <select class="editor-select pub-era-in">
                    ${eraOpts
                      .map(
                        (e) => `
                      <option value="${e.id}" ${e.id === (pub.era || "2026-present") ? "selected" : ""}>
                        ${e.label}
                      </option>
                    `
                      )
                      .join("")}
                  </select>
                </div>
                <div class="form-field">
                  <label>文獻類型 (Type)</label>
                  <select class="editor-select pub-type-in">
                    ${typeOpts
                      .map(
                        (t) => `
                      <option value="${t.id}" ${t.id === (pub.type || "journal") ? "selected" : ""}>
                        ${t.label}
                      </option>
                    `
                      )
                      .join("")}
                  </select>
                </div>
              </div>
              <div class="editor-grid-2">
                <div class="form-field">
                  <label>年份與月份 (例如 2026, Jul)</label>
                  <input class="editor-input pub-datestr" value="${escapeAttr(pub.dateStr || String(pub.year))}" />
                </div>
                <div class="form-field">
                  <label>所屬六大超音波主題園區 (自動連動分類)</label>
                  <select class="editor-select pub-zone">
                    ${researchZones
                      .map(
                        (z) => `
                      <option value="${z.id}" ${z.id === pub.zoneId ? "selected" : ""}>
                        ${z.icon} ${z.zh.name} (${z.en.topic})
                      </option>
                    `
                      )
                      .join("")}
                  </select>
                </div>
              </div>
              <div class="form-field">
                <label>論文標題 (Paper Title)</label>
                <input class="editor-input pub-title" value="${escapeAttr(pub.title)}" />
              </div>
              <div class="editor-grid-2">
                <div class="form-field">
                  <label>期刊 / 會議 / 專書名稱與卷期頁數</label>
                  <input class="editor-input pub-journal" value="${escapeAttr(pub.journal)}" />
                </div>
                <div class="form-field">
                  <label>作者群 (Authors)</label>
                  <input class="editor-input pub-authors" value="${escapeAttr(pub.authors)}" />
                </div>
              </div>
              <div class="editor-grid-2">
                <div class="form-field">
                  <label>SCI / IF / 領域排名指標 (選填)</label>
                  <input class="editor-input pub-metrics" value="${escapeAttr(pub.metrics || "")}" />
                </div>
                <div class="form-field">
                  <label>備註標記 (例如 Corresponding author / Co-first author / Oral)</label>
                  <input class="editor-input pub-note" value="${escapeAttr(pub.note || "")}" />
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      document.getElementById("btn-add-pub").addEventListener("click", () => {
        collectCurrentTabFormValues();
        const yr = new Date().getFullYear();
        DATA.publications.unshift({
          era: "2026-present",
          type: "journal",
          year: yr,
          dateStr: `${yr}, Jul`,
          zoneId: "bbb-opening",
          tagZh: "血腦屏障開啟",
          tagEn: "BBB Opening",
          title: "New Therapeutic Ultrasound Publication Title",
          journal: "Journal Name, vol. X, pp. Y–Z",
          authors: "Author, A., & C.-H. Fan*",
          metrics: "SCI, Q1 ACOUSTICS",
          note: "Corresponding author"
        });
        renderEditorTabContent();
      });

      body.querySelectorAll("[data-del-pub]").forEach((btn) => {
        btn.addEventListener("click", () => {
          collectCurrentTabFormValues();
          const idx = parseInt(btn.dataset.delPub, 10);
          DATA.publications.splice(idx, 1);
          renderEditorTabContent();
        });
      });
    } else if (currentEditorTab === "facilities") {
      const facZh = DATA.facilities.zh;
      body.innerHTML = `
        <button id="btn-add-facility" class="add-item-btn" type="button">＋ 新增一項實驗室設備</button>
        <div class="card-stack">
          ${facZh
            .map((f, idx) => {
              const fEn = DATA.facilities.en[idx] || { icon: f.icon, name: "", spec: "", desc: "" };
              return `
                <div class="editor-card fac-edit-row" data-idx="${idx}">
                  <div class="editor-card-header">
                    <span>🛠️ 設備 #${idx + 1}</span>
                    <button class="delete-item-btn" data-del-fac="${idx}" type="button">刪除</button>
                  </div>
                  <div class="form-field">
                    <label>圖示 Emoji (例如 🎯, 💧, 🔬, 🧬)</label>
                    <input class="editor-input fac-icon" value="${escapeAttr(f.icon)}" />
                  </div>
                  <div class="editor-grid-2">
                    <div class="form-field">
                      <label>設備名稱 (中文 / 英文)</label>
                      <input class="editor-input fac-zh-name" placeholder="中文名稱" value="${escapeAttr(f.name)}" />
                      <input class="editor-input fac-en-name" placeholder="English Name" value="${escapeAttr(fEn.name)}" />
                    </div>
                    <div class="form-field">
                      <label>規格重點 (中文 / 英文)</label>
                      <input class="editor-input fac-zh-spec" placeholder="中文規格" value="${escapeAttr(f.spec)}" />
                      <input class="editor-input fac-en-spec" placeholder="English Spec" value="${escapeAttr(fEn.spec)}" />
                    </div>
                  </div>
                  <div class="form-field">
                    <label>功能說明 (中文 / 英文)</label>
                    <input class="editor-input fac-zh-desc" placeholder="中文說明" value="${escapeAttr(f.desc)}" />
                    <input class="editor-input fac-en-desc" placeholder="English Description" value="${escapeAttr(fEn.desc)}" />
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      `;

      document.getElementById("btn-add-facility").addEventListener("click", () => {
        collectCurrentTabFormValues();
        DATA.facilities.zh.push({
          icon: "⚡",
          name: "新超音波核心設備",
          spec: "規格參數",
          desc: "設備用途說明"
        });
        DATA.facilities.en.push({
          icon: "⚡",
          name: "New Ultrasound System",
          spec: "System Specifications",
          desc: "Equipment description"
        });
        renderEditorTabContent();
      });

      body.querySelectorAll("[data-del-fac]").forEach((btn) => {
        btn.addEventListener("click", () => {
          collectCurrentTabFormValues();
          const idx = parseInt(btn.dataset.delFac, 10);
          DATA.facilities.zh.splice(idx, 1);
          DATA.facilities.en.splice(idx, 1);
          renderEditorTabContent();
        });
      });
    } else if (currentEditorTab === "gallery") {
      if (!Array.isArray(DATA.gallery)) DATA.gallery = [];
      const catOptions = [
        { id: "conference", zh: "國際研討會", en: "Conference" },
        { id: "experiment", zh: "實驗室日常", en: "Lab Life" },
        { id: "celebration", zh: "畢業與慶生", en: "Celebration" },
        { id: "outing", zh: "聚餐與出遊", en: "Lab Outing" }
      ];

      body.innerHTML = `
        <button id="btn-add-photo" class="add-item-btn" type="button">＋ 新增一張實驗室日常/活動照片</button>
        <div class="card-stack">
          ${DATA.gallery
            .map(
              (item, idx) => `
            <div class="editor-card gal-edit-row" data-idx="${idx}">
              <div class="editor-card-header">
                <span>📸 活動照片 #${idx + 1}</span>
                <button class="delete-item-btn" data-del-photo="${idx}" type="button">刪除此張照片</button>
              </div>

              <div class="editor-photo-row">
                <img class="editor-photo-preview gal-preview" src="${item.image}" alt="Preview" />
                <div style="flex:1;display:flex;flex-direction:column;gap:8px">
                  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <label class="upload-file-label">
                      📁 從電腦選擇照片上傳
                      <input type="file" accept="image/*" class="gal-file-input" data-upload-idx="${idx}" style="display:none" />
                    </label>
                    <span style="font-size:0.74rem;color:#94a3b8">支援 JPG / PNG，會自動最佳化尺寸存入網頁</span>
                  </div>
                  <input class="editor-input gal-img-src" placeholder="或直接貼上圖片網址 / assets/xxx.jpg 路徑" value="${escapeAttr(item.image)}" />
                </div>
              </div>

              <div class="editor-grid-2">
                <div class="form-field">
                  <label>活動日期 (例如 2026-09)</label>
                  <input class="editor-input gal-date" value="${escapeAttr(item.date)}" />
                </div>
                <div class="form-field">
                  <label>活動分類標籤</label>
                  <select class="editor-select gal-cat">
                    ${catOptions
                      .map(
                        (c) => `
                      <option value="${c.id}" ${c.id === item.category ? "selected" : ""}>
                        ${c.zh} (${c.en})
                      </option>
                    `
                      )
                      .join("")}
                  </select>
                </div>
              </div>

              <div class="editor-grid-2">
                <div class="form-field">
                  <label>活動標題 (中文 / 英文)</label>
                  <input class="editor-input gal-title-zh" placeholder="中文標題" value="${escapeAttr(item.titleZh)}" />
                  <input class="editor-input gal-title-en" placeholder="English Title" value="${escapeAttr(item.titleEn)}" />
                </div>
                <div class="form-field">
                  <label>照片故事說明 (中文 / 英文)</label>
                  <input class="editor-input gal-desc-zh" placeholder="中文說明" value="${escapeAttr(item.descZh)}" />
                  <input class="editor-input gal-desc-en" placeholder="English Description" value="${escapeAttr(item.descEn)}" />
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      document.getElementById("btn-add-photo").addEventListener("click", () => {
        collectCurrentTabFormValues();
        DATA.gallery.unshift({
          id: "photo-" + Date.now(),
          date: new Date().toISOString().slice(0, 7),
          category: "experiment",
          tagZh: "實驗室日常",
          tagEn: "Lab Life",
          titleZh: "新實驗室活動紀錄",
          titleEn: "New Lab Activity Photo",
          descZh: "點選上方「從電腦選擇照片上傳」即可換成你的照片！",
          descEn: "Click 'Upload from computer' above to select your photo!",
          image: (DEFAULT_DATA.gallery && DEFAULT_DATA.gallery[1] ? DEFAULT_DATA.gallery[1].image : "")
        });
        renderEditorTabContent();
      });

      body.querySelectorAll("[data-del-photo]").forEach((btn) => {
        btn.addEventListener("click", () => {
          collectCurrentTabFormValues();
          const idx = parseInt(btn.dataset.delPhoto, 10);
          DATA.gallery.splice(idx, 1);
          renderEditorTabContent();
        });
      });

      // 處理使用者從電腦挑選照片並自動壓縮轉成 Data URL
      body.querySelectorAll(".gal-file-input").forEach((input) => {
        input.addEventListener("change", (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const row = input.closest(".gal-edit-row");
          compressImageFile(file, 960, 0.84, (dataUrl) => {
            row.querySelector(".gal-img-src").value = dataUrl;
            row.querySelector(".gal-preview").src = dataUrl;
          });
        });
      });
    }
  }

  function compressImageFile(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        callback(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function parseParamLines(text) {
    return text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const colonIdx = line.indexOf(":") !== -1 ? line.indexOf(":") : line.indexOf("：");
        if (colonIdx === -1) return { label: "參數", value: line };
        return {
          label: line.slice(0, colonIdx).trim(),
          value: line.slice(colonIdx + 1).trim()
        };
      });
  }

  function splitLines(text) {
    return text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }

  // 收集當前分頁使用者輸入的表單資料寫回 DATA
  function collectCurrentTabFormValues() {
    if (currentEditorTab === "meta") {
      const zhName = document.getElementById("ed-meta-zh-name");
      if (!zhName) return;
      DATA.meta.zh.labName = zhName.value.trim();
      DATA.meta.zh.islandSubtitle = document.getElementById("ed-meta-zh-sub").value.trim();
      DATA.meta.zh.coreHeadline = document.getElementById("ed-meta-zh-headline").value.trim();
      DATA.meta.zh.coreMission = document.getElementById("ed-meta-zh-mission").value.trim();
      DATA.contact.zh.email = document.getElementById("ed-contact-zh-email").value.trim();
      DATA.contact.zh.location = document.getElementById("ed-contact-zh-loc").value.trim();
      DATA.contact.zh.phone = document.getElementById("ed-contact-zh-phone").value.trim();
      DATA.contact.zh.intro = document.getElementById("ed-contact-zh-intro").value.trim();
      DATA.contact.zh.positions = splitLines(document.getElementById("ed-contact-zh-pos").value);

      DATA.meta.en.labName = document.getElementById("ed-meta-en-name").value.trim();
      DATA.meta.en.islandSubtitle = document.getElementById("ed-meta-en-sub").value.trim();
      DATA.meta.en.coreHeadline = document.getElementById("ed-meta-en-headline").value.trim();
      DATA.meta.en.coreMission = document.getElementById("ed-meta-en-mission").value.trim();
      DATA.contact.en.email = document.getElementById("ed-contact-en-email").value.trim();
      DATA.contact.en.location = document.getElementById("ed-contact-en-loc").value.trim();
      DATA.contact.en.phone = document.getElementById("ed-contact-en-phone").value.trim();
      DATA.contact.en.intro = document.getElementById("ed-contact-en-intro").value.trim();
      DATA.contact.en.positions = splitLines(document.getElementById("ed-contact-en-pos").value);
    } else if (currentEditorTab === "news") {
      const rows = document.querySelectorAll(".news-edit-row");
      if (!rows.length && (DATA.news || []).length) return;
      const newNews = [];
      rows.forEach((row, idx) => {
        newNews.push({
          id: "news-" + idx,
          date: row.querySelector(".news-date-in").value.trim() || "2026",
          category: row.querySelector(".news-cat-in").value,
          badgeZh: row.querySelector(".news-badge-zh").value.trim() || "📣 最新動態",
          badgeEn: row.querySelector(".news-badge-en").value.trim() || "📣 News",
          titleZh: row.querySelector(".news-title-zh").value.trim(),
          titleEn: row.querySelector(".news-title-en").value.trim(),
          descZh: row.querySelector(".news-desc-zh").value.trim(),
          descEn: row.querySelector(".news-desc-en").value.trim(),
          linkZoneId: row.querySelector(".news-link-zone").value,
          isNew: row.querySelector(".news-is-new").checked
        });
      });
      DATA.news = newNews;
    } else if (currentEditorTab === "zones") {
      const zhName = document.getElementById("ed-zone-zh-name");
      if (!zhName) return;
      const z = DATA.landmarks.find((item) => item.id === selectedEditZoneId);
      if (!z) return;

      z.zh.name = zhName.value.trim();
      z.zh.topic = document.getElementById("ed-zone-zh-topic").value.trim();
      z.zh.tagline = document.getElementById("ed-zone-zh-tagline").value.trim();
      z.zh.summary = document.getElementById("ed-zone-zh-summary").value.trim();
      z.zh.parameters = parseParamLines(document.getElementById("ed-zone-zh-params").value);
      z.zh.highlights = splitLines(document.getElementById("ed-zone-zh-highlights").value);

      z.en.name = document.getElementById("ed-zone-en-name").value.trim();
      z.en.topic = document.getElementById("ed-zone-en-topic").value.trim();
      z.en.tagline = document.getElementById("ed-zone-en-tagline").value.trim();
      z.en.summary = document.getElementById("ed-zone-en-summary").value.trim();
      z.en.parameters = parseParamLines(document.getElementById("ed-zone-en-params").value);
      z.en.highlights = splitLines(document.getElementById("ed-zone-en-highlights").value);
    } else if (currentEditorTab === "team") {
      const piZhName = document.getElementById("ed-pi-zh-name");
      if (!piZhName) return;
      DATA.team.pi.photo = document.getElementById("ed-pi-photo-src").value.trim();
      DATA.team.pi.email = document.getElementById("ed-pi-email").value.trim();
      DATA.team.pi.office = document.getElementById("ed-pi-office").value.trim();
      DATA.team.pi.scholarUrl = document.getElementById("ed-pi-scholar").value.trim();
      DATA.team.pi.orcidUrl = document.getElementById("ed-pi-orcid").value.trim();

      DATA.team.pi.zh.name = piZhName.value.trim();
      DATA.team.pi.zh.title = document.getElementById("ed-pi-zh-title").value.trim();
      DATA.team.pi.zh.dept = document.getElementById("ed-pi-zh-dept").value.trim();
      DATA.team.pi.zh.bio = document.getElementById("ed-pi-zh-bio").value.trim();
      DATA.team.pi.zh.education = splitLines(document.getElementById("ed-pi-zh-edu").value);
      DATA.team.pi.zh.awards = splitLines(document.getElementById("ed-pi-zh-awards").value);
      DATA.team.pi.zh.talks = splitLines(document.getElementById("ed-pi-zh-talks").value);

      DATA.team.pi.en.name = document.getElementById("ed-pi-en-name").value.trim();
      DATA.team.pi.en.title = document.getElementById("ed-pi-en-title").value.trim();
      DATA.team.pi.en.dept = document.getElementById("ed-pi-en-dept").value.trim();
      DATA.team.pi.en.bio = document.getElementById("ed-pi-en-bio").value.trim();
      DATA.team.pi.en.education = splitLines(document.getElementById("ed-pi-en-edu").value);
      DATA.team.pi.en.awards = splitLines(document.getElementById("ed-pi-en-awards").value);
      DATA.team.pi.en.talks = splitLines(document.getElementById("ed-pi-en-talks").value);

      const zhList = [];
      const enList = [];
      document.querySelectorAll(".member-edit-row").forEach((row) => {
        zhList.push({
          name: row.querySelector(".mem-zh-name").value.trim(),
          role: row.querySelector(".mem-zh-role").value.trim(),
          badge: row.querySelector(".mem-zh-badge").value.trim(),
          topic: row.querySelector(".mem-zh-topic").value.trim()
        });
        enList.push({
          name: row.querySelector(".mem-en-name").value.trim(),
          role: row.querySelector(".mem-en-role").value.trim(),
          badge: row.querySelector(".mem-en-badge").value.trim(),
          topic: row.querySelector(".mem-en-topic").value.trim()
        });
      });
      DATA.team.members.zh = zhList;
      DATA.team.members.en = enList;
    } else if (currentEditorTab === "pubs") {
      const rows = document.querySelectorAll(".pub-edit-row");
      if (!rows.length && DATA.publications.length) return;
      const newPubs = [];
      rows.forEach((row, idx) => {
        const prev = DATA.publications[idx] || {};
        const zoneId = row.querySelector(".pub-zone").value;
        const zoneObj = DATA.landmarks.find((l) => l.id === zoneId);
        const dateStr = row.querySelector(".pub-datestr").value.trim() || "2026";
        const parsedYr = parseInt(dateStr.slice(0, 4), 10) || prev.year || 2026;
        newPubs.push({
          ...prev,
          era: row.querySelector(".pub-era-in").value,
          type: row.querySelector(".pub-type-in").value,
          year: parsedYr,
          dateStr,
          zoneId,
          tagZh: zoneObj ? zoneObj.zh.name : prev.tagZh || "醫用超音波",
          tagEn: zoneObj ? zoneObj.en.name : prev.tagEn || "Ultrasound",
          title: row.querySelector(".pub-title").value.trim(),
          journal: row.querySelector(".pub-journal").value.trim(),
          authors: row.querySelector(".pub-authors").value.trim(),
          metrics: row.querySelector(".pub-metrics").value.trim(),
          note: row.querySelector(".pub-note").value.trim()
        });
      });
      DATA.publications = newPubs;
    } else if (currentEditorTab === "facilities") {
      const rows = document.querySelectorAll(".fac-edit-row");
      if (!rows.length && DATA.facilities.zh.length) return;
      const zhFac = [];
      const enFac = [];
      rows.forEach((row) => {
        const icon = row.querySelector(".fac-icon").value.trim() || "🔬";
        zhFac.push({
          icon,
          name: row.querySelector(".fac-zh-name").value.trim(),
          spec: row.querySelector(".fac-zh-spec").value.trim(),
          desc: row.querySelector(".fac-zh-desc").value.trim()
        });
        enFac.push({
          icon,
          name: row.querySelector(".fac-en-name").value.trim(),
          spec: row.querySelector(".fac-en-spec").value.trim(),
          desc: row.querySelector(".fac-en-desc").value.trim()
        });
      });
      DATA.facilities.zh = zhFac;
      DATA.facilities.en = enFac;
    } else if (currentEditorTab === "gallery") {
      const rows = document.querySelectorAll(".gal-edit-row");
      if (!rows.length && (DATA.gallery || []).length) return;
      const catMap = {
        conference: { zh: "國際研討會", en: "Conference" },
        experiment: { zh: "實驗室日常", en: "Lab Life" },
        celebration: { zh: "畢業與慶生", en: "Celebration" },
        outing: { zh: "聚餐與出遊", en: "Lab Outing" }
      };
      const newGal = [];
      rows.forEach((row, idx) => {
        const cat = row.querySelector(".gal-cat").value;
        const labels = catMap[cat] || catMap.experiment;
        newGal.push({
          id: "photo-" + idx,
          date: row.querySelector(".gal-date").value.trim() || "2026",
          category: cat,
          tagZh: labels.zh,
          tagEn: labels.en,
          titleZh: row.querySelector(".gal-title-zh").value.trim(),
          titleEn: row.querySelector(".gal-title-en").value.trim(),
          descZh: row.querySelector(".gal-desc-zh").value.trim(),
          descEn: row.querySelector(".gal-desc-en").value.trim(),
          image: row.querySelector(".gal-img-src").value.trim()
        });
      });
      DATA.gallery = newGal;
    }
  }

  // ==========================================================================
  // 地圖拖曳平移與滾輪縮放控制
  // ==========================================================================
  function initPanAndZoom() {
    viewport.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".landmark-pin")) return;
      state.isDragging = true;
      state.dragMoved = false;
      state.startX = e.clientX - state.panX;
      state.startY = e.clientY - state.panY;
      viewport.classList.add("dragging");
    });

    window.addEventListener("pointermove", (e) => {
      if (!state.isDragging) return;
      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      if (Math.hypot(dx - state.panX, dy - state.panY) > 5) {
        state.dragMoved = true;
      }
      state.panX = Math.max(-680, Math.min(680, dx));
      state.panY = Math.max(-420, Math.min(420, dy));
      applyTransform(false);
    });

    window.addEventListener("pointerup", () => {
      state.isDragging = false;
      viewport.classList.remove("dragging");
    });

    viewport.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.09 : 0.92;
        state.scale = Math.max(0.5, Math.min(1.85, state.scale * zoomFactor));
        applyTransform(false);
      },
      { passive: false }
    );

    document.getElementById("drawer-close-btn").addEventListener("click", closeDetailDrawer);
    document.getElementById("brand-home").addEventListener("click", closeDetailDrawer);
    document.getElementById("btn-reset-view").addEventListener("click", closeDetailDrawer);

    document.getElementById("zoom-in-btn").addEventListener("click", () => {
      state.scale = Math.min(1.85, state.scale * 1.16);
      applyTransform(true);
    });
    document.getElementById("zoom-out-btn").addEventListener("click", () => {
      state.scale = Math.max(0.5, state.scale * 0.86);
      applyTransform(true);
    });

    const btnAcoustic = document.getElementById("btn-acoustic-mode");
    btnAcoustic.addEventListener("click", () => {
      acousticFieldMode = !acousticFieldMode;
      document.body.classList.toggle("acoustic-field-mode", acousticFieldMode);
      btnAcoustic.classList.toggle("active", acousticFieldMode);
    });

    document.getElementById("btn-lang").addEventListener("click", () => {
      currentLang = currentLang === "zh" ? "en" : "zh";
      refreshAllUI();
    });
  }

  // ==========================================================================
  // 背景海洋聲波漣漪與上浮微氣泡特效畫布
  // ==========================================================================
  function initOceanCanvas() {
    const canvas = document.getElementById("ocean-canvas");
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const microbubbles = Array.from({ length: 36 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.5 + Math.random() * 3.5,
      speed: 0.25 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2
    }));

    let t = 0;
    function drawOcean() {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5 + state.panX * 0.25;
      const cy = h * 0.5 + state.panY * 0.25;
      for (let i = 1; i <= 4; i++) {
        const radius = ((t * 45 + i * 160) % 720) + 180;
        const alpha = Math.max(0, (1 - radius / 900) * (acousticFieldMode ? 0.22 : 0.09));
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = acousticFieldMode ? 2 : 1.2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.58, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      microbubbles.forEach((b) => {
        b.y -= b.speed;
        b.x += Math.sin(t * 2 + b.phase) * 0.3;
        if (b.y < -10) {
          b.y = h + 10;
          b.x = Math.random() * w;
        }
        ctx.fillStyle = "rgba(125, 211, 252, 0.28)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(drawOcean);
    }
    requestAnimationFrame(drawOcean);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
