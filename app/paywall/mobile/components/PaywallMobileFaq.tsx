"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { getPaywallFaqItems } from "@/lib/faqItems";

export default function PaywallMobileFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const items = useMemo(() => getPaywallFaqItems(), []);

  return (
    <div className="flex w-full max-w-[335px] flex-col items-center gap-[44px]">
      <div className="flex w-full max-w-[335px] flex-col items-start gap-[32px]">
        <div className="flex w-full flex-col gap-[20px]">
          <h2 className="w-full text-center font-[family-name:var(--font-sf-pro-rounded)] text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-[#101828]">
            FAQs
          </h2>
          <p className="w-full text-center font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467]">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="flex w-full flex-col gap-[16px]">
          {items.map((it, i) => {
            const open = i === openIndex;
            const hasAnswer = Array.isArray(it.answer)
              ? it.answer.length > 0
              : Boolean(it.answer);
            return (
              <div
                key={it.question}
                className={[
                  "w-full max-w-[335px] rounded-[16px] px-4 py-3",
                  open ? "bg-[#F9FAFB]" : "bg-transparent",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="flex w-full cursor-pointer items-start gap-6 text-left"
                >
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                    <p className="font-[family-name:var(--font-sf-pro-rounded)] text-[18px] font-medium leading-[28px] text-[#101828]">
                      {it.question}
                    </p>

                    <div
                      className={[
                        "grid w-full transition-all duration-300 ease-in-out",
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        {hasAnswer ? (
                          <div className="flex flex-col gap-4 pt-0">
                            {Array.isArray(it.answer) ? (
                              it.answer.map((paragraph, idx) => (
                                <p
                                  key={idx}
                                  className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467]"
                                >
                                  {paragraph}
                                </p>
                              ))
                            ) : (
                              <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467]">
                                {it.answer}
                              </p>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-0.5 h-6 w-6 shrink-0">
                    <Image
                      src={
                        open
                          ? "/assets/paywall/faq-minus.svg"
                          : "/assets/paywall/faq-plus.svg"
                      }
                      alt=""
                      width={24}
                      height={24}
                      unoptimized
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
