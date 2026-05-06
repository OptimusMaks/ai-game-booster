"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      router.replace("/quiz/choose-game");
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f6f7]">
      <AnimatedGridBackground />

      {/* Soft white vignette from edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_42%,rgba(255,255,255,0.45)_72%,rgba(255,255,255,0.82)_100%)]" />

      {/* Optional extra soft glow from top */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_35%_at_50%_0%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: 1,
            scale: [1, 1.02, 1],
          }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            },
          }}
          className="relative z-10"
        >
          <HyperupLogo />
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ y: [0, 60] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="absolute inset-[-100px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

function HyperupLogo() {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="relative h-[72px] w-[72px] -rotate-90 sm:h-[96px] sm:w-[96px] lg:h-[160px] lg:w-[160px]">
        <Image
          src="/assets/logo-symbol.svg"
          alt="HyperUp symbol"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative h-[28px] w-[180px] sm:h-[48px] sm:w-[290px] lg:h-[120px] lg:w-[725px]">
        <Image
          src="/assets/logo-text.svg"
          alt="HyperUp"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
