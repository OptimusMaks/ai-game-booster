import Image from "next/image";

import { MARQUEE_LAG_GAME_ICONS } from "@/lib/marqueeLagGameIcons";

const duplicatedBlocks = [...MARQUEE_LAG_GAME_ICONS, ...MARQUEE_LAG_GAME_ICONS];

function GameBlock({ src }: { src: string }) {
  return (
    <div className="relative h-[52px] w-[156px] shrink-0">
      <div className="absolute left-[6px] top-0 h-[52px] w-[52px] overflow-hidden rounded-[12px]">
        <Image
          src={src}
          alt=""
          fill
          sizes="104px"
          className="z-0 object-cover [clip-path:inset(50%_0_0_0)]"
        />
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
}

export default function PopularGames() {
  return (
    <section className="w-full bg-white py-[44px] md:py-[96px]">
      <div className="flex flex-col items-center gap-[44px]">
        <div className="max-w-[1280px] mx-auto px-[32px]">
          <h2 className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold tracking-[-1.2px] text-[36px] text-center leading-[44px]">
            <span className="text-[#101828]">Worldwide </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(178deg, #43CBFF 0%, #9708CC 100%)",
              }}
            >
              popular games
            </span>
            <span className="text-[#101828]"> included</span>
          </h2>
        </div>
        <div className="w-full overflow-x-hidden">
          <div className="flex w-max gap-[64px] animate-marquee">
            {duplicatedBlocks.map((src, i) => (
              <GameBlock key={`${src}-${i}`} src={src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
