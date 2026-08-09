// Single source of truth for circle icons. CircleIconPicker's options map
// each pickable icon to an emoji here; every place that displays a circle's
// icon resolves through resolveCircleIcon.
export const CIRCLE_ICON_EMOJI: Record<string, string> = {
  group: "👥",
  marketing: "📣",
  programming: "💻",
  study: "📚",
  science: "🧪",
  more: "🎯",
};

export const DEFAULT_CIRCLE_ICON = "📚";

// Circles created before this fix have the picker's raw option id (e.g.
// "science") saved as their icon instead of an emoji — this map translates
// those old values on the fly so existing circles render correctly without
// a data migration. Anything already an emoji (or unrecognized) passes through.
export function resolveCircleIcon(icon?: string | null): string {
  if (!icon) return DEFAULT_CIRCLE_ICON;
  return CIRCLE_ICON_EMOJI[icon] ?? icon;
}
