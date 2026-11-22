"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type p5 from "p5";
import { FORM_PATH } from "@/lib/funnel/config";

const LOGO_SRC =
  "https://assets.cdn.filesafe.space/WngHsAfzZPxeecb7veIn/media/6ad8322cf9a985d42c4e4d7b.webp";
const PERSONAL_HREF = FORM_PATH;
const BUSINESS_HREF = FORM_PATH;

const TAU = Math.PI * 2;
const HUES: Record<string, number[]> = {
  idle: [255, 255, 255],
  personal: [110, 145, 255],
  business: [70, 200, 228],
};

type Stroke = {
  x: number;
  y: number;
  t: number;
  c: number;
  s: number;
  a: number;
  k: number;
  calm: number;
};

const wrap = (d: number) => {
  d %= TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};
const lerpAng = (a: number, b: number, t: number) => a + wrap(b - a) * t;
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const smooth = (t: number) => t * t * (3 - 2 * t);

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.5l7-7M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AuraHero() {
  const heroRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const host = fieldRef.current;
    const copy = copyRef.current;
    if (!hero || !host || !copy) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const hot = HUES.idle.slice();
    let hotTarget = HUES.idle;

    let instance: p5 | null = null;
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    import("p5").then(({ default: P5 }) => {
      if (cancelled) return;

      instance = new P5((p: p5) => {
        let strokes: Stroke[] = [];
        let colSp = 100;
        let scale = 1;
        let W = 1;
        let H = 1;
        let startMs = 0;
        let px = -1e5;
        let py = -1e5;
        let tx = 0;
        let ty = 0;
        let pa = 0;
        let lastInput = -1e9;
        let pulses: Array<{ x: number; y: number; t: number }> = [];
        let visible = true;
        let pageShown = true;

        function build() {
          const cols = W < 560 ? 7 : W < 980 ? 10 : 13;
          const marginX = W * (W < 560 ? 0.07 : 0.065);
          colSp = (W - marginX * 2) / (cols - 1);
          const top = H * 0.14;
          const span = H * 0.78;
          const rows = Math.max(3, Math.round(span / colSp) + 1);
          const rowSp = span / (rows - 1);
          scale = clamp(W / 1650, 0.6, 1);

          p.randomSeed(11);
          strokes = [];
          for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
              const c = p.random(TAU);
              strokes.push({
                x: marginX + i * colSp,
                y: top + j * rowSp,
                t: i / (cols - 1),
                c,
                s: p.random(TAU),
                a: c,
                k: 0,
                calm: 1,
              });
            }
          }
          computeCalm();
        }

        function computeCalm() {
          const hr = host!.getBoundingClientRect();
          const floor = W < 720 ? 0.4 : 0.5;
          const zones = [copy!, hero!.querySelector<HTMLElement>(".ah-bottom")]
            .filter((el): el is HTMLElement => !!el)
            .map((el) => {
              const r = el.getBoundingClientRect();
              return { x: r.left - hr.left - 20, y: r.top - hr.top - 12, w: r.width + 40, h: r.height + 24 };
            });
          for (const n of strokes) {
            let f = 1;
            for (const z of zones) {
              const dx = Math.max(z.x - n.x, 0, n.x - (z.x + z.w));
              const dy = Math.max(z.y - n.y, 0, n.y - (z.y + z.h));
              f = Math.min(f, clamp(Math.hypot(dx, dy) / 60, 0, 1));
            }
            n.calm = floor + (1 - floor) * smooth(f);
          }
        }

        function pulse(x: number, y: number) {
          if (!reduce) pulses.push({ x, y, t: performance.now() });
        }

        function frame(now: number, still: boolean) {
          const dt = still ? 0 : Math.min(p.deltaTime || 16, 50);
          const org = still ? 1 : ease(clamp((now - startMs - 350) / 2800, 0, 1));
          const f = still ? 1 : 1 - Math.exp(-dt / 110);
          const active = !still && now - lastInput <= 2600;
          if (px < -9e4) {
            px = tx;
            py = ty;
          }
          px += (tx - px) * f;
          py += (ty - py) * f;
          pa += ((active ? 1 : 0) - pa) * f;
          for (let c = 0; c < 3; c++) {
            hot[c] += (hotTarget[c] - hot[c]) * (still ? 1 : 1 - Math.exp(-dt / 220));
          }
          const R = colSp * (coarse ? 1.5 : 2);
          const af = still ? 1 : 1 - Math.exp(-dt / 90);
          const tt = still ? 0 : now;
          const wStart = Math.max(1, 1.2 * scale);
          const wEnd = Math.max(3.5, 8.2 * scale);

          p.clear();
          p.strokeCap(p.SQUARE);
          pulses = pulses.filter((pu) => now - pu.t <= 1100);

          for (const n of strokes) {
            const local = clamp(org * 1.7 - n.t * 0.7, 0, 1);
            const form =
              -0.8 - 2.95 * n.t + Math.sin(tt * 0.0009 + n.t * 3 + n.s) * 0.035;
            const chaos = n.c + Math.sin(tt * 0.0016 + n.s) * 0.5;
            let target = lerpAng(chaos, form, ease(local));

            const dx = n.x - px;
            const dy = n.y - py;
            const d = Math.hypot(dx, dy);
            let k = 0;
            if (d < R) {
              k = 1 - d / R;
              k = smooth(k) * pa;
            }
            let kp = 0;
            let pcx = px;
            let pcy = py;
            for (const pu of pulses) {
              const age = (now - pu.t) / 1100;
              const rad = (now - pu.t) * 0.45;
              const dd = Math.abs(Math.hypot(n.x - pu.x, n.y - pu.y) - rad);
              if (dd < 70) {
                const v = (1 - dd / 70) * (1 - age);
                if (v > kp) {
                  kp = v;
                  pcx = pu.x;
                  pcy = pu.y;
                }
              }
            }
            const useP = kp * 0.9 > k;
            k = Math.max(k, kp * 0.9);
            if (k > 0.001) {
              const ox = n.x - (useP ? pcx : px);
              const oy = n.y - (useP ? pcy : py);
              target = lerpAng(target, Math.atan2(oy, ox) + Math.PI / 2, Math.min(1, k * 0.9));
            }
            n.a = still ? target : lerpAng(n.a, target, af);
            n.k += (k - n.k) * (still ? 1 : 0.25);

            const kk = n.k;
            const alpha = clamp((0.3 + 0.68 * local) * n.calm + kk * 0.6, 0, 1);
            const m = Math.min(1, kk * 1.3);
            p.stroke(
              255 + (hot[0] - 255) * m,
              255 + (hot[1] - 255) * m,
              255 + (hot[2] - 255) * m,
              alpha * 255,
            );
            p.strokeWeight((wStart + (wEnd - wStart) * Math.pow(n.t, 1.1)) * (1 + kk * 0.45));
            const half = (colSp * 1.02) / 2;
            const ux = Math.cos(n.a) * half;
            const uy = Math.sin(n.a) * half;
            p.line(n.x - ux, n.y - uy, n.x + ux, n.y + uy);
          }

          if (!still) {
            p.noFill();
            p.strokeWeight(1);
            for (const pp of pulses) {
              const ag = (now - pp.t) / 1100;
              p.stroke(hot[0], hot[1], hot[2], (1 - ag) * 110);
              p.circle(pp.x, pp.y, (now - pp.t) * 0.9);
            }
          }
        }

        p.setup = () => {
          const r = host.getBoundingClientRect();
          W = Math.max(1, r.width);
          H = Math.max(1, r.height);
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
          const cv = p.createCanvas(W, H);
          cv.parent(host);
          cv.elt.setAttribute("aria-hidden", "true");
          p.frameRate(coarse ? 30 : 60);
          build();
          startMs = performance.now();
          tx = W * 0.7;
          ty = H * 0.5;
          host.classList.add("ah-ready");
          if (reduce) {
            frame(performance.now(), true);
            p.noLoop();
          }
        };

        p.draw = () => {
          if (!reduce) frame(performance.now(), false);
        };

        const sync = () => {
          if (reduce) return;
          if (visible && pageShown) p.loop();
          else p.noLoop();
        };

        const io = new IntersectionObserver((e) => {
          visible = e[0].isIntersecting;
          sync();
        });
        io.observe(hero);
        const onVis = () => {
          pageShown = !document.hidden;
          sync();
        };
        document.addEventListener("visibilitychange", onVis);

        let lw = 0;
        let lh = 0;
        const ro = new ResizeObserver(() => {
          const r = host.getBoundingClientRect();
          if (Math.abs(r.width - lw) < 1 && Math.abs(r.height - lh) < 1) return;
          lw = r.width;
          lh = r.height;
          W = Math.max(1, r.width);
          H = Math.max(1, r.height);
          p.resizeCanvas(W, H);
          build();
          if (reduce) frame(performance.now(), true);
        });
        ro.observe(hero);

        const settle = window.setTimeout(computeCalm, 2600);
        cleanups.push(() => {
          window.clearTimeout(settle);
          io.disconnect();
          ro.disconnect();
          document.removeEventListener("visibilitychange", onVis);
        });

        if (!reduce) {
          const onMove = (e: PointerEvent) => {
            const r = host.getBoundingClientRect();
            tx = e.clientX - r.left;
            ty = e.clientY - r.top;
            lastInput = performance.now();
          };
          const onLeave = () => {
            lastInput = -1e9;
          };
          const onDown = (e: PointerEvent) => {
            onMove(e);
            pulse(tx, ty);
          };
          hero.addEventListener("pointermove", onMove, { passive: true });
          hero.addEventListener("pointerleave", onLeave);
          hero.addEventListener("pointerdown", onDown, { passive: true });
          cleanups.push(() => {
            hero.removeEventListener("pointermove", onMove);
            hero.removeEventListener("pointerleave", onLeave);
            hero.removeEventListener("pointerdown", onDown);
          });

          hero.querySelectorAll<HTMLElement>("[data-path]").forEach((b) => {
            const on = () => {
              hotTarget = HUES[b.dataset.path ?? "idle"] ?? HUES.idle;
              const r = b.getBoundingClientRect();
              const h = host.getBoundingClientRect();
              pulse(r.left - h.left + r.width / 2, r.top - h.top + r.height / 2);
            };
            const off = () => {
              hotTarget = HUES.idle;
            };
            b.addEventListener("mouseenter", on);
            b.addEventListener("mouseleave", off);
            b.addEventListener("focus", on);
            b.addEventListener("blur", off);
            cleanups.push(() => {
              b.removeEventListener("mouseenter", on);
              b.removeEventListener("mouseleave", off);
              b.removeEventListener("focus", on);
              b.removeEventListener("blur", off);
            });
          });
        }
      });
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      instance?.remove();
      host.classList.remove("ah-ready");
    };
  }, []);

  const word = (text: string, i: number) => (
    <span className="ah-w" style={{ "--i": i } as React.CSSProperties}>
      {text}
    </span>
  );

  return (
    <section ref={heroRef} className="ah-hero" aria-labelledby="hero-heading">
      <div ref={fieldRef} className="ah-field" />
      <div className="ah-inner">
        <div className="ah-top">
          <a href="https://credabuddi.com/" className="ah-logo">
            <Image src={LOGO_SRC} alt="CREDA BUDDi" width={160} height={50} priority />
          </a>
          <a className="ah-navpill" href={BUSINESS_HREF}>
            Check My Funding Readiness
          </a>
          <a className="ah-ibtn" href={BUSINESS_HREF} aria-label="Start my funding review">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a className="ah-ibtn" href="mailto:info@credabuddi.com" aria-label="Email CREDA BUDDi">
            <span aria-hidden="true">?</span>
          </a>
          <a
            className="ah-ibtn ah-ibtn-accent"
            href={PERSONAL_HREF}
            aria-label="Check my funding readiness"
          >
            <ArrowUpRight />
          </a>
        </div>

        <div ref={copyRef} className="ah-copy">
          <p className="ah-eyebrow">Your financial support system</p>
          <h1 id="hero-heading" className="ah-title">
            <span className="ah-line">
              {word("Your", 0)} {word("Credit.", 1)}
            </span>
            <span className="ah-line">
              {word("Our", 2)} {word("Support.", 3)}
            </span>
            <span className="ah-line">
              {word("A", 4)} {word("Brighter", 5)} {word("Future.", 6)}
            </span>
          </h1>
          <p className="ah-lede">
            Denied, stuck, or tired of guessing? CREDA BUDDi gives you a clear
            plan to understand your credit, work on your profile and prepare
            for personal and business funding.
          </p>
          <p className="ah-best">Best for registered businesses with revenue.</p>
          <div className="ah-paths">
            <a className="ah-pill ah-personal" data-path="personal" href={PERSONAL_HREF}>
              Personal Credit &amp; Funding
              <i aria-hidden="true">
                <ArrowUpRight />
              </i>
            </a>
            <a className="ah-pill ah-business" data-path="business" href={BUSINESS_HREF}>
              Business Credit &amp; Funding
              <i aria-hidden="true">
                <ArrowUpRight />
              </i>
            </a>
          </div>
        </div>

        <div className="ah-bottom">
          <ul className="ah-trust">
            <li>Credit Education</li>
            <li>Funding Readiness</li>
            <li>Real Team Support</li>
          </ul>
          <p className="ah-fine">Results vary. No guarantees.</p>
        </div>
      </div>
    </section>
  );
}
