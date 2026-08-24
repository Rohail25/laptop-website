/**
 * Mutable animation targets shared between GSAP timelines (writers)
 * and the 3D model's useFrame loop (reader). Avoids React re-renders.
 */
export interface LaptopRig {
  /** lid open angle in degrees — 0 closed, ~110 fully open */
  lid: number;
  /** screen brightness 0..1 */
  screenOn: number;
  /** keyboard backlight 0..1 */
  glow: number;
  /** page-load progress 0..1 driving camera + entrance */
  intro: number;
}

export function createRig(): LaptopRig {
  return { lid: 0, screenOn: 0, glow: 0, intro: 0 };
}

export const LID_MIN = 4;
export const LID_MAX = 112;
