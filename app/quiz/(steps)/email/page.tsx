"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const emailDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "icloud.com",
  "outlook.com",
];

export default function EmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const showError = touched && email.length > 0 && !isValidEmail(email);

  const suggestions = useMemo(() => {
    const value = email.trim();

    if (!value || value.includes("@")) {
      return [];
    }

    return emailDomains.map((domain) => `${value}@${domain}`);
  }, [email]);

  const showSuggestions = isFocused && suggestions.length > 0;

  const handleSubmit = () => {
    setTouched(true);

    if (isValidEmail(email)) {
      router.push("/paywall");
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-96px)] flex-col px-5 pb-10">
      <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col items-center text-center">
        <h1 className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] tracking-[-1.2px] text-[#101828]">
          Enter your email to activate
          <br />
          your
          <span className="bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] bg-clip-text text-transparent">
            {" "}
            game boost account
          </span>
        </h1>

        <div className="relative mt-6 w-full">
          <div className="relative">
            <MailIcon
              className={[
                "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2",
                showError
                  ? "text-[#F04438]"
                  : isFocused
                    ? "text-[#7F56D9]"
                    : "text-[#667085]",
              ].join(" ")}
            />

            <input
              type="email"
              // name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTouched(true);

                window.setTimeout(() => {
                  setIsFocused(false);
                }, 120);
              }}
              placeholder="Email"
              className={[
                "h-[44px] w-full rounded-[8px] border bg-white pl-11 pr-4 text-[16px] outline-none",
                "transition-[border-color,color] duration-150",
                showError
                  ? "border-[#F04438] text-[#F04438] placeholder:text-[#F04438]"
                  : "border-[#D0D5DD] text-[#101828] placeholder:text-[#667085] focus:border-[#7F56D9]",
              ].join(" ")}
            />
          </div>

          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setEmail(suggestion);
                setIsFocused(false);
                setTouched(false);
              }}
              className="flex h-[36px] w-full items-center gap-3 px-4 text-[15px] text-[#101828] transition-colors hover:bg-[#F5F7FB]"
            >
              <MailIcon className="h-4 w-4 text-[#667085]" />
              <span>
                <span>
                  {suggestion.split("@")[0]}
                </span>
                <span className="font-semibold">
                  @{suggestion.split("@")[1]}
                </span>
              </span>
            </button>
          ))}

          {showError && (
            <p className="mt-1.5 text-left text-[14px] text-[#F04438]">
              Email must be valid
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[424px]">
        <button
          type="button"
          onClick={handleSubmit}
          className="
            inline-flex h-[58px] w-full items-center justify-center
            rounded-[8px] bg-[#7F56D9] px-6 text-[18px] font-semibold text-white
            shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)]
            transition-all duration-150
            hover:bg-[#6941C6]
            active:translate-y-[3px]
            active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_rgba(34,10,85,0.5)]
          "
        >
          Continue
        </button>
      </div>
    </section>
  );
}

interface MailIconProps {
  className?: string;
}

function MailIcon({ className }: MailIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1.66699 5.83337L8.47109 10.5962C9.02207 10.9819 9.29756 11.1748 9.59721 11.2495C9.8619 11.3154 10.1387 11.3154 10.4034 11.2495C10.7031 11.1748 10.9786 10.9819 11.5296 10.5962L18.3337 5.83337M5.66699 16.6667H14.3337C15.7338 16.6667 16.4339 16.6667 16.9686 16.3942C17.439 16.1545 17.8215 15.7721 18.0612 15.3017C18.3337 14.7669 18.3337 14.0668 18.3337 12.6667V7.33337C18.3337 5.93324 18.3337 5.23318 18.0612 4.6984C17.8215 4.22799 17.439 3.84554 16.9686 3.60586C16.4339 3.33337 15.7338 3.33337 14.3337 3.33337H5.66699C4.26686 3.33337 3.5668 3.33337 3.03202 3.60586C2.56161 3.84554 2.17916 4.22799 1.93948 4.6984C1.66699 5.23318 1.66699 5.93324 1.66699 7.33337V12.6667C1.66699 14.0668 1.66699 14.7669 1.93948 15.3017C2.17916 15.7721 2.56161 16.1545 3.03202 16.3942C3.5668 16.6667 4.26686 16.6667 5.66699 16.6667Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
