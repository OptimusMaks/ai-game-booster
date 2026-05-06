"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SupportedGamesArrowLottie() {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/assets/paywall/supported-games-arrow-lottie.json")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then(setAnimationData)
      .catch((error) => {
        console.error("Failed to load supported-games arrow lottie:", error);
        setFailed(true);
      });
  }, []);

  if (failed) {
    return (
      <div className="relative h-[46px] w-[92px] shrink-0 md:h-[52px] md:w-[104px]" aria-hidden>
        <Image
          src="/assets/paywall/supported-games-arrow.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
    );
  }

  if (!animationData) {
    return (
      <div
        className="shrink-0 bg-transparent md:h-[52px] md:w-[104px] h-[46px] w-[92px]"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none relative h-[46px] w-[92px] shrink-0 md:h-[52px] md:w-[104px]">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="h-full w-full [&_svg]:!h-full [&_svg]:!w-full"
      />
    </div>
  );
}
