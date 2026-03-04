// 技能標籤物理牆（Matter.js）
// 標籤會像積木一樣掉落堆疊，可以用滑鼠推動
import { useState, useEffect, useRef } from "react";
import Matter from "matter-js";
import { SKILL_PILLS } from "../data";
import styles from './PhysicsSkillsWall.module.css';

const PILL_HEIGHT = 32;

// 根據文字長度估算標籤寬度
function getPillWidth(label) {
  const charWidth = 7.5; // 每個字元約 7.5px（12px mono 字體）
  return Math.max(label.length * charWidth + 32, 80);
}

export default function PhysicsSkillsWall() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const pillRefs     = useRef([]);
  const engineRef    = useRef(null);
  const renderRef    = useRef(null);
  const runnerRef    = useRef(null);
  const bodiesRef    = useRef([]);
  const rafRef       = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initPhysics();
    return () => cleanup();
  }, []);

  function initPhysics() {
    const container = containerRef.current;
    if (!container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    const isMobile = W < 640;
    const pills = isMobile ? SKILL_PILLS.slice(0, 8) : SKILL_PILLS;

    const { Engine, Render, Runner, Bodies, Body, World, Mouse, MouseConstraint } = Matter;

    // 建立物理引擎
    const engine = Engine.create({ gravity: { x: 0, y: 1.2 } });
    engineRef.current = engine;

    // 透明畫布（只用來接收滑鼠事件）
    const render = Render.create({
      element: container,
      canvas: canvasRef.current,
      engine,
      options: {
        width: W, height: H,
        background: "transparent",
        wireframes: false,
        pixelRatio: 1,
      },
    });
    renderRef.current = render;

    // 邊界牆（底部、左、右，不可見）
    const wallOpts = { isStatic: true, render: { fillStyle: "transparent" }, friction: 0.3, restitution: 0.4 };
    const floor = Bodies.rectangle(W / 2, H + 25, W + 100, 50, wallOpts);
    const wallL = Bodies.rectangle(-25, H / 2, 50, H * 2, wallOpts);
    const wallR = Bodies.rectangle(W + 25, H / 2, 50, H * 2, wallOpts);
    World.add(engine.world, [floor, wallL, wallR]);

    // 建立每個技能標籤的物理 body
    const pillBodies = pills.map((skill, i) => {
      const pw = getPillWidth(skill.label);
      const x = Math.random() * (W - pw) + pw / 2;
      const y = -PILL_HEIGHT * 2 - i * 28; // 從畫面上方依序落下
      const body = Bodies.rectangle(x, y, pw, PILL_HEIGHT, {
        restitution: 0.5,
        friction: 0.3,
        frictionAir: 0.018,
        chamfer: { radius: PILL_HEIGHT / 2 },
        render: { fillStyle: "transparent" },
        label: skill.label,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      return body;
    });

    World.add(engine.world, pillBodies);
    bodiesRef.current = pillBodies;

    // 滑鼠可以拖曳標籤
    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.15, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // 滑鼠移近時推開標籤
    canvasRef.current.addEventListener("mousemove", onMouseMove);
    // 點擊時把附近標籤彈起來
    canvasRef.current.addEventListener("click", onMouseClick);

    // 啟動物理引擎
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // 每幀同步 DOM 標籤位置與物理 body 位置
    function syncDOM() {
      pillBodies.forEach((body, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        const { x, y } = body.position;
        const angle = body.angle;
        const hw = getPillWidth(pills[i].label) / 2;
        el.style.transform = `translate(${x - hw}px, ${y - PILL_HEIGHT / 2}px) rotate(${angle}rad)`;
      });
      rafRef.current = requestAnimationFrame(syncDOM);
    }
    syncDOM();
    setReady(true);

    function onMouseMove(e) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      pillBodies.forEach(body => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = 0.003 * (80 - dist) / 80;
          Body.applyForce(body, body.position, { x: dx * force, y: dy * force });
        }
      });
    }

    function onMouseClick(e) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      pillBodies.forEach(body => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          Body.applyForce(body, body.position, {
            x: (dx / dist) * 0.025,
            y: -0.04,
          });
        }
      });
    }
  }

  function cleanup() {
    if (rafRef.current)    cancelAnimationFrame(rafRef.current);
    if (renderRef.current) Matter.Render.stop(renderRef.current);
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (engineRef.current) Matter.Engine.clear(engineRef.current);
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const visiblePills = isMobile ? SKILL_PILLS.slice(0, 8) : SKILL_PILLS;

  return (
    <div ref={containerRef} className={styles.container}>
      {/* 透明畫布，負責接收 Matter.js 滑鼠事件 */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* DOM 標籤，透過 JS 同步物理位置 */}
      {visiblePills.map((skill, i) => (
        <div
          key={skill.label}
          ref={el => pillRefs.current[i] = el}
          className={styles.pill}
          data-ready={ready}
          style={{
            '--color': skill.color,
            width: `${getPillWidth(skill.label)}px`,
            height: `${PILL_HEIGHT}px`,
            borderRadius: `${PILL_HEIGHT / 2}px`,
          }}
        >
          <span
            className={styles.pillDot}
            style={{ background: skill.color, boxShadow: `0 0 5px ${skill.color}` }}
          />
          <span className={styles.pillLabel}>
            {skill.label}
          </span>
        </div>
      ))}
    </div>
  );
}
