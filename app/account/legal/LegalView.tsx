"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { AccountBackButton } from "@/app/account/AccountBackButton";
import PolicyContent from "@/app/privacy/PolicyContent";
import privacyContent from "@/app/privacy/figma-content.json";
import TermsContent from "@/app/terms/TermsContent";
import termsContent from "@/app/terms/figma-content.json";

const LEGAL_CARD_ICON = "/assets/leagal-i.png";

/** Space above account bottom illustration (`legal-btm.png` ~263px + offset); mobile/tablet only. */
const LEGAL_MOBILE_DOC_BOTTOM =
  "max-lg:pb-[300px] lg:pb-44";

/** Full-width top strip: back control aligns to the card edge, not the centered content column. */
const LEGAL_DETAIL_BACK_STRIP =
  "mb-6 w-full shrink-0 px-4 pt-[50px] sm:px-6 lg:px-6";

const legalDetailContentShell = (maxWidthClass: string) =>
  clsx(
    "relative z-[2] mx-auto flex w-full min-h-0 min-w-0 flex-1 flex-col px-4 sm:px-6 lg:px-12",
    LEGAL_MOBILE_DOC_BOTTOM,
    maxWidthClass,
  );

function LegalDetailFrame({
  maxWidthClass,
  onBack,
  children,
}: {
  maxWidthClass: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col">
      <div className={LEGAL_DETAIL_BACK_STRIP}>
        <AccountBackButton onClick={onBack} />
      </div>
      <div className={legalDetailContentShell(maxWidthClass)}>{children}</div>
    </div>
  );
}

type LegalPanel = "hub" | "terms" | "privacy" | "subscription" | "refunds" | "cookies";

function ChevronRightIcon({ className }: { className?: string }) {
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
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LegalNavRow({
  label,
  onClick,
  href,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "flex w-full min-w-0 items-center gap-3 border-t border-[#EAECF0] py-4 text-left first:border-t-0 transition hover:bg-[#F9FAFB]/80";

  const body = (
    <>
      <span className="min-w-0 flex-1 text-[16px] font-normal leading-6 text-[#101828]">{label}</span>
      <ChevronRightIcon className="shrink-0 text-[#98A2B3]" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {body}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {body}
    </button>
  );
}

export function LegalView() {
  const [panel, setPanel] = useState<LegalPanel>("hub");

  if (panel === "privacy") {
    return (
      <LegalDetailFrame maxWidthClass="max-w-[720px]" onBack={() => setPanel("hub")}>
        <p className="text-center text-[14px] font-normal leading-5 text-[#667085]">{privacyContent.subheading}</p>
        <h1 className="mt-2 text-center text-[36px] font-semibold leading-[44px] tracking-[-0.72px] text-[#101828] sm:text-[40px] sm:leading-[48px]">
          {privacyContent.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[560px] text-center text-[16px] font-normal leading-6 text-[#475467]">
          {privacyContent.intro}
        </p>
        <article className="mt-10 w-full text-left">
          <PolicyContent />
        </article>
      </LegalDetailFrame>
    );
  }

  if (panel === "terms") {
    return (
      <LegalDetailFrame maxWidthClass="max-w-[720px]" onBack={() => setPanel("hub")}>
        <p className="text-center text-[16px] font-normal leading-6 text-[#475467]">{termsContent.subheading}</p>
        <h1 className="mt-1 text-center text-[36px] font-semibold leading-[44px] tracking-[-0.72px] text-[#101828] sm:text-[40px] sm:leading-[48px] md:mt-4">
          {termsContent.title}
        </h1>
        <article className="mt-10 w-full text-left md:mt-14">
          <TermsContent />
        </article>
      </LegalDetailFrame>
    );
  }

  if (panel === "subscription") {
    return (
      <LegalDetailFrame maxWidthClass="max-w-[700px]" onBack={() => setPanel("hub")}>
        <p className="text-center text-[14px] font-normal leading-5 text-[#667085]">Current as of 20 Jan 2026</p>
        <h1 className="mt-2 text-center text-[30px] font-semibold leading-[38px] text-[#101828]">Subscription policy</h1>
        <div className="mt-8 space-y-4 text-[16px] font-normal leading-6 text-[#475467]">
          <p>
            Paid plans renew automatically until cancelled. You can change or cancel your subscription in Billing at any
            time; changes take effect according to your plan&apos;s billing cycle.
          </p>
          <p>
            Prices and included features are those shown at checkout and in your account. If we materially change
            terms that affect your subscription, we will notify you as required by applicable law.
          </p>
          <Link
            href="/account/billing"
            className="inline-flex text-[16px] font-semibold text-[#7F56D9] underline-offset-2 hover:text-[#6941C6]"
          >
            Open billing
          </Link>
        </div>
      </LegalDetailFrame>
    );
  }

  if (panel === "refunds") {
    return (
      <LegalDetailFrame maxWidthClass="max-w-[700px]" onBack={() => setPanel("hub")}>
        <p className="text-center text-[14px] font-normal leading-5 text-[#667085]">Current as of 20 Jan 2026</p>
        <h2 className="mt-2 text-center text-[30px] font-semibold leading-[38px] text-[#101828]">Refund policy</h2>
        <p className="mt-8 text-[16px] font-normal leading-6 text-[#475467]">
          Refund eligibility depends on your plan, region, and the offer you accepted at purchase. You may cancel your
          subscription at any time from Billing; access typically continues until the end of the current billing period
          unless your terms state otherwise.
        </p>
      </LegalDetailFrame>
    );
  }

  if (panel === "cookies") {
    return (
      <LegalDetailFrame maxWidthClass="max-w-[700px]" onBack={() => setPanel("hub")}>
        <p className="text-center text-[14px] font-normal leading-5 text-[#667085]">Current as of 20 Jan 2026</p>
        <h1 className="mt-2 text-center text-[30px] font-semibold leading-[38px] text-[#101828]">Cookie policy</h1>
        <div className="mt-8 space-y-4 text-left text-[16px] font-normal leading-6 text-[#475467]">
          <p>
            HyperUp uses cookies and similar technologies to run the service, remember preferences, measure usage, and
            improve security. You can control non-essential cookies through your browser settings; required cookies may
            remain necessary for the site to function.
          </p>
          <p>
            For details on how we handle personal data, see our Privacy Policy. Third-party tools we use may set their
            own cookies according to their policies.
          </p>
        </div>
      </LegalDetailFrame>
    );
  }

  /* hub — второй макет: иконка + Legal, подзаголовок ниже слева под иконкой; список с › */
  return (
    <div
      className={clsx(
        "relative z-[2] mx-auto flex w-full min-h-0 min-w-0 max-w-[700px] flex-1 flex-col self-stretch px-4 sm:px-6",
        "pb-44 sm:pb-52 lg:px-12 lg:pb-44",
      )}
    >
      <header className="flex w-full min-w-0 flex-col gap-2 self-stretch pt-[50px]">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LEGAL_CARD_ICON}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 object-contain"
            aria-hidden
          />
          <h1 className="min-w-0 flex-1 text-[30px] font-semibold leading-[38px] text-[#101828]">Legal</h1>
        </div>
        <p className="w-full min-w-0 text-left text-[16px] font-normal leading-6 text-[#475467]">
          Privacy Policy and Terms and Conditions
        </p>
      </header>

      <nav className="mt-10 flex w-full min-w-0 flex-col self-stretch" aria-label="Legal documents">
        <LegalNavRow label="Terms of use & service" onClick={() => setPanel("terms")} />
        <LegalNavRow label="Privacy policy" onClick={() => setPanel("privacy")} />
        <LegalNavRow label="Subscription policy" onClick={() => setPanel("subscription")} />
        <LegalNavRow label="Refund policy" onClick={() => setPanel("refunds")} />
        <LegalNavRow label="Cookie policy" onClick={() => setPanel("cookies")} />
      </nav>
    </div>
  );
}
