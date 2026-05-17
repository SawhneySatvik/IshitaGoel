"use client";

import { useEffect, useRef } from "react";
import {
  vertex,
  fragment,
  readPalette,
  themeWeights,
} from "@/lib/shader";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    let raf = 0;
    let running = true;
    let disposed = false;
    const cleanups: Array<() => void> = [];

    (async () => {
      let mod: typeof import("ogl");
      try {
        mod = await import("ogl");
      } catch {
        return;
      }
      if (disposed) return;
      const { Renderer, Triangle, Program, Mesh } = mod;

      let renderer;
      try {
        renderer = new Renderer({
          canvas,
          dpr: Math.min(window.devicePixelRatio || 1, 1.75),
          alpha: false,
          antialias: false,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }
      const gl = renderer.gl;

      const pal = readPalette();
      const w0 = themeWeights();

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [1, 1] },
          uMouse: { value: [0.5, 0.5] },
          uScroll: { value: 0 },
          uPaper: { value: pal.paper },
          uAccent: { value: pal.accent },
          uSage: { value: pal.sage },
          uRose: { value: pal.rose },
          uPaperMix: { value: w0.pm },
          uWAccent: { value: w0.wa },
          uWSage: { value: w0.ws },
          uWRose: { value: w0.wr },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        const w = parent.clientWidth || window.innerWidth;
        const h = parent.clientHeight || window.innerHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w, h];
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(parent);
      cleanups.push(() => ro.disconnect());

      const target = [0.5, 0.5];
      const cur = [0.5, 0.5];
      const onMove = (e: MouseEvent) => {
        target[0] = e.clientX / window.innerWidth;
        target[1] = 1 - e.clientY / window.innerHeight;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("mousemove", onMove));

      const mo = new MutationObserver(() => {
        const np = readPalette();
        program.uniforms.uPaper.value = np.paper;
        program.uniforms.uAccent.value = np.accent;
        program.uniforms.uSage.value = np.sage;
        program.uniforms.uRose.value = np.rose;
        const w = themeWeights();
        program.uniforms.uPaperMix.value = w.pm;
        program.uniforms.uWAccent.value = w.wa;
        program.uniforms.uWSage.value = w.ws;
        program.uniforms.uWRose.value = w.wr;
      });
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      cleanups.push(() => mo.disconnect());

      const start = performance.now();
      const render = (now: number) => {
        cur[0] += (target[0] - cur[0]) * 0.04;
        cur[1] += (target[1] - cur[1]) * 0.04;
        program.uniforms.uMouse.value = [cur[0], cur[1]];
        program.uniforms.uScroll.value =
          (window.scrollY || 0) / Math.max(window.innerHeight, 1);
        program.uniforms.uTime.value = (now - start) / 1000;
        renderer.render({ scene: mesh });
      };
      const loop = () => {
        cancelAnimationFrame(raf);
        const tick = (now: number) => {
          if (!running || disposed) return;
          render(now);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      };

      const io = new IntersectionObserver(
        (entries) => {
          running = entries[0]?.isIntersecting ?? true;
          if (running) loop();
        },
        { threshold: 0 }
      );
      io.observe(parent);
      cleanups.push(() => io.disconnect());

      const onVis = () => {
        running = document.visibilityState === "visible";
        if (running) loop();
      };
      document.addEventListener("visibilitychange", onVis);
      cleanups.push(() => document.removeEventListener("visibilitychange", onVis));

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      });

      loop();
    })();

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
