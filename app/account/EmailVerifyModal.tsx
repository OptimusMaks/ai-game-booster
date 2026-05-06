"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";
import { createPortal } from "react-dom";

/** e.g. alex@hyperup.gg → a***x@hyperup.gg */
export function maskEmailForVerification(email: string): string {
  const trimmed = email.trim();
  const at = trimmed.indexOf("@");
  if (at <= 0) return trimmed;
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at);
  if (local.length <= 1) return `*${domain}`;
  if (local.length === 2) return `${local[0]}*${domain}`;
  return `${local[0]}***${local[local.length - 1]}${domain}`;
}

const FEATURED_PROFILE_ICON = "/assets/featured-icon.svg";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="#667085"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type EmailVerifyModalProps = {
  targetEmail: string;
  onClose: () => void;
  onVerified: () => void;
};

export function EmailVerifyModal({ targetEmail, onClose, onVerified }: EmailVerifyModalProps) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyFiredRef = useRef(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRefs.current[0]?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(id);
    };
  }, []);

  const fireIfComplete = useCallback(
    (next: string[]) => {
      if (next.every((x) => x.length === 1) && !verifyFiredRef.current) {
        verifyFiredRef.current = true;
        queueMicrotask(() => onVerified());
      }
    },
    [onVerified],
  );

  const setDigitAt = useCallback(
    (index: number, raw: string) => {
      const d = raw.replace(/\D/g, "").slice(-1);
      setDigits((prev) => {
        const next = [...prev];
        next[index] = d;
        fireIfComplete(next);
        return next;
      });
      if (d && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [fireIfComplete],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
      if (!text) return;
      const parts = text.split("");
      const next = [parts[0] ?? "", parts[1] ?? "", parts[2] ?? "", parts[3] ?? ""];
      setDigits(next);
      fireIfComplete(next);
      const lastIdx = Math.min(parts.length - 1, 3);
      requestAnimationFrame(() => inputRefs.current[lastIdx]?.focus());
    },
    [fireIfComplete],
  );

  const hint = maskEmailForVerification(targetEmail);

  const modal = (
    <div
      className="fixed inset-0 z-[100] isolate flex items-center justify-center p-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#101828]/70 backdrop-blur-[8px]"
        aria-label="Dismiss"
        onClick={onClose}
      />
      <div
        className="relative z-[1] w-[350px] max-w-[min(480px,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-verify-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -left-[120px] -top-[120px] size-[336px] overflow-hidden">
          <Image
            src="/assets/modal/background-pattern-decorative.png"
            alt=""
            width={336}
            height={336}
            className="size-[336px] object-cover object-left object-top"
            priority={false}
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-[2] flex size-11 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F9FAFB]"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="relative z-[1]">
          <div className="px-6 pb-0 pt-6">
            <div className="flex flex-col gap-4">
              <Image
                src={FEATURED_PROFILE_ICON}
                alt=""
                width={48}
                height={48}
                className="box-border size-12 shrink-0 rounded-[10px] border border-[#EAECF0] bg-white object-contain shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
              />
              <div className="flex flex-col gap-1">
                <h2
                  id="email-verify-title"
                  className="text-[18px] font-semibold leading-7 text-[#101828]"
                >
                  Confirm it&apos;s you
                </h2>
                <p className="text-[14px] font-normal leading-5 text-[#475467]">
                  We sent a code to {hint}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 px-6 pb-6 pt-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digits[i]}
                      onChange={(e) => setDigitAt(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                      className={clsx(
                        "box-border flex size-16 min-h-16 min-w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-[#7F56D9] bg-white py-0.5 px-2",
                        "font-[family-name:var(--font-inter)] text-center font-[500] text-[48px] leading-[60px] tracking-[-2%] text-[#101828] [leading-trim:none]",
                        "outline-none transition caret-transparent selection:bg-transparent",
                        "focus-visible:ring-2 focus-visible:ring-[#F4EBFF]",
                      )}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>
                <p className="text-[14px] font-normal leading-5 text-[#475467]">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    className="font-medium text-[#7F56D9] underline-offset-2 hover:underline"
                    onClick={() => {
                      /* mock resend */
                    }}
                  >
                    Send a new code
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
