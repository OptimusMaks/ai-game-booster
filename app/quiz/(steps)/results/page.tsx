"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const analyticsSteps = [
  "Network Route",
  "Region Server Ping",
  "Device Performance",
  "Optimization Profile",
];

export default function ResultsPage() {
  const router = useRouter();

  return (
    <section className="flex min-h-[calc(100vh-96px)] flex-col px-5 pb-10">
      <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col items-center text-center">
        <h1 className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] tracking-[-1.2px] text-[#101828]">
          Your{" "}
          <span className="bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] bg-clip-text text-transparent">
            boost plan
          </span>{" "}
          is ready!
        </h1>

        <div className="mt-6 w-full">
          <CompletedAnalyticsCard />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[424px]">
        <button
          type="button"
          onClick={() => router.push("/quiz/experience")}
          className="
            inline-flex h-[58px] w-full items-center justify-center
            rounded-[8px] bg-[#7F56D9] px-6 text-[18px] font-semibold text-white
            shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)]
            transition-[transform,background-color,box-shadow] duration-150 ease-out
            hover:bg-[#6941C6]
            hover:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.65)]
            active:translate-y-[3px]
            active:bg-[#6941C6]
            active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_rgba(34,10,85,0.65)]
          "
        >
          Continue
        </button>
      </div>
    </section>
  );
}

function CompletedAnalyticsCard() {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#E0E3E9] bg-white">
      {analyticsSteps.map((step, index) => (
        <div key={step}>
          <div className="flex items-center justify-between p-3">
            <span className="text-[16px] font-semibold text-[#101828]">
              {step}
            </span>

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7F56D9] text-white">
              <Image
                src="/assets/check.svg"
                width={24}
                height={24}
                alt="done"
              />
            </span>
          </div>

          {index !== analyticsSteps.length - 1 && (
            <div className="h-px mx-3 bg-[#E0E3E9]" />
          )}
        </div>
      ))}
    </div>
  );
}
