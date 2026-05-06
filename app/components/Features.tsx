"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

const features = [
  {
    icon: "/assets/icon-smart.svg",
    title: "Smart AI Routing",
    description:
      "Our neural network analyzes thousands of routes and picks the fastest one for your game in real-time. Lower ping, zero effort.",
    color: "#079455",
    bg: "#f6fef9",
    position: "left" as const,
    height: 550,
    top: 0,
    phoneWidth: 340,
    phoneHeight: 430,
    phoneLeft: "50%",
    phoneBottom: -200,
    phoneRotate: -32,
    phoneScale: 1.5,
    mobileHeight: 370,
  },
  {
    icon: "/assets/icon-tap.svg",
    title: "One-Tap Boost",
    description:
      "No settings. No configuration. Open the app, tap the button, and play without lag. It's that simple.",
    color: "#9f1ab1",
    bg: "#fdf4ff",
    position: "left" as const,
    height: 550,
    top: 574,
    phoneWidth: 330,
    phoneHeight: 430,
    phoneLeft: "50%",
    phoneBottom: -200,
    phoneRotate: 32,
    phoneScale: 1.5,
    mobileHeight: 370,
  },
  {
    icon: "/assets/icon-game.svg",
    title: "Game Profiles & Auto-Detection",
    description:
      "Launch a game — HyperUp detects it instantly and applies the optimal profile. Support for 200+ games.",
    color: "#a15c07",
    bg: "#fefbe8",
    position: "left" as const,
    height: 550,
    top: 1148,
    phoneWidth: 330,
    phoneHeight: 430,
    phoneLeft: "50%",
    phoneBottom: -200,
    phoneRotate: 0,
    phoneScale: 1.5,
    mobileHeight: 370,
  },
  {
    icon: "/assets/icon-global.svg",
    title: "Global Server Network",
    description:
      "50+ countries with nodes next to game data centers. HyperUp automatically finds the closest one for you.",
    color: "#0e7090",
    bg: "#ecfdff",
    position: "right" as const,
    height: 778,
    top: 0,
    phoneWidth: 360,
    phoneHeight: 520,
    phoneLeft: "52%",
    phoneBottom: -100,
    phoneRotate: -16,
    phoneScale: 1.5,
    mobileHeight: 440,
  },
  {
    icon: "/assets/icon-shield.svg",
    title: "Predictive Lag Shield",
    description:
      "AI predicts network drops before they hit your game and pre-switches routes. You'll never notice a thing.",
    color: "#c01048",
    bg: "#fff1f3",
    position: "right" as const,
    height: 778,
    top: 802,
    phoneWidth: 360,
    phoneHeight: 520,
    phoneLeft: "50%",
    phoneBottom: -75,
    phoneRotate: 0,
    phoneScale: 1.5,
    mobileHeight: 440,
  },
  {
    icon: "/assets/icon-stats.svg",
    title: "Real Stats, Real Results",
    description:
      "Your personal dashboard: ping reduction, saved packets, lag-free hours. See exactly how HyperUp improves your game.",
    color: "#363f72",
    bg: "#f8f9fc",
    position: "right" as const,
    height: 778,
    top: 1604,
    phoneWidth: 360,
    phoneHeight: 520,
    phoneLeft: "50%",
    phoneBottom: -100,
    phoneRotate: 16,
    phoneScale: 1.5,
    mobileHeight: 440,
  },
];

function DesktopFeatureCard({
  feature,
}: {
  feature: (typeof features)[number];
}) {
  const [isHovered, setIsHovered] = useState(false);

  const rotate = isHovered ? feature.phoneRotate + 5 : feature.phoneRotate;
  const scale = isHovered ? feature.phoneScale + 0.05 : feature.phoneScale;

  return (
    <div
      className="absolute overflow-hidden rounded-[16px] p-[24px]"
      style={{
        backgroundColor: feature.bg,
        width: 628,
        height: feature.height,
        left: feature.position === "left" ? 0 : 652,
        top: feature.top,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex max-w-[560px] flex-col gap-[20px]">
        <div className="flex items-center gap-[10px]">
          <div className="relative h-[32px] w-[32px] shrink-0">
            <Image src={feature.icon} alt="" fill />
          </div>

          <h3
            className="text-[36px] font-semibold leading-[44px] tracking-[-0.72px]"
            style={{
              fontFamily:
                "'SF Pro Rounded', 'SF Pro Display', -apple-system, sans-serif",
              color: feature.color,
            }}
          >
            {feature.title}
          </h3>
        </div>

        <p className="font-[family-name:var(--font-inter)] text-[20px] leading-[30px] text-[#475467]">
          {feature.description}
        </p>
      </div>

      <div
        className="pointer-events-none absolute will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={
          {
            width: feature.phoneWidth,
            height: feature.phoneHeight,
            left: feature.phoneLeft,
            bottom: feature.phoneBottom,
            transform: `translateX(-50%) rotate(${rotate}deg) scale(${scale})`,
            transformOrigin: "center center",
          } as CSSProperties
        }
      >
        <Image
          src="/assets/iphone-mockup.png"
          alt="iPhone mockup"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

function MobileFeatureCard({
  feature,
}: {
  feature: (typeof features)[number];
}) {
  const [isHovered, setIsHovered] = useState(false);

  const rotate = isHovered ? feature.phoneRotate + 5 : feature.phoneRotate;
  const scale = isHovered ? 1.12 : 1.08;

  return (
    <div
      className="relative overflow-hidden rounded-[16px] px-[20px] pt-[20px] pb-[180px]"
      style={{ backgroundColor: feature.bg, height: feature.mobileHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex flex-col gap-[16px]">
        <div className="flex items-start gap-[10px]">
          <div className="relative h-[28px] w-[28px] shrink-0">
            <Image src={feature.icon} alt="" fill />
          </div>

          <h3
            className="text-[24px] font-semibold leading-[32px] tracking-[-0.48px]"
            style={{
              fontFamily:
                "'SF Pro Rounded', 'SF Pro Display', -apple-system, sans-serif",
              color: feature.color,
            }}
          >
            {feature.title}
          </h3>
        </div>

        <p className="font-[family-name:var(--font-inter)] text-[16px] leading-[24px] text-[#475467]">
          {feature.description}
        </p>
      </div>

      <div
        className="pointer-events-none absolute left-1/2 bottom-[-110px] h-[300px] w-[240px] will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={
          {
            transform: `translateX(-50%) rotate(${rotate}deg) scale(${scale})`,
            transformOrigin: "center center",
          } as CSSProperties
        }
      >
        <Image
          src="/assets/iphone-mockup.png"
          alt="iPhone mockup"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="w-full py-[44px] md:pb-[96px] md:pt-0">
      {/* Mobile */}
      <div className="block px-[16px] md:hidden">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-[16px]">
          {features.map((feature, index) => (
            <MobileFeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden px-[80px] md:block">
        <div className="relative mx-auto h-[2382px] max-w-[1280px]">
          {features.map((feature, index) => (
            <DesktopFeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
