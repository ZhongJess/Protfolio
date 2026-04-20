// ── ERP / CRM Case Study ScrollStory ─────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ErpCrmScrollStory.module.css";

const ACCENT = "#2563EB";

// ── Section nav items ─────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "erp-problem",   label: "問題"  },
  { id: "erp-process",   label: "流程"  },
  { id: "erp-dashboard", label: "儀表板" },
  { id: "erp-quotation", label: "報價"  },
  { id: "erp-story",     label: "故事"  },
  { id: "erp-demo",      label: "Demo"  },
];

function scrollTo(id) {
  const el  = document.getElementById(id);
  const box = document.getElementById("main-scroll");
  if (el && box) box.scrollTo({ top: el.offsetTop - 52, behavior: "smooth" });
}

// ── Sticky nav ────────────────────────────────────────────────────────────
function SectionNav({ active, onBack }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.navBrand}><span>Portfolio</span> / ERP·CRM</span>
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`${styles.navBtn} ${active === id ? styles.navBtnActive : ""}`}
        >
          {label}
        </button>
      ))}
      <button className={styles.navBack} onClick={onBack}>← Projects</button>
    </nav>
  );
}

// ── Fade-in on scroll ─────────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.06 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, {
    opacity:    vis ? 1 : 0,
    transform:  vis ? "translateY(0)" : "translateY(16px)",
    transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
  }];
}

function Reveal({ children, delay = 0, className, style: extra }) {
  const [ref, style] = useFadeIn(delay);
  return <div ref={ref} style={{ ...style, ...extra }} className={className}>{children}</div>;
}

// ── Timeline item ─────────────────────────────────────────────────────────
function TlItem({ year, title, body, isEnd, delay }) {
  const ref = useRef(null);
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
      <p className={styles.tlTitle}>{title}</p>
      <p className={styles.tlBody}>{body}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function ErpCrmScrollStory() {
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  useEffect(() => {
    const box = document.getElementById("main-scroll");
    if (!box) return;
    const onScroll = () => {
      for (const { id } of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) { setActive(id); return; }
      }
      setActive("");
    };
    box.addEventListener("scroll", onScroll, { passive: true });
    return () => box.removeEventListener("scroll", onScroll);
  }, []);

  const goBack = () => navigate("/projects");

  return (
    <div className={styles.root}>
      <SectionNav active={active} onBack={goBack} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBackRow}>
            <button className={styles.heroBackBtn} onClick={goBack}>← Projects</button>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroTagRow}>
              {["UX Research", "Information Architecture", "Role-based Dashboard",
                "AI-Assisted Design", "B2B Enterprise"].map(t => (
                <span key={t} className={styles.heroTag}>{t}</span>
              ))}
            </div>
            <h1 className={styles.heroH1}>
              從許願池<em>到精準決策</em>
            </h1>
            <p className={styles.heroSub}>
              為一間數位轉型顧問公司重新設計 CRM 模組——讓每個角色只看到他需要的資訊，
              讓報價流程回歸最了解客戶的人手中。
            </p>
            <div className={styles.heroStats}>
              {[
                { num: "10", sup: "+", label: "跨部門訪談" },
                { num: "3",  sup: "",  label: "角色視圖"   },
                { num: "−40", sup: "%", label: "必填欄位縮減" },
                { num: "0",  sup: "",  label: "寄錯信事故"  },
              ].map(({ num, sup, label }) => (
                <div key={label} className={styles.statCard}>
                  <div className={styles.statNum}>{num}<span>{sup}</span></div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroBannerWrap}>
            <div className={styles.heroBannerGrid} />
            <span className={styles.heroBannerLabel}>ERP / CRM Dashboard Preview</span>
          </div>
        </div>
        <div className={styles.heroSpacer} />
      </section>

      {/* ── 01 PROBLEM ────────────────────────────────────────────────── */}
      <section id="erp-problem" className={styles.sectionWrap}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>01 / 問題定義</span>
            <h2 className={styles.sectionH2}>許願池困境</h2>
            <p className={styles.sectionDesc}>
              超過 10 場跨部門訪談後，我發現這不是一個 UI 問題——
              這是一場資訊架構的失控。每個人都把這套系統想像成自己習慣的延伸，
              而不是整個組織的工具。
            </p>
          </Reveal>

          <Reveal delay={80} className={styles.insight}>
            <div className={styles.insightLabel}>Design Insight</div>
            <p>
              這四句訪談語錄背後是三個結構性問題：<strong>流程錯位</strong>（最了解客戶的人沒有報價權）、
              <strong>知識斷層</strong>（客戶歷史依附在人身上）、
              <strong>資訊密度失衡</strong>（主管資訊太雜，執行層資訊太多）。
            </p>
          </Reveal>

          <Reveal delay={120} className={styles.quoteGrid}>
            {[
              { role: "AM / PM", quote: "「我希望可以自己做報價，不用每次都找 HR。我最了解這個客戶，我才知道該給什麼優惠。」", pain: "↳ 流程設計讓最了解的人沒有決策權" },
              { role: "AM / PM", quote: "「每次要查之前的合約，都要翻信箱或問前同事。有時候乾脆重做一份，但又怕跟之前的不一樣。」", pain: "↳ 客戶知識依附在人身上，不在系統裡" },
              { role: "HR",      quote: "「如果自動寄信，我反而更不安心——信寄出去就回不來了。」", pain: "↳ 自動化帶來的不是效率，而是焦慮" },
              { role: "主管",    quote: "「我不需要看每個人在做什麼，我只需要知道哪個專案有落差、是誰的問題。」", pain: "↳ 主管需要「管理抓手」，不是報表海" },
            ].map(({ role, quote, pain }) => (
              <div key={role + pain} className={styles.qcard}>
                <div className={styles.qrole}>{role}</div>
                <blockquote>{quote}</blockquote>
                <p className={styles.qpain}>{pain}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 02 PROCESS ────────────────────────────────────────────────── */}
      <section id="erp-process" className={`${styles.sectionWrap} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>02 / 設計流程</span>
            <h2 className={styles.sectionH2}>AI 輔助設計流程</h2>
            <p className={styles.sectionDesc}>
              從需求訪談到可部署的 Demo，全程使用 AI 工具加速執行，但所有設計決策由設計師判斷。
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.flowWrap}>
              {[
                ["需求訪談",       false],
                ["AI 整理痛點",    true ],
                ["Function Map",   false],
                ["IA 資訊架構",    false],
                ["Sitemap",        false],
                ["Design System",  true ],
                ["Wireframe",      true ],
                ["Figma 金稿",     false],
                ["MCP 串接",       true ],
                ["VS Code 原型",   false],
                ["AI 測試報告",    true ],
                ["迭代修正",       false],
              ].map(([label, isAi], i, arr) => (
                <div key={i} className={styles.flowStep}>
                  <div className={`${styles.flowBox} ${isAi ? styles.flowBoxAi : ""}`}>{label}</div>
                  {i < arr.length - 1 && <span className={styles.flowArrow}>→</span>}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160} className={styles.aiCollab}>
            <span className={styles.aiIcon}>⚡</span>
            <div>
              <p className={styles.aiTitle}>「我負責判斷，Claude 負責執行。」</p>
              <p className={styles.aiBody}>
                前人留有一份 Adobe XD 設計稿。考量業界以 Figma 為主流，我用 Claude Code 將設計稿重構為
                Figma 元件與 Design Token，省去重新繪製的時間。AI 做整理與草稿，所有設計決策仍由我判斷——
                這是設計師用 AI 做槓桿，不是 AI 替代設計師。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 DASHBOARD ──────────────────────────────────────────────── */}
      <section id="erp-dashboard" className={styles.sectionWrap}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>03 / 儀表板設計</span>
            <h2 className={styles.sectionH2}>三層角色化儀表板</h2>
            <p className={styles.sectionDesc}>
              三個視圖完全獨立——不是同一頁面加權限遮蔽，而是為每個角色設計不同的思維模型（Mental Model）與資訊架構。
            </p>
          </Reveal>

          <Reveal delay={80} className={styles.dbGrid}>
            {[
              {
                badge: "C-Level",
                title: "總經理 — 業績戰情室",
                subtitle: "業績監控 + 例外管理",
                desc: "業績達成率配合目標一眼看差距。「待審核報價」放最頂部——這是總經理每天最核心的行動。大額議價案件標記「N 天未聯絡」警示，客戶集中度風險提供商業風險視角。",
                chips: ["業績達成率", "待審核報價件數", "N 天未聯絡警示", "客戶集中度風險", "AM/PM 排行"],
                chipStyle: [],
                screenshot: "[ 截圖：Dashboard 總覽 — 報價審核 + 漏斗 + AM/PM 排行 ]",
              },
              {
                badge: "PM Level",
                title: "AM / PM — 客戶指揮中心",
                subtitle: "客戶關係 + 報價管理",
                desc: "快速建立新報價，系統自動帶入客戶歷史資料，減少重複輸入。報價狀態漏斗讓 PM 隨時知道「卡在哪個階段」。客戶互動歷史讓 PM 不需要翻信箱——所有資訊集中在客戶檔案下。",
                chips: ["報價漏斗視覺化", "歷史資料自動帶入", "客戶互動紀錄"],
                chipStyle: [false, false, true],
                screenshot: "[ 截圖：報價單建立頁面 or 客戶詳情頁 ]",
              },
              {
                badge: "Executor",
                title: "執行層 — 工作台",
                subtitle: "極簡 / 聚焦任務",
                desc: "移除所有業績報表與客戶財務資訊。只顯示自己的待辦事項與今日任務。此視角使用者不直接接觸客戶報價資料，由權限系統管理。",
                chips: ["今日待辦", "快速填報"],
                chipStyle: [true, true],
                screenshot: "[ 截圖：Figma Wireframe — 執行層工作台（規劃中）]",
              },
            ].map(({ badge, title, subtitle, desc, chips, chipStyle, screenshot }) => (
              <div key={badge} className={styles.dbCard}>
                <div className={styles.dbCardHeader}>
                  <span className={styles.dbRoleBadge}>{badge}</span>
                  <h3 className={styles.dbCardTitle}>{title}</h3>
                </div>
                <div className={styles.dbCardBody}>
                  <div className={styles.dbCardSubtitle}>{subtitle}</div>
                  <p className={styles.dbCardDesc}>{desc}</p>
                  <div className={styles.chips}>
                    {chips.map((c, i) => (
                      <span key={c} className={`${styles.chip} ${chipStyle[i] ? styles.chipAmber : ""}`}>{c}</span>
                    ))}
                  </div>
                  <div className={styles.screenshot}>{screenshot}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 04 QUOTATION ──────────────────────────────────────────────── */}
      <section id="erp-quotation" className={`${styles.sectionWrap} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>04 / 報價流程</span>
            <h2 className={styles.sectionH2}>報價流程重設計</h2>
            <p className={styles.sectionDesc}>
              問題核心是：最了解客戶的人沒有報價權，最不了解的人做了最多決定。
            </p>
          </Reveal>

          <Reveal delay={80} className={styles.baGrid}>
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
                <li>系統帶入常見欄位，只需修改差異</li>
                <li>系統生成格式完整的 Excel 草稿</li>
                <li>主管 30 秒確認後人工寄出（非全自動）</li>
                <li>每次報價版本系統自動保存</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className={styles.phil}>
            <blockquote>「好的 UX 不是最快的流程，而是最讓人安心的流程。」</blockquote>
            <cite>— 安全閥設計決策 / HR 訪談後</cite>
          </Reveal>

          <Reveal delay={160} style={{ color: "#6B6760", fontSize: 16, maxWidth: 680, marginBottom: 32, lineHeight: 1.8 }}>
            技術上完全可以做「一鍵自動寄信」。但 HR 說：
            <em style={{ color: "#111111", fontStyle: "normal", fontWeight: 500 }}>「如果自動寄信，我反而更不安心。」</em>
            保留主管確認這個步驟，不只是安全閥，也是責任分界點——每一次寄信都有明確的責任人與時間戳記。
          </Reveal>

          <Reveal delay={200}>
            <div className={styles.funnelRow}>
              {[
                { label: "草稿",   num: "12", amount: "NT$ 180萬", cls: "" },
                { label: "待審核", num: "5",  amount: "NT$ 210萬", cls: styles.fsNumActive },
                { label: "已報價", num: "18", amount: "NT$ 420萬", cls: "" },
                { label: "議價中", num: "28", amount: "NT$ 892萬", cls: "" },
                { label: "成案",   num: "17", amount: "NT$ 167萬", cls: styles.fsNumGreen },
                { label: "未成案", num: "8",  amount: "NT$ 62萬",  cls: styles.fsNumRed },
              ].map(({ label, num, amount, cls }) => (
                <div key={label} className={styles.funnelStep}>
                  <span className={styles.fsLabel}>{label}</span>
                  <span className={`${styles.fsNum} ${cls}`}>{num}</span>
                  <span className={styles.fsAmount}>{amount}</span>
                </div>
              ))}
            </div>
            <p className={styles.funnelNote}>
              ↑ 報價漏斗讓主管與 PM 隨時知道「卡在哪個環節」— 資料來自 Demo 系統
            </p>
          </Reveal>

          <Reveal delay={220} className={styles.screenshot}>
            [ 截圖：報價單頁面 — 標示「匯出 Excel」按鈕與審核狀態欄位 ]
          </Reveal>
        </div>
      </section>

      {/* ── 05 STORY ──────────────────────────────────────────────────── */}
      <section id="erp-story" className={styles.sectionWrap}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>05 / 客戶知識留存</span>
            <h2 className={styles.sectionH2}>時空斷層的故事</h2>
            <p className={styles.sectionDesc}>
              訪談中一位 PM 說的話，讓我重新思考 CRM 存在的意義：
              <em style={{ color: "#111111", fontStyle: "italic" }}>
                「有些維護案是五到十年前簽的，那時候的承辦人早就離職了，現在出了問題，打開電腦只有幾個命名混亂的 PDF。」
              </em>
            </p>
          </Reveal>

          <Reveal delay={60} className={styles.tl}>
            <TlItem year="2016 年" title="合約簽署，承辦人建立專案"
              body="客戶的特殊要求、優惠條件、特殊備註——全部存在承辦人腦子裡，或分散在 Excel 和個人信箱。"
              isEnd={false} delay={0} />
            <TlItem year="2019–2022 年" title="承辦人離職，多次交接，記憶逐漸消失"
              body="交接文件不完整。每次人員異動，就有一部分知識永遠消失。"
              isEnd={false} delay={120} />
            <TlItem year="數年後" title="客戶回頭，聲稱「當初交付的就有問題」"
              body="沒有版本紀錄，沒有驗收時間戳記。無法自保，也無法釐清責任歸屬。"
              isEnd={false} delay={240} />
            <TlItem year="設計介入後" title="客戶歷史完整留存於系統"
              body="每次報價版本自動保存。歷任 AM/PM 備註強制填寫。重要節點留下時間戳記。AM/PM 的下一個人，不需要問前同事，只需要打開客戶檔案。"
              isEnd={true} delay={360} />
          </Reveal>

          <Reveal delay={200} className={styles.insight}>
            <div className={styles.insightLabel}>CRM 能做的</div>
            <p>
              「讓知識不隨人員流失」是 ERP 層級的大命題。
              <strong>CRM 能做的，是在客戶關係這個維度上，建立完整的互動歷史</strong>——
              讓每一筆客戶資料，都比任何一個人的記憶更可靠。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 06 DECISION ───────────────────────────────────────────────── */}
      <section className={`${styles.sectionWrap} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>06 / 商業決策</span>
            <h2 className={styles.sectionH2}>需求取捨矩陣</h2>
            <p className={styles.sectionDesc}>
              10 場訪談後，我面對的是充滿矛盾的需求清單。
              我建立了一個評估矩陣，讓討論從「我想要」回到「應該做」。
            </p>
          </Reveal>

          <Reveal delay={80} className={styles.matrixWrap}>
            <div className={styles.matrixGrid}>
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
          </Reveal>

          <Reveal delay={140} className={styles.phil}>
            <blockquote>「複製介面只是解決習慣問題，不是解決流程問題。」</blockquote>
            <cite>— 拒絕「複製舊 CRM」需求的設計決策說明</cite>
          </Reveal>
        </div>
      </section>

      {/* ── 07 DEMO ───────────────────────────────────────────────────── */}
      <section id="erp-demo" className={styles.sectionWrap}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>07 / Demo 說明</span>
            <h2 className={styles.sectionH2}>Demo 與技術說明</h2>
            <p className={styles.sectionDesc}>
              前端 HTML / CSS / JavaScript（原生），後端 Node.js，部署於 Vercel。
            </p>
          </Reveal>

          <Reveal delay={60}>
            <a
              href="https://erp-crm-system.vercel.app/dashboard"
              target="_blank"
              rel="noreferrer"
              className={styles.demoLink}
            >
              查看 Live Demo
            </a>
          </Reveal>

          <Reveal delay={100} className={styles.scopeGrid}>
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
          </Reveal>

          <Reveal delay={140}>
            <p className={styles.dsLabel}>Design Token — Color System</p>
            <div className={styles.dsGrid}>
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
            </div>
          </Reveal>

          <Reveal delay={160} className={styles.screenshot}>
            [ 截圖：Figma Design System — 元件庫 + Typography Scale ]
          </Reveal>
        </div>
      </section>

      {/* ── 08 REFLECTION ─────────────────────────────────────────────── */}
      <section className={`${styles.sectionWrap} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>08 / 反思</span>
            <h2 className={styles.sectionH2}>反思與學習</h2>
          </Reveal>

          <Reveal delay={80} className={styles.refGrid}>
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
          </Reveal>
        </div>
      </section>

      {/* ── Scroll-to-top ──────────────────────────────────────────────── */}
      {createPortal(
        <button
          className={styles.glassBtn}
          onClick={() => document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.72)"; }}
        >
          ↑ 回到頂部
        </button>,
        document.body
      )}
    </div>
  );
}
