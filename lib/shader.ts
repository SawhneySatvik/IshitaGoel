// Shared warm generative-shader primitives, reused by the hero backdrop and
// the footer wordmark fill. Client-only helpers (called inside effects).

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h || "000000", 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function readPalette() {
  const s = getComputedStyle(document.documentElement);
  return {
    paper: hexToRgb(s.getPropertyValue("--paper") || "#f1e8d9"),
    accent: hexToRgb(s.getPropertyValue("--accent") || "#c2693f"),
    sage: hexToRgb(s.getPropertyValue("--sage") || "#7e8b6b"),
    rose: hexToRgb(s.getPropertyValue("--rose") || "#c67b84"),
  };
}

// Per-theme intensity: light needs more saturated color + less paper mix-back
// so the warm field doesn't wash out on pale oat. Dark = original tuning.
export function themeWeights() {
  const dark = document.documentElement.classList.contains("dark");
  return dark
    ? { pm: 0.82, wa: 0.65, ws: 0.45, wr: 0.25 }
    : { pm: 0.92, wa: 0.8, ws: 0.42, wr: 0.3 };
}

export const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

export const fragment = /* glsl */ `precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform vec3 uPaper;
  uniform vec3 uAccent;
  uniform vec3 uSage;
  uniform vec3 uRose;
  uniform float uPaperMix;
  uniform float uWAccent;
  uniform float uWSage;
  uniform float uWRose;
  vec2 hash(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return -1.0 + 2.0*fract(sin(p)*43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(dot(hash(i+vec2(0.0,0.0)), f-vec2(0.0,0.0)), dot(hash(i+vec2(1.0,0.0)), f-vec2(1.0,0.0)), u.x),
               mix(dot(hash(i+vec2(0.0,1.0)), f-vec2(0.0,1.0)), dot(hash(i+vec2(1.0,1.0)), f-vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
  void main(){
    vec2 p = vUv;
    p.x *= uResolution.x / max(uResolution.y, 1.0);
    float t = uTime * 0.035;
    vec2 m = (uMouse - 0.5) * 0.35;
    vec2 q = vec2(fbm(p + t + m), fbm(p - t + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(p + 1.5*q + vec2(1.7, 9.2) + t), fbm(p + 1.5*q + vec2(8.3, 2.8) - t));
    float f = fbm(p + 1.2*r + uScroll*0.25);
    vec3 col = uPaper;
    col = mix(col, uAccent, clamp(smoothstep(0.0, 0.9, f) * uWAccent, 0.0, 1.0));
    col = mix(col, uSage, clamp(smoothstep(0.2, 1.0, r.x) * uWSage, 0.0, 1.0));
    col = mix(col, uRose, clamp(smoothstep(0.35, 0.95, q.y) * uWRose, 0.0, 1.0));
    col = mix(uPaper, col, uPaperMix);
    gl_FragColor = vec4(col, 1.0);
  }
`;
