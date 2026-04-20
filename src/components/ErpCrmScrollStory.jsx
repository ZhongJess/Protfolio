// ── ERP / CRM Case Study ScrollStory ─────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ErpCrmScrollStory.module.css";

// ── Section nav ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "erp-problem",   label: "問題"  },
  { id: "erp-process",   label: "流程"  },
  { id: "erp-dashboard", label: "儀表板" },
  { id: "erp-quotation", label: "報價"  },
  { id: "erp-story",     label: "故事"  },
  { id: "erp-demo",      label: "Demo"  },
];

function scrollToSection(id) {
  const scrollEl = document.getElementById("main-scroll");
  const target   = document.getElementById(id);
  if (scrollEl && target)
    scrollEl.scrollTo({ top: target.offsetTop - 56, behavior: "smooth" });
}

function SectionNav({ active, onBack }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.navBrand}>
        <span>Portfolio</span> / ERP·CRM
      </span>
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`${styles.navBtn} ${active === id ? styles.navBtnActive : ""}`}
        >
          {label}
        </button>
      ))}
      <button className={styles.backBtn} onClick={onBack}>← Projects</button>
    </nav>
  );
}

// ── Fade-in hook (Intersection Observer) ─────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, {
    opacity:    vis ? 1 : 0,
    transform:  vis ? "translateY(0)" : "translateY(18px)",
    transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
  }];
}

// ── R: Reveal wrapper ─────────────────────────────────────────────────────
function R({ children, delay = 0, style: extraStyle, className }) {
  const [ref, style] = useFadeIn(delay);
  return (
    <div ref={ref} style={{ ...style, ...extraStyle }} className={className}>
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function ErpCrmScrollStory() {
  const navigate   = useNavigate();
  const [active, setActive] = useState("");

  // Track active section
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;
    const onScroll = () => {
      for (const { id } of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, []);

  const goBack = () => navigate("/projects");

  return (
    <div className={styles.root}>
      <SectionNav active={active} onBack={goBack} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>Case Study 01 — B2B Enterprise CRM</div>
          <h1 className={styles.heroH1}>
            從許願池
            <span className={styles.line2}>到精準決策</span>
          </h1>
          <p className={styles.heroSub}>
            為一間數位轉型顧問公司重新設計 CRM 模組——讓每個角色只看到他需要的資訊，讓報價流程回歸最了解客戶的人手中。
          </p>
          <div className={styles.heroTags}>
            {[
              ["UX Research",           "Blue"],
              ["Information Architecture","Blue"],
              ["Role-based Dashboard",   "Green"],
              ["Design System",          "Green"],
              ["AI-Assisted Design",     "Amber"],
              ["B2B Enterprise",         "Amber"],
              ["Figma",                  ""],
              ["Claude Code",            ""],
              ["Node.js / Vercel",       ""],
            ].map(([label, color]) => (
              <span
                key={label}
                className={`${styles.tag} ${color === "Blue" ? styles.tagBlue : color === "Green" ? styles.tagGreen : color === "Amber" ? styles.tagAmber : ""}`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>10<span>+</span></span>
              <span className={styles.statLabel}>跨部門訪談</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>角色視圖</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>−<span>40</span>%</span>
              <span className={styles.statLabel}>必填欄位縮減</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>0</span>
              <span className={styles.statLabel}>寄錯信事故</span>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ── 01 PROBLEM ───────────────────────────────────────────────── */}
      <div className={styles.wrap}>
        <section id="erp-problem" className={styles.section}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>01</span>
            <h2 className={styles.secTitle}>許願池困境</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={80} className={styles.insight}>
            <p>
              超過 <strong>10 場跨部門訪談</strong>後，我發現這不是一個 UI 問題——這是一場
              <strong>資訊架構的失控</strong>。每個人都把這套系統想像成自己習慣的延伸，
              而不是整個組織的工具。
            </p>
          </R>

          <R delay={120}>
            <div className={styles.quoteGrid}>
              {[
                { role: "AM / PM", quote: "「我希望可以自己做報價，不用每次都找 HR。我最了解這個客戶，我才知道該給什麼優惠。」", pain: "↳ 流程設計讓最了解的人沒有決策權" },
                { role: "AM / PM", quote: "「每次要查之前的合約，都要翻信箱或問前同事。有時候乾脆重做一份，但又怕跟之前的不一樣。」", pain: "↳ 客戶知識依附在人身上，不在系統裡" },
                { role: "HR",      quote: "「如果自動寄信，我反而更不安心——信寄出去就回不來了。」", pain: "↳ 自動化帶來的不是效率，而是焦慮" },
                { role: "主管",    quote: "「我不需要看每個人在做什麼，我只需要知道哪個專案有落差、是誰的問題。」", pain: "↳ 主管需要「管理抓手」，不是報表海" },
              ].map(({ role, quote, pain }) => (
                <div key={role + quote.slice(0,10)} className={styles.qcard}>
                  <div className={styles.qcardRole}>{role}</div>
                  <blockquote>{quote}</blockquote>
                  <div className={styles.pain}>{pain}</div>
                </div>
              ))}
            </div>
          </R>
        </section>
      </div>

      <hr className={styles.divider} />

      {/* ── 02 PROCESS ───────────────────────────────────────────────── */}
      <div className={styles.wrap}>
        <section id="erp-process" className={styles.section}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>02</span>
            <h2 className={styles.secTitle}>AI 輔助設計流程</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={80}>
            <div className={styles.flowWrap}>
              {[
                ["需求訪談",         false],
                ["AI 整理痛點",      true ],
                ["Function Map",     false],
                ["IA 資訊架構",      false],
                ["Sitemap",          false],
                ["Design System 重構",true ],
                ["Wireframe 草稿",   true ],
                ["Figma 金稿",       false],
                ["MCP 串接",         true ],
                ["VS Code 原型",     false],
                ["AI 測試報告",      true ],
                ["迭代修正",         false],
              ].map(([label, isAi], i) => (
                <div key={i} className={styles.flowStep}>
                  <div className={`${styles.flowBox} ${isAi ? styles.flowBoxAi : ""}`}>{label}</div>
                </div>
              ))}
            </div>
          </R>

          <R delay={160} className={styles.aiCollab}>
            <div className={styles.aiIcon}>⚡</div>
            <div className={styles.aiBody}>
              <strong>「我負責判斷，Claude 負責執行。」</strong>
              <p>
                前人留有一份 Adobe XD 設計稿。考量業界以 Figma 為主流，我用 Claude Code 將設計稿重構為
                Figma 元件與 Design Token，省去重新繪製的時間。AI 做整理與草稿，所有設計決策仍由我判斷——
                這是設計師用 AI 做槓桿，不是 AI 替代設計師。
              </p>
            </div>
          </R>
        </section>
      </div>

      <hr className={styles.divider} />

      {/* ── 03 DASHBOARD ─────────────────────────────────────────────── */}
      <div className={styles.wrap}>
        <section id="erp-dashboard" className={styles.section}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>03</span>
            <h2 className={styles.secTitle}>三層角色化儀表板</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={60} style={{ color: "var(--dim)", maxWidth: 600, marginBottom: 44, fontSize: 16, lineHeight: 1.8 }}>
            三個視圖完全獨立——不是同一頁面加權限遮蔽，而是為每個角色設計不同的
            思維模型（Mental Model）與資訊架構。
          </R>

          <R delay={120} className={styles.dbWrap}>
            {/* C-Level */}
            <div className={styles.dbRow}>
              <div className={styles.dbLabel}>
                <div className={styles.dbRole}>C-Level</div>
                <div className={styles.dbName}>總經理<br />業績戰情室</div>
              </div>
              <div className={styles.dbBody}>
                <h4>業績監控 + 例外管理</h4>
                <p>業績達成率配合目標一眼看差距。「待審核報價」放最頂部——這是總經理每天最核心的行動。大額議價案件標記「N 天未聯絡」警示，讓主管知道哪個客戶需要介入。客戶集中度風險警示（單一客戶佔比 &gt; 30%）提供商業風險視角。</p>
                <div className={styles.chips}>
                  {["業績達成率","待審核報價件數","N 天未聯絡警示","客戶集中度風險","AM/PM 業績排行"].map(c => (
                    <span key={c} className={styles.chip}>{c}</span>
                  ))}
                </div>
                <div className={styles.dbScreenshot}>[ 截圖：Dashboard 總覽 — 報價審核 + 漏斗 + AM/PM 排行 ]</div>
              </div>
            </div>
            {/* PM Level */}
            <div className={styles.dbRow}>
              <div className={styles.dbLabel}>
                <div className={styles.dbRole}>PM Level</div>
                <div className={styles.dbName}>AM / PM<br />客戶指揮中心</div>
              </div>
              <div className={styles.dbBody}>
                <h4>客戶關係 + 報價管理</h4>
                <p>快速建立新報價，系統自動帶入客戶歷史資料，減少重複輸入。報價狀態漏斗讓 PM 隨時知道「卡在哪個階段」。客戶互動歷史讓 PM 不需要翻信箱找資料——所有資訊集中在同一個客戶檔案下。</p>
                <div className={styles.chips}>
                  <span className={styles.chip}>報價漏斗視覺化</span>
                  <span className={styles.chip}>歷史資料自動帶入</span>
                  <span className={`${styles.chip} ${styles.chipAmber}`}>客戶互動紀錄</span>
                </div>
                <div className={styles.dbScreenshot}>[ 截圖：報價單建立頁面 or 客戶詳情頁 ]</div>
              </div>
            </div>
            {/* Executor */}
            <div className={styles.dbRow}>
              <div className={styles.dbLabel}>
                <div className={styles.dbRole}>Executor</div>
                <div className={styles.dbName}>執行層<br />工作台</div>
              </div>
              <div className={styles.dbBody}>
                <h4>極簡 / 聚焦任務</h4>
                <p>移除所有業績報表與客戶財務資訊。只顯示自己的待辦事項與今日任務。此視角使用者不直接接觸客戶報價資料，由權限系統管理。</p>
                <div className={styles.chips}>
                  <span className={`${styles.chip} ${styles.chipAmber}`}>今日待辦</span>
                  <span className={`${styles.chip} ${styles.chipAmber}`}>快速填報</span>
                </div>
                <div className={styles.dbScreenshot}>[ 截圖：Figma Wireframe — 執行層工作台（規劃中） ]</div>
              </div>
            </div>
          </R>
        </section>
      </div>

      <hr className={styles.divider} />

      {/* ── 04 QUOTATION ─────────────────────────────────────────────── */}
      <div className={styles.wrap}>
        <section id="erp-quotation" className={styles.section}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>04</span>
            <h2 className={styles.secTitle}>報價流程重設計</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={80} className={styles.baGrid}>
            <div className={`${styles.baCol} ${styles.baBefore}`}>
              <div className={styles.baHead}>× Before — 舊流程</div>
              <ul>
                <li>AM/PM 口頭傳達需求給 HR</li>
                <li>HR 手動查詢舊報價，自行計算</li>
                <li>最了解客戶的人沒有參與報價</li>
                <li>HR 手動寄信，無法召回錯誤</li>
                <li>每次報價從零開始，無歷史參考</li>
              </ul>
            </div>
            <div className={`${styles.baCol} ${styles.baAfter}`}>
              <div className={styles.baHead}>✓ After — 新流程</div>
              <ul>
                <li>AM/PM 直接進入 CRM 查閱客戶歷史</li>
                <li>系統帶入常見欄位，只需修改差異部分</li>
                <li>系統生成格式完整的 Excel 草稿</li>
                <li>主管 30 秒確認後人工寄出（非全自動）</li>
                <li>每次報價版本系統自動保存</li>
              </ul>
            </div>
          </R>

          <R delay={120} className={styles.phil}>
            <blockquote>「好的 UX 不是最快的流程，而是最讓人安心的流程。」</blockquote>
            <cite>— 安全閥設計決策 / HR 訪談後</cite>
          </R>

          <R delay={160} style={{ color: "var(--dim)", fontSize: 16, maxWidth: 680, marginBottom: 40, lineHeight: 1.8 }}>
            技術上完全可以做「一鍵自動寄信」。但 HR 說：
            <em style={{ color: "#dde6f0" }}>「如果自動寄信，我反而更不安心。」</em>
            保留主管確認這個步驟，不只是安全閥，也是責任分界點——每一次寄信都有明確的責任人與時間戳記。
          </R>

          {/* Funnel */}
          <R delay={200}>
            <div className={styles.funnelRow}>
              {[
                { label: "草稿",   num: "12",  amount: "NT$ 180 萬", cls: "" },
                { label: "待審核", num: "5",   amount: "NT$ 210 萬", cls: styles.fsNumActive },
                { label: "已報價", num: "18",  amount: "NT$ 420 萬", cls: "" },
                { label: "議價中", num: "28",  amount: "NT$ 892 萬", cls: "" },
                { label: "成案",   num: "17",  amount: "NT$ 167 萬", cls: styles.fsNumGreen },
                { label: "未成案", num: "8",   amount: "NT$ 62 萬",  cls: styles.fsNumRed },
              ].map(({ label, num, amount, cls }) => (
                <div key={label} className={styles.funnelStep}>
                  <span className={styles.fsLabel}>{label}</span>
                  <span className={`${styles.fsNum} ${cls}`}>{num}</span>
                  <span className={styles.fsAmount}>{amount}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "var(--mono)", fontSize: 16, color: "var(--muted)", marginTop: -32, marginBottom: 48, letterSpacing: ".06em" }}>
              ↑ 報價漏斗讓主管與 PM 隨時知道「卡在哪個環節」 — 資料來自 Demo 系統
            </p>
          </R>

          <R delay={220} className={styles.dbScreenshot}>
            [ 截圖：報價單頁面 — 標示「匯出 Excel」按鈕與審核狀態欄位 ]
          </R>
        </section>
      </div>

      <hr className={styles.divider} />

      {/* ── 05 STORY ─────────────────────────────────────────────────── */}
      <div id="erp-story" className={styles.storyBg}>
        <div className={styles.wrap}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>05</span>
            <h2 className={styles.secTitle}>時空斷層的故事</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={60} style={{ color: "var(--dim)", maxWidth: 640, marginBottom: 52, fontSize: 16, lineHeight: 1.8 }}>
            訪談中一位 PM 說的話，讓我重新思考 CRM 存在的意義：
            <em style={{ color: "#dde6f0" }}>
              「有些維護案是五到十年前簽的，那時候的承辦人早就離職了，現在出了問題，打開電腦只有幾個命名混亂的 PDF。」
            </em>
          </R>

          <R delay={100} className={styles.tl}>
            <TimelineItem
              year="2016 年"
              title="合約簽署，承辦人建立專案"
              body="客戶的特殊要求、優惠條件、特殊備註——全部存在承辦人腦子裡，或分散在 Excel 和個人信箱。"
              isEnd={false}
              delay={0}
            />
            <TimelineItem
              year="2019–2022 年"
              title="承辦人離職，多次交接，記憶逐漸消失"
              body="交接文件不完整。每次人員異動，就有一部分知識永遠消失。"
              isEnd={false}
              delay={120}
            />
            <TimelineItem
              year="數年後"
              title="客戶回頭，聲稱「當初交付的就有問題」"
              body="沒有版本紀錄，沒有驗收時間戳記。無法自保，也無法釐清責任歸屬。"
              isEnd={false}
              delay={240}
            />
            <TimelineItem
              year="設計介入後"
              title="客戶歷史完整留存於系統"
              body="每次報價版本自動保存。歷任 AM/PM 備註強制填寫。重要節點留下時間戳記。AM/PM 的下一個人，不需要問前同事，只需要打開客戶檔案。"
              isEnd={true}
              delay={360}
            />
          </R>

          <R delay={200} className={styles.insight} style={{ marginBottom: 0 }}>
            <p>
              「讓知識不隨人員流失」是 ERP 層級的大命題。
              <strong>CRM 能做的，是在客戶關係這個維度上，建立完整的互動歷史</strong>——
              讓每一筆客戶資料，都比任何一個人的記憶更可靠。
            </p>
          </R>
        </div>
      </div>

      {/* ── 06 DECISION ──────────────────────────────────────────────── */}
      <div className={styles.wrap}>
        <section className={styles.section}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>06</span>
            <h2 className={styles.secTitle}>商業決策——需求取捨</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={60} style={{ color: "var(--dim)", maxWidth: 580, marginBottom: 40, fontSize: 16, lineHeight: 1.8 }}>
            10 場訪談後，我面對的是一個充滿矛盾的需求清單。每個人都想要不一樣的東西，資源有限。
            我建立了一個評估矩陣，讓討論從「我想要」回到「應該做」。
          </R>

          <R delay={100} className={styles.matrixWrap}>
            <div className={styles.matrixInner}>
              <div className={`${styles.mc} ${styles.mcHi}`}>
                <div className={`${styles.mcLabel} ${styles.mcLabelQ1}`}>▲ 立即執行</div>
                <ul>
                  <li>CRM 核心報價流程</li>
                  <li>三層角色化儀表板</li>
                  <li>客戶歷史紀錄</li>
                </ul>
              </div>
              <div className={styles.mc}>
                <div className={`${styles.mcLabel} ${styles.mcLabelQ2}`}>◆ 第二階段</div>
                <ul>
                  <li>計畫落差監控器（紅/黃/綠）</li>
                  <li>自動化審核通知</li>
                  <li>跨模組資料整合</li>
                </ul>
              </div>
              <div className={styles.mc}>
                <div className={`${styles.mcLabel} ${styles.mcLabelQ3}`}>○ 暫緩</div>
                <ul>
                  <li>介面主題換膚</li>
                  <li>按鈕排序微調</li>
                </ul>
              </div>
              <div className={styles.mc}>
                <div className={`${styles.mcLabel} ${styles.mcLabelQ4}`}>× 拒絕</div>
                <ul>
                  <li>複製其他公司 UI（解決習慣，非流程）</li>
                  <li>極度客製化個人需求</li>
                </ul>
              </div>
            </div>
            <div className={styles.matrixAxis}>
              <span>低開發難度</span>
              <span>高開發難度</span>
            </div>
          </R>

          <R delay={160} className={styles.phil}>
            <blockquote>「複製介面只是解決習慣問題，不是解決流程問題。」</blockquote>
            <cite>— 拒絕「複製舊 CRM」需求的設計決策說明</cite>
          </R>
        </section>
      </div>

      <hr className={styles.divider} />

      {/* ── 07 DEMO ──────────────────────────────────────────────────── */}
      <div className={styles.wrap}>
        <section id="erp-demo" className={styles.section}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>07</span>
            <h2 className={styles.secTitle}>Demo 與技術說明</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={60}>
            <a
              href="https://erp-crm-system.vercel.app/dashboard"
              target="_blank"
              rel="noreferrer"
              className={styles.demoLink}
            >
              查看 Live Demo
            </a>
          </R>

          <R delay={100} className={styles.scopeGrid}>
            <div className={`${styles.scopeCol} ${styles.scopeDone}`}>
              <h4>✓ Demo 已實作</h4>
              <ul>
                <li>客戶列表 + 篩選</li>
                <li>報價單建立流程（含歷史帶入）</li>
                <li>主管儀表板（業績概覽、審核、漏斗、AM/PM 排行）</li>
                <li>報價漏斗視覺化</li>
                <li>N 天未聯絡警示</li>
                <li>客戶集中度風險警示</li>
                <li>角色切換預覽（Dev 模式）</li>
              </ul>
            </div>
            <div className={`${styles.scopeCol} ${styles.scopeTodo}`}>
              <h4>○ 規劃中 / 下一版本</h4>
              <ul>
                <li>計畫落差監控器（紅/黃/綠專案狀態）</li>
                <li>執行層工作台</li>
                <li>客戶詳情頁完整歷史紀錄</li>
                <li>手機版 RWD 優化</li>
                <li>自動寄信（設計決策：不做，非技術限制）</li>
              </ul>
            </div>
          </R>

          {/* Design System swatches */}
          <R delay={140} style={{ fontFamily: "var(--mono)", fontSize: 16, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16 }}>
            Design Token — Color System
          </R>
          <R delay={160} className={styles.dsGrid}>
            {[
              { name: "--color-primary", val: "#2563EB" },
              { name: "--color-success", val: "#16A34A" },
              { name: "--color-warning", val: "#D97706" },
              { name: "--color-danger",  val: "#DC2626" },
            ].map(({ name, val }) => (
              <div key={name} className={styles.swatch}>
                <div className={styles.swColor} style={{ background: val }} />
                <span className={styles.swName}>{name}</span>
                <span className={styles.swVal}>{val}</span>
              </div>
            ))}
          </R>
          <R delay={180} className={styles.dbScreenshot}>
            [ 截圖：Figma Design System — 元件庫 + Typography Scale ]
          </R>
        </section>
      </div>

      <hr className={styles.divider} />

      {/* ── 08 REFLECTION ────────────────────────────────────────────── */}
      <div className={styles.wrap}>
        <section className={styles.section}>
          <R className={styles.secHead}>
            <span className={styles.secNum}>08</span>
            <h2 className={styles.secTitle}>反思</h2>
            <div className={styles.secLine} />
          </R>

          <R delay={80} className={styles.refGrid}>
            {[
              { label: "不足之處", body: "計畫落差監控器未在此版本完整實作，目前 Dashboard 以業績概覽為主。執行層工作台因時程關係仍停留在設計規劃階段。" },
              { label: "下一版本", body: "加入紅/黃/綠計畫落差監控，讓主管視角更貼近「戰情室」定位。完整實作客戶詳情頁歷史互動紀錄功能。" },
              { label: "學到了",   body: "設計師的價值不只在畫面好不好看，而在於能不能幫組織看清楚「真正的問題在哪裡」，然後在資源有限的情況下，做出最有效益的取捨。" },
            ].map(({ label, body }) => (
              <div key={label} className={styles.refCard}>
                <div className={styles.refLabel}>{label}</div>
                <p>{body}</p>
              </div>
            ))}
          </R>
        </section>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.ftLeft}>
          <strong>UI/UX Designer — 3–5 Years</strong>
          B2B Enterprise · Design System · AI-Assisted Workflow
        </div>
        <button className={styles.backFooter} onClick={goBack}>← Back to Portfolio</button>
      </footer>

      {/* ── Scroll-to-top portal ──────────────────────────────────────── */}
      {createPortal(
        <button
          onClick={() => document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 72, right: 24, zIndex: 9999,
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 9999,
            border: "1px solid rgba(99,179,237,0.3)",
            background: "rgba(13,17,23,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            fontSize: 16, fontFamily: "'IBM Plex Mono', monospace",
            color: "#63b3ed", cursor: "pointer",
            transition: "background .2s, border-color .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,179,237,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(13,17,23,0.85)"; }}
        >
          ↑ 回到頂部
        </button>,
        document.body
      )}
    </div>
  );
}

// ── Timeline Item sub-component ──────────────────────────────────────────
function TimelineItem({ year, title, body, isEnd, delay }) {
  const ref  = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setVis(true), delay); },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${styles.tlItem} ${vis ? styles.tlItemVis : ""}`}>
      <div className={`${styles.tlDot} ${isEnd ? styles.tlDotEnd : ""}`} />
      <div className={`${styles.tlYr} ${isEnd ? styles.tlYrEnd : ""}`}>{year}</div>
      <div className={styles.tlTitle}>{title}</div>
      <p className={styles.tlBody}>{body}</p>
    </div>
  );
}
