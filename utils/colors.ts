function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const rgb = [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// These values should match the CSS variables in global.css
export const colors = {
  background: '#FFFFFF',
  foreground: '#09090B',
  primary: '#007AFF',
  'primary-foreground': '#FFFFFF',
  secondary: '#F4F4F5',
  'secondary-foreground': '#18181B',
  muted: '#F4F4F5',
  'muted-foreground': '#71717A',
  accent: '#F4F4F5',
  'accent-foreground': '#18181B',
  destructive: '#EF4444',
  'destructive-foreground': '#FAFAFA',
  border: '#E4E4E7',
  input: '#E4E4E7',
  ring: '#18181B',
} as const;

export type ColorName = keyof typeof colors;

export function getColor(name: ColorName): string {
  return colors[name];
} 