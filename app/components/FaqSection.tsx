"use client";

import Image from "next/image";
import { useState } from "react";

import { FAQ_ITEMS } from "@/lib/faqItems";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full bg-white py-[44px] md:pb-[96px] md:pt-0" id="faq">
      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-[64px] px-[32px]">
        <div className="flex min-w-[335px] max-w-[768px] flex-1 flex-col gap-[20px]">
          <h2
            className="font-[family-name:var(--font-sf-pro-rounded)] text-[32px] leading-[40px] font-semibold tracking-[-1.2px] md:text-[36px] md:leading-[44px] text-[#101828]"
            style={{
              fontFamily:
                "'SF Pro Rounded', 'SF Pro Display', -apple-system, sans-serif",
            }}
          >
            FAQs
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] leading-[24px] font-normal md:leading-[28px] text-[#475467]">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="flex min-w-[335px] flex-1 flex-col gap-[16px]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`rounded-[16px] px-[16px] py-[12px] md:px-[24px] md:py-[16px] transition-colors duration-300 ${
                  isOpen ? "bg-[#F9FAFB]" : "bg-transparent"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-start justify-between gap-[24px] text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <div className="flex-1">
                    <span className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold block text-[18px] font-medium leading-[28px] text-[#101828]">
                      {item.question}
                    </span>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-[8px]"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-[16px]">
                          {Array.isArray(item.answer) ? (
                            item.answer.map((paragraph, index) => (
                              <p
                                key={index}
                                className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467]"
                              >
                                {paragraph}
                              </p>
                            ))
                          ) : (
                            <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467]">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-[2px] h-[24px] w-[24px] shrink-0 transition-transform duration-300">
                    <Image
                      src={
                        isOpen
                          ? "/assets/icon-minus.svg"
                          : "/assets/icon-plus.svg"
                      }
                      alt=""
                      fill
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
