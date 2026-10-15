"use client";

import { useEffect, useState } from "react";
import { Button, WindowsMark } from "@/components/ui/Button";
import site from "@/config/site";

/**
 * On a phone the hero's download button scrolls away quickly, so it comes
 * back as a bar once the reader is past it. Appears on small screens only.
 */
export function StickyDownload() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[70] flex items-center gap-3 border-t border-[var(--rule)] bg-[var(--graphite)]/94 px-4 py-[10px] backdrop-blur-[10px] transition-transform duration-300 min-[860px]:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!shown}
    >
      <p className="text-[11.5px] leading-[1.35] text-[var(--chalk-3)]">
        Windows 10 &amp; 11
        <br />
        Works offline
      </p>
      <Button
        as="a"
        href={site.downloadUrl ?? "#download"}
        size="sm"
        className="ml-auto flex-none"
        tabIndex={shown ? undefined : -1}
        disabled={!site.downloadUrl}
        disabledReason="The download link has not been configured yet."
      >
        <WindowsMark size={12} />
        Download
      </Button>
    </div>
  );
}
