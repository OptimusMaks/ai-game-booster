import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { MARQUEE_LAG_GAME_ICONS } from "@/lib/marqueeLagGameIcons";
import Testimonials from "../components/Testimonials";
import GetMyPlanScrollButton from "./components/GetMyPlanScrollButton";
import PaywallFaq from "./components/PaywallFaq";
import PaywallMobileFaq from "./mobile/components/PaywallMobileFaq";
import PaywallPlans from "./components/PaywallPlans";
import PaywallMobileHeader from "./components/PaywallMobileHeader";
import SupportedGames from "./components/SupportedGames";

function PaywallHeader() {
  return (
    <header className="relative w-full">
      <div className="md:hidden">
        <PaywallMobileHeader alwaysShow />
      </div>

      <div className="relative mx-auto hidden h-[89px] w-full md:block">
        <div className="absolute left-0 top-0 h-[88.921px] w-full">
          <Image
            src="/assets/paywall/header-bg.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 100vw, 1px"
          />
        </div>

        <div className="absolute left-1/2 top-[12px] flex h-[44px] w-[954px] max-w-[calc(100%-48px)] -translate-x-1/2 items-center justify-between">
          <Link
            href="/"
            className="flex w-[181px] shrink-0 items-center gap-[4px]"
            aria-label="HyperUp home"
          >
            <div className="relative h-[32px] w-[32px] -rotate-90">
              <Image
                src="/assets/logo-symbol.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-[24px] w-[145px]">
              <Image
                src="/assets/logo-text.svg"
                alt="HyperUp"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex shrink-0 items-center justify-end gap-[12px]">
            <div className="flex items-baseline gap-[8px] whitespace-nowrap text-center text-[#101828]">
              <span className="font-[family-name:var(--font-inter)] text-[18px] font-normal leading-[22px]">
                Expires in
              </span>
              <span className="font-[family-name:var(--font-sf-pro-rounded)] text-[32px] font-medium leading-[38px]">
                09:55
              </span>
            </div>

            <GetMyPlanScrollButton className="h-[44px] w-[145px] shrink-0 rounded-[8px] bg-[#7F56D9] font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[24px] text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#6941C6] hover:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.65)] active:translate-y-[3px] active:bg-[#6941C6] active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_rgba(34,10,85,0.65)]" />
          </div>
        </div>
      </div>
    </header>
  );
}

function PaywallHeading() {
  return (
    <div className="mx-auto w-[335px] max-w-[calc(100%-40px)] md:mx-0 md:w-full md:max-w-none">
      {/* Mobile — Figma: 335×168, 44/56, tracking -0.02em; «Zero Lag!» accent per mobile frame */}
      <p className="flex h-[168px] flex-col justify-center text-center font-[family-name:var(--font-sf-pro-rounded)] text-[44px] font-semibold leading-[56px] tracking-[-0.02em] text-[#101828] md:hidden">
        <span className="block">Dominate the</span>
        <span className="block">Lobby with</span>
        <span className="block text-[#7F56D9]">Zero Lag!</span>
      </p>

      <p className="hidden font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[#101828] text-[44px] leading-[normal] tracking-[-0.88px] text-center whitespace-pre md:block">
        <span>{`Dominate the Lobby  with\u00A0`}</span>
        <br aria-hidden="true" />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(168deg, #43CBFF 0%, #9708CC 100%)",
          }}
        >
          Zero Lag!
        </span>
      </p>
    </div>
  );
}

function PaywallPingSection() {
  return (
    <div className="flex w-full flex-col items-center gap-[44px]">

      <div className="relative h-[92px] w-full max-w-[340px] px-[16px] md:h-[154px] md:w-[553px] md:max-w-none md:px-[80px]">
        <Image
          src="/assets/ping-union.svg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 553px, 100vw"
          className="object-contain"
        />

        <div className="absolute left-[16px] top-[16px] flex flex-col md:left-[18px] md:top-[23px]">
          <span className="font-[family-name:var(--font-sf-pro-rounded)] text-[36px] font-semibold leading-[44px] tracking-[-0.72px] text-[#f04438] md:text-[60px] md:leading-[72px] md:tracking-[-1.2px]">
            ~110ms
          </span>
          <span className="text-center font-[family-name:var(--font-inter)] text-[12px] font-medium leading-[18px] text-[#f04438] md:text-[16px] md:leading-[24px]">
            Before
          </span>
        </div>

        <div className="absolute right-[16px] top-[16px] flex flex-col md:right-[18px] md:top-[23px]">
          <span className="font-[family-name:var(--font-sf-pro-rounded)] text-[36px] font-semibold leading-[44px] tracking-[-0.72px] text-[#17b26a] md:text-[60px] md:leading-[72px] md:tracking-[-1.2px]">
            ~45ms
          </span>
          <span className="font-[family-name:var(--font-inter)] text-[12px] font-medium leading-[18px] text-[#17b26a] md:text-[16px] md:leading-[24px]">
            After HyperUp
          </span>
        </div>
      </div>
    </div>
  );
}

function PremiumIncludes() {
  const items = [
    "Eliminate lag spikes and lower base ping instantly.",
    "Zero packet loss for perfect hit registration.",
    "Automatic optimal routing to global servers.",
    "Maximized FPS",
  ];

  return (
    <div className="mx-auto flex w-full max-w-[335px] flex-col items-center gap-[44px] md:max-w-[600px] md:items-start md:gap-[32px]">
      {/* Mobile — Figma: 335×80, 32/40, -0.02em; «Premium» / «Pass» accent #7F56D9 */}
      <div className="w-full text-center font-[family-name:var(--font-sf-pro-rounded)] text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-[#101828] md:hidden">
        <div>
          What Your <span className="text-[#7F56D9]">Premium</span>
        </div>
        <div>
          <span className="text-[#7F56D9]">Pass</span> Includes:
        </div>
      </div>

      <p className="hidden w-full text-center font-[family-name:var(--font-sf-pro-rounded)] text-[36px] font-semibold leading-[44px] tracking-[-0.72px] text-[#101828] md:block">
        <span>{`What Your `}</span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(176deg, #43CBFF 0%, #9708CC 100%)",
          }}
        >
          Premium Pass
        </span>
        <span> Includes:</span>
      </p>

      <div className="flex w-full flex-col items-start gap-[24px] rounded-[12px] py-[12px] md:w-[600px] md:rounded-none">
        {items.map((text) => (
          <div
            key={text}
            className="flex w-full max-w-[335px] items-center gap-[8px] md:max-w-none"
          >
            <div className="relative h-[24px] w-[24px] shrink-0">
              <Image
                src="/assets/paywall/check-purple.svg"
                alt=""
                fill
                unoptimized
                sizes="24px"
                className="object-contain"
              />
            </div>
            <p className="min-w-0 flex-1 text-left capitalize font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[1.6] text-[#101828]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCards() {
  const cards = [
    {
      bg: "#F6FEF9",
      headerBg: "#079455",
      icon: "/assets/paywall/feature-ai.svg",
      title: "Smart AI Routing",
      body:
        "Our neural network analyzes thousands of routes and picks the fastest one for your game in real-time. Lower ping, zero effort.",
      rotate: "-2deg",
      w: "579.678px",
      h: "249.822px",
      mobileMinH: 214,
    },
    {
      bg: "#ECFDFF",
      headerBg: "#0E7090",
      icon: "/assets/paywall/feature-globe.svg",
      title: "Global Server Network",
      body:
        "50+ countries with nodes next to game data centers. LagOff.ai automatically finds the closest one for you.",
      rotate: "2deg",
      w: "578.631px",
      h: "219.841px",
      mobileMinH: 214,
    },
    {
      bg: "#FDF4FF",
      headerBg: "#9F1AB1",
      icon: "/assets/paywall/feature-tap.svg",
      title: "One-Tap Boost",
      body:
        "No settings. No configuration. Open the app, tap the button, and play without lag. It's that simple.",
      rotate: "-2deg",
      w: "578.631px",
      h: "219.841px",
      mobileMinH: 190,
    },
  ];

  return (
    <section className="w-full px-5 py-11 md:px-0 md:py-0">
      <div className="mx-auto flex w-full max-w-[335px] flex-col items-center gap-11 md:max-w-[600px] md:gap-8">
        <h2 className="w-full text-center font-[family-name:var(--font-sf-pro-rounded)] text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-[#101828] md:text-[36px] md:leading-[44px] md:tracking-[-0.72px]">
          Advanced Booster Features:
        </h2>

        <div className="flex w-full flex-col items-center gap-5 md:items-start">
          {cards.map((c) => (
            <Fragment key={c.title}>
              {/* Mobile — Figma: 335px cards, p-5, gap 32 header↔body, header 58px row */}
              <div className="flex w-full justify-center md:hidden">
                <div
                  className="w-full max-w-[335px]"
                  style={{ transform: `rotate(${c.rotate})` }}
                >
                  <article
                    className="flex flex-col justify-center gap-8 rounded-[24px] p-5"
                    style={{
                      backgroundColor: c.bg,
                      minHeight: c.mobileMinH,
                    }}
                  >
                    <div
                      className="flex min-h-[58px] items-center gap-3 rounded-[12px] px-4 py-4"
                      style={{ backgroundColor: c.headerBg }}
                    >
                      <div className="relative h-6 w-6 shrink-0">
                        <Image
                          src={c.icon}
                          alt=""
                          fill
                          unoptimized
                          sizes="24px"
                          className="object-contain"
                        />
                      </div>
                      <p className="font-[family-name:var(--font-sf-pro-rounded)] text-[22px] font-bold leading-[26px] text-white">
                        {c.title}
                      </p>
                    </div>
                    <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467]">
                      {c.body}
                    </p>
                  </article>
                </div>
              </div>

              {/* Desktop — прежняя вёрстка */}
              <div
                className="hidden items-center justify-center md:flex"
                style={{ width: c.w, height: c.h }}
              >
                <div className="flex-none" style={{ transform: `rotate(${c.rotate})` }}>
                  <div
                    className="flex w-[572px] flex-col items-center justify-center rounded-[24px] p-6"
                    style={{ backgroundColor: c.bg }}
                  >
                    <div className="flex w-full flex-col items-start justify-center gap-5">
                      <div
                        className="flex w-full items-center gap-4 rounded-[12px] px-6 py-5"
                        style={{ backgroundColor: c.headerBg }}
                      >
                        <div className="relative h-8 w-8 shrink-0">
                          <Image
                            src={c.icon}
                            alt=""
                            fill
                            unoptimized
                            sizes="32px"
                            className="object-contain"
                          />
                        </div>
                        <p className="whitespace-nowrap font-[family-name:var(--font-sf-pro-rounded)] text-[22px] font-bold leading-[normal] text-white">
                          {c.title}
                        </p>
                      </div>

                      <p className="font-[family-name:var(--font-inter)] text-[20px] font-normal leading-[30px] text-[#475467]">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameLagMarquee() {
  const blocks = MARQUEE_LAG_GAME_ICONS.map((_, i) => i);

  const slide = (i: number, keyPrefix: string, ariaHidden?: boolean) => {
    const src = MARQUEE_LAG_GAME_ICONS[i]!;
    return (
    <div
      key={`${keyPrefix}-${i}`}
      className="relative h-[52px] w-[156px] shrink-0"
      aria-hidden={ariaHidden ? true : undefined}
    >
      <div
        className="absolute left-[6px] top-0 h-[52px] w-[52px] overflow-hidden rounded-[12px]"
      >
        {/* Bottom half: full color (same asset as Hero gallery) */}
        <Image
          src={src}
          alt=""
          fill
          sizes="104px"
          className="z-0 object-cover [clip-path:inset(50%_0_0_0)]"
        />
        {/* Top half: grayscale only (no blur) */}
        <div className="pointer-events-none absolute inset-0 z-[1] [clip-path:inset(0_0_50%_0)] overflow-hidden">
          <Image
            src={src}
            alt=""
            fill
            sizes="104px"
            className="object-cover grayscale"
          />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[3px] w-[52px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-white bg-[#101828]" />
      </div>

      <div className="absolute left-[69px] top-0 flex items-center gap-[4px]">
        <div className="relative h-[24px] w-[24px]">
          <Image
            src="/assets/paywall/wifi-red.svg"
            alt=""
            fill
            unoptimized
            sizes="24px"
            className="object-contain"
          />
        </div>
        <span className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-[#F04438]">
          110 ms
        </span>
      </div>

      <div className="absolute left-[69px] top-[28px] flex items-center gap-[4px]">
        <div className="relative h-[24px] w-[24px]">
          <Image
            src="/assets/paywall/wifi-green.svg"
            alt=""
            fill
            unoptimized
            sizes="24px"
            className="object-contain"
          />
        </div>
        <span className="font-[family-name:var(--font-inter)] text-[20px] font-semibold leading-[24px] text-[#17B26A]">
          47 ms
        </span>
      </div>
    </div>
    );
  };

  return (
    <div className="flex w-full flex-col gap-[32px]">
      <p className="mx-auto w-full max-w-[600px] px-4 text-center font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[#101828] text-[36px] tracking-[-0.72px]">
        Before and after you start using{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(172deg, #43CBFF 0%, #9708CC 100%)",
          }}
        >
          HyperUp
        </span>
        :
      </p>

      <section className="w-full overflow-x-hidden" aria-label="Ping comparison">
        <div className="flex w-max gap-[64px] animate-[marquee-paywall-game-lag_18s_linear_infinite] will-change-transform">
          {blocks.map((i) => slide(i, "a", false))}
          {blocks.map((i) => slide(i, "b", true))}
        </div>
      </section>
    </div>
  );
}

function IPhonePic() {
  return (
    <div className="relative mx-auto h-[305px] w-full max-w-[335px] overflow-visible md:h-[500px] md:w-[550px] md:max-w-none">
      <div className="absolute left-1/2 top-0 w-[550px] -translate-x-1/2 scale-[0.609] md:relative md:left-0 md:top-0 md:w-[550px] md:translate-x-0 md:scale-100">
        <div className="absolute left-[167.106px] top-[8.628px] z-10 h-[482.426px] w-[221.894px]">
          <div className="absolute -left-[13.249px] -top-[12.696px] h-[507.817px] w-[248.389px]">
            <Image
              src="/assets/paywall/iphone-frame.png"
              alt=""
              fill
              sizes="250px"
              className="object-cover"
            />
          </div>

          <div className="absolute left-0 top-0 h-[482.674px] w-[221.812px]">
            <div className="absolute inset-0 overflow-hidden rounded-[34.365px]">
              <Image
                src="/assets/paywall/iphone-center.png"
                alt=""
                fill
                sizes="230px"
                className="object-cover"
              />
            </div>
            <div className="absolute left-[6.894px] top-[3.372px] h-[15px] w-[209px]">
              <Image
                src="/assets/paywall/iphone-topbar.svg"
                alt=""
                fill
                unoptimized
                sizes="209px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="absolute left-[-5.238px] top-[86.359px] z-0 h-[383.555px] w-[235.225px]">
          <div className="absolute inset-0 origin-center rotate-[-12deg] overflow-hidden rounded-[30.217px]">
            <Image
              src="/assets/paywall/iphone-left.png"
              alt=""
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute left-[319px] top-[96px] z-0 flex h-[373.571px] w-[237.222px] items-center justify-center">
          <div className="relative h-[346px] w-[168.977px] origin-center rotate-[12deg] overflow-hidden rounded-[30px]">
            <Image
              src="/assets/paywall/iphone-screen.png"
              alt=""
              fill
              sizes="180px"
              className="object-cover"
            />
            <div className="absolute left-0 top-[228px] h-[289px] w-[17px] bg-[#12131A]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MoneyBackGuarantee() {
  const badge = (
    <div className="absolute left-1/2 top-[-68.5px] z-[2] h-[112px] w-[100px] -translate-x-1/2 md:left-[165px] md:translate-x-0">
      <div className="absolute left-[-0.43px] top-[51.04px] h-[61.564px] w-[51.133px] rotate-[30deg]">
        <Image
          src="/assets/paywall/guarantee-left.svg"
          alt=""
          fill
          unoptimized
          sizes="52px"
          className="object-contain"
        />
      </div>
      <div className="absolute left-[49.57px] top-[51.04px] h-[61.564px] w-[51.133px] rotate-[150deg] scale-y-[-1]">
        <Image
          src="/assets/paywall/guarantee-right.svg"
          alt=""
          fill
          unoptimized
          sizes="52px"
          className="object-contain"
        />
      </div>
      <div className="absolute left-[0.066px] top-[-1.464px] h-[100px] w-[100px]">
        <Image
          src="/assets/paywall/guarantee-star.svg"
          alt=""
          fill
          unoptimized
          sizes="100px"
          className="object-contain"
        />
      </div>
      <div className="absolute left-1/2 top-[29.536px] -translate-x-1/2 text-center font-[family-name:var(--font-sf-pro-rounded)] text-[16px] font-bold leading-[normal] text-white">
        <div>30</div>
        <div>DAYS</div>
      </div>
    </div>
  );

  const copy = (
    <>
      <p className="max-w-[260px] text-center font-[family-name:var(--font-sf-pro-rounded)] text-[24px] font-bold leading-[32px] text-[#101828] md:max-w-none">
        Money-Back Guarantee
      </p>
      <p className="max-w-[287px] text-center font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[1.4] text-[#475467] md:max-w-none">
        If you are not satisfied with our service we are ready to offer a full
        refund within 30 days of your initial purchase or before the end of your
        first subscription period. Additional{" "}
        <Link href="/terms" className="underline">
          Terms &amp; Conditions
        </Link>{" "}
        apply.
      </p>
    </>
  );

  return (
    <section className="py-11 md:py-0">
      <div className="relative mx-auto w-full max-w-[335px] md:h-[314px] md:w-[430px] md:max-w-none">
        <div className="h-[67px] md:hidden" aria-hidden />

        <div className="relative isolate flex min-h-[268px] w-full flex-col items-center gap-5 rounded-[24px] bg-[#F6FEF9] px-6 pb-6 pt-[60px] md:absolute md:left-0 md:top-[66.512px] md:min-h-0 md:w-[430px] md:px-6 md:pb-6 md:pt-[60px]">
          {badge}
          {copy}
        </div>
      </div>
    </section>
  );
}

function PaywallFooter() {
  return (
    <div className="w-[205px] flex flex-col items-center gap-[16px]">
      <Link
        href="/"
        className="flex w-[181px] items-center gap-[4px]"
        aria-label="HyperUp home"
      >
        <div className="relative h-[32px] w-[32px] -rotate-90">
          <Image
            src="/assets/logo-symbol.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="relative h-[24px] w-[145px]">
          <Image
            src="/assets/logo-text.svg"
            alt="HyperUp"
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <p className="font-[family-name:var(--font-inter)] text-[16px] leading-[24px] text-[#667085] text-center">
        © 2026 All rights reserved.
      </p>
    </div>
  );
}

export default function PaywallPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <PaywallHeader />

      <main className="w-full">
        <div className="mx-auto w-full max-w-[1440px]">
        <div className="w-[600px] mx-auto pt-[36px]">
          <div className="pt-[0px]" />
        </div>

        <div className="mx-auto w-full max-w-[600px] px-5 pt-[36px] md:w-[600px] md:px-0">
          <PaywallHeading />
        </div>

        <div className="mx-auto w-full max-w-[600px] px-5 pt-[72px] md:w-[600px] md:px-0">
          <PaywallPingSection />
        </div>

        <div className="mx-auto w-full max-w-[600px] pt-[72px] md:w-[600px]">
          <PaywallPlans variant="choose-plan" />
        </div>

        <div className="mx-auto w-full max-w-[600px] px-5 pt-[72px] md:w-[600px] md:px-0">
          <PremiumIncludes />
        </div>

        <div className="mx-auto flex w-full max-w-[600px] justify-center px-5 pt-[72px] md:w-[600px] md:px-0">
          <SupportedGames />
        </div>

        <div className="mx-auto w-full max-w-[600px] px-5 pt-[72px] md:w-[600px] md:px-0">
          <IPhonePic />
        </div>

        <div className="mx-auto w-full pt-[72px] md:max-w-[600px]">
          <FeatureCards />
        </div>
        </div>

        <div className="w-full overflow-x-hidden pt-[72px]">
          <GameLagMarquee />
        </div>

        <div className="w-full pt-[32px] md:pt-[40px]">
          <Testimonials mode="paywall" />
        </div>

        <div className="mx-auto w-full max-w-[1440px]">
        <div className="mx-auto w-full max-w-[600px] pt-[72px] md:w-[600px]">
          <PaywallPlans variant="smooth-boost" anchorId={false} />
        </div>

        <div className="mx-auto w-full max-w-[600px] px-5 pt-[72px] md:w-[600px] md:px-0">
          <MoneyBackGuarantee />
        </div>

        <div className="mx-auto w-full max-w-[600px] px-5 pt-[72px] md:w-[600px] md:px-0">
          <div className="hidden md:block">
            <PaywallFaq />
          </div>
          <div className="flex justify-center md:hidden">
            <PaywallMobileFaq />
          </div>
        </div>

        <div className="w-[205px] mx-auto pt-[72px] pb-[64px]">
          <PaywallFooter />
        </div>
        </div>
      </main>
    </div>
  );
}

