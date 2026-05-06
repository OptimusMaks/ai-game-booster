"use client";

import type { ReactNode } from "react";

import { PAYWALL_PLANS_SECTION_ID } from "../paywallPlansSectionId";

function scrollToPaywallPlans() {
  document.getElementById(PAYWALL_PLANS_SECTION_ID)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

type GetMyPlanScrollButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function GetMyPlanScrollButton({
  className,
  children = "Get My Plan",
}: GetMyPlanScrollButtonProps) {
  return (
    <button type="button" className={className} onClick={scrollToPaywallPlans}>
      {children}
    </button>
  );
}
