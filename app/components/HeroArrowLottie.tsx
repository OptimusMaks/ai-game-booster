"use client";

import clsx from "clsx";
import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Same green hand-drawn arrow as the desktop Hero CTA (`/assets/hero-arrow-lottie.json`).
 * Optional `className` overrides default 120×80 logical size (e.g. scale slot in account ping-test).
 */
export default function HeroArrowLottie({
  className,
}: {
  className?: string;
}) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/assets/hero-arrow-lottie.json")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then(setAnimationData)
      .catch((error) => {
        console.error("Failed to load hero arrow lottie:", error);
        setFailed(true);
      });
  }, []);

  if (failed) {
    return (
      <div
        className={clsx("pointer-events-none relative h-[80px] w-[120px] shrink-0", className)}
        aria-hidden
      >
        <Image src="/assets/hero-arrow.svg" alt="" fill unoptimized className="object-contain" />
      </div>
    );
  }

  if (!animationData) {
    return (
      <div
        className={clsx("pointer-events-none shrink-0 bg-transparent h-[80px] w-[120px]", className)}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={clsx("pointer-events-none relative h-[80px] w-[120px] shrink-0", className)}
      aria-hidden
    >
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="h-full w-full [&_svg]:!h-full [&_svg]:!w-full"
      />
    </div>
  );
}
