"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AccountSuccessToast } from "../AccountSuccessToast";

const TOPICS = [
  "Billing or refund",
  "Subscription issue",
  "App not working",
  "Account access",
  "Other",
] as const;

type Topic = (typeof TOPICS)[number];

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#667085"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M16.667 5L7.5 14.167 3.333 10"
        stroke="#7F56D9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccountContactView() {
  const topicListId = useId();
  const topicTriggerId = useId();
  const [topic, setTopic] = useState<Topic>("Billing or refund");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const topicRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toastOpen) return;
    const id = window.setTimeout(() => setToastOpen(false), 5000);
    return () => clearTimeout(id);
  }, [toastOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onDown = (e: MouseEvent) => {
      if (topicRootRef.current && !topicRootRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [dropdownOpen]);

  const selectTopic = useCallback((value: Topic) => {
    setTopic(value);
    setDropdownOpen(false);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = message.trim();
    if (!msg) {
      setMessageError("Please describe your issue.");
      return;
    }
    setMessageError(null);
    setToastOpen(true);
    setMessage("");
  };

  return (
    <>
      <AccountSuccessToast open={toastOpen} message="Message sent" />
      <div
        className={clsx(
          "relative z-[2] mx-auto flex min-h-0 w-full max-w-[375px] flex-1 flex-col px-5 pt-12",
          "pb-[calc(15rem+env(safe-area-inset-bottom,0px))] lg:max-w-[700px] lg:px-12 lg:pt-12 lg:pb-[calc(14rem+env(safe-area-inset-bottom,0px))]",
        )}
      >
        <div className="flex w-full max-w-[700px] flex-col items-center gap-8 self-center">
          <header className="flex w-full flex-col gap-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative size-11 shrink-0 overflow-visible rounded-xl shadow-[0px_4px_8px_rgba(57,41,95,0.25)]">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#E9D7FE] to-[#D5D9EB] -rotate-[4deg]">
                  <Image
                    src="/assets/mail-icon.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 object-contain opacity-90"
                  />
                </div>
              </div>
              <h1 className="text-[30px] font-semibold leading-[38px] text-[#101828]">Contact us</h1>
            </div>
            <p className="text-[16px] font-normal leading-6 text-[#475467]">
              We&apos;d love to hear what went well or how we can improve the product experience.
            </p>
          </header>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex w-full max-w-[700px] flex-col gap-4"
          >
            <div ref={topicRootRef} className="relative flex w-full flex-col gap-1.5">
              <label htmlFor={topicTriggerId} className="text-[14px] font-medium leading-5 text-[#344054]">
                Topic
              </label>
              <button
                id={topicTriggerId}
                type="button"
                className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 text-left text-[16px] font-medium leading-6 text-[#101828] outline-none ring-[#7F56D9] transition hover:border-[#98A2B3] focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-controls={topicListId}
                onClick={() => setDropdownOpen((o) => !o)}
              >
                <span className="min-w-0 truncate">{topic}</span>
                <ChevronDownIcon
                  className={clsx("shrink-0 transition-transform", dropdownOpen && "rotate-180")}
                />
              </button>
              {dropdownOpen ? (
                <ul
                  id={topicListId}
                  role="listbox"
                  aria-labelledby={topicTriggerId}
                  className="absolute left-0 right-0 top-full z-30 mt-1 flex max-h-[min(280px,50vh)] flex-col overflow-auto rounded-lg border border-[#EAECF0] bg-white py-1 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]"
                >
                  {TOPICS.map((opt) => (
                    <li key={opt} role="presentation">
                      <button
                        type="button"
                        role="option"
                        aria-selected={topic === opt}
                        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-[16px] font-normal leading-6 text-[#101828] transition hover:bg-[#F9FAFB]"
                        onClick={() => selectTopic(opt)}
                      >
                        <span className="min-w-0 truncate">{opt}</span>
                        {topic === opt ? <CheckIcon className="shrink-0" /> : <span className="size-5 shrink-0" />}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label htmlFor="account-contact-message" className="text-[14px] font-medium leading-5 text-[#344054]">
                Message
              </label>
              <textarea
                id="account-contact-message"
                name="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (messageError) setMessageError(null);
                }}
                placeholder="Describe your issue..."
                rows={4}
                aria-invalid={!!messageError}
                aria-describedby={messageError ? "account-contact-message-error" : undefined}
                className={clsx(
                  "box-border min-h-[134px] w-full resize-y rounded-lg border bg-white px-[14px] py-3 text-[16px] font-normal leading-6 outline-none transition placeholder:text-[#667085]",
                  messageError
                    ? "border-[#F04438] text-[#101828] ring-[#F04438] focus-visible:ring-2 focus-visible:ring-offset-2"
                    : "border-[#D0D5DD] text-[#101828] focus-visible:border-[#7F56D9] focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2",
                )}
              />
              {messageError ? (
                <p id="account-contact-message-error" role="alert" className="text-[14px] leading-5 text-[#F04438]">
                  {messageError}
                </p>
              ) : null}
            </div>

            <div className="flex w-full justify-start">
              <button
                type="submit"
                className="inline-flex h-11 w-[91px] shrink-0 items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
