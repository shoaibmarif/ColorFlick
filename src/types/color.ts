export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100 (%)
  l: number; // 0-100 (%)
}

export interface HSV {
  h: number; // 0-360
  s: number; // 0-100 (%)
  v: number; // 0-100 (%)
}

export interface OKLab {
  L: number; // Lightness ~0 to 1
  a: number; // Green-Red axis
  b: number; // Blue-Yellow axis
}

export interface NamedColor {
  name: string;
  hex: string;
  category: string; // e.g., 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray'
}

export type WarmCoolCategory = 'Warm' | 'Cool' | 'Neutral';
export type LightDarkCategory = 'Light' | 'Dark';

