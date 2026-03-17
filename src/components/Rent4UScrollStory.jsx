/**
 * Rent4U — 輔具租賃平台
 * ─────────────────────────────────────────────────────────────────────────────
 * TopNav (sticky, 4 anchors) + SectionSummary (Hero) + empty shells
 */

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "../hooks";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:   "#003795",   // 產品品牌藍（mockup 內部保留）
  secondary: "#FFC11A",   // 產品品牌黃（mockup 內部保留）
  accent:    "#E53E3E",   // 表格紅色狀態（mockup 內部保留）
  portalAccent: "#FF6200",// 首頁橙色 accent（portfolio frame 用）
  dark:      "#111111",
  dark2:     "#EBEBEA",
  light:     "#F5F4F2",
  white:     "#FFFFFF",
  gray:      "#6B6760",
  border:    "#D5D3CF",
};
const FONT = "Inter, 'Noto Sans TC', system-ui, sans-serif";

// ── Nav Items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "summary",  label: "需求洞察" },
  { id: "research", label: "設計核心" },
  { id: "logic",    label: "系統實踐" },
  { id: "impact",   label: "價值影響" },
];

// ── Hero Info Cards ───────────────────────────────────────────────────────────
const INFO_CARDS = [
  { label: "成果",     value: "輔具適配錯誤率降低 70%" },
  { label: "開發時程", value: "12 週" },
  { label: "團隊角色", value: "UXUI · PM" },
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
  const isDesktop = useIsDesktop();
  return (
    <nav
      style={{
        position:             "sticky",
        top:                  0,
        zIndex:               50,
        display:              "flex",
        alignItems:           "center",
        gap:                  2,
        padding:              isDesktop ? "0 32px" : "0 12px",
        height:               56,
        background:           "rgba(245,244,242,0.92)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom:         "1px solid #D5D3CF",
        fontFamily:           FONT,
        overflowX:            "auto",
      }}
    >
      {/* 左側 logo / 返回標示 */}
      <span
        style={{
          fontSize:      isDesktop ? 12 : 11,
          color:         "#ADADAB",
          letterSpacing: "0.12em",
          marginRight:   "auto",
          fontWeight:    300,
          textTransform: "uppercase",
          flexShrink:    0,
        }}
      >
        Rent4U
      </span>

      {/* 錨點按鈕 */}
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            style={{
              border:        isActive ? `1px solid ${C.portalAccent}55` : "1px solid transparent",
              cursor:        "pointer",
              padding:       isDesktop ? "5px 16px" : "4px 10px",
              borderRadius:  9999,
              fontSize:      isDesktop ? 13 : 11,
              fontWeight:    isActive ? 600 : 400,
              fontFamily:    FONT,
              color:         isActive ? C.portalAccent : "#6B6760",
              background:    isActive ? "rgba(255,98,0,0.08)" : "transparent",
              transition:    "all 0.2s ease",
              whiteSpace:    "nowrap",
              letterSpacing: "0.03em",
              flexShrink:    0,
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
    <div
      style={{
        width:          52,
        minWidth:       52,
        height:         66,
        background:     C.accent,
        borderRadius:   4,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        position:       "relative",
      }}
    >
      {/* TIME logo */}
      <span
        style={{
          fontSize:      9,
          fontWeight:    900,
          color:         "#fff",
          letterSpacing: "0.15em",
          position:      "absolute",
          top:           6,
        }}
      >
        TIME
      </span>
      {/* 封面圖模擬 */}
      <div
        style={{
          width:          "80%",
          height:         "55%",
          background:     "rgba(255,255,255,0.15)",
          borderRadius:   2,
          marginTop:      14,
        }}
      />
    </div>
  );
}

/** 單張 Info Card — 橫排 Stat Card (支援 dark 模式) */
function InfoCard({ label, value, dark = false }) {
  return (
    <div
      style={{
        flex:         1,
        minWidth:     130,
        padding:      "16px 24px",
        border:       "none",
        borderRadius: 8,
        background:   dark ? "#EBEBEA" : "transparent",
        fontFamily:   FONT,
      }}
    >
      <div
        style={{
          fontSize:      12,
          color:         "#ADADAB",
          fontWeight:    400,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight:    "15px",
          marginBottom:  12,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize:   16,
          fontWeight: 700,
          color:      "#111111",
          lineHeight: "33px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/** 產品網站截圖 Mockup（瀏覽器框 + 真實截圖） */
function ProductScreenshot() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <img
        src="/images/rent4u-hero.webp"
        alt="Rent4U 產品網站首頁截圖"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

// ── Hero Tags (all gold-bordered, matching Figma) ─────────────────────────────
const HERO_TAGS = ["Designer", "Project Manager", "2025"];

/** Hero Section 主體 — 深色主題版 (matching Figma) */
function IconPixelArrowLeft() {
  return <span style={{ fontSize: 13 }}>←</span>;
}

function SectionSummary() {
  const isDesktop = useIsDesktop();
  const navigate  = useNavigate();
  return (
    <section
      id="r4u-summary"
      style={{
        background: "#F5F4F2",
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* ── 1080px 置中容器 ── */}
      <div
        style={{
          maxWidth: 1080,
          margin:   "0 auto",
          width:    "100%",
          padding:  isDesktop ? "0" : "0 20px",
        }}
      >
        {/* ── 頂部列：← Projects ── */}
        <div style={{ padding: "24px 0 0" }}>
          <button
            onClick={() => navigate("/projects")}
            style={{
              display:     "inline-flex",
              alignItems:  "center",
              gap:         8,
              fontSize:    11,
              color:       "#6B6760",
              background:  "transparent",
              border:      "none",
              cursor:      "pointer",
              fontFamily:  "Menlo, monospace",
              letterSpacing: "0.08em",
              transition:  "color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#FF6200"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#6B6760"; }}
          >
            <IconPixelArrowLeft /> Projects
          </button>
        </div>

        {/* ── 主標題區塊 ── */}
        <div style={{ paddingTop: 32 }}>
          {/* Tags */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:24 }}>
            {HERO_TAGS.map(tag => (
              <span
                key={tag}
                style={{
                  background:    "transparent",
                  border:        "1px solid rgba(255,98,0,0.40)",
                  borderRadius:  9999,
                  padding:       "4px 12px",
                  fontSize:      14,
                  color:         "#FF6200",
                  letterSpacing: "0.057em",
                  fontFamily:    "Menlo, monospace",
                  lineHeight:    "15px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 主標題 */}
          <h1
            style={{
              fontSize:      "clamp(36px, 4.5vw, 60px)",
              fontWeight:    700,
              color:         "#111111",
              lineHeight:    1.1,
              letterSpacing: "-0.03em",
              margin:        "0 0 16px",
              fontFamily:    "Georgia, serif",
            }}
          >
            重塑輔具租賃：以GMFCS實現精準適配
          </h1>

          {/* 副標題 */}
          <p
            style={{
              margin:     "0 0 32px",
              fontSize:   16,
              color:      "#6B6760",
              lineHeight: 1.86,
              maxWidth:   620,
              fontFamily: FONT,
              fontWeight: 300,
            }}
          >
            從『租得到』到『租得對』：致力於簡化租賃流程，幫助使用者快速找到適合的輔具。
          </p>

          {/* Stat Cards */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:40 }}>
            {INFO_CARDS.map(card => (
              <InfoCard key={card.label} {...card} dark />
            ))}
          </div>
        </div>

        {/* ── 瀏覽器 Mockup（1080px 內全寬） ── */}
        <div
          style={{
            borderRadius: 17,
            overflow:     "hidden",
            boxShadow:    "0 8px 32px rgba(0,0,0,0.15)",
            maxWidth:     1080,
            width:        "100%",
          }}
        >
          <ProductScreenshot />
        </div>

        <div style={{ height: isDesktop ? 80 : 48 }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY SECTION SHELLS (待實作)
// ─────────────────────────────────────────────────────────────────────────────
function SectionShell({ id, bg, color = C.gray, label }) {
  return (
    <section
      id={`r4u-${id}`}
      style={{
        minHeight:      "100vh",
        background:     bg,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     FONT,
      }}
    >
      <span
        style={{
          fontSize:      13,
          color,
          opacity:       0.35,
          border:        `1px dashed ${color}`,
          borderRadius:  8,
          padding:       "8px 20px",
          letterSpacing: "0.05em",
        }}
      >
        [ {label} ]
      </span>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION RESEARCH  (設計流程)
// 子區塊 A — 問題陳述 "你真的選對輔具了嗎？"
// 子區塊 B — ResearchGrid 2×2 研究卡片 + hover 動效
// 配色遵循 6-3-1：60% 白底 / 30% 深色文字+暖灰邊框 / 10% 主色藍+紅強調
// ─────────────────────────────────────────────────────────────────────────────

// ── 對話氣泡 ──────────────────────────────────────────────────────────────────
function SpeechBubble({ text, align = "left", author }) {
  const isRight = align === "right";
  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    isRight ? "flex-end" : "flex-start",
        gap:           8,
      }}
    >
      <div
        style={{
          position:     "relative",
          background:   isRight ? "#EBEBEA" : "#E3E2DF",
          border:       `1px solid #D5D3CF`,
          borderRadius: isRight ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          padding:      "14px 18px",
          maxWidth:     300,
          boxShadow:    "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <p
          style={{
            fontSize:   14,
            color:      "#4A4540",
            lineHeight: 1.75,
            margin:     0,
            fontFamily: FONT,
          }}
        >
          {text}
        </p>
      </div>
      {author && (
        <span style={{ fontSize: 11, color: "#ADADAB", fontFamily: FONT, letterSpacing: "0.04em" }}>
          — {author}
        </span>
      )}
    </div>
  );
}

// ── 高亮文字片段（橙色 accent） ─────────────────────────────────────────────
function Highlight({ children }) {
  return (
    <span style={{ color: "#FF6200", fontWeight: 600 }}>{children}</span>
  );
}
// ── SectionResearch 主體 ───────────────────────────────────────────────────────
function SectionResearch() {
  const isDesktop = useIsDesktop();
  return (
    <section
      id="r4u-research"
      style={{ background: "#F5F4F2", fontFamily: FONT }}
    >
      {/* ── 子區塊 A：問題陳述 ─── */}
      <div style={{ padding: isDesktop ? "80px 40px" : "48px 20px", borderBottom: "1px solid #D5D3CF" }}>
      <div
        style={{
          maxWidth:            1080,
          margin:              "0 auto",
          display:             "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap:                 isDesktop ? 60 : 32,
          alignItems:          "center",
        }}
      >
        {/* 左：文字 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2
            style={{
              fontSize:   "clamp(26px, 2.8vw, 40px)",
              fontWeight: 700,
              color:      "#111111",
              lineHeight: 1.25,
              margin:     0,
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            你真的選對<br />
            <Highlight>輔具</Highlight>了嗎？
          </h2>
          <p style={{ fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0, maxWidth: 700, fontWeight: 400 }}>
            在照護情境中，家屬往往處於極度焦慮且需要情境不對稱的狀態。
            很多家屬租了病床卻忘了洗澡椅。我們發現 70% 的家庭在租借輔具時，
            因為<strong style={{ color: "#111111", fontWeight: 600 }}>缺乏情境聯想而產生照顧斷層</strong>。
          </p>
        </div>

        {/* 右：對話氣泡 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingLeft: isDesktop ? 20 : 0 }}>
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
      <div style={{ padding: isDesktop ? "80px 40px" : "48px 20px", borderBottom: "1px solid #D5D3CF" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* 標題 */}
        <h2
          style={{
            fontFamily:    "Georgia, serif",
            fontSize:      28,
            fontWeight:    700,
            color:         "#111111",
            margin:        "0 0 16px",
            letterSpacing: "-0.01em",
            lineHeight:    1.375,
          }}
        >
          研究與洞察
        </h2>

        {/* 副標題 */}
        <p
          style={{
            fontSize:   isDesktop ? 20 : 16,
            color:      "#4a4a4a",
            lineHeight: 1.8,
            margin:     "0 0 32px",
            fontFamily: FONT,
            fontWeight: 400,
            maxWidth:   700,
          }}
        >
          我們與兩位利害關係人線上訪談、研究三種競品分析。核心發現：
        </p>

        {/* Bullet points */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 56px" }}>
          <p style={{ fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0, fontFamily: FONT }}>
            • 數據警示：目前輔具市場面臨 80% 的用戶流失率，主因是
            <strong style={{ color: "#111111", fontWeight: 600 }}>線上評估與實體需求之間存在巨大的「資訊斷層」</strong>。
          </p>
          <p style={{ fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0, fontFamily: FONT }}>
            • 營運痛點：實體店家長期受限於地域邊界，在
            <strong style={{ color: "#111111", fontWeight: 600 }}>無法遠端掌握用戶能力</strong>
            的現況下，輔具資產周轉率難以優化，經營效率受限。
          </p>
        </div>

        {/* 2 欄圖片卡片 */}
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: 24 }}>

          {/* 市場研究 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ height: 417, borderRadius: 16, overflow: "hidden", width: "100%", flexShrink: 0, position: "relative" }}>
              <picture style={{ position: "absolute", width: "110.84%", height: "100%", left: "-5.42%", top: 0 }}>
                <source media="(max-width: 767px)" srcSet="/images/market-research-mobile.png" />
                <img
                  src="/images/market-research.webp"
                  alt="市場研究"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </picture>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h3
                style={{
                  fontFamily:    FONT,
                  fontSize:      20,
                  fontWeight:    500,
                  color:         "#111111",
                  margin:        0,
                  letterSpacing: "-0.48px",
                  lineHeight:    1.2,
                }}
              >
                市場研究
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
                目前的輔具平台因店家無法與使用者對其評估失能能力，大多仰賴線下轉介不僅地域性的限制，也造成使用者體驗斷層，患者與家人心情更加焦慮。
              </p>
            </div>
          </div>

          {/* 利害關係人訪談 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ height: 417, borderRadius: 16, overflow: "hidden", width: "100%", flexShrink: 0, position: "relative" }}>
              <img
                src="/images/stakeholder-interview.webp"
                alt="利害關係人訪談"
                style={{ position: "absolute", width: "110.84%", height: "100%", objectFit: "cover", left: "-5.42%", top: 0 }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h3
                style={{
                  fontFamily:    FONT,
                  fontSize:      20,
                  fontWeight:    500,
                  color:         "#111111",
                  margin:        0,
                  letterSpacing: "-0.48px",
                  lineHeight:    1.2,
                }}
              >
                利害關係人訪談
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
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
// 結構：標題 → 引言 → 兩段文字（帶紅色高亮）→ 全寬截圖
// ─────────────────────────────────────────────────────────────────────────────

/** 全寬截圖 Mockup（phone + admin 後台） */
function FullWidthMockup() {
  return (
    <div
      style={{
        width:      "100%",
        borderRadius: 16,
        overflow:   "hidden",
        background: "#D946B0",          /* 與截圖相同的洋紅桌布色 */
        position:   "relative",
        aspectRatio: "16/9",
        display:    "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap:        24,
        padding:    "40px 60px 0",
        boxShadow:  "0 24px 64px rgba(0,0,0,0.15)",
      }}
    >
      {/* 桌布紋路 (格點) */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* 手機 */}
      <div
        style={{
          width:        "22%",
          aspectRatio:  "9/19",
          background:   "#FFFFFF",
          borderRadius: "28px 28px 0 0",
          border:       "1.5px solid rgba(0,0,0,0.12)",
          overflow:     "hidden",
          position:     "relative",
          zIndex:       2,
          display:      "flex",
          flexDirection:"column",
          boxShadow:    "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* 狀態欄 */}
        <div
          style={{
            height:       32,
            background:   "#F8F8F8",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "space-between",
            padding:      "0 14px",
            fontSize:     10,
            color:        "#333",
            borderBottom: "1px solid #eee",
          }}
        >
          <span>12:16</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["📶","🔋"].map((i, k) => <span key={k}>{i}</span>)}
          </div>
        </div>
        {/* 問卷內容模擬 */}
        <div
          style={{
            flex:       1,
            padding:    "12px 10px",
            display:    "flex",
            flexDirection: "column",
            gap:        6,
          }}
        >
          <div style={{ fontSize: 9, color: "#333", lineHeight: 1.4, fontFamily: FONT }}>
            請選擇最符合目前行動能力的描述
          </div>
          {["具平地跑跳能力","在平地無法跑跳，但可快步行走","行走需扶持穩定物","無法行走，但能在無障礙支撐下維持坐姿"].map((opt, i) => (
            <div
              key={i}
              style={{
                border:       `1px solid ${i === 0 ? C.primary : "#DDD"}`,
                borderRadius: 6,
                padding:      "5px 8px",
                fontSize:     9,
                color:        i === 0 ? "#fff" : "#555",
                background:   i === 0 ? C.primary : "transparent",
                fontFamily:   FONT,
                textAlign:    "center",
              }}
            >
              {opt}
            </div>
          ))}
          {/* 小人圖示 */}
          <div
            style={{
              flex:           1,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              opacity:        0.3,
              fontSize:       28,
            }}
          >
            🧍
          </div>
          {/* 底部網址欄 */}
          <div
            style={{
              height:       20,
              background:   "#F2F2F2",
              borderRadius: 4,
              display:      "flex",
              alignItems:   "center",
              padding:      "0 6px",
              fontSize:     8,
              color:        "#888",
            }}
          >
            assist-hub.vercel.app
          </div>
        </div>
      </div>

      {/* 桌面後台管理截圖 */}
      <div
        style={{
          width:        "62%",
          aspectRatio:  "16/10",
          background:   "#FFFFFF",
          borderRadius: "10px 10px 0 0",
          border:       "1.5px solid rgba(0,0,0,0.10)",
          overflow:     "hidden",
          zIndex:       1,
          display:      "flex",
          flexDirection:"column",
          boxShadow:    "0 8px 32px rgba(0,0,0,0.20)",
        }}
      >
        {/* 瀏覽器頂欄 */}
        <div
          style={{
            height:       28,
            background:   "#F0F0F0",
            display:      "flex",
            alignItems:   "center",
            gap:          6,
            padding:      "0 10px",
            borderBottom: "1px solid #DDD",
          }}
        >
          {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
          <div
            style={{
              flex:         1,
              height:       16,
              background:   "#E0E0E0",
              borderRadius: 4,
              margin:       "0 8px",
              display:      "flex",
              alignItems:   "center",
              paddingLeft:  8,
              fontSize:     9,
              color:        "#666",
            }}
          >
            assist-hub.vercel.app/admin/suggests
          </div>
        </div>
        {/* 表格內容 */}
        <div style={{ flex: 1, overflow: "hidden", padding: "10px 12px" }}>
          {/* 頁籤 */}
          <div style={{ display: "flex", gap: 16, marginBottom: 8, fontSize: 9, color: "#555", fontFamily: FONT }}>
            <span style={{ color: C.accent, fontWeight: 700 }}>全部 134</span>
            <span>未回覆 101</span>
            <span style={{ color: "#1A7F5A" }}>✓ 已回覆 33</span>
          </div>
          {/* 表格 header */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "80px 60px 60px 100px 140px 70px",
              gap:                 4,
              padding:             "4px 0",
              borderBottom:        "1px solid #EEE",
              fontSize:            8,
              color:               "#999",
              fontFamily:          FONT,
            }}
          >
            {["詢問單狀態","詢問單","建議單","名稱","信箱","收件日期"].map(h => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {/* 表格 rows */}
          {[
            ["尚未回覆","AA153","前往回覆","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["尚未回覆","AA152","前往回覆","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["已回覆","AA151","AA151S","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["已回覆","AA150","AA150S","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["尚未回覆","AA148","前往回覆","江品學","frank79530@gmail.com","2026-01-06"],
          ].map((row, ri) => (
            <div
              key={ri}
              style={{
                display:             "grid",
                gridTemplateColumns: "80px 60px 60px 100px 140px 70px",
                gap:                 4,
                padding:             "4px 0",
                borderBottom:        "1px solid #F5F5F5",
                fontSize:            8,
                color:               "#444",
                fontFamily:          FONT,
              }}
            >
              {row.map((cell, ci) => (
                <span
                  key={ci}
                  style={{
                    color: cell === "前往回覆" ? C.accent : cell === "已回覆" ? "#1A7F5A" : "inherit",
                    fontWeight: (cell === "前往回覆" || cell === "已回覆") ? 600 : 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
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
// SECTION LOGIC  (Mock up · 功能展示)
// 3 個功能區塊，每塊左右交替 + 視差滾動
// ─────────────────────────────────────────────────────────────────────────────

/** 視差 hook — 在 #main-scroll 捲動時，以 speed 倍數位移 */
function useParallax(speed = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;
    const update = () => {
      if (!ref.current) return;
      const elTop    = ref.current.getBoundingClientRect().top;
      const rootTop  = scrollEl.getBoundingClientRect().top;
      const relY     = elTop - rootTop - scrollEl.clientHeight / 2;
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
    <div
      ref={parallaxRef}
      style={{
        width:        280,
        aspectRatio:  "9/19",
        background:   "#FFFFFF",
        borderRadius: 32,
        border:       "2px solid rgba(0,0,0,0.10)",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        boxShadow:    "0 24px 64px rgba(0,0,0,0.18)",
        flexShrink:   0,
      }}
    >
      {/* 狀態欄 */}
      <div style={{ height:28, background:"#F8F8F8", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", fontSize:10, color:"#333", borderBottom:"1px solid #EEE" }}>
        <span style={{ fontWeight:600 }}>12:16</span>
        <span>📶 🔋</span>
      </div>
      {/* 問卷 */}
      <div style={{ flex:1, padding:"14px 12px", display:"flex", flexDirection:"column", gap:8, overflow:"hidden" }}>
        <p style={{ fontSize:10, color:"#333", lineHeight:1.5, margin:0, fontFamily:FONT }}>請選擇最符合目前行動能力的描述（單選）：</p>
        {[
          { label:"具平地跑跳能力", active: true },
          { label:"在平地無法跑跳，但可快步行走", active: false },
          { label:"行走需扶持穩定物", active: false },
          { label:"無法行走，但能在無障礙支撐下維持坐姿", active: false },
          { label:"無鎮暴支撐下難以維持坐姿", active: false },
          { label:"無法自行評估", active: false },
        ].map(({ label, active }, i) => (
          <div key={i} style={{ border:`1px solid ${active ? C.primary : "#DDD"}`, borderRadius:6, padding:"6px 8px", fontSize:9, color: active ? "#fff" : "#555", background: active ? C.primary : "transparent", fontFamily:FONT, textAlign:"center" }}>
            {label}
          </div>
        ))}
        {/* 小人插圖 */}
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:8, paddingTop:4 }}>
          <p style={{ fontSize:8, color:"#AAA", lineHeight:1.4, margin:0, fontFamily:FONT, maxWidth:100, textAlign:"right" }}>可在平地自由行走，跑步及跳躍，運動能力沒有受人</p>
          <span style={{ fontSize:32 }}>🧍</span>
        </div>
        {/* 底欄 */}
        <div style={{ height:18, background:"#F2F2F2", borderRadius:4, display:"flex", alignItems:"center", padding:"0 8px", fontSize:8, color:"#888", fontFamily:FONT }}>
          assist-hub.vercel.app
        </div>
      </div>
    </div>
  );
}

// ── 桌面 Mockup — 建議單 ──────────────────────────────────────────────────────
function DesktopSuggestion({ parallaxRef }) {
  return (
    <div
      ref={parallaxRef}
      style={{
        width:        520,
        background:   "#FFFFFF",
        borderRadius: 12,
        border:       "1.5px solid rgba(0,0,0,0.10)",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        boxShadow:    "0 24px 64px rgba(0,0,0,0.14)",
        flexShrink:   0,
      }}
    >
      {/* 瀏覽器欄 */}
      <div style={{ height:28, background:"#F0F0F0", display:"flex", alignItems:"center", gap:6, padding:"0 10px", borderBottom:"1px solid #DDD" }}>
        {["#FF5F57","#FFBD2E","#28C840"].map((c,i)=>(
          <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c }} />
        ))}
        <div style={{ flex:1, height:16, background:"#E0E0E0", borderRadius:4, margin:"0 8px", display:"flex", alignItems:"center", paddingLeft:8, fontSize:9, color:"#666" }}>
          assist-hub.vercel.app/suggest/AA425
        </div>
      </div>
      {/* 建議單內容 */}
      <div style={{ padding:"14px 16px" }}>
        {/* 標題 */}
        <h4 style={{ fontSize:13, fontWeight:700, color:"#111", textAlign:"center", margin:"0 0 10px", fontFamily:FONT }}>建議單</h4>
        {/* 詢問單資訊 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:4, background:"#F8F8F8", borderRadius:6, padding:"6px 8px", marginBottom:10, fontSize:8, color:"#666", fontFamily:FONT }}>
          {["單號 AA425","建立日 2025-02-07","功能限制：行走需扶持穩定物","行動能力評估：行走需扶持穩定物"].map((t,i)=><span key={i}>{t}</span>)}
        </div>
        {/* 店家推薦輔具 */}
        <p style={{ fontSize:9, fontWeight:700, color:"#111", margin:"0 0 6px", fontFamily:FONT }}>店家推薦輔具</p>
        {[
          { icon:"🦯", name:"【好舒】穩健手肘拐", price:"$380", tag:"推薦原因：行走能力下降但仍可自行站立，肘拐可提供穩定支撐..." },
          { icon:"♿", name:"【輝葉】輕型折疊輪椅", price:"$520", tag:"推薦原因：若病情加重，輪椅可作為備用方案，寬度 100cm 以內適用..." },
        ].map((item, i) => (
          <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"6px", border:"1px solid #EEE", borderRadius:6, marginBottom:6 }}>
            <div style={{ width:36, height:36, background:"#F5F5F5", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{item.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:9, fontWeight:700, color:"#111", fontFamily:FONT }}>{item.name}</span>
                <span style={{ fontSize:9, color:C.accent, fontWeight:700, fontFamily:FONT }}>{item.price}</span>
              </div>
              <p style={{ fontSize:8, color:"#777", lineHeight:1.4, margin:"2px 0 0", fontFamily:FONT }}>{item.tag}</p>
              <button style={{ marginTop:4, padding:"2px 8px", background:C.primary, color:"#fff", border:"none", borderRadius:4, fontSize:8, fontFamily:FONT, cursor:"default" }}>加入購車</button>
            </div>
          </div>
        ))}
        {/* 分享 */}
        <div style={{ display:"flex", justifyContent:"center", marginTop:6 }}>
          <div style={{ padding:"4px 16px", border:`1px solid ${C.primary}`, borderRadius:9999, fontSize:8, color:C.primary, fontFamily:FONT }}>分享建議單</div>
        </div>
      </div>
    </div>
  );
}

// ── 手機 Mockup — LINE 聊天 ──────────────────────────────────────────────────
function PhoneLine({ parallaxRef }) {
  return (
    <div
      ref={parallaxRef}
      style={{
        width:        260,
        aspectRatio:  "9/18",
        background:   "#EFEFF4",
        borderRadius: 28,
        border:       "2px solid rgba(0,0,0,0.10)",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        boxShadow:    "0 24px 64px rgba(0,0,0,0.18)",
        flexShrink:   0,
      }}
    >
      {/* LINE header */}
      <div style={{ height:32, background:"#06C755", display:"flex", alignItems:"center", padding:"0 12px", gap:8 }}>
        <span style={{ fontSize:10, fontWeight:700, color:"#fff", fontFamily:FONT }}>99+</span>
        <span style={{ fontSize:10, color:"#fff", fontFamily:FONT, flex:1, textAlign:"center" }}>RENT4U 輔具租賃 💬</span>
      </div>
      {/* 對話訊息 */}
      <div style={{ flex:1, padding:"10px 10px", display:"flex", flexDirection:"column", gap:8, overflow:"hidden" }}>
        {[
          { side:"left", text:"您好！您的詢問單 AA135 已回覆，建議單號為 AA135S，分享連結：\nhttps://assist-hub.vercel.app/suggest/AA135S", time:"15:07" },
          { side:"left", text:"您好！您的訂單編號為 202502050002，訂單狀態已更新：\n運送狀態：運送中\n更多細節請查閱「我的訂單」查看", time:"13:19" },
        ].map((msg, i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:msg.side==="left"?"flex-start":"flex-end", gap:2 }}>
            <div style={{ background: msg.side==="left" ? "#fff" : "#06C755", borderRadius: msg.side==="left" ? "4px 12px 12px 12px" : "12px 4px 12px 12px", padding:"6px 8px", maxWidth:"80%", fontSize:8, color: msg.side==="left" ? "#333" : "#fff", lineHeight:1.5, fontFamily:FONT, whiteSpace:"pre-line" }}>
              {msg.text}
            </div>
            <span style={{ fontSize:7, color:"#AAA" }}>{msg.time}</span>
          </div>
        ))}
      </div>
      {/* 底部 app bar */}
      <div style={{ height:40, background:"#fff", borderTop:"1px solid #EEE", display:"flex", alignItems:"center", justifyContent:"space-around", padding:"0 8px" }}>
        {["📦 我的訂單","💬 詢問","🏠 首頁"].map((t,i)=>(
          <span key={i} style={{ fontSize:8, color:i===2?C.primary:"#888", fontFamily:FONT }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── 功能 Row 資料 ────────────────────────────────────────────────────────────
const FEATURE_ROWS = [
  {
    id:      "inquiry",
    side:    "right",              // mockup 在右
    label:   "Feature 01",
    title:   "詢問單功能設計",
    body:    "詢問單設計基於粗大動作評估系統的分級標準，涵蓋五種失能級別，確保使用者能夠按照自身的失能狀態進行輔具諮詢。此機制有助於店家更準確地理解使用者需求，避免資訊不對稱或無法確定使用者目前的失能級別，進而提供最合適的輔具建議。",
    checks:  null,
    MockupComponent: PhoneInquiry,
    bg:      "#FAFAFA",
  },
  {
    id:      "suggestion",
    side:    "left",               // mockup 在左
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
  const isRight = side === "right";
  const isDesktop = useIsDesktop();

  const TextBlock = (
    <div
      style={{
        flex:          "1 1 280px",
        display:       "flex",
        flexDirection: "column",
        gap:           18,
        justifyContent:"center",
        padding:       isDesktop ? (isRight ? "0 40px 0 0" : "0 0 0 40px") : "0",
      }}
    >
      <span style={{ fontSize:11, fontWeight:600, color:"#FF6200", letterSpacing:"0.12em", textTransform:"uppercase" }}>
        {label}
      </span>
      <h3 style={{ fontSize:"clamp(22px,2.4vw,32px)", fontWeight:800, color:"#111", margin:0, lineHeight:1.25, fontFamily:FONT }}>
        {title}
      </h3>
      <p style={{ fontSize:16, color:"#4a4a4a", lineHeight:1.8, margin:0, fontFamily:FONT }}>
        {body}
      </p>
      {checks && (
        <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
          {checks.map((c, i) => (
            <li key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", fontSize:13, color:"#444", fontFamily:FONT, lineHeight:1.5 }}>
              <span style={{ color:"#FF6200", fontWeight:700, flexShrink:0 }}>✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const MockupBlock = (
    <div
      style={{
        flex:           "1 1 260px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        padding:        isDesktop ? "40px 0" : "24px 0 0",
      }}
    >
      <MockupComponent parallaxRef={parallaxRef} />
    </div>
  );

  return (
    <div
      style={{
        background:    bg,
        padding:       isDesktop ? "80px 40px" : "48px 20px",
        display:       "flex",
        flexDirection: isDesktop ? "row" : "column",
        gap:           isDesktop ? 40 : 0,
        alignItems:    "center",
        minHeight:     isDesktop ? 520 : "auto",
      }}
    >
      {isRight ? <>{TextBlock}{MockupBlock}</> : <>{MockupBlock}{TextBlock}</>}
    </div>
  );
}


function SectionLogic() {
  const isDesktop = useIsDesktop();
  return (
    <section id="r4u-logic" style={{ fontFamily: FONT }}>

      {/* ── 使用者流程 ── */}
      <div style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* 標題 */}
          <h2
            style={{
              fontFamily:    "Georgia, serif",
              fontSize:      isDesktop ? 24 : 20,
              fontWeight:    700,
              color:         "#111111",
              margin:        "0 0 40px",
              letterSpacing: "-0.01em",
              lineHeight:    1.375,
            }}
          >
            使用者流程
          </h2>

          {/* USER JOURNEY 時間軸 */}
          <div style={{ marginBottom: 48 }}>
            {isDesktop ? (
              /* ── Desktop：水平 線＋標籤＋線＋箭頭 ── */
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ flex: 1, height: 1, background: "#111" }} />
                  <span style={{ fontSize: 10, color: "#888", letterSpacing: "0.16em", fontFamily: "Menlo, monospace", whiteSpace: "nowrap" }}>
                    USER JOURNEY
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#111" }} />
                  <span style={{ fontSize: 14, color: "#111", lineHeight: 1 }}>→</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 12 }}>
                  {[
                    { label: "自評行為能力 GMFCS",                              dark: true  },
                    { label: "店家後台收到詢問單，給予客製化輔具建議",        dark: false },
                    { label: "用戶 LINE 收到通知",                            dark: true  },
                  ].map((step, i) => (
                    <div key={i} style={{ padding: "14px 20px", background: step.dark ? "#FF6200" : "transparent", border: `1.5px solid ${step.dark ? "#FF6200" : "#D5D3CF"}`, borderRadius: 9999, textAlign: "center", fontSize: 14, fontWeight: step.dark ? 600 : 400, color: step.dark ? "#FFFFFF" : "#6B6760", fontFamily: FONT, lineHeight: 1.4 }}>
                      {step.label}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* ── Mobile：左側垂直標籤＋箭頭，右側 pills ── */
              <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
                {/* 左：垂直線 ＋ USER JOURNEY ＋ 垂直線 ＋ ↓ */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, width: 1, background: "#111" }} />
                  <span style={{ fontSize: 9, color: "#888", letterSpacing: "0.14em", fontFamily: "Menlo, monospace", writingMode: "vertical-lr", textOrientation: "mixed", whiteSpace: "nowrap" }}>
                    USER JOURNEY
                  </span>
                  <div style={{ flex: 1, width: 1, background: "#111" }} />
                  <span style={{ fontSize: 14, color: "#111", lineHeight: 1 }}>↓</span>
                </div>
                {/* 右：pills */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "自評行為能力 GMFCS",                              dark: true  },
                    { label: "店家後台收到詢問單，給予客製化輔具建議",        dark: false },
                    { label: "用戶 LINE 收到通知",                            dark: true  },
                  ].map((step, i) => (
                    <div key={i} style={{ padding: "14px 20px", background: step.dark ? "#FF6200" : "transparent", border: `1.5px solid ${step.dark ? "#FF6200" : "#D5D3CF"}`, borderRadius: 9999, textAlign: "center", fontSize: 14, fontWeight: step.dark ? 600 : 400, color: step.dark ? "#FFFFFF" : "#6B6760", fontFamily: FONT, lineHeight: 1.4 }}>
                      {step.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 影片 mockup 框（粉紅背景） */}
          <div
            style={{
              width:          "100%",
              borderRadius:   "16px 16px 0 0",
              overflow:       "hidden",
              background:     "#D946B0",
              aspectRatio:    "16/9",
              position:       "relative",
              boxShadow:      "0 -8px 40px rgba(217,70,176,0.20)",
            }}
          >
            {/* 格點裝飾 */}
            <div
              style={{
                position:        "absolute",
                inset:           0,
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize:  "28px 28px",
                pointerEvents:   "none",
                zIndex:          1,
              }}
            />
            {/* 影片 */}
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position:   "absolute",
                inset:      0,
                width:      "100%",
                height:     "100%",
                objectFit:  "cover",
                zIndex:     2,
              }}
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
// 暗色底 · count-up 動畫 · 4 個核心指標 · 收尾反思
// ─────────────────────────────────────────────────────────────────────────────

// ── Value Data ─────────────────────────────────────────────────────────────

function SectionImpact() {
  const sectionRef = useRef(null);
  const isDesktop = useIsDesktop();

  return (
    <section
      id="r4u-impact"
      ref={sectionRef}
      style={{ fontFamily:FONT, background:"#fff" }}
    >
      {/* ── 詢問單功能設計（影片） ───────────────────────────────────── */}
      <div style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 16px", letterSpacing: "-0.5px" }}>
            設計核心
          </h2>
          <p style={{ fontSize: isDesktop ? 20 : 16, color: "#4a4a4a", lineHeight: 1.8, margin: "0 0 48px", fontFamily: FONT, fontWeight: 400, maxWidth: 700 }}>
            我們透過<strong style={{ color: "#111111", fontWeight: 600 }}>數位化GMFCS行動能力分級描述</strong>，打破地理限制，讓專業店家能透過
            <strong style={{ color: "#111111", fontWeight: 600 }}>「遠端諮詢建議單」</strong>精準觸達家屬，消除 80% 的轉化缺口，透明化租賃體驗。
          </p>

          {/* ── Before → After 對比 ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr auto 1fr" : "1fr",
            gap: isDesktop ? 0 : 24,
            alignItems: "center",
            margin: "0 0 48px",
          }}>

            {/* Before：紙本評估表 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                  textTransform: "uppercase", fontFamily: "Menlo, monospace",
                  color: "#999", background: "#F0EDE8",
                  padding: "4px 10px", borderRadius: 4,
                }}>
                  Before
                </span>
                <span style={{ fontSize: 13, color: "#6B6760", fontFamily: FONT }}>
                  傳統紙本評估表
                </span>
              </div>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                border: "1px solid #E8E5E0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                position: "relative",
              }}>
                <img
                  src="/images/inquiry-form.png"
                  alt="新北市長照輔具無障礙評估表—傳統紙本"
                  style={{ width: "100%", display: "block" }}
                />
                {/* 說明 overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
                  display: "flex", alignItems: "flex-end", padding: "20px 16px",
                }}>
                  <p style={{
                    fontSize: 13, color: "#fff", lineHeight: 1.6,
                    margin: 0, fontFamily: FONT,
                  }}>
                    跨頁複雜表格、需專業人員協助填寫
                  </p>
                </div>
              </div>
            </div>

            {/* 箭頭 */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: isDesktop ? "0 28px" : "8px 0",
              flexDirection: isDesktop ? "row" : "column",
            }}>
              <div style={{
                width: isDesktop ? 40 : 1,
                height: isDesktop ? 1 : 32,
                background: "#FF6200", opacity: 0.4,
              }} />
              <span style={{ fontSize: 20, color: "#FF6200", lineHeight: 1, margin: isDesktop ? "0 4px" : "4px 0" }}>
                {isDesktop ? "→" : "↓"}
              </span>
              <div style={{
                width: isDesktop ? 40 : 1,
                height: isDesktop ? 1 : 32,
                background: "#FF6200", opacity: 0.4,
              }} />
            </div>

            {/* After：實際操作影片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                  textTransform: "uppercase", fontFamily: "Menlo, monospace",
                  color: "#fff", background: "#FF6200",
                  padding: "4px 10px", borderRadius: 4,
                }}>
                  After
                </span>
                <span style={{ fontSize: 13, color: "#6B6760", fontFamily: FONT }}>
                  Rent4U 行動能力描述方法
                </span>
              </div>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                border: "1px solid #E8E5E0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}>
                <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                  <source src="/videos/inquiry.mov" type="video/quicktime" />
                  <source src="/videos/inquiry.mov" type="video/mp4" />
                </video>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 設計演進 ─────────────────────────────────────────────────── */}
      <div style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 48px", letterSpacing: "-0.5px" }}>
            設計演進
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr 1fr" : "1fr", gap: 32 }}>

            {/* ❶ 手風琴 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E8E5E0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <img src="/images/gmfcs-accordion.webp" alt="手風琴選單設計" style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#111", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</span>
                  <h3 style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: "#111", margin: 0, letterSpacing: "-0.3px" }}>手風琴</h3>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 15, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
                  每次展開僅能看見一個等級說明，選項之間無法相互比較。反覆收合切換的操作流程加重認知負荷，拉低決策效率。
                </p>
              </div>
            </div>

            {/* ❷ 圖文卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E8E5E0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <img src="/images/gmfcs-card.webp" alt="圖文卡片設計" style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#111", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</span>
                  <h3 style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: "#111", margin: 0, letterSpacing: "-0.3px" }}>圖文卡片</h3>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 15, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
                  圖片與說明排序，資訊更直觀易讀，但手機端六張卡片同時顯示時，造成文字過小難以辨識。
                </p>
              </div>
            </div>

            {/* ❸ 垂直標籤頁 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E8E5E0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <img src="/images/gmfcs-tabs.png" alt="垂直標籤頁設計" style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#FF6200", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>3</span>
                  <h3 style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: "#111", margin: 0, letterSpacing: "-0.3px" }}>垂直標籤頁</h3>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 15, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
                  捨棄水平標籤——手機端需左右滑動，選擇困難。改為垂直排列後，使用者單指上下瀏覽即可快速選取，操作更直覺。
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 建議單功能設計（3 欄：左說明、中截圖、右標注） ──────────── */}
      <div style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h3 style={{ fontSize: 20, fontWeight: 500, color: "#111", margin: "0 0 32px", fontFamily: FONT, letterSpacing: "-0.3px" }}>
            建議單功能設計
          </h3>

          {/* 截圖主體 */}
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <img
              src="/images/jianyi.webp"
              alt="回覆建議單介面截圖"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
      </div>

      {/* ── 串連 LINE 系統（影片佔位） ──────────────────────────────── */}
      <div style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h3 style={{ fontSize: 20, fontWeight: 500, color: "#111", margin: "0 0 16px", fontFamily: FONT, letterSpacing: "-0.3px" }}>
            串連 LINE 系統
          </h3>
          <p style={{ fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: "0 0 40px", fontFamily: FONT }}>
            串連Line功能考慮到照護者的高壓力，我們捨棄複雜的 App，選擇 LINE 作為服務閉環，確保專業建議單能直接推送到家屬手中，確定輔具沒問題後，再進行線上租賃。
          </p>
          <img
            src="/images/line.webp"
            alt="串連 LINE 系統截圖：Line Message、Line Login、Line Pay"
            style={{ width: "100%", display: "block", borderRadius: 12 }}
          />
        </div>
      </div>

      {/* ── 設計系統 ─────────────────────────────────────────────── */}
      <div style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {/* 標題區 */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 16px", fontFamily: "Georgia, serif", letterSpacing: "-0.5px" }}>設計系統</h2>
            <p style={{ fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0, fontFamily: FONT }}>
              建立統一的品牌語言，涵蓋色彩系統、字體規範與 UI 元件庫，確保產品視覺一致性。
            </p>
          </div>
          {/* 截圖 */}
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid #E8E8E8", position: "relative" }}>
            <img
              src="/images/design-guide.webp"
              alt="Rent4U 設計系統：品牌色彩、字體、元件庫"
              style={{ width: "100%", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "33%",
              background: "linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 100%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </div>

      {/* ── 技術實踐與工作流 ── */}
      <div style={{ background: "#FFFFFF", padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 16px", letterSpacing: "-0.5px" }}>
            技術實踐與工作流
          </h2>
          <p style={{ fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: "0 0 48px", fontFamily: FONT, maxWidth: 700 }}>
            為了在四人開發團隊（1 設計、2 前端、1 後端）中極大化開發效率，我建立了同步開發工作流：
          </p>

          {/* 上排：2 欄 */}
          <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: 24, marginBottom: 24 }}>

            {/* Notion 專案時程 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#F5F4F2", borderRadius: 16, padding: 8 }}>
                <div style={{ height: 224, borderRadius: 10, overflow: "hidden", border: "1px solid #eeeeee" }}>
                  <img src="/images/notion-timeline.webp" alt="Notion 專案時程" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 500, color: "#111111", margin: 0, letterSpacing: "-0.48px", lineHeight: 1.2 }}>
                  Notion 專案時程
                </h3>
                <p style={{ fontFamily: FONT, fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
                  透過時程里程碑（Milestones）落實設計交付節奏，並在前置階段對齊核心功能與 API 需求，極大化開發勤能。
                </p>
              </div>
            </div>

            {/* Notion Issue 管理 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#F5F4F2", borderRadius: 16, padding: 8 }}>
                <div style={{ height: 224, borderRadius: 10, overflow: "hidden", border: "1px solid #eeeeee" }}>
                  <img src="/images/notion-issues.webp" alt="Notion Issue 管理" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 500, color: "#111111", margin: 0, letterSpacing: "-0.48px", lineHeight: 1.2 }}>
                  Notion Issue 管理
                </h3>
                <p style={{ fontFamily: FONT, fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
                  建立結構化的 Bug 與 Issue 管理系統。讓開發人員能即時回報技術限制，設計師則能針對 UI 修改快速對應。
                </p>
              </div>
            </div>

          </div>

          {/* 下排：全寬 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#F5F4F2", borderRadius: 16, padding: 8 }}>
              <div style={{ height: 224, borderRadius: 10, overflow: "hidden" }}>
                <img src="/images/miro-ia.webp" alt="Miro 資訊架構與使用者地圖" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 500, color: "#111111", margin: 0, letterSpacing: "-0.48px", lineHeight: 1.2 }}>
                Miro 資訊架構與使用者地圖
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 16, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>
                在進入 Figma 繪製介面前，先透過 Miro 梳理資訊架構 (IA) 與 User Journey Map。這有助於在初期就將「輔具維護」與「回收流程」等複雜邊緣定義清楚，減少後期技術重構的風險。
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

// ── SectionOutro（真實價值 + CTA）────────────────────────────────────────────
function SectionOutro() {
  const isDesktop = useIsDesktop();
  return (
    <section style={{ fontFamily: FONT }}>
      <div style={{ background: "#EBEBEA", padding: isDesktop ? "80px 40px" : "48px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "35%", height: "35%", background: "radial-gradient(circle, rgba(255,98,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* 真實價值 */}
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 32px", fontFamily: "Georgia, serif", letterSpacing: "-0.5px" }}>
            真實價值
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr", gap: 24 }}>
            {[
              { icon: "https://www.figma.com/api/mcp/asset/a49c8661-9a5e-4a13-a26f-6c190fb7091a", img: "/images/value-product.jpg", title: "使用者端", desc: "減少照護者的輔具選擇焦慮" },
              { icon: "https://www.figma.com/api/mcp/asset/e8151e66-ac37-4faf-8c96-375c284d79e4", img: "/images/value-user.jpg",    title: "商業端",  desc: "預期提升 20% 線上租賃轉換率，並透過減少退換貨與優化流程，將庫存周轉率提高 15%。" },
              { icon: "https://www.figma.com/api/mcp/asset/50437282-d9bd-4a8a-b2d3-d3c7b6249d22", img: "/images/value-business.png", title: "產品端",  desc: "這是一套「活的生命體」系統，未來可透過 ERP 數據回流，持續強化輔具推薦的智能程度。" },
            ].map((card, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 24, borderRadius: 8 }}>
                <div style={{ height: 252, borderRadius: 12, overflow: "hidden", position: "relative", width: "100%", flexShrink: 0 }}>
                  <img src={card.img} alt={card.title} style={{ position: "absolute", height: "100%", left: "-0.29%", width: "100.57%", top: 0, objectFit: "cover" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <img src={card.icon} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                    <span style={{ fontFamily: FONT, fontSize: 20, fontWeight: 500, color: "#111", letterSpacing: "-0.3px", lineHeight: "20px" }}>{card.title}</span>
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: 16, color: "rgba(0,0,0,0.6)", lineHeight: "24px", letterSpacing: "-0.08px", margin: 0 }}>{card.desc}</p>
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
    <section style={{ fontFamily: FONT, background: "#fff" }}>
      <div style={{ padding: isDesktop ? "80px 40px" : "48px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2
            style={{
              fontSize:      28,
              fontWeight:    700,
              color:         "#111",
              margin:        "0 0 32px",
              fontFamily:    "Georgia, serif",
              letterSpacing: "-0.5px",
            }}
          >
            商業策略
          </h2>
          <img
            src={isDesktop ? "/images/biz-strategy.webp" : "/images/biz-strategy-mobile.webp"}
            alt="商業策略：價值、供給、需求、財務"
            style={{ width: "100%", display: "block", borderRadius: 16 }}
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
        // 選離視口中央最近的
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

  const glassBase = {
    display:        "inline-flex",
    alignItems:     "center",
    gap:            8,
    padding:        "10px 20px",
    borderRadius:   9999,
    border:         "1px solid rgba(255,255,255,0.55)",
    background:     "rgba(255,255,255,0.55)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow:      "0 2px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
    fontSize:       14,
    fontFamily:     FONT,
    fontWeight:     500,
    color:          "#111",
    cursor:         "pointer",
    textDecoration: "none",
    letterSpacing:  "0.01em",
    transition:     "background 0.2s, box-shadow 0.2s",
  };

  return (
    <>
      <div style={{ fontFamily: FONT }}>
        <SectionSummary />
        <SectionResearch />
        <SectionLogic />
        <SectionImpact />
        <SectionStrategy />
        <SectionOutro />
      </div>

      {/* ── 固定 glass 按鈕（Portal → document.body，確保在所有 z-index 之上）── */}
      {createPortal(
        <>
          <a
            href="https://assist-hub.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...glassBase, position: "fixed", bottom: 72, left: 24, zIndex: 9999 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.55)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)"; }}
          >
            前往網站 ↗
          </a>
          <button
            onClick={() => {
              const s = document.getElementById("main-scroll");
              const t = document.getElementById("r4u-summary");
              if (s && t) s.scrollTo({ top: t.offsetTop - 56, behavior: "smooth" });
            }}
            style={{ ...glassBase, position: "fixed", bottom: 72, right: 24, zIndex: 9999 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.55)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)"; }}
          >
            ↑ 回到頂部
          </button>
        </>,
        document.body
      )}
    </>
  );
}
