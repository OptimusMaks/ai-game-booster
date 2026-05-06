"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

function SuccessGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="10" cy="10" r="8.33" stroke="#17B26A" strokeWidth="2" />
      <path
        d="M6.25 10.417 8.75 12.917 14.167 7.5"
        stroke="#17B26A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Fixed success toast — mobile: centered 278×52; lg+: top-right, width by content. */
export function AccountSuccessToast({ open, message }: { open: boolean; message: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={clsx(
        "fixed top-6 z-[110] box-border flex items-center gap-2 rounded-xl border border-[#D0D5DD] bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]",
        /* Mobile Figma: 278×52, centered */
        "left-1/2 right-auto h-[52px] w-[min(278px,calc(100vw-2rem))] max-w-[min(278px,calc(100vw-2rem))] -translate-x-1/2 px-4 py-0",
        /* Desktop: top-right, size by content */
        "lg:left-auto lg:right-6 lg:h-auto lg:min-h-[52px] lg:w-max lg:max-w-[calc(100vw-3rem)] lg:translate-x-0 lg:min-w-[min(278px,calc(100vw-3rem))] lg:p-4",
      )}
    >
      <SuccessGlyph className="size-5 shrink-0" />
      <p className="min-w-0 flex-1 truncate font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-5 text-[#101828] lg:shrink-0 lg:flex-none lg:whitespace-nowrap lg:overflow-visible">
        {message}
      </p>
    </div>,
    document.body,
  );
}
