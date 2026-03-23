// ── 好心驛 志工媒合平台 ScrollStory ──────────────────────────────────────────
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './HoxinYiScrollStory.module.css';

// ── Assets ────────────────────────────────────────────────────────────────────
import proto01 from '../assets/hoxinyi/prototype-01.mov';
import proto02 from '../assets/hoxinyi/prototype-02.mov';
import proto03 from '../assets/hoxinyi/prototype-03.mov';
import imgResearchInterview from '../assets/hoxinyi/research-interview.png';
import imgResearchMaze from '../assets/hoxinyi/research-maze.png';
import imgJourneyMapTop from '../assets/hoxinyi/journey-map-top.png';
import imgJourneyMapBottom from '../assets/hoxinyi/journey-map-bottom.png';
import imgJourneyMapMobile from '../assets/hoxinyi/journey-map-mobile.png';
import imgIaPersona from '../assets/hoxinyi/ia-persona.png';
import imgIaUserflow from '../assets/hoxinyi/ia-userflow.png';
import imgIaSitemap from '../assets/hoxinyi/ia-sitemap.png';
import imgIaSitemapMobile from '../assets/hoxinyi/ia-sitemap-mobile.png';
import imgSusChartMvp from '../assets/hoxinyi/sus-chart-mvp.png';
import imgSusChartHoxy from '../assets/hoxinyi/sus-chart-hoxy.png';
import imgResultsCard01 from '../assets/hoxinyi/results-card-01.png';
import imgResultsCard02 from '../assets/hoxinyi/results-card-02.png';
import imgResultsCard03 from '../assets/hoxinyi/results-card-03.png';
import imgResultsCard04 from '../assets/hoxinyi/results-card-04.png';
import imgBanner from '../assets/hoxinyi/banner.webp';
import imgTesterMvp from '../assets/hoxinyi/tester-mvp.png';

// ── Design Tokens (kept for runtime-dynamic inline styles) ────────────────────
const WHITE   = "#FFFFFF";
const DARK    = "#1A1A1A";
const PRIMARY = "#C7626E";   // rose
const ORANGE  = "#D17953";   // orange
const RED     = "#E16C54";   // coral
const TEAL    = "#3DAB8E";   // for decrease arrows

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const el = document.getElementById("main-scroll");
    if (!el) return;
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const target = document.getElementById(id);
        if (target && target.offsetTop - 80 <= el.scrollTop) current = id;
      }
      setActive(current);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

function scrollToSection(id) {
  const el     = document.getElementById("main-scroll");
  const target = document.getElementById(id);
  if (el && target) el.scrollTo({ top: target.offsetTop - 56, behavior: "smooth" });
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "hxy-research",   label: "用戶研究" },
  { id: "hxy-ia",         label: "資訊架構" },
  { id: "hxy-results",    label: "結果" },
];

function SectionNav({ active }) {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <button onClick={() => navigate("/projects")} className={styles.navBack}>← 返回</button>
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
          >{label}</button>
        );
      })}
    </nav>
  );
}

// ── Shared: Section Badge ─────────────────────────────────────────────────────
// `color` is truly dynamic (different color per section), keep inline
function SectionBadge({ en, tc, color = PRIMARY }) {
  return (
    <div className={styles.sectionBadgeWrapper}>
      <div className={styles.sectionBadge} style={{ background: color }}>
        <span className={styles.sectionBadgeEn}>{en}</span>
        {tc && <>
          <span className={styles.sectionBadgeDot}>·</span>
          <span className={styles.sectionBadgeTc}>{tc}</span>
        </>}
      </div>
    </div>
  );
}

// ── Shared: Wave SVG ──────────────────────────────────────────────────────────
// `fill` and `flip` are dynamic props, keep inline
function WaveBottom({ fill = WHITE, flip = false }) {
  const d = flip
    ? "M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
    : "M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z";
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={styles.waveSvg}>
      <path d={d} fill={fill} />
    </svg>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
const HXY_HERO_TAGS  = ["UX Research", "A/B Testing", "Usability Test", "2022"];
const HXY_INFO_CARDS = [
  { label: "時程", value: "36 週" },
  { label: "角色", value: "UX Research・UI Design" },
  { label: "工具", value: "Figma・Maze" },
  { label: "成效", value: "錯誤點擊率下降 27%\n任務完成率提升 31%\n易用性分數提升 26%" },
];

function HxyInfoCard({ label, value }) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardLabel}>{label}</div>
      <div className={styles.infoCardValue}>
        {value.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>

        {/* ← Projects */}
        <div className={styles.heroBackRow}>
          <button
            onClick={() => navigate("/projects")}
            className={styles.heroBackBtn}
          >
            ← Projects
          </button>
        </div>

        {/* 主標題區塊 */}
        <div className={styles.heroContent}>
          {/* Tags */}
          <div className={styles.heroTagsRow}>
            {HXY_HERO_TAGS.map(tag => (
              <span key={tag} className={styles.heroTag}>{tag}</span>
            ))}
          </div>

          {/* 主標題 */}
          <h1 className={styles.heroH1}>數據驅動體驗革新：台灣樸石志工媒合平台之易用性重塑</h1>

          {/* 副標題 */}
          <p className={styles.heroSubtitle}>
            透過深度 UX 研究與流程優化，成功彌合報名、培訓與社群斷層，大幅提升任務完成率 31%，並將系統易用性 (SUS) 分數推升 26%，打造最高效的志工服務體驗。
          </p>

          {/* Info Cards */}
          <div className={styles.heroInfoCards}>
            {HXY_INFO_CARDS.map(card => (
              <HxyInfoCard key={card.label} {...card} />
            ))}
          </div>
        </div>

        {/* Banner 圖 */}
        <div className={styles.heroBannerWrap}>
          <img src={imgBanner} alt="好心驛 Banner" className={styles.heroBannerImg} />
        </div>

        <div className={styles.heroSpacer} />
      </div>
    </section>
  );
}

// ── CHALLENGES & GOALS ────────────────────────────────────────────────────────
function Challenges() {
  const [activeVideo, setActiveVideo] = useState(0);
  return (
    <div id="hxy-challenges">
      {/* Cover */}
      <div className={`${styles.sectionCover} ${styles.challengesCover}`}>
        <div className={styles.sectionCoverInner}>
          <SectionBadge en="CHALLENGES & CORE DESIGN" tc="問題挑戰和核心設計" color={ORANGE} />
          <div className={`${styles.sectionCoverTitle} ${styles.sectionCoverTitleOrange}`}>問題挑戰和核心設計</div>
          <p className={styles.sectionCoverDesc}>找出平台核心痛點，訂定可量化的設計目標。</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>

          {/* 問題挑戰 */}
          <h3 className={styles.challengesSectionH3}>問題挑戰</h3>
          <div className={styles.challengesGrid}>
            {[
              { n: "01", title: "報名流程複雜",   desc: "使用者需跨越多個頁面完成報名，步驟不直覺，導致高放棄率。" },
              { n: "02", title: "培訓體系不透明", desc: "志工無法清楚掌握培訓進度與下一步，造成混亂與挫折感。" },
              { n: "03", title: "社群連結薄弱",   desc: "缺乏有效的志工間交流機制，難以建立社群認同感與長期黏著度。" },
            ].map(c => (
              <div key={c.n} className={styles.challengeCard}>
                <div className={styles.challengeCardNum}>{c.n}</div>
                <div className={styles.challengeCardTitle}>{c.title}</div>
                <p className={styles.challengeCardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* 核心設計 — 原型影片展示 */}
          <h3 className={styles.challengesSectionH3}>核心設計</h3>

          {/* Tab Buttons */}
          <div className={styles.protoTabRow}>
            {[
              "原型 01 — 簡化報名流程",
              "原型 02 — 培訓進度追蹤",
              "原型 03 — 志工社群功能",
            ].map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveVideo(i)}
                className={styles.protoTabBtn}
                style={{
                  background: activeVideo === i ? ORANGE : "transparent",
                  color:      activeVideo === i ? WHITE  : ORANGE,
                }}
              >{label}</button>
            ))}
          </div>

          {/* Video Display Area */}
          <div className={styles.protoVideoWrap}>
            <video
              key={activeVideo}
              src={[proto01, proto02, proto03][activeVideo]}
              autoPlay
              loop
              muted
              playsInline
              className={styles.protoVideo}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

// ── USER RESEARCH ─────────────────────────────────────────────────────────────
function UserResearch() {
  return (
    <div id="hxy-research">
      {/* Cover with big title */}
      <div className={`${styles.sectionCover} ${styles.researchCover}`}>
        <div className={styles.sectionCoverInner}>
          <SectionBadge en="RESEARCH" tc="用戶研究" color={ORANGE} />
          <div className={`${styles.sectionCoverTitle} ${styles.sectionCoverTitleOrange}`}>用戶研究</div>
          <p className={styles.sectionCoverDesc}>深度訪談與可用性測試，了解志工的真實使用流程與痛點。</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>
          {/* Stats */}
          <div className={styles.researchStatsGrid}>
            {[
              { n: "8",  label: "位受訪者", sub: "具長期專案意願的志工" },
              { n: "2",  label: "輪測試",   sub: "Maze 可用性測驗" },
              { n: "3",  label: "核心流程", sub: "報名 → 培訓 → 交流" },
            ].map(s => (
              <div key={s.n} className={styles.researchStatCard}>
                <div className={styles.researchStatNum}>{s.n}</div>
                <div className={styles.researchStatLabel}>{s.label}</div>
                <div className={styles.researchStatSub}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Persona / photo cards */}
          <h3 className={styles.researchSectionH3}>受訪者</h3>
          <div className={styles.researchPhotosGrid}>
            {[
              { src: imgResearchInterview, label: "線上訪談" },
              { src: imgResearchMaze,      label: "A/B Testing 側錄｜Maze" },
            ].map(({ src, label }) => (
              <div key={label}>
                <div className={styles.researchPhotoWrap}>
                  <img src={src} alt={label} className={styles.researchPhotoImg} />
                </div>
                <p className={styles.researchPhotoCaption}>{label}</p>
              </div>
            ))}
          </div>

          {/* User Journey Map */}
          <h3 className={styles.researchSectionH3}>User Journey Map</h3>
          {/* Desktop: two stacked halves; Mobile: single image — handled via CSS */}
          <div className={styles.journeyMapDesktop}>
            <img src={imgJourneyMapTop}    alt="User Journey Map 上半部" className={styles.journeyMapTop} />
            <img src={imgJourneyMapBottom} alt="User Journey Map 下半部" className={styles.journeyMapBottom} />
          </div>
          <img src={imgJourneyMapMobile} alt="User Journey Map" className={styles.journeyMapMobile} />
        </div>
      </div>
    </div>
  );
}

// ── INFORMATION ARCHITECTURE ──────────────────────────────────────────────────
function InfoArchitecture() {
  return (
    <div id="hxy-ia">
      {/* Cover with big title */}
      <div className={`${styles.sectionCover} ${styles.iaCover}`}>
        <div className={styles.sectionCoverInner}>
          <SectionBadge en="INFORMATION ARCHITECTURE" tc="資訊架構" color={RED} />
          <div className={`${styles.sectionCoverTitle} ${styles.sectionCoverTitleRed}`}>資訊架構</div>
          <p className={styles.sectionCoverDesc}>重新整理網站結構，新增交流功能，讓志工更容易找到所需內容。</p>
        </div>
        <WaveBottom fill={WHITE} flip />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>
          {/* 用戶任務流程 */}
          <h3 className={styles.iaContentH3}>用戶任務流程</h3>

          {/* Speech bubble + FLOW cards */}
          <div className={styles.iaFlowRow}>
            {/* Left: speech bubble on top + circular persona below */}
            <div className={styles.iaPersonaCol}>
              {/* Speech bubble */}
              <div className={styles.iaSpeechBubble}>
                <p className={styles.iaSpeechText}>
                  「我是初次使用志工聯盟孵化器平台的用戶，想要報名志工活動。」
                </p>
                {/* Bubble caret pointing down */}
                <div className={styles.iaSpeechCaret} />
              </div>
              {/* Circular persona photo */}
              <img
                src={imgIaPersona}
                alt="Persona 照片"
                className={styles.iaPersonaImg}
              />
            </div>

            {/* Right: User Flow Diagram image */}
            <div className={styles.iaUserflowCol}>
              <img src={imgIaUserflow} alt="用戶任務流程圖" className={styles.iaUserflowImg} />
            </div>
          </div>

          {/* Change highlights */}
          <h3 className={styles.iaContentH3sm}>資訊架構調整</h3>
          <ul className={styles.iaChangeList}>
            <li className={styles.iaChangeItem}>降低認知負荷，讓使用者更快達到目標。</li>
            <li className={styles.iaChangeItem}>補齊核心流程與導覽層級。</li>
          </ul>

          {/* IA diagram — responsive via CSS */}
          <img src={imgIaSitemap}       alt="資訊架構圖" className={styles.iaSitemapDesktop} />
          <img src={imgIaSitemapMobile} alt="資訊架構圖" className={styles.iaSitemapMobile} />
        </div>
      </div>
    </div>
  );
}

// ── DESIGN OUTCOMES ───────────────────────────────────────────────────────────
function DesignOutcomes() {
  const items = [
    { n: "01", title: "簡化報名流程",   desc: "重新設計報名頁面，合併步驟、優化表單結構，讓使用者在 3 個步驟內完成報名，大幅降低放棄率。" },
    { n: "02", title: "培訓進度條", desc: "新增志工培訓進度頁，以視覺化方式展示學習路徑與任務狀態，讓志工清楚掌握每個階段。" },
    { n: "03", title: "志工交流功能",   desc: "建立「認識夥伴」模組，讓志工可私訊、分享心得，強化社群連結與長期參與意願。" },
  ];

  // The alternating layout (text-left vs text-right on desktop) depends on
  // the item index at runtime, so we keep it as inline gridTemplateColumns.
  return (
    <div id="hxy-outcomes">
      {/* Cover */}
      <div className={`${styles.sectionCover} ${styles.outcomesCover}`}>
        <div className={styles.sectionCoverInner}>
          <SectionBadge en="DESIGN OUTCOMES" tc="設計成果" color={PRIMARY} />
          <div className={`${styles.sectionCoverTitle} ${styles.sectionCoverTitleRose}`}>設計成果</div>
          <p className={styles.sectionCoverDesc}>三大核心流程的重新設計，以易用性為中心打造更直覺的體驗。</p>
        </div>
        <WaveBottom fill={WHITE} flip />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>
          {items.map((item, i) => (
            <div key={i} style={{ marginBottom: i < items.length - 1 ? 72 : 0 }}>
              {/*
                On mobile: always column (flex).
                On desktop: grid, alternating column order per item.
                Because the grid column template depends on `i` (runtime data),
                we keep these layout values inline.
              */}
              <div style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr",
                gap: 48,
                alignItems: "center",
              }}
              className={styles.outcomesItemGrid}
              >
                {/* Text left (even items) */}
                {i % 2 === 0 && (
                  <div>
                    <div className={styles.outcomesNumBadge}>{item.n}</div>
                    <h3 className={styles.outcomesItemH3}>{item.title}</h3>
                    <p className={styles.outcomesItemDesc}>{item.desc}</p>
                  </div>
                )}
                <video
                  src={[proto01, proto02, proto03][i]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.outcomesVideo}
                />
                {/* Text right (odd items) */}
                {i % 2 !== 0 && (
                  <div>
                    <div className={styles.outcomesNumBadge}>{item.n}</div>
                    <h3 className={styles.outcomesItemH3}>{item.title}</h3>
                    <p className={styles.outcomesItemDesc}>{item.desc}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function Results() {
  const tasks = [
    "完成註冊登入及活動報名",
    "完成報名參加志工培訓",
    "完成活動後心得經驗分享",
  ];

  const methods = [
    "遠端測試、螢幕錄影",
    "MAZE任務測試",
    "SUS易用性量表測試",
  ];

  const tableRows = [
    { label: "原MVP",  n: "7 人", misclick: "64.3%", time: "255.0s", success: "28.6%", error: "0%",    score: "27", highlight: false, hot: [2, 4] },
    { label: "好心驛", n: "8 人", misclick: "47.2%", time: "838.3s", success: "37.5%", error: "12.5%", score: "34", highlight: false, hot: [1, 3] },
  ];

  // `color` per metric is runtime data (TEAL vs RED), kept inline
  const metrics = [
    { label: "錯誤點擊率", en: "MISCLICK RATE",    pct: "27%", dir: "down", color: TEAL   },
    { label: "完成率",     en: "AVG SUCCESS",       pct: "31%", dir: "up",   color: RED    },
    { label: "易用性分數", en: "USABILITY SCORE",   pct: "26%", dir: "up",   color: RED    },
  ];

  return (
    <div id="hxy-results">
      {/* Cover */}
      <div className={`${styles.sectionCover} ${styles.resultsCover}`}>
        <div className={styles.resultsCoverInner}>
          <SectionBadge en="RESULTS" tc="結果" color={`${WHITE}30`} />
          <div className={styles.resultsCoverTitle}>結果</div>
          <p className={styles.resultsCoverSub}>易用性 &amp; SUS分析</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>

        {/* ── 易用性測試報告 ── */}
        <h3 className={styles.resultsSectionH3}>
          <span className={styles.orangeDot} />
          易用性測試報告
        </h3>

        <div className={styles.usabilityGrid}>
          {/* Left: tasks + methods */}
          <div className={styles.usabilityLeft}>
            {/* 主要目標任務 */}
            <div className={styles.usabilityBox}>
              <div className={styles.usabilityBoxLabel}>主要目標任務</div>
              <ul className={styles.usabilityList}>
                {tasks.map((t, i) => (
                  <li key={i} className={styles.usabilityListItem}>
                    <svg className={styles.usabilityCheckIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="10" fill="#C7626E" fillOpacity="0.15"/>
                      <path d="M5.5 10.5L8.5 13.5L14.5 7.5" stroke="#C7626E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.usabilityListText}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* 測試方法 */}
            <div className={styles.usabilityBox}>
              <div className={styles.usabilityBoxLabel}>測試方法</div>
              <ul className={styles.usabilityList}>
                {methods.map((m, i) => (
                  <li key={i} className={styles.usabilityListItem}>
                    <svg className={styles.usabilityCheckIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="10" fill="#C7626E" fillOpacity="0.15"/>
                      <path d="M5.5 10.5L8.5 13.5L14.5 7.5" stroke="#C7626E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.usabilityListText}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: 使用者驗證與研究策略 */}
          <div className={styles.testerBox}>
            <div className={styles.testerBoxLabel}>使用者驗證與研究策略</div>
            <p className={styles.testerStrategyText}>
              為確保迭代設計能精準對齊真實服務場景，本次專案透過
              <strong>「樸石人文協會」精準招募受測者。樣本涵蓋首輪 MVP 回訪使用者（驗證改版成效）與高度符合 Persona 特徵的長期志工</strong>
              （深度洞察專業需求），透過多元的樣本組成，補齊原始架構中的資訊斷點與操作瓶頸。
            </p>
            <div className={styles.testerGrid}>
              {[
                { label: "原MVP",  imgSrc: imgTesterMvp, highlight: false },
                { label: "好心驛", imgSrc: imgIaPersona, highlight: true  },
              ].map(p => (
                <div key={p.label} className={styles.testerCol}>
                  <div style={{
                    background: p.highlight ? ORANGE : PRIMARY,
                    color: WHITE,
                    borderRadius: 9999,
                    padding: "3px 16px",
                    fontFamily: "'Noto Sans TC', 'PingFang TC', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                  }}>{p.label}</div>
                  <img src={p.imgSrc} alt={p.label} className={styles.testerImg} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAZE測試比較 table ── */}
        <h3 className={styles.resultsSectionH3sm}>
          <span className={styles.orangeDot} />
          MAZE測試比較
        </h3>
        <div className={styles.tableWrap}>
          <table className={styles.mazeTable}>
            <thead>
              <tr className={styles.mazeTableHead}>
                {["測試者", "人數", "錯誤點擊率", "持續時間", "完成率", "錯誤率", "綜合評分"].map(h => (
                  <th key={h} className={styles.mazeTableTh}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(row => (
                /* Row background is runtime-dynamic: highlighted vs not */
                <tr key={row.label} style={{
                  background: row.highlight ? `${ORANGE}08` : WHITE,
                }}>
                  {[
                    /* Label cell: badge color is runtime-dynamic */
                    <span style={{
                      background:   row.highlight ? ORANGE : `${DARK}18`,
                      color:        row.highlight ? WHITE  : DARK,
                      borderRadius: 9999,
                      padding:      "3px 14px",
                      fontWeight:   700,
                      fontSize:     13,
                    }}>{row.label}</span>,
                    row.n, row.misclick, row.time, row.success, row.error,
                    /* Score cell: color is runtime-dynamic */
                    <span style={{
                      fontFamily: "Poppins, 'Noto Sans TC', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize:   20,
                      color:      row.highlight ? ORANGE : DARK,
                    }}>{row.score}</span>,
                  ].map((cell, ci) => (
                    <td key={ci} className={styles.mazeTableTd}>
                      {/* "hot" cells have runtime-dynamic orange highlight */}
                      {row.hot.includes(ci)
                        ? <span className={styles.mazeHotCell}>{cell}</span>
                        : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── MAZE測試目標指數 ── */}
        <h3 className={styles.resultsSectionH3md}>
          <span className={styles.orangeDot} />
          MAZE測試目標指數
        </h3>
        <div className={styles.metricsGrid}>
          {metrics.map(m => (
            <div key={m.label} className={styles.metricCard}>
              <div className={styles.metricLabel}>{m.label}</div>
              <div className={styles.metricEn}>{m.en}</div>
              <div className={styles.metricPctRow}>
                {/* Arrow SVG color is runtime-dynamic from m.color */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  {m.dir === "down"
                    ? <path d="M4 4 L28 20" stroke={m.color} strokeWidth="3" strokeLinecap="round"/>
                    : <path d="M4 20 L28 4" stroke={m.color} strokeWidth="3" strokeLinecap="round"/>}
                  {m.dir === "down"
                    ? <path d="M16 20 L28 20 L28 8" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    : <path d="M16 4 L28 4 L28 16" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>}
                </svg>
                {/* Percentage color is runtime-dynamic from m.color */}
                <span className={styles.metricPct} style={{ color: m.color }}>{m.pct}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── SUS量表分數散佈圖 ── */}
        <h3 className={styles.resultsSectionH3sm}>
          <span className={styles.orangeDot} />
          SUS量表分數散佈圖
        </h3>
        <div className={styles.susGrid}>
          <div>
            <div className={styles.susBadgeMvp}>原MVP</div>
            <img src={imgSusChartMvp} alt="原MVP SUS散佈圖" className={styles.susImg} />
          </div>
          <div>
            <div className={styles.susBadgeHoxy}>好心驛</div>
            <img src={imgSusChartHoxy} alt="好心驛 SUS散佈圖" className={styles.susImg} />
          </div>
        </div>

        {/* ── 成果分析 ── */}
        <h3 className={styles.resultsSectionH3md}>
          <span className={styles.orangeDot} />
          成果分析
        </h3>
        <div className={styles.outcomesCardsGrid}>
          <img src={imgResultsCard01} alt="27→34 報名完成度提高"  className={styles.outcomesCardImg} />
          <img src={imgResultsCard02} alt="D→C SUS量表分數提高"   className={styles.outcomesCardImg} />
          <img src={imgResultsCard03} alt="志工黏著度提高"         className={styles.outcomesCardImg} />
          <img src={imgResultsCard04} alt="NEXT STEP"              className={styles.outcomesCardImg} />
        </div>
        </div>{/* /maxWidth */}
      </div>
    </div>
  );
}

// ── MAIN EXPORT ────────────────────────────────────────────────────────────────
const SECTION_IDS = NAV_ITEMS.map(n => n.id);

export default function HoxinYiScrollStory() {
  const active = useActiveSection(SECTION_IDS);
  return (
    <>
      <SectionNav active={active} />
      <Hero />
      <Challenges />
      <UserResearch />
      <InfoArchitecture />
      <DesignOutcomes />
      <Results />
    </>
  );
}
