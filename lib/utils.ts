import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatAmount(min: number | null, max: number | null): string {
  const fmt = (n: number) =>
    n >= 1_000_000
      ? `€${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `€${Math.round(n / 1_000)}K`
      : `€${n}`;
  if (!min && !max) return "Sumă nedefinită";
  if (!min) return `până la ${fmt(max!)}`;
  if (!max || min === max) return fmt(min);
  return `${fmt(min)} – ${fmt(max)}`;
}

export function deadlineLabel(days: number | null): string {
  if (days === null) return "Fără deadline";
  if (days < 0)  return "Expirat";
  if (days === 0) return "Azi!";
  if (days <= 7)  return `${days} zile`;
  return `${days} zile`;
}

export function deadlineColor(days: number | null): string {
  if (days === null || days < 0) return "text-bark-400";
  if (days <= 14) return "text-red-600";
  if (days <= 30) return "text-amber-600";
  return "text-leaf-600";
}

export const TOPIC_META: Record<string, { icon: string; bg: string; text: string }> = {
  "schimbari-climatice": { icon: "cloud-lightning", bg: "#EEEDFE", text: "#26215C" },
  "impaduriri":          { icon: "trees",           bg: "#E1F5EE", text: "#04342C" },
  "educatie-mediu":      { icon: "school",          bg: "#E6F1FB", text: "#042C53" },
  "economie-circulara":  { icon: "recycle",         bg: "#E1F5EE", text: "#085041" },
  "eficienta-energetica":{ icon: "zap",             bg: "#EAF3DE", text: "#173404" },
  "risipa-alimentara":   { icon: "shopping-basket", bg: "#FAEEDA", text: "#412402" },
  "calitatea-aerului":   { icon: "wind",            bg: "#FBEAF0", text: "#4B1528" },
};
