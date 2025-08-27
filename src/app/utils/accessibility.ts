/**
 * Global announcement function that can be set by the LiveRegion component
 */
let globalAnnounce:
  | ((message: string, priority?: "polite" | "assertive") => void)
  | null = null;

/**
 * Set the global announcement function
 */
export const setGlobalAnnounce = (
  announce: (message: string, priority?: "polite" | "assertive") => void,
) => {
  globalAnnounce = announce;
};

/**
 * Announces a message to screen readers using the global announcement function
 * Falls back to the old method if global function is not available
 */
export const announceToScreenReader = (
  message: string,
  priority: "polite" | "assertive" = "polite",
) => {
  // Use global announcement function if available
  if (globalAnnounce) {
    globalAnnounce(message, priority);
    return;
  }

  // Fallback to the old method for backward compatibility
  if (typeof window === "undefined") return;

  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");

  announcement.style.position = "absolute";
  announcement.style.left = "-10000px";
  announcement.style.width = "1px";
  announcement.style.height = "1px";
  announcement.style.overflow = "hidden";
  announcement.style.clip = "rect(0, 0, 0, 0)";
  announcement.style.whiteSpace = "nowrap";
  announcement.style.border = "0";

  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

/**
 * Announces a message with assertive priority (interrupts current speech)
 * Use sparingly for important, time-sensitive information
 */
export const announceAssertively = (message: string) => {
  announceToScreenReader(message, "assertive");
};
