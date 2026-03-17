// Hero 星座效果：技能節點漂浮連線，滑鼠靠近時排斥 + 線段發光
// Desktop 限定：節點分配至左欄/右欄/頂帶，完全避開中央文字
// Mobile (< 768px) 不渲染（文字佔滿螢幕，無足夠邊距）
import { useEffect, useRef } from "react";
import { SKILL_PILLS } from "../data";

const LINK_DIST   = 210;
const REPEL_DIST  = 110;
const SPEED_MAX   = 0.7;
const MOUSE_GLOW  = 130;
const NODE_REPEL  = 90;

// 中央文字禁入矩形（比例）
const TX1 = 0.17;
const TX2 = 0.83;
const TY1 = 0.18;
const TY2 = 0.87;

export default function ConstellationSkills() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 768) return; // mobile: skip animation
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    /* ── 初始化：round-robin 分配至四個 margin zone ── */
    const marginZones = (W, H) => [
      { xMin: W * 0.03, xMax: W * (TX1 - 0.01), yMin: H * 0.05, yMax: H * 0.95 },  // 左欄
      { xMin: W * (TX2 + 0.01), xMax: W * 0.97, yMin: H * 0.05, yMax: H * 0.95 },  // 右欄
      { xMin: W * TX1, xMax: W * TX2, yMin: H * 0.03, yMax: H * (TY1 - 0.01) },    // 頂帶
      { xMin: W * TX1, xMax: W * TX2, yMin: H * (TY2 + 0.01), yMax: H * 0.97 },    // 底帶
    ];

    const W0 = canvas.offsetWidth;
    const H0 = canvas.offsetHeight;
    const zones = marginZones(W0, H0);

    const nodes = SKILL_PILLS.map((pill, i) => {
      const z = zones[i % zones.length];
      return {
        label : pill.label,
        color : pill.color,
        x: z.xMin + Math.random() * (z.xMax - z.xMin),
        y: z.yMin + Math.random() * (z.yMax - z.yMin),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      };
    });

    /* ── 主繪製迴圈 ── */
    function draw() {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const zx1 = W * TX1, zx2 = W * TX2;
      const zy1 = H * TY1, zy2 = H * TY2;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // 軟邊界反彈
        const pad = 45;
        if (n.x < pad)     n.vx += 0.04;
        if (n.x > W - pad) n.vx -= 0.04;
        if (n.y < pad)     n.vy += 0.04;
        if (n.y > H - pad) n.vy -= 0.04;

        // 速度阻尼
        const speed = Math.hypot(n.vx, n.vy);
        if (speed > SPEED_MAX) {
          n.vx *= SPEED_MAX / speed;
          n.vy *= SPEED_MAX / speed;
        }

        // 滑鼠排斥
        const dx   = n.x - mouse.x;
        const dy   = n.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_DIST && dist > 0) {
          const force = ((REPEL_DIST - dist) / REPEL_DIST) * 0.12;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        // 節點互斥
        nodes.forEach((b, j) => {
          if (j <= nodes.indexOf(n)) return;
          const dx2 = n.x - b.x;
          const dy2 = n.y - b.y;
          const d2  = Math.hypot(dx2, dy2);
          if (d2 < NODE_REPEL && d2 > 0) {
            const f = ((NODE_REPEL - d2) / NODE_REPEL) * 0.035;
            n.vx += (dx2 / d2) * f;
            n.vy += (dy2 / d2) * f;
            b.vx -= (dx2 / d2) * f;
            b.vy -= (dy2 / d2) * f;
          }
        });

        // 文字禁入區：進入後強制彈出至最近邊緣
        if (n.x > zx1 && n.x < zx2 && n.y > zy1 && n.y < zy2) {
          const dL = n.x - zx1;
          const dR = zx2 - n.x;
          const dT = n.y - zy1;
          const dB = zy2 - n.y;
          const minD = Math.min(dL, dR, dT, dB);

          if (minD === dL) {
            n.x = zx1 - 5;
            n.vx = Math.min(n.vx - 0.3, -0.45);
          } else if (minD === dR) {
            n.x = zx2 + 5;
            n.vx = Math.max(n.vx + 0.3,  0.45);
          } else if (minD === dT) {
            n.y = zy1 - 5;
            n.vy = Math.min(n.vy - 0.3, -0.45);
          } else {
            n.y = zy2 + 5;
            n.vy = Math.max(n.vy + 0.3,  0.45);
          }
        }
      });

      /* -- 連線 -- */
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a    = nodes[i];
          const b    = nodes[j];
          const dist = Math.hypot(b.x - a.x, b.y - a.y);
          if (dist > LINK_DIST) continue;

          const baseAlpha = (1 - dist / LINK_DIST) * 0.32;
          const mx   = (a.x + b.x) / 2;
          const my   = (a.y + b.y) / 2;
          const md   = Math.hypot(mx - mouse.x, my - mouse.y);
          const glow = md < MOUSE_GLOW ? (1 - md / MOUSE_GLOW) : 0;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          if (glow > 0) {
            ctx.strokeStyle = `rgba(255,98,0,${Math.min(baseAlpha + glow * 0.55, 0.85)})`;
            ctx.lineWidth   = 0.8 + glow * 1.2;
          } else {
            ctx.strokeStyle = `rgba(160,154,145,${baseAlpha})`;
            ctx.lineWidth   = 0.8;
          }
          ctx.stroke();
        }
      }
      ctx.restore();

      /* -- 節點 + 文字 -- */
      nodes.forEach((n) => {
        const md      = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const hovered = md < 70;

        ctx.beginPath();
        ctx.arc(n.x, n.y, hovered ? 8 : 5.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color + (hovered ? "44" : "28");
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, hovered ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = hovered ? "#FF6200" : n.color;
        ctx.fill();

        // 左欄節點把 label 畫在左側，避免延伸進文字區
        ctx.font      = `${hovered ? "600 " : ""}11px/1 'SF Mono', 'Fira Mono', monospace`;
        ctx.fillStyle = hovered ? "#111111" : "#9B9590";
        if (n.x < canvas.offsetWidth * TX1) {
          ctx.fillText(n.label, n.x - 12 - ctx.measureText(n.label).width, n.y + 4);
        } else {
          ctx.fillText(n.label, n.x + 10, n.y + 4);
        }
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    // 掛在 window 上追蹤滑鼠，讓整個 hero section（包含中央文字區）都能響應
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // 在 canvas 範圍內才更新，否則讓節點自由漂移
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse = { x, y };
      } else {
        mouse = { x: -9999, y: -9999 };
      }
    };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
    />
  );
}
