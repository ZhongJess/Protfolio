/**
 * Rent4U — 輔具租賃平台
 * ─────────────────────────────────────────────────────────────────────────────
 * TopNav (sticky, 4 anchors) + SectionSummary (Hero) + content sections
 */

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "../hooks";
import styles from "./Rent4UScrollStory.module.css";

// ── Runtime-only color constants (dynamic/data-driven values) ─────────────────
const C = {
  primary:   "#003795",   // used inside inline mockup option states
  accent:    "#E53E3E",   // table row cell conditional color
  portalAccent: "#FF6200",// nav active state (dynamic)
};

// ── Nav Items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "summary",  label: "需求洞察" },
  { id: "research", label: "設計核心" },
  { id: "logic",    label: "系統實踐" },
  { id: "impact",   label: "價值影響" },
];

// ── Hero Info Cards ───────────────────────────────────────────────────────────
const INFO_CARDS = [
  { label: "目標達成", value: "預計優化 70% 的輔具適配精準度" },
  { label: "開發時程", value: "12 週" },
  { label: "團隊角色", value: "UX / UI · PM" },
  { label: "工具",     value: "Figma · Notion · Miro" },
];

// ── Anchor Scroll ─────────────────────────────────────────────────────────────
function scrollToSection(id) {
  const scrollEl = document.getElementById("main-scroll");
  const target   = document.getElementById(`r4u-${id}`);
  if (!scrollEl || !target) return;
  scrollEl.scrollTo({ top: target.offsetTop - 56, behavior: "smooth" });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP STICKY NAV
// ─────────────────────────────────────────────────────────────────────────────
function TopNav({ active }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.navBrand}>Rent4U</span>

      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ""}`}
            style={{
              border:     isActive ? `1px solid ${C.portalAccent}55` : "1px solid transparent",
              color:      isActive ? C.portalAccent                  : undefined,
              background: isActive ? "rgba(255,98,0,0.08)"           : undefined,
            }}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION SUMMARY  ←── 完整 Hero
// ─────────────────────────────────────────────────────────────────────────────

/** TIME magazine 風格縮略圖 */
function TimeThumbnail() {
  return (
    <div className={styles.timeThumbnail}>
      <span className={styles.timeLabel}>TIME</span>
      <div className={styles.timeCoverPlaceholder} />
    </div>
  );
}

/** 單張 Info Card */
function InfoCard({ label, value, dark = false }) {
  return (
    <div className={`${styles.infoCard} ${dark ? styles.infoCardDark : ""}`}>
      <div className={styles.infoCardLabel}>{label}</div>
      <div className={styles.infoCardValue}>{value}</div>
    </div>
  );
}

/** 產品網站截圖 Mockup */
function ProductScreenshot() {
  return (
    <div className={styles.productScreenshot}>
      <img
        src="/images/rent4u/rent4u-hero.webp"
        alt="Rent4U 產品網站首頁截圖"
      />
    </div>
  );
}

const HERO_TAGS = ["Market Research", "UX Strategy", "Design System", "PM", "2025"];

function SectionSummary() {
  const navigate = useNavigate();
  return (
    <section id="r4u-summary" className={styles.heroSection}>
      <div className={styles.heroContainer}>

        {/* ← Projects */}
        <div className={styles.heroBackRow}>
          <button
            onClick={() => navigate("/projects")}
            className={styles.heroBackBtn}
          >
            <span className={styles.arrowLeft}>←</span> Projects
          </button>
        </div>

        {/* 主標題區塊 */}
        <div className={styles.heroTitleArea}>
          {/* Tags */}
          <div className={styles.heroTagRow}>
            {HERO_TAGS.map(tag => (
              <span key={tag} className={styles.heroTag}>{tag}</span>
            ))}
          </div>

          {/* 主標題 */}
          <h1 className={styles.heroH1}>重塑輔具租賃：以GMFCS實現精準適配</h1>

          {/* 副標題 */}
          <p className={styles.heroSubtitle}>
            從『租得到』到『租得對』：致力於簡化租賃流程，幫助使用者快速找到適合的輔具。
          </p>

          {/* Stat Cards */}
          <div className={styles.heroStatCards}>
            {INFO_CARDS.map(card => (
              <InfoCard key={card.label} {...card} dark />
            ))}
          </div>
        </div>

        {/* 瀏覽器 Mockup（1080px 內全寬） */}
        <div className={styles.heroBannerWrap}>
          <ProductScreenshot />
        </div>

        <div className={styles.heroSpacer} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY SECTION SHELLS (待實作)
// ─────────────────────────────────────────────────────────────────────────────
function SectionShell({ id, bg, color = "#6B6760", label }) {
  return (
    <section
      id={`r4u-${id}`}
      className={styles.shell}
      style={{ background: bg }}
    >
      <span
        className={styles.shellLabel}
        style={{ color, borderColor: color }}
      >
        [ {label} ]
      </span>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION RESEARCH  (設計流程)
// ─────────────────────────────────────────────────────────────────────────────

/** 對話氣泡 */
function SpeechBubble({ text, align = "left", author }) {
  const isRight = align === "right";
  return (
    <div className={`${styles.bubbleWrapper} ${isRight ? styles.bubbleWrapperRight : styles.bubbleWrapperLeft}`}>
      <div className={`${styles.bubble} ${isRight ? styles.bubbleRight : styles.bubbleLeft}`}>
        <p className={styles.bubbleText}>{text}</p>
      </div>
      {author && (
        <span className={styles.bubbleAuthor}>— {author}</span>
      )}
    </div>
  );
}

/** 高亮文字片段（橙色 accent） */
function Highlight({ children }) {
  return <span className={styles.highlight}>{children}</span>;
}

function SectionResearch() {
  return (
    <section id="r4u-research" className={styles.researchSection}>
      {/* ── 子區塊 A：問題陳述 ─── */}
      <div className={styles.researchSubA}>
        <div className={styles.researchSubAGrid}>
          {/* 左：文字 */}
          <div className={styles.researchTextCol}>
            <h2 className={styles.researchH2}>
              你真的選對<br />
              <Highlight>輔具</Highlight>了嗎？
            </h2>
            <p className={styles.researchBodyText}>
              在照護情境中，家屬往往處於極度焦慮且需要情境不對稱的狀態。
              很多家屬租了病床卻忘了洗澡椅。我們發現 70% 的家庭在租借輔具時，
              因為<strong className={styles.researchBodyStrong}>缺乏情境聯想而產生照顧斷層</strong>。
            </p>
          </div>

          {/* 右：對話氣泡 */}
          <div className={styles.researchBubblesCol}>
            <SpeechBubble
              text="只有電動床，覺得很方便。但沒想到半夜長輩尿急，要把他從床移到廁所才是最累的。"
              align="left"
              author="照顧者"
            />
            <SpeechBubble
              text="買了最便宜的基礎輪椅，結果長輩一直往下滑，背也挺不直，吃飯時頭都低低的，很怕他嗆到。"
              align="right"
              author="家屬"
            />
          </div>
        </div>
      </div>

      {/* ── 子區塊 B：研究與洞察 ── */}
      <div className={styles.researchSubB}>
        <div className={styles.researchSubBInner}>
          <h2 className={styles.researchInsightH2}>研究與洞察</h2>

          <p className={styles.researchInsightSubtitle}>
            我們與兩位利害關係人線上訪談、研究三種競品分析。核心發現：
          </p>

          <div className={styles.researchBullets}>
            <p className={styles.researchBullet}>
              • 數據警示：目前輔具市場面臨 80% 的用戶流失率，主因是
              <strong className={styles.researchBodyStrong}>線上評估與實體需求之間存在巨大的「資訊斷層」</strong>。
            </p>
            <p className={styles.researchBullet}>
              • 營運痛點：實體店家長期受限於地域邊界，在
              <strong className={styles.researchBodyStrong}>無法遠端掌握用戶能力</strong>
              的現況下，輔具資產周轉率難以優化，經營效率受限。
            </p>
          </div>

          {/* 2 欄圖片卡片 */}
          <div className={styles.researchImgGrid}>

            {/* 市場研究 */}
            <div className={styles.researchImgCard}>
              <div className={styles.researchImgFrame}>
                <picture className={styles.researchPicture}>
                  <source media="(max-width: 767px)" srcSet="/images/rent4u/market-research-mobile.png" />
                  <img
                    src="/images/rent4u/market-research.webp"
                    alt="市場研究"
                  />
                </picture>
              </div>
              <div className={styles.researchImgCaption}>
                <h3 className={styles.researchImgH3}>市場研究</h3>
                <p className={styles.researchImgDesc}>
                  目前的輔具平台因店家無法與使用者對其評估失能能力，大多仰賴線下轉介不僅地域性的限制，也造成使用者體驗斷層，患者與家人心情更加焦慮。
                </p>
              </div>
            </div>

            {/* 利害關係人訪談 */}
            <div className={styles.researchImgCard}>
              <div className={styles.researchImgFrame}>
                <img
                  src="/images/rent4u/stakeholder-interview.webp"
                  alt="利害關係人訪談"
                  className={styles.researchImgAbsolute}
                />
              </div>
              <div className={styles.researchImgCaption}>
                <h3 className={styles.researchImgH3}>利害關係人訪談</h3>
                <p className={styles.researchImgDesc}>
                  透過實地調研「美美醫療器材行」，我們揭露了傳統店家的核心困境——「無法遠端診斷」。
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LOGIC  (Mock up · 設計思路)
// ─────────────────────────────────────────────────────────────────────────────

/** 全寬截圖 Mockup（phone + admin 後台） */
function FullWidthMockup() {
  return (
    <div className={styles.fullWidthMockup}>
      {/* 桌布格點 */}
      <div className={styles.fullWidthDotGrid} />

      {/* 手機 */}
      <div className={styles.fwmPhone}>
        <div className={styles.fwmStatusBar}>
          <span>12:16</span>
          <div className={styles.fwmStatusIcons}>
            {["📶","🔋"].map((i, k) => <span key={k}>{i}</span>)}
          </div>
        </div>
        <div className={styles.fwmPhoneContent}>
          <div className={styles.fwmPhonePrompt}>
            請選擇最符合目前行動能力的描述
          </div>
          {["具平地跑跳能力","在平地無法跑跳，但可快步行走","行走需扶持穩定物","無法行走，但能在無障礙支撐下維持坐姿"].map((opt, i) => (
            <div
              key={i}
              className={styles.fwmPhoneOption}
              style={{
                border:     `1px solid ${i === 0 ? C.primary : "#DDD"}`,
                color:      i === 0 ? "#fff" : "#555",
                background: i === 0 ? C.primary : "transparent",
              }}
            >
              {opt}
            </div>
          ))}
          <div className={styles.fwmPhoneIcon}>🧍</div>
          <div className={styles.fwmPhoneUrlBar}>assist-hub.vercel.app</div>
        </div>
      </div>

      {/* 桌面後台管理截圖 */}
      <div className={styles.fwmDesktop}>
        <div className={styles.fwmBrowserBar}>
          {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
            <div key={i} className={styles.fwmTrafficDot} style={{ background: c }} />
          ))}
          <div className={styles.fwmAddressBar}>
            assist-hub.vercel.app/admin/suggests
          </div>
        </div>
        <div className={styles.fwmTableWrap}>
          <div className={styles.fwmTabs}>
            <span className={styles.fwmTabAll}>全部 134</span>
            <span>未回覆 101</span>
            <span className={styles.fwmTabDone}>✓ 已回覆 33</span>
          </div>
          <div className={styles.fwmTableHeader}>
            {["詢問單狀態","詢問單","建議單","名稱","信箱","收件日期"].map(h => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {[
            ["尚未回覆","AA153","前往回覆","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["尚未回覆","AA152","前往回覆","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["已回覆","AA151","AA151S","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["已回覆","AA150","AA150S","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["尚未回覆","AA148","前往回覆","江品學","frank79530@gmail.com","2026-01-06"],
          ].map((row, ri) => (
            <div key={ri} className={styles.fwmTableRow}>
              {row.map((cell, ci) => (
                <span
                  key={ci}
                  className={styles.fwmCellEllipsis}
                  style={{
                    color:      cell === "前往回覆" ? C.accent : cell === "已回覆" ? "#1A7F5A" : undefined,
                    fontWeight: (cell === "前往回覆" || cell === "已回覆") ? 600 : 400,
                  }}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Parallax hook
// ─────────────────────────────────────────────────────────────────────────────
function useParallax(speed = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;
    const update = () => {
      if (!ref.current) return;
      const elTop   = ref.current.getBoundingClientRect().top;
      const rootTop = scrollEl.getBoundingClientRect().top;
      const relY    = elTop - rootTop - scrollEl.clientHeight / 2;
      ref.current.style.transform = `translateY(${relY * speed}px)`;
    };
    scrollEl.addEventListener("scroll", update, { passive: true });
    update();
    return () => scrollEl.removeEventListener("scroll", update);
  }, [speed]);
  return ref;
}

// ── 手機 Mockup — 詢問單問卷 ─────────────────────────────────────────────────
function PhoneInquiry({ parallaxRef }) {
  return (
    <div ref={parallaxRef} className={styles.phoneInquiry}>
      <div className={styles.phoneStatusBar}>
        <span className={styles.phoneStatusTime}>12:16</span>
        <span>📶 🔋</span>
      </div>
      <div className={styles.phoneContent}>
        <p className={styles.phonePrompt}>請選擇最符合目前行動能力的描述（單選）：</p>
        {[
          { label:"具平地跑跳能力", active: true },
          { label:"在平地無法跑跳，但可快步行走", active: false },
          { label:"行走需扶持穩定物", active: false },
          { label:"無法行走，但能在無障礙支撐下維持坐姿", active: false },
          { label:"無鎮暴支撐下難以維持坐姿", active: false },
          { label:"無法自行評估", active: false },
        ].map(({ label, active }, i) => (
          <div
            key={i}
            className={styles.phoneOption}
            style={{
              border:     `1px solid ${active ? C.primary : "#DDD"}`,
              color:      active ? "#fff" : "#555",
              background: active ? C.primary : "transparent",
            }}
          >
            {label}
          </div>
        ))}
        <div className={styles.phoneIllustrationRow}>
          <p className={styles.phoneIllustrationText}>可在平地自由行走，跑步及跳躍，運動能力沒有受人</p>
          <span className={styles.phoneIllustrationIcon}>🧍</span>
        </div>
        <div className={styles.phoneUrlBar}>assist-hub.vercel.app</div>
      </div>
    </div>
  );
}

// ── 桌面 Mockup — 建議單 ──────────────────────────────────────────────────────
function DesktopSuggestion({ parallaxRef }) {
  return (
    <div ref={parallaxRef} className={styles.desktopSuggestion}>
      <div className={styles.dsBrowserBar}>
        {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
          <div key={i} className={styles.dsTrafficDot} style={{ background: c }} />
        ))}
        <div className={styles.dsAddressBar}>
          assist-hub.vercel.app/suggest/AA425
        </div>
      </div>
      <div className={styles.dsContent}>
        <h4 className={styles.dsTitle}>建議單</h4>
        <div className={styles.dsInfoRow}>
          {["單號 AA425","建立日 2025-02-07","功能限制：行走需扶持穩定物","行動能力評估：行走需扶持穩定物"].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
        <p className={styles.dsRecommendLabel}>店家推薦輔具</p>
        {[
          { icon:"🦯", name:"【好舒】穩健手肘拐", price:"$380", tag:"推薦原因：行走能力下降但仍可自行站立，肘拐可提供穩定支撐..." },
          { icon:"♿", name:"【輝葉】輕型折疊輪椅", price:"$520", tag:"推薦原因：若病情加重，輪椅可作為備用方案，寬度 100cm 以內適用..." },
        ].map((item, i) => (
          <div key={i} className={styles.dsProductRow}>
            <div className={styles.dsProductIcon}>{item.icon}</div>
            <div className={styles.dsProductInfo}>
              <div className={styles.dsProductNameRow}>
                <span className={styles.dsProductName}>{item.name}</span>
                <span className={styles.dsProductPrice}>{item.price}</span>
              </div>
              <p className={styles.dsProductDesc}>{item.tag}</p>
              <button className={styles.dsAddCartBtn}>加入購車</button>
            </div>
          </div>
        ))}
        <div className={styles.dsShareRow}>
          <div className={styles.dsShareBtn}>分享建議單</div>
        </div>
      </div>
    </div>
  );
}

// ── 手機 Mockup — LINE 聊天 ──────────────────────────────────────────────────
function PhoneLine({ parallaxRef }) {
  return (
    <div ref={parallaxRef} className={styles.phoneLine}>
      <div className={styles.lineHeader}>
        <span className={styles.lineBadge}>99+</span>
        <span className={styles.lineTitle}>RENT4U 輔具租賃 💬</span>
      </div>
      <div className={styles.lineMessages}>
        {[
          { side:"left", text:"您好！您的詢問單 AA135 已回覆，建議單號為 AA135S，分享連結：\nhttps://assist-hub.vercel.app/suggest/AA135S", time:"15:07" },
          { side:"left", text:"您好！您的訂單編號為 202502050002，訂單狀態已更新：\n運送狀態：運送中\n更多細節請查閱「我的訂單」查看", time:"13:19" },
        ].map((msg, i) => (
          <div
            key={i}
            className={`${styles.lineMessageWrap} ${msg.side === "left" ? styles.lineMessageWrapLeft : styles.lineMessageWrapRight}`}
          >
            <div className={`${styles.lineMessageBubble} ${msg.side === "left" ? styles.lineMessageLeft : styles.lineMessageRight}`}>
              {msg.text}
            </div>
            <span className={styles.lineMessageTime}>{msg.time}</span>
          </div>
        ))}
      </div>
      <div className={styles.lineAppBar}>
        {["📦 我的訂單","💬 詢問","🏠 首頁"].map((t, i) => (
          <span key={i} className={`${styles.lineAppBarItem} ${i === 2 ? styles.lineAppBarItemActive : ""}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── 功能 Row 資料 ────────────────────────────────────────────────────────────
const FEATURE_ROWS = [
  {
    id:      "inquiry",
    side:    "right",
    label:   "Feature 01",
    title:   "詢問單功能設計",
    body:    "詢問單設計基於粗大動作評估系統的分級標準，涵蓋五種失能級別，確保使用者能夠按照自身的失能狀態進行輔具諮詢。此機制有助於店家更準確地理解使用者需求，避免資訊不對稱或無法確定使用者目前的失能級別，進而提供最合適的輔具建議。",
    checks:  null,
    MockupComponent: PhoneInquiry,
    bg:      "#FAFAFA",
  },
  {
    id:      "suggestion",
    side:    "left",
    label:   "Feature 02",
    title:   "建議單功能設計",
    body:    "為了讓使用者明確了解適合的輔具，建議單會根據使用者提供的失能級別與需求，由專業店家提供適配建議。",
    checks:  [
      "依據失能標準：確保輔具推薦符合使用者實際需求",
      "專業店家建議：根據使用者的身體狀況與未來可能的需求，提供客製化輔具建議",
      "個別輔具建議：詳細說明推薦輔具的適用情境，幫助使用者做出最佳選擇",
    ],
    MockupComponent: DesktopSuggestion,
    bg:      "#F4F2EF",
  },
  {
    id:      "line",
    side:    "right",
    label:   "Feature 03",
    title:   "Line 功能",
    body:    "讓年長使用者快速上手，提升互動與使用便利性。",
    checks:  ["LineLogin", "LinePay", "LineMessaging"],
    MockupComponent: PhoneLine,
    bg:      "#F0FAF4",
  },
];

// ── 功能 Row ──────────────────────────────────────────────────────────────────
function FeatureRow({ label, title, body, checks, MockupComponent, bg, side }) {
  const parallaxRef = useParallax(0.14);
  const isRight     = side === "right";

  const TextBlock = (
    <div className={`${styles.featureTextBlock} ${isRight ? styles.featureTextBlockRight : styles.featureTextBlockLeft}`}>
      <span className={styles.featureLabel}>{label}</span>
      <h3 className={styles.featureH3}>{title}</h3>
      <p className={styles.featureBody}>{body}</p>
      {checks && (
        <ul className={styles.featureChecks}>
          {checks.map((c, i) => (
            <li key={i} className={styles.featureCheckItem}>
              <span className={styles.featureCheckMark}>✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const MockupBlock = (
    <div className={styles.featureMockupBlock}>
      <MockupComponent parallaxRef={parallaxRef} />
    </div>
  );

  return (
    <div className={styles.featureRow} style={{ background: bg }}>
      {isRight ? <>{TextBlock}{MockupBlock}</> : <>{MockupBlock}{TextBlock}</>}
    </div>
  );
}


function SectionLogic() {
  const isDesktop = useIsDesktop();
  return (
    <section id="r4u-logic" className={styles.logicSection}>

      {/* ── 使用者流程 ── */}
      <div className={styles.logicUserFlowWrap}>
        <div className={styles.logicUserFlowInner}>

          <h2 className={styles.logicH2}>使用者流程</h2>

          {/* USER JOURNEY 時間軸 */}
          <div className={styles.journeyWrap}>
            {isDesktop ? (
              <>
                <div className={styles.journeyDesktopHeader}>
                  <div className={styles.journeyLine} />
                  <span className={styles.journeyLabel}>USER JOURNEY</span>
                  <div className={styles.journeyLine} />
                  <span className={styles.journeyArrow}>→</span>
                </div>
                <div className={styles.journeyPillsDesktop}>
                  {[
                    { label: "自評行為能力 GMFCS",                          dark: true  },
                    { label: "店家後台收到詢問單，給予客製化輔具建議",      dark: false },
                    { label: "用戶 LINE 收到通知",                          dark: true  },
                  ].map((step, i) => (
                    <div key={i} className={`${styles.journeyPill} ${step.dark ? styles.journeyPillDark : styles.journeyPillLight}`}>
                      {step.label}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.journeyMobileWrap}>
                <div className={styles.journeyMobileLeft}>
                  <div className={styles.journeyMobileLine} />
                  <span className={styles.journeyMobileLabel}>USER JOURNEY</span>
                  <div className={styles.journeyMobileLine} />
                  <span className={styles.journeyMobileArrow}>↓</span>
                </div>
                <div className={styles.journeyPillsMobile}>
                  {[
                    { label: "自評行為能力 GMFCS",                          dark: true  },
                    { label: "店家後台收到詢問單，給予客製化輔具建議",      dark: false },
                    { label: "用戶 LINE 收到通知",                          dark: true  },
                  ].map((step, i) => (
                    <div key={i} className={`${styles.journeyPill} ${step.dark ? styles.journeyPillDark : styles.journeyPillLight}`}>
                      {step.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 影片 mockup 框（粉紅背景） */}
          <div className={styles.videoMockup}>
            <div className={styles.videoMockupGrid} />
            <video
              autoPlay loop muted playsInline
              className={styles.videoMockupVideo}
            >
              <source src="/videos/user-journey.mov" type="video/quicktime" />
              <source src="/videos/user-journey.mov" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>

    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION IMPACT  (成效 · KPI)
// ─────────────────────────────────────────────────────────────────────────────

function SectionImpact() {
  const sectionRef = useRef(null);
  const isDesktop  = useIsDesktop();

  return (
    <section id="r4u-impact" ref={sectionRef} className={styles.impactSection}>

      {/* ── 設計核心 ─────────────────────────────────────────────────── */}
      <div className={styles.impactSubWrap}>
        <div className={styles.impactSubInner}>
          <h2 className={styles.impactH2}>設計核心</h2>
          <p className={styles.impactSubtitle}>
            我們透過<strong className={styles.impactStrong}>數位化GMFCS行動能力分級描述</strong>，打破地理限制，讓專業店家能透過
            <strong className={styles.impactStrong}>「遠端諮詢建議單」</strong>精準觸達家屬，消除 80% 的轉化缺口，透明化租賃體驗。
          </p>

          {/* ── Before → After 對比 ── */}
          <div className={styles.beforeAfterGrid}>

            {/* Before：紙本評估表 */}
            <div className={styles.beforeAfterCol}>
              <div className={styles.beforeAfterBadgeRow}>
                <span className={styles.badgeBefore}>Before</span>
                <span className={styles.badgeDesc}>傳統紙本評估表</span>
              </div>
              <div className={styles.beforeAfterImgWrap}>
                <img
                  src="/images/rent4u/inquiry-form.png"
                  alt="新北市長照輔具無障礙評估表—傳統紙本"
                  className={styles.beforeAfterImg}
                />
                <div className={styles.beforeAfterOverlay}>
                  <p className={styles.beforeAfterOverlayText}>
                    跨頁複雜表格、需專業人員協助填寫
                  </p>
                </div>
              </div>
            </div>

            {/* 箭頭 */}
            <div className={styles.beforeAfterArrow}>
              {isDesktop ? (
                <>
                  <div className={`${styles.beforeAfterArrowLine} ${styles.beforeAfterArrowLineH}`} />
                  <span className={`${styles.beforeAfterArrowIcon} ${styles.beforeAfterArrowIconDesktop}`}>→</span>
                  <div className={`${styles.beforeAfterArrowLine} ${styles.beforeAfterArrowLineH}`} />
                </>
              ) : (
                <>
                  <div className={`${styles.beforeAfterArrowLine} ${styles.beforeAfterArrowLineV}`} />
                  <span className={`${styles.beforeAfterArrowIcon} ${styles.beforeAfterArrowIconMobile}`}>↓</span>
                  <div className={`${styles.beforeAfterArrowLine} ${styles.beforeAfterArrowLineV}`} />
                </>
              )}
            </div>

            {/* After：實際操作影片 */}
            <div className={styles.beforeAfterCol}>
              <div className={styles.beforeAfterBadgeRow}>
                <span className={styles.badgeAfter}>After</span>
                <span className={styles.badgeDesc}>Rent4U 行動能力描述方法</span>
              </div>
              <div className={styles.beforeAfterImgWrapPlain}>
                <video autoPlay loop muted playsInline className={styles.beforeAfterImg}>
                  <source src="/videos/inquiry.mov" type="video/quicktime" />
                  <source src="/videos/inquiry.mov" type="video/mp4" />
                </video>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 設計演進 ─────────────────────────────────────────────────── */}
      <div className={styles.impactSubWrap}>
        <div className={styles.impactSubInner}>
          <h2 className={styles.impactH2}>設計演進</h2>

          <div className={styles.evolutionGrid}>
            {/* ❶ 手風琴 */}
            <div className={styles.evolutionItem}>
              <div className={styles.evolutionImgWrap}>
                <img src="/images/rent4u/gmfcs-accordion.webp" alt="手風琴選單設計" />
              </div>
              <div className={styles.evolutionCaption}>
                <div className={styles.evolutionNumRow}>
                  <span className={styles.evolutionNum}>1</span>
                  <h3 className={styles.evolutionH3}>手風琴</h3>
                </div>
                <p className={styles.evolutionDesc}>
                  每次展開僅能看見一個等級說明，選項之間無法相互比較。反覆收合切換的操作流程加重認知負荷，拉低決策效率。
                </p>
              </div>
            </div>

            {/* ❷ 圖文卡片 */}
            <div className={styles.evolutionItem}>
              <div className={styles.evolutionImgWrap}>
                <img src="/images/rent4u/gmfcs-card.webp" alt="圖文卡片設計" />
              </div>
              <div className={styles.evolutionCaption}>
                <div className={styles.evolutionNumRow}>
                  <span className={styles.evolutionNum}>2</span>
                  <h3 className={styles.evolutionH3}>圖文卡片</h3>
                </div>
                <p className={styles.evolutionDesc}>
                  圖片與說明排序，資訊更直觀易讀，但手機端六張卡片同時顯示時，造成文字過小難以辨識。
                </p>
              </div>
            </div>

            {/* ❸ 垂直標籤頁 */}
            <div className={styles.evolutionItem}>
              <div className={styles.evolutionImgWrap}>
                <img src="/images/rent4u/gmfcs-tabs.png" alt="垂直標籤頁設計" />
              </div>
              <div className={styles.evolutionCaption}>
                <div className={styles.evolutionNumRow}>
                  <span className={`${styles.evolutionNum} ${styles.evolutionNumAccent}`}>3</span>
                  <h3 className={styles.evolutionH3}>垂直標籤頁</h3>
                </div>
                <p className={styles.evolutionDesc}>
                  捨棄水平標籤——手機端需左右滑動，選擇困難。改為垂直排列後，使用者單指上下瀏覽即可快速選取，操作更直覺。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 建議單功能設計 ──────────────────────────────────────────── */}
      <div className={styles.impactSubWrap}>
        <div className={styles.impactSubInner}>
          <h3 className={styles.subH3}>建議單功能設計</h3>
          <div className={styles.subImgRounded}>
            <img
              src="/images/rent4u/jianyi.webp"
              alt="回覆建議單介面截圖"
            />
          </div>
        </div>
      </div>

      {/* ── 串連 LINE 系統 ────────────────────────────────────────────── */}
      <div className={styles.impactSubWrap}>
        <div className={styles.impactSubInner}>
          <h3 className={styles.subH3NoBotMargin}>串連 LINE 系統</h3>
          <p className={styles.lineSubtitle}>
            串連Line功能考慮到照護者的高壓力，我們捨棄複雜的 App，選擇 LINE 作為服務閉環，確保專業建議單能直接推送到家屬手中，確定輔具沒問題後，再進行線上租賃。
          </p>
          <img
            src="/images/rent4u/line.webp"
            alt="串連 LINE 系統截圖：Line Message、Line Login、Line Pay"
            className={styles.lineImg}
          />
        </div>
      </div>

      {/* ── 技術實踐與工作流 ── */}
      <div className={styles.impactSubWrap}>
        <div className={styles.impactSubInner}>
          <h2 className={styles.impactH2}>技術實踐與工作流</h2>
          <p className={styles.workflowSubtitle}>
            為了在四人開發團隊（1 設計、2 前端、1 後端）中極大化開發效率，我建立了同步開發工作流：
          </p>

          {/* 上排：2 欄 */}
          <div className={styles.workflowGrid}>
            <div className={styles.workflowCard}>
              <div className={styles.workflowImgOuter}>
                <div className={styles.workflowImgInner}>
                  <img src="/images/rent4u/notion-timeline.webp" alt="Notion 專案時程" />
                </div>
              </div>
              <div className={styles.workflowCaption}>
                <h3 className={styles.workflowH3}>Notion 專案時程</h3>
                <p className={styles.workflowDesc}>
                  透過時程里程碑（Milestones）落實設計交付節奏，並在前置階段對齊核心功能與 API 需求，極大化開發勤能。
                </p>
              </div>
            </div>

            <div className={styles.workflowCard}>
              <div className={styles.workflowImgOuter}>
                <div className={styles.workflowImgInner}>
                  <img src="/images/rent4u/notion-issues.webp" alt="Notion Issue 管理" />
                </div>
              </div>
              <div className={styles.workflowCaption}>
                <h3 className={styles.workflowH3}>Notion Issue 管理</h3>
                <p className={styles.workflowDesc}>
                  建立結構化的 Bug 與 Issue 管理系統。讓開發人員能即時回報技術限制，設計師則能針對 UI 修改快速對應。
                </p>
              </div>
            </div>
          </div>

          {/* 下排：全寬 */}
          <div className={styles.workflowCard}>
            <div className={styles.workflowImgOuter}>
              <div className={styles.workflowImgInnerNoBorder}>
                <img src="/images/rent4u/miro-ia.webp" alt="Miro 資訊架構與使用者地圖" />
              </div>
            </div>
            <div className={styles.workflowCaption}>
              <h3 className={styles.workflowH3}>Miro 資訊架構與使用者地圖</h3>
              <p className={styles.workflowDesc}>
                在進入 Figma 繪製介面前，先透過 Miro 梳理資訊架構 (IA) 與 User Journey Map。這有助於在初期就將「輔具維護」與「回收流程」等複雜邊緣定義清楚，減少後期技術重構的風險。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 設計系統 ─────────────────────────────────────────────── */}
      <div className={styles.impactSubWrap}>
        <div className={styles.impactSubInner}>
          <div className={styles.dsHeaderWrap}>
            <h2 className={styles.dsHeaderH2}>設計系統</h2>
            <p className={styles.dsHeaderDesc}>
              建立統一的品牌語言，涵蓋色彩系統、字體規範與 UI 元件庫，確保產品視覺一致性。
            </p>
          </div>
          <div className={styles.dsImgWrap}>
            <img
              src="/images/rent4u/design-guide.webp"
              alt="Rent4U 設計系統：品牌色彩、字體、元件庫"
              className={styles.dsImg}
            />
            <div className={styles.dsImgFade} />
          </div>
        </div>
      </div>

    </section>
  );
}

// ── SectionOutro（真實價值 + CTA）────────────────────────────────────────────
function SectionOutro() {
  return (
    <section className={styles.outroSection}>
      <div className={styles.outroValueWrap}>
        <div className={styles.outroGlow} />
        <div className={styles.outroInner}>
          <h2 className={styles.outroH2}>真實價值</h2>
          <div className={styles.outroGrid}>
            {[
              { icon: "https://www.figma.com/api/mcp/asset/a49c8661-9a5e-4a13-a26f-6c190fb7091a", img: "/images/rent4u/value-product.jpg", title: "使用者端", desc: "減少照護者的輔具選擇焦慮" },
              { icon: "https://www.figma.com/api/mcp/asset/e8151e66-ac37-4faf-8c96-375c284d79e4", img: "/images/rent4u/value-user.jpg",    title: "商業端",  desc: "預期提升 20% 線上租賃轉換率，並透過減少退換貨與優化流程，將庫存周轉率提高 15%。" },
              { icon: "https://www.figma.com/api/mcp/asset/50437282-d9bd-4a8a-b2d3-d3c7b6249d22", img: "/images/rent4u/value-business.png", title: "產品端",  desc: "這是一套「活的生命體」系統，未來可透過 ERP 數據回流，持續強化輔具推薦的智能程度。" },
            ].map((card, i) => (
              <div key={i} className={styles.outroCard}>
                <div className={styles.outroCardImgWrap}>
                  <img src={card.img} alt={card.title} className={styles.outroCardImg} />
                </div>
                <div className={styles.outroCardText}>
                  <div className={styles.outroCardTitleRow}>
                    <img src={card.icon} alt="" className={styles.outroCardIcon} />
                    <span className={styles.outroCardTitle}>{card.title}</span>
                  </div>
                  <p className={styles.outroCardDesc}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SectionStrategy ───────────────────────────────────────────────────────────
function SectionStrategy() {
  const isDesktop = useIsDesktop();
  return (
    <section className={styles.strategySection}>
      <div className={styles.strategyWrap}>
        <div className={styles.strategyInner}>
          <h2 className={styles.strategyH2}>商業策略</h2>
          <img
            src={isDesktop ? "/images/rent4u/biz-strategy.webp" : "/images/rent4u/biz-strategy-mobile.webp"}
            alt="商業策略：價值、供給、需求、財務"
            className={styles.strategyImg}
          />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function Rent4UScrollStory() {
  const [active, setActive] = useState("summary");

  // Noto Sans TC
  useEffect(() => {
    const id = "noto-sans-tc";
    if (document.getElementById(id)) return;
    const link = Object.assign(document.createElement("link"), {
      id,
      rel:  "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700;900&display=swap",
    });
    document.head.appendChild(link);
  }, []);

  // IntersectionObserver → active nav highlight
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (!visible.length) return;
        const mid = scrollEl.clientHeight / 2;
        const closest = visible.sort(
          (a, b) =>
            Math.abs(a.intersectionRect.top - mid) -
            Math.abs(b.intersectionRect.top - mid)
        )[0];
        setActive(closest.target.id.replace("r4u-", ""));
      },
      { root: scrollEl, rootMargin: "-20% 0px -20% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(`r4u-${id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className={styles.root}>
        <SectionSummary />
        <TopNav active={active} />
        <SectionResearch />
        <SectionLogic />
        <SectionImpact />
        <SectionStrategy />
        <SectionOutro />
      </div>

      {/* ── 固定 glass 按鈕（Portal → document.body） ── */}
      {createPortal(
        <>
          <a
            href="https://assist-hub.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.glassBtn} ${styles.glassBtnLeft}`}
          >
            前往網站 ↗
          </a>
          <button
            onClick={() => {
              const s = document.getElementById("main-scroll");
              const t = document.getElementById("r4u-summary");
              if (s && t) s.scrollTo({ top: t.offsetTop - 56, behavior: "smooth" });
            }}
            className={`${styles.glassBtn} ${styles.glassBtnRight}`}
          >
            ↑ 回到頂部
          </button>
        </>,
        document.body
      )}
    </>
  );
}
