"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const analyticsSteps = [
  "Network Route",
  "Region Server Ping",
  "Device Performance",
  "Optimization Profile",
];

const testimonials = [
  {
    initials: "NG",
    name: "Noah Garcia",
    flag: "🇺🇸",
    text: "My location used to cause constant disconnects and peak-hour lag that made gaming impossible for days.",
  },
  {
    initials: "JF",
    name: "Johnathan Fisher",
    flag: "🇦🇺",
    text: "I am appreciative of the information offered. This given information can help understand some of the “whys” I have question to.",
  },
  {
    initials: "MF",
    name: "Mateo Fernandez",
    flag: "🇦🇷",
    text: "HyperUp helps me reduce the latency by over 50%, which has improved my win rate.",
  },
  {
    initials: "IR",
    name: "ItsMeRioo",
    flag: "🇺🇸",
    text: "The important thing is that HyperUp is safe. You can't get banned for it because the app doesn't affect any way to gameplay.",
  },
  {
    initials: "JV",
    name: "Julian Vance",
    flag: "🏴",
    text: "I used to have a ping of 60-100 on Wi-Fi, but now I've lowered it from 68 to around 50.",
  },
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 1;

      setProgress(value);

      if (value === 25) setStepIndex(0);
      if (value === 50) setStepIndex(1);
      if (value === 75) setStepIndex(2);
      if (value === 100) {
        setStepIndex(3);
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        router.push("/quiz/results");
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [progress, router]);

  useEffect(() => {
    const testimonialInterval = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 8000);

    return () => window.clearInterval(testimonialInterval);
  }, []);

  const currentLabel = analyticsSteps[stepIndex];
  const visibleTestimonial = testimonials[testimonialIndex];

  return (
    <section className="min-h-[calc(100vh-96px)] px-5 pb-10">
      <div className="mx-auto flex w-full max-w-[362px] flex-col items-center">
        <h1 className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] tracking-[-1.2px] text-[#101828]">
          Analyzing your results...
        </h1>

        <div className="mt-6 w-full">
          <AnalyticsCard stepIndex={stepIndex} />

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#101828]">
                {currentLabel}
              </span>
              <span className="text-[16px] text-[#475467]">{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#E0E3E9]">
              <div
                className="h-full rounded-full bg-[#7F56D9] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-13 w-full">
          <TestimonialCard testimonial={visibleTestimonial} />
        </div>
      </div>
    </section>
  );
}

function AnalyticsCard({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#E0E3E9] bg-white">
      <AnimatePresence>
        {analyticsSteps.slice(0, stepIndex + 1).map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className={[
              "flex h-[48px] items-center justify-between px-4",
              index !== 0 ? "border-t border-[#E0E3E9]" : "",
            ].join(" ")}
          >
            <span className="text-[16px] font-semibold text-[#101828]">
              {step}
            </span>

            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7F56D9] text-white"
            >
              <Image
                src="/assets/check.svg"
                width={24}
                height={24}
                alt="done"
              />
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: {
    initials: string;
    name: string;
    flag: string;
    text: string;
  };
}) {
  return (
    <div className="rounded-[16px] border border-[#EAECF0] bg-white p-6">
      <div className="flex gap-2 text-[#F79009]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            height={24}
            width={24}
            src="/assets/star.svg"
            alt=""
          />
        ))}
      </div>

      <p className="mt-4 p-4 text-[14px] font-medium leading-[24зч] text-[#475467]">
        {testimonial.text}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F9F5FF] text-[14px] font-semibold text-[#6941C6] font-[family-name:var(--font-sf-pro-rounded)]">
          {testimonial.initials}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[16px] font-semibold text-[#101828] font-[family-name:var(--font-sf-pro-rounded)]">
            {testimonial.name}
          </span>
          <span>{testimonial.flag}</span>
        </div>
      </div>
    </div>
  );
}
