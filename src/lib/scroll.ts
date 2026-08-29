/**
 * Smoothly scrolls the given element (by id) into view.
 * No-ops on the server or if the target doesn't exist yet.
 */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
