// 頂部導覽列
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './Nav.module.css';

const NAV_LINKS = [
  ["about",    "About"],
  ["projects", "Projects"],
  ["repo",     "Repository"],
];

function IconMedium() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconCake() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 22V11L11 3L22 8V22H2Z" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // 判斷目前是否在某個路由底下
  const isActive = (id) => location.pathname.startsWith(`/${id}`);

  function handleNav(id) {
    navigate(`/${id}`);
    setMenuOpen(false);
  }

  return (
    <nav className={styles.nav}>
      {/* Logo / 名字按鈕 */}
      <button onClick={() => navigate("/")} className={styles.logo}>
        <span className={styles.logoDiamond}>◆</span>
        Your Name
      </button>

      {/* 桌面導覽連結 + CTA */}
      <div className={styles.desktopLinks}>
        {NAV_LINKS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => navigate(`/${id}`)}
            data-active={isActive(id)}
            className={styles.navLink}
          >
            {label}
          </button>
        ))}
        <a href="/resume.pdf" download className={styles.ctaButton}>
          <IconDownload /> 履歷下載
        </a>
      </div>

      {/* 手機漢堡按鈕 */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* 手機展開選單 */}
      {menuOpen && (
        <div className={styles.mobileMenu}>

          {/* 頁面連結：垂直置中 */}
          <div className={styles.mobileNavLinks}>
            {NAV_LINKS.map(([id, label]) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                data-active={isActive(id)}
                className={styles.mobileLink}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 社群 icons + 履歷下載：固定底部 */}
          <div className={styles.mobileBottom}>
            <div className={styles.mobileSocialsRow}>
              <a href="https://medium.com/@sk2377328815" target="_blank" rel="noopener noreferrer" className={styles.mobileIconLink} aria-label="Medium">
                <IconMedium />
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className={styles.mobileIconLink} aria-label="LinkedIn">
                <IconLinkedIn />
              </a>
              <a href="https://www.cakeresume.com/yourprofile" target="_blank" rel="noopener noreferrer" className={styles.mobileIconLink} aria-label="CakeResume">
                <IconCake />
              </a>
            </div>
            <a href="/resume.pdf" download className={styles.mobileResumeLink}>
              <IconDownload /> 履歷下載
            </a>
          </div>

        </div>
      )}
    </nav>
  );
}
