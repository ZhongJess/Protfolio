// Hero 星座效果：技能節點漂浮連線，滑鼠靠近時排斥 + 線段發光
import { useEffect, useRef } from "react";
import { SKILL_PILLS } from "../data";

const LINK_DIST   = 210;   // 連線距離閾值
const REPEL_DIST  = 110;   // 滑鼠排斥距離
const SPEED_MAX   = 0.55;  // 最大速度
const MOUSE_GLOW  = 130;   // 線段滑鼠發光範圍
const NODE_REPEL  = 90;    // 節點互斥距離（避免擠堆）

// 文字區禁入比例：節點只能在上方帶狀區域浮動
const ZONE_X1 = 0.0;
const ZONE_X2 = 1.0;
const ZONE_Y1 = 0.30;   // 節點可活動區：canvas 頂部 30%
const ZONE_Y2 = 1.0;

export default function ConstellationSkills() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -9999, y: -9999 };

    /* ── DPR-aware resize ─────────────────────────────────── */
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

    /* ── 分散初始化節點 ────────────────────────────────────── */
    const pills = SKILL_PILLS;
    const cols  = 4;
    const rows  = Math.ceil(pills.length / cols);

    const nodes = pills.map((pill) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      // 初始化時直接放在四邊邊緣帶，不進入中心區
      let x, y, attempts = 0;
      do {
        x = Math.random() * W;
        y = Math.random() * H;
        attempts++;
      } while (
        x > W * ZONE_X1 && x < W * ZONE_X2 &&
        y > H * ZONE_Y1 && y < H * ZONE_Y2 &&
        attempts < 20
      );
      return {
        label : pill.label,
        color : pill.color,
        x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      };
    });

    /* ── 主繪製迴圈 ────────────────────────────────────────── */
    function draw() {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      /* -- 物理更新 -- */
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // 軟邊界反彈
        const pad = 50;
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

        // 節點互斥：太近的節點互相推開
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

        // 中心禁入區排斥：若節點進入中心區，往最近邊緣推
        const zx1 = W * ZONE_X1, zx2 = W * ZONE_X2;
        const zy1 = H * ZONE_Y1, zy2 = H * ZONE_Y2;
        if (n.x > zx1 && n.x < zx2 && n.y > zy1 && n.y < zy2) {
          const dLeft   = n.x - zx1;
          const dRight  = zx2 - n.x;
          const dTop    = n.y - zy1;
          const dBottom = zy2 - n.y;
          const minD    = Math.min(dLeft, dRight, dTop, dBottom);
          const force   = 0.14;
          if      (minD === dLeft)   n.vx -= force;
          else if (minD === dRight)  n.vx += force;
          else if (minD === dTop)    n.vy -= force;
          else                       n.vy += force;
        }
      });

      /* -- 連線 -- */
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a    = nodes[i];
          const b    = nodes[j];
          const dx   = b.x - a.x;
          const dy   = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;

          const baseAlpha = (1 - dist / LINK_DIST) * 0.32;

          // 滑鼠靠近線段中點時發橘光
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

        // 外圈光暈
        ctx.beginPath();
        ctx.arc(n.x, n.y, hovered ? 8 : 5.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color + (hovered ? "44" : "28");
        ctx.fill();

        // 實心點
        ctx.beginPath();
        ctx.arc(n.x, n.y, hovered ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = hovered ? "#FF6200" : n.color;
        ctx.fill();

        // 文字標籤
        ctx.font      = `${hovered ? "600 " : ""}11px/1 'SF Mono', 'Fira Mono', monospace`;
        ctx.fillStyle = hovered ? "#111111" : "#9B9590";
        ctx.fillText(n.label, n.x + 10, n.y + 4);
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    /* ── 事件 ──────────────────────────────────────────────── */
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
