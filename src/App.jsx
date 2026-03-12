// ── App 主元件 ─────────────────────────────────────────────────────────────────
// 負責路由（page 狀態）和整體版面佈局
import { useState, useEffect } from "react";
import { useIsDesktop } from "./hooks";

// Components
import ProgressBar from "./components/ProgressBar";
import Nav        from "./components/Nav";
import Footer     from "./components/Footer";

// Pages
import HomePage       from "./pages/HomePage";
import AboutPage      from "./pages/AboutPage";
import ProjectsPage   from "./pages/ProjectsPage";
import CaseStudyPage       from "./pages/CaseStudyPage";
import Rent4UScrollStory   from "./components/Rent4UScrollStory";
import RepoPage       from "./pages/RepoPage";
import RepoDetailPage from "./pages/RepoDetailPage";

export default function Portfolio() {
  const [page, setPage]             = useState("home");
  const [selected, setSelected]     = useState(null);
  const [detailType, setDetailType] = useState(null);
  const isDesktop = useIsDesktop();

  const handleSelectProject = (item) => { setSelected(item); setDetailType("project"); };
  const handleSelectRepo    = (item) => { setSelected(item); setDetailType("repo"); };
  const handleBack          = ()     => { setSelected(null); setDetailType(null); };

  // 桌面版鎖定 body scroll（讓 #main-scroll 自己捲動）
  useEffect(() => {
    document.body.style.overflow = isDesktop ? "hidden" : "auto";
    document.documentElement.style.overflow = isDesktop ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isDesktop]);

  // 根據狀態決定顯示哪個頁面
  let pageContent;
  if      (selected && detailType === "project" && selected.scrollStory) pageContent = <Rent4UScrollStory onBack={handleBack} />;
  else if (selected && detailType === "project") pageContent = <CaseStudyPage  project={selected} onBack={handleBack} />;
  else if (selected && detailType === "repo")    pageContent = <RepoDetailPage repo={selected}    onBack={handleBack} />;
  else if (page === "home")                      pageContent = <HomePage       setPage={setPage} />;
  else if (page === "about")                     pageContent = <AboutPage />;
  else if (page === "projects")                  pageContent = <ProjectsPage   onSelect={handleSelectProject} />;
  else if (page === "repo")                      pageContent = <RepoPage       onSelect={handleSelectRepo} />;

  const navProps = {
    page,
    setPage: (p) => { setPage(p); handleBack(); },
    onLogoClick: () => { setPage("home"); handleBack(); },
  };

  return (
    <>
      <ProgressBar />

      {isDesktop ? (
        // ── 桌面/平板：dashboard 固定 100vh，只有中間可捲動 ──
        <div className="flex flex-col h-screen overflow-hidden bg-bg">
          <div className="shrink-0">
            <Nav {...navProps} />
          </div>
          <div
            id="main-scroll"
            className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col"
          >
            {pageContent}
          </div>
          <Footer />
        </div>
      ) : (
        // ── 手機版：正常捲動 + 漢堡選單 ──
        <div className="bg-bg min-h-screen flex flex-col">
          <Nav {...navProps} />
          <div className="flex-1 flex flex-col">
            {pageContent}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
