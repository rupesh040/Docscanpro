/**
 * One list of sections, shared by the navbar, the mobile menu and the scan
 * rail, so the three can never disagree about what the page contains.
 */

export interface PageSection {
  /** Element id on the section element. */
  id: string;
  /** Full label used in navigation. */
  label: string;
  /** Short label used on the scan rail, where space is vertical. */
  rail: string;
  /** Whether the section appears in the top navigation. */
  inNav: boolean;
}

export const pageSections: PageSection[] = [
  { id: "bench", label: "Extraction bench", rail: "Bench", inNav: true },
  { id: "workflow", label: "How it works", rail: "Steps", inNav: false },
  { id: "sheets", label: "Sheets", rail: "Sheets", inNav: true },
  { id: "controls", label: "Controls", rail: "Controls", inNav: false },
  { id: "local", label: "Stays local", rail: "Local", inNav: true },
  { id: "output", label: "Output", rail: "Output", inNav: true },
  { id: "questions", label: "Questions", rail: "Questions", inNav: true },
  { id: "download", label: "Download", rail: "Get it", inNav: false },
];

export const sectionIds: string[] = pageSections.map((s) => s.id);

export const navSections: PageSection[] = pageSections.filter((s) => s.inNav);

/** Offset used when scrolling a section under the fixed header. */
export const SCROLL_OFFSET = 78;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
