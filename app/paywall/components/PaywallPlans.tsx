"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { PAYWALL_PLANS_SECTION_ID } from "../paywallPlansSectionId";

type Variant = "choose-plan" | "smooth-boost";

type PlanKey = "week1" | "week4" | "week12";

const plans: Array<{
  key: PlanKey;
  label: string;
  oldPrice: string;
  newPrice: string;
  perDayInt: string;
  perDayDec: string;
  strikePrice: string;
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
      ? "/assets/paywall/plan-badge-purple.svg"
      : "/assets/paywall/plan-badge-light.svg";

  const textClass = variant === "purple" ? "text-white" : "text-[#101828]";

  return (
    <div className="relative h-[57px] w-[104px] shrink-0 origin-right scale-[0.9] md:scale-100">
      <Image src={src} alt="" fill unoptimized className="object-contain" />

      <div className={`absolute left-[24px] top-[11px] ${textClass}`}>
        <span className="font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[16px] leading-[normal] tracking-[-0.43px]">
          $
        </span>
      </div>

      <div className={`absolute left-[36px] top-[5px] ${textClass}`}>
        <span className="font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[40px] leading-[normal] tracking-[9px]">
          {perDayInt}
        </span>
      </div>

      <div className={`absolute left-[64px] top-[11px] ${textClass}`}>
        <span className="font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[16px] leading-[normal] tracking-[-0.43px]">
          {perDayDec}
        </span>
      </div>

      <div className={`absolute left-[64px] top-[29px] ${textClass}`}>
        <span className="font-[family-name:var(--font-inter)] font-light text-[10px] leading-[normal] tracking-[-0.43px]">
          per day
        </span>
      </div>
    </div>
  );
}

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
        src="/assets/paywall/radio-off.svg"
        alt=""
        fill
        unoptimized
        sizes="24px"
        className="object-contain"
      />
    </div>
  );
}

function MostPopularBadge() {
  return (
    <div className="absolute left-1/2 top-[-2px] -translate-x-1/2">
      <div
        className="rounded-bl-[8px] rounded-br-[8px] px-[8px] py-[4px]"
        style={{
          backgroundImage: "linear-gradient(142deg, #43CBFF 0%, #9708CC 100%)",
        }}
      >
        <span className="font-[family-name:var(--font-sf-pro-rounded)] text-[11px] font-bold leading-[16px] tracking-[0.06px] text-white">
          MOST POPULAR
        </span>
      </div>
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="flex w-full flex-col gap-[12px] md:gap-[16px]">
      <div className="flex gap-[8px]">
        <div className="flex min-w-0 flex-1 items-center gap-[4px] rounded-[12px] bg-white p-[12px] md:bg-[#F9F5FF] md:p-[16px]">
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image
              src="/assets/paywall/shield-check.svg"
              alt=""
              fill
              unoptimized
              sizes="24px"
              className="object-contain"
            />
          </div>
          <span className="whitespace-nowrap font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-[1.2] text-[#101828] md:text-[16px]">
            Pay safe &amp; secure
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-[4px] rounded-[12px] bg-white p-[12px] md:bg-[#F9F5FF] md:p-[16px]">
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image
              src="/assets/paywall/shield-check.svg"
              alt=""
              fill
              unoptimized
              sizes="24px"
              className="object-contain"
            />
          </div>
          <span className="whitespace-nowrap font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-[1.2] text-[#101828] md:text-[16px]">
            30-day money-back
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-[12px]">
        {[
          ["/assets/paywall/pay-visa.png", "Visa"],
          ["/assets/paywall/pay-mastercard.png", "Mastercard"],
          ["/assets/paywall/pay-gpay.png", "Google Pay"],
          ["/assets/paywall/pay-applepay.png", "Apple Pay"],
        ].map(([src, alt]) => (
          <div key={alt} className="relative h-[32px] w-[48px]">
            <Image src={src} alt={alt} fill sizes="48px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscountStickerGraphic() {
  return (
    <div className="rotate-[10deg]">
      <div className="relative h-[34px] w-[103px]">
        <Image
          src="/assets/paywall/discount-bg.svg"
          alt=""
          fill
          unoptimized
          sizes="120px"
          className="scale-x-[-1] object-contain"
        />
        <div className="absolute left-[4.6px] top-[6.3px] font-[family-name:var(--font-sf-pro-rounded)] text-[16px] font-bold leading-[20px] tracking-[-0.06px] text-white">
          50% OFF
        </div>
      </div>
    </div>
  );
}

export default function PaywallPlans({
  variant,
  anchorId = true,
}: {
  variant: Variant;
  /** When false, omit `id` (e.g. second plans block on the same page). */
  anchorId?: boolean;
}) {
  const [selected, setSelected] = useState<PlanKey>("week4");

  const heading = useMemo(() => {
    if (variant === "smooth-boost") {
      return (
        <div className="text-center font-[family-name:var(--font-sf-pro-rounded)] text-[36px] font-bold leading-[normal] md:text-[48px]">
          <div className="whitespace-pre text-[#101828]">{`Smooth gameplay `}</div>
          <div className="whitespace-pre-wrap md:whitespace-pre">
            <span className="text-[#101828]">from your </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(166deg, #43CBFF 0%, #9708CC 100%)",
              }}
            >
              first boost
            </span>
          </div>
        </div>
      );
    }

    return (
      <p className="text-center font-[family-name:var(--font-sf-pro-rounded)] text-[36px] font-bold leading-[42px] md:text-[48px]">
        <span className="text-[#101828]">{`Choose your `}</span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(174deg, #43CBFF 0%, #9708CC 100%)",
          }}
        >
          plan
        </span>
      </p>
    );
  }, [variant]);

  const stickerTop = variant === "smooth-boost" ? 480.5 : 410.5;

  return (
    <section
      id={anchorId ? PAYWALL_PLANS_SECTION_ID : undefined}
      className="relative left-1/2 -ml-[50vw] w-screen scroll-mt-[100px] py-10 md:static md:ml-0 md:w-full md:bg-transparent md:py-0"
    >
      <div className="mx-auto flex w-full max-w-[335px] flex-col items-center gap-6 md:max-w-[434px] md:gap-5">
        <div className="relative flex w-full flex-col items-center gap-6 md:gap-8">
          {heading}

          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col gap-2">
              {plans.map((p) => {
                const isSelected = selected === p.key;
                const isHighlight = p.borderVariant === "highlight";

                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setSelected(p.key)}
                    className={[
                      "relative flex w-full items-center justify-between rounded-[16px] px-[16px] py-[20px] text-left md:w-[434px] md:py-[24px]",
                      "shadow-[0px_1px_4px_rgba(39,39,39,0.22)] md:shadow-[0px_1px_8px_rgba(43,28,23,0.2)]",
                      isHighlight
                        ? "border-2 border-[#7F56D9] bg-white shadow-[0_0_0_1px_rgba(127,86,217,0.35),0_0_28px_rgba(127,86,217,0.28)] md:border-[#43CBFF] md:shadow-[0px_1px_8px_rgba(43,28,23,0.2)]"
                        : "border border-[#E4E4E7] bg-white",
                    ].join(" ")}
                  >
                    {p.isMostPopular ? <MostPopularBadge /> : null}

                    <div className="flex items-center gap-[12px]">
                      <Radio selected={isSelected} />

                      <div className="flex flex-col items-start justify-center gap-[6px] md:gap-[8px]">
                        <div className="whitespace-nowrap font-[family-name:var(--font-sf-pro-rounded)] text-[18px] font-bold leading-[20px] tracking-[-0.43px] text-[#101828] md:text-[24px]">
                          {p.label}
                        </div>

                        <div className="flex items-start gap-[8px]">
                          <div className="relative">
                            <div className="whitespace-nowrap font-[family-name:var(--font-sf-pro-rounded)] text-[14px] leading-[20px] tracking-[-0.06px] text-[#6B7280] md:text-[16px] md:leading-[20px] md:text-[#98A2B3]">
                              {p.oldPrice}
                            </div>
                            <div className="absolute left-0 right-0 top-1/2 h-px bg-[#F04438]" />
                          </div>

                          <div className="whitespace-nowrap font-[family-name:var(--font-sf-pro-rounded)] text-[14px] font-medium leading-[20px] tracking-[-0.06px] text-[#101828] md:text-[16px]">
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

                    <div className="absolute left-[182px] top-[46px] md:left-[275px] md:top-[52px]">
                      <div className="relative">
                        <div className="whitespace-nowrap font-[family-name:var(--font-sf-pro-rounded)] text-[14px] leading-[20px] tracking-[-0.06px] text-[#6B7280] md:text-[15px] md:text-[#98A2B3]">
                          {p.strikePrice}
                        </div>
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#F04438]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="relative w-full pt-1">
                <div className="pointer-events-none absolute -right-1 -top-1 z-10 md:hidden">
                  <DiscountStickerGraphic />
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-[10px] rounded-[12px] bg-[linear-gradient(90deg,#9333EA_0%,#6366F1_100%)] px-[24px] py-[16px] shadow-[0_8px_24px_rgba(99,102,241,0.35)] transition-[transform,background-color,box-shadow,filter] duration-150 ease-out max-md:hover:brightness-[0.98] max-md:hover:shadow-[0_6px_20px_rgba(99,102,241,0.38)] max-md:active:translate-y-[3px] max-md:active:brightness-[0.96] max-md:active:shadow-[0_3px_10px_rgba(99,102,241,0.22)] md:rounded-[8px] md:bg-[#7F56D9] md:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)] md:hover:bg-[#6941C6] md:hover:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.65)] md:active:translate-y-[3px] md:active:bg-[#6941C6] md:active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_rgba(34,10,85,0.65)]"
                >
                  <span className="font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px] text-white">
                    Get Full Access
                  </span>
                  <div className="relative h-[24px] w-[24px] rotate-90">
                    <Image
                      src="/assets/paywall/chevron-right.svg"
                      alt=""
                      fill
                      unoptimized
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                </button>
              </div>

              <p className="w-full text-center font-[family-name:var(--font-inter)] text-[13px] leading-[1.2] text-[#94979C] md:text-[#475467] md:opacity-40">
                By clicking&nbsp;&quot;Get My Plan&quot;, you agree to start a
                subscription with automatic renewal.&nbsp;You will be charged
                nineteen dollars and ninety-nine cents for the first four weeks
                (special offer). After the initial four weeks, your subscription
                will automatically renew at thirty-nine dollars and ninety-nine
                cents every four weeks unless you cancel through your account
                settings before renewal.&nbsp;
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
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-[338px] z-10 hidden h-[51.369px] w-[107.339px] items-center justify-center md:flex"
            style={{ top: `${stickerTop}px` }}
          >
            <DiscountStickerGraphic />
          </div>
        </div>

        <PaymentMethods />
      </div>
    </section>
  );
}
