"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
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

function MastercardMark() {
  return (
    <div
      className="box-border flex h-6 w-[34px] shrink-0 items-center justify-center rounded border border-[#D0D5DD] bg-white"
      aria-hidden
    >
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="overflow-visible">
        <circle cx="8.5" cy="7" r="5.5" fill="#EB001B" />
        <circle cx="13.5" cy="7" r="5.5" fill="#F79E1B" />
      </svg>
    </div>
  );
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function formatCardNumberDisplay(raw: string): string {
  const d = digitsOnly(raw).slice(0, 19);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiryDisplay(raw: string): string {
  const d = digitsOnly(raw).slice(0, 6);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function isValidExpiry(s: string): boolean {
  const m = s.match(/^(\d{2})\/(\d{4})$/);
  if (!m) return false;
  const month = Number(m[1]);
  return month >= 1 && month <= 12;
}

function inferCardBrand(cardDigits: string): "visa" | "mastercard" {
  const c = cardDigits[0];
  if (c === "4") return "visa";
  if (c === "5" || c === "2") return "mastercard";
  return "visa";
}

export type SavedCardDetails = {
  brand: "visa" | "mastercard";
  lastFour: string;
  /** Second line under the card title, e.g. "Expiration 01/28" */
  expirySubtitle: string;
};

export type AddCardDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (card: SavedCardDetails) => void;
};

export function AddCardDetailsModal({ open, onClose, onConfirm }: AddCardDetailsModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!open) {
      setCardNumber("");
      setExpiration("");
      setCvv("");
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  const cardDigits = digitsOnly(cardNumber);
  const cardOk = cardDigits.length >= 15 && cardDigits.length <= 19;
  const expiryOk = isValidExpiry(expiration);
  const cvvDigits = digitsOnly(cvv);
  const cvvOk = cvvDigits.length === 3 || cvvDigits.length === 4;
  const canSubmit = cardOk && expiryOk && cvvOk;

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
        aria-labelledby="add-card-details-title"
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
              <div className="pr-10">
                <h2 id="add-card-details-title" className="text-[18px] font-semibold leading-7 text-[#101828]">
                  Add card details
                </h2>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 px-6 pb-0 pt-5">
            <div className="flex w-full max-w-[432px] flex-col gap-1.5">
              <label htmlFor="add-card-number" className="text-[14px] font-medium leading-5 text-[#344054]">
                Card Number
              </label>
              <div className="flex h-11 w-full items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus-within:border-[#7F56D9] focus-within:ring-2 focus-within:ring-[#F4EBFF]">
                <MastercardMark />
                <input
                  id="add-card-number"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumberDisplay(e.target.value))}
                  placeholder="1234 1234 1234 1234"
                  className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[16px] font-normal leading-6 text-[#101828] outline-none placeholder:text-[#667085]"
                />
              </div>
            </div>

            <div className="flex w-full max-w-[432px] flex-row gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <label htmlFor="add-card-expiry" className="text-[14px] font-medium leading-5 text-[#344054]">
                  Expiration
                </label>
                <input
                  id="add-card-expiry"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={expiration}
                  onChange={(e) => setExpiration(formatExpiryDisplay(e.target.value))}
                  placeholder="MM/YYYY"
                  className="box-border h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 text-[16px] font-normal leading-6 text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#F4EBFF]"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <label htmlFor="add-card-cvv" className="text-[14px] font-medium leading-5 text-[#344054]">
                  CVV
                </label>
                <input
                  id="add-card-cvv"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(digitsOnly(e.target.value).slice(0, 4))}
                  placeholder="CVV"
                  className="box-border h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 text-[16px] font-normal leading-6 text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#F4EBFF]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col px-6 pb-6 pt-8">
            <div className="flex w-full max-w-[432px] flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="box-border flex h-11 min-h-11 flex-1 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-[16px] font-semibold leading-6 text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => {
                  if (!canSubmit) return;
                  const m = expiration.match(/^(\d{2})\/(\d{4})$/);
                  if (!m) return;
                  const [, mm, yyyy] = m;
                  const lastFour = cardDigits.slice(-4);
                  onConfirm({
                    brand: inferCardBrand(cardDigits),
                    lastFour,
                    expirySubtitle: `Expiration ${mm}/${yyyy.slice(2)}`,
                  });
                  onClose();
                }}
                className={clsx(
                  "box-border flex h-11 min-h-11 flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-[16px] font-semibold leading-6 transition",
                  canSubmit
                    ? "border border-[#7F56D9] bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    : "cursor-not-allowed border border-[#EAECF0] bg-[#EAECF0] text-[#667085]",
                )}
              >
                Add card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
