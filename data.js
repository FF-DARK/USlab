// ============================================================================
// 醫用超音波實驗室 - 聲波生醫島 (Acoustic Bio-Island) 資料設定檔
// ============================================================================

window.LAB_DATA = {
  "meta": {
    "zh": {
      "labName": "超音波與藥物控制釋放實驗室",
      "labShortName": "聲波生醫島 Fan Lab",
      "islandTitle": "醫用超音波探索島",
      "islandSubtitle": "探索超音波如何無創操控流場、細胞、藥物遞送與神經屏障",
      "hudHint": "💡 滾輪縮放 · 按住拖曳地圖 · 點擊地標開啟互動原理模擬",
      "acousticModeLabel": "聲場透視模式",
      "resetViewLabel": "重置視角",
      "allZonesLabel": "島嶼導覽",
      "filterAll": "全部主題",
      "coreHeadline": "以超音波物理與微氣泡工程，開創無創腦疾治療與再生醫學",
      "coreMission": "本實驗室由國立成功大學生物醫學工程學系 范景翔副教授主持，專注於超音波對比劑藥物遞送系統、血腦屏障開啟、聲遺傳學神經刺激、聚焦聲學渦旋流場與聲學微流體 3D 幹細胞球組裝技術。團隊已發表 62 篇 SCI 期刊論文（總引用達 3,485 次），致力於腦瘤、帕金森氏症、癲癇治療及組織修復之臨床轉譯。"
    },
    "en": {
      "labName": "Ultrasound and Drug Controlled Release Laboratory",
      "labShortName": "Acoustic Bio-Island",
      "islandTitle": "Therapeutic Ultrasound Island",
      "islandSubtitle": "Exploring non-invasive acoustic manipulation of flow fields, cells, and neural barriers",
      "hudHint": "💡 Scroll to zoom · Drag to pan · Click landmarks for interactive physics simulations",
      "acousticModeLabel": "Acoustic Field View",
      "resetViewLabel": "Reset View",
      "allZonesLabel": "Island Guide",
      "filterAll": "All Topics",
      "coreHeadline": "Pioneering Non-Invasive Brain Therapy & Regenerative Medicine via Ultrasound",
      "coreMission": "Directed by Assoc. Prof. Ching-Hsiang Fan at National Cheng Kung University (NCKU BME), our lab specializes in microbubble-based drug delivery, BBB opening, sonogenetic neuromodulation, focused acoustic vortex flow fields, and acoustofluidic 3D stem cell spheroid assembly—with 62 SCI papers and 3,485 citations."
    }
  },
  "landmarks": [
    {
      "id": "bbb-opening",
      "category": "research",
      "icon": "🧠",
      "badgeColor": "#38bdf8",
      "GlowColor": "rgba(56, 189, 248, 0.55)",
      "x": 31.5,
      "y": 19.5,
      "simType": "bbb",
      "zh": {
        "code": "ZONE 01",
        "name": "血腦屏障星門",
        "topic": "血腦屏障可逆式開啟 (BBB Opening)",
        "tagline": "聚焦超音波結合微氣泡，無創開啟中樞神經藥物通道",
        "summary": "血腦屏障阻擋了 98% 以上的大分子神經藥物。我們利用低強度聚焦超音波（FUS）激發循環系統中的微氣泡（Microbubbles），在腦微血管內產生穩態空化效應（Stable Cavitation），溫和且可逆地鬆開內皮細胞緊密連接（Tight Junctions），讓抗體、基因載體或化療藥物精準進入腦部病灶。",
        "parameters": [
          {
            "label": "中心頻率",
            "value": "0.5 – 1.5 MHz"
          },
          {
            "label": "機械指數 (MI)",
            "value": "0.25 – 0.45 (穩態空化)"
          },
          {
            "label": "恢復時間",
            "value": "4 – 24 小時可逆閉合"
          }
        ],
        "highlights": [
          "結合聚焦超音波與微氣泡，顯著提升間質幹細胞 (MSCs) 跨越屏障遷移至腦部之效率 (Journal of Controlled Release, 2026)",
          "開發多功能微氣泡（超音波對比劑）藥物遞送系統，應用於腦瘤與神經退化性疾病小動物模型治療",
          "建立安全可逆之血腦屏障開啟技術，精準遞送神經保護藥物與基因載體進入中樞神經系統"
        ],
        "simTitle": "互動模擬：微氣泡穩態空化開啟內皮緊密連接",
        "simDesc": "調整下方「超音波聲壓 (Acoustic Pressure)」，觀察微氣泡在血管中振盪如何可逆地撐開血腦屏障緊密連接，讓治療分子穿透進入腦實質區。"
      },
      "en": {
        "code": "ZONE 01",
        "name": "BBB Sanctuary Gate",
        "topic": "Blood-Brain Barrier (BBB) Opening",
        "tagline": "Non-invasive, reversible gateway to the central nervous system via FUS + microbubbles",
        "summary": "The Blood-Brain Barrier blocks over 98% of neurotherapeutics. Using low-intensity Focused Ultrasound (FUS) combined with circulating microbubbles, we induce localized stable cavitation within cerebral capillaries—transiently and safely loosening endothelial tight junctions to deliver antibodies, gene vectors, and stem cells into targeted brain regions.",
        "parameters": [
          {
            "label": "Center Frequency",
            "value": "0.5 – 1.5 MHz"
          },
          {
            "label": "Mechanical Index",
            "value": "0.25 – 0.45 (Stable)"
          },
          {
            "label": "Closure Window",
            "value": "4 – 24 hrs Reversible"
          }
        ],
        "highlights": [
          "Combining focused ultrasound and microbubbles to enhance migration of mesenchymal stem cells (MSCs) to the brain (J. Control. Release, 2026)",
          "Microbubble fabrication and targeted drug delivery in small animal models of brain tumors and neurodegenerative diseases",
          "Safe, reversible blood-brain barrier opening for non-invasive central nervous system therapy"
        ],
        "simTitle": "Interactive Sim: Microbubble Cavitation & Tight Junction Opening",
        "simDesc": "Adjust the Acoustic Pressure slider below to observe oscillating microbubbles transiently widening endothelial tight junctions for drug extravasation."
      }
    },
    {
      "id": "neuromodulation",
      "category": "research",
      "icon": "⚡",
      "badgeColor": "#a855f7",
      "GlowColor": "rgba(168, 85, 247, 0.55)",
      "x": 69.5,
      "y": 21.5,
      "simType": "neuro",
      "zh": {
        "code": "ZONE 02",
        "name": "神經調控電塔",
        "topic": "超音波神經刺激",
        "tagline": "毫米級空間解析度之深腦與周邊神經無創調控",
        "summary": "傳統腦神經刺激技術難以兼顧穿透深度與聚焦精度。本實驗室探索低強度脈衝超音波神經調控技術，透過聲輻射力與細胞膜機械敏感離子通道作用，在非侵入的情況下，精準興奮或抑制深部腦區及周邊神經迴路。",
        "parameters": [
          {
            "label": "空間解析度",
            "value": "1 – 3 mm (毫米級聚焦)"
          },
          {
            "label": "脈衝重複頻率 (PRF)",
            "value": "100 Hz – 3 kHz"
          },
          {
            "label": "工作週期 (Duty)",
            "value": "5% – 50% (無熱效應)"
          },
          {
            "label": "調控機制",
            "value": "興奮性 / 抑制性雙向調控"
          }
        ],
        "highlights": [
          "利用聲遺傳學 (Sonogenetics) 精準調控急性癲癇模型中之 GABAergic 抑制型神經元 (Journal of Controlled Release, 2025), 顯著改善帕金森氏症動物模型之運動功能障礙 (Nano Letters, 2021)",
          "應用超音波神經調控於神經退化性疾病治療與化療後之組織損傷修復"
        ],
        "simTitle": "互動模擬：聚焦超音波誘發神經元動作電位傳導",
        "simDesc": "調整「脈衝重複頻率 (PRF) 與強度」，觀察聚焦聲場如何觸發目標神經元放電並沿突觸網路傳遞神經脈衝。"
      },
      "en": {
        "code": "ZONE 02",
        "name": "Neural Modulation Beacon",
        "topic": "Ultrasonic Neuromodulation",
        "tagline": "Millimeter-precision non-invasive stimulation of deep brain and peripheral neural circuits",
        "summary": "Traditional brain stimulation methods face a trade-off between penetration depth and spatial precision. Our lab investigates low-intensity pulsed ultrasound (LIPUS) neuromodulation, using acoustic radiation force to interact with mechanosensitive ion channels on cell membranes for the non-invasive, precise excitation or inhibition of deep brain regions and peripheral neural circuits.",
        "parameters": [
          {
            "label": "Spatial Resolution",
            "value": "1 – 3 mm Focal Spot"
          },
          {
            "label": "Pulse Rep. Freq (PRF)",
            "value": "100 Hz – 3 kHz"
          },
          {
            "label": "Duty Cycle",
            "value": "5% – 50% (Non-thermal)"
          },
          {
            "label": "Modality",
            "value": "Sonogenetics & tFUS"
          }
        ],
        "highlights": [
          "Modulation of GABAergic neurons in acute epilepsy using sonogenetics (Journal of Controlled Release, 2025)",
          "Sonogenetic-based neuromodulation for the amelioration of Parkinson's disease (Nano Letters, 2021)",
          "Ultrasound neuromodulation for neurodegenerative diseases and tissue repair after chemotherapy"
        ],
        "simTitle": "Interactive Sim: Ultrasonic Neural Firing & Synaptic Propagation",
        "simDesc": "Adjust Pulse Frequency & Intensity to trigger action potentials and observe synaptic wave propagation across the neural network."
      }
    },
    {
      "id": "drug-delivery",
      "category": "research",
      "icon": "💊",
      "badgeColor": "#f43f5e",
      "GlowColor": "rgba(244, 63, 94, 0.55)",
      "x": 25.5,
      "y": 75.5,
      "simType": "drug",
      "zh": {
        "code": "ZONE 03",
        "name": "微泡精準物流港",
        "topic": "超音波導引精準藥物遞送 (Targeted Drug Delivery)",
        "tagline": "聲響應微氣泡與相變奈米液滴之時空可控釋放",
        "summary": "全身性化療常伴隨嚴重副作用，且腫瘤高間質壓會阻礙藥物滲透。我們設計載藥微氣泡（Drug-loaded Microbubbles）、聲敏脂質體與相變奈米液滴（Phase-Change Nanodroplets），平時在血液中保持穩定，唯有在超音波聚焦照射的病灶區域才會產生聲孔效應（Sonoporation）與局部推進力，將高濃度藥物精準注入靶點細胞。",
        "parameters": [
          {
            "label": "載體粒徑",
            "value": "200 nm (液滴) – 2 μm (微泡)"
          },
          {
            "label": "觸發機制",
            "value": "聲致相變 (ADV) / 聲孔效應"
          },
          {
            "label": "局部濃度提升",
            "value": "提升 5 – 18 倍腫瘤累積量"
          },
          {
            "label": "裝載貨物",
            "value": "小分子化療藥、mRNA、CRISPR"
          }
        ],
        "highlights": [
          "聚焦超音波結合載藥微氣泡，成功抑制海人酸誘發癲癇動物之異常腦波放電 (Ultrasonics Sonochemistry, 2025)",
          "開發碳點殼層微氣泡 (Carbon Dots-Shelled Microbubbles) 結合聚焦超音波強化聲動力治療 (Ultrasonics Sonochemistry, 2023)",
          "利用聚焦聲學渦旋 (Focused Acoustic Vortex) 顯著提升經皮藥物遞送效率 (Ultrasonics, 2025)"
        ],
        "simTitle": "互動模擬：載藥微泡靶向擊破與聲孔藥物滲透",
        "simDesc": "調整「超音波觸發能量」，觀察血液中的載藥微泡通過目標病灶區時被聲波精準擊破，並透過聲孔效應將藥物送入組織深處。"
      },
      "en": {
        "code": "ZONE 03",
        "name": "Microbubble Logistics Port",
        "topic": "Targeted Acoustic Drug Delivery",
        "tagline": "Spatiotemporally controlled release via acoustically active microbubbles and acoustic vortices",
        "summary": "Systemic therapy suffers from off-target toxicity and poor tissue penetration. We engineer drug-loaded microbubbles, carbon dots-shelled microbubbles, and focused acoustic vortex systems that circulate safely until triggered by focused ultrasound—inducing sonoporation, sonodynamic therapy, and enhanced transdermal delivery.",
        "parameters": [
          {
            "label": "Carrier Size",
            "value": "200 nm – 2 μm (Microbubbles)"
          },
          {
            "label": "Trigger Mechanism",
            "value": "Sonoporation / Acoustic Vortex"
          },
          {
            "label": "Local Enhancement",
            "value": "5× – 18× Uptake Increase"
          },
          {
            "label": "Applications",
            "value": "Brain Tumor, Epilepsy, SDT"
          }
        ],
        "highlights": [
          "Focused ultrasound combined with drug-loaded microbubbles suppresses ictal spikes in epileptic animals (Ultrasonics Sonochemistry, 2025)",
          "Enhanced sonodynamic therapy by carbon dots-shelled microbubbles with focused ultrasound (Ultrasonics Sonochemistry, 2023)",
          "Feasibility of using focused acoustic vortex for enhancing transdermal delivery (Ultrasonics, 2025)"
        ],
        "simTitle": "Interactive Sim: Acoustic Carrier Triggering & Tissue Penetration",
        "simDesc": "Adjust the Ultrasonic Trigger Energy to vaporize circulating nanocarriers at the focal zone and drive drug nanoparticles into target cells."
      }
    },
    {
      "id": "cell-spheroid",
      "category": "research",
      "icon": "🔮",
      "badgeColor": "#10b981",
      "GlowColor": "rgba(16, 185, 129, 0.55)",
      "x": 73,
      "y": 50,
      "simType": "spheroid",
      "zh": {
        "code": "ZONE 04",
        "name": "聲場懸浮生態巨蛋",
        "topic": "聲學微流體與 3D 細胞球聚集 (Cell Spheroid Assembly)",
        "tagline": "快速高效之聲學微流體裝置，無接觸組裝高治療潛力之 3D 幹細胞球",
        "summary": "2D 培養皿無法真實還原體內微環境。本實驗室開發快速高效之聲學微流體裝置（Acoustofluidic Device），利用駐波聲場產生的聲輻射位能井打造無接觸式「聲學鑷子」。在短時間內即可將懸浮幹細胞溫和聚集至聲壓節點，組裝出具備高治療與再生潛力的立體 3D 幹細胞球（3D Stem Cell Spheroids）。",
        "parameters": [],
        "highlights": [
          "開發快速高效之聲學微流體晶片，組裝具高度治療潛力之 3D 幹細胞球 (Materials Today Advances, 2026)",
          "無須磁珠或外加標記，純物理駐波聲場即可高通量操控細胞形成均一 3D 立體球體",
          "顯著提升幹細胞球之生長因子分泌、細胞外基質（ECM）重塑與組織修復效能"
        ],
        "simTitle": "互動模擬：駐波聲場節點聚集 3D 幹細胞球",
        "simDesc": "提升「駐波聲場強度 (Standing Wave Amplitude)」，觀察原本散亂懸浮的幹細胞如何順著聲輻射力梯度移動至聲壓節點，緊密聚集成 3D 細胞球！"
      },
      "en": {
        "code": "ZONE 04",
        "name": "Acoustic Levitation Dome",
        "topic": "3D Stem Cell Spheroid Assembly",
        "tagline": "Rapid and efficient acoustofluidic device for 3D stem cell spheroid biofabrication",
        "summary": "2D monolayers fail to recapitulate in vivo physiology. We developed a rapid and efficient acoustofluidic device using standing acoustic waves to gently trap and aggregate suspended stem cells at pressure nodes—fabricating uniform 3D stem cell spheroids with significantly enhanced therapeutic and regenerative potential.",
        "parameters": [],
        "highlights": [
          "Rapid and efficient acoustofluidic device for 3D stem cell spheroid assembly with enhanced therapeutic potential (Materials Today Advances, 2026)",
          "Biocompatible, contact-free acoustic manipulation without magnetic beads or thermal damage",
          "Enhanced paracrine factor secretion, ECM remodeling, and regenerative efficacy"
        ],
        "simTitle": "Interactive Sim: Standing-Wave Acoustic Trapping of 3D Cell Spheroids",
        "simDesc": "Increase Standing Wave Amplitude to watch dispersed stem cells migrate toward acoustic pressure nodes and self-assemble into a 3D spheroid."
      }
    },
    {
      "id": "cell-signaling",
      "category": "research",
      "icon": "📡",
      "badgeColor": "#f59e0b",
      "GlowColor": "rgba(245, 158, 11, 0.55)",
      "x": 28.5,
      "y": 48,
      "simType": "signaling",
      "zh": {
        "code": "ZONE 05",
        "name": "細胞機械轉導通訊站",
        "topic": "機械力介導細胞訊息傳導",
        "tagline": "結合聚焦超音波與壓電奈米片、機械敏感通道，精準激活細胞內鈣離子波與修復訊號",
        "summary": "細胞如何「聽見」並回應超音波？我們探討超音波機械力學轉導（Mechanotransduction）直接調控細胞膜機械敏感離子通道（Piezo1 / TRPV4），局部產生壓電電位與機械應變，選擇性激活目標細胞之鈣離子（Ca²⁺）內流與下游訊號傳導。",
        "parameters": [],
        "highlights": [
          "利用聚焦超音波激發壓電二硫化鉬奈米片 (Piezoelectric MoS₂ Nanosheets) 實現高選擇性細胞激活 (ACS Nano, 2023)",
          "結合即時鈣離子螢光影像，解析超音波誘導之跨膜離子通道開啟與細胞內訊號動態",
          "應用超音波細胞訊息傳導調控於神經退化疾病與化療後之組織再生修復"
        ],
        "simTitle": "互動模擬：聲波激活離子通道與細胞內鈣離子波傳遞",
        "simDesc": "調整「超音波機械刺激強度」，觀察細胞膜張力與壓電效應如何開啟離子通道，引發鈣離子流入並點亮細胞核基因轉錄訊號。"
      },
      "en": {
        "code": "ZONE 05",
        "name": "Mechanotransduction Relay",
        "topic": "Cellular Mechanotransduction Signaling",
        "tagline": "Selective cell activation via focused ultrasound, piezoelectric nanosheets, and mechanosensitive channels",
        "summary": "How do living cells sense ultrasound? We investigate ultrasonic mechanotransduction and mechanosensitive channels (Piezo1/TRPV4), triggering localized intracellular Ca²⁺ waves and regenerative signaling cascades.",
        "parameters": [],
        "highlights": [
          "Selective activation of cells by piezoelectric molybdenum disulfide (MoS₂) nanosheets with focused ultrasound (ACS Nano, 2023)",
          "Live-cell calcium imaging capturing ultrasonic and acousto-piezoelectric signaling cascades",
          "Applications in selective neuromodulation and tissue repair after chemotherapy"
        ],
        "simTitle": "Interactive Sim: Piezo1 Channel Gating & Intracellular Ca²⁺ Signaling",
        "simDesc": "Adjust Mechanical Stimulation Intensity to deform the lipid bilayer, open ion channels, and trigger intracellular calcium signaling waves."
      }
    },
    {
      "id": "shear-flow",
      "category": "research",
      "icon": "🌊",
      "badgeColor": "#06b6d4",
      "GlowColor": "rgba(6, 182, 212, 0.6)",
      "x": 69,
      "y": 74.5,
      "simType": "streaming",
      "zh": {
        "code": "ZONE 06",
        "name": "微流體聲流渦流灣",
        "topic": "聚焦聲學渦旋與局部特殊剪切力流場 (Acoustic Vortex & Shear Flow)",
        "tagline": "利用聚焦聲學渦旋與微聲流產生可控局部剪切應力，實現遠端生物膜剝離與促進傳輸",
        "summary": "當螺旋相位波前之「聚焦聲學渦旋（Focused Acoustic Vortex）」或微氣泡在流體中振盪時，聲角動量傳遞與非線性雷諾應力會產生獨特的旋轉微聲流（Acoustic Microstreaming）與高度局部化的特殊剪切力流場（Localized Shear Stress Field）。我們運用此無接觸式局部剪切力流場，成功實現遠端頑強細菌生物膜（Biofilm）剝離清除，並大幅提升經皮與組織間質質量傳輸。",
        "parameters": [],
        "highlights": [
          "利用聚焦聲學渦旋 (Focused Acoustic Vortex) 產生局部旋轉剪切流場，實現遠端非接觸式生物膜剝離清除 (Ultrasonics Sonochemistry, 2025)",
          "證實聚焦聲學渦旋特殊流場可有效強化經皮藥物穿透與遞送效率 (Ultrasonics, 2025)",
          "精準調控聲學渦旋拓撲荷數與聲流剪切應力分佈，應用於生醫微流體與細胞力學研究"
        ],
        "simTitle": "互動模擬：聚焦聲學渦旋與微聲流局部剪切應力流場",
        "simDesc": "調整「聲波振幅與渦旋強度」，觀察振盪核心周圍形成的微聲流渦旋（Microstreaming Vortices），粒子顏色代表局部剪切力（Shear Stress τ）高低！"
      },
      "en": {
        "code": "ZONE 06",
        "name": "Acoustic Streaming Vortex Bay",
        "topic": "Focused Acoustic Vortex & Localized Shear Flow",
        "tagline": "Harnessing focused acoustic vortices and microstreaming shear stress for remote biofilm dislodgment and delivery",
        "summary": "Focused Acoustic Vortices carrying orbital angular momentum and oscillating microbubbles generate steady rotational Acoustic Microstreaming with high-gradient localized shear stress fields. We harness these programmable shear flows for non-contact remote biofilm dislodgment, enhanced transdermal drug delivery, and cellular mechanobiology.",
        "parameters": [],
        "highlights": [
          "Remote biofilm dislodgment using focused acoustic vortex and localized shear stress flow (Ultrasonics Sonochemistry, 2025)",
          "Feasibility of using focused acoustic vortex for enhancing transdermal drug delivery (Ultrasonics, 2025)",
          "Programmable microstreaming vortices for microfluidic mass transport and cellular shear studies"
        ],
        "simTitle": "Interactive Sim: Quadrupole Microstreaming Vortices & Shear Stress Field",
        "simDesc": "Adjust Oscillation Amplitude to visualize acoustic microstreaming streamlines and color-coded local fluid shear stress (τ) around the oscillating boundary."
      }
    },
    {
      "id": "core-tower",
      "category": "facility",
      "icon": "🗼",
      "badgeColor": "#38bdf8",
      "GlowColor": "rgba(56, 189, 248, 0.7)",
      "x": 50.3,
      "y": 34.5,
      "zh": {
        "code": "CORE HUB",
        "name": "聚焦超音波換能器燈塔",
        "topic": "實驗室總覽與核心超音波設備",
        "tagline": "聲波生醫島的能量核心：從聲場物理設計、換能器陣列到活體治療平台"
      },
      "en": {
        "code": "CORE HUB",
        "name": "Transducer Core Lighthouse",
        "topic": "Lab Overview & Ultrasound Core Facilities",
        "tagline": "The acoustic heart of our island: from phased-array transducers and hydrophone scanning to in vivo therapy"
      }
    },
    {
      "id": "publications-library",
      "category": "library",
      "icon": "📚",
      "badgeColor": "#818cf8",
      "GlowColor": "rgba(129, 140, 248, 0.55)",
      "x": 44.2,
      "y": 60.5,
      "zh": {
        "code": "LIBRARY",
        "name": "聲學文獻圖書館",
        "topic": "代表性期刊與會議論文 (Publications)",
        "tagline": "依六大研究主題篩選本實驗室發表之學術成果"
      },
      "en": {
        "code": "LIBRARY",
        "name": "Acoustic Literature Pavilion",
        "topic": "Selected Publications & Patents",
        "tagline": "Explore our peer-reviewed journal articles and conference papers filtered by the 6 research zones"
      }
    },
    {
      "id": "pi-office",
      "category": "pi",
      "icon": "👨‍🔬",
      "badgeColor": "#38bdf8",
      "GlowColor": "rgba(56, 189, 248, 0.65)",
      "x": 57.2,
      "y": 31,
      "zh": {
        "code": "PI OFFICE",
        "name": "實驗室主持人 (PI)",
        "topic": "指導教授簡介與學術經歷 (Principal Investigator)",
        "tagline": "認識實驗室主持人：學經歷、研究願景、重要學術榮譽與受邀演講"
      },
      "en": {
        "code": "PI OFFICE",
        "name": "Principal Investigator",
        "topic": "Principal Investigator (PI Profile & Honors)",
        "tagline": "Meet our Lab Director: biography, academic appointments, honors, and invited keynotes"
      }
    },
    {
      "id": "members-camp",
      "category": "team",
      "icon": "⛺",
      "badgeColor": "#34d399",
      "GlowColor": "rgba(52, 211, 153, 0.55)",
      "x": 53.5,
      "y": 73,
      "zh": {
        "code": "TEAM CAMP",
        "name": "研究團隊成員",
        "topic": "實驗室研究團隊成員 (Lab Members)",
        "tagline": "跨足生醫工程、聲學物理、流體力學與神經科學的跨領域團隊"
      },
      "en": {
        "code": "TEAM CAMP",
        "name": "Lab Members",
        "topic": "Research Team Members",
        "tagline": "An interdisciplinary team bridging biomedical engineering, acoustics, fluid mechanics, and neuroscience"
      }
    },
    {
      "id": "join-harbor",
      "category": "contact",
      "icon": "⛵",
      "badgeColor": "#fbbf24",
      "GlowColor": "rgba(251, 191, 36, 0.55)",
      "x": 36.8,
      "y": 83.5,
      "zh": {
        "code": "JOIN US",
        "name": "新航道招募碼頭",
        "topic": "加入我們與聯絡資訊 (Join Us & Contact)",
        "tagline": "歡迎對醫用超音波、微流體、細胞工程與神經調控充滿熱情的夥伴登島！"
      },
      "en": {
        "code": "JOIN US",
        "name": "Recruitment Harbor",
        "topic": "Join Our Lab & Collaborations",
        "tagline": "We welcome passionate PhD/MS students, postdocs, and undergrads to embark on therapeutic ultrasound research!"
      }
    },
    {
      "id": "lab-gallery",
      "category": "gallery",
      "icon": "📸",
      "badgeColor": "#ec4899",
      "GlowColor": "rgba(236, 72, 153, 0.58)",
      "x": 78.8,
      "y": 63,
      "zh": {
        "code": "LAB LIFE",
        "name": "實驗室日常相簿",
        "topic": "實驗室日常與活動剪影 (Lab Life & Gallery)",
        "tagline": "紀錄我們在國際研討會、超音波實驗日常、聚餐出遊與畢業歡送的精彩瞬間！"
      },
      "en": {
        "code": "LAB LIFE",
        "name": "Lab Life Gallery",
        "topic": "Lab Activities & Photo Gallery",
        "tagline": "Capturing memorable moments from international conferences, hands-on experiments, lab outings, and celebrations!"
      }
    }
  ],
  "facilities": {
    "zh": [
      {
        "icon": "🎯",
        "name": "多通道相位陣列聚焦超音波系統",
        "spec": "0.25 – 5 MHz · 64/128 通道獨立相位控制",
        "desc": "支援經顱動態電子聚焦、多焦點聲場合成與即時被動空化監測。"
      },
      {
        "icon": "💧",
        "name": "三軸精密水聽針聲場掃描水槽",
        "spec": "針式/光纖水聽針 · 10 μm 步進空間解析度",
        "desc": "完整量測三維聲壓分佈、機械指數 (MI) 與非線性諧波頻譜。"
      },
      {
        "icon": "🔬",
        "name": "聲學微流體與高速顯微流場觀測平台",
        "spec": "高速攝影機 + Micro-PIV + 螢光共軛焦顯微鏡",
        "desc": "同步施加表面聲波/體聲波並即時拍攝微氣泡振盪、局部剪切流場與細胞鈣離子訊號。"
      },
      {
        "icon": "🧬",
        "name": "微氣泡與奈米液滴製備分析系統",
        "spec": "微流道高通量造泡 + 奈米粒徑電位分析儀",
        "desc": "自製單分散載藥微氣泡、相變奈米液滴與外泌體聲學改質載體。"
      }
    ],
    "en": [
      {
        "icon": "🎯",
        "name": "Multi-Channel Phased-Array Focused Ultrasound System",
        "spec": "0.25 – 5 MHz · 64/128-ch Independent Phase Control",
        "desc": "Enables electronic beam steering, multi-focal holographic synthesis, and real-time passive cavitation mapping."
      },
      {
        "icon": "💧",
        "name": "3-Axis Precision Hydrophone Acoustic Scanning Tank",
        "spec": "Needle & Fiber-Optic Hydrophones · 10 μm Resolution",
        "desc": "Full 3D acoustic pressure field calibration, spatial-peak pulse-average intensity, and harmonic spectrum analysis."
      },
      {
        "icon": "🔬",
        "name": "Acousto-Microfluidics & High-Speed Micro-PIV Platform",
        "spec": "High-Speed Camera + Micro-PIV + Epifluorescence",
        "desc": "Simultaneous acoustic excitation and real-time imaging of microbubble dynamics, shear flow fields, and cellular Ca²⁺."
      },
      {
        "icon": "🧬",
        "name": "Microbubble & Nanodroplet Synthesis Suite",
        "spec": "Microfluidic Flow-Focusing + Nanoparticle Tracking",
        "desc": "Custom formulation of monodisperse drug-loaded microbubbles, phase-change nanodroplets, and engineered exosomes."
      }
    ]
  },
  "publications": [
    {
      "era": "2026-present",
      "type": "journal",
      "year": 2026,
      "dateStr": "2026, Jul",
      "zoneId": "shear-flow",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "T.-N. Phan, H.-C. Wang, C.-H. Fan, C.-H. Huang, Y. Fang, Y. Luo, Z. Ma, I.-H. Lin, W.-J. Wang, Y.-C. Lin*, C.-K. Yeh*",
      "title": "Modulation of Cilia Motility by Vortex-Ultrasound-Induced Shear Stress",
      "journal": "ACS Nano, vol. 20, pp. 20730–20746",
      "metrics": "SCI, Q1 MATERIALS SCIENCE / NANOSCIENCE",
      "note": ""
    },
    {
      "era": "2026-present",
      "type": "journal",
      "year": 2026,
      "dateStr": "2026, Apr",
      "zoneId": "cell-spheroid",
      "tagZh": "聲場懸浮生態巨蛋",
      "tagEn": "Acoustic Levitation Dome",
      "authors": "Y.-W. Lin, W.-L. Tseng, C. B.-X. Huang, J.-W. Chen, S.-H. Huang, C.-H. Fan*, Y.-Y. Hsueh*",
      "title": "Rapid and efficient acoustofluidic device for 3D stem cell spheroid assembly with enhanced therapeutic potential",
      "journal": "Materials Today Advances, vol. 30, 100779",
      "metrics": "SCI, Q1 MATERIALS SCIENCE",
      "note": "Corresponding author"
    },
    {
      "era": "2026-present",
      "type": "journal",
      "year": 2026,
      "dateStr": "2026, Feb",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "J.-W. Lin#, C.-H. Fan#, T.-T. Kuo, C.-K. Yeh*",
      "title": "Combining focused ultrasound and microbubbles for enhancing the migration of mesenchymal stem cells to the brain",
      "journal": "Journal of Controlled Release, vol. 390, 114585",
      "metrics": "SCI, IF: 11.5, Q1 PHARMACOLOGY & PHARMACY",
      "note": "Co-first author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2026,
      "dateStr": "2026, Jan",
      "zoneId": "neuromodulation",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "H.-C. Wang#, T.-N. Phan#, T.-H. Chen#, Y. Lin, N. Hsu, C.-H. Fan, P.-H. Chiang, C.-H. Chen, C.-K. Yeh*, Y.-C. Lin*",
      "title": "Enhancing prestin oligomerization for superior sonogenetics",
      "journal": "Theranostics, vol. 16, pp. 3321–3337",
      "metrics": "SCI, Q1 MEDICINE, RESEARCH & EXPERIMENTAL",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Dec",
      "zoneId": "shear-flow",
      "secondaryZoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "C.-H. Li, C.-W. Kuo, C.-H. Fan*",
      "title": "Feasibility of using focused acoustic vortex for enhancing transdermal delivery",
      "journal": "Ultrasonics, vol. 156, 107747",
      "metrics": "SCI, IF: 4.1, Q1 ACOUSTICS 5/41",
      "note": "Corresponding author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Dec",
      "zoneId": "shear-flow",
      "secondaryZoneId": "cell-spheroid",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "Z.-H. Hsieh#, C.-H. Fan#, H.-H. Tu, C.-W. Hu, M.-L. Li, C.-K. Yeh*",
      "title": "Acoustic vortex induced bubble cage: An on-demand light guide in turbid media",
      "journal": "Ultrasonics, vol. 156, 107761",
      "metrics": "SCI, IF: 4.1, Q1 ACOUSTICS 5/41",
      "note": "Co-first author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Oct",
      "zoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "C.-H. Li, W.-H. Chao, P.-C. Wu*, C.-H. Fan*",
      "title": "Remote biofilm dislodgment using focused acoustic vortex",
      "journal": "Ultrasonics Sonochemistry, vol. 121, 107423",
      "metrics": "SCI, IF: 9.7, Q1 ACOUSTICS 1/41",
      "note": "Corresponding author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Sep",
      "zoneId": "drug-delivery",
      "secondaryZoneId": "bbb-opening",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "P.-H. Wu, M.-E. Chien, Y.-J. Wu*, C.-H. Fan*",
      "title": "Focused ultrasound combined with drug-loaded microbubbles suppresses ictal spikes in kainic acid-induced epileptic animals",
      "journal": "Ultrasonics Sonochemistry, vol. 120, 107518",
      "metrics": "SCI, IF: 9.7, Q1 ACOUSTICS 1/41",
      "note": "Corresponding author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Sep",
      "zoneId": "drug-delivery",
      "secondaryZoneId": "bbb-opening",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-C. Tsai#, C.-H. Fan#, C.-W. Lin, A. Bouakaz, C.-K. Yeh*",
      "title": "Focused ultrasound-triggered escitalopram delivery using microbubble-liposome complexes for rapid and sustained serotonin regulation in depression therapy",
      "journal": "Biomedicine & Pharmacotherapy, vol. 190, 118373",
      "metrics": "SCI, IF: 7.5, Q1 PHARMACOLOGY & PHARMACY 19/352",
      "note": "Co-first author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Feb",
      "zoneId": "drug-delivery",
      "secondaryZoneId": "shear-flow",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Fan, E. Huang, W.-C. Lo, C.-K. Yeh*",
      "title": "Ultrasound-cavitation-enhanced drug delivery via microbubble clustering induced by acoustic vortex tweezers",
      "journal": "Ultrasonics Sonochemistry, vol. 115, 107273",
      "metrics": "SCI, IF: 9.7, Q1 ACOUSTICS 1/41",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Jan",
      "zoneId": "neuromodulation",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "T.-N. Phan#, C.-H. Fan#, H.-C. Wang, H.-L. Liu, Y.-C. Lin, C.-K. Yeh*",
      "title": "Modulation of GABAergic neurons in acute epilepsy using sonogenetics",
      "journal": "Journal of Controlled Release, vol. 10, pp. 341–353",
      "metrics": "SCI, IF: 11.5, Q1 PHARMACOLOGY & PHARMACY 12/352",
      "note": "Co-first author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2025,
      "dateStr": "2025, Jan",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-F. Chuang, T.-N. Phan, C.-H. Fan, T.-T. Vo Le, C.-K. Yeh*",
      "title": "Advancements in ultrasound-mediated drug delivery for central nervous system disorders",
      "journal": "Expert Opinion on Drug Delivery, vol. 22, pp. 15–30",
      "metrics": "SCI, IF: 5.4, Q1 PHARMACOLOGY & PHARMACY 38/352",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2024,
      "dateStr": "2024, Sep",
      "zoneId": "shear-flow",
      "secondaryZoneId": "cell-spheroid",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "C.-H. Fan, W.-C. Lo, C.-H. Huang, T.-N. Phan, C.-K. Yeh*",
      "title": "Super-Resolution Ultrasound Imaging for Analysis of Microbubbles Cluster by Acoustic Vortex Tweezers",
      "journal": "IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control, vol. 23, pp. 1814–1822",
      "metrics": "SCI, IF: 3.7, Q1 ACOUSTICS 6/41",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2024,
      "dateStr": "2024, Apr",
      "zoneId": "neuromodulation",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "C.-W. Lin, M.-H. Cheng, C.-H. Fan, H.-H. Chen, C.-K. Yeh*",
      "title": "Focused ultrasound stimulation of infralimbic cortex attenuates reinstatement of methamphetamine-induced conditioned place preference in rats",
      "journal": "Neurotherapeutics, vol. 21, e00328",
      "metrics": "SCI, IF: 6.9, Q1 CLINICAL NEUROLOGY 22/285",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2024,
      "dateStr": "2024, Mar",
      "zoneId": "shear-flow",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "C.-H. Fan, C.-Y. Tsai, C.-Y. Lai, Y.-F. Liou, J.-K. Lee, C.-K. Yeh*",
      "title": "Feasibility of in vitro calcification plaque disruption using ultrasound-induced microbubble inertial cavitation",
      "journal": "Ultrasonics, vol. 138, 107238",
      "metrics": "SCI, IF: 4.1, Q1 ACOUSTICS 5/41",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2024,
      "dateStr": "2024, Jan",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-W. Lin, C.-H. Fan, C.-K. Yeh*",
      "title": "The relationship between surface drug distribution of Dox-loaded microbubbles and drug release/cavitation behaviors with ultrasound",
      "journal": "Ultrasonics Sonochemistry, vol. 102, 106728",
      "metrics": "SCI, IF: 9.7, Q1 ACOUSTICS 1/41",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2024,
      "dateStr": "2024, Jan",
      "zoneId": "cell-signaling",
      "secondaryZoneId": "neuromodulation",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "T.-T. Lai, Y.-H. Tsai, C.-W. Liou, C.-H. Fan, Y.-T. Hou, T.-H. Yao, H.-L. Chuang, W.-L. Wu*",
      "title": "The gut microbiota modulate locomotion via vagus-dependent glucagon-like peptide-1 signaling",
      "journal": "npj Biofilms and Microbiomes, vol. 10, 2",
      "metrics": "SCI, IF: 9.2, Q1 BIOTECHNOLOGY & APPLIED MICROBIOLOGY 11/177",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2023,
      "dateStr": "2023, Aug",
      "zoneId": "cell-spheroid",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "聲場懸浮生態巨蛋",
      "tagEn": "Acoustic Levitation Dome",
      "authors": "T.-N. Phan#, C.-H. Fan#, C.-K. Yeh*",
      "title": "Application of Ultrasound to Enhancing Stem Cells Associated Therapies",
      "journal": "Stem Cell Reviews and Reports, vol. 19, pp. 1709–1725",
      "metrics": "SCIE, IF: 4.5, CELL BIOLOGY 72/205",
      "note": "Co-first author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2023,
      "dateStr": "2023, May",
      "zoneId": "cell-signaling",
      "secondaryZoneId": "neuromodulation",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "C.-H. Fan, H.-C. Tsai, Y.-S. Tsai, H.-C. Wang, Y.-C. Lin, P.-H. Chiang, N. Wu, M.-H. Chou, Y.-J. Ho, Z.-H. Lin, C.-K. Yeh*",
      "title": "Selective Activation of Cells by Piezoelectric Molybdenum Disulfide Nanosheets with Focused Ultrasound",
      "journal": "ACS Nano, vol. 17, pp. 9140–9154",
      "metrics": "SCI, IF: 15.8, Q1 MATERIALS SCIENCE, MULTIDISCIPLINARY 27/439",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2023,
      "dateStr": "2023, May",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "O. Mee-Inta, C.-F. Hsieh, D.-Q. Chen, C.-H. Fan, Y.-Y. Chiang, C.-C. Liu, C.-I. Sze, P.-W. Gean, P.-C. Wu, M.-S. Yang, P.-S. Huang, Y.-M. Kuo, C.-C. Huang*",
      "title": "High-frequency ultrasound imaging for monitoring the function of meningeal lymphatic system in mice",
      "journal": "Ultrasonics, vol. 131, 106949",
      "metrics": "SCI, IF: 3.8, Q1 ACOUSTICS 5/40",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2023,
      "dateStr": "2023, Mar",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Fan, N. Wu, C.-K. Yeh*",
      "title": "Enhanced sonodynamic therapy by carbon dots-shelled microbubbles with focused ultrasound",
      "journal": "Ultrasonics Sonochemistry, vol. 94, 106342",
      "metrics": "SCI, IF: 8.7, Q1 ACOUSTICS 1/40",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2022,
      "dateStr": "2022, Nov",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "P.-H. Chiang, C.-H. Fan, Q. Jin, C.-K. Yeh*",
      "title": "Enhancing Doxorubicin Delivery in Solid Tumor by Superhydrophobic Amorphous Calcium Carbonate–Doxorubicin Silica Nanoparticles with Focused Ultrasound",
      "journal": "Molecular Pharmaceutics, vol. 19, pp. 3894–3905",
      "metrics": "SCI, IF: 4.9, Q1 PHARMACOLOGY & PHARMACY 61/278",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2022,
      "dateStr": "2022, Aug",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Fan, Y.-J. Ho, C.-W. Lin, N. Wu, P.-H. Chiang, C.-K. Yeh*",
      "title": "State-of-the-art of ultrasound-triggered drug delivery from ultrasound-responsive drug carriers",
      "journal": "Expert Opinion on Drug Delivery, vol. 19, pp. 997–1009",
      "metrics": "SCI, IF: 6.6, Q1 PHARMACOLOGY & PHARMACY 30/278",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2022,
      "dateStr": "2022, Jun",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "N. Wu#, C.-H. Fan#, C.-K. Yeh*",
      "title": "Ultrasound-activated nanomaterials for sonodynamic cancer theranostics",
      "journal": "Drug Discovery Today, vol. 27, pp. 1590–1603",
      "metrics": "SCI, IF: 7.4, Q1 PHARMACOLOGY & PHARMACY 23/278",
      "note": "Co-first author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2021,
      "dateStr": "2021, Dec",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-W. Lin, C.-H. Fan, C.-K. Yeh*",
      "title": "The Impact of Surface Drug Distribution on the Acoustic Behavior of DOX-Loaded Microbubbles",
      "journal": "Pharmaceutics, vol. 13, 2080",
      "metrics": "SCI, IF: 6.5, Q1 PHARMACOLOGY & PHARMACY 39/279",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2021,
      "dateStr": "2021, Dec",
      "zoneId": "shear-flow",
      "secondaryZoneId": "cell-spheroid",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "W.-C. Lo, Y.-L. Huang, C.-H. Fan, C.-K. Yeh*",
      "title": "3-D Ultrafast Ultrasound Imaging of Microbubbles Trapped Using an Acoustic Vortex",
      "journal": "IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control, vol. 68, pp. 3507–3514",
      "metrics": "SCI, IF: 3.267, Q1 ACOUSTICS 9/32",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2021,
      "dateStr": "2021, Sep",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, C.-C. Huang, C.-H. Fan, H.-L. Liu, C.-K. Yeh*",
      "title": "Ultrasonic technologies in imaging and drug delivery",
      "journal": "Cellular and Molecular Life Sciences, vol. 78, pp. 6119–6141",
      "metrics": "SCI, IF: 9.234, Q1 BIOCHEMISTRY & MOLECULAR BIOLOGY 35/297",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2021,
      "dateStr": "2021, Jul",
      "zoneId": "neuromodulation",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "C.-H. Fan, K.-C. Wei, N.-H. Chiu, E.-C. Liao, H.-C. Wang, R.-Y. Wu, Y.-J. Ho, H.-L. Chan, T.-S. A. Wang, Y.-Z. Huang, T.-H. Hsieh, C.-H. Lin, Y.-C. Lin, C.-K. Yeh*",
      "title": "Sonogenetic-Based Neuromodulation for the Amelioration of Parkinson's Disease",
      "journal": "Nano Letters, vol. 21, pp. 5967–5976",
      "metrics": "SCI, IF: 12.262, Q1 PHYSICS, APPLIED 13/161",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2021,
      "dateStr": "2021, May",
      "zoneId": "drug-delivery",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, H.-C. Chang, C.-W. Lin, C.-H. Fan*, Y.-C. Lin, K.-C. Wei, C.-K. Yeh*",
      "title": "Oscillatory behavior of microbubbles impacts efficacy of cellular drug delivery",
      "journal": "Journal of Controlled Release, vol. 10, pp. 316–327",
      "metrics": "SCI, IF: 11.467, Q1 PHARMACOLOGY & PHARMACY 12/279",
      "note": "Corresponding author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2021,
      "dateStr": "2021, Apr",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Fan, W.-F. Kao, S.-T. Kang, Y.-J. Ho, C.-K. Yeh*",
      "title": "Exploring the Acoustic and Dynamic Characteristics of Phase-Change Droplets",
      "journal": "IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control, vol. 68, pp. 1051–1061",
      "metrics": "SCI, IF: 3.267, Q1 ACOUSTICS 9/32",
      "note": "First author"
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2021,
      "dateStr": "2021, Jan",
      "zoneId": "shear-flow",
      "secondaryZoneId": "cell-spheroid",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "W.-C. Lo, C.-H. Fan, Y.-J. Ho, C.-W. Lin, C.-K. Yeh*",
      "title": "Tornado-inspired acoustic vortex tweezer for trapping and manipulating microbubbles",
      "journal": "Proceedings of the National Academy of Sciences of the United States of America (PNAS), vol. 118, e2023188118",
      "metrics": "SCI, IF: 12.779, Q1 MULTIDISCIPLINARY SCIENCES 9/74",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "journal",
      "year": 2020,
      "dateStr": "2020, Oct",
      "zoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "Z.-H. Hsieh, C.-H. Fan, Y.-J. Ho, M.-L. Li, C.-K. Yeh*",
      "title": "Improvement of light penetration in biological tissue using an ultrasound-induced heating tunnel",
      "journal": "Scientific Reports, vol. 10, 17406",
      "metrics": "SCI, IF: 4.38, Q1 MULTIDISCIPLINARY SCIENCES 17/72",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2025,
      "dateStr": "2025, Sep",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "shear-flow",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Lin, C.-H. Fan*",
      "title": "Enhancing blood-brain barrier permeability in mice via vortex-focused ultrasound",
      "journal": "2025 IEEE Ultrasonics, Ferroelectrics, and Frequency Control Joint Symposium (UFFC-JS), Utrecht, The Netherlands",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2025,
      "dateStr": "2025, Sep",
      "zoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "C.-H. Lin, W.-H. Chao, P.-C. Wu, C.-H. Fan*",
      "title": "Remote biofilm dislodgment using focused acoustic vortex",
      "journal": "2025 IEEE Ultrasonics, Ferroelectrics, and Frequency Control Joint Symposium (UFFC-JS), Utrecht, The Netherlands",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2024,
      "dateStr": "2024, Nov",
      "zoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "W.-H. Chao, C.-H. Fan*",
      "title": "Feasibility of Using Acoustic Vortex for Biofilm Dislodging",
      "journal": "2024 IEEE Ultrasonics, Ferroelectrics, and Frequency Control Joint Symposium (UFFC-JS), Taipei, Taiwan",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2024,
      "dateStr": "2024, Nov",
      "zoneId": "cell-signaling",
      "secondaryZoneId": "shear-flow",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "C.-H. Lin, C.-H. Fan*",
      "title": "Induction of Calcium Ion Influx in Endothelial Cells by Vortex-Focused Ultrasound",
      "journal": "2024 IEEE Ultrasonics, Ferroelectrics, and Frequency Control Joint Symposium (UFFC-JS), Taipei, Taiwan",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2024,
      "dateStr": "2024, Nov",
      "zoneId": "neuromodulation",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "J.-C. Hsieh, C.-H. Fan*",
      "title": "Non-invasive sciatic nerve stimulation by focused ultrasound for hematopoietic system modulation",
      "journal": "2024 IEEE Ultrasonics, Ferroelectrics, and Frequency Control Joint Symposium (UFFC-JS), Taipei, Taiwan",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2024,
      "dateStr": "2024, Nov",
      "zoneId": "drug-delivery",
      "secondaryZoneId": "shear-flow",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Li, C.-H. Fan*",
      "title": "Enhanced Transdermal Drug Delivery by Vortex Focused Ultrasound",
      "journal": "2024 IEEE Ultrasonics, Ferroelectrics, and Frequency Control Joint Symposium (UFFC-JS), Taipei, Taiwan",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2023,
      "dateStr": "2023, Sep",
      "zoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "C.-H. Li, C.-H. Fan*",
      "title": "Non-invasive Acoustic Vortex Technology for Controlling Local Blood Flow Velocity and Direction",
      "journal": "2023 IEEE International Ultrasonics Symposium (IUS), Montreal, Canada",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2023,
      "dateStr": "2023, Sep",
      "zoneId": "neuromodulation",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "T.-N. Phan, C.-H. Fan, H.-C. Wang, Y.-C. Lin, C.-K. Yeh*",
      "title": "Sonogenetics-based neuromodulation to suppress epilepsy seizures",
      "journal": "2023 IEEE International Ultrasonics Symposium (IUS), Montreal, Canada",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2023,
      "dateStr": "2023, Sep",
      "zoneId": "neuromodulation",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "M.-H. Chou, P.-H. Chiang, C.-H. Fan, C.-K. Yeh*",
      "title": "Enhanced ultrasound neurostimulation using piezoelectric molybdenum disulfide nanosheets",
      "journal": "2023 IEEE International Ultrasonics Symposium (IUS), Montreal, Canada",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2023,
      "dateStr": "2023, Sep",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-W. Lin, C.-H. Fan, C.-K. Yeh*",
      "title": "Investigating the fragment species of drug-loaded microbubbles under ultrasound sonications",
      "journal": "2023 IEEE International Ultrasonics Symposium (IUS), Montreal, Canada",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2023,
      "dateStr": "2023, Sep",
      "zoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "Z.-H. Hsieh, Y.-C. Lin, C.-H. Fan, C.-K. Yeh*",
      "title": "Electro-wetting liquid lens for real-time ultrasound focusing and steering",
      "journal": "2023 IEEE International Ultrasonics Symposium (IUS), Montreal, Canada",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2023,
      "dateStr": "2023, Apr",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Fan, N. Wu, C.-K. Yeh*",
      "title": "Enhanced sonodynamic therapy by ultrasound with carbon dots-shelled microbubbles in solid tumor small animal model",
      "journal": "2023 International Society for Therapeutic Ultrasound (ISTU) & EUFUS Joint Symposium, Lyon, France",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2023,
      "dateStr": "2023, Feb",
      "zoneId": "drug-delivery",
      "secondaryZoneId": "bbb-opening",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "P.-H. Wu, M.-E. Chien, Y.-J. Wu, C.-H. Fan*",
      "title": "Focused ultrasound combined with drug-loaded microbubbles suppress kainic acid induced epilepsy rat model",
      "journal": "5th International Brain Stimulation Conference, Lisbon, Portugal",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2022,
      "dateStr": "2022, Dec",
      "zoneId": "shear-flow",
      "tagZh": "微流體聲流渦流灣",
      "tagEn": "Acoustic Streaming Vortex Bay",
      "authors": "C.-H. Li, C.-H. Fan*",
      "title": "Remote and local generation of microstreaming vortices by focused ultrasound with vortex lens",
      "journal": "5th Global Conference on Biomedical Engineering (GCBME) & Annual Meeting of TSBME, Taipei, Taiwan",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2021,
      "dateStr": "2021, Sep",
      "zoneId": "cell-signaling",
      "secondaryZoneId": "neuromodulation",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "C.-H. Fan, C.-K. Yeh*",
      "title": "Noninvasive and selective activation of neuronal activity by piezoelectric MoS2 nanosheets with focused ultrasound",
      "journal": "2021 IEEE International Ultrasonics Symposium (IUS), Xi'an, China",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "conference",
      "year": 2020,
      "dateStr": "2020, Sep",
      "zoneId": "drug-delivery",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Fan, H.-C. Chang, C.-K. Yeh*",
      "title": "Precise cellular drug delivery and underlying mechanisms of drug-loaded microbubbles cavitation",
      "journal": "2020 IEEE International Ultrasonics Symposium (IUS), Las Vegas, NV, USA",
      "metrics": "International Conference",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "book",
      "year": 2025,
      "dateStr": "2025",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-K. Yeh*",
      "title": "Theranostic nanomaterials for intervention of the blood–brain barrier",
      "journal": "In: Theranostics Nanomaterials in Drug Delivery, pp. 395–410",
      "metrics": "Book Chapter",
      "note": ""
    },
    {
      "era": "post-ncku",
      "type": "book",
      "year": 2021,
      "dateStr": "2021",
      "zoneId": "neuromodulation",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "Y.-S. Huang, C.-H. Fan, W.-T. Yang, C.-K. Yeh, Y.-C. Lin*",
      "title": "Sonogenetic Modulation of Cellular Activities in Mammalian Cells",
      "journal": "In: Mammalian Cell Engineering, pp. 109–124",
      "metrics": "Book Chapter",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2020,
      "dateStr": "2020, Jan",
      "zoneId": "neuromodulation",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "Y.-S. Huang*, C.-H. Fan*, N. Hsu*, N.-H. Chiu, C.-Y. Wu, C.-Y. Chang, B.-H. Wu, S.-R. Hong, Y.-C. Chang, A. Y.-T. Wu, V. Guo, Y.-C. Chiang, W.-C. Hsu, L. Chen, C. P.-K. Lai, C.-K. Yeh, Y.-C. Lin*",
      "title": "Sonogenetic Modulation of Cellular Activities Using an Engineered Auditory-Sensing Protein",
      "journal": "Nano Letters, vol. 20, pp. 1089–1100",
      "metrics": "SCI, IF: 13.969, Q1 NANOSCIENCE & NANOTECHNOLOGY 10/94",
      "note": "Co-first author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2020,
      "dateStr": "2020, Jan",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "H.-C. Lin, C.-H. Fan, Y.-J. Ho, C.-K. Yeh*",
      "title": "Dual-Frequency Chirp Excitation for Passive Cavitation Imaging in the Brain",
      "journal": "IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control, vol. 67, pp. 125–136",
      "metrics": "SCI, IF: 2.989, Q1 ACOUSTICS 6/31",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2019,
      "dateStr": "2019, Dec",
      "zoneId": "neuromodulation",
      "secondaryZoneId": "bbb-opening",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "C.-Y. Wu, C.-H. Fan, N.-H. Chiu, Y.-J. Ho, Y.-C. Lin*, C.-K. Yeh*",
      "title": "Targeted delivery of engineered auditory sensing protein for ultrasound neuromodulation in the brain",
      "journal": "Theranostics, vol. 10, pp. 3546–3561",
      "metrics": "SCI, IF: 8.651, Q1 MEDICINE, RESEARCH & EXPERIMENTAL 8/128",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2019,
      "dateStr": "2019, Dec",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, C.-H. Wu, Q.-F. Jin, C.-Y. Lin, P.-H. Chiang, N. Wu, C.-H. Fan, C.-M. Yang, C.-K. Yeh*",
      "title": "Superhydrophobic Drug-Loaded Mesoporous Silica Nanoparticles Capped With β-Cyclodextrin for Ultrasound Image-Guided Combined Antivascular and Chemo-Sonodynamic Therapy",
      "journal": "Biomaterials, vol. 232, 119723",
      "metrics": "SCI, IF: 9.550, Q1 ENGINEERING, BIOMEDICAL 2/77",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2019,
      "dateStr": "2019, Sep",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, S.-W. Chu, E.-C. Liao, C.-H. Fan, H.-L. Chan, K.-C. Wei, C.-K. Yeh*",
      "title": "Normalization of Tumor Vasculature by Oxygen Microbubbles with Ultrasound",
      "journal": "Theranostics, vol. 9, pp. 7370–7383",
      "metrics": "SCI, IF: 8.651, Q1 MEDICINE, RESEARCH & EXPERIMENTAL 8/128",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2019,
      "dateStr": "2019, May",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Wu, H.-L. Liu, C.-T. Ho, P.-H. Hsu, C.-H. Fan, C.-K. Yeh, S.-T. Kang, W.-S. Chen, F.-N. Wang, H.-H. Peng*",
      "title": "Monitoring of acoustic cavitation in microbubble-presented focused ultrasound exposure using gradient-echo MRI",
      "journal": "Journal of Magnetic Resonance Imaging, vol. 50, pp. 1830–1842",
      "metrics": "SCI, IF: 3.570, Q1 RADIOLOGY 26/129",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2019,
      "dateStr": "2019, May",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "T.-T. Kuo, C.-H. Wang, J.-Y. Wang, H.-J. Chiou, C.-H. Fan, C.-K. Yeh*",
      "title": "Concurrent Osteosarcoma Theranostic Strategy Using Contrast-Enhanced Ultrasound and Drug-Loaded Bubbles",
      "journal": "Pharmaceutics, vol. 11, E223",
      "metrics": "SCI, IF: 4.773, Q1 PHARMACOLOGY & PHARMACY 26/267",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2019,
      "dateStr": "2019, Mar",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, T.-W. Wang, Y.-K. Hsieh, C.-F. Wang, Z. Gao, A. Kim, Y. Nagasaki, C.-K. Yeh*",
      "title": "Enhancing Boron Uptake in Brain Glioma Treatment by Boron-Polymer/Microbubble Complex with Ultrasound",
      "journal": "ACS Applied Materials & Interfaces, vol. 11, pp. 11144–11156",
      "metrics": "SCI, IF: 8.694, Q1 MATERIALS SCIENCE, MULTIDISCIPLINARY 26/285",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2018,
      "dateStr": "2018, Dec",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, C.-C. Wu, Z.-H. Hsieh, C.-H. Fan, C.-K. Yeh*",
      "title": "Thermal-sensitive acoustic droplets for dual-mode ultrasound imaging and drug delivery",
      "journal": "Journal of Controlled Release, vol. 291, pp. 26–36",
      "metrics": "SCI, IF: 8.375, Q1 PHARMACOLOGY & PHARMACY 10/257",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2018,
      "dateStr": "2018, Nov",
      "zoneId": "cell-signaling",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "C.-H. Fan, Y.-T. Lin, Y.-J. Ho, C.-K. Yeh*",
      "title": "Spatial-Temporal Cellular Bioeffects from Acoustic Droplet Vaporization",
      "journal": "Theranostics, vol. 8, pp. 5731–5743",
      "metrics": "SCI, IF: 8.651, Q1 MEDICINE, RESEARCH & EXPERIMENTAL 8/128",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2018,
      "dateStr": "2018, Jul",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "C.-H. Fan, Y.-H. Lee, Y.-J. Ho, C.-H. Wang, S.-T. Kang, C.-K. Yeh*",
      "title": "Macrophages as drug delivery carriers for acoustic phase-change droplets",
      "journal": "Ultrasound in Medicine & Biology, vol. 44, pp. 1468–1481",
      "metrics": "SCI, IF: 2.633, Q1 ACOUSTICS 6/31",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2018,
      "dateStr": "2018, May",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, T.-C. Wang, C.-H. Fan, C.-K. Yeh*",
      "title": "Spatially Uniform Tumor Treatment and Drug Penetration by Regulating Ultrasound with Microbubbles",
      "journal": "ACS Applied Materials & Interfaces, vol. 10, pp. 17784–17791",
      "metrics": "SCI, IF: 8.694, Q1 MATERIALS SCIENCE, MULTIDISCIPLINARY 26/285",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2018,
      "dateStr": "2018, Apr",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, Y.-J. Chiang, S.-T. Kang, C.-H. Fan, C.-K. Yeh*",
      "title": "Camptothecin-loaded fusogenic nanodroplets as ultrasound theranostic agent in stem cell-mediated drug-delivery system",
      "journal": "Journal of Controlled Release, vol. 278, pp. 100–109",
      "metrics": "SCI, IF: 8.375, Q1 PHARMACOLOGY & PHARMACY 10/257",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2017,
      "dateStr": "2017, Nov",
      "zoneId": "cell-signaling",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "C.-H. Fan, Y.-S. Huang, W.-E. Huang, A. A. Lee, S.-Y. Ho, Y.-L. Kao, C.-L. Wang, Y.-L. Lian, T. Ueno, T.-S. A. Wang, C.-K. Yeh*, Y.-C. Lin*",
      "title": "Manipulating Cellular Activities Using an Ultrasound-Chemical Hybrid Tool",
      "journal": "ACS Synthetic Biology, vol. 6, pp. 2021–2027",
      "metrics": "SCI, IF: 5.905, Q1 BIOCHEMICAL RESEARCH METHODS 7/78",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2017,
      "dateStr": "2017, Oct",
      "zoneId": "drug-delivery",
      "tagZh": "微泡精準物流港",
      "tagEn": "Microbubble Logistics Port",
      "authors": "Y.-J. Ho, T.-C. Wang, C.-H. Fan, C.-K. Yeh*",
      "title": "Current progress in antivascular tumor therapy",
      "journal": "Drug Discovery Today, vol. 22, pp. 1503–1515",
      "metrics": "SCI, IF: 6.820, Q1 PHARMACOLOGY & PHARMACY 16/257",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2017,
      "dateStr": "2017, Sep",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Lin, H.-L. Liu, C.-K. Yeh*",
      "title": "Ultrasound targeted CNS gene delivery for Parkinson's disease treatment",
      "journal": "Journal of Controlled Release, vol. 261, pp. 246–262",
      "metrics": "SCI, IF: 8.375, Q1 PHARMACOLOGY & PHARMACY 10/257",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2017,
      "dateStr": "2017, Jun",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "E.-L. Chang, C.-Y. Ting, P.-H. Hsu, Y.-C. Lin, E.-C. Liao, C.-Y. Huang, Y.-C. Chang, H.-L. Chan, C.-S. Chiang, H.-L. Liu, K.-C. Wei, C.-H. Fan*, C.-K. Yeh*",
      "title": "Angiogenesis-targeting Microbubbles Combined with Ultrasound-Mediated Gene Therapy in Brain Tumors",
      "journal": "Journal of Controlled Release, vol. 255, pp. 164–175",
      "metrics": "SCI, IF: 8.375, Q1 PHARMACOLOGY & PHARMACY 10/257",
      "note": "Corresponding author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2017,
      "dateStr": "2017, Apr",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "S.-K. Wu, P.-C. Chu, W.-Y. Chai, S.-T. Kang, C.-H. Tsai, C.-H. Fan, C.-K. Yeh, H.-L. Liu*",
      "title": "Characterization of Different Microbubbles in Assisting Focused Ultrasound-Induced Blood-Brain Barrier Opening",
      "journal": "Scientific Reports, vol. 7, 46689",
      "metrics": "SCI, IF: 4.525, Q1 MULTIDISCIPLINARY SCIENCES 10/64",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2016,
      "dateStr": "2016, Jan",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, E.-L. Chang, C.-Y. Ting, Y.-C. Lin, E.-C. Liao, C.-Y. Huang, Y.-C. Chang, H.-L. Chan, K.-C. Wei, C.-K. Yeh*",
      "title": "Folate-conjugated gene-carrying microbubbles with focused ultrasound for concurrent blood-brain barrier opening and local gene delivery",
      "journal": "Biomaterials, vol. 106, pp. 46–57",
      "metrics": "SCI, IF: 9.550, Q1 ENGINEERING, BIOMEDICAL 2/77",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2016,
      "dateStr": "2016, Jan",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, Y.-H. Cheng, C.-Y. Ting, Y.-J. Ho, P.-H. Hsu, H.-L. Liu, C.-K. Yeh*",
      "title": "Ultrasound/Magnetic Targeting with SPIO-DOX Microbubble Complex for Image-Guided Drug Delivery in Brain Tumors",
      "journal": "Theranostics, vol. 6, pp. 1542–1556",
      "metrics": "SCI, IF: 8.651, Q1 MEDICINE, RESEARCH & EXPERIMENTAL 8/128",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2016,
      "dateStr": "2016, Jan",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Ting, C.-Y. Lin, H.-L. Chan, Y.-C. Chang, Y.-Y. Chen, H.-L. Liu, C.-K. Yeh*",
      "title": "Noninvasive, Targeted, and Non-Viral Ultrasound-Mediated GDNF-Plasmid Delivery for Treatment of Parkinson's Disease",
      "journal": "Scientific Reports, vol. 6, 19579",
      "metrics": "SCI, IF: 4.525, Q1 MULTIDISCIPLINARY SCIENCES 10/64",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2015,
      "dateStr": "2015, Jan",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Ting, Y.-C. Chang, K.-C. Wei, H.-L. Liu, C.-K. Yeh*",
      "title": "Drug-loaded bubbles with matched focused ultrasound excitation for concurrent blood-brain barrier opening and brain-tumor drug delivery",
      "journal": "Acta Biomaterialia, vol. 15, pp. 89–101",
      "metrics": "SCI, IF: 7.151, Q1 ENGINEERING, BIOMEDICAL 3/77",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2014,
      "dateStr": "2014, Jul",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, W.-H. Lin, C.-Y. Ting, W.-Y. Chai, T.-C. Yen, H.-L. Liu, C.-K. Yeh*",
      "title": "Contrast-Enhanced Ultrasound Imaging for the Detection of Focused Ultrasound-Induced Blood-Brain Barrier Opening",
      "journal": "Theranostics, vol. 4, pp. 1014–1025",
      "metrics": "SCI, IF: 8.651, Q1 MEDICINE, RESEARCH & EXPERIMENTAL 8/128",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2014,
      "dateStr": "2014, May",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, H.-L. Liu, C.-Y. Ting, Y.-H. Lee, C.-Y. Huang, Y.-J. Ma, K.-C. Wei, T.-C. Yen, C.-K. Yeh*",
      "title": "Submicron-Bubble-Enhanced Focused Ultrasound for Blood–Brain Barrier Disruption and Improved CNS Drug Delivery",
      "journal": "PLOS ONE, vol. 9, e96327",
      "metrics": "SCI, IF: 3.337, Q1 MULTIDISCIPLINARY SCIENCES 15/64",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2014,
      "dateStr": "2014, Feb",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "H.-L. Liu, C.-H. Fan, C.-Y. Ting, C.-K. Yeh*",
      "title": "Combining microbubbles and ultrasound for drug delivery to brain tumors: current progress and overview",
      "journal": "Theranostics, vol. 4, pp. 432–444",
      "metrics": "SCI, IF: 8.651, Q1 MEDICINE, RESEARCH & EXPERIMENTAL 8/128",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2013,
      "dateStr": "2013, May",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Ting, H.-J. Lin, C.-H. Wang, H.-L. Liu, T.-C. Yen, C.-K. Yeh*",
      "title": "SPIO-conjugated, doxorubicin-loaded microbubbles for concurrent MRI and focused-ultrasound enhanced brain-tumor drug delivery",
      "journal": "Biomaterials, vol. 34, pp. 3706–3715",
      "metrics": "SCI, IF: 9.550, Q1 ENGINEERING, BIOMEDICAL 2/77",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2012,
      "dateStr": "2012, Aug",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, H.-L. Liu, C.-Y. Huang, Y.-J. Ma, T.-C. Yen, C.-K. Yeh*",
      "title": "Detection of Intracerebral Hemorrhage and Transient Blood-Supply Shortage in Focused-Ultrasound-Induced Blood–Brain Barrier Disruption by Ultrasound Imaging",
      "journal": "Ultrasound in Medicine & Biology, vol. 38, pp. 1372–1382",
      "metrics": "SCI, IF: 2.633, Q1 ACOUSTICS 6/31",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2012,
      "dateStr": "2012, Jul",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "P. Chonpathompikunlert, C.-H. Fan, Y. Ozaki, T. Yoshitomi, C.-K. Yeh, Y. Nagasaki*",
      "title": "Redox nanoparticle treatment protects against neurological deficit in focused ultrasound-induced intracerebral hemorrhage",
      "journal": "Nanomedicine, vol. 7, pp. 1029–1043",
      "metrics": "SCI, IF: 5.217, Q1 BIOTECHNOLOGY & APPLIED MICROBIOLOGY 21/160",
      "note": ""
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2012,
      "dateStr": "2012, Mar",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Ting, H.-L. Liu, C.-Y. Huang, H.-Y. Hsieh, T.-C. Yen, K.-C. Wei, C.-K. Yeh*",
      "title": "Antiangiogenic-targeting drug-loaded microbubbles combined with focused ultrasound for glioma treatment",
      "journal": "Biomaterials, vol. 34, pp. 2142–2155",
      "metrics": "SCI, IF: 9.550, Q1 ENGINEERING, BIOMEDICAL 2/77",
      "note": "First author"
    },
    {
      "era": "pre-ncku",
      "type": "journal",
      "year": 2012,
      "dateStr": "2012, Jan",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-Y. Ting*, C.-H. Fan*, H.-L. Liu, C.-Y. Huang, H.-Y. Hsieh, T.-C. Yen, K.-C. Wei, C.-K. Yeh*",
      "title": "Concurrent blood–brain barrier opening and local drug delivery using drug-carrying microbubbles and focused ultrasound for brain glioma treatment",
      "journal": "Biomaterials, vol. 33, pp. 704–712",
      "metrics": "SCI, IF: 9.550, Q1 ENGINEERING, BIOMEDICAL 2/77",
      "note": "Co-first author"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2019,
      "dateStr": "2019, Sep",
      "zoneId": "neuromodulation",
      "secondaryZoneId": "cell-signaling",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "C.-H. Fan, Y.-S. Huang, Y.-C. Lin, C.-K. Yeh*",
      "title": "Modulation of cellular activities using an engineered auditory-sensing protein with ultrasound",
      "journal": "2019 IEEE International Ultrasonics Symposium (IUS), Glasgow, United Kingdom",
      "metrics": "International Conference",
      "note": "Oral presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2019,
      "dateStr": "2019, Sep",
      "zoneId": "neuromodulation",
      "secondaryZoneId": "bbb-opening",
      "tagZh": "神經調控電塔",
      "tagEn": "Neural Modulation Beacon",
      "authors": "C.-H. Fan, N.-H. Chiu, Y.-C. Lin, C.-K. Yeh*",
      "title": "Targeted Delivery of Electromechanical Protein Prestin to the Brain Using Ultrasound",
      "journal": "2019 IEEE International Ultrasonics Symposium (IUS), Glasgow, United Kingdom",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2018,
      "dateStr": "2018, Sep",
      "zoneId": "cell-signaling",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "C.-H. Fan, Y.-T. Lin, Y.-C. Lin, C.-K. Yeh*",
      "title": "Acoustic droplet vaporization induced physicochemical effects at the single-cell level",
      "journal": "2018 IEEE International Ultrasonics Symposium (IUS), Kobe, Japan",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2018,
      "dateStr": "2018, Sep",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-Y. Wu, C.-H. Fan, R.-Y. Huang, C.-W. Chang, C.-K. Yeh*",
      "title": "Ultrasonic-magnetic Hybrid Gene-delivery System for Parkinson's Disease Treatment",
      "journal": "2018 IEEE International Ultrasonics Symposium (IUS), Kobe, Japan",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2017,
      "dateStr": "2017, Sep",
      "zoneId": "cell-signaling",
      "tagZh": "細胞機械轉導通訊站",
      "tagEn": "Mechanotransduction Relay",
      "authors": "C.-H. Fan, Y.-S. Huang, Y.-C. Lin, C.-K. Yeh*",
      "title": "Ultrasound-chemical hybrid system for manipulating cellular activities",
      "journal": "2017 IEEE International Ultrasonics Symposium (IUS), Washington, DC, USA",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2016,
      "dateStr": "2016, Sep",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, Y.-H. Cheng, C.-Y. Ting, Y.-J. Ho, P.-H. Hsu, H.-L. Liu, C.-K. Yeh*",
      "title": "SPIO-DOX-Microbubble Complex with Ultrasound for MRI Image-Guided Drug Delivery in a rat glioma model",
      "journal": "2016 IEEE International Ultrasonics Symposium (IUS), Tours, France",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2015,
      "dateStr": "2015, Oct",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Ting, E.-L. Chang, H.-L. Liu, H.-L. Chan, Y.-Y. Chen, C.-K. Yeh*",
      "title": "Ultrasound-triggered and targeted gene delivery by using cationic microbubbles to enhance GDNF gene transfection in a rat Parkinson's disease model",
      "journal": "2015 IEEE International Ultrasonics Symposium (IUS), Taipei, Taiwan",
      "metrics": "International Conference",
      "note": "Oral presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2015,
      "dateStr": "2015, Apr",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Ting, H.-L. Liu, Y.-Y. Chen, C.-K. Yeh*",
      "title": "Enhanced Gene Transfection and Therapy via Focused Ultrasound with GDNF-DNA-loaded Microbubbles in Rat Parkinson's Disease Model",
      "journal": "2015 International Society for Therapeutic Ultrasound (ISTU) Symposium, Utrecht, The Netherlands",
      "metrics": "International Conference",
      "note": "Oral presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2013,
      "dateStr": "2013, Oct",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-Y. Ting, C.-H. Fan, W.-H. Lin, W.-Y. Chai, H.-L. Liu, T.-C. Yen, C.-K. Yeh*",
      "title": "Contrast-Enhanced Ultrasound Imaging for the Detection of Transient Dynamics of Blood-Brain Barrier Opening Induced by Focused Ultrasound",
      "journal": "2013 IEEE International Ultrasonics Symposium (IUS), Prague, Czech Republic",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2013,
      "dateStr": "2013, Oct",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, Y.-K. Hsieh, C.-Y. Ting, H.-L. Liu, C.-F. Wang, C.-K. Yeh*",
      "title": "High-sensitivity distribution mapping of iron, zinc and copper during SPIO-microbubbles facilitated focused ultrasound induced blood-brain barrier opening via laser ablation/inductively coupled plasma mass spectrometry",
      "journal": "2013 IEEE International Ultrasonics Symposium (IUS), Prague, Czech Republic",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2013,
      "dateStr": "2013, Jul",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "W.-H. Lin, C.-H. Fan, C.-Y. Ting, H.-L. Liu, C.-K. Yeh*",
      "title": "Dynamic Perfusion Assessment by Contrast-Enhanced Ultrasound in Blood-Brain Barrier Disruption",
      "journal": "35th Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBS), Osaka, Japan",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2012,
      "dateStr": "2012, Oct",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-Y. Ting, C.-H. Fan, H.-L. Liu, K.-C. Wei, T.-C. Yen, C.-K. Yeh*",
      "title": "Targeted drug-loading microbubbles with focused ultrasound induced blood-brain barrier disruption for glioma treatment",
      "journal": "2012 IEEE International Ultrasonics Symposium (IUS), Dresden, Germany",
      "metrics": "International Conference",
      "note": "Oral presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2012,
      "dateStr": "2012, Oct",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, C.-Y. Ting, H.-J. Lin, H.-L. Liu, T.-C. Yen, C.-K. Yeh*",
      "title": "Superparamagnetic Iron-Oxide Drug-Loading Microbubbles for Concurrent Magnetic Resonance Imaging Monitoring and Focused-Ultrasound Enhanced Brain-Tumor Drug Delivery",
      "journal": "2012 IEEE International Ultrasonics Symposium (IUS), Dresden, Germany",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2011,
      "dateStr": "2011, Oct",
      "zoneId": "bbb-opening",
      "secondaryZoneId": "drug-delivery",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-Y. Ting, C.-H. Fan, H.-L. Liu, T.-C. Yen, K.-C. Wei, C.-K. Yeh*",
      "title": "Delivery of Drug-Loaded Microbubbles and Disruption of Blood-Brain Barrier by Focused Ultrasound in a Xenograft Rat Glioma Model",
      "journal": "2011 IEEE International Ultrasonics Symposium (IUS), Orlando, FL, USA",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2011,
      "dateStr": "2011, Oct",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, H.-L. Liu, T.-C. Yen, C.-K. Yeh*",
      "title": "Focused Ultrasound with Submicron Bubbles Producing Inertial Cavitation Suppression in Blood-Brain Barrier Opening Application",
      "journal": "2011 IEEE International Ultrasonics Symposium (IUS), Orlando, FL, USA",
      "metrics": "International Conference",
      "note": "Oral presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2010,
      "dateStr": "2010, Oct",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-Y. Ting, C.-H. Fan, C.-K. Yeh*",
      "title": "Detection of Transient Ischemia and Hemorrhage in Blood-Brain Barrier Disruption by High-Frequency Ultrasound Imaging",
      "journal": "2010 IEEE International Ultrasonics Symposium (IUS), San Diego, CA, USA",
      "metrics": "International Conference",
      "note": "Poster presentation"
    },
    {
      "era": "pre-ncku",
      "type": "conference",
      "year": 2009,
      "dateStr": "2009, Sep",
      "zoneId": "bbb-opening",
      "tagZh": "血腦屏障星門",
      "tagEn": "BBB Sanctuary Gate",
      "authors": "C.-H. Fan, P.-H. Hsu, H.-L. Liu, C.-K. Yeh*",
      "title": "Detection of Blood-Brain Barrier Disruption by Contrast-Enhanced High Frequency Ultrasound Image: Small Animals Study",
      "journal": "2009 IEEE International Ultrasonics Symposium (IUS), Rome, Italy",
      "metrics": "International Conference",
      "note": "Poster presentation"
    }
  ],
  "team": {
    "pi": {
      "photo": "pi-fan.jpg",
      "email": "10908013@gs.ncku.edu.tw",
      "office": "國立成功大學 生物醫學工程學系 (NCKU Dept. of Biomedical Engineering)",
      "scholarUrl": "https://scholar.google.com/citations?hl=zh-TW&user=",
      "orcidUrl": "https://orcid.org/",
      "zh": {
        "name": "范景翔",
        "title": "副教授 / 實驗室主持人",
        "dept": "國立成功大學 生物醫學工程學系 · 前瞻醫療器材科技中心 · 醫學院轉譯生物電子醫學研究中心",
        "bio": "范景翔博士現任國立成功大學生物醫學工程學系副教授，並合聘於成大前瞻醫療器材科技中心與醫學院轉譯生物電子醫學研究中心。研究專長涵蓋：微氣泡（超音波對比劑）製備與腦瘤、神經退化性疾病之小動物模型藥物遞送系統；超音波神經調控（包含聲遺傳學 Sonogenetics 與壓電奈米材料）於帕金森氏症、癲癇治療及化療後組織修復之應用；以及聚焦聲學渦旋（Focused Acoustic Vortex）與聲學微流體 3D 幹細胞球組裝技術。迄今已發表總計 62 篇 SCI 國際期刊論文，總引用次數達 3,485 次（其中 39 篇為第一作者或通訊作者），並多次受邀於重要國際學術會議發表口頭演講。",
        "education": [
          "💼 副教授 (2026–迄今)：國立成功大學 生物醫學工程學系 (Dept. of Biomedical Engineering, NCKU)",
          "💼 合聘教師：國立成功大學 前瞻醫療器材科技中心 / 醫學院轉譯生物電子醫學研究中心",
          "💼 助理教授 (2020–2026)：國立成功大學 生物醫學工程學系",
          "💼 博士後研究員 (2013–2020)：國立清華大學 生醫工程與環境科學系",
          "🎓 哲學博士 Ph.D. (2008–2013)：國立清華大學 生醫工程與環境科學系",
          "🎓 理學學士 B.S. (2003–2007)：中山醫學大學 醫學影像暨放射科學系"
        ],
        "awards": [
          "🏆 2023 國際治療超音波學會青年學者大獎 (Frederic Lizzi Early Career Award, International Society for Therapeutic Ultrasound, ISTU)",
          "🌍 2022 史丹佛大學評選「全球前 2% 頂尖科學家」(The World's Top 2% of Most Important Scientists, Stanford University)",
          "🏅 2019 科技部/國科會 年輕學者養成計畫得主 (Young Scholar Fellowship, National Science and Technology Council of Taiwan)"
        ],
        "talks": [
          "📊 學術發表影響力：累積發表 62 篇 SCI 期刊論文，總引用次數 3,485 次，其中 39 篇為第一作者或通訊作者",
          "🎤 多次於國際重要超音波與生醫工程學術會議（ISTU, IEEE IUS 等）發表口頭演講 (Oral Presentations)",
          "🔬 核心研究貢獻：微氣泡對比劑製備與腦瘤/神經退化疾病藥物遞送、超音波神經調控與組織修復、聲學渦旋與微流體 3D 細胞球組裝"
        ]
      },
      "en": {
        "name": "Ching-Hsiang Fan, Ph.D.",
        "title": "Associate Professor & Principal Investigator",
        "dept": "Dept. of Biomedical Engineering · Medical Device Innovation Center · Center of Transformative Bioelectronic Medicine, National Cheng Kung University (NCKU)",
        "bio": "Dr. Ching-Hsiang Fan is an Associate Professor in the Department of Biomedical Engineering at National Cheng Kung University (NCKU), affiliated with the Medical Device Innovation Center and the Center of Transformative Bioelectronic Medicine, College of Medicine, NCKU. His research focuses on microbubble (ultrasound contrast agent) fabrication and microbubble-based drug delivery in small animal models for brain tumors and neurodegenerative diseases, ultrasound neuromodulation for neurodegenerative diseases and tissue repair after chemotherapy, as well as focused acoustic vortex and acoustofluidic 3D stem cell spheroid assembly. He has published 62 SCI papers with 3,485 citations (39 as first or corresponding author) and given numerous oral presentations at major international conferences.",
        "education": [
          "💼 Associate Professor (2026–present): Department of Biomedical Engineering, National Cheng Kung University, Tainan, Taiwan",
          "💼 Joint Affiliation: Medical Device Innovation Center & Center of Transformative Bioelectronic Medicine, College of Medicine, NCKU",
          "💼 Assistant Professor (2020–2026): Department of Biomedical Engineering, National Cheng Kung University",
          "💼 Postdoctoral Fellow (2013–2020): Department of Biomedical Engineering and Environmental Sciences, National Tsing Hua University, Hsinchu, Taiwan",
          "🎓 Doctor of Philosophy (2008–2013): Department of Biomedical Engineering and Environmental Sciences, National Tsing Hua University, Hsinchu, Taiwan",
          "🎓 Bachelor of Science (2003–2007): Department of Medical Imaging and Radiological Sciences, Chung Shan Medical University, Taichung, Taiwan"
        ],
        "awards": [
          "🏆 2023 Frederic Lizzi Early Career Award, International Society for Therapeutic Ultrasound (ISTU)",
          "🌍 2022 The World's Top 2% of Most Important Scientists, Stanford University",
          "🏅 2019 Young Scholar Fellowships, National Science and Technology Council (NSTC) of Taiwan"
        ],
        "talks": [
          "📊 Publication Record: Published 62 SCI papers with 3,485 total citations (39 as first author or corresponding author)",
          "🎤 Delivered numerous oral presentations at premier international conferences (ISTU, IEEE IUS, etc.)",
          "🔬 Core Contributions: Microbubble drug delivery for brain tumors & neurodegenerative diseases, ultrasound neuromodulation & tissue repair, focused acoustic vortex & 3D spheroid assembly"
        ]
      }
    },
    "members": {
      "zh": [
        {
          "name": "李同學 (C. H. Li)",
          "role": "博士生",
          "badge": "局部剪切流場 / 藥物遞送",
          "topic": "聚焦聲學渦旋於血管通透性提升與藥物遞送研究"
        },
        {
          "name": "吳同學 (P. H. Wu)",
          "role": "碩士生",
          "badge": "藥物遞送 / 腦疾治療",
          "topic": "聚焦超音波結合載藥微氣泡抑制癲癇動物腦波異常放電"
        },
        {
          "name": "郭同學 (C. W. Kuo)",
          "role": "大學部專題生",
          "badge": "局部剪切流場",
          "topic": "聚焦聲學渦旋流場設計與經皮遞送系統"
        },
        {
          "name": "趙同學 (W. H. Chao)",
          "role": "碩士生",
          "badge": "局部剪切流場",
          "topic": "聲學渦旋剪切力流場與生物膜清除應用"
        }
      ],
      "en": [
        {
          "name": "C. H. Li",
          "role": "PhD. student",
          "badge": "Acoustic Vortex",
          "topic": ""
        },
        {
          "name": "P. H. Wu",
          "role": "Master student",
          "badge": "Drug Delivery",
          "topic": "Focused ultrasound with drug-loaded microbubbles for epilepsy suppression"
        },
        {
          "name": "C. W. Kuo",
          "role": "Undergraduate student",
          "badge": "Drug Delivery",
          "topic": "Focused acoustic vortex for transdermal drug delivery"
        },
        {
          "name": "W. H. Chao",
          "role": "Master student",
          "badge": "Shear Flow",
          "topic": "Remote biofilm dislodgment using focused acoustic vortex"
        }
      ]
    }
  },
  "contact": {
    "zh": {
      "intro": "誠摯邀請對「醫用治療超音波、微氣泡藥物遞送、血腦屏障開啟、超音波神經調控、聲學渦旋流場與 3D 細胞球微流體工程」感興趣的碩博士生、博士後研究員與大學部專題生加入！無論你來自醫工、電機、機械、材料、物理、放射或生醫相關科系，都歡迎與我們聯繫。",
      "positions": [
        "🎓 碩士班 / 博士班研究生：提供充足研究津貼，並補助出國參加國際頂尖超音波會議 (ISTU / IEEE IUS) 發表論文",
        "🔬 大學部專題生：親手參與聚焦超音波、微氣泡製備、聲學渦旋流場與動物/細胞實驗",
        "🤝 跨領域臨床與學術合作：結合成功大學醫學院轉譯生物電子醫學研究中心與前瞻醫材中心資源，歡迎臨床醫師與跨領域團隊合作"
      ],
      "email": "10908013@gs.ncku.edu.tw",
      "location": "國立成功大學 生物醫學工程學系 (台南市東區大學路1號)",
      "phone": "+886-6-2757575 #63418"
    },
    "en": {
      "intro": "We are actively recruiting motivated Ph.D. and M.S. students, Postdoctoral Fellows, and Undergraduate Researchers! Students from Biomedical Engineering, EE, ME, Physics, Medical Imaging, or Life Sciences are warmly welcome.",
      "positions": [
        "🎓 Graduate Students (Ph.D. / M.S.): Competitive stipends and travel support for international conferences (ISTU, IEEE IUS)",
        "🔬 Undergraduate Interns: Hands-on research in focused ultrasound, microbubbles, acoustic vortices, and acoustofluidics",
        "🤝 Clinical & Interdisciplinary Collaborations: Affiliated with NCKU Medical Device Innovation Center and Center of Transformative Bioelectronic Medicine"
      ],
      "email": "10908013@gs.ncku.edu.tw",
      "location": "Department of Biomedical Engineering, National Cheng Kung University, Tainan, Taiwan",
      "phone": "+886-6-2757575 #63418"
    }
  },
  "gallery": [
    {
      "id": "photo-0",
      "date": "2025-11",
      "category": "conference",
      "tagZh": "國際研討會",
      "tagEn": "Conference",
      "titleZh": "TSBME 2025 生物醫學工程科技研討會暨國科會醫工學門成果發表會 — 范景翔老師專題演講 (一)",
      "titleEn": "TSBME 2025 & NSTC BME Annual Symposium — Invited Talk by Prof. Fan (I)",
      "descZh": "范景翔老師於 2025 生物醫學工程科技研討會發表聚焦超音波於不同生醫應用與波形參數調控之研究成果。",
      "descEn": "Prof. Fan presenting our lab's focused ultrasound breakthroughs at the TSBME 2025 Annual Symposium.",
      "image": "tsbme-2025-1.jpg"
    },
    {
      "id": "photo-1",
      "date": "2024-09",
      "category": "conference",
      "tagZh": "國際研討會",
      "tagEn": "Conference",
      "titleZh": "IEEE UFFC-JS 2024 國際超音波聯合年會 — 范景翔老師與實驗室發表團隊合影",
      "titleEn": "IEEE UFFC-JS 2024 Taipei — Prof. Fan & Lab Presentation Team",
      "descZh": "范景翔老師率領實驗室研究生團隊參加於台北南港展覽館舉辦之 2024 IEEE UFFC-JS 國際超音波頂尖年會並發表多篇論文。",
      "descEn": "Prof.  Fan and lab researchers at the 2024 IEEE Ultrasonics, Ferroelectrics, and Frequency Control Joint Symposium.",
      "image": "IMG_7536.jpg"
    },
    {
      "id": "photo-2",
      "date": "2024",
      "category": "celebration",
      "tagZh": "畢業與慶生",
      "tagEn": "Celebration",
      "titleZh": "恭賀！實驗室同學榮獲成大醫工專題競賽「材料力學組 第一名、第二名與優勝」",
      "titleEn": "Congrats! Lab Students Won 1st Place, 2nd Place & Merit Award in NCKU BME Competition",
      "descZh": "實驗室同學展現紮實研究實力，於國立成功大學生物醫學工程學系專題研究競賽囊括第一名、第二名與優勝佳績！",
      "descEn": "Our students proudly holding their 1st Place, 2nd Place, and Merit Award certificates at NCKU BME!",
      "image": "student-awards-1.jpg"
    },
    {
      "id": "photo-3",
      "date": "2025-06",
      "category": "celebration",
      "tagZh": "畢業與慶生",
      "tagEn": "Celebration",
      "titleZh": "成大醫工畢業撥穗典禮 — 實驗室團隊溫馨合照",
      "titleEn": "NCKU BME Graduation Ceremony — Lab Celebration (I)",
      "descZh": "恭喜實驗室碩博士畢業生順利完成學業、邁向人生新階段！",
      "descEn": "Congratulations to our graduates!",
      "image": "grad-ceremony-1.jpg"
    },
    {
      "id": "photo-4",
      "date": "2025-06",
      "category": "celebration",
      "tagZh": "畢業與慶生",
      "tagEn": "Celebration",
      "titleZh": "成大醫工畢業撥穗典禮 — 范景翔老師與畢業生合影",
      "titleEn": "NCKU BME Graduation Ceremony — Prof. Fan & Graduate",
      "descZh": "",
      "descEn": "",
      "image": "grad-ceremony-3.jpg"
    },
    {
      "id": "photo-5",
      "date": "2025",
      "category": "celebration",
      "tagZh": "畢業與慶生",
      "tagEn": "Celebration",
      "titleZh": "實驗室溫馨慶生派對",
      "titleEn": "Lab Birthday Celebration",
      "descZh": "",
      "descEn": "",
      "image": "IMG_0697.jpg"
    },
    {
      "id": "photo-6",
      "date": "2025",
      "category": "experiment",
      "tagZh": "實驗室日常",
      "tagEn": "Lab Life",
      "titleZh": "實驗室日常 — 范景翔老師與泰國實習生於研究室合影",
      "titleEn": "Daily Lab Life — Prof. Fan & Students in the Office",
      "descZh": "",
      "descEn": "",
      "image": "IMG_0066.jpg"
    },
    {
      "id": "photo-7",
      "date": "2025-01",
      "category": "outing",
      "tagZh": "聚餐與出遊",
      "tagEn": "Lab Outing",
      "titleZh": "醫用超音波實驗室 — 歲末新春聚餐大合照",
      "titleEn": "Therapeutic Ultrasound Lab — New Year Team Gathering",
      "descZh": "",
      "descEn": "",
      "image": "lab-gathering-1.jpg"
    },
    {
      "id": "photo-8",
      "date": "2025",
      "category": "outing",
      "tagZh": "聚餐與出遊",
      "tagEn": "Lab Outing",
      "titleZh": "實驗室全體聚餐",
      "titleEn": "Lab Team Dinner — Group Photo",
      "descZh": "",
      "descEn": "",
      "image": "IMG_6837.jpg"
    },
    {
      "id": "photo-9",
      "date": "2025",
      "category": "outing",
      "tagZh": "聚餐與出遊",
      "tagEn": "Lab Outing",
      "titleZh": "實驗室歡樂熱炒聚餐夜 — 全體成員大合照",
      "titleEn": "Lab Night Out & Team Dinner",
      "descZh": "",
      "descEn": "",
      "image": "IMG_7758.jpg"
    },
    {
      "id": "photo-10",
      "date": "2025",
      "category": "outing",
      "tagZh": "聚餐與出遊",
      "tagEn": "Lab Outing",
      "titleZh": "實驗室火鍋聚餐與師生交流時光",
      "titleEn": "Lab Hotpot Dinner & Team Bonding (I)",
      "descZh": "",
      "descEn": "",
      "image": "lab-gathering-2.jpg"
    },
    {
      "id": "photo-11",
      "date": "2025",
      "category": "outing",
      "tagZh": "聚餐與出遊",
      "tagEn": "Lab Outing",
      "titleZh": "實驗室火鍋聚餐與師生交流時光",
      "titleEn": "Lab Hotpot Dinner & Team Bonding (II)",
      "descZh": "",
      "descEn": "",
      "image": "IMG_4101.jpg"
    },
    {
      "id": "photo-12",
      "date": "2025",
      "category": "outing",
      "tagZh": "聚餐與出遊",
      "tagEn": "Lab Outing",
      "titleZh": "實驗室火鍋聚餐與師生交流時光",
      "titleEn": "Lab Hotpot Dinner & Team Bonding (III)",
      "descZh": "",
      "descEn": "",
      "image": "IMG_4096.jpg"
    },
    {
      "id": "photo-13",
      "date": "2025",
      "category": "outing",
      "tagZh": "聚餐與出遊",
      "tagEn": "Lab Outing",
      "titleZh": "實驗室火鍋聚餐與師生交流時光",
      "titleEn": "Lab Hotpot Dinner & Team Bonding (IV)",
      "descZh": "",
      "descEn": "",
      "image": "IMG_4099.jpg"
    }
  ],
  "news": [
    {
      "id": "news-0",
      "date": "2026.11",
      "category": "award",
      "badgeZh": "🏆 最新捷報",
      "badgeEn": "🏆 Latest Honor",
      "titleZh": "恭賀！博士班學生獲2026 GCBME 最佳海報獎",
      "titleEn": "Congrats! PhD Student Wins Best Poster Award at 2026 GCBME",
      "descZh": "",
      "descEn": "",
      "linkZoneId": "",
      "isNew": true
    },
    {
      "id": "news-1",
      "date": "2026.10",
      "category": "award",
      "badgeZh": "📄 最新發表",
      "badgeEn": "📄 Latest Presentations",
      "titleZh": "恭賀！三位博士班學生將於2026 GCBME，以海報報告進行研究發表",
      "titleEn": "Congrats! Three PhD students will present their research through poster presentations at the 2026 GCBME.",
      "descZh": "",
      "descEn": "",
      "linkZoneId": "",
      "isNew": true
    },
    {
      "id": "news-2",
      "date": "2026.06",
      "category": "award",
      "badgeZh": "📄 最新發表",
      "badgeEn": "📄 Latest Presentations",
      "titleZh": "恭賀！📄 兩位博士班學生將於2026 IUS，分別以口頭報告與海報報告，進行研究發表",
      "titleEn": "Congrats! Two PhD students will present their research at the 2026 IUS, with one giving an oral presentation and the other a poster presentation.",
      "descZh": "",
      "descEn": "",
      "linkZoneId": "",
      "isNew": true
    },
    {
      "id": "news-3",
      "date": "2026.07",
      "category": "paper",
      "badgeZh": "📄 最新發表",
      "badgeEn": "📄 New Paper",
      "titleZh": "賀！「渦旋超音波誘導剪切應力調控纖毛運動」研究榮登頂尖期刊《ACS Nano》！",
      "titleEn": "New paper 'Modulation of Cilia Motility by Vortex-Ultrasound-Induced Shear Stress' published in ACS Nano!",
      "descZh": "運用渦旋超音波產生局部特殊剪切力流場，實現無接觸式細胞纖毛運動精準調控。",
      "descEn": "Precision non-contact modulation of cellular cilia motility via vortex-ultrasound-induced shear stress fields.",
      "linkZoneId": "shear-flow",
      "isNew": true
    },
    {
      "id": "news-4",
      "date": "2026.04",
      "category": "paper",
      "badgeZh": "📄 最新發表",
      "badgeEn": "📄 New Paper",
      "titleZh": "賀！本實驗室與合作團隊「聲學微流體快速組裝 3D 幹細胞球」研究刊登於《Materials Today Advances》",
      "titleEn": "New paper on rapid acoustofluidic 3D stem cell spheroid assembly published in Materials Today Advances!",
      "descZh": "開發高效無接觸聲學微流體裝置，組裝具高度治療與再生潛力之 3D 幹細胞球。",
      "descEn": "Rapid and efficient acoustofluidic device for 3D stem cell spheroid assembly with enhanced therapeutic potential.",
      "linkZoneId": "cell-spheroid",
      "isNew": true
    },
    {
      "id": "news-5",
      "date": "2026.02",
      "category": "paper",
      "badgeZh": "📄 最新發表",
      "badgeEn": "📄 New Paper",
      "titleZh": "賀！「聚焦超音波結合微氣泡促進間質幹細胞遷移至腦部」論文刊登於頂尖期刊《Journal of Controlled Release》",
      "titleEn": "Paper on FUS + microbubbles enhancing MSC migration to the brain published in Journal of Controlled Release!",
      "descZh": "為腦部疾病與神經再生治療開啟無創幹細胞精準遞送新契機。",
      "descEn": "Combining focused ultrasound and microbubbles for enhancing the migration of mesenchymal stem cells to the brain.",
      "linkZoneId": "bbb-opening",
      "isNew": true
    },
    {
      "id": "news-6",
      "date": "2025.12",
      "category": "paper",
      "badgeZh": "📄 連續發表",
      "badgeEn": "📄 New Papers",
      "titleZh": "賀！實驗室於《Ultrasonics Sonochemistry》與《Ultrasonics》連續發表 3 篇聚焦聲學渦旋與癲癇治療研究",
      "titleEn": "Three papers on Focused Acoustic Vortex and Epilepsy Therapy published in Ultrasonics Sonochemistry & Ultrasonics!",
      "descZh": "涵蓋聚焦聲學渦旋遠端生物膜剝離、經皮藥物遞送以及載藥微氣泡抑制癲癇異常腦波放電。",
      "descEn": "Breakthroughs in remote biofilm dislodgment, transdermal delivery via acoustic vortex, and epilepsy suppression.",
      "linkZoneId": "shear-flow",
      "isNew": true
    },
    {
      "id": "news-7",
      "date": "2025.01",
      "category": "paper",
      "badgeZh": "📄 聲遺傳學",
      "badgeEn": "📄 Sonogenetics",
      "titleZh": "「利用聲遺傳學 (Sonogenetics) 調控急性癲癇 GABAergic 神經元」研究刊登於《Journal of Controlled Release》",
      "titleEn": "Modulation of GABAergic neurons in acute epilepsy using sonogenetics published in Journal of Controlled Release",
      "descZh": "展現無創超音波結合基因工程於精準神經迴路調控之強大潛力。",
      "descEn": "Non-invasive cell-type specific neuromodulation for epilepsy therapy.",
      "linkZoneId": "neuromodulation",
      "isNew": false
    }
  ],
  "videos": [
    {
      "id": "vid-1",
      "ytId": "D4Vb5qaxyng",
      "url": "https://www.youtube.com/watch?v=D4Vb5qaxyng",
      "zoneIds": [
        "drug-delivery",
        "bbb-opening"
      ],
      "tagZh": "🎬 實驗室研究簡介",
      "tagEn": "🎬 Lab Intro Video",
      "titleZh": "國立成功大學生物醫學工程學系：范景翔 — 超音波與藥物傳遞實驗室",
      "titleEn": "NCKU BME: Prof. Ching-Hsiang Fan — Ultrasound & Drug Delivery Lab",
      "descZh": "介紹本實驗室如何運用醫用超音波與微氣泡載體技術，進行靶向藥物傳遞、開啟血腦屏障與腦部疾病治療研究。",
      "descEn": "Overview of our laboratory's research on therapeutic ultrasound, microbubble carriers, targeted drug delivery, and brain therapy."
    },
    {
      "id": "vid-2",
      "ytId": "dZ8zrakPfa8",
      "url": "https://www.youtube.com/watch?v=dZ8zrakPfa8",
      "zoneIds": [
        "shear-flow",
        "neuromodulation",
        "bbb-opening",
        "drug-delivery"
      ],
      "tagZh": "📺 台灣新視野專訪",
      "tagEn": "📺 Featured TV Report",
      "titleZh": "成大醫工范景翔博士 — 漩渦式超音波技術與無創腦疾治療（台灣新視野專題報導）",
      "titleEn": "Featured Report: Dr. Ching-Hsiang Fan — Acoustic Vortex Ultrasound for Brain Therapy & Biofilm Removal",
      "descZh": "深入報導本團隊研發之「漩渦式超音波（Focused Acoustic Vortex）」技術：結合基因與藥物治療穿透血腦屏障、實現無創神經調控，並運用特殊剪切流場清除人工關節生物膜與增生組織。",
      "descEn": "TV feature on our Focused Acoustic Vortex technology: enhancing BBB drug/gene delivery for neurodegenerative diseases, neuromodulation, and non-contact removal of biofilms and hyperplastic tissue."
    }
  ]
};
