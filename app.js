async function loadMailStamps() {
  const gridEl = document.getElementById("stampGrid");
  const messageEl = document.getElementById("messageBox");
  const flashEl = document.getElementById("flashBox");

  if (!gridEl || !messageEl || !flashEl) return;

  try {
    const response = await fetch("stamps.json");
    if (!response.ok) {
      throw new Error("Hindi mabasa ang stamps.json");
    }

    const data = await response.json();
    const stamps = Array.isArray(data.stamps) ? data.stamps : [];

    gridEl.innerHTML = "";

    stamps.forEach((stamp) => {
      const cardBtn = document.createElement("button");
      cardBtn.type = "button";
      cardBtn.className = "stamp-card";
      cardBtn.setAttribute("data-stamp-id", stamp.id || "");

      const styleClass = stamp.badge_style ? `stamp-${stamp.badge_style}` : "stamp-dashed-ink";

      cardBtn.innerHTML = `
        <span class="stamp-emoji" aria-hidden="true">${escapeHtml(stamp.emoji || "✉️")}</span>
        <strong class="stamp-title">${escapeHtml(stamp.title || "Mail Stamp")}</strong>
        <span class="stamp-tier">${escapeHtml(stamp.tier || "free")}</span>
      `;

      cardBtn.addEventListener("click", () => {
        handleStampSelection(stamp, styleClass, messageEl, flashEl);
      });

      gridEl.appendChild(cardBtn);
    });
  } catch (err) {
    messageEl.textContent = "May problema sa pag-load ng stamps catalog.";
    flashEl.style.display = "none";
  }
}

function handleStampSelection(stamp, styleClass, messageEl, flashEl) {
  const safeEmoji = escapeHtml(stamp.emoji || "✉️");
  const safeTitle = escapeHtml(stamp.title || "Mail Stamp");

  if (stamp.can_render_in_message) {
    messageEl.innerHTML = `
      <span class="mail-text">Mail Dispatch: Handa na ang liham mo.</span>
      <span class="stamp-badge ${escapeHtml(styleClass)}">
        <span class="badge-emoji">${safeEmoji}</span>
        <span class="badge-label">${safeTitle}</span>
      </span>
    `;
  } else {
    messageEl.innerHTML = `
      <span class="mail-text">Mail Dispatch: Pumili ng stamp na puwede sa mensahe o silipin ang custom option sa flash message.</span>
    `;
  }

  if (stamp.flash_message && stamp.gumroad_url && isSafeUrl(stamp.gumroad_url)) {
    const safeFlashText = escapeHtml(stamp.flash_message);
    const safeUrl = escapeHtml(stamp.gumroad_url);

    flashEl.style.display = "block";
    flashEl.innerHTML = `
      <span>${safeFlashText}</span>
      <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">Buksan sa Gumroad</a>
    `;
  } else {
    flashEl.style.display = "none";
    flashEl.innerHTML = "";
  }
}

function isSafeUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

document.addEventListener("DOMContentLoaded", loadMailStamps);
