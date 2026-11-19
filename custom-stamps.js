const ALLOWED_STYLES = new Set([
  "dashed-ink",
  "wax-crimson",
  "wax-gold",
  "custom-border"
]);

export function sanitizeCustomEmoji(rawEmoji = "") {
  const cleaned = String(rawEmoji || "").trim();
  if (!cleaned) return "✨";

  const segments = Array.from(cleaned);
  return segments.slice(0, 2).join("");
}

export function sanitizeCustomTitle(rawTitle = "") {
  const cleaned = String(rawTitle || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "My Custom Stamp";
  return cleaned.slice(0, 32);
}

export function buildCustomStampPayload(input = {}) {
  const emoji = sanitizeCustomEmoji(input.emoji);
  const title = sanitizeCustomTitle(input.title);
  const badgeStyle = ALLOWED_STYLES.has(input.badge_style)
    ? input.badge_style
    : "custom-border";

  return {
    id: `custom-${Date.now()}`,
    title,
    emoji,
    badge_style: badgeStyle,
    tier: "custom_fee",
    price_label: "₱49+ custom / ₱5 add-on ($2–$5+ abroad)",
    price_local_php: 49,
    price_abroad_usd: 2,
    allow_add_on: true,
    can_render_in_message: true,
    flash_message: `Custom Stamp "${title}" (${emoji}) — ₱49+ custom o ₱5 add-on local ($2–$5+ abroad) sa Gumroad.`,
    gumroad_url: input.gumroad_url || "https://gumroad.com/"
  };
}
