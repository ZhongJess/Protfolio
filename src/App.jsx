// ── App 主元件 ─────────────────────────────────────────────────────────────────
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
import { PROJECTS, REPOS } from "./data";

import ProgressBar from "./components/ProgressBar";
import Nav        from "./components/Nav";
import Footer     from "./components/Footer";

import HomePage          from "./pages/HomePage";
import AboutPage         from "./pages/AboutPage";
import ProjectsPage      from "./pages/ProjectsPage";
import CaseStudyPage     from "./pages/CaseStudyPage";
import Rent4UScrollStory from "./components/Rent4UScrollStory";
import RepoPage          from "./pages/RepoPage";
import RepoDetailPage    from "./pages/RepoDetailPage";
import ContactPage       from "./pages/ContactPage";

// ── 路由：Project 詳細頁（根據 scrollStory 決定顯示哪個元件）──────────────────
function ProjectRoute() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const project  = PROJECTS.find(p => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;
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
        <div className="shrink-0">
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
        </div>
        <Footer />
      </div>
    </>
  );
}

// ── 根元件 ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
