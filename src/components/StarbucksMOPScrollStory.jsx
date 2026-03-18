// ── Starbucks MOP（行動預點）ScrollStory ─────────────────────────────────────
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const FONT  = "Inter, 'Noto Sans TC', system-ui, sans-serif";
const BG    = "#D4E9E2";   // Light Green
const GREEN = "#1E3932";   // House Green
const BRAND = "#036242";   // Starbucks Green
const ACCENT = "#02754B";  // Accent Green

// ── 響應式 hook ──────────────────────────────────────────────────────────────
function useIsDesktop() {
  const [v, setV] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const h = () => setV(window.innerWidth >= 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return v;
}

function scrollToSection(id) {
  const scrollEl = document.getElementById("main-scroll");
  const target   = document.getElementById(id);
  if (scrollEl && target)
    scrollEl.scrollTo({ top: target.offsetTop - 56, behavior: "smooth" });
}

// ── 頂部 sticky nav ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "sbux-about",    label: "開場"   },
  { id: "sbux-research", label: "研究洞察" },
  { id: "sbux-opt",      label: "優化方案" },
  { id: "sbux-design",   label: "設計系統" },
];

function SectionNav({ active }) {
  const isDesktop = useIsDesktop();
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      display: "flex", alignItems: "center", gap: 2,
      padding: isDesktop ? "0 32px" : "0 12px",
      height: 56,
      background: `${GREEN}F0`,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid ${ACCENT}40`,
      fontFamily: FONT, overflowX: "auto",
    }}>
      <span style={{
        fontSize: isDesktop ? 12 : 11, color: `${BG}80`,
        letterSpacing: "0.12em", marginRight: "auto",
        fontWeight: 300, textTransform: "uppercase", flexShrink: 0,
      }}>
        Starbucks MOP
      </span>
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => scrollToSection(id)} style={{
            border:      isActive ? `1px solid ${BG}55` : "1px solid transparent",
            cursor:      "pointer",
            padding:     isDesktop ? "5px 16px" : "4px 10px",
            borderRadius: 9999,
            fontSize:    isDesktop ? 13 : 11,
            fontWeight:  isActive ? 600 : 400,
            fontFamily:  FONT,
            color:       isActive ? BG : `${BG}70`,
            background:  isActive ? `${BG}20` : "transparent",
            transition:  "all 0.2s ease",
            whiteSpace:  "nowrap",
            letterSpacing: "0.03em",
            flexShrink:  0,
          }}>
            {label}
          </button>
        );
      })}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
const INFO_CARDS = [
  { label: "類型",   value: "UX/UI Redesign" },
  { label: "工具",   value: "Figma"           },
  { label: "研究",   value: "App Store 評論分析"},
  { label: "發布",   value: "2024"             },
];

function SectionHero() {
  const isDesktop = useIsDesktop();
  return (
    <section style={{ background: GREEN, fontFamily: FONT }}>
      <div style={{ padding: isDesktop ? "80px 40px 0" : "48px 20px 0", maxWidth: 1080, margin: "0 auto" }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {["UX / UI", "Redesign", "Mobile App"].map(tag => (
            <span key={tag} style={{
              padding: "4px 14px", borderRadius: 9999,
              border: `1px solid ${BG}40`, color: `${BG}CC`,
              fontSize: 12, fontWeight: 500, letterSpacing: "0.06em",
            }}>{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: isDesktop ? "clamp(40px, 5.5vw, 72px)" : 36,
          fontWeight: 800, margin: "0 0 20px",
          letterSpacing: "-1.5px", lineHeight: 1.05, color: BG,
        }}>
          Starbucks<br />行動預點 MOP
        </h1>
        <p style={{
          fontSize: isDesktop ? 18 : 16, color: `${BG}BB`,
          lineHeight: 1.75, margin: "0 0 52px", maxWidth: 520,
        }}>
          彈性省時，預約星體驗——重新設計星巴克行動預點（Mobile Order &amp; Pay）的點餐流程。
        </p>

        {/* Info cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${isDesktop ? 4 : 2}, 1fr)`,
          gap: 1, background: `${BG}15`,
          border: `1px solid ${BG}15`, borderRadius: 12, overflow: "hidden",
        }}>
          {INFO_CARDS.map(({ label, value }) => (
            <div key={label} style={{ padding: "20px 24px", background: `${BG}08` }}>
              <div style={{ fontSize: 11, color: `${BG}60`, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 15, color: BG, fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div style={{ maxWidth: 1080, margin: "48px auto 0", padding: isDesktop ? "0 40px" : "0 20px" }}>
        <div style={{ borderRadius: "16px 16px 0 0", overflow: "hidden", background: `${BG}20`, minHeight: 240 }}>
          <img
            src="/images/sbux-hero.webp"
            alt="Starbucks MOP 行動預點 App"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}

// ── ABOUT（身為星巴克夥伴）──────────────────────────────────────────────────
function SectionAbout() {
  const isDesktop = useIsDesktop();
  const PAIN_POINTS = [
    { icon: "⏱", title: "省時目的失效", desc: "顧客到店後才點，行動預點的提前備製優勢完全消失。" },
    { icon: "📍", title: "取餐動線混亂", desc: "不熟悉取餐流程，導致在吧台久等或拿錯餐點。" },
    { icon: "🔄", title: "學習門檻過高", desc: "現有 App 流程不直覺，讓夥伴需要反覆向顧客解說。" },
  ];
  return (
    <section id="sbux-about" style={{ background: BG, padding: isDesktop ? "80px 40px" : "48px 20px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 16,
        }}>ABOUT</span>

        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: 64, alignItems: "start" }}>
          <div>
            <h2 style={{
              fontFamily: "Georgia, serif",
              fontSize: isDesktop ? 36 : 28,
              fontWeight: 700, color: GREEN,
              margin: "0 0 28px", lineHeight: 1.2, letterSpacing: "-0.5px",
            }}>
              身為星巴克夥伴，<br />我看見了問題所在。
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 17, color: GREEN, lineHeight: 1.9, margin: 0 }}>
              顧客常不知道如何使用行動預點，通常都是來到門市後請教夥伴現場下單。
              除了失去了省時預點的目的，也沒辦法在預點後即時拿到想要的餐點。
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PAIN_POINTS.map(({ icon, title, desc }) => (
              <div key={title} style={{
                padding: "20px 24px", background: `${GREEN}0D`,
                borderRadius: 14, border: `1px solid ${GREEN}18`,
              }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: GREEN, marginBottom: 6 }}>{title}</div>
                <div style={{ fontFamily: FONT, fontSize: 14, color: `${GREEN}CC`, lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── RESEARCH（App Store 評論分析）────────────────────────────────────────────
const PAIN_SUMMARY = [
  { no: "01", title: "特殊牛奶選項不明確",     desc: "植物奶加購入口隱藏，顧客難以辨識如何客製飲品。" },
  { no: "02", title: "無法設置常用門市",       desc: "每次預點都需重新搜尋門市，流程繁瑣且費時。" },
  { no: "03", title: "冷熱飲品分散不同頁",     desc: "同款飲品的冷熱版本各自獨立，容易找不到或點錯單。" },
  { no: "04", title: "卡片餘額不透明、儲值門檻高", desc: "下單時看不到餘額，且最低儲值 300 元，靈活性不足。" },
  { no: "05", title: "缺少訂單通知與進度追蹤", desc: "下單後無成功或失敗通知，也看不到訂單製作進度。" },
];

function SectionResearch() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-research" style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 16,
        }}>RESEARCH</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 12px", letterSpacing: "-0.5px" }}>研究洞察</h2>
        <p style={{ fontFamily: FONT, fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: "0 0 48px", maxWidth: 640 }}>
          從 App Store 5,007 則使用者評論入手，平均 2.1 顆星，聚焦出 5 項核心問題並逐一設計解決方案。
        </p>

        {/* Rating banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap",
          padding: "28px 36px", background: BG, borderRadius: 20,
          marginBottom: 40, border: `1px solid ${GREEN}15`,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: BRAND,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>☕</div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: GREEN, fontWeight: 700, marginBottom: 2 }}>Starbucks TW</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: `${GREEN}80` }}>Starbucks Coffee Company</div>
          </div>
          <div style={{ marginLeft: isDesktop ? "auto" : 0, textAlign: isDesktop ? "right" : "left" }}>
            <div style={{ fontFamily: FONT, fontSize: 52, fontWeight: 800, color: GREEN, lineHeight: 1 }}>2.1</div>
            <div style={{ fontFamily: FONT, fontSize: 12, color: `${GREEN}80`, marginTop: 4 }}>滿分 5 分 · 5,007 則評分</div>
          </div>
        </div>

        {/* App Store screenshot */}
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E8E5E0", marginBottom: 40 }}>
          <img
            src="/images/sbux-reviews.webp"
            alt="App Store 用戶評論截圖"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* 找出問題 / 並解決 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 2fr" : "1fr",
          gap: isDesktop ? 48 : 32,
          alignItems: "center",
          marginTop: 8,
        }}>
          {/* 左側：大字標題 */}
          <div>
            <div style={{
              fontFamily: "'Noto Sans TC', 'PingFang TC', sans-serif",
              fontSize: isDesktop ? 52 : 40,
              fontWeight: 700,
              color: BRAND,
              lineHeight: 1.15,
              marginBottom: isDesktop ? 20 : 16,
              letterSpacing: "-1px",
            }}>
              找出問題
            </div>
            <div style={{
              fontFamily: "'Noto Sans TC', 'PingFang TC', sans-serif",
              fontSize: isDesktop ? 68 : 52,
              fontWeight: 700,
              color: GREEN,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}>
              並解決
            </div>
          </div>

          {/* 右側：深綠圓角卡片 + 編號清單 */}
          <div style={{
            background: BRAND,
            borderRadius: 28,
            padding: isDesktop ? "44px 52px" : "32px 28px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* 裝飾性大數字 */}
            <div style={{
              position: "absolute", top: -20, right: 20,
              fontFamily: "Georgia, serif",
              fontSize: isDesktop ? 160 : 120,
              fontWeight: 800,
              color: "rgba(255,255,255,0.08)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}>5</div>

            <ol style={{ margin: 0, padding: "0 0 0 24px" }}>
              {PAIN_SUMMARY.map(({ no, title }) => (
                <li key={no} style={{
                  fontFamily: "'Noto Sans TC', 'PingFang TC', sans-serif",
                  fontSize: isDesktop ? 20 : 16,
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.9,
                  paddingLeft: 8,
                }}>
                  {title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── OPTIMIZATION（優化方案 01–05）───────────────────────────────────────────
const OPT_ITEMS = [
  {
    no: "01", title: "取餐門市頁面", sub: "設置常用門市",
    desc: "快速找到常用的取餐門市，對於新手用戶也能快速找到附近取餐門市，並決定哪種取餐方式較為方便。",
    after:  "/images/sbux-after-01.webp",
    singleImage: true,
  },
  {
    no: "02", title: "飲品冷熱同一品項", sub: "冷熱我都在",
    desc: "飲品冷熱不同地方，常造成顧客點錯，或是找不到適合溫度的飲品。",
    before: "/images/sbux-before-02.webp",
    after:  "/images/sbux-after-02.webp",
  },
  {
    no: "03", title: "植物奶快速選", sub: "特殊牛奶選項",
    desc: "無需另外點開跳轉頁面，同頁面選擇是否加購換特殊植物奶，減少操作步驟。",
    before: "/images/sbux-before-03.webp",
    after:  "/images/sbux-after-03.webp",
  },
  {
    no: "04", title: "快速儲值", sub: "小額也行",
    desc: "在下單前看到卡片餘額，避免下單後發現餘額不足需重新選購，且提供小額線上儲值。",
    after:  "/images/sbux-after-04.webp",
    singleImage: true,
  },
  {
    no: "05", title: "訂單完成", sub: "快與友人分享",
    desc: "訂單完成後跳出通知與詳細支付資訊，提供截圖、分享或致電門市三種方式。",
    after: "/images/sbux-feature-05.webp",
    singleImage: true,
  },
];

function OptCard({ item, isDesktop }) {
  return (
    <div style={{ paddingBottom: 56, borderBottom: `1px solid ${GREEN}15` }}>
      {/* Number + title */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
        <span style={{
          fontFamily: "Georgia, serif", fontSize: isDesktop ? 64 : 48,
          fontWeight: 800, color: `${GREEN}18`, lineHeight: 1, flexShrink: 0,
        }}>{item.no}</span>
        <div>
          <h3 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: GREEN, margin: "0 0 4px", letterSpacing: "-0.3px" }}>
            {item.title}
          </h3>
          <span style={{ fontFamily: FONT, fontSize: 14, color: BRAND, fontWeight: 500 }}>{item.sub}</span>
        </div>
      </div>

      <p style={{ fontFamily: FONT, fontSize: 16, color: `${GREEN}CC`, lineHeight: 1.8, margin: "0 0 28px", maxWidth: 600 }}>
        {item.desc}
      </p>

      {item.singleImage ? (
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${GREEN}20`, maxWidth: 360 }}>
          <img src={item.after} alt={item.title} style={{ width: "100%", display: "block" }} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: 16 }}>
          <div>
            <span style={{
              display: "inline-block", fontFamily: "Menlo, monospace",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
              color: "#999", background: "#F5F4F2",
              padding: "3px 10px", borderRadius: 4, marginBottom: 10,
            }}>BEFORE</span>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #E8E5E0" }}>
              <img src={item.before} alt={`${item.title} before`} style={{ width: "100%", display: "block" }} />
            </div>
          </div>
          <div>
            <span style={{
              display: "inline-block", fontFamily: "Menlo, monospace",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
              color: "#fff", background: BRAND,
              padding: "3px 10px", borderRadius: 4, marginBottom: 10,
            }}>AFTER</span>
            <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${BRAND}40` }}>
              <img src={item.after} alt={`${item.title} after`} style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionOptimization() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-opt" style={{ background: BG, padding: isDesktop ? "80px 40px" : "48px 20px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 16,
        }}>OPTIMIZATION</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: GREEN, margin: "0 0 12px", letterSpacing: "-0.5px" }}>優化方案</h2>
        <p style={{ fontFamily: FONT, fontSize: 16, color: `${GREEN}BB`, lineHeight: 1.8, margin: "0 0 56px", maxWidth: 640 }}>
          針對研究洞察提出五項核心體驗改善，以設計成果說明各項優化方案。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {OPT_ITEMS.map(item => (
            <OptCard key={item.no} item={item} isDesktop={isDesktop} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── DESIGN SYSTEM ────────────────────────────────────────────────────────────
const PALETTE = [
  { label: "STARBUCKS GREEN", hex: "#036242", textDark: false },
  { label: "ACCENT GREEN",    hex: "#02754B", textDark: false },
  { label: "LIGHT GREEN",     hex: "#D4E9E2", textDark: true  },
  { label: "HOUSE GREEN",     hex: "#1E3932", textDark: false },
  { label: "BLACK",           hex: "#000000", textDark: false },
  { label: "WARM NEUTRAL",    hex: "#F2F0EA", textDark: true  },
  { label: "COOL NEUTRAL",    hex: "#F9F9F9", textDark: true  },
  { label: "WHITE",           hex: "#FFFFFF", textDark: true  },
];

const TYPE_WEIGHTS = [
  { w: "300", label: "Light"    },
  { w: "400", label: "Regular"  },
  { w: "500", label: "Medium"   },
  { w: "600", label: "SemiBold" },
  { w: "700", label: "Bold"     },
];

function SectionDesign() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-design" style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 16,
        }}>DESIGN SYSTEM</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 48px", letterSpacing: "-0.5px" }}>設計系統</h2>

        {/* Color palette */}
        <h3 style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 20px" }}>色彩系統</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${isDesktop ? 4 : 2}, 1fr)`,
          gap: 12, marginBottom: 56,
        }}>
          {PALETTE.map(({ label, hex, textDark }) => (
            <div key={hex}>
              <div style={{
                height: 80, background: hex, borderRadius: 10,
                border: hex === "#FFFFFF" || hex === "#F9F9F9" || hex === "#F2F0EA" ? "1px solid #E8E5E0" : "none",
                marginBottom: 10,
                display: "flex", alignItems: "flex-end", padding: "10px 12px",
              }}>
                <span style={{
                  fontFamily: "Menlo, monospace", fontSize: 10,
                  color: textDark ? "#1E3932CC" : `${BG}CC`,
                }}>{hex}</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#333", letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Typography */}
        <h3 style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 20px" }}>字體系統</h3>
        <div style={{
          padding: "32px 36px", background: BG, borderRadius: 16,
          border: `1px solid ${GREEN}15`,
        }}>
          {TYPE_WEIGHTS.map(({ w, label }) => (
            <div key={w} style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: w === "700" ? 0 : 14 }}>
              <span style={{
                fontFamily: "'PingFang TC', 'Noto Sans TC', sans-serif",
                fontSize: 20, fontWeight: w, color: GREEN,
              }}>蘋方 PingFang SC</span>
              <span style={{ fontFamily: FONT, fontSize: 11, color: `${GREEN}70`, flexShrink: 0 }}>
                {label} · {w}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WORKFLOW（開發紀錄）──────────────────────────────────────────────────────

// ── OUTRO ────────────────────────────────────────────────────────────────────
function SectionOutro() {
  const isDesktop = useIsDesktop();
  return (
    <section style={{ background: GREEN, padding: isDesktop ? "100px 40px" : "64px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ fontSize: 40, marginBottom: 28 }}>☕</div>
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: isDesktop ? 32 : 24,
          fontWeight: 700, color: BG,
          margin: "0 0 16px", letterSpacing: "-0.5px",
        }}>Have a Nice Day.</h2>
        <p style={{ fontFamily: FONT, fontSize: 16, color: `${BG}CC`, lineHeight: 1.8, margin: "0 0 40px" }}>
          重新設計後的行動預點流程，讓每一杯咖啡的旅程從下單就開始享受。
        </p>
        <a
          href="https://www.behance.net/gallery/192918307/Starbucks-MOP"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 32px", borderRadius: 9999,
            background: BG, color: GREEN,
            fontFamily: FONT, fontSize: 15, fontWeight: 600,
            textDecoration: "none",
          }}
        >
          查看 Behance 完整作品 ↗
        </a>
      </div>
    </section>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function StarbucksMOPScrollStory() {
  const [active, setActive] = useState("sbux-about");

  // IntersectionObserver → active nav highlight
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { root: scrollEl, rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Glass button style
  const glassBase = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 20px", borderRadius: 9999,
    border: "1px solid rgba(255,255,255,0.55)",
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
    fontSize: 14, fontFamily: FONT, fontWeight: 500, color: "#111",
    cursor: "pointer", textDecoration: "none", letterSpacing: "0.01em",
    transition: "background 0.2s, box-shadow 0.2s",
    position: "fixed", zIndex: 9999,
  };

  return (
    <>
      <SectionHero />
      <SectionNav active={active} />
      <SectionAbout />
      <SectionResearch />
      <SectionOptimization />
      <SectionDesign />
      <SectionOutro />

      {createPortal(
        <button
          onClick={() => document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ ...glassBase, bottom: 72, right: 24 }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.55)"; }}
        >
          ↑ 回到頂部
        </button>,
        document.body
      )}
    </>
  );
}
