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
const INFO_CARDS = [
  { label: "類型", value: "UX/UI Redesign"   },
  { label: "工具", value: "Figma"             },
  { label: "研究", value: "App Store 評論分析" },
  { label: "發布", value: "2024"              },
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

        {/* 大標題 */}
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

        {/* Info grid */}
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
          <img src="/images/sbux-hero.webp" alt="Starbucks MOP" style={{ width: "100%", display: "block" }} />
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function SectionAbout() {
  const isDesktop = useIsDesktop();
  const PAIN_POINTS = [
    { icon: "⏱", title: "省時目的失效", desc: "顧客到店後才點，行動預點的提前備製優勢完全消失。" },
    { icon: "📍", title: "取餐動線混亂", desc: "不熟悉取餐流程，導致在吧台久等或拿錯餐點。" },
    { icon: "🔄", title: "學習門檻過高", desc: "現有 App 流程不直覺，讓夥伴需要反覆向顧客解說。" },
  ];
  return (
    <section id="sbux-about" style={{ background: BG, padding: isDesktop ? "80px 40px" : "56px 20px", position: "relative", overflow: "hidden" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 64 : 40, alignItems: "start" }}>
          {/* 左欄：標題 + 描述 + Pill 按鈕 */}
          <div>
            <h2 style={{
              fontFamily: TC,
              fontSize: isDesktop ? 38 : 28,
              fontWeight: 700, color: GREEN,
              margin: "0 0 24px", lineHeight: 1.3, letterSpacing: "-0.5px",
            }}>
              身為星巴克夥伴，<br />我看見了問題所在。
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 17, color: GREEN, lineHeight: 1.9, margin: "0 0 40px" }}>
              顧客常不知道如何使用行動預點，通常都是來到門市後請教夥伴現場下單。
              除了失去了省時預點的目的，也沒辦法在預點後即時拿到想要的餐點。
            </p>

            {/* Figma pill 按鈕 */}
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

          {/* 右欄：三張痛點卡片 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PAIN_POINTS.map(({ icon, title, desc }) => (
              <div key={title} style={{
                padding: "20px 24px",
                background: `${GREEN}0D`,
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

// ── RESEARCH ──────────────────────────────────────────────────────────────────
const PAIN_SUMMARY = [
  { no: "01", title: "特殊牛奶選項不明確",         desc: "植物奶加購入口隱藏，顧客難以辨識如何客製飲品。" },
  { no: "02", title: "無法設置常用門市",           desc: "每次預點都需重新搜尋門市，流程繁瑣且費時。" },
  { no: "03", title: "冷熱飲品分散不同頁",         desc: "同款飲品的冷熱版本各自獨立，容易找不到或點錯單。" },
  { no: "04", title: "卡片餘額不透明、儲值門檻高", desc: "下單時看不到餘額，且最低儲值 300 元，靈活性不足。" },
  { no: "05", title: "缺少訂單通知與進度追蹤",     desc: "下單後無成功或失敗通知，也看不到訂單製作進度。" },
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
          {/* 左側大字 */}
          <div>
            <div style={{
              fontFamily: TC,
              fontSize: isDesktop ? 56 : 40,
              fontWeight: 700, color: BRAND,
              lineHeight: 1.15, marginBottom: isDesktop ? 16 : 12,
              letterSpacing: "-1px",
            }}>找出問題</div>
            <div style={{
              fontFamily: TC,
              fontSize: isDesktop ? 72 : 56,
              fontWeight: 700, color: GREEN,
              lineHeight: 1.05, letterSpacing: "-1.5px",
            }}>並解決</div>
          </div>

          {/* 右側深綠卡片 */}
          <div style={{
            background: BRAND, borderRadius: 28,
            padding: isDesktop ? "44px 52px" : "32px 28px",
            position: "relative", overflow: "hidden",
          }}>
            {/* 裝飾水印 */}
            <div style={{
              position: "absolute", bottom: -20, right: 16,
              fontFamily: "Georgia, serif",
              fontSize: isDesktop ? 180 : 120, fontWeight: 800,
              color: "rgba(255,255,255,0.07)",
              lineHeight: 1, userSelect: "none", pointerEvents: "none",
            }}>5</div>

            <ol style={{ margin: 0, padding: "0 0 0 24px" }}>
              {PAIN_SUMMARY.map(({ no, title }) => (
                <li key={no} style={{
                  fontFamily: TC,
                  fontSize: isDesktop ? 20 : 16,
                  fontWeight: 600, color: "#fff",
                  lineHeight: 1.95, paddingLeft: 8,
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
const PALETTE = [
  { label: "STARBUCKS GREEN", hex: "#036242", dark: false },
  { label: "ACCENT GREEN",    hex: "#02754B", dark: false },
  { label: "LIGHT GREEN",     hex: "#D4E9E2", dark: true  },
  { label: "HOUSE GREEN",     hex: "#1E3932", dark: false },
  { label: "BLACK",           hex: "#000000", dark: false },
  { label: "WARM NEUTRAL",    hex: "#F2F0EA", dark: true  },
  { label: "COOL NEUTRAL",    hex: "#F9F9F9", dark: true  },
  { label: "WHITE",           hex: "#FFFFFF", dark: true  },
];

const TYPE_WEIGHTS = [
  { w: "600", label: "SemiBold", opacity: 1    },
  { w: "500", label: "Medium",   opacity: 0.85 },
  { w: "400", label: "Regular",  opacity: 0.7  },
  { w: "300", label: "Light",    opacity: 0.55 },
  { w: "200", label: "Thin",     opacity: 0.5  },
  { w: "100", label: "UltraLight", opacity: 0.35 },
];

function SectionDesign() {
  const isDesktop = useIsDesktop();
  return (
    <section id="sbux-design" style={{ background: BG, padding: isDesktop ? "80px 40px" : "56px 20px", position: "relative", overflow: "hidden" }}>
      {/* Ghost 大字 */}
      <div style={{
        position: "absolute", top: -10, left: -8,
        fontFamily: "Georgia, serif",
        fontSize: isDesktop ? 120 : 72,
        fontWeight: 800, color: `${BRAND}15`,
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-3px", whiteSpace: "nowrap",
      }}>Design System</div>

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <span style={{
          fontFamily: "Menlo, monospace", fontSize: 11, color: BRAND,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
          display: "block", marginBottom: 16,
        }}>DESIGN SYSTEM</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: GREEN, margin: "0 0 48px", letterSpacing: "-0.5px" }}>設計系統</h2>

        {/* 色彩系統 */}
        <h3 style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: `${GREEN}80`, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>色彩系統</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${isDesktop ? 4 : 2}, 1fr)`,
          gap: 10, marginBottom: 56,
        }}>
          {PALETTE.map(({ label, hex, dark }) => (
            <div key={hex}>
              <div style={{
                height: 80, background: hex, borderRadius: 10, marginBottom: 10,
                border: (hex === "#FFFFFF" || hex === "#F9F9F9" || hex === "#F2F0EA") ? `1px solid ${GREEN}18` : "none",
                display: "flex", alignItems: "flex-end", padding: "10px 12px",
              }}>
                <span style={{
                  fontFamily: "Menlo, monospace", fontSize: 10,
                  color: dark ? `${GREEN}BB` : `${BG}CC`,
                }}>{hex}</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: GREEN, letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* 字體系統 */}
        <h3 style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: `${GREEN}80`, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>字體系統</h3>
        <div style={{
          padding: "32px 36px", background: "#fff",
          borderRadius: 16, border: `1px solid ${GREEN}15`,
          boxShadow: `0 2px 20px ${GREEN}08`,
        }}>
          {TYPE_WEIGHTS.map(({ w, label, opacity }) => (
            <div key={w} style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: w === "100" ? 0 : 12 }}>
              <span style={{
                fontFamily: "'PingFang TC', 'Noto Sans TC', sans-serif",
                fontSize: isDesktop ? 22 : 18, fontWeight: w,
                color: GREEN, opacity,
              }}>蘋方 PingFang SC</span>
              <span style={{ fontFamily: FONT, fontSize: 11, color: `${GREEN}60`, flexShrink: 0 }}>
                {label} · {w}
              </span>
            </div>
          ))}
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
