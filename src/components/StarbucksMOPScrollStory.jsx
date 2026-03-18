// ── Starbucks MOP（行動預點）ScrollStory ─────────────────────────────────────
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const FONT  = "Inter, 'Noto Sans TC', system-ui, sans-serif";
const TC    = "'Noto Sans TC', 'PingFang TC', sans-serif";
const BG    = "#D4E9E2";
const GREEN = "#1E3932";
const BRAND = "#036242";
const ACCENT = "#02754B";

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

// ── Sticky nav（設計系統排在優化方案前，與 Figma 一致）────────────────────────
const NAV_ITEMS = [
  { id: "sbux-about",    label: "開場"   },
  { id: "sbux-research", label: "研究洞察" },
  { id: "sbux-design",   label: "設計系統" },
  { id: "sbux-opt",      label: "優化方案" },
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
      }}>Starbucks MOP</span>
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => scrollToSection(id)} style={{
            border:       isActive ? `1px solid ${BG}55` : "1px solid transparent",
            cursor:       "pointer",
            padding:      isDesktop ? "5px 16px" : "4px 10px",
            borderRadius: 9999,
            fontSize:     isDesktop ? 13 : 11,
            fontWeight:   isActive ? 600 : 400,
            fontFamily:   FONT,
            color:        isActive ? BG : `${BG}70`,
            background:   isActive ? `${BG}20` : "transparent",
            transition:   "all 0.2s ease",
            whiteSpace:   "nowrap",
            letterSpacing: "0.03em",
            flexShrink:   0,
          }}>{label}</button>
        );
      })}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function CoffeeCupSVG({ size = 280 }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Arc for curved "MOBILE ORDER PAY" text */}
        <path id="textCurve" d="M 18,195 A 122,122 0 1,1 262,195" fill="none" />
      </defs>

      {/* Curved text label */}
      <text fontFamily="'Georgia', serif" fontSize="17" fontWeight="900" fill="#1E3932" letterSpacing="4">
        <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
          MOBILE ORDER · PAY
        </textPath>
      </text>

      {/* Left arm */}
      <path d="M 42,272 Q 62,242 88,230 Q 98,225 108,223"
        stroke="#E8A278" strokeWidth="40" fill="none" strokeLinecap="round" />
      {/* Right arm */}
      <path d="M 238,272 Q 218,242 192,230 Q 182,225 172,223"
        stroke="#E8A278" strokeWidth="40" fill="none" strokeLinecap="round" />

      {/* Cup shadow */}
      <ellipse cx="140" cy="256" rx="46" ry="7" fill="rgba(0,0,0,0.09)" />

      {/* Cup body */}
      <path d="M 88,112 L 192,112 L 177,248 L 103,248 Z"
        fill="white" stroke="#DDD9D0" strokeWidth="1.5" />

      {/* Cup sleeve */}
      <path d="M 91,158 L 189,158 L 182,208 L 98,208 Z" fill="#F0EAE0" />

      {/* Lid base */}
      <rect x="82" y="99" width="116" height="17" rx="5" fill="#EAE4DA" />
      {/* Lid dome arc */}
      <path d="M 108,99 Q 140,83 172,99" stroke="#D4CEBF" strokeWidth="1.5" fill="none" />

      {/* Straw */}
      <rect x="136" y="60" width="9" height="42" rx="4.5" fill="#C0B8AE" />

      {/* Starbucks logo circle on cup */}
      <circle cx="140" cy="182" r="27" fill="#036242" />
      <circle cx="140" cy="182" r="22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="140" y="191" textAnchor="middle" fontSize="24" fill="white" fontWeight="700" fontFamily="serif">★</text>
    </svg>
  );
}

function SectionHero() {
  const isDesktop = useIsDesktop();
  const cupSize   = isDesktop ? 280 : 210;
  return (
    <section style={{ background: BG, fontFamily: FONT, overflow: "hidden", flexShrink: 0 }}>
      {/* 首頁 breadcrumb */}
      <div style={{
        padding: isDesktop ? "14px 56px" : "12px 24px",
        fontSize: 13, color: `${GREEN}70`, fontFamily: FONT,
        letterSpacing: "0.02em",
      }}>首頁</div>

      {/* Giant STARBUCKS heading */}
      <div style={{ textAlign: "center", padding: "4px 16px 0", overflow: "hidden" }}>
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: isDesktop ? "clamp(80px, 14vw, 192px)" : "clamp(52px, 18vw, 108px)",
          fontWeight: 900, margin: 0,
          letterSpacing: isDesktop ? "-5px" : "-3px",
          lineHeight: 0.92, color: GREEN,
        }}>STARBUCKS</h1>
      </div>

      {/* Two-column: left (cup) + right (phone) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
        gap: isDesktop ? 48 : 0,
        maxWidth: 1080, margin: "0 auto",
        padding: isDesktop ? "28px 56px 80px" : "20px 24px 56px",
        alignItems: "center",
      }}>
        {/* 左欄：行動預點 + SVG 咖啡杯 */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: isDesktop ? "flex-start" : "center",
        }}>
          <div style={{
            fontFamily: TC,
            fontSize: isDesktop ? 30 : 22,
            fontWeight: 700, color: GREEN,
            marginBottom: isDesktop ? 28 : 20,
            letterSpacing: "-0.5px",
          }}>行動預點</div>
          <CoffeeCupSVG size={cupSize} />
        </div>

        {/* 右欄：彈性省時 + 手機 */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: isDesktop ? "flex-end" : "center",
          paddingTop: isDesktop ? 0 : 32,
        }}>
          <div style={{
            fontFamily: TC,
            fontSize: isDesktop ? 24 : 18,
            fontWeight: 600, color: GREEN,
            marginBottom: isDesktop ? 28 : 20,
            textAlign: isDesktop ? "right" : "center",
            lineHeight: 1.55, letterSpacing: "-0.3px",
          }}>彈性省時，預約星體驗</div>
          <img
            src="/images/banner.png"
            alt="Starbucks MOP App 裝置展示"
            style={{
              width: isDesktop ? "75%" : "60%",
              maxWidth: 300, display: "block",
              filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.18))",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function SectionAbout() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-about" style={{ background: BG, padding: isDesktop ? "80px 40px" : "56px 20px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
      {/* Ghost 大字 */}
      <div style={{
        position: "absolute", top: -10, left: -8,
        fontFamily: "Georgia, serif",
        fontSize: isDesktop ? 160 : 100,
        fontWeight: 800, color: `${BRAND}18`,
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-4px",
      }}>ABOUT</div>

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 40,
        }}>ABOUT</span>

        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: isDesktop ? 72 : 40,
          alignItems: "center",
        }}>
          {/* 左欄：手機截圖 */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* 圖片佔位（圖片補上後換成 <img src="/images/about-phone.png" ...> ） */}
            <div style={{
              width: isDesktop ? 300 : 220, height: isDesktop ? 560 : 420,
              borderRadius: 32, background: `${GREEN}15`,
              border: `1px dashed ${GREEN}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.15))",
            }}>
              <img
                src="/images/banner.png"
                alt="Starbucks MOP App 介面截圖"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", borderRadius: 32, display: "block",
                }}
              />
            </div>
          </div>

          {/* 右欄：文字 + Pill 按鈕 */}
          <div>
            <p style={{
              fontFamily: TC,
              fontSize: isDesktop ? 22 : 18,
              color: GREEN, lineHeight: 2, margin: "0 0 40px",
              fontWeight: 500,
            }}>
              身為星巴克夥伴，<br />
              顧客常不知道如何使用行動預點，<br />
              通常都是來到門市後請教夥伴現場下單。<br />
              除了失去了省時預點的目的，<br />
              也沒辦法在預點後即時拿到想要的餐點。
            </p>

            {/* Pill 按鈕 */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["UX / UI", "redesign"].map(tag => (
                <span key={tag} style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "10px 28px", borderRadius: 9999,
                  background: ACCENT,
                  border: "5px solid #fff",
                  color: "#fff",
                  fontFamily: "Georgia, serif",
                  fontSize: isDesktop ? 20 : 17,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  boxShadow: `0 4px 16px ${ACCENT}40`,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── RESEARCH ──────────────────────────────────────────────────────────────────
const PAIN_SUMMARY = [
  { no: "01", title: "特殊牛奶選項不明確",                              desc: "植物奶加購入口隱藏，顧客難以辨識如何客製飲品。" },
  { no: "02", title: "設置儲存常用門市選項",                            desc: "每次預點都需重新搜尋門市，流程繁瑣且費時。" },
  { no: "03", title: "建議飲料冷熱同品項",                              desc: "同款飲品的冷熱版本各自獨立，容易找不到或點錯單。" },
  { no: "04", title: "可以在下單前看到卡片餘額，小額線上儲值",          desc: "下單時看不到餘額，且最低儲值 300 元，靈活性不足。" },
  { no: "05", title: "下單成功與失敗都可以通知顧客，並預覽訂單進度",    desc: "下單後無成功或失敗通知，也看不到訂單製作進度。" },
];

function SectionResearch() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-research" style={{ background: BG, padding: isDesktop ? "80px 40px" : "56px 20px", position: "relative", overflow: "hidden" }}>
      {/* Ghost 大字 */}
      <div style={{
        position: "absolute", top: -10, left: -8,
        fontFamily: "Georgia, serif",
        fontSize: isDesktop ? 150 : 90,
        fontWeight: 800, color: `${BRAND}12`,
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-4px",
      }}>RESEARCH</div>

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 16,
        }}>RESEARCH</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: GREEN, margin: "0 0 12px", letterSpacing: "-0.5px" }}>研究洞察</h2>
        <p style={{ fontFamily: FONT, fontSize: 16, color: `${GREEN}BB`, lineHeight: 1.8, margin: "0 0 48px", maxWidth: 640 }}>
          從 App Store 5,007 則使用者評論入手，平均 2.1 顆星，聚焦出 5 項核心問題並逐一設計解決方案。
        </p>

        {/* Rating banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap",
          padding: "28px 36px", background: "#fff",
          borderRadius: 20, marginBottom: 32,
          border: `1px solid ${GREEN}15`,
          boxShadow: `0 2px 20px ${GREEN}08`,
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
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${GREEN}20`, marginBottom: 56, boxShadow: `0 4px 24px ${GREEN}10` }}>
          <img src="/images/sbux-reviews.webp" alt="App Store 用戶評論截圖" style={{ width: "100%", display: "block" }} />
        </div>

        {/* 找出問題 / 並解決 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 2fr" : "1fr",
          gap: isDesktop ? 48 : 32,
          alignItems: "center",
        }}>
          {/* 左側大字 + 垂直線 */}
          <div style={{
            paddingLeft: isDesktop ? 28 : 20,
            borderLeft: `4px solid ${BRAND}`,
          }}>
            <div style={{
              fontFamily: TC,
              fontSize: isDesktop ? 48 : 36,
              fontWeight: 700, color: BRAND,
              lineHeight: 1.2, marginBottom: isDesktop ? 12 : 8,
              letterSpacing: "-1px",
            }}>找出問題</div>
            <div style={{
              fontFamily: TC,
              fontSize: isDesktop ? 64 : 52,
              fontWeight: 700, color: GREEN,
              lineHeight: 1.05, letterSpacing: "-1.5px",
            }}>並解決</div>
          </div>

          {/* 右側深綠卡片 + 旋轉手機圖 */}
          <div style={{
            background: BRAND, borderRadius: 28,
            padding: isDesktop ? "44px 52px 44px 48px" : "32px 28px",
            position: "relative",
          }}>
            {/* 右上角旋轉手機截圖（圖片補上後換成真實路徑） */}
            {isDesktop && (
              <div style={{
                position: "absolute", top: -24, right: -20,
                width: 200, transform: "rotate(15deg)",
                transformOrigin: "bottom right",
                zIndex: 1,
              }}>
                <img
                  src="/images/sbux-after-01.webp"
                  alt=""
                  style={{
                    width: "100%", display: "block",
                    borderRadius: 20,
                    boxShadow: "0 24px 56px rgba(0,0,0,0.35)",
                  }}
                />
              </div>
            )}

            <ol style={{ margin: 0, padding: `0 0 0 24px`, paddingRight: isDesktop ? 220 : 0 }}>
              {PAIN_SUMMARY.map(({ no, title }) => (
                <li key={no} style={{
                  fontFamily: TC,
                  fontSize: isDesktop ? 19 : 16,
                  fontWeight: 600, color: "#fff",
                  lineHeight: 2.0, paddingLeft: 8,
                }}>{title}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── DESIGN SYSTEM（Figma 中排在優化方案前）────────────────────────────────────
const TYPE_WEIGHTS = [
  { w: "600", label: "SemiBold"   },
  { w: "500", label: "Medium"     },
  { w: "400", label: "Regular"    },
  { w: "300", label: "Light"      },
  { w: "200", label: "Thin"       },
  { w: "100", label: "UltraLight" },
];

function SectionDesign() {
  const isDesktop = useIsDesktop();

  // ── 線條 icon 路徑（Heroicons 風格）──────────────────────────────────────
  const ICONS = [
    { name: "cart",     d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" },
    { name: "clock",    d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "card",     d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    { name: "history",  d: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" },
    { name: "search",   d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { name: "pin",      d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" },
    { name: "pencil",   d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" },
    { name: "info",     d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" },
    { name: "plus",     d: "M12 4.5v15m7.5-7.5h-15" },
    { name: "barcode",  d: "M4 6h2v12H4zm3 0h1v12H7zm3 0h2v12h-2zm3 0h1v12h-1zm3 0h2v12h-2zm3 0h1v12h-1z" },
    { name: "check",    d: "M4.5 12.75l6 6 9-13.5" },
    { name: "exchange", d: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
    { name: "close",    d: "M6 18L18 6M6 6l12 12" },
    { name: "share",    d: "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" },
    { name: "trash",    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" },
    { name: "phone",    d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
    { name: "chevron↓", d: "M19 9l-7 7-7-7" },
    { name: "chevron↑", d: "M5 15l7-7 7 7" },
    { name: "list",     d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" },
    { name: "doc",      d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  ];

  // 中性色 row
  const COLOUR_ROW3 = [
    { hex: "#000000", label: "BLACK",        tc: BG    },
    { hex: "#F2F0EA", label: "WARM NEUTRAL", tc: GREEN },
    { hex: "#F9F9F9", label: "COOL NEUTRAL", tc: GREEN },
    { hex: "#FFFFFF", label: "WHITE",        tc: GREEN },
  ];

  return (
    <section id="sbux-design" style={{ background: BG, padding: isDesktop ? "80px 40px" : "56px 20px", position: "relative", overflow: "hidden" }}>
      {/* Ghost 大字 */}
      <div style={{
        position: "absolute", top: -10, left: -8,
        fontFamily: "Georgia, serif",
        fontSize: isDesktop ? 120 : 72,
        fontWeight: 800, color: `${BRAND}12`,
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-3px", whiteSpace: "nowrap",
      }}>Design System</div>

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 16,
        }}>DESIGN SYSTEM</span>
        <h2 style={{
          fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700,
          color: GREEN, margin: "0 0 56px", letterSpacing: "-0.5px",
        }}>設計系統</h2>

        {/* ── Part 1：字體（左欄）＋ 色彩格（右欄）── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: isDesktop ? 48 : 40,
          marginBottom: isDesktop ? 72 : 48,
          alignItems: "start",
        }}>
          {/* 左欄：字體系統 */}
          <div>
            <h3 style={{
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              color: `${GREEN}70`, letterSpacing: "0.14em", textTransform: "uppercase",
              margin: "0 0 20px",
            }}>TYPOGRAPHY</h3>
            <div style={{
              padding: "24px 28px", background: "#fff", borderRadius: 20,
              border: `1px solid ${GREEN}12`,
              boxShadow: "0 2px 24px rgba(30,57,50,0.06)",
            }}>
              {TYPE_WEIGHTS.map(({ w, label }, i) => (
                <div key={w} style={{
                  display: "flex", alignItems: "baseline",
                  justifyContent: "space-between",
                  padding: "9px 0",
                  borderBottom: i < TYPE_WEIGHTS.length - 1 ? `1px solid ${GREEN}08` : "none",
                }}>
                  <span style={{
                    fontFamily: "'PingFang SC', 'PingFang TC', 'Noto Sans TC', sans-serif",
                    fontSize: isDesktop ? 20 : 17, fontWeight: w, color: GREEN,
                  }}>蘋方 PingFang SC</span>
                  <span style={{
                    fontFamily: "Menlo, monospace", fontSize: 10,
                    color: `${GREEN}50`, flexShrink: 0, marginLeft: 12,
                  }}>{label} · {w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 右欄：不對稱色彩格 */}
          <div>
            <h3 style={{
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              color: `${GREEN}70`, letterSpacing: "0.14em", textTransform: "uppercase",
              margin: "0 0 20px",
            }}>COLOUR</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {/* Row 1：Starbucks Green（寬 2/3）＋ Accent Green（窄 1/3）並排 */}
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{
                  flex: 2, height: 112, borderRadius: 14, background: BRAND,
                  display: "flex", flexDirection: "column",
                  justifyContent: "flex-end", padding: "10px 16px",
                }}>
                  <span style={{
                    fontFamily: "Menlo, monospace", fontSize: 9,
                    color: `${BG}BB`, letterSpacing: "0.1em",
                  }}>{BRAND}</span>
                  <span style={{
                    fontFamily: FONT, fontSize: 11, fontWeight: 600,
                    color: BG, letterSpacing: "0.06em", marginTop: 2,
                  }}>STARBUCKS GREEN</span>
                </div>
                <div style={{
                  flex: 1, height: 112, borderRadius: 14, background: ACCENT,
                  display: "flex", flexDirection: "column",
                  justifyContent: "flex-end", padding: "10px 12px",
                }}>
                  <span style={{
                    fontFamily: "Menlo, monospace", fontSize: 9,
                    color: `${BG}BB`, letterSpacing: "0.1em",
                  }}>{ACCENT}</span>
                  <span style={{
                    fontFamily: FONT, fontSize: 10, fontWeight: 600,
                    color: BG, marginTop: 2,
                  }}>ACCENT GREEN</span>
                </div>
              </div>
              {/* Row 2：Light Green ＋ House Green */}
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { hex: "#D4E9E2", label: "LIGHT GREEN",  tc: GREEN, bordered: true  },
                  { hex: "#1E3932", label: "HOUSE GREEN",  tc: BG,    bordered: false },
                ].map(({ hex, label, tc, bordered }) => (
                  <div key={hex} style={{
                    flex: 1, height: 72, borderRadius: 12, background: hex,
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", padding: "8px 12px",
                    border: bordered ? `1px solid ${GREEN}22` : "none",
                  }}>
                    <span style={{
                      fontFamily: "Menlo, monospace", fontSize: 9,
                      color: `${tc}90`, letterSpacing: "0.1em",
                    }}>{hex}</span>
                    <span style={{
                      fontFamily: FONT, fontSize: 10, fontWeight: 600,
                      color: tc, marginTop: 2,
                    }}>{label}</span>
                  </div>
                ))}
              </div>
              {/* Row 3：四個中性色 */}
              <div style={{ display: "flex", gap: 6 }}>
                {COLOUR_ROW3.map(({ hex, label, tc }) => (
                  <div key={hex} style={{
                    flex: 1, height: 58, borderRadius: 10, background: hex,
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", padding: "6px 8px",
                    border: hex !== "#000000" ? `1px solid ${GREEN}18` : "none",
                  }}>
                    <span style={{
                      fontFamily: FONT, fontSize: 8, fontWeight: 600,
                      color: tc, letterSpacing: "0.04em", lineHeight: 1.3,
                    }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Part 2：Icons（左欄）＋ Assets（右欄）── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: isDesktop ? 48 : 40,
          alignItems: "start",
        }}>
          {/* 左欄：圖示集 */}
          <div>
            <h3 style={{
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              color: `${GREEN}70`, letterSpacing: "0.14em", textTransform: "uppercase",
              margin: "0 0 20px",
            }}>ICONS</h3>
            <div style={{
              padding: 24, background: "#fff", borderRadius: 20,
              border: `1px solid ${GREEN}12`,
              boxShadow: "0 2px 24px rgba(30,57,50,0.06)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
                {ICONS.map(({ name, d }) => (
                  <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      border: `1px solid ${GREEN}12`,
                      background: "rgba(30,57,50,0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke={GREEN} strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d={d} />
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: "Menlo, monospace", fontSize: 7,
                      color: `${GREEN}55`, textAlign: "center", lineHeight: 1.2,
                    }}>{name}</span>
                  </div>
                ))}
                {/* 兩個品牌圓形 icon */}
                {[
                  { bg: GREEN,  label: "house" },
                  { bg: BRAND,  label: "brand" },
                ].map(({ bg, label }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%", background: bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ color: BG, fontSize: 14, fontFamily: "serif" }}>★</span>
                    </div>
                    <span style={{
                      fontFamily: "Menlo, monospace", fontSize: 7,
                      color: `${GREEN}55`, textAlign: "center",
                    }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右欄：UI 元件展示 */}
          <div>
            <h3 style={{
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              color: `${GREEN}70`, letterSpacing: "0.14em", textTransform: "uppercase",
              margin: "0 0 20px",
            }}>ASSETS</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* 訂單資訊條 */}
              <div style={{
                background: "#fff", borderRadius: 16, padding: "14px 16px",
                border: `1px solid ${GREEN}12`,
                boxShadow: "0 2px 16px rgba(30,57,50,0.06)",
              }}>
                <div style={{
                  fontFamily: "Menlo, monospace", fontSize: 8, color: `${GREEN}50`,
                  marginBottom: 8, letterSpacing: "0.1em",
                }}>ORDER INFO</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: `${BRAND}18`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                    }}>☕</div>
                    <div>
                      <div style={{ fontFamily: TC, fontSize: 13, fontWeight: 600, color: GREEN }}>拿鐵咖啡</div>
                      <div style={{ fontFamily: FONT, fontSize: 11, color: `${GREEN}70` }}>中杯 · 熱</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: GREEN }}>NT$155</div>
                    <div style={{ fontFamily: FONT, fontSize: 10, color: `${GREEN}60` }}>預計 15 分</div>
                  </div>
                </div>
              </div>

              {/* 尺寸選擇 */}
              <div style={{
                background: "#fff", borderRadius: 16, padding: "14px 16px",
                border: `1px solid ${GREEN}12`,
                boxShadow: "0 2px 16px rgba(30,57,50,0.06)",
              }}>
                <div style={{
                  fontFamily: "Menlo, monospace", fontSize: 8, color: `${GREEN}50`,
                  marginBottom: 10, letterSpacing: "0.1em",
                }}>SIZE SELECTOR</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { label: "S", sub: "Tall",    active: false },
                    { label: "M", sub: "Grande",  active: true  },
                    { label: "L", sub: "Venti",   active: false },
                    { label: "V", sub: "Trenta",  active: false },
                  ].map(({ label, sub, active }) => (
                    <div key={label} style={{
                      flex: 1, textAlign: "center",
                      padding: "8px 4px", borderRadius: 10,
                      background: active ? BRAND : `${GREEN}06`,
                      border: active ? `2px solid ${BRAND}` : `1px solid ${GREEN}12`,
                    }}>
                      <div style={{
                        fontFamily: FONT, fontSize: 13, fontWeight: 700,
                        color: active ? "#fff" : GREEN,
                      }}>{label}</div>
                      <div style={{
                        fontFamily: FONT, fontSize: 9,
                        color: active ? `${BG}CC` : `${GREEN}60`,
                      }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 取餐方式 Tabs */}
              <div style={{
                background: "#fff", borderRadius: 16, padding: "14px 16px",
                border: `1px solid ${GREEN}12`,
                boxShadow: "0 2px 16px rgba(30,57,50,0.06)",
              }}>
                <div style={{
                  fontFamily: "Menlo, monospace", fontSize: 8, color: `${GREEN}50`,
                  marginBottom: 10, letterSpacing: "0.1em",
                }}>DELIVERY TABS</div>
                <div style={{
                  display: "flex", gap: 4,
                  background: `${GREEN}08`, borderRadius: 10, padding: 4,
                }}>
                  {[{ tab: "外帶", active: true }, { tab: "內用", active: false }].map(({ tab, active }) => (
                    <div key={tab} style={{
                      flex: 1, textAlign: "center", padding: "7px 0", borderRadius: 7,
                      background: active ? "#fff" : "transparent",
                      boxShadow: active ? `0 1px 6px ${GREEN}12` : "none",
                    }}>
                      <span style={{
                        fontFamily: TC, fontSize: 13,
                        fontWeight: active ? 600 : 400,
                        color: active ? GREEN : `${GREEN}70`,
                      }}>{tab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 冷熱切換 */}
              <div style={{
                background: "#fff", borderRadius: 16, padding: "14px 16px",
                border: `1px solid ${GREEN}12`,
                boxShadow: "0 2px 16px rgba(30,57,50,0.06)",
              }}>
                <div style={{
                  fontFamily: "Menlo, monospace", fontSize: 8, color: `${GREEN}50`,
                  marginBottom: 10, letterSpacing: "0.1em",
                }}>HOT / ICED TOGGLE</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { label: "🔥 熱飲", active: true  },
                    { label: "🧊 冷飲", active: false },
                  ].map(({ label, active }) => (
                    <div key={label} style={{
                      flex: 1, textAlign: "center", padding: "9px 0", borderRadius: 10,
                      background: active ? `${BRAND}15` : `${GREEN}05`,
                      border: active ? `1.5px solid ${BRAND}` : `1px solid ${GREEN}15`,
                    }}>
                      <span style={{
                        fontFamily: TC, fontSize: 13,
                        fontWeight: active ? 600 : 400,
                        color: active ? BRAND : `${GREEN}80`,
                      }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 加入購物車按鈕 */}
              <div style={{
                background: "#fff", borderRadius: 16, padding: "14px 16px",
                border: `1px solid ${GREEN}12`,
                boxShadow: "0 2px 16px rgba(30,57,50,0.06)",
              }}>
                <div style={{
                  fontFamily: "Menlo, monospace", fontSize: 8, color: `${GREEN}50`,
                  marginBottom: 10, letterSpacing: "0.1em",
                }}>ADD TO CART</div>
                <div style={{
                  background: BRAND, borderRadius: 10, padding: "11px 0",
                  textAlign: "center",
                  boxShadow: `0 4px 16px ${BRAND}40`,
                }}>
                  <span style={{
                    fontFamily: TC, fontSize: 14, fontWeight: 700,
                    color: "#fff", letterSpacing: "0.04em",
                  }}>加入購物車　NT$155</span>
                </div>
              </div>

              {/* 牛奶選擇 Dropdown */}
              <div style={{
                background: "#fff", borderRadius: 16, padding: "14px 16px",
                border: `1px solid ${GREEN}12`,
                boxShadow: "0 2px 16px rgba(30,57,50,0.06)",
              }}>
                <div style={{
                  fontFamily: "Menlo, monospace", fontSize: 8, color: `${GREEN}50`,
                  marginBottom: 10, letterSpacing: "0.1em",
                }}>MILK SELECTOR</div>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "9px 12px", background: `${GREEN}06`, borderRadius: 10,
                  border: `1px solid ${GREEN}12`,
                }}>
                  <span style={{ fontFamily: TC, fontSize: 13, color: GREEN }}>一般牛奶</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div style={{
                  marginTop: 4, background: "#fff", borderRadius: 10,
                  border: `1px solid ${GREEN}12`, overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(30,57,50,0.1)",
                }}>
                  {[
                    { milk: "一般牛奶",      active: true  },
                    { milk: "燕麥奶 +NT$30", active: false },
                    { milk: "杏仁奶 +NT$30", active: false },
                    { milk: "豆漿 +NT$30",   active: false },
                  ].map(({ milk, active }, i) => (
                    <div key={milk} style={{
                      padding: "8px 12px",
                      borderBottom: i < 3 ? `1px solid ${GREEN}08` : "none",
                      background: active ? `${BRAND}10` : "transparent",
                    }}>
                      <span style={{
                        fontFamily: TC, fontSize: 12,
                        color: active ? BRAND : `${GREEN}CC`,
                        fontWeight: active ? 600 : 400,
                      }}>{milk}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── OPTIMIZATION ──────────────────────────────────────────────────────────────
const OPT_ITEMS = [
  {
    no: "01", title: "取餐門市頁面", sub: "設置常用門市",
    desc: "快速找到常用的取餐門市，對於新手用戶也能快速找到附近取餐門市，並決定哪種取餐方式較為方便。",
    after: "/images/sbux-after-01.webp",
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
    after: "/images/sbux-after-04.webp",
    singleImage: true,
  },
  {
    no: "05", title: "訂單完成", sub: "快與友人分享",
    desc: "訂單完成後跳出通知與詳細支付資訊，提供截圖、分享或致電門市三種方式。",
    after: "/images/sbux-feature-05.webp",
    singleImage: true,
  },
];

// 奇偶欄位交替：偶數 index 圖在右，奇數 index 圖在左
function OptCard({ item, isDesktop, index }) {
  const imgRight = index % 2 === 0;

  const TextBlock = (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{
        fontFamily: TC,
        fontSize: isDesktop ? 52 : 36,
        fontWeight: 700, color: BRAND,
        lineHeight: 1.1, marginBottom: 8,
        letterSpacing: "-1px",
      }}>{item.title}</div>
      <div style={{
        fontFamily: TC,
        fontSize: isDesktop ? 36 : 24,
        fontWeight: 400, color: `${GREEN}BB`,
        lineHeight: 1.2, marginBottom: 24,
      }}>{item.sub}</div>
      <p style={{
        fontFamily: FONT, fontSize: isDesktop ? 17 : 15,
        color: `${GREEN}CC`, lineHeight: 1.85,
        margin: 0, maxWidth: 480,
      }}>{item.desc}</p>
    </div>
  );

  const ImgBlock = (
    <div>
      {item.singleImage ? (
        <div style={{
          borderRadius: 20, overflow: "hidden",
          border: `1px solid ${GREEN}20`,
          boxShadow: `0 8px 40px ${GREEN}14`,
          maxWidth: 320, margin: "0 auto",
        }}>
          <img src={item.after} alt={item.title} style={{ width: "100%", display: "block" }} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <span style={{
              display: "inline-block",
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", color: "#999", background: `${GREEN}10`,
              padding: "3px 10px", borderRadius: 4, marginBottom: 10,
            }}>BEFORE</span>
            <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${GREEN}20` }}>
              <img src={item.before} alt={`${item.title} before`} style={{ width: "100%", display: "block" }} />
            </div>
          </div>
          <div>
            <span style={{
              display: "inline-block",
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", color: "#fff", background: BRAND,
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

  return (
    <div style={{
      position: "relative",
      padding: isDesktop ? "80px 40px" : "56px 20px",
      borderTop: `1px solid ${GREEN}15`,
      overflow: "hidden",
    }}>
      {/* Ghost 水印數字 */}
      <div style={{
        position: "absolute",
        top: isDesktop ? -30 : -20,
        left: isDesktop ? -16 : -8,
        fontFamily: "Georgia, serif",
        fontSize: isDesktop ? 300 : 180,
        fontWeight: 800,
        color: `${GREEN}08`,
        lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
        letterSpacing: "-8px",
      }}>{item.no}</div>

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        {isDesktop ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}>
            {imgRight ? <>{TextBlock}{ImgBlock}</> : <>{ImgBlock}{TextBlock}</>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {TextBlock}
            {ImgBlock}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionOptimization() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-opt" style={{ background: BG }}>
      <div style={{ padding: isDesktop ? "80px 40px 40px" : "56px 20px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <span style={{
            fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
            letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
            display: "block", marginBottom: 16,
          }}>OPTIMIZATION</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: GREEN, margin: "0 0 12px", letterSpacing: "-0.5px" }}>優化方案</h2>
          <p style={{ fontFamily: FONT, fontSize: 16, color: `${GREEN}BB`, lineHeight: 1.8, margin: 0, maxWidth: 640 }}>
            針對研究洞察提出五項核心體驗改善，以設計成果說明各項優化方案。
          </p>
        </div>
      </div>

      {OPT_ITEMS.map((item, i) => (
        <OptCard key={item.no} item={item} isDesktop={isDesktop} index={i} />
      ))}
    </section>
  );
}

// ── OUTRO ─────────────────────────────────────────────────────────────────────
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
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 32px", borderRadius: 9999,
            background: BG, color: GREEN,
            fontFamily: FONT, fontSize: 15, fontWeight: 600,
            textDecoration: "none",
          }}
        >查看 Behance 完整作品 ↗</a>
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function StarbucksMOPScrollStory() {
  const [active, setActive] = useState("sbux-about");

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

  const glassBase = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 20px", borderRadius: 9999,
    border: "1px solid rgba(255,255,255,0.55)",
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
    fontSize: 14, fontFamily: FONT, fontWeight: 500, color: "#111",
    cursor: "pointer", letterSpacing: "0.01em",
    transition: "background 0.2s, box-shadow 0.2s",
    position: "fixed", zIndex: 9999,
  };

  return (
    <>
      <SectionHero />
      <SectionNav active={active} />
      <SectionAbout />
      <SectionResearch />
      <SectionDesign />
      <SectionOptimization />
      <SectionOutro />

      {createPortal(
        <button
          onClick={() => document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ ...glassBase, bottom: 72, right: 24 }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.55)"; }}
        >↑ 回到頂部</button>,
        document.body
      )}
    </>
  );
}
