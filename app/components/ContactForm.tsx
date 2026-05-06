"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IMaskInput } from "react-imask";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { useCallback, useState } from "react";

const ERROR = "#F04438";

const inputBase =
  "min-h-[44px] w-full rounded-lg border bg-white px-[14px] py-[10px] text-[16px] font-normal leading-[24px] outline-none transition-[border-color,color] duration-150";

const hintClass =
  "hidden text-[14px] font-normal leading-[20px] text-[#475467] md:block";

const headingFont: CSSProperties = {
  fontFamily:
    "'SF Pro Rounded', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
};

function isValidEmail(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function ReqLabel({
  children,
  error,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <span
      style={headingFont}
      className={
        error
          ? "text-[14px] font-medium leading-[20px] text-[#F04438]"
          : "text-[14px] font-medium leading-[20px] text-[#344054]"
      }
    >
      {children}
      <span style={{ color: ERROR }}>*</span>
    </span>
  );
}

function FieldError({ message }: { message: string | null }) {
  return (
    <AnimatePresence mode="wait">
      {message ? (
        <motion.p
          key={message}
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="text-[14px] font-normal leading-[20px] text-[#F04438]"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const inputNormal =
    `${inputBase} border-[#D0D5DD] text-[#101828] placeholder:text-[#667085] focus:border-[#7F56D9]`;

  const inputError =
    `${inputBase} border-[#F04438] text-[#F04438] placeholder:text-[#F04438]/80 focus:border-[#F04438]`;

  const clearFirstNameError = useCallback(() => setFirstNameError(null), []);
  const clearLastNameError = useCallback(() => setLastNameError(null), []);
  const clearPhoneError = useCallback(() => setPhoneError(null), []);
  const clearEmailError = useCallback(() => setEmailError(null), []);
  const clearMessageError = useCallback(() => setMessageError(null), []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const first = String(fd.get("firstName") ?? "").trim();
    const last = String(fd.get("lastName") ?? "").trim();
    const ph = String(fd.get("phone") ?? "").trim();
    const em = ((fd.get("email") as string) ?? "").trim();
    const msg = ((fd.get("message") as string) ?? "").trim();

    setFirstNameError(null);
    setLastNameError(null);
    setPhoneError(null);
    setEmailError(null);
    setMessageError(null);

    let hasError = false;

    if (!first) {
      setFirstNameError("First name is required");
      hasError = true;
    }
    if (!last) {
      setLastNameError("Last name is required");
      hasError = true;
    }
    const phoneDigits = ph.replace(/\D/g, "");
    if (phoneDigits.length === 0) {
      setPhoneError("Phone number is required");
      hasError = true;
    } else if (phoneDigits.length !== 11) {
      setPhoneError("Enter the full phone number");
      hasError = true;
    }
    if (!isValidEmail(em)) {
      setEmailError("Email address format is invalid");
      hasError = true;
    }
    if (!msg) {
      setMessageError("Your message is invalid");
      hasError = true;
    }

    if (hasError) return;
  }

  return (
    <div className="w-full">
      <h1
        className="text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#101828] md:text-[36px] md:leading-[44px] md:tracking-[-0.72px]"
        style={headingFont}
      >
        <span className="md:hidden">Get in touch</span>
        <span className="hidden md:inline">
          Get in{" "}
          <span className="bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] bg-clip-text text-transparent">
            touch
          </span>
        </span>
      </h1>
      <p className="mt-5 text-[16px] font-normal leading-[24px] text-[#667085] md:mt-4 md:text-[20px] md:leading-[30px]">
        Our friendly team would love to hear from you.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-11 flex flex-col gap-8 md:mt-10"
      >
        <div className="flex flex-col gap-6">
          <div className="flex w-full gap-8">
            <div className="flex min-w-0 flex-[1_0_0] flex-col gap-1.5">
              <label className="block" htmlFor="contact-first-name">
                <ReqLabel error={!!firstNameError}>First name </ReqLabel>
              </label>
              <input
                id="contact-first-name"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearFirstNameError();
                }}
                aria-invalid={!!firstNameError}
                aria-describedby={firstNameError ? "contact-first-name-error" : undefined}
                className={firstNameError ? inputError : inputNormal}
                autoComplete="given-name"
              />
              <div id="contact-first-name-error">
                <FieldError message={firstNameError} />
              </div>
            </div>
            <div className="flex min-w-0 flex-[1_0_0] flex-col gap-1.5">
              <label className="block" htmlFor="contact-last-name">
                <ReqLabel error={!!lastNameError}>Last name </ReqLabel>
              </label>
              <input
                id="contact-last-name"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  clearLastNameError();
                }}
                aria-invalid={!!lastNameError}
                aria-describedby={lastNameError ? "contact-last-name-error" : undefined}
                className={lastNameError ? inputError : inputNormal}
                autoComplete="family-name"
              />
              <div id="contact-last-name-error">
                <FieldError message={lastNameError} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="block" htmlFor="contact-email">
              <ReqLabel error={!!emailError}>Email </ReqLabel>
            </label>
            <input
              id="contact-email"
              type="text"
              inputMode="email"
              autoComplete="email"
              name="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearEmailError();
              }}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "contact-email-error" : undefined}
              className={emailError ? inputError : inputNormal}
            />
            <div id="contact-email-error">
              <FieldError message={emailError} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="block" htmlFor="contact-phone">
              <ReqLabel error={!!phoneError}>Phone number </ReqLabel>
            </label>
            <IMaskInput
              id="contact-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              mask="+1 (000) 000-0000"
              lazy={false}
              overwrite
              value={phone}
              onAccept={(value) => {
                setPhone(String(value));
                clearPhoneError();
              }}
              placeholder="+1 (555) 000-0000"
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "contact-phone-error" : undefined}
              className={phoneError ? inputError : inputNormal}
            />
            <div id="contact-phone-error">
              <FieldError message={phoneError} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="block" htmlFor="contact-message">
              <ReqLabel error={!!messageError}>Message </ReqLabel>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Leave us a message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearMessageError();
              }}
              aria-invalid={!!messageError}
              aria-describedby={messageError ? "contact-message-error" : undefined}
              className={`${messageError ? inputError : inputNormal} min-h-[160px] resize-y md:min-h-[132px]`}
            />
            <div id="contact-message-error">
              <FieldError message={messageError} />
            </div>
          </div>

          <p className="text-[16px] font-normal leading-[24px] text-[#667085]">
            By submitting this form, you agree with our{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-[#475467]">
              Terms of Service
            </Link>
            . We process your data to respond to your contact request in accordance with our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-[#475467]">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg border-b-[3px] border-white bg-[#7F56D9] px-6 py-4 text-[18px] font-semibold leading-[28px] text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#6941C6] md:border-b-0 md:bg-[#7342D9] md:py-3 md:hover:bg-[#6235c4]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
