// 作品列表頁
import { useState } from "react";
import { PROJECTS } from "../data";
import Tag from "../components/Tag";
import styles from './ProjectsPage.module.css';

// 滑鼠旁邊跟著跑的縮圖預覽
function CursorImage({ visible, pos, src }) {
  return (
    <div
      className={styles.cursorImg}
      data-visible={visible}
      style={{ left: pos.x + 24, top: pos.y - 130 }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

// 單一專案列
function ProjectRow({ project, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <>
      <CursorImage visible={isHovered} pos={mousePos} src={project.img} />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
        onClick={() => onSelect(project)}
        data-hovered={isHovered}
        className={styles.row}
      >
        {/* Hover 背景光暈 */}
        <div className={styles.rowGlow} data-hovered={isHovered} />

        {/* 序號 */}
        <span className={styles.num} data-hovered={isHovered}>
          {project.num}
        </span>

        {/* 標題 + 描述 */}
        <div>
          <div className="flex items-baseline gap-4 mb-2 flex-wrap">
            <h3 className={styles.title} data-hovered={isHovered}>
              {project.title}
            </h3>
            <div className="flex gap-[6px] flex-wrap">
              {project.tags.map(tag => (
                <Tag key={tag} label={tag} color={project.tagColor} />
              ))}
            </div>
          </div>
          <p className={styles.desc}>{project.desc}</p>
        </div>

        {/* 年份 + 箭頭 */}
        <div className="flex flex-col items-end gap-2">
          <span className={styles.year}>{project.year}</span>
          <span className={styles.arrow} data-hovered={isHovered}>↗</span>
        </div>
      </div>
    </>
  );
}

// 作品列表頁主元件
export default function ProjectsPage({ onSelect }) {
  return (
    <div className="bg-bg flex-1">
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          Featured Projects · {PROJECTS.length} Case Studies
        </span>
        <h1 className={styles.pageTitle}>Projects</h1>
      </div>
      <div className={styles.list}>
        {PROJECTS.map(project => (
          <ProjectRow key={project.id} project={project} onSelect={onSelect} />
        ))}
        <div className="border-t border-border" />
      </div>
    </div>
  );
}
