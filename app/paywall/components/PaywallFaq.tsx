"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { getPaywallFaqItems } from "@/lib/faqItems";

export default function PaywallFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const items = useMemo(() => getPaywallFaqItems(), []);

  return (
    <div className="flex w-full max-w-[600px] flex-col items-stretch gap-[20px]">
      <div className="flex w-full flex-col gap-[20px] text-center">
        <h2 className="font-[family-name:var(--font-sf-pro-rounded)] text-[36px] font-semibold leading-[44px] tracking-[-1.2px] text-[#101828]">
          FAQs
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[18px] font-normal leading-[28px] text-[#475467]">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="flex w-full min-w-0 flex-col items-start gap-[16px]">
        {items.map((it, i) => {
          const open = i === openIndex;
          const hasAnswer = Array.isArray(it.answer)
            ? it.answer.length > 0
            : Boolean(it.answer);
          return (
            <div
              key={it.question}
              className={[
                "w-full rounded-[16px] px-[24px] py-[16px]",
                open ? "bg-[#F9FAFB]" : "bg-transparent",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="w-full flex items-start gap-[24px] cursor-pointer text-left"
              >
                <div className="flex-1 min-w-0 flex flex-col items-start">
                  <p className="font-[family-name:var(--font-sf-pro-rounded)] font-medium text-[#101828] text-[18px] leading-[28px]">
                    {it.question}
                  </p>

                  <div
                    className={[
                      "grid w-full transition-all duration-300 ease-in-out",
                      open ? "grid-rows-[1fr] opacity-100 mt-[8px]" : "grid-rows-[0fr] opacity-0 mt-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      {hasAnswer ? (
                        <div className="flex flex-col gap-[16px]">
                          {Array.isArray(it.answer) ? (
                            it.answer.map((paragraph, idx) => (
                              <p
                                key={idx}
                                className="font-[family-name:var(--font-inter)] font-normal text-[16px] leading-[24px] text-[#475467]"
                              >
                                {paragraph}
                              </p>
                            ))
                          ) : (
                            <p className="font-[family-name:var(--font-inter)] font-normal text-[16px] leading-[24px] text-[#475467]">
                              {it.answer}
                            </p>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="relative w-[24px] h-[24px] shrink-0 mt-[2px]">
                  <Image
                    src={
                      open
                        ? "/assets/paywall/faq-minus.svg"
                        : "/assets/paywall/faq-plus.svg"
                    }
                    alt=""
                    fill
                    unoptimized
                    sizes="24px"
                    className="object-contain"
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

