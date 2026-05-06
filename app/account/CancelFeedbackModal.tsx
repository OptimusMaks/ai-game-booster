"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const FEEDBACK_REASONS = [
  "I'm not getting enough value for the price",
  "I don't use HyperUp anymore",
  "I subscribed by accident",
  "I found a better product",
  "I had unresolved issues",
  "Other",
] as const;

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
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

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="white"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type CancelFeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: { reasons: string[]; details: string }) => void;
};

export function CancelFeedbackModal({ open, onClose, onSubmit }: CancelFeedbackModalProps) {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (!open) {
      setSelected(new Set());
      setDetails("");
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

  const toggle = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleSubmit = () => {
    const reasons = FEEDBACK_REASONS.filter((_, i) => selected.has(i));
    onSubmit?.({ reasons, details: details.trim() });
    onClose();
  };

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
        className="relative z-[1] flex max-h-[calc(100vh-4rem)] w-full max-w-[480px] flex-col overflow-x-hidden overflow-y-auto rounded-xl bg-white shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-feedback-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-[2] flex size-11 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F9FAFB]"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col">
          <div className="px-6 pb-0 pt-6">
            <div className="flex max-w-[432px] flex-col gap-1 pr-10">
              <h2
                id="cancel-feedback-title"
                className="text-[18px] font-semibold leading-7 text-[#101828]"
              >
                We&apos;re sorry to see you leave
              </h2>
              <p className="text-[14px] font-normal leading-5 text-[#475467]">
                We&apos;d greatly value your feedback
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-6 pb-0 pt-5">
            <div className="flex max-w-[432px] flex-col gap-4">
              {FEEDBACK_REASONS.map((label, index) => {
                const checked = selected.has(index);
                return (
                  <button
                    key={label}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggle(index)}
                    className="flex w-full cursor-pointer items-start gap-2 rounded-md text-left outline-none ring-[#7F56D9] focus-visible:ring-2"
                  >
                    <span
                      className={clsx(
                        "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border",
                        checked
                          ? "border-[#7F56D9] bg-[#7F56D9]"
                          : "border-[#D0D5DD] bg-white",
                      )}
                    >
                      {checked ? <CheckIcon /> : null}
                    </span>
                    <span className="min-w-0 flex-1 text-[14px] font-medium leading-5 text-[#344054]">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex w-full max-w-[432px] flex-col gap-1.5 pb-1">
              <label htmlFor="cancel-feedback-details" className="text-[14px] font-medium leading-5 text-[#344054]">
                What could we have done better?
              </label>
              <textarea
                id="cancel-feedback-details"
                rows={5}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Your answer..."
                className="box-border min-h-[154px] w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-3 text-[16px] font-normal leading-6 text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none transition placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#F4EBFF]"
              />
            </div>
          </div>

          <div className="mt-auto flex flex-col px-6 pb-6 pt-8">
            <button
              type="button"
              onClick={handleSubmit}
              className="box-border flex h-11 w-full max-w-[432px] items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white transition hover:bg-[#6941C6]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
