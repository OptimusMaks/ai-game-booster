import Image from "next/image";

import SupportedGamesArrowLottie from "./SupportedGamesArrowLottie";

/** Same `/assets/game-*.png` as the desktop `Hero` gallery (game tiles only, no badges). */
const SUPPORTED_GAME_ICONS = [
  "/assets/game-01.png",
  "/assets/game-05.png",
  "/assets/game-04.png",
  "/assets/game-02.png",
  "/assets/game-06.png",
  "/assets/game-11.png",
  "/assets/game-12.png",
  "/assets/game-03.png",
  "/assets/game-13.png",
  "/assets/game-07.png",
  "/assets/game-08.png",
  "/assets/game-10.png",
] as const;

/** Three 44×44 circles, 12px overlap, 2px white border — Figma frame `342:14425`. Swap JPGs for PNG exports of ellipses `342:14426`–`342:14428` for exact match. */
const SOCIAL_PROOF_FACE_IMAGES = [
  "/assets/paywall/social-proof-face-1.jpg",
  "/assets/paywall/social-proof-face-2.jpg",
  "/assets/paywall/social-proof-face-3.jpg",
] as const;

export default function SupportedGames() {
  return (
    <div className="mx-auto flex w-full max-w-[335px] flex-col items-center gap-[28px] md:w-[600px] md:max-w-[600px] md:gap-[32px]">
      {/* Mobile: стрелка absolute у «Games» */}
      <div className="flex w-full justify-center overflow-visible px-0 md:hidden">
        <div className="relative inline-block overflow-visible text-center">
          <h2 className="m-0 font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[#101828] text-[32px] leading-[40px] tracking-[-0.02em]">
            Supported <span className="inline-block">Games</span>
          </h2>
          <span
            className="pointer-events-none absolute -right-[60px] top-[-12px] z-10"
            aria-hidden
          >
            <SupportedGamesArrowLottie />
          </span>
        </div>
      </div>

      {/* Desktop: стрелка absolute справа от заголовка (как на мобилке по подходу, без flex-gap между текстом и стрелкой) */}
      <div className="hidden w-full max-w-[600px] justify-center overflow-visible px-2 md:flex">
        <div className="relative inline-block overflow-visible">
          <h2 className="m-0 whitespace-nowrap text-center font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[#101828] text-[36px] leading-[44px] tracking-[-0.72px]">
            Supported Games
          </h2>
          <span
            className="pointer-events-none absolute left-full top-0 z-10 ml-3"
            aria-hidden
          >
            <SupportedGamesArrowLottie />
          </span>
        </div>
      </div>

      <div
        className="w-full rounded-[20px] border border-[#E9D7FE] px-4 py-4 md:rounded-[24px] md:px-[24px] md:py-[20px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(67, 203, 255, 0.25) 0%, rgba(151, 8, 204, 0.25) 100%)",
        }}
      >
        <div
          className="grid w-full grid-cols-3 justify-items-center gap-x-3 gap-y-3 md:grid-cols-6 md:gap-x-[12px] md:gap-y-[16px]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        >
          {SUPPORTED_GAME_ICONS.map((src) => (
            <div
              key={src}
              className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-[14px] border border-white/60 shadow-sm md:rounded-[16px]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="74px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[335px] flex-col items-center gap-[12px] md:max-w-none md:w-fit md:flex-row md:items-center md:gap-[12px]">
        <div className="flex h-[44px] shrink-0 items-center md:h-[52px]" aria-hidden>
          {SOCIAL_PROOF_FACE_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`relative h-[44px] w-[44px] shrink-0 overflow-hidden rounded-full border-[2px] border-white bg-[#F2F4F7] shadow-sm ${i > 0 ? "-ml-[12px]" : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="min-w-0 text-center font-[family-name:var(--font-inter)] text-[16px] leading-[25.6px] md:text-left">
          <p className="m-0">
            <span className="font-semibold text-[#101828]">143</span>
            <span className="font-normal text-[#475467]">
              {" people purchased premium"}
            </span>
            <br />
            <span className="font-normal text-[#475467]">Booster plan </span>
            <span className="font-semibold text-[#7F56D9]">in the last hour</span>
          </p>
        </div>
      </div>
    </div>
  );
}
