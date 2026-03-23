// ── Starbucks MOP（行動預點）ScrollStory ─────────────────────────────────────
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./StarbucksMOPScrollStory.module.css";

// Runtime-only color constants (used where value must be dynamic / data-driven)
const BG    = "#F5F4F2";
const GREEN = "#111111";
const BRAND = "#306242";

function scrollToSection(id) {
  const scrollEl = document.getElementById("main-scroll");
  const target   = document.getElementById(id);
  if (scrollEl && target)
    scrollEl.scrollTo({ top: target.offsetTop - 56, behavior: "smooth" });
}

// ── Sticky nav ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "sbux-about",    label: "開場"   },
  { id: "sbux-research", label: "研究洞察" },
  { id: "sbux-design",   label: "設計系統" },
  { id: "sbux-opt",      label: "優化方案" },
];

function SectionNav({ active }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.navBrand}>Starbucks MOP</span>
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ""}`}
            style={{
              border:     isActive ? `1px solid ${BG}55`   : "1px solid transparent",
              color:      isActive ? BG                     : `${BG}70`,
              background: isActive ? `${BG}20`             : "transparent",
            }}
          >
            {label}
          </button>
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
        <path id="textCurve" d="M 18,195 A 122,122 0 1,1 262,195" fill="none" />
      </defs>
      <text fontFamily="'Georgia', serif" fontSize="17" fontWeight="900" fill="#1E3932" letterSpacing="4">
        <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
          MOBILE ORDER · PAY
        </textPath>
      </text>
      <path d="M 42,272 Q 62,242 88,230 Q 98,225 108,223"
        stroke="#E8A278" strokeWidth="40" fill="none" strokeLinecap="round" />
      <path d="M 238,272 Q 218,242 192,230 Q 182,225 172,223"
        stroke="#E8A278" strokeWidth="40" fill="none" strokeLinecap="round" />
      <ellipse cx="140" cy="256" rx="46" ry="7" fill="rgba(0,0,0,0.09)" />
      <path d="M 88,112 L 192,112 L 177,248 L 103,248 Z"
        fill="white" stroke="#DDD9D0" strokeWidth="1.5" />
      <path d="M 91,158 L 189,158 L 182,208 L 98,208 Z" fill="#F0EAE0" />
      <rect x="82" y="99" width="116" height="17" rx="5" fill="#EAE4DA" />
      <path d="M 108,99 Q 140,83 172,99" stroke="#D4CEBF" strokeWidth="1.5" fill="none" />
      <rect x="136" y="60" width="9" height="42" rx="4.5" fill="#C0B8AE" />
      <circle cx="140" cy="182" r="27" fill="#036242" />
      <circle cx="140" cy="182" r="22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="140" y="191" textAnchor="middle" fontSize="24" fill="white" fontWeight="700" fontFamily="serif">★</text>
    </svg>
  );
}

const SBUX_HERO_TAGS  = ["UX / UI", "Redesign", "2024"];
const SBUX_INFO_CARDS = [
  { label: "成果", value: "5 項核心體驗改善" },
  { label: "時程", value: "8 週"             },
  { label: "角色", value: "UX / UI Designer"  },
  { label: "工具", value: "Figma"             },
];

function SbuxInfoCard({ label, value }) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardLabel}>{label}</div>
      <div className={styles.infoCardValue}>{value}</div>
    </div>
  );
}

function SectionHero() {
  const navigate = useNavigate();
  return (
    <section id="sbux-hero" className={styles.heroSection}>
      <div className={styles.heroContainer}>

        <div className={styles.heroBackRow}>
          <button
            onClick={() => navigate("/projects")}
            className={styles.heroBackBtn}
          >
            ← Projects
          </button>
        </div>

        <div className={styles.heroTitleArea}>
          <div className={styles.heroTagRow}>
            {SBUX_HERO_TAGS.map(tag => (
              <span key={tag} className={styles.heroTag}>{tag}</span>
            ))}
          </div>

          <h1 className={styles.heroH1}>從夥伴洞察出發，重塑星巴克行動預點</h1>

          <p className={styles.heroSubtitle}>
            2.1 顆星的負面評價中挖掘產品契機，我將門市夥伴的服務經驗數位化。針對行動預點最迫切的 5 項核心問題提供設計對策，讓「預約」真正實現省時與貼心的品牌初衷。
          </p>

          <div className={styles.heroInfoCards}>
            {SBUX_INFO_CARDS.map(card => (
              <SbuxInfoCard key={card.label} {...card} />
            ))}
          </div>
        </div>

        <div className={styles.heroBannerWrap}>
          <img
            src="/images/sbux/sbux-hero.webp"
            alt="Starbucks MOP 行動預點重設計"
            className={styles.heroBannerImg}
          />
        </div>

        <div className={styles.heroSpacer} />
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function SectionAbout() {
  return (
    <section id="sbux-about" className={styles.aboutSection}>
      <div className={styles.aboutGhost}>ABOUT</div>

      <div className={styles.aboutInner}>
        <span className={styles.sectionLabel}>ABOUT</span>

        <div className={styles.aboutGrid}>
          {/* 左欄：App Demo 影片 */}
          <div className={styles.aboutVideoWrap}>
            <div className={styles.aboutPhoneFrame}>
              <video
                src="/videos/sbux/stbx-demo.mov"
                autoPlay loop muted playsInline
                className={styles.aboutPhoneVideo}
              />
            </div>
          </div>

          {/* 右欄：文字 + Pill 按鈕 */}
          <div>
            <p className={styles.aboutText}>
              身為星巴克夥伴，我觀察到許多顧客因不熟悉「行動預點 (MOP)」的操作流程，最終仍選擇到店後請教夥伴並現場下單。這不僅讓數位預點失去了「省時」的初衷，也導致顧客無法在抵達時即刻領取餐點，造成服務流程的斷層。
            </p>

            <div className={styles.aboutPills}>
              {["UX / UI", "Redesign"].map(tag => (
                <span key={tag} className={styles.aboutPill}>{tag}</span>
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
  return (
    <section id="sbux-research" className={styles.researchSection}>
      <div className={styles.researchGhost}>RESEARCH</div>

      <div className={styles.researchInner}>
        <span className={styles.sectionLabelSmallMargin}>RESEARCH</span>
        <h2 className={styles.sectionH2}>研究洞察</h2>
        <p className={styles.sectionSubtitle}>
          從 App Store 5,007 則使用者評論入手，平均 2.1 顆星，整理出 5 項核心問題並逐一設計解決方案。
        </p>

        {/* App Store header image */}
        <div className={styles.reviewHeaderImg}>
          <img
            src="/images/sbux/sbux-review-header.webp"
            alt="Starbucks TW App Store 評分與評論"
          />
        </div>

        {/* Scattered review cards — desktop */}
        <div className={styles.reviewCardsDesktop}>
          <img src="/images/sbux/sbux-review-ux.png"     alt="UX優化建議評論"    className={styles.reviewCardUx}     />
          <img src="/images/sbux/sbux-review-cancel.png" alt="預約取餐取消評論"  className={styles.reviewCardCancel} />
          <img src="/images/sbux/sbux-review-store.png"  alt="門市儲存常用評論"  className={styles.reviewCardStore}  />
          <img src="/images/sbux/sbux-review-mop.png"    alt="行動預點評論"      className={styles.reviewCardMop}    />
          <img src="/images/sbux/sbux-review-time.png"   alt="取餐時間無法更改評論" className={styles.reviewCardTime} />
        </div>

        {/* Mobile stacked cards (CSS hides/shows via media query on the parent classes) */}
        <div className={styles.reviewCardsMobile}>
          {[
            { src: "/images/sbux/sbux-review-ux.png",     alt: "UX優化建議" },
            { src: "/images/sbux/sbux-review-store.png",  alt: "門市儲存常用" },
            { src: "/images/sbux/sbux-review-cancel.png", alt: "預約取餐取消" },
            { src: "/images/sbux/sbux-review-mop.png",    alt: "行動預點" },
            { src: "/images/sbux/sbux-review-time.png",   alt: "取餐時間" },
          ].map(({ src, alt }) => (
            <img key={src} src={src} alt={alt} />
          ))}
        </div>

        {/* 找出問題 / 並解決 */}
        <div className={styles.painGrid}>
          {/* 左側大字 + 垂直線 */}
          <div className={styles.painLeft}>
            <div className={styles.painFindTitle}>找出問題</div>
            <div className={styles.painSolveTitle}>並解決</div>
          </div>

          {/* 右側深綠卡片 + 旋轉手機圖 */}
          <div className={styles.painCard}>
            {/* 右上角旋轉手機截圖（desktop only via CSS） */}
            <div className={styles.painPhoneWrap}>
              <img
                src="/images/sbux/sbux-after-01.webp"
                alt=""
                className={styles.painPhoneImg}
              />
            </div>

            <div className={styles.painList}>
              {PAIN_SUMMARY.map(({ no, title }, i) => (
                <div
                  key={no}
                  className={styles.painRow}
                >
                  <span className={styles.painNo}>{no}</span>
                  <span className={styles.painTitle}>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── DESIGN SYSTEM ─────────────────────────────────────────────────────────────
const DS_ITEMS = [
  { label: "TYPOGRAPHY", src: "/images/sbux/sbux-ds-typography.png", alt: "Typography 字體系統", cardHeight: 600 },
  { label: "COLOUR",     src: "/images/sbux/sbux-ds-colour.png",     alt: "Colour 色彩系統",     cardHeight: 600, imgPosition: "top" },
  { label: "ICONS",      src: "/images/sbux/sbux-ds-icons.png",      alt: "Icons 圖示集",  cardWidth: "100%", noRadius: true },
  { label: "ASSETS",     src: "/images/sbux/sbux-ds-assets.png",     alt: "Assets UI 元件"       },
];

function SectionDesign() {
  return (
    <section id="sbux-design" className={styles.designSection}>
      <div className={styles.designGhost}>Design System</div>

      <div className={styles.designInner}>
        <span className={styles.sectionLabelSmallMargin}>DESIGN SYSTEM</span>
        <h2 className={styles.designH2}>設計系統</h2>

        {[0, 2].map((startIdx, rowIdx) => (
          <div
            key={startIdx}
            className={`${styles.dsRow} ${rowIdx === 0 ? styles.dsRowFirst : ""}`}
          >
            {DS_ITEMS.slice(startIdx, startIdx + 2).map(({ label, src, alt, cardWidth, cardHeight, imgPosition, noRadius }) => (
              <div key={label}>
                <h3 className={styles.dsItemLabel}>{label}</h3>
                <div style={{
                  borderRadius: noRadius ? 0 : 16,
                  overflow: "hidden",
                  width: cardWidth || "100%",
                }}>
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      objectPosition: imgPosition || "top",
                      display: "block",
                    }}
                  />
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

function OptCard({ item, index }) {
  const imgRight = index % 2 === 0;

  const TextBlock = (
    <div className={styles.optTextBlock}>
      <div className={styles.optTitle}>{item.title}</div>
      <div className={styles.optSub}>{item.sub}</div>
      <p className={styles.optDesc}>{item.desc}</p>
    </div>
  );

  const ImgBlock = (
    <div>
      {item.singleImage ? (
        <div style={{
          boxShadow: (item.imgMaxWidth || item.removeWhiteBg) ? "none" : `0 8px 40px ${GREEN}14`,
          maxWidth: item.imgMaxWidth || 320,
          margin: "0 auto",
        }}>
          <img
            src={item.after}
            alt={item.title}
            className={item.removeWhiteBg ? styles.optSingleImgBlend : styles.optSingleImg}
          />
        </div>
      ) : (
        <div className={styles.optBeforeAfterGrid}>
          {/* BEFORE */}
          <div className={styles.optBeforeCol}>
            <span className={styles.optBeforeLabel}>BEFORE</span>
            <div className={styles.optBeforeImgWrap}>
              <img src={item.before} alt={`${item.title} before`} className={styles.optBeforeImg} />
            </div>
          </div>
          {/* AFTER */}
          <div className={styles.optAfterCol}>
            <span className={styles.optAfterLabel}>AFTER</span>
            <div className={styles.optAfterImgWrap}>
              <img src={item.after} alt={`${item.title} after`} className={styles.optAfterImg} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.optCard}>
      {/* Ghost watermark number */}
      <div className={styles.optCardGhost}>{item.no}</div>

      <div className={styles.optCardInner}>
        {/* Desktop: side-by-side grid (CSS hides on mobile) */}
        <div className={styles.optCardGrid}>
          {imgRight ? <>{TextBlock}{ImgBlock}</> : <>{ImgBlock}{TextBlock}</>}
        </div>

        {/* Mobile: stacked column (CSS hides on desktop) */}
        <div className={styles.optCardStack}>
          {TextBlock}
          {ImgBlock}
        </div>
      </div>
    </div>
  );
}

function SectionOptimization() {
  return (
    <section id="sbux-opt" className={styles.optSection}>
      <div className={styles.optHeader}>
        <div className={styles.optGhost}>Optimization</div>

        <div className={styles.optInner}>
          <span className={styles.sectionLabelSmallMargin}>OPTIMIZATION</span>
          <h2 className={styles.sectionH2}>優化方案</h2>
          <p className={styles.optSubtitle}>
            針對研究洞察提出五項核心體驗改善，以設計成果說明各項優化方案。
          </p>
        </div>
      </div>

      {OPT_ITEMS.map((item, i) => (
        <OptCard key={item.no} item={item} index={i} />
      ))}
    </section>
  );
}

// ── OUTRO ─────────────────────────────────────────────────────────────────────
function SectionOutro() {
  return (
    <section className={styles.outroSection}>
      <div className={styles.outroInner}>
        <div className={styles.outroEmoji}>☕</div>
        <h2 className={styles.outroH2}>Have a Nice Day.</h2>
        <p className={styles.outroP}>
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
          className={styles.glassBtn}
        >
          ↑ 回到頂部
        </button>,
        document.body
      )}
    </>
  );
}
