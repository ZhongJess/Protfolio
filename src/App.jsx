// ── App 主元件 ─────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
import { PROJECTS, REPOS } from "./data";
import { Analytics } from "@vercel/analytics/react";

import ProgressBar from "./components/ProgressBar";
import Nav        from "./components/Nav";
import Footer     from "./components/Footer";

import HomePage          from "./pages/HomePage";
import AboutPage         from "./pages/AboutPage";
import ProjectsPage      from "./pages/ProjectsPage";
import CaseStudyPage     from "./pages/CaseStudyPage";
import Rent4UScrollStory       from "./components/Rent4UScrollStory";
import StarbucksMOPScrollStory from "./components/StarbucksMOPScrollStory";
import HoxinYiScrollStory     from "./components/HoxinYiScrollStory";
import ErpCrmScrollStory      from "./components/ErpCrmScrollStory";
import RepoPage          from "./pages/RepoPage";
import RepoDetailPage    from "./pages/RepoDetailPage";
import ContactPage       from "./pages/ContactPage";

// ── 路由：Project 詳細頁（根據 scrollStory 決定顯示哪個元件）──────────────────
function ProjectRoute() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const project  = PROJECTS.find(p => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;
  if (project.scrollStory === "starbucks-mop") return <StarbucksMOPScrollStory />;
  if (project.scrollStory === "hoxinyi") return <HoxinYiScrollStory />;
  if (project.scrollStory === "erp-crm") return <ErpCrmScrollStory />;
  if (project.scrollStory) return <Rent4UScrollStory />;
  return <CaseStudyPage project={project} onBack={() => navigate("/projects")} />;
}

// ── 路由：Repo 詳細頁 ───────────────────────────────────────────────────────────
function RepoRoute() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const repo     = REPOS.find(r => r.id === id);

  if (!repo) return <Navigate to="/repo" replace />;
  return <RepoDetailPage repo={repo} onBack={() => navigate("/repo")} />;
}

// ── 換頁時自動捲回頂部 ──────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById("main-scroll")?.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── 主 Layout（需在 BrowserRouter 內，才能用 router hooks）────────────────────
function AppLayout() {
  const { pathname } = useLocation();

  // 首頁 / About / Projects / Repo：Nav 不縮進去
  // 其他頁面（detail pages、contact 等）：向下滾動時 Nav 向上縮進去
  const navStatic = pathname === "/" || pathname === "/about"
    || pathname === "/projects" || pathname === "/repo";

  const [navHidden, setNavHidden] = useState(false);

  // 換頁時重置
  useEffect(() => { setNavHidden(false); }, [pathname]);

  // 滾動追蹤（僅限會縮進去的頁面）
  useEffect(() => {
    if (navStatic) return;
    const el = document.getElementById("main-scroll");
    if (!el) return;

    let lastY = el.scrollTop;
    const THRESHOLD = 60;

    const onScroll = () => {
      const y = el.scrollTop;
      const goingDown = y > lastY;
      setNavHidden(y > THRESHOLD && goingDown);
      lastY = y;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [navStatic, pathname]);

  // 全版本鎖定 body scroll，只讓 #main-scroll 捲動
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <ProgressBar />
      <div className="flex flex-col h-screen overflow-hidden bg-bg">
        <div
          className="shrink-0"
          style={{
            overflow: "hidden",
            marginTop: navHidden ? -60 : 0,
            transition: "margin-top 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Nav />
        </div>
        <div id="main-scroll" className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          <Routes>
            <Route path="/"             element={<HomePage />} />
            <Route path="/about"        element={<AboutPage />} />
            <Route path="/projects"     element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectRoute />} />
            <Route path="/repo"         element={<RepoPage />} />
            <Route path="/repo/:id"     element={<RepoRoute />} />
            <Route path="/contact"      element={<ContactPage />} />
            <Route path="*"             element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

// ── 根元件 ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <BrowserRouter>
      <AppLayout />
      <Analytics />
    </BrowserRouter>
  );
}
