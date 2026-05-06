"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AccountBackButton } from "@/app/account/AccountBackButton";
import HeroArrowLottie from "@/app/components/HeroArrowLottie";

export type PingTestGame = {
  label: string;
  icon: string;
};

/**
 * Same `/assets/game-*.png` order as paywall `SupportedGames` (login / marketing tiles).
 * Labels match the actual artwork in `public/assets` (not sequential guesses by filename).
 */
export const PING_TEST_GAMES: PingTestGame[] = [
  { label: "Brawl Stars", icon: "/assets/game-01.png" },
  { label: "Arena of Valor", icon: "/assets/game-05.png" },
  { label: "Blood Strike", icon: "/assets/game-04.png" },
  { label: "Roblox", icon: "/assets/game-02.png" },
  { label: "FIFA Mobile", icon: "/assets/game-06.png" },
  { label: "Free Fire", icon: "/assets/game-11.png" },
  { label: "PUBG Mobile", icon: "/assets/game-12.png" },
  { label: "Clash Royale", icon: "/assets/game-03.png" },
  { label: "Standoff 2", icon: "/assets/game-13.png" },
  { label: "Free Fire MAX", icon: "/assets/game-07.png" },
  { label: "Battlegrounds Mobile India", icon: "/assets/game-08.png" },
  { label: "Mobile Legends: Bang Bang", icon: "/assets/game-10.png" },
];

/** Shown above the Testing pill while analysis runs; cycles automatically. */
const PING_ANALYSIS_STATUS_MESSAGES = [
  "Analyzing network environment",
  "Fetching game server latency...",
  "Recording latency...",
  "Summarizing ping test results.",
] as const;

/** Time each analysis status message stays visible (full cycle = × message count). ~1.5× faster than initial 2800ms. */
const ANALYSIS_STATUS_ROTATION_MS = Math.round(2800 / 1.5);

/** One full cycle through all analysis messages — matches ping-test chart reveal duration. */
const ANALYSIS_STATUS_FULL_CYCLE_MS =
  ANALYSIS_STATUS_ROTATION_MS * PING_ANALYSIS_STATUS_MESSAGES.length;

/** Base latency value revealed after the full analysis animation (card + left diagram label). */
const PING_TEST_BASE_LATENCY_MS = 122;
const PING_TEST_BASE_LATENCY_LABEL = `${PING_TEST_BASE_LATENCY_MS}ms`;

const CONNECTION_ROWS: { icon: string; label: string; value: string }[] = [
  { icon: "/assets/network-i.svg", label: "Network", value: "CityLan LLC" },
  { icon: "/assets/server-i.svg", label: "Server", value: "UA | Kyiv" },
  { icon: "/assets/protocol-i.svg", label: "Protocol", value: "IPv4" },
  { icon: "/assets/ip-i.svg", label: "IP address", value: "84.233.104.154" },
];

function PingAnalysisStatusBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PING_ANALYSIS_STATUS_MESSAGES.length);
    }, ANALYSIS_STATUS_ROTATION_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-8 w-full max-w-[220px] items-center justify-center mb-4">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: Math.round((0.22 / 1.5) * 100) / 100, ease: "easeOut" }}
          className="inline-flex items-center justify-center rounded-lg bg-[#F2F4F7] px-2 py-1 text-center font-[family-name:var(--font-inter)] text-[12px] font-medium leading-6 text-[#111028]"
        >
          {PING_ANALYSIS_STATUS_MESSAGES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function GamePingIconTile({
  src,
  className,
  desaturated,
}: {
  src: string;
  className?: string;
  /** «Before» — приглушённая иконка (контраст с цветной правой). */
  desaturated?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[32px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]",
        className ?? "size-[140px] sm:size-[170px]",
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        className={clsx(
          "rounded-[44px] object-cover transition-[filter,opacity] duration-200",
          desaturated
            ? "saturate-[0.62] brightness-[0.98] contrast-[0.97] opacity-[0.93]"
            : "",
        )}
        sizes="170px"
      />
    </div>
  );
}

/** Latency chart in ms (0–150); upward trend like design reference. */
const LATENCY_SERIES = [
  110, 112, 108, 115, 118, 114, 122, 125, 128, 126, 132, 135, 134, 140, 142, 145,
] as const;

/** Optimized latency series (green line) — low band ~25–45ms. */
const LATENCY_OPTIMIZED_SERIES = [
  25, 27, 26, 30, 32, 31, 35, 38, 36, 42, 44, 43, 45, 46, 45, 44,
] as const;

/** Target optimized ping (ms) after HyperUp acceleration. */
const PING_OPTIMIZED_TARGET_MS = 25;

const CHART_VIEW_W = 400;
const CHART_VIEW_H = 121;
const LATENCY_MS_MAX = 150;

function latencyToChartY(ms: number) {
  return CHART_VIEW_H - (ms / LATENCY_MS_MAX) * CHART_VIEW_H;
}

function buildLatencyPaths(series: readonly number[]) {
  const n = series.length;
  if (n < 2) return { lineD: "", areaD: "" };
  const pts = series.map((ms, i) => ({
    x: (i / (n - 1)) * CHART_VIEW_W,
    y: latencyToChartY(ms),
  }));
  let lineD = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    lineD += ` L ${pts[i].x} ${pts[i].y}`;
  }
  const areaD = `M 0 ${CHART_VIEW_H} L ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} L ${CHART_VIEW_W} ${CHART_VIEW_H} Z`;
  return { lineD, areaD };
}

function LatencyTrendChartArea({ accelerated }: { accelerated: boolean }) {
  const reduceMotion = useReducedMotion();
  const safeId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const redPaths = buildLatencyPaths(LATENCY_SERIES);
  const greenPaths = buildLatencyPaths(LATENCY_OPTIMIZED_SERIES);
  const reveal = {
    duration: reduceMotion ? 0 : ANALYSIS_STATUS_FULL_CYCLE_MS / 1000,
    ease: [0.33, 1, 0.68, 1] as const,
  };
  const greenReveal = {
    duration: reduceMotion ? 0 : Math.round((1000 / 1.5)) / 1000,
    ease: [0.33, 1, 0.68, 1] as const,
  };

  const clipShown = { clipPath: "inset(0 0% 0 0)" };
  const clipHidden = { clipPath: "inset(0 100% 0 0)" };

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        initial={reduceMotion ? clipShown : clipHidden}
        animate={clipShown}
        transition={reveal}
      >
        <svg
          className="block h-full w-full"
          viewBox={`0 0 ${CHART_VIEW_W} ${CHART_VIEW_H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`latency-area-fill-${safeId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F04438" stopOpacity="0.38" />
              <stop offset="55%" stopColor="#F04438" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#F04438" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={redPaths.areaD} fill={`url(#latency-area-fill-${safeId})`} />
          <path
            d={redPaths.lineD}
            fill="none"
            stroke="#F04438"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </motion.div>
      {accelerated ? (
        <motion.div
          key="latency-green"
          className="pointer-events-none absolute inset-0 z-[2]"
          initial={reduceMotion ? clipShown : clipHidden}
          animate={clipShown}
          transition={greenReveal}
        >
          <svg
            className="block h-full w-full"
            viewBox={`0 0 ${CHART_VIEW_W} ${CHART_VIEW_H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={`latency-opt-fill-${safeId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12B76A" stopOpacity="0.35" />
                <stop offset="55%" stopColor="#12B76A" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#12B76A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={greenPaths.areaD} fill={`url(#latency-opt-fill-${safeId})`} />
            <path
              d={greenPaths.lineD}
              fill="none"
              stroke="#12B76A"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>
      ) : null}
    </>
  );
}

function LatencyTrendCard({
  embedded,
  analysisComplete,
  accelerated,
  optimizedPingMs,
}: {
  embedded?: boolean;
  /** When true, Base Latency shows the measured value (after chart / status cycle). */
  analysisComplete?: boolean;
  accelerated?: boolean;
  optimizedPingMs?: number;
}) {
  const ticks = ["150", "100", "50", "0"] as const;

  return (
    <div
      className={clsx(
        "flex w-full flex-col gap-5",
        embedded
          ? "h-full min-h-0 overflow-auto border-0 bg-transparent px-4 py-5 lg:h-auto lg:overflow-visible"
          : " rounded-xl border border-[#EAECF0] bg-white p-5",
      )}
    >
      <h3 className="pl-2 font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-6 text-[#101828]">
        Latency Trend
      </h3>

      <div className="flex gap-2">
        <div className="flex h-[120.92px] shrink-0 flex-col justify-between py-0.5 text-right font-[family-name:var(--font-inter)] text-[10px] font-semibold leading-3 text-[#475467]">
          {ticks.map((t) => (
            <span key={t} className="block w-7">
              {t}
            </span>
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          <div className="flex h-[120.92px] flex-col justify-between py-0.5">
            {ticks.map((t) => (
              <div key={t} className="flex w-full items-center gap-1.5">
                <div className="h-px flex-1 bg-[#F2F4F7]" />
              </div>
            ))}
          </div>
          <LatencyTrendChartArea accelerated={Boolean(accelerated)} />
        </div>
      </div>

      <div className="grid w-full grid-cols-2 ">
        <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium leading-6 text-[#475467]">
          Base Latency
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium leading-6 text-[#475467]">
          Optimized Latency
        </span>
        <span
          className={clsx(
            "font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-5",
            analysisComplete ? "text-[#F04438]" : "text-[#101828]",
          )}
        >
          {analysisComplete ? PING_TEST_BASE_LATENCY_LABEL : "0ms"}
        </span>
        <span
          className={clsx(
            "font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-5",
            analysisComplete && accelerated ? "text-[#039855]" : "text-[#101828]",
          )}
        >
          {analysisComplete && accelerated ? `${Math.round(optimizedPingMs ?? 0)}ms` : "0ms"}
        </span>
      </div>
    </div>
  );
}

function ConnectionInfoCard({ embedded }: { embedded?: boolean }) {
  return (
    <div
      className={clsx(
        "flex w-full flex-col",
        embedded ? "h-full min-h-0 gap-5 overflow-auto border-0 bg-transparent px-4 py-5" : "gap-5 rounded-xl border border-[#EAECF0] bg-white p-5",
      )}
    >
      <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-6 text-[#101828]">
        Connection info
      </h3>
      <div className="flex flex-col gap-3">
        {CONNECTION_ROWS.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <div className="relative size-5 shrink-0">
              <Image src={row.icon} alt="" fill className="object-contain" sizes="20px" />
            </div>
            <span className="min-w-0 flex-1 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-6 text-[#475467]">
              {row.label}
            </span>
            <span className="shrink-0 text-right font-[family-name:var(--font-inter)] text-[14px] font-medium leading-6 text-[#101828]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TEST_CIRCLE_OUTLINE = "/assets/test-circle.png";
/** Red segmented outline when ping result is poor (place file in `public/assets`). */
const TEST_CIRCLE_OUTLINE_BAD = "/assets/test-circle-bad.png";
/** Green segmented outline after HyperUp acceleration (place file in `public/assets`). */
const TEST_CIRCLE_OUTLINE_GOOD = "/assets/test-circle-good.png";
/** Gradient ring around right game tile after ping result (HyperUp «after» state). */
const TEST_ICON_COLOR_OUTLINE = "/assets/test-i-color.png";
const TESTING_LINE_PNG = "/assets/testing-line.png";
const TESTING_LINE2_PNG = "/assets/testing-line2.png";
/** Vertical connector for stacked (mobile) ping-test layout. */
const TESTING_LINE_VERTICAL_SVG = "/assets/testing-line-vertical.svg";

/** Figma frame `2609726`: diagram + cards in one 654×575 canvas. */
const FIG = { w: 654, h: 575 } as const;
const pctX = (px: number) => `${(px / FIG.w) * 100}%`;
const pctY = (px: number) => `${(px / FIG.h) * 100}%`;

function CentralPingPillContent({ variant }: { variant: "testing" | "bad" | "good" }) {
  const word = variant === "bad" ? "Bad" : variant === "good" ? "Good" : "Testing";
  const stagger = Math.round((0.12 / 1.5) * 100) / 100;
  const leftChevrons = 2;
  const gradientText =
    "inline-block bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] bg-clip-text text-transparent";
  const badText = "font-[family-name:var(--font-inter)] font-semibold text-[#F04438]";
  const goodText = "font-[family-name:var(--font-inter)] font-semibold text-[#039855]";
  const outlineSrc =
    variant === "good"
      ? TEST_CIRCLE_OUTLINE_GOOD
      : variant === "bad"
        ? TEST_CIRCLE_OUTLINE_BAD
        : TEST_CIRCLE_OUTLINE;
  const dotTransition = {
    duration: Math.round((1.05 / 1.5) * 100) / 100,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Image
        src={outlineSrc}
        alt=""
        fill
        sizes="214px"
        className="pointer-events-none object-contain select-none"
        priority={false}
      />
      {variant === "bad" ? (
        <span
          className={clsx(
            badText,
            "relative z-10 flex h-full w-full items-center justify-between px-3 text-[17px] leading-6 sm:px-5 sm:text-[20px] sm:leading-6",
          )}
          aria-label="Bad ping"
        >
          <span className="inline-flex shrink-0 items-center leading-none tracking-tight" aria-hidden>
            {[0, 1].map((i) => (
              <span key={`bad-l-${i}`} className="inline-block text-[1.05em]">
                {">"}
              </span>
            ))}
          </span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap tracking-tight">
            {word}
          </span>
          <span className="inline-flex shrink-0 items-center leading-none tracking-tight" aria-hidden>
            {[0, 1].map((i) => (
              <span key={`bad-r-${i}`} className="inline-block text-[1.05em]">
                {"<"}
              </span>
            ))}
          </span>
        </span>
      ) : variant === "good" ? (
        <span
          className={clsx(
            goodText,
            "relative z-10 flex h-full w-full items-center justify-between px-3 text-[17px] leading-6 sm:px-5 sm:text-[20px] sm:leading-6",
          )}
          aria-label="Good ping"
        >
          <span className="inline-flex shrink-0 items-center leading-none tracking-tight" aria-hidden>
            {[0, 1].map((i) => (
              <span key={`good-l-${i}`} className="inline-block text-[1.05em]">
                {">"}
              </span>
            ))}
          </span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap tracking-tight">
            {word}
          </span>
          <span className="inline-flex shrink-0 items-center leading-none tracking-tight" aria-hidden>
            {[0, 1].map((i) => (
              <span key={`good-r-${i}`} className="inline-block text-[1.05em]">
                {"<"}
              </span>
            ))}
          </span>
        </span>
      ) : (
        <span
          className="relative z-10 inline-flex items-center justify-center gap-1.5 font-[family-name:var(--font-inter)] text-[17px] font-semibold leading-6 sm:gap-2 sm:text-[20px] sm:leading-6"
          aria-label="Testing, loading"
        >
          <span className="inline-flex items-center leading-none tracking-tight" aria-hidden>
            {[0, 1].map((i) => (
              <motion.span
                key={`chev-l-${i}`}
                className={clsx(gradientText, "text-[1.05em]")}
                animate={{ opacity: [0.22, 1, 0.22] }}
                transition={{
                  ...dotTransition,
                  delay: i * stagger,
                }}
              >
                {">"}
              </motion.span>
            ))}
          </span>

          <span className="inline-flex items-baseline" aria-hidden>
            {word.split("").map((ch, i) => (
              <motion.span
                key={`t-${i}`}
                className={clsx(gradientText, "inline-block")}
                animate={{ opacity: [0.22, 1, 0.22] }}
                transition={{
                  ...dotTransition,
                  delay: (leftChevrons + i) * stagger,
                }}
              >
                {ch}
              </motion.span>
            ))}
            <span className="inline-flex translate-y-[1px]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className={gradientText}
                  animate={{ opacity: [0.22, 1, 0.22] }}
                  transition={{
                    ...dotTransition,
                    delay: (leftChevrons + word.length + i) * stagger,
                  }}
                >
                  .
                </motion.span>
              ))}
            </span>
          </span>

          <span className="inline-flex items-center leading-none tracking-tight" aria-hidden>
            {[0, 1].map((i) => (
              <motion.span
                key={`chev-r-${i}`}
                className={clsx(gradientText, "text-[1.05em]")}
                animate={{ opacity: [0.22, 1, 0.22] }}
                transition={{
                  ...dotTransition,
                  delay: (leftChevrons + word.length + 3 + i) * stagger,
                }}
              >
                {"<"}
              </motion.span>
            ))}
          </span>
        </span>
      )}
    </div>
  );
}

/** Figma: 214×143 @ left 218 top 84 — «High ping detected» + HyperUp row + toggle. */

/** 12 game icons in HyperUp Pro banner: 4×3 column-major, ~171×171 cluster (Figma stagger). */
const BANNER_CLUSTER_ICON_PX = 37;
const BANNER_CLUSTER_GAP_X = 7;
const BANNER_CLUSTER_GAP_Y = 8;
/** Third column highest on screen; first column lowest; cols 2 & 4 aligned between. */
const BANNER_CLUSTER_COL_Y_OFFSET = [36, 18, 0, 18] as const;

/** Vertical nudge for entire game cluster (Upgrade plan banner). */
const BANNER_CLUSTER_TOP_NUDGE = 10;

function hyperUpProBannerIconSlot(col: number, row: number): { left: number; top: number } {
  const left = col * (BANNER_CLUSTER_ICON_PX + BANNER_CLUSTER_GAP_X);
  const top =
    BANNER_CLUSTER_TOP_NUDGE +
    row * (BANNER_CLUSTER_ICON_PX + BANNER_CLUSTER_GAP_Y) +
    BANNER_CLUSTER_COL_Y_OFFSET[col]!;
  return { left, top };
}

const HYPER_UP_PRO_BANNER_ICON_SLOTS: ReadonlyArray<{ left: number; top: number }> = Array.from(
  { length: 12 },
  (_, i) => hyperUpProBannerIconSlot(Math.floor(i / 3), i % 3),
);

/** Full-width HyperUp Pro upsell — same reveal as Bad / 122ms (after analysis cycle). */
function HyperUpProMetricBanner() {
  const icons = PING_TEST_GAMES.slice(0, 12);

  return (
    <div className="relative isolate box-border flex min-h-[168px] w-full flex-col items-start gap-5 rounded-xl border border-[#EAECF0] bg-white px-4 py-5 sm:pr-[200px]">
      <div className="relative z-[0] flex max-w-full flex-col gap-2 sm:max-w-[420px]">
        <h3 className="font-[family-name:var(--font-inter)] text-[24px] font-semibold leading-8 text-[#101828]">
          HyperUp <span className="text-[#7F56D9]">Pro</span>
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-6 text-[#475467]">
          Get up to <span className="font-semibold text-[#101828]">70%</span> lower ping with HyperUp Pro
        </p>
      </div>

      <Link
        href="/account/billing"
        className="relative z-[3] inline-flex h-11 w-[140px] shrink-0 items-center justify-center rounded-lg bg-[#7F56D9] px-4 font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-6 text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#6941C6]"
      >
        Upgrade plan
      </Link>

      <div
        className="pointer-events-none absolute right-4 top-1/2 z-[4] hidden h-[182px] w-[171px] -translate-y-1/2 sm:block"
        aria-hidden
      >
        {icons.map((game, i) => {
          const slot = HYPER_UP_PRO_BANNER_ICON_SLOTS[i];
          if (!slot) return null;
          return (
            <div
              key={`${game.icon}-${i}`}
              className="absolute overflow-hidden rounded-[12px] shadow-[0_1px_2px_rgba(16,24,40,0.08)]"
              style={{
                left: slot.left,
                top: slot.top,
                width: BANNER_CLUSTER_ICON_PX,
                height: BANNER_CLUSTER_ICON_PX,
              }}
            >
              <Image src={game.icon} alt="" fill className="object-cover" sizes="37px" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HighPingHyperUpPromoCard({
  accelerationEnabled,
  onAccelerationToggle,
  layout = "canvas",
}: {
  accelerationEnabled: boolean;
  onAccelerationToggle: () => void;
  /** `canvas`: absolute slot on desktop diagram. `stack`: full-width card in mobile column. */
  layout?: "canvas" | "stack";
}) {
  const isStack = layout === "stack";

  return (
    <div
      className={clsx(
        "isolate box-border flex flex-col items-center overflow-visible border border-[#EAECF0] bg-[#FFFFFF]",
        isStack
          ? "relative z-[12] h-[127px] w-[214px] shrink-0 gap-2 rounded-t-[24px] rounded-b-[8px] p-3 -mb-[35px]"
          : "absolute top-[17%] z-[16] min-h-0 justify-center gap-3 rounded-t-[24px] rounded-b-lg p-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)]",
      )}
      style={
        isStack
          ? undefined
          : {
              left: pctX(218),
              width: pctX(214),
              height: pctY(143),
            }
      }
    >
      <p
        className={clsx(
          "shrink-0 text-center font-[family-name:var(--font-inter)] text-[12px] font-normal leading-[150%] text-[#475467]",
          isStack ? "flex h-[36px] w-[198px] items-center justify-center" : "max-w-[198px]",
        )}
      >
        High ping detected. Optimize your network with HyperUp
      </p>
      <div
        className={clsx(
          "flex shrink-0 flex-row items-center",
          isStack ? "h-6 w-[177px] gap-3" : "w-full min-w-0 flex-wrap justify-between gap-3",
        )}
      >
        <div className={clsx("flex shrink-0 flex-row items-center gap-1", isStack ? "h-6 w-[129px]" : "min-w-0")}>
          <div className="relative size-[22.63px] shrink-0 -rotate-90">
            <Image src="/assets/logo-symbol-sm.svg" alt="" fill className="object-contain" sizes="23px" />
          </div>
          <div className="relative h-[17px] w-[102.54px] shrink-0">
            <Image src="/assets/logo-text-sm.svg" alt="" fill className="object-contain object-left" sizes="103px" />
          </div>
        </div>
        <div className="flex shrink-0 flex-row items-center">
          <button
            type="button"
            onClick={onAccelerationToggle}
            className={clsx(
              "relative flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-0 p-[2px] shadow-none outline-none transition-colors",
              accelerationEnabled ? "justify-end bg-[#7F56D9]" : "justify-start bg-[#D0D5DD]",
            )}
            aria-label="HyperUp optimization"
            aria-pressed={accelerationEnabled}
          >
            <span className="block size-4 rounded-full bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]" />
          </button>
        </div>
      </div>

      {!accelerationEnabled && !isStack ? (
        <div className="pointer-events-none absolute left-[90%] top-[83%] z-[5] -translate-x-5 -translate-y-1/2 sm:-translate-x-7">
          <HeroArrowLottie />
        </div>
      ) : null}
    </div>
  );
}

function PingTestDiagramCanvas({ game }: { game: PingTestGame }) {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [accelerationOn, setAccelerationOn] = useState(false);
  const [optimizedPingDisplay, setOptimizedPingDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  /**
   * Scan restarts only when: another game is selected (parent `key`), user returns to this
   * browser tab (`visibilitychange`), full page reload, or navigating away from /account/ping-test
   * and back (layout remount). No in-place “rescan” control.
   */
  const scanTimerRef = useRef<number | null>(null);
  const scheduleAnalysisComplete = useCallback(() => {
    if (scanTimerRef.current != null) window.clearTimeout(scanTimerRef.current);
    scanTimerRef.current = window.setTimeout(() => {
      setAnalysisComplete(true);
      scanTimerRef.current = null;
    }, ANALYSIS_STATUS_FULL_CYCLE_MS);
  }, []);

  const resetScan = useCallback(() => {
    if (scanTimerRef.current != null) {
      window.clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    setAnalysisComplete(false);
    setAccelerationOn(false);
    setOptimizedPingDisplay(0);
    scheduleAnalysisComplete();
  }, [scheduleAnalysisComplete]);

  useEffect(() => {
    scheduleAnalysisComplete();
    return () => {
      if (scanTimerRef.current != null) {
        window.clearTimeout(scanTimerRef.current);
        scanTimerRef.current = null;
      }
    };
  }, [scheduleAnalysisComplete]);

  const tabWasHiddenRef = useRef(false);
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        tabWasHiddenRef.current = true;
        return;
      }
      if (tabWasHiddenRef.current) {
        tabWasHiddenRef.current = false;
        resetScan();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [resetScan]);

  useEffect(() => {
    if (!accelerationOn) return;
    if (reduceMotion) {
      setOptimizedPingDisplay(PING_OPTIMIZED_TARGET_MS);
      return;
    }
    let raf = 0;
    const duration = Math.round(1200 / 1.5);
    const start = performance.now();
    const from = 0;
    const to = PING_OPTIMIZED_TARGET_MS;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setOptimizedPingDisplay(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setOptimizedPingDisplay(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [accelerationOn, reduceMotion]);

  const handleAccelerationToggle = () => {
    setAccelerationOn((prev) => {
      if (prev) {
        setOptimizedPingDisplay(0);
        return false;
      }
      setOptimizedPingDisplay(0);
      return true;
    });
  };

  return (
    <div className="relative mx-auto mt-0 w-full max-w-[335px] [-webkit-overflow-scrolling:touch] lg:mt-8 lg:h-stretch lg:max-w-[700px]">
      {/* Mobile: flex-col stack, vertical SVG spine + testing-line2 arcs between pill and icons */}
      <div className="relative mx-auto w-full max-w-[335px] lg:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-3 -translate-x-1/2 opacity-40">
          <Image
            src={TESTING_LINE_VERTICAL_SVG}
            alt=""
            fill
            sizes="12px"
            className="object-fill object-center"
            unoptimized
          />
        </div>
        <div className="relative z-[1] flex w-full flex-col items-center gap-0 pb-2">
          {!analysisComplete ? (
            <PingAnalysisStatusBadge />
          ) : (
            <HighPingHyperUpPromoCard
              layout="stack"
              accelerationEnabled={accelerationOn}
              onAccelerationToggle={handleAccelerationToggle}
            />
          )}

          <div
            className={clsx(
              "relative z-[15] flex w-full max-w-[214px] flex-col items-center",
              analysisComplete ? "mt-0" : "mt-4",
            )}
          >
            {analysisComplete && !accelerationOn ? (
              <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] origin-center scale-[1.35]">
                <div
                  className="absolute inset-0 rounded-[9999px]"
                  style={{
                    background:
                      "radial-gradient(ellipse 72% 88% at 50% 50%, rgba(240,68,56,0.22) 0%, rgba(240,68,56,0.07) 48%, transparent 72%)",
                  }}
                />
              </div>
            ) : null}
            {analysisComplete && accelerationOn ? (
              <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] origin-center scale-[1.35]">
                <div
                  className="absolute inset-0 rounded-[9999px]"
                  style={{
                    background:
                      "radial-gradient(ellipse 72% 88% at 50% 50%, rgba(18,183,106,0.2) 0%, rgba(18,183,106,0.06) 48%, transparent 72%)",
                  }}
                />
              </div>
            ) : null}
            <div className="relative z-[20] flex h-[87px] w-full items-center">
              <div
                aria-hidden
                className={clsx(
                  "pointer-events-none absolute inset-0 z-[1] rounded-[9999px]",
                  analysisComplete
                    ? accelerationOn
                      ? "bg-[#ECFDF3]"
                      : "bg-[#FEF3F2]"
                    : "bg-[#FCFCFD]",
                )}
              />
              <div className="relative z-[2] h-full w-full">
                <CentralPingPillContent
                  variant={
                    accelerationOn ? "good" : analysisComplete ? "bad" : "testing"
                  }
                />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[16%] z-[5] h-[114px] w-full opacity-40 flex flex-row justify-center">
            <div className="absolute left-[62%] top-[-10px] h-full w-[123px] min-h-0 -translate-x-[100px]">
              <Image
                src={TESTING_LINE2_PNG}
                alt=""
                fill
                className="object-contain object-bottom object-left"
                sizes="123px"
              />
            </div>
            <div className="absolute left-[2%] top-[-10px] h-full w-[123px] min-h-0 scale-x-[-1] translate-x-[100px]">
              <Image
                src={TESTING_LINE2_PNG}
                alt=""
                fill
                className="object-contain object-bottom object-left"
                sizes="123px"
              />
            </div>
          </div>

          <div className="relative z-[10] mt-6 flex w-full max-w-[335px] flex-row flex-nowrap justify-between">
            <div className="flex w-[120px] shrink-0 flex-col items-center gap-1">
              <GamePingIconTile
                src={game.icon}
                className="size-[120px]"
                desaturated={analysisComplete}
              />
              <p
                className={clsx(
                  "w-full text-center font-[family-name:var(--font-inter)] text-[20px] font-semibold leading-6",
                  analysisComplete ? "text-[#F04438]" : "text-[#101828]",
                )}
              >
                {analysisComplete ? PING_TEST_BASE_LATENCY_LABEL : "0"}
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-6 text-[#475467]">
                Before
              </p>
            </div>
            <div className="flex w-[120px] shrink-0 flex-col items-center gap-1">
              <div className="relative size-[120px] shrink-0">
                <GamePingIconTile src={game.icon} className="h-full w-full" />
                {analysisComplete ? (
                  <Image
                    src={TEST_ICON_COLOR_OUTLINE}
                    alt=""
                    fill
                    sizes="120px"
                    className="pointer-events-none z-[1] origin-center scale-[1.07] object-contain select-none"
                  />
                ) : null}
              </div>
              <p
                className={clsx(
                  "w-full text-center font-[family-name:var(--font-inter)] text-[20px] font-semibold leading-6",
                  analysisComplete && accelerationOn ? "text-[#039855]" : "text-[#101828]",
                )}
              >
                {!analysisComplete
                  ? "0"
                  : accelerationOn
                    ? `${Math.round(optimizedPingDisplay)}ms`
                    : "0"}
              </p>
              <p className="text-center font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-6 text-[#475467]">
                After <span className="text-[#7F56D9]">HyperUp</span>
              </p>
            </div>
          </div>

          <div className="relative z-[10] mt-[50px] flex w-full flex-col gap-6">
            <div className="w-full overflow-hidden rounded-xl border border-[#EAECF0] bg-white">
              <LatencyTrendCard
                embedded
                analysisComplete={analysisComplete}
                accelerated={accelerationOn}
                optimizedPingMs={optimizedPingDisplay}
              />
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-[#EAECF0] bg-white">
              <ConnectionInfoCard embedded />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden aspect-[654/575] w-full min-w-[300px] max-w-[700px] lg:block">
        <div className="absolute inset-0">
          {/* testing-line.png: под иконками/пилюлей — только z-index, без clip-path / overflow */}
          <div
            className="pointer-events-none absolute z-[1] opacity-[0.4]"
            style={{
              left: pctX(125),
              top: pctY(114),
              width: pctX(280),
              height: pctY(200),
            }}
          >
            <Image
              src={TESTING_LINE_PNG}
              alt=""
              fill
              className="object-contain object-left-top"
              sizes="280px"
            />
          </div>
          <div
            className="pointer-events-none absolute z-[1] scale-x-[-1] opacity-[0.4]"
            style={{
              right: pctX(125),
              top: pctY(114),
              width: pctX(280),
              height: pctY(200),
            }}
          >
            <Image
              src={TESTING_LINE_PNG}
              alt=""
              fill
              className="object-contain object-left-top"
              sizes="280px"
            />
          </div>

          {/* testing-line2.png: нижние дуги — позиции как в инспекторе */}
          <div
            className="pointer-events-none absolute z-[1] opacity-[0.4]"
            style={{
              left: "32%",
              bottom: "27%",
              width: "42%",
              height: "35%",
            }}
          >
            <Image
              src={TESTING_LINE2_PNG}
              alt=""
              fill
              className="object-contain object-left object-bottom"
              sizes="274px"
            />
          </div>
          <div
            className="pointer-events-none absolute z-[1] scale-x-[-1] opacity-[0.4]"
            style={{
              right: "35%",
              bottom: "28%",
              width: "42%",
              height: "35%",
            }}
          >
            <Image
              src={TESTING_LINE2_PNG}
              alt=""
              fill
              className="object-contain object-left object-bottom"
              sizes="274px"
            />
          </div>

          {/* Analysis status: rotating badge until cycle ends, then HyperUp promo */}
          {!analysisComplete ? (
            <div
              className="absolute left-1/2 z-[12] flex -translate-x-1/2 justify-center"
              style={{ top: pctY(132), marginLeft: "-2px" }}
            >
              <PingAnalysisStatusBadge />
            </div>
          ) : (
            <HighPingHyperUpPromoCard
              accelerationEnabled={accelerationOn}
              onAccelerationToggle={handleAccelerationToggle}
            />
          )}

          {/* Left icon — «Before»: приглушение после завершения цикла */}
          <div
            className="absolute z-[5]"
            style={{ left: pctX(0), top: pctY(0), width: pctX(170), height: pctY(170) }}
          >
            <GamePingIconTile src={game.icon} className="h-full w-full" desaturated={analysisComplete} />
          </div>

          {/* Left metrics — Figma left 30, top 191 */}
          <div
            className="absolute z-[5] flex w-[16.82%] flex-col items-center gap-1 text-center"
            style={{ left: pctX(30), top: pctY(191) }}
          >
            <p
              className={clsx(
                "w-full font-[family-name:var(--font-inter)] text-2xl font-semibold leading-7",
                analysisComplete ? "text-[#F04438]" : "text-[#101828]",
              )}
            >
              {analysisComplete ? PING_TEST_BASE_LATENCY_LABEL : "0"}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-6 text-[#475467]">Before</p>
          </div>

          {/* Ореол под пилюлей: красный (Bad) или зелёный (Good) — z ниже плашки HyperUp */}
          {analysisComplete && !accelerationOn ? (
            <div
              aria-hidden
              className="pointer-events-none absolute z-[14] origin-center scale-[1.56]"
              style={{
                left: pctX(218),
                top: "37%",
                width: pctX(214),
                height: pctY(87),
              }}
            >
              <div
                className="absolute inset-0 rounded-[9999px]"
                style={{
                  background:
                    "radial-gradient(ellipse 72% 88% at 50% 50%, rgba(240,68,56,0.22) 0%, rgba(240,68,56,0.07) 48%, transparent 72%)",
                }}
              />
            </div>
          ) : null}
          {analysisComplete && accelerationOn ? (
            <div
              aria-hidden
              className="pointer-events-none absolute z-[14] origin-center scale-[1.56]"
              style={{
                left: pctX(218),
                top: "37%",
                width: pctX(214),
                height: pctY(87),
              }}
            >
              <div
                className="absolute inset-0 rounded-[9999px]"
                style={{
                  background:
                    "radial-gradient(ellipse 72% 88% at 50% 50%, rgba(18,183,106,0.2) 0%, rgba(18,183,106,0.06) 48%, transparent 72%)",
                }}
              />
            </div>
          ) : null}

          {/* Center pill — контент Bad выше плашки HyperUp (z-20) */}
          <div
            className="absolute z-[20]"
            style={{
              left: pctX(218),
              top: "37%",
              width: pctX(214),
              height: pctY(87),
            }}
          >
            <div
              aria-hidden
              className={clsx(
                "pointer-events-none absolute inset-0 z-[1] rounded-[9999px]",
                analysisComplete
                  ? accelerationOn
                    ? "bg-[#ECFDF3]"
                    : "bg-[#FEF3F2]"
                  : "bg-[#FCFCFD]",
              )}
            />
            <div className="relative z-[2] h-full w-full">
              <CentralPingPillContent
                variant={
                  accelerationOn ? "good" : analysisComplete ? "bad" : "testing"
                }
              />
            </div>
          </div>

          {/* Right icon — цветная обводка после завершения анализа (как макет After HyperUp) */}
          <div
            className="absolute z-[5]"
            style={{
              left: pctX(484),
              top: pctY(0),
              width: pctX(170),
              height: pctY(170),
            }}
          >
            <GamePingIconTile src={game.icon} className="h-full w-full" />
            {analysisComplete ? (
              <Image
                src={TEST_ICON_COLOR_OUTLINE}
                alt=""
                fill
                sizes="170px"
                className="pointer-events-none z-[1] origin-center scale-[1.07] object-contain select-none"
              />
            ) : null}
          </div>

          {/* Right metrics — Figma left 520, top 186, width 98 */}
          <div
            className="absolute z-[5] flex w-[14.98%] flex-col items-center gap-1 text-center"
            style={{ left: pctX(520), top: pctY(186) }}
          >
            <p
              className={clsx(
                "w-full font-[family-name:var(--font-inter)] text-2xl font-semibold leading-7",
                analysisComplete && accelerationOn ? "text-[#039855]" : "text-[#101828]",
              )}
            >
              {!analysisComplete
                ? "0"
                : accelerationOn
                  ? `${Math.round(optimizedPingDisplay)}ms`
                  : "0"}
            </p>
            <p className="text-center font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-6 text-[#475467]">
              After <span className="text-[#7F56D9]">HyperUp</span>
            </p>
          </div>

          {/* Latency card — Figma max width 269px, top 56% */}
          <div
            className="absolute z-[5] max-w-[269px] overflow-hidden rounded-xl border border-[#EAECF0] bg-white"
            style={{
              left: pctX(0),
              top: "56%",
              width: pctX(269),
            }}
          >
            <LatencyTrendCard
              embedded
              analysisComplete={analysisComplete}
              accelerated={accelerationOn}
              optimizedPingMs={optimizedPingDisplay}
            />
          </div>

          {/* Connection card — Figma max width 269px, top 56% */}
          <div
            className="absolute z-[5] max-w-[269px] overflow-hidden rounded-xl border border-[#EAECF0] bg-white"
            style={{
              left: pctX(380),
              top: "56%",
              width: pctX(269),
              height: pctY(216),
            }}
          >
            <ConnectionInfoCard embedded />
          </div>
        </div>
      </div>

      {analysisComplete ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : Math.round((0.35 / 1.5) * 100) / 100,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="mt-8 w-full"
        >
          <HyperUpProMetricBanner />
        </motion.div>
      ) : null}
    </div>
  );
}

function PingTestDetailView({ game, onBack }: { game: PingTestGame; onBack: () => void }) {
  return (
    <div className="relative z-[2] flex min-h-0 min-w-0 w-full flex-1 flex-col">
      <div className="mb-6 w-full shrink-0 px-4 pt-[50px] sm:px-6 lg:px-6">
        <AccountBackButton onClick={onBack} />
      </div>

      <div
        className={clsx(
          "relative z-[2] mx-auto flex min-h-0 w-full max-w-[335px] flex-1 flex-col pb-44 sm:px-0 sm:pb-52 lg:max-w-[700px] lg:px-0",
        )}
      >
        <header className="flex w-full flex-col gap-1 items-start text-left lg:items-center lg:text-center">
          <h1 className="w-full font-[family-name:var(--font-inter)] text-[30px] font-semibold leading-[38px] text-[#101828]">
            {game.label} ping test
          </h1>
          <p className="max-w-[560px] font-[family-name:var(--font-inter)] text-[16px] font-normal leading-6 text-[#475467]">
            One click to get game ping without launching game client
          </p>
        </header>

        <div className="relative mt-4 w-full flex-1 lg:mt-8 lg:max-w-[700px]">
          <PingTestDiagramCanvas key={`${game.icon}::${game.label}`} game={game} />
        </div>
      </div>
    </div>
  );
}

export function AccountPingTestView() {
  const [activeGame, setActiveGame] = useState<PingTestGame | null>(null);

  if (activeGame) {
    return <PingTestDetailView game={activeGame} onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className="relative isolate z-[2] mx-auto flex w-full max-w-[700px] flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-6 lg:gap-10 lg:px-12 lg:pb-16 lg:pt-12">
      <header className="relative w-full">
        <div className="flex w-full flex-row items-start gap-4 sm:gap-6 md:gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-row flex-wrap items-center gap-3">
              <div className="relative h-[58px] w-[61px] shrink-0" aria-hidden>
                <Image
                  src="/assets/ping-test-title.png"
                  alt=""
                  width={61}
                  height={58}
                  className="h-full w-full object-contain object-left"
                  sizes="61px"
                  priority
                />
              </div>
              <h1 className="font-[family-name:var(--font-inter)] text-[30px] font-semibold leading-[38px] text-[#101828]">
                Ping test
              </h1>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-6 text-[#475467]">
              Set your current ping to game servers
            </p>
          </div>
          <div
            className="relative h-[102px] w-[132px] shrink-0 sm:h-[132px] sm:w-[170px] md:h-[146px] md:w-[190px]"
            aria-hidden
          >
            <Image
              src="/assets/ping-test-img.png"
              alt=""
              width={190}
              height={146}
              className="h-full w-full object-contain object-right"
              sizes="(min-width: 768px) 190px, (min-width: 640px) 170px, 132px"
            />
          </div>
        </div>
        <p
          className="mt-4 w-full font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px] tracking-[0] text-[#475467] [leading-trim:none]"
        >
          Choose a game below to start a ping test
        </p>
      </header>

      <section className="flex w-full flex-col gap-6">
        <h2 className="sr-only">Select a game</h2>
        <ul className="m-0 grid w-full list-none grid-cols-2 gap-3 p-0 sm:gap-6 lg:grid-cols-3">
          {PING_TEST_GAMES.map((game) => (
            <li key={game.icon + game.label} className="min-w-0">
              <button
                type="button"
                onClick={() => setActiveGame(game)}
                className="flex w-full flex-col items-center gap-2 rounded-xl border border-[#EAECF0] bg-white p-3 text-center shadow-none transition-[border-color,box-shadow] duration-150 hover:border-[#D6BBFB] hover:shadow-[0px_4px_6px_-2px_#10182808,0px_12px_16px_-4px_#10182814] sm:gap-3 sm:p-4"
              >
                <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[44px] sm:size-[130px]">
                  <Image
                    src={game.icon}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 130px, 110px"
                  />
                </div>
                <span className="min-w-0 font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-snug text-[#101828] sm:text-[16px] sm:leading-6">
                  {game.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
