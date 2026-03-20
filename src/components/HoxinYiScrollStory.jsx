// ── 好心驛 志工媒合平台 ScrollStory ──────────────────────────────────────────
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
import imgBanner from '../assets/hoxinyi/banner.png';
import imgTesterMvp from '../assets/hoxinyi/tester-mvp.png';

// ── Design Tokens ─────────────────────────────────────────────────────────────
const BG      = "#F5F4F2";   // warm off-white (matches Rent4U)
const WHITE   = "#FFFFFF";
const DARK    = "#1A1A1A";
const GRAY    = "#6B6760";
const PRIMARY = "#C7626E";   // rose
const ORANGE  = "#D17953";   // orange
const SAGE    = "#B1BA88";   // sage green
const RED     = "#E16C54";   // coral
const YELLOW  = "#F5CB4A";   // warm yellow
const FONT_TC = "'Noto Sans TC', 'PingFang TC', system-ui, sans-serif";
const FONT    = "Poppins, 'Noto Sans TC', system-ui, sans-serif";

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useIsDesktop() {
  const [v, setV] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const h = () => setV(window.innerWidth >= 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return v;
}

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
  const navigate  = useNavigate();
  const isDesktop = useIsDesktop();
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      display: "flex", alignItems: "center", gap: 2,
      padding: isDesktop ? "0 32px" : "0 12px",
      height: 56, flexShrink: 0,
      background: `${PRIMARY}EE`,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      fontFamily: FONT, overflowX: "auto", overflowY: "visible",
    }}>
      <button onClick={() => navigate("/projects")} style={{
        background: `${WHITE}20`, border: `1px solid ${WHITE}40`,
        borderRadius: 9999, padding: "4px 14px",
        fontSize: 12, color: WHITE, fontFamily: FONT,
        cursor: "pointer", marginRight: 8,
        flexShrink: 0, whiteSpace: "nowrap",
      }}>← 返回</button>
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => scrollToSection(id)} style={{
            border:       isActive ? `1px solid ${WHITE}55` : "1px solid transparent",
            cursor:       "pointer",
            padding:      isDesktop ? "5px 16px" : "4px 10px",
            borderRadius: 9999,
            fontSize:     isDesktop ? 13 : 11,
            fontWeight:   isActive ? 600 : 400,
            fontFamily:   FONT,
            color:        isActive ? WHITE : `${WHITE}80`,
            background:   isActive ? `${WHITE}25` : "transparent",
            transition:   "all 0.2s ease",
            whiteSpace:   "nowrap", flexShrink: 0,
          }}>{label}</button>
        );
      })}
    </nav>
  );
}

// ── Shared: Image Placeholder ─────────────────────────────────────────────────
function ImgPlaceholder({ label, aspect = "56.25%", radius = 16 }) {
  return (
    <div style={{
      width: "100%", paddingBottom: aspect,
      position: "relative", borderRadius: radius,
      background: "#F0ECE6",
      border: "2px dashed #D8CFC6",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 10,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: "#E3DBD4",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A89A90" strokeWidth="1.5" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        {label.split("\n").map((line, i) => (
          <span key={i} style={{
            fontFamily: FONT_TC, fontSize: 13, color: "#A89A90",
            textAlign: "center", padding: "0 20px",
          }}>{line}</span>
        ))}
      </div>
    </div>
  );
}

// ── Shared: Section Badge ─────────────────────────────────────────────────────
function SectionBadge({ en, tc, color = PRIMARY }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        background: color,
        borderRadius: 9999,
        padding: "6px 22px",
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>
        <span style={{
          fontFamily: FONT, fontWeight: 700,
          fontSize: 11, color: WHITE,
          letterSpacing: "0.14em", textTransform: "uppercase",
        }}>{en}</span>
        {tc && <>
          <span style={{ color: `${WHITE}50`, fontSize: 11 }}>·</span>
          <span style={{ fontFamily: FONT_TC, fontWeight: 700, fontSize: 12, color: WHITE }}>{tc}</span>
        </>}
      </div>
    </div>
  );
}

// ── Shared: Wave SVG ──────────────────────────────────────────────────────────
function WaveBottom({ fill = WHITE, flip = false }) {
  const d = flip
    ? "M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
    : "M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z";
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      width: "100%", height: 64, display: "block",
    }}>
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
    <div style={{
      flex: 1, minWidth: 130,
      padding: "16px 24px",
      borderRadius: 8,
      background: `${PRIMARY}0D`,
      fontFamily: FONT,
    }}>
      <div style={{
        fontSize: 12, color: `${DARK}70`,
        fontWeight: 400, letterSpacing: "0.08em",
        textTransform: "uppercase", marginBottom: 12,
      }}>{label}</div>
      <div style={{
        fontSize: 16, fontWeight: 700,
        color: DARK, lineHeight: "28px",
        fontFamily: FONT_TC,
      }}>
        {value.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const isDesktop = useIsDesktop();
  const navigate  = useNavigate();
  return (
    <section style={{ background: BG, fontFamily: FONT, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", padding: isDesktop ? "0 40px" : "0 20px" }}>

        {/* ← Projects */}
        <div style={{ padding: "24px 0 0" }}>
          <button
            onClick={() => navigate("/projects")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, color: `${DARK}70`,
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "Menlo, monospace", letterSpacing: "0.08em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = PRIMARY; }}
            onMouseLeave={e => { e.currentTarget.style.color = `${DARK}70`; }}
          >
            ← Projects
          </button>
        </div>

        {/* 主標題區塊 */}
        <div style={{ paddingTop: 32 }}>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            {HXY_HERO_TAGS.map(tag => (
              <span key={tag} style={{
                background: "transparent",
                border: `1px solid ${PRIMARY}60`,
                borderRadius: 9999,
                padding: "4px 12px",
                fontSize: 14, color: PRIMARY,
                letterSpacing: "0.057em",
                fontFamily: "Menlo, monospace",
              }}>{tag}</span>
            ))}
          </div>

          {/* 主標題 */}
          <h1 style={{
            fontSize: "clamp(36px, 4.5vw, 60px)",
            fontWeight: 700, color: DARK,
            lineHeight: 1.1, letterSpacing: "-0.03em",
            margin: "0 0 16px",
            fontFamily: "Georgia, serif",
          }}>數據驅動體驗革新：台灣樸石志工媒合平台之易用性重塑</h1>

          {/* 副標題 */}
          <p style={{
            margin: "0 0 32px",
            fontSize: 16, color: `${DARK}BB`,
            lineHeight: 1.86, maxWidth: 620,
            fontFamily: FONT_TC, fontWeight: 300,
          }}>
            透過深度 UX 研究與流程優化，成功彌合報名、培訓與社群斷層，大幅提升任務完成率 31%，並將系統易用性 (SUS) 分數推升 26%，打造最高效的志工服務體驗。
          </p>

          {/* Info Cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 40 }}>
            {HXY_INFO_CARDS.map(card => (
              <HxyInfoCard key={card.label} {...card} />
            ))}
          </div>
        </div>

        {/* Banner 圖 */}
        <div style={{
          borderRadius: 17, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          width: "100%",
        }}>
          <img src={imgBanner} alt="好心驛 Banner" style={{ width: "100%", display: "block" }} />
        </div>

        <div style={{ height: isDesktop ? 80 : 48 }} />
      </div>
    </section>
  );
}

// ── CHALLENGES & GOALS ────────────────────────────────────────────────────────
function Challenges() {
  const isDesktop = useIsDesktop();
  const [activeVideo, setActiveVideo] = useState(0);
  return (
    <div id="hxy-challenges">
      {/* Cover */}
      <div style={{
        background: `${YELLOW}25`,
        padding: isDesktop ? "96px 40px 80px" : "64px 20px 64px",
        position: "relative", overflow: "clip",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <SectionBadge en="CHALLENGES & CORE DESIGN" tc="問題挑戰和核心設計" color={ORANGE} />
          <div style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 40 : 28,
            color: ORANGE, lineHeight: 1, marginBottom: 20,
            letterSpacing: isDesktop ? -2 : -1,
          }}>問題挑戰和核心設計</div>
          <p style={{
            fontFamily: FONT_TC, fontSize: isDesktop ? 18 : 15,
            color: GRAY, margin: 0, maxWidth: 500, lineHeight: 1.8,
          }}>找出平台核心痛點，訂定可量化的設計目標。</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div style={{ background: WHITE, padding: isDesktop ? "72px 40px" : "56px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* 問題挑戰 */}
          <h3 style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 22 : 18, color: DARK, margin: "0 0 24px",
          }}>問題挑戰</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
            gap: 20, marginBottom: 64,
          }}>
            {[
              { n: "01", title: "報名流程複雜",   desc: "使用者需跨越多個頁面完成報名，步驟不直覺，導致高放棄率。" },
              { n: "02", title: "培訓體系不透明", desc: "志工無法清楚掌握培訓進度與下一步，造成混亂與挫折感。" },
              { n: "03", title: "社群連結薄弱",   desc: "缺乏有效的志工間交流機制，難以建立社群認同感與長期黏著度。" },
            ].map(c => (
              <div key={c.n} style={{
                background: `${YELLOW}18`, borderRadius: 20,
                padding: "28px 24px", borderTop: `4px solid ${ORANGE}`,
              }}>
                <div style={{
                  fontFamily: FONT, fontWeight: 700, fontSize: 32,
                  color: ORANGE, lineHeight: 1, marginBottom: 12,
                }}>{c.n}</div>
                <div style={{
                  fontFamily: FONT_TC, fontWeight: 700, fontSize: 16,
                  color: DARK, marginBottom: 10,
                }}>{c.title}</div>
                <p style={{
                  fontFamily: FONT_TC, fontSize: 14,
                  color: GRAY, lineHeight: 1.75, margin: 0,
                }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* 核心設計 — 原型影片展示 */}
          <h3 style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 22 : 18, color: DARK, margin: "0 0 24px",
          }}>核心設計</h3>

          {/* Tab Buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {[
              "原型 01 — 簡化報名流程",
              "原型 02 — 培訓進度追蹤",
              "原型 03 — 志工社群功能",
            ].map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveVideo(i)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: `2px solid ${ORANGE}`,
                  background: activeVideo === i ? ORANGE : "transparent",
                  color: activeVideo === i ? WHITE : ORANGE,
                  fontFamily: FONT_TC,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  outline: "none",
                }}
              >{label}</button>
            ))}
          </div>

          {/* Video Display Area */}
          <div style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `2px solid ${ORANGE}20`,
            background: BG,
          }}>
            <video
              key={activeVideo}
              src={[proto01, proto02, proto03][activeVideo]}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", display: "block" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

// ── USER RESEARCH ─────────────────────────────────────────────────────────────
function UserResearch() {
  const isDesktop = useIsDesktop();
  return (
    <div id="hxy-research">
      {/* Cover with big title */}
      <div style={{
        background: BG,
        padding: isDesktop ? "96px 40px 80px" : "64px 20px 64px",
        position: "relative", overflow: "clip",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <SectionBadge en="RESEARCH" tc="用戶研究" color={ORANGE} />

          <div style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 40 : 28,
            color: ORANGE, lineHeight: 1,
            marginBottom: 20,
            letterSpacing: isDesktop ? -2 : -1,
          }}>用戶研究</div>

          <p style={{
            fontFamily: FONT_TC, fontSize: isDesktop ? 18 : 15,
            color: GRAY, margin: 0,
            maxWidth: 500, lineHeight: 1.8,
          }}>深度訪談與可用性測試，了解志工的真實使用流程與痛點。</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div style={{
        background: WHITE,
        padding: isDesktop ? "72px 40px" : "56px 20px",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16, marginBottom: 56,
          }}>
            {[
              { n: "8",  label: "位受訪者", sub: "具長期專案意願的志工" },
              { n: "2",  label: "輪測試",   sub: "Maze 可用性測驗" },
              { n: "3",  label: "核心流程", sub: "報名 → 培訓 → 交流" },
            ].map(s => (
              <div key={s.n} style={{
                background: BG, borderRadius: 20,
                padding: isDesktop ? "32px 20px" : "20px 12px",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: FONT, fontWeight: 700,
                  fontSize: isDesktop ? 60 : 36,
                  color: ORANGE, lineHeight: 1, marginBottom: 6,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: FONT_TC, fontWeight: 700,
                  fontSize: isDesktop ? 15 : 13, color: DARK, marginBottom: 4,
                }}>{s.label}</div>
                <div style={{
                  fontFamily: FONT_TC, fontSize: isDesktop ? 12 : 10, color: GRAY,
                }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Persona / photo cards */}
          <h3 style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 20 : 17, color: DARK,
            margin: "0 0 20px",
          }}>受訪者</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
            gap: 24, marginBottom: 64,
          }}>
            <img src={imgResearchInterview} alt="受訪者照片" style={{ width: "100%", borderRadius: 16, display: "block" }} />
            <img src={imgResearchMaze} alt="受訪者照片" style={{ width: "100%", borderRadius: 16, display: "block" }} />
          </div>

          {/* User Journey Map */}
          <h3 style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 20 : 17, color: DARK,
            margin: "0 0 20px",
          }}>User Journey Map</h3>
          {isDesktop ? (
            <div>
              <img src={imgJourneyMapTop} alt="User Journey Map 上半部" style={{ width: "100%", display: "block", borderRadius: "16px 16px 0 0" }} />
              <img src={imgJourneyMapBottom} alt="User Journey Map 下半部" style={{ width: "100%", display: "block", borderRadius: "0 0 16px 16px" }} />
            </div>
          ) : (
            <img src={imgJourneyMapMobile} alt="User Journey Map" style={{ width: "100%", display: "block", borderRadius: 16 }} />
          )}
        </div>
      </div>
    </div>
  );
}

// ── FLOWS data (used by InfoArchitecture) ─────────────────────────────────────
const FLOWS = [
  { key: "flow1", label: "Flow 1", title: "搜尋及註冊報名",   color: RED,
    steps: ["搜尋及瀏覽活動", "註冊會員", "報名活動"] },
  { key: "flow2", label: "Flow 2", title: "志工課程培訓流程", color: ORANGE,
    steps: ["錄取通知", "志工課程", "線上交流"] },
  { key: "flow3", label: "Flow 3", title: "評論及撰寫心得",   color: SAGE,
    steps: ["填寫活動心得", "查看他人心得"] },
];

// ── INFORMATION ARCHITECTURE ──────────────────────────────────────────────────
function InfoArchitecture() {
  const isDesktop = useIsDesktop();

  return (
    <div id="hxy-ia">
      {/* Cover with big title */}
      <div style={{
        background: `${RED}10`,
        padding: isDesktop ? "96px 40px 80px" : "64px 20px 64px",
        position: "relative", overflow: "clip",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <SectionBadge en="INFORMATION ARCHITECTURE" tc="資訊架構" color={RED} />

          <div style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 40 : 28,
            color: RED, lineHeight: 1,
            marginBottom: 20,
            letterSpacing: isDesktop ? -2 : -1,
          }}>資訊架構</div>

          <p style={{
            fontFamily: FONT_TC, fontSize: isDesktop ? 18 : 15,
            color: GRAY, margin: 0,
            maxWidth: 500, lineHeight: 1.8,
          }}>重新整理網站結構，新增交流功能，讓志工更容易找到所需內容。</p>
        </div>
        <WaveBottom fill={WHITE} flip />
      </div>

      {/* Content */}
      <div style={{
        background: WHITE,
        padding: isDesktop ? "72px 40px" : "56px 20px",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* 用戶任務流程 */}
        <h3 style={{
          fontFamily: FONT_TC, fontWeight: 700,
          fontSize: isDesktop ? 22 : 18, color: DARK,
          margin: "0 0 32px",
        }}>用戶任務流程</h3>

        {/* Speech bubble + FLOW cards */}
        <div style={{
          display: isDesktop ? "grid" : "flex",
          gridTemplateColumns: isDesktop ? "240px 1fr" : undefined,
          flexDirection: isDesktop ? undefined : "column",
          gap: 32, marginBottom: 72, alignItems: "start",
        }}>
          {/* Left: persona + speech bubble */}
          <div>
            <img src={imgIaPersona} alt="Persona 照片" style={{ width: "100%", borderRadius: 16, display: "block" }} />
            <div style={{
              background: WHITE,
              border: `1.5px solid ${RED}25`,
              borderRadius: 16,
              padding: "14px 18px",
              marginTop: 12,
              position: "relative",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}>
              {/* Bubble caret */}
              <div style={{
                position: "absolute", top: -8, left: 20,
                width: 14, height: 14,
                background: WHITE,
                border: `1.5px solid ${RED}25`,
                borderBottom: "none", borderRight: "none",
                transform: "rotate(45deg)",
              }} />
              <p style={{
                fontFamily: FONT_TC, fontSize: 13, color: DARK,
                lineHeight: 1.75, margin: 0, fontStyle: "italic",
              }}>
                「我想快速找到適合我的志工活動，並順利完成報名。」
              </p>
            </div>
          </div>

          {/* Right: FLOW cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FLOWS.map(flow => (
              <div key={flow.key} style={{
                background: BG, borderRadius: 16,
                padding: "20px 24px",
                borderLeft: `4px solid ${flow.color}`,
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{
                  background: flow.color, color: WHITE,
                  borderRadius: 8, padding: "4px 14px",
                  display: "inline-block", alignSelf: "flex-start",
                  fontFamily: FONT, fontWeight: 700, fontSize: 12,
                  letterSpacing: "0.06em",
                }}>{flow.label}: {flow.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                  {flow.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        background: WHITE,
                        border: `1px solid ${flow.color}40`,
                        borderRadius: 9999, padding: "4px 14px",
                        fontFamily: FONT_TC, fontSize: 13, color: DARK,
                      }}>{step}</span>
                      {i < flow.steps.length - 1 && (
                        <span style={{ color: "#C0B4AA", fontSize: 12 }}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Flow Diagram */}
        <div style={{ marginBottom: 56 }}>
          <img src={imgIaUserflow} alt="用戶任務流程圖" style={{ width: "100%", borderRadius: 16, display: "block" }} />
        </div>

        {/* Change highlights */}
        <h3 style={{
          fontFamily: FONT_TC, fontWeight: 700,
          fontSize: isDesktop ? 22 : 18, color: DARK,
          margin: "0 0 20px",
        }}>資訊架構調整</h3>
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          {["1. 集中主要功能", "2. 新增交流功能"].map((label, i) => (
            <div key={i} style={{
              background: RED, color: WHITE,
              borderRadius: 9999, padding: "8px 24px",
              fontFamily: FONT_TC, fontWeight: 700, fontSize: 15,
            }}>{label}</div>
          ))}
        </div>

        {/* IA diagram image placeholder */}
        <img
          src={isDesktop ? imgIaSitemap : imgIaSitemapMobile}
          alt="資訊架構圖"
          style={{ width: "100%", borderRadius: 16, display: "block" }}
        />

        {/* Fallback tree diagram */}
        <div style={{ marginTop: 32 }}>
          <h4 style={{
            fontFamily: FONT_TC, fontWeight: 600,
            fontSize: 15, color: GRAY, margin: "0 0 20px",
          }}>志工聯盟孵化器 — 功能樹</h4>
          <div style={{
            background: BG, borderRadius: 20,
            padding: isDesktop ? "40px" : "24px",
            overflowX: "auto",
          }}>
            {/* Root */}
            <div style={{ textAlign: "center", marginBottom: 0 }}>
              <div style={{
                display: "inline-block",
                background: `${RED}12`, border: `2px solid ${RED}45`,
                borderRadius: 12, padding: "12px 32px",
                fontFamily: FONT_TC, fontWeight: 700, fontSize: 16, color: RED,
              }}>志工聯盟孵化器</div>
            </div>

            {/* Vertical connector + horizontal bar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 2, height: 24, background: "#E0D8D2" }} />
                <div style={{ width: "60vw", maxWidth: 320, borderTop: "2px solid #E0D8D2" }} />
              </div>
            </div>

            {/* Level 1 nodes */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: isDesktop ? 64 : 20,
            }}>
              {[
                { label: "個人頁面", isNew: false, children: ["我的活動", "志工課程", "活動心得"] },
                { label: "認識夥伴", isNew: true,  children: ["我要寫信", "收件匣"] },
              ].map(node => (
                <div key={node.label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <div style={{ width: 2, height: 24, background: "#E0D8D2" }} />
                  <div style={{
                    background: YELLOW, borderRadius: 12,
                    padding: "10px 22px",
                    fontFamily: FONT_TC, fontWeight: 700, fontSize: 14, color: DARK,
                    position: "relative",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                  }}>
                    {node.label}
                    {node.isNew && (
                      <span style={{
                        position: "absolute", top: -8, right: -8,
                        background: RED, color: WHITE,
                        borderRadius: 8, padding: "2px 8px",
                        fontSize: 10, fontFamily: FONT_TC, fontWeight: 700,
                      }}>NEW</span>
                    )}
                  </div>
                  <div style={{ width: 2, height: 20, background: "#E0D8D2" }} />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                    {node.children.map(child => (
                      <div key={child} style={{
                        background: WHITE, border: "1px solid #E8E3DD",
                        borderRadius: 10, padding: "6px 14px",
                        fontFamily: FONT_TC, fontSize: 13, color: DARK,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                      }}>{child}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>{/* /maxWidth */}
      </div>
    </div>
  );
}

// ── DESIGN OUTCOMES ───────────────────────────────────────────────────────────
function DesignOutcomes() {
  const isDesktop = useIsDesktop();
  const items = [
    { n: "01", title: "簡化報名流程",   desc: "重新設計報名頁面，合併步驟、優化表單結構，讓使用者在 3 個步驟內完成報名，大幅降低放棄率。" },
    { n: "02", title: "培訓進度儀表板", desc: "新增志工培訓進度頁，以視覺化方式展示學習路徑與任務狀態，讓志工清楚掌握每個階段。" },
    { n: "03", title: "志工交流功能",   desc: "建立「認識夥伴」模組，讓志工可私訊、分享心得，強化社群連結與長期參與意願。" },
  ];
  return (
    <div id="hxy-outcomes">
      {/* Cover */}
      <div style={{
        background: `${PRIMARY}12`,
        padding: isDesktop ? "96px 40px 80px" : "64px 20px 64px",
        position: "relative", overflow: "clip",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <SectionBadge en="DESIGN OUTCOMES" tc="設計成果" color={PRIMARY} />
          <div style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 40 : 28,
            color: PRIMARY, lineHeight: 1, marginBottom: 20,
            letterSpacing: isDesktop ? -2 : -1,
          }}>設計成果</div>
          <p style={{
            fontFamily: FONT_TC, fontSize: isDesktop ? 18 : 15,
            color: GRAY, margin: 0, maxWidth: 500, lineHeight: 1.8,
          }}>三大核心流程的重新設計，以易用性為中心打造更直覺的體驗。</p>
        </div>
        <WaveBottom fill={WHITE} flip />
      </div>

      {/* Content */}
      <div style={{ background: WHITE, padding: isDesktop ? "72px 40px" : "56px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {items.map((item, i) => (
            <div key={i} style={{ marginBottom: i < items.length - 1 ? 72 : 0 }}>
              <div style={{
                display: isDesktop ? "grid" : "flex",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr",
                flexDirection: "column",
                gap: 48, alignItems: "center",
              }}>
                {/* Text left (odd items on desktop swap to right) */}
                {(i % 2 === 0 || !isDesktop) && (
                  <div>
                    <div style={{
                      background: PRIMARY, color: WHITE, borderRadius: 9999,
                      padding: "5px 20px", display: "inline-block",
                      fontFamily: FONT, fontWeight: 700, fontSize: 13,
                      letterSpacing: "0.06em", marginBottom: 16,
                    }}>{item.n}</div>
                    <h3 style={{
                      fontFamily: FONT_TC, fontWeight: 700,
                      fontSize: isDesktop ? 24 : 20, color: DARK, margin: "0 0 16px",
                    }}>{item.title}</h3>
                    <p style={{
                      fontFamily: FONT_TC, fontSize: isDesktop ? 16 : 14,
                      color: GRAY, lineHeight: 1.8, margin: 0,
                    }}>{item.desc}</p>
                  </div>
                )}
                <video
                  src={[proto01, proto02, proto03][i]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", display: "block", borderRadius: 16 }}
                />
                {/* Text right (even items on desktop) */}
                {i % 2 !== 0 && isDesktop && (
                  <div>
                    <div style={{
                      background: PRIMARY, color: WHITE, borderRadius: 9999,
                      padding: "5px 20px", display: "inline-block",
                      fontFamily: FONT, fontWeight: 700, fontSize: 13,
                      letterSpacing: "0.06em", marginBottom: 16,
                    }}>{item.n}</div>
                    <h3 style={{
                      fontFamily: FONT_TC, fontWeight: 700,
                      fontSize: isDesktop ? 24 : 20, color: DARK, margin: "0 0 16px",
                    }}>{item.title}</h3>
                    <p style={{
                      fontFamily: FONT_TC, fontSize: isDesktop ? 16 : 14,
                      color: GRAY, lineHeight: 1.8, margin: 0,
                    }}>{item.desc}</p>
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
const TEAL = "#3DAB8E";   // for decrease arrows

function Results() {
  const isDesktop = useIsDesktop();

  const tasks = [
    "完成註冊登入及活動報名",
    "完成報名參加志工培訓",
    "完成活動後心得經驗報分享",
  ];

  const methods = [
    "遠端測試、螢幕錄影",
    "MAZE任務測試",
    "SUS易用性量表測試",
  ];

  const tableRows = [
    { label: "原MVP",  n: "7 人", misclick: "64.3%", time: "255.0s", success: "28.6%", error: "0%",    score: "27", highlight: false, hot: [2, 4] },
    { label: "好心驛", n: "8 人", misclick: "47.2%", time: "838.3s", success: "37.5%", error: "12.5%", score: "34", highlight: true,  hot: [1, 3] },
  ];

  const metrics = [
    { label: "錯誤點擊率", en: "MISCLICK RATE",    pct: "27%", dir: "down", color: TEAL   },
    { label: "完成率",     en: "AVG SUCCESS",       pct: "31%", dir: "up",   color: RED    },
    { label: "易用性分數", en: "USABILITY SCORE",   pct: "26%", dir: "up",   color: RED    },
  ];

  const outcomes = [
    { top: "27", arrow: "→", bot: "34", sub: "報名完成度提高",  color: ORANGE },
    { top: "D",  arrow: ">", bot: "C",  sub: "SUS量表分數提高", color: PRIMARY },
  ];

  return (
    <div id="hxy-results">
      {/* Cover */}
      <div style={{
        background: RED,
        padding: isDesktop ? "96px 40px 80px" : "64px 20px 64px",
        position: "relative", overflow: "clip",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <SectionBadge en="RESULTS" tc="結果" color={`${WHITE}30`} />
          <div style={{
            fontFamily: FONT_TC, fontWeight: 700,
            fontSize: isDesktop ? 40 : 28,
            color: WHITE, lineHeight: 1, marginBottom: 16,
            letterSpacing: isDesktop ? -2 : -1,
          }}>結果</div>
          <p style={{
            fontFamily: FONT_TC, fontSize: isDesktop ? 18 : 15,
            color: `${WHITE}CC`, margin: 0,
          }}>易用性 &amp; SUS分析</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div style={{
        background: WHITE,
        padding: isDesktop ? "72px 40px" : "56px 20px",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* ── 易用性測試報告 ── */}
        <h3 style={{
          fontFamily: FONT_TC, fontWeight: 700,
          fontSize: isDesktop ? 20 : 17, color: DARK,
          margin: "0 0 28px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, display: "inline-block", flexShrink: 0 }} />
          易用性測試報告
        </h3>

        <div style={{
          display: isDesktop ? "grid" : "flex",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
          flexDirection: isDesktop ? undefined : "column",
          gap: 24, marginBottom: 56,
        }}>
          {/* Left: tasks + methods */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* 主要目標任務 */}
            <div style={{ background: BG, borderRadius: 16, padding: "24px 24px" }}>
              <div style={{
                background: PRIMARY, color: WHITE, borderRadius: 9999,
                padding: "5px 20px", display: "inline-block",
                fontFamily: FONT_TC, fontWeight: 700, fontSize: 14,
                marginBottom: 16,
              }}>主要目標任務</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {tasks.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: PRIMARY, flexShrink: 0, marginTop: 8 }} />
                    <span style={{ fontFamily: FONT_TC, fontSize: 14, color: DARK, lineHeight: 1.7 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* 測試方法 */}
            <div style={{ background: BG, borderRadius: 16, padding: "24px 24px" }}>
              <div style={{
                background: PRIMARY, color: WHITE, borderRadius: 9999,
                padding: "5px 20px", display: "inline-block",
                fontFamily: FONT_TC, fontWeight: 700, fontSize: 14,
                marginBottom: 16,
              }}>測試方法</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {methods.map((m, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: PRIMARY, flexShrink: 0, marginTop: 8 }} />
                    <span style={{ fontFamily: FONT_TC, fontSize: 14, color: DARK, lineHeight: 1.7 }}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: 測試者篩選方法 — persona comparison */}
          <div style={{ background: BG, borderRadius: 16, padding: "24px 24px" }}>
            <div style={{
              background: PRIMARY, color: WHITE, borderRadius: 9999,
              padding: "5px 20px", display: "inline-block",
              fontFamily: FONT_TC, fontWeight: 700, fontSize: 14,
              marginBottom: 20,
            }}>測試者篩選方法</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}>
              {[
                { label: "原MVP",  desc: "模仿人文協會使用情境",             placeholder: true  },
                { label: "好心驛", desc: "測試過原MVP的測試者\n長期志工／自我成長求型", placeholder: false },
              ].map(p => (
                <div key={p.label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    background: p.placeholder ? PRIMARY : ORANGE,
                    color: WHITE, borderRadius: 9999,
                    padding: "3px 16px",
                    fontFamily: FONT_TC, fontWeight: 700, fontSize: 13,
                  }}>{p.label}</div>
                  <img
                    src={p.placeholder ? imgTesterMvp : imgIaPersona}
                    alt={p.label}
                    style={{ width: "100%", borderRadius: 9999, display: "block", aspectRatio: "1/1", objectFit: "cover" }}
                  />
                  {p.desc.split("\n").map((line, i) => (
                    <span key={i} style={{
                      fontFamily: FONT_TC, fontSize: 12, color: GRAY,
                      textAlign: "center", lineHeight: 1.5,
                    }}>{line}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAZE測試比較 table ── */}
        <h3 style={{
          fontFamily: FONT_TC, fontWeight: 700,
          fontSize: isDesktop ? 20 : 17, color: DARK,
          margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, display: "inline-block", flexShrink: 0 }} />
          MAZE測試比較
        </h3>
        <div style={{ overflowX: "auto", marginBottom: 56 }}>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            fontFamily: FONT_TC, fontSize: isDesktop ? 15 : 13,
            minWidth: 560,
          }}>
            <thead>
              <tr style={{ background: BG }}>
                {["測試者", "錯誤點擊率", "持續時間", "完成率", "錯誤率", "綜合評分"].map(h => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "center",
                    fontWeight: 700, color: DARK,
                    border: `1px solid #E8E3DD`,
                    width: "16.66%",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(row => (
                <tr key={row.label} style={{
                  background: row.highlight ? `${ORANGE}08` : WHITE,
                }}>
                  {[
                    <span style={{
                      background: row.highlight ? ORANGE : `${DARK}18`,
                      color: row.highlight ? WHITE : DARK,
                      borderRadius: 9999, padding: "3px 14px",
                      fontWeight: 700, fontSize: 13,
                    }}>{row.label}</span>,
                    row.misclick, row.time, row.success, row.error,
                    <span style={{
                      fontFamily: FONT, fontWeight: 700,
                      fontSize: 20, color: row.highlight ? ORANGE : DARK,
                    }}>{row.score}</span>,
                  ].map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "14px 16px", textAlign: "center",
                      border: `1px solid #E8E3DD`, color: DARK,
                      width: "16.66%",
                    }}>
                      {row.hot.includes(ci)
                        ? <span style={{ color: ORANGE, fontWeight: 700, fontSize: isDesktop ? 17 : 14 }}>{cell}</span>
                        : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── MAZE測試目標指數 ── */}
        <h3 style={{
          fontFamily: FONT_TC, fontWeight: 700,
          fontSize: isDesktop ? 20 : 17, color: DARK,
          margin: "0 0 24px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, display: "inline-block", flexShrink: 0 }} />
          MAZE測試目標指數
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
          gap: 16, marginBottom: 56,
        }}>
          {metrics.map(m => (
            <div key={m.label} style={{
              background: BG, borderRadius: 20,
              padding: "32px 28px",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{
                fontFamily: FONT_TC, fontWeight: 700,
                fontSize: 18, color: DARK, marginBottom: 4,
              }}>{m.label}</div>
              <div style={{
                fontFamily: FONT, fontSize: 11,
                color: GRAY, letterSpacing: "0.12em",
                marginBottom: 12,
              }}>{m.en}</div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
              }}>
                {/* Arrow */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  {m.dir === "down"
                    ? <path d="M4 4 L28 20" stroke={m.color} strokeWidth="3" strokeLinecap="round"/>
                    : <path d="M4 20 L28 4" stroke={m.color} strokeWidth="3" strokeLinecap="round"/>}
                  {m.dir === "down"
                    ? <path d="M16 20 L28 20 L28 8" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    : <path d="M16 4 L28 4 L28 16" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>}
                </svg>
                <span style={{
                  fontFamily: FONT, fontWeight: 700,
                  fontSize: isDesktop ? 40 : 32,
                  color: m.color, lineHeight: 1,
                }}>{m.pct}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── SUS量表分數散佈圖 ── */}
        <h3 style={{
          fontFamily: FONT_TC, fontWeight: 700,
          fontSize: isDesktop ? 20 : 17, color: DARK,
          margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, display: "inline-block", flexShrink: 0 }} />
          SUS量表分數散佈圖
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: 24, marginBottom: 56,
        }}>
          <div>
            <div style={{
              background: `${DARK}12`, color: DARK,
              borderRadius: 9999, padding: "4px 16px",
              display: "inline-block",
              fontFamily: FONT_TC, fontWeight: 700, fontSize: 13,
              marginBottom: 12,
            }}>原MVP</div>
            <img src={imgSusChartMvp} alt="原MVP SUS散佈圖" style={{ width: "100%", borderRadius: 16, display: "block" }} />
          </div>
          <div>
            <div style={{
              background: ORANGE, color: WHITE,
              borderRadius: 9999, padding: "4px 16px",
              display: "inline-block",
              fontFamily: FONT_TC, fontWeight: 700, fontSize: 13,
              marginBottom: 12,
            }}>好心驛</div>
            <img src={imgSusChartHoxy} alt="好心驛 SUS散佈圖" style={{ width: "100%", borderRadius: 16, display: "block" }} />
          </div>
        </div>

        {/* ── 成果分析 ── */}
        <h3 style={{
          fontFamily: FONT_TC, fontWeight: 700,
          fontSize: isDesktop ? 20 : 17, color: DARK,
          margin: "0 0 24px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, display: "inline-block", flexShrink: 0 }} />
          成果分析
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr",
          gap: 20,
        }}>
          {/* Card 1: 27 → 34 */}
          <img src={imgResultsCard01} alt="27→34 報名完成度提高" style={{ width: "100%", borderRadius: 20, display: "block" }} />

          {/* Card 2: D → C */}
          <img src={imgResultsCard02} alt="D→C SUS量表分數提高" style={{ width: "100%", borderRadius: 20, display: "block" }} />

          {/* Card 3: 志工黏著度提高 */}
          <img src={imgResultsCard03} alt="志工黏著度提高" style={{ width: "100%", borderRadius: 20, display: "block" }} />

          {/* Card 4: NEXT STEP */}
          <img src={imgResultsCard04} alt="NEXT STEP" style={{ width: "100%", borderRadius: 20, display: "block" }} />
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
      <Hero />
      <Challenges />
      <UserResearch />
      <InfoArchitecture />
      <DesignOutcomes />
      <Results />
    </>
  );
}
