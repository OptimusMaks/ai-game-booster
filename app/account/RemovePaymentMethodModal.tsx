"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

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

/** credit-card-shield: card outline + shield at bottom-right (grey-700 stroke). */
function CreditCardShieldGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="14" height="10" rx="1.5" stroke="#182230" strokeWidth="2" />
      <path d="M2.5 9h14" stroke="#182230" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M17.5 11 21 13v3.5l-3.5 2-3.5-2V13l3.5-2Z"
        stroke="#182230"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeaturedPaymentIcon() {
  return (
    <div className="box-border flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-[#EAECF0] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
      <CreditCardShieldGlyph />
    </div>
  );
}

export type RemovePaymentMethodModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function RemovePaymentMethodModal({ open, onClose, onConfirm }: RemovePaymentMethodModalProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

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
        className="relative z-[1] w-full max-w-[480px] overflow-hidden rounded-xl bg-white shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-payment-method-title"
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
              <FeaturedPaymentIcon />
              <div className="flex flex-col gap-1 pr-10">
                <h2
                  id="remove-payment-method-title"
                  className="text-[18px] font-semibold leading-7 text-[#101828]"
                >
                  Remove payment method
                </h2>
                <p className="text-[14px] font-normal leading-5 text-[#475467]">
                  Are you sure you want to remove this payment method?
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col px-6 pb-6 pt-8">
            <div className="flex w-full flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="box-border flex h-11 min-h-11 flex-1 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-[16px] font-semibold leading-6 text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="box-border flex h-11 min-h-11 flex-1 items-center justify-center rounded-lg border border-[#7F56D9] bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white transition hover:bg-[#6941C6]"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
