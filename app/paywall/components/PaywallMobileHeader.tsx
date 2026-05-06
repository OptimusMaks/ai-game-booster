"use client";

import { useId } from "react";

import GetMyPlanScrollButton from "./GetMyPlanScrollButton";

type PaywallMobileHeaderProps = {
  /** Static display for now; wire to a countdown later if needed */
  timerLabel?: string;
  className?: string;
  /** When set (e.g. on `/paywall/mobile`), show at all breakpoints; default hides from `lg` because desktop uses another header */
  alwaysShow?: boolean;
};

/** LTO header — Figma: bg #F9F5FF, bottom arc 21px (narrower than viewport), row 335×44 @ top 12px; height 89px to match desktop paywall strip */
export default function PaywallMobileHeader({
  timerLabel = "09:55",
  className = "",
  alwaysShow = false,
}: PaywallMobileHeaderProps) {
  const gid = useId().replace(/:/g, "");

  return (
    <div
      className={`relative mx-auto h-[89px] w-full overflow-hidden ${alwaysShow ? "" : "lg:hidden"} ${className}`}
    >
      {/* Vector 8 */}
      <div className="absolute inset-0 bg-[#F9F5FF]" aria-hidden />

      {/* Vector 9 — bottom curve: stretches with header (`w-full`); viewBox width 100 so paths are width-agnostic */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-[68px] h-[21px] w-full min-w-0"
        viewBox="0 0 100 21"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={`paywall-lto-arch-${gid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#5FD4FF" />
            <stop offset="55%" stopColor="#7B61FF" />
            <stop offset="100%" stopColor="#9708CC" />
          </linearGradient>
        </defs>
        <path d="M0,0 H100 V5 Q50,19 0,5 Z" fill="#F9F5FF" />
        <path d="M0,5 Q50,19 100,5 L100,21 L0,21 Z" fill="#ffffff" />
        <path
          d="M0,5 Q50,19 100,5"
          fill="none"
          stroke={`url(#paywall-lto-arch-${gid})`}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Text + Button: 335×44 @ top 12px, gap 12px */}
      <div className="absolute left-1/2 top-[12px] flex h-[44px] w-[335px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-row items-center justify-between gap-[12px]">
        {/* Frame 2609621 — 177×38, gap 8px, baseline */}
        <div className="flex h-[38px] w-[177px] shrink-0 flex-row items-baseline gap-[8px]">
          <span className="shrink-0 text-center font-[family-name:var(--font-inter)] text-[18px] font-normal leading-[22px] text-[#101828]">
            Expires in
          </span>
          <span className="shrink-0 text-center font-[family-name:var(--font-sf-pro-rounded)] text-[32px] font-medium leading-[38px] text-[#101828]">
            {timerLabel}
          </span>
        </div>

        <GetMyPlanScrollButton className="box-border flex h-[44px] w-[145px] shrink-0 flex-row items-center justify-center rounded-[8px] bg-[#7F56D9] font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[24px] text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#6941C6] hover:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.65)] active:translate-y-[3px] active:bg-[#6941C6] active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_rgba(34,10,85,0.65)]" />
      </div>
    </div>
  );
}
