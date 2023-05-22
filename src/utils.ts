import type { RGB } from "color-convert/conversions";
import convert from "color-convert";

export function toHex(rgb: RGB) {
  return `#${convert.rgb.hex(rgb)}`;
}
export function toRGB(rgb: RGB, full: boolean = true): string {
  const texted = rgb.join(", ");
  return full ? `rgb(${texted})` : texted;
}

export function toRGBA(rgb: RGB, opacity: number): string {
  const texted = rgb.join(", ");
  return `rgb(${texted}, ${opacity})`;
}
export function toHSL(rgb: RGB): string {
  const [h, s, l] = convert.rgb.hsl(rgb);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function overlay(color1: RGB, color2: RGB, opacity: number): RGB {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;

  return [
    Math.round(r1 * (1 - opacity) + r2 * opacity),
    Math.round(g1 * (1 - opacity) + g2 * opacity),
    Math.round(b1 * (1 - opacity) + b2 * opacity),
  ];
}
