"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type DownloadAppModalProps = {
  open: boolean;
  onClose: () => void;
  /** Optional copy overrides (UI strings stay English by default). */
  title?: string;
  subtitle?: string;
};

export function DownloadAppModal({
  open,
  onClose,
  title = "Download the HyperUp app",
  subtitle = "Scan qr code to install the app",
}: DownloadAppModalProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  const modal = (
    <div
      className="fixed inset-0 z-[130] isolate flex items-center justify-center p-6 sm:p-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#101828]/70 backdrop-blur-[8px]"
        aria-label="Dismiss"
        onClick={onClose}
      />
      <div
        className="relative z-[1] flex h-[390px] max-h-[calc(100dvh-2rem)] w-[min(700px,calc(100vw-2rem))] max-w-[700px] flex-col overflow-hidden rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.2),0px_8px_8px_-4px_rgba(16,24,40,0.08)] lg:h-[620px] lg:max-h-[calc(100dvh-2rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-app-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element -- local asset */}
          <img src="/assets/bg-download.png" alt="" className="absolute inset-0 size-full object-cover" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-[3] flex size-11 items-center justify-center rounded-lg text-white transition hover:bg-white/10"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="relative z-[2] flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Mobile: left 18/14, room for close. Desktop: centered 30/16, Figma top 50px / 399px / gap 16 */}
          <div className="flex w-full flex-col items-start px-4 pb-0 pr-14 pt-8 lg:items-center lg:px-4 lg:pt-[50px]">
            <div className="flex w-full flex-col items-start gap-3 lg:max-w-[399px] lg:items-center lg:gap-4">
              <h2
                id="download-app-modal-title"
                className="w-full text-left text-[18px] font-semibold leading-[22px] text-white lg:max-w-[399px] lg:text-center lg:text-[30px] lg:leading-[38px]"
              >
                {title}
              </h2>
              <p className="w-full text-left text-[14px] font-normal leading-5 text-white lg:max-w-[399px] lg:text-center lg:text-[16px] lg:leading-6">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-start px-4 pb-10 pt-8 max-lg:px-3 max-lg:pb-8 max-lg:pt-6 lg:pt-10">
            <div className="relative mx-auto aspect-square w-[min(215px,calc(100vw-3rem))] shrink-0 overflow-hidden rounded-xl bg-white/10 shadow-lg ring-1 ring-white/30 lg:w-[min(300px,calc(100vw-3rem))] lg:-translate-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- user-provided asset may be added locally */}
              <img
                src="/assets/qr.png"
                alt="QR code to download the app"
                width={300}
                height={300}
                className="size-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
