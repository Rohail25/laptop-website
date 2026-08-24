import * as THREE from "three";

const W = 1024;
const H = 700;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Draws the live desktop shown on the laptop display. */
export function drawScreen(ctx: CanvasRenderingContext2D, time: number) {
  // Wallpaper
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#f7f9ff");
  bg.addColorStop(0.55, "#e9edfd");
  bg.addColorStop(1, "#dbe3fa");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Ambient accent orbs
  const orb = ctx.createRadialGradient(W * 0.68, H * 0.32, 20, W * 0.68, H * 0.32, 340);
  orb.addColorStop(0, "rgba(43,80,255,0.28)");
  orb.addColorStop(1, "rgba(43,80,255,0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, W, H);

  const orb2 = ctx.createRadialGradient(W * 0.22, H * 0.78, 10, W * 0.22, H * 0.78, 300);
  orb2.addColorStop(0, "rgba(106,92,255,0.16)");
  orb2.addColorStop(1, "rgba(106,92,255,0)");
  ctx.fillStyle = orb2;
  ctx.fillRect(0, 0, W, H);

  // Faint grid
  ctx.strokeStyle = "rgba(16,18,34,0.045)";
  ctx.lineWidth = 1;
  for (let x = 64; x < W; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 44);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 108; y < H; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Menu bar
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillRect(0, 0, W, 44);
  ctx.fillStyle = "#10121a";
  ctx.font = "600 17px system-ui, sans-serif";
  ctx.fillText("MR OS", 26, 29);
  ctx.textAlign = "right";
  ctx.font = "500 16px system-ui, sans-serif";
  ctx.fillText("9:41", W - 26, 29);
  ctx.textAlign = "left";

  // Hero card
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  roundRect(ctx, 84, 120, 420, 240, 22);
  ctx.fill();
  ctx.fillStyle = "#10121a";
  ctx.font = "800 52px system-ui, sans-serif";
  ctx.fillText("MR X1", 116, 196);
  ctx.font = "400 21px system-ui, sans-serif";
  ctx.fillStyle = "#4a4f5c";
  ctx.fillText("Power, beautifully engineered.", 116, 232);

  // Progress meters
  const labels = ["CPU", "GPU", "AI"];
  const levels = [
    0.35 + Math.sin(time * 0.0011) * 0.18,
    0.55 + Math.sin(time * 0.0007 + 2) * 0.22,
    0.72 + Math.sin(time * 0.0009 + 4) * 0.12,
  ];
  labels.forEach((label, i) => {
    const y = 268 + i * 30;
    ctx.font = "600 14px system-ui, sans-serif";
    ctx.fillStyle = "#6b7078";
    ctx.fillText(label, 118, y + 5);
    ctx.fillStyle = "rgba(16,18,26,0.08)";
    roundRect(ctx, 168, y - 5, 290, 10, 5);
    ctx.fill();
    ctx.fillStyle = "#2b50ff";
    roundRect(ctx, 168, y - 5, Math.max(24, 290 * levels[i]), 10, 5);
    ctx.fill();
  });

  // Right widget — activity rings
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  roundRect(ctx, 560, 120, 380, 240, 22);
  ctx.fill();
  ctx.fillStyle = "#10121a";
  ctx.font = "600 19px system-ui, sans-serif";
  ctx.fillText("SYSTEM", 592, 158);
  const cx = 750;
  const cy = 250;
  [
    { r: 78, c: "#2b50ff", p: 0.82 },
    { r: 58, c: "#6a5cff", p: 0.64 },
    { r: 38, c: "#0ea5a4", p: 0.91 },
  ].forEach(({ r, c, p }) => {
    ctx.lineWidth = 13;
    ctx.strokeStyle = "rgba(16,18,26,0.07)";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = c;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
    ctx.stroke();
  });

  // Dock
  ctx.fillStyle = "rgba(255,255,255,0.66)";
  roundRect(ctx, W / 2 - 260, H - 96, 520, 64, 18);
  ctx.fill();
  const dockColors = ["#2b50ff", "#6a5cff", "#0ea5a4", "#f59e0b", "#ef4444", "#10121a"];
  dockColors.forEach((c, i) => {
    const x = W / 2 - 228 + i * 78;
    ctx.fillStyle = c;
    roundRect(ctx, x, H - 80, 48, 48, 12);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    roundRect(ctx, x + 8, H - 72, 32, 14, 6);
    ctx.fill();
  });
}

export function createScreenTexture(accent = "#2b50ff"): {
  texture: THREE.CanvasTexture;
  update: (time: number) => void;
  dispose: () => void;
} {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context unavailable");
  drawScreen(ctx, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  return {
    texture,
    update: (time: number) => {
      drawScreen(ctx, time);
      texture.needsUpdate = true;
      void accent;
    },
    dispose: () => texture.dispose(),
  };
}

/** Circular "MR" badge applied to the lid exterior. */
export function createLogoTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context unavailable");

  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 112, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(20,22,28,0.92)";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 104px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("MR", size / 2, size / 2 + 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
