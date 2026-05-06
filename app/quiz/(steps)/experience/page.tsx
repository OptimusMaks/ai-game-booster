"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ExperiencePage() {
  const router = useRouter();

  return (
    <section className="flex min-h-[calc(100vh-96px)] flex-col px-5 pb-10">
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col items-center text-center">
        <h1 className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] tracking-[-1.2px] text-[#101828]">
          Your game experience will be <br />
          <span className="bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] bg-clip-text text-transparent">
            smooth
          </span>{" "}
          like never before!
        </h1>

        <p className="mt-6 text-[20px] leading-[30px] text-[#475467]">
          Based on your answers, we found the best servers with seamless
          connection
        </p>

        <div className="mt-6">
          <ExperienceChart />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[424px]">
        <button
          type="button"
          onClick={() => router.push("/quiz/email")}
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

function ExperienceChart() {
  return (
    <div className="mt-8 w-full max-w-[340px]">
      <Image
        src="/assets/chart.svg"
        alt="Performance improvement"
        width={340}
        height={220}
        className="w-full h-auto"
      />
    </div>
  );
}
