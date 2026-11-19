export function renderStampBadgeHTML(stamp) {
  const safeEmoji = String(stamp?.emoji || "✉️");
  const safeTitle = String(stamp?.title || "Stamp");
  const safeStyle = String(stamp?.badge_style || "dashed-ink");

  return `
    <span class="hv-stamp-badge hv-style-${safeStyle}" data-stamp-id="${stamp?.id || ""}">
      <span class="hv-stamp-emoji" aria-hidden="true">${safeEmoji}</span>
      <span class="hv-stamp-label">${safeTitle}</span>
    </span>
  `.trim();
}

export function renderStampCardHTML(stamp, isSelected = false) {
  const priceText = stamp?.price_label || "Free";
  const canRender = Boolean(stamp?.can_render_in_message);
  const statusText = canRender ? "Ready for message" : "Custom / Gumroad flow";

  return `
    <button
      type="button"
      class="hv-stamp-card ${isSelected ? "is-selected" : ""}"
      data-stamp-id="${stamp?.id || ""}"
    >
      <div class="hv-stamp-top">
        <span class="hv-stamp-emoji-lg">${stamp?.emoji || "✉️"}</span>
        <span class="hv-stamp-price">${priceText}</span>
      </div>
      <div class="hv-stamp-title">${stamp?.title || "Untitled Stamp"}</div>
      <div class="hv-stamp-meta">${statusText}</div>
    </button>
  `.trim();
}

export function renderMessageStampPreview(targetEl, stamp) {
  if (!targetEl) return;

  if (!stamp) {
    targetEl.innerHTML = `<span class="hv-empty-preview">Pumili ng stamp para makita ang render.</span>`;
    return;
  }

  if (stamp.can_render_in_message === false) {
    targetEl.innerHTML = `
      <div class="hv-custom-notice">
        ${renderStampBadgeHTML(stamp)}
        <p>Naka-set ito bilang custom flow—gamitin ang custom builder at Gumroad option para sa personalized stamp.</p>
      </div>
    `.trim();
    return;
  }

  targetEl.innerHTML = `
    <div class="hv-message-preview">
      ${renderStampBadgeHTML(stamp)}
      <span class="hv-payload-note">Payload ready: ${stamp.id}</span>
    </div>
  `.trim();
}
