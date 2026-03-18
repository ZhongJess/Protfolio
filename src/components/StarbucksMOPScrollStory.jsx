// ── Starbucks MOP（行動預點）ScrollStory ─────────────────────────────────────
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const FONT  = "Inter, 'Noto Sans TC', system-ui, sans-serif";
const TC    = "'Noto Sans TC', 'PingFang TC', sans-serif";
const BG    = "#F5F4F2";
const GREEN = "#111111";
const BRAND = "#306242";
const ACCENT = "#306242";

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

// ── Hero 資料 ──────────────────────────────────────────────────────────────────
const SBUX_HERO_TAGS  = ["UX / UI", "Redesign", "2024"];
const SBUX_INFO_CARDS = [
  { label: "成果", value: "5 項核心體驗改善" },
  { label: "時程", value: "8 週"             },
  { label: "角色", value: "UX / UI Designer"  },
  { label: "工具", value: "Figma"             },
];

function SbuxInfoCard({ label, value }) {
  return (
    <div style={{
      flex: 1, minWidth: 130,
      padding: "16px 24px",
      borderRadius: 8,
      background: `${GREEN}0D`,
      fontFamily: FONT,
    }}>
      <div style={{
        fontSize: 12, color: `${GREEN}70`,
        fontWeight: 400, letterSpacing: "0.08em",
        textTransform: "uppercase", marginBottom: 12,
      }}>{label}</div>
      <div style={{
        fontSize: 16, fontWeight: 700,
        color: GREEN, lineHeight: "28px",
      }}>{value}</div>
    </div>
  );
}

function SectionHero() {
  const isDesktop = useIsDesktop();
  const navigate  = useNavigate();
  return (
    <section id="sbux-hero" style={{ background: BG, fontFamily: FONT, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", padding: isDesktop ? "0 40px" : "0 20px" }}>

        {/* ← Projects */}
        <div style={{ padding: "24px 0 0" }}>
          <button
            onClick={() => navigate("/projects")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, color: `${GREEN}70`,
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "Menlo, monospace", letterSpacing: "0.08em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = BRAND; }}
            onMouseLeave={e => { e.currentTarget.style.color = `${GREEN}70`; }}
          >
            ← Projects
          </button>
        </div>

        {/* 主標題區塊 */}
        <div style={{ paddingTop: 32 }}>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            {SBUX_HERO_TAGS.map(tag => (
              <span key={tag} style={{
                background: "transparent",
                border: `1px solid ${BRAND}60`,
                borderRadius: 9999,
                padding: "4px 12px",
                fontSize: 14, color: BRAND,
                letterSpacing: "0.057em",
                fontFamily: "Menlo, monospace",
              }}>{tag}</span>
            ))}
          </div>

          {/* 主標題 */}
          <h1 style={{
            fontSize: "clamp(36px, 4.5vw, 60px)",
            fontWeight: 700, color: GREEN,
            lineHeight: 1.1, letterSpacing: "-0.03em",
            margin: "0 0 16px",
            fontFamily: "Georgia, serif",
          }}>從夥伴洞察出發，重塑星巴克行動預點</h1>

          {/* 副標題 */}
          <p style={{
            margin: "0 0 32px",
            fontSize: 16, color: `${GREEN}BB`,
            lineHeight: 1.86, maxWidth: 620,
            fontFamily: FONT, fontWeight: 300,
          }}>
            2.1 顆星的負面評價中挖掘產品契機，我將門市夥伴的服務經驗數位化。針對行動預點最迫切的 5 項核心問題提供設計對策，讓「預約」真正實現省時與貼心的品牌初衷。
          </p>

          {/* Info Cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 40 }}>
            {SBUX_INFO_CARDS.map(card => (
              <SbuxInfoCard key={card.label} {...card} />
            ))}
          </div>
        </div>

        {/* Banner 圖 */}
        <div style={{
          borderRadius: 17, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          width: "100%",
        }}>
          <img
            src="/images/sbux/sbux-hero.webp"
            alt="Starbucks MOP 行動預點重設計"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div style={{ height: isDesktop ? 80 : 48 }} />
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
          {/* 左欄：App Demo 影片 */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: isDesktop ? 300 : 220, height: isDesktop ? 560 : 420,
              borderRadius: 32, overflow: "hidden",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.15))",
            }}>
              <video
                src="/videos/sbux/stbx-demo.mov"
                autoPlay loop muted playsInline
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
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
              身為星巴克夥伴，我觀察到許多顧客因不熟悉「行動預點 (MOP)」的操作流程，最終仍選擇到店後請教夥伴並現場下單。這不僅讓數位預點失去了「省時」的初衷，也導致顧客無法在抵達時即刻領取餐點，造成服務流程的斷層。
            </p>

            {/* Pill 按鈕 */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["UX / UI", "Redesign"].map(tag => (
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
    <section id="sbux-research" style={{ background: BG, padding: isDesktop ? "80px 40px" : "56px 20px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
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
          從 App Store 5,007 則使用者評論入手，平均 2.1 顆星，整理出 5 項核心問題並逐一設計解決方案。
        </p>

        {/* App Store header image */}
        <div style={{ marginBottom: 24 }}>
          <img
            src="/images/sbux/sbux-review-header.webp"
            alt="Starbucks TW App Store 評分與評論"
            style={{ width: 480, maxWidth: "100%", height: "auto", display: "block", borderRadius: 16 }}
          />
        </div>

        {/* Scattered review cards */}
        {isDesktop ? (
          <div style={{ position: "relative", height: 560, marginBottom: 56 }}>
            {/* UX card — left */}
            <img src="/images/sbux/sbux-review-ux.png" alt="UX優化建議評論"
              style={{ position: "absolute", left: "0%", top: "30%", width: "39%", transform: "rotate(-1.5deg)", borderRadius: 12, zIndex: 1 }} />
            {/* Cancel card — top right */}
            <img src="/images/sbux/sbux-review-cancel.png" alt="預約取餐取消評論"
              style={{ position: "absolute", right: "0%", top: "3%", width: "42%", transform: "rotate(1deg)", borderRadius: 12, zIndex: 5 }} />
            {/* Store card — center, on top */}
            <img src="/images/sbux/sbux-review-store.png" alt="門市儲存常用評論"
              style={{ position: "absolute", left: "27%", top: "10%", width: "45%", transform: "rotate(-2deg)", borderRadius: 12, zIndex: 2 }} />
            {/* MOP card — center bottom */}
            <img src="/images/sbux/sbux-review-mop.png" alt="行動預點評論"
              style={{ position: "absolute", left: "38%", top: "55%", width: "26%", transform: "rotate(-1deg)", borderRadius: 12, zIndex: 3 }} />
            {/* Time card — right bottom */}
            <img src="/images/sbux/sbux-review-time.png" alt="取餐時間無法更改評論"
              style={{ position: "absolute", right: "0%", top: "46%", width: "30%", transform: "rotate(1.5deg)", borderRadius: 12, zIndex: 4 }} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
            {[
              { src: "/images/sbux/sbux-review-ux.png",     alt: "UX優化建議" },
              { src: "/images/sbux/sbux-review-store.png",  alt: "門市儲存常用" },
              { src: "/images/sbux/sbux-review-cancel.png", alt: "預約取餐取消" },
              { src: "/images/sbux/sbux-review-mop.png",    alt: "行動預點" },
              { src: "/images/sbux/sbux-review-time.png",   alt: "取餐時間" },
            ].map(({ src, alt }) => (
              <img key={src} src={src} alt={alt} style={{ width: "100%", display: "block", borderRadius: 12 }} />
            ))}
          </div>
        )}

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
                  src="/images/sbux/sbux-after-01.webp"
                  alt=""
                  style={{
                    width: "100%", display: "block",
                    borderRadius: 20,
                    boxShadow: "0 24px 56px rgba(0,0,0,0.35)",
                  }}
                />
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", paddingRight: isDesktop ? 220 : 0 }}>
              {PAIN_SUMMARY.map(({ no, title }, i) => (
                <div key={no} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "14px 0",
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.15)",
                }}>
                  <span style={{
                    fontFamily: "Menlo, monospace",
                    fontSize: 11, fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.08em",
                    flexShrink: 0,
                  }}>{no}</span>
                  <span style={{
                    fontFamily: TC,
                    fontSize: isDesktop ? 17 : 15,
                    fontWeight: 600, color: "#fff",
                    lineHeight: 1.5,
                  }}>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── DESIGN SYSTEM（Figma 中排在優化方案前）────────────────────────────────────
const DS_ITEMS = [
  { label: "TYPOGRAPHY", src: "/images/sbux/sbux-ds-typography.png", alt: "Typography 字體系統", cardHeight: 600 },
  { label: "COLOUR",     src: "/images/sbux/sbux-ds-colour.png",     alt: "Colour 色彩系統",     cardHeight: 600 },
  { label: "ICONS",      src: "/images/sbux/sbux-ds-icons.png",      alt: "Icons 圖示集",  cardWidth: "50%" },
  { label: "ASSETS",     src: "/images/sbux/sbux-ds-assets.png",     alt: "Assets UI 元件"       },
];

function SectionDesign() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-design" style={{ background: BG, padding: isDesktop ? "80px 40px" : "56px 20px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
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

        {/* 兩組各雙欄：[TYPOGRAPHY, COLOUR] 然後 [ICONS, ASSETS] */}
        {[0, 2].map(startIdx => (
          <div key={startIdx} style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
            gap: isDesktop ? 48 : 40,
            marginBottom: startIdx === 0 ? (isDesktop ? 40 : 28) : 0,
            alignItems: "start",
          }}>
            {DS_ITEMS.slice(startIdx, startIdx + 2).map(({ label, src, alt, cardWidth, cardHeight }) => (
              <div key={label}>
                <h3 style={{
                  fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
                  color: `${GREEN}70`, letterSpacing: "0.14em", textTransform: "uppercase",
                  margin: "0 0 20px",
                }}>{label}</h3>
                <div style={{
                  borderRadius: 16, overflow: "hidden",
                  width: cardWidth || "100%",
                  height: cardHeight || "auto",
                }}>
                  <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── OPTIMIZATION ──────────────────────────────────────────────────────────────
const OPT_ITEMS = [
  {
    no: "01", title: "取餐門市頁面", sub: "設置常用門市",
    desc: "快速找到常用的取餐門市，對於新手用戶也能快速找到附近取餐門市，並決定哪種取餐方式較為方便。",
    after: "/images/sbux/sbux-after-01.webp",
    singleImage: true, removeWhiteBg: true,
  },
  {
    no: "02", title: "飲品冷熱同一品項", sub: "冷熱我都在",
    desc: "飲品冷熱不同地方，常造成顧客點錯，或是找不到適合溫度的飲品。",
    before: "/images/sbux/sbux-before-02.webp", beforeHeight: 490,
    after:  "/images/sbux/sbux-after-02.webp",
  },
  {
    no: "03", title: "植物奶快速選", sub: "特殊牛奶選項",
    desc: "無需另外點開跳轉頁面，同頁面選擇是否加購換特殊植物奶，減少操作步驟。",
    before: "/images/sbux/sbux-before-03.webp",
    after:  "/images/sbux/sbux-after-03.webp",
  },
  {
    no: "04", title: "快速儲值", sub: "小額也行",
    desc: "在下單前看到卡片餘額，避免下單後發現餘額不足需重新選購，且提供小額線上儲值。",
    after: "/images/sbux/sbux-after-04.webp",
    singleImage: true, imgMaxWidth: 480,
  },
  {
    no: "05", title: "訂單完成", sub: "快與友人分享",
    desc: "訂單完成後跳出通知與詳細支付資訊，提供截圖、分享或致電門市三種方式。",
    after: "/images/sbux/sbux-feature-05.webp",
    singleImage: true, removeWhiteBg: true,
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
          boxShadow: (item.imgMaxWidth || item.removeWhiteBg) ? "none" : `0 8px 40px ${GREEN}14`,
          maxWidth: item.imgMaxWidth || 320, margin: "0 auto",
        }}>
          <img src={item.after} alt={item.title} style={{
            width: "100%", display: "block",
            borderRadius: item.removeWhiteBg ? 0 : 20,
            mixBlendMode: item.removeWhiteBg ? "multiply" : "normal",
          }} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: isDesktop ? "start" : "stretch" }}>
          {/* BEFORE */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{
              display: "inline-block",
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", color: "#999", background: `${GREEN}10`,
              padding: "3px 10px", borderRadius: 4, marginBottom: 10, flexShrink: 0,
            }}>BEFORE</span>
            <div style={{
              borderRadius: 14, overflow: "hidden", border: `1px solid ${GREEN}20`,
              width: (item.beforeHeight && isDesktop) ? "fit-content" : "100%",
              flex: isDesktop ? "none" : 1,
            }}>
              <img src={item.before} alt={`${item.title} before`} style={{
                width: (item.beforeHeight && isDesktop) ? "auto" : "100%",
                height: (item.beforeHeight && isDesktop) ? item.beforeHeight : "100%",
                display: "block",
                objectFit: isDesktop ? "unset" : "cover",
              }} />
            </div>
          </div>
          {/* AFTER */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{
              display: "inline-block",
              fontFamily: "Menlo, monospace", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", color: "#fff", background: BRAND,
              padding: "3px 10px", borderRadius: 4, marginBottom: 10, flexShrink: 0,
            }}>AFTER</span>
            <div style={{ borderRadius: 14, overflow: "hidden", flex: isDesktop ? "none" : 1 }}>
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
      <div style={{ padding: isDesktop ? "80px 40px 40px" : "56px 20px 20px", position: "relative", overflow: "hidden" }}>
        {/* Ghost 大字 */}
        <div style={{
          position: "absolute", top: -10, left: -8,
          fontFamily: "Georgia, serif",
          fontSize: isDesktop ? 140 : 80,
          fontWeight: 800, color: `${BRAND}12`,
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
          letterSpacing: "-3px", whiteSpace: "nowrap",
        }}>Optimization</div>

        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
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
        <p style={{ fontFamily: FONT, fontSize: 16, color: `${BG}CC`, lineHeight: 1.8, margin: 0 }}>
          重新設計後的行動預點流程，讓每一杯咖啡的旅程從下單就開始享受。
        </p>
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
