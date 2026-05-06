"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { PAYWALL_PLANS_SECTION_ID } from "../../paywallPlansSectionId";

type PlanKey = "week1" | "week4" | "week12";

const plans: Array<{
  key: PlanKey;
  label: string;
  oldPrice: string;
  newPrice: string;
  strikePrice: string;
  perDayInt: string;
  perDayDec: string;
  badgeVariant: "light" | "purple";
  isMostPopular?: boolean;
  borderVariant: "normal" | "highlight";
}> = [
  {
    key: "week1",
    label: "1-WEEK PLAN",
    oldPrice: "$19.99",
    newPrice: "$9.99",
    strikePrice: "$2.85",
    perDayInt: "1",
    perDayDec: "42",
    badgeVariant: "light",
    borderVariant: "normal",
  },
  {
    key: "week4",
    label: "4-WEEK PLAN",
    oldPrice: "$39.99",
    newPrice: "$19.99",
    strikePrice: "$1.42",
    perDayInt: "0",
    perDayDec: "71",
    badgeVariant: "purple",
    borderVariant: "highlight",
    isMostPopular: true,
  },
  {
    key: "week12",
    label: "12-WEEK PLAN",
    oldPrice: "$99.99",
    newPrice: "$49.99",
    strikePrice: "$1.19",
    perDayInt: "0",
    perDayDec: "59",
    badgeVariant: "light",
    borderVariant: "normal",
  },
];

function Radio({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <div className="relative h-[24px] w-[24px] shrink-0 rounded-full bg-[#7F56D9]">
        <div className="absolute inset-[31.25%] rounded-full bg-white" />
      </div>
    );
  }

  return (
    <div className="relative h-[24px] w-[24px] shrink-0">
      <Image
        src="/assets/paywall-mobile/radio-off.png"
        alt=""
        fill
        className="object-contain"
      />
    </div>
  );
}

function MostPopularBadge() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[-2px]">
      <div
        className="px-[8px] py-[4px] rounded-bl-[8px] rounded-br-[8px]"
        style={{
          backgroundImage: "linear-gradient(142deg, #43CBFF 0%, #9708CC 100%)",
        }}
      >
        <span className="font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[11px] leading-[16px] tracking-[0.06px] text-white">
          MOST POPULAR
        </span>
      </div>
    </div>
  );
}

function PlanBadge({
  variant,
  perDayInt,
  perDayDec,
}: {
  variant: "light" | "purple";
  perDayInt: string;
  perDayDec: string;
}) {
  const src =
    variant === "purple"
      ? "/assets/paywall-mobile/plan-badge-purple.png"
      : "/assets/paywall-mobile/plan-badge-light.png";

  const textColor = variant === "purple" ? "text-white" : "text-[#2B1C17]";

  return (
    <div className="relative w-[96px] h-[53px] shrink-0">
      <Image src={src} alt="" fill className="object-contain" />

      <div className={`absolute left-[24px] top-1/2 -translate-y-1/2 w-[68px] h-[22px] ${textColor}`}>
        <span className="absolute left-[-0.2px] top-[-1px] font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[13px] tracking-[-0.43px]">
          $
        </span>
        <span className="absolute left-[10px] top-[-5.5px] font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[28px] tracking-[-0.43px]">
          {perDayInt}
        </span>
        <span className="absolute left-[29px] top-[-1px] font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[13px] tracking-[-0.43px]">
          {perDayDec}
        </span>
        <span className="absolute left-[29px] top-[12.5px] font-[family-name:var(--font-inter)] font-light text-[10px]">
          per day
        </span>
      </div>
    </div>
  );
}

function DiscountSticker() {
  return (
    <div className="absolute right-0 top-[334px] w-[107.339px] h-[51.369px] flex items-center justify-center">
      <div className="rotate-[10deg]">
        <div className="relative w-[103px] h-[34px]">
          <Image
            src="/assets/paywall-mobile/discount-bg.png"
            alt=""
            fill
            className="object-contain scale-x-[-1]"
          />
          <div className="absolute left-[4.6px] top-[6.3px] text-white font-bold text-[16px] leading-[20px] tracking-[-0.06px] font-[family-name:var(--font-sf-pro-rounded)]">
            50% OFF
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="w-full flex flex-col gap-[12px]">
      <div className="flex gap-[8px]">
        <div className="flex-1 min-w-0 bg-[#F9F5FF] rounded-[12px] p-[12px] flex items-center gap-[4px]">
          <div className="relative w-[24px] h-[24px] shrink-0">
            <Image
              src="/assets/paywall-mobile/shield-check.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[family-name:var(--font-inter)] font-semibold text-[14px] leading-[1.2] text-[#101828] whitespace-nowrap">
            Pay safe &amp; secure
          </span>
        </div>

        <div className="flex-1 min-w-0 bg-[#F9F5FF] rounded-[12px] p-[12px] flex items-center gap-[4px]">
          <div className="relative w-[24px] h-[24px] shrink-0">
            <Image
              src="/assets/paywall-mobile/shield-check.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[family-name:var(--font-inter)] font-semibold text-[14px] leading-[1.2] text-[#101828] whitespace-nowrap">
            30-day money-back
          </span>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-[12px]">
        {[
          ["/assets/paywall-mobile/pay-visa.png", "Visa"],
          ["/assets/paywall-mobile/pay-mastercard.png", "Mastercard"],
          ["/assets/paywall-mobile/pay-gpay.png", "Google Pay"],
          ["/assets/paywall-mobile/pay-applepay.png", "Apple Pay"],
        ].map(([src, alt]) => (
          <div key={alt} className="relative w-[48px] h-[32px]">
            <Image src={src} alt={alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PaywallMobilePlans() {
  const [selected, setSelected] = useState<PlanKey>("week4");

  return (
    <div id={PAYWALL_PLANS_SECTION_ID} className="relative w-[335px] scroll-mt-[100px]">
      <div className="flex flex-col items-center gap-[16px] w-[328px]">
        <p className="font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[#101828] text-[36px] leading-[42px] text-center">
          <span>Choose your </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(172deg, #43CBFF 0%, #9708CC 100%)",
            }}
          >
            plan
          </span>
        </p>

        <div className="w-full flex flex-col gap-[8px]">
          {plans.map((p) => {
            const isSelected = selected === p.key;
            const highlight = p.borderVariant === "highlight";

            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelected(p.key)}
                className={[
                  "relative w-full rounded-[16px] px-[16px] py-[20px] flex items-center justify-between text-left shadow-[0px_1px_4px_rgba(39,39,39,0.2)]",
                  highlight ? "border-2 border-[#43CBFF] bg-white" : "border border-[#E4E4E7] bg-white",
                ].join(" ")}
              >
                {p.isMostPopular ? <MostPopularBadge /> : null}

                <div className="flex items-center gap-[12px]">
                  <Radio selected={isSelected} />

                  <div className="flex flex-col items-start justify-center gap-[2px]">
                    <div className="font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[#101828] text-[18px] leading-[20px] tracking-[-0.43px] whitespace-nowrap">
                      {p.label}
                    </div>
                    <div className="flex items-start gap-[8px]">
                      <div className="relative">
                        <div className="font-[family-name:var(--font-sf-pro-rounded)] text-[#6B7280] text-[14px] leading-[20px] tracking-[-0.06px] whitespace-nowrap">
                          {p.oldPrice}
                        </div>
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#F04438]" />
                      </div>
                      <div className="font-[family-name:var(--font-sf-pro-rounded)] font-medium text-[#2B1C17] text-[14px] leading-[20px] tracking-[-0.06px] whitespace-nowrap">
                        {p.newPrice}
                      </div>
                    </div>
                  </div>
                </div>

                <PlanBadge
                  variant={p.badgeVariant}
                  perDayInt={p.perDayInt}
                  perDayDec={p.perDayDec}
                />

                <div className="absolute left-[182px] top-[46.5px]">
                  <div className="relative">
                    <div className="font-[family-name:var(--font-sf-pro-rounded)] text-[#6B7280] text-[14px] leading-[20px] tracking-[-0.06px] whitespace-nowrap">
                      {p.strikePrice}
                    </div>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-[#F04438]" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="w-full pt-[8px]">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-[10px] rounded-[8px] bg-[#7F56D9] px-[24px] py-[16px] text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#6941C6] hover:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.65)] active:translate-y-[3px] active:bg-[#6941C6] active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_rgba(34,10,85,0.65)]"
          >
            <span className="font-[family-name:var(--font-inter)] font-semibold text-[18px] leading-[28px] text-white">
              Get Full Access
            </span>
            <div className="relative w-[24px] h-[24px] rotate-90">
              <Image
                src="/assets/paywall-mobile/chevron-right.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>

        <p className="w-full text-center opacity-40 font-[family-name:var(--font-inter)] text-[13px] leading-[1.2] text-[#475467]">
          By clicking&nbsp;&quot;Get My Plan&quot;, you agree to start a subscription
          with automatic renewal.&nbsp;You will be charged nineteen dollars and
          ninety-nine cents for the first four weeks (special offer). After the
          initial four weeks, your subscription will automatically renew at
          thirty-nine dollars and ninety-nine cents every four weeks unless you
          cancel through your account settings before renewal.&nbsp;
          <Link className="underline" href="/terms">
            Terms &amp; Conditions
          </Link>
          &nbsp;and&nbsp;
          <Link className="underline" href="/privacy">
            Privacy Policy
          </Link>
          &nbsp;apply. For more details, contact us at&nbsp;
          <a className="underline" href="mailto:support@hyperup.app">
            support@hyperup.app
          </a>
          .
        </p>

        <PaymentMethods />
      </div>

      <DiscountSticker />
    </div>
  );
}

