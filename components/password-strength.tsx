import Image from "next/image";
import type { ReactNode } from "react";
import {
  PASSWORD_RULE_CHECK_SVG,
  PASSWORD_RULE_CROSS_SVG,
} from "@/app/login/password-rule-icons";

export type PasswordStrengthTier = "weak" | "okay" | "great";

/**
 * Weak: only letters, only digits, or letters+digits without a symbol (e.g. "qweqwe123").
 * Okay: letter + digit + symbol, length ≥ 8 and under 14 (e.g. "qweqwe123_1").
 * Great: same as Okay plus length ≥ 14 (e.g. "qweqwe123_12rff").
 */
export function passwordStrengthTier(password: string): PasswordStrengthTier {
  if (password.length === 0) {
    return "weak";
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const onlyLetters = hasLetter && !hasDigit && !hasSymbol;
  const onlyDigits = hasDigit && !hasLetter && !hasSymbol;
  if (onlyLetters || onlyDigits) {
    return "weak";
  }

  if (hasLetter && hasDigit && !hasSymbol) {
    return "weak";
  }

  const lenOk = password.length >= 8;
  if (!lenOk || !hasLetter || !hasDigit || !hasSymbol) {
    return "weak";
  }

  if (password.length >= 14) {
    return "great";
  }
  return "okay";
}

export function evaluatePasswordRules(password: string) {
  const tier = passwordStrengthTier(password);
  const lenOk = password.length >= 8;
  let categories = 0;
  if (/[a-zA-Z]/.test(password)) categories += 1;
  if (/[0-9]/.test(password)) categories += 1;
  if (/[^a-zA-Z0-9]/.test(password)) categories += 1;
  const categoriesOk = categories >= 2;
  const strengthRuleOk = tier === "okay" || tier === "great";
  const allOk = strengthRuleOk && lenOk && categoriesOk;
  const inputWeakBorder = password.length > 0 && tier === "weak";
  return { tier, lenOk, categoriesOk, strengthRuleOk, allOk, inputWeakBorder };
}

export function PasswordStrengthMeter({ tier }: { tier: PasswordStrengthTier }) {
  const label = tier === "weak" ? "Too weak" : tier === "okay" ? "Okay" : "Great";
  const labelClass =
    tier === "weak" ? "text-[#F04438]" : tier === "okay" ? "text-[#FFAD12]" : "text-[#17B26A]";
  const filled = tier === "weak" ? 1 : tier === "okay" ? 2 : 3;
  const activeFill =
    tier === "weak" ? "bg-[#F04438]" : tier === "okay" ? "bg-[#FFAD12]" : "bg-[#17B26A]";

  return (
    <div className="flex items-center justify-between gap-3">
      <p className={`text-[14px] leading-5 ${labelClass}`}>{label}</p>
      <div className="flex shrink-0 gap-1" role="presentation" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={[
              "h-1 w-6 rounded-full",
              i < filled ? activeFill : "bg-[#EAECF0]",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

export function PasswordRequirementRow({ met, children }: { met: boolean; children: ReactNode }) {
  return (
    <div className="flex gap-2 text-left">
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center" aria-hidden>
        <Image
          src={met ? PASSWORD_RULE_CHECK_SVG : PASSWORD_RULE_CROSS_SVG}
          alt=""
          width={12}
          height={12}
          className="size-3 object-contain"
        />
      </span>
      <span
        className={[
          "min-w-0 text-[12px] leading-[14.4px]",
          met ? "text-[#344054]" : "text-[#667085]",
        ].join(" ")}
      >
        {children}
      </span>
    </div>
  );
}

export function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeSlashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10.733 5.076A10.66 10.66 0 0 1 12 5c7 0 10 7 10 7a13.166 13.166 0 0 1-1.487 2.54" />
      <path d="M14.12 14.12a3 3 0 1 1-4.244-4.243" />
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a9.9 9.9 0 0 1 2.279-3.537" />
      <path d="M9.88 9.88a3 3 0 0 0 4.242 4.242" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}
