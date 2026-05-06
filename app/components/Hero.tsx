import Image from "next/image";
import HeroArrowLottie from "./HeroArrowLottie";
import Link from "next/link";

function BackgroundGridPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[1440px] w-[1920px] -translate-x-1/2 opacity-[0.3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/bg-grid-vertical.svg"
          alt=""
          className="absolute inset-0 h-full w-full"
          role="presentation"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/bg-grid-horizontal.svg"
          alt=""
          className="absolute inset-0 h-full w-full"
          role="presentation"
        />
      </div>
    </div>
  );
}

type GalleryItem =
  | { type: "game"; src: string }
  | {
      type: "badge";
      icon: string;
      title: [string, string];
      iconClassName?: string;
    };

const columns: GalleryItem[][] = [
  [
    { type: "game", src: "/assets/game-01.png" },
    { type: "game", src: "/assets/game-05.png" },
    {
      type: "badge",
      icon: "/assets/gemini-servers.png",
      title: ["Worldwide", "Servers"],
    },
    { type: "game", src: "/assets/game-04.png" },
  ],
  [
    { type: "game", src: "/assets/game-02.png" },
    { type: "game", src: "/assets/game-06.png" },
    { type: "game", src: "/assets/game-11.png" },
    { type: "game", src: "/assets/game-12.png" },
  ],
  [
    { type: "game", src: "/assets/game-03.png" },
    {
      type: "badge",
      icon: "/assets/gemini-stable-fps.png",
      title: ["Stable", "FPS"],
      iconClassName: "w-[85px] h-[70px]",
    },
    { type: "game", src: "/assets/game-13.png" },
    { type: "game", src: "/assets/game-07.png" },
  ],
  [
    { type: "game", src: "/assets/game-08.png" },
    { type: "game", src: "/assets/game-10.png" },
    {
      type: "badge",
      icon: "/assets/gemini-latency.png",
      title: ["Lower", "Latency"],
    },
    { type: "game", src: "/assets/game-09.png" },
  ],
];

function SectionFadeOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[120px] bg-gradient-to-b from-white via-white/90 to-transparent md:h-[160px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[120px] bg-gradient-to-t from-white via-white/90 to-transparent md:h-[160px]" />
    </>
  );
}

function GameCard({ src }: { src: string }) {
  return (
    <div className="relative h-[94px] w-[94px] shrink-0 overflow-hidden rounded-[30px] md:h-[130px] md:w-[130px] md:rounded-[42px]">
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

function BadgeCard({
  icon,
  title,
  iconClassName = "w-[54px] h-[46px] md:w-[75px] md:h-[62px]",
}: {
  icon: string;
  title: [string, string];
  iconClassName?: string;
}) {
  return (
    <div className="flex h-[94px] w-[94px] shrink-0 flex-col items-center justify-center rounded-[30px] border border-[#EAECF0] bg-white md:h-[130px] md:w-[130px] md:rounded-[42px]">
      <div className={`relative ${iconClassName}`}>
        <Image
          src={icon}
          alt={`${title[0]} ${title[1]}`}
          fill
          className="object-contain"
        />
      </div>

      <span className="mt-[2px] text-center text-[10px] font-semibold leading-[14px] tracking-[-0.2px] text-black md:mt-[4px] md:text-[12px] md:leading-[normal] md:tracking-[-0.24px]">
        {title[0]}
        <br />
        {title[1]}
      </span>
    </div>
  );
}

function GalleryCell({ item }: { item: GalleryItem }) {
  if (item.type === "game") {
    return <GameCard src={item.src} />;
  }

  return (
    <BadgeCard
      icon={item.icon}
      title={item.title}
      iconClassName={item.iconClassName}
    />
  );
}

function GalleryColumn({
  items,
  reverse = false,
  duration = 22,
  mobile = false,
}: {
  items: GalleryItem[];
  reverse?: boolean;
  duration?: number;
  mobile?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${
        mobile ? "h-[620px] w-[94px]" : "h-[860px] w-[130px]"
      }`}
    >
      <div
        className={`flex flex-col ${mobile ? "gap-[18px]" : "gap-[26px]"} ${
          reverse ? "animate-gallery-up" : "animate-gallery-down"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, index) => (
          <GalleryCell key={`${item.type}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function DesktopHero() {
  return (
    <section className="relative hidden w-full px-[80px] pb-[96px] pt-[96px] md:block">
      <BackgroundGridPattern />

      <div className="relative mx-auto flex max-w-[1280px] items-start gap-[32px]">
        <div className="flex w-[626px] shrink-0 flex-col gap-[48px]">
          <div className="flex flex-col gap-[24px]">
            <h1 className="font-[family-name:var(--font-sf-pro-rounded)] text-[60px] font-semibold leading-[72px] tracking-[-1.2px]">
              <span className="text-[#101828]">Cut your ping and </span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(167deg, #43CBFF 0%, #9708CC 100%)",
                }}
              >
                Play Smoother
              </span>
            </h1>

            <p className="font-[family-name:var(--font-inter)] text-[20px] font-normal leading-[30px] text-[#475467]">
              HyperUp is the fastest way to lower ping, kill packet loss,
              <br />
              and stabilize your mobile games — powered by AI routing.
            </p>
          </div>

          <div className="relative w-fit">
            <Link
              href="/quiz"
              className="
                inline-flex items-center justify-center
                gap-[10px] rounded-[8px] bg-[#7F56D9] px-[24px] py-[16px] text-white
                shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)]
                transition-[transform,background-color,box-shadow] duration-150 ease-out
                hover:bg-[#6941C6]
                hover:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.65)]
                active:translate-y-[3px]
                active:bg-[#6941C6]
                active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_rgba(34,10,85,0.65)]
              "
            >
              <span className="font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px]">
                Get Started
              </span>

              <div className="relative h-[24px] w-[24px] rotate-90">
                <Image src="/assets/chevron-right.svg" alt="" fill />
              </div>
            </Link>

            <div className="pointer-events-none absolute left-[calc(100%-3px)] top-[30px] h-[42px] w-[71px]">
              <HeroArrowLottie />
            </div>
          </div>
        </div>

        {/* Gallery - diamond-rotated game icons grid */}
        <div className="relative h-[592px] w-[600px] shrink-0">
          <div className="absolute inset-0 overflow-hidden">
            <SectionFadeOverlay />

            <div className="absolute left-0 top-[-120px] flex gap-[26px]">
              <GalleryColumn items={columns[0]} duration={24} />
              <GalleryColumn items={columns[1]} reverse duration={22} />
              <GalleryColumn items={columns[2]} duration={26} />
              <GalleryColumn items={columns[3]} reverse duration={23} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHero() {
  return (
    <section className="relative w-full pb-[44px] md:hidden">
      <BackgroundGridPattern />

      <div className="relative">
        <div className="relative h-[382px] w-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <SectionFadeOverlay />

            <div className="absolute left-1/2 top-[-40px] flex -translate-x-1/2 gap-[18px]">
              <GalleryColumn items={columns[0]} duration={24} mobile />
              <GalleryColumn items={columns[1]} reverse duration={22} mobile />
              <GalleryColumn items={columns[2]} duration={26} mobile />
              <GalleryColumn items={columns[3]} reverse duration={23} mobile />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-[44px] flex flex-col gap-[32px] px-[16px]">
          <div className="flex flex-col gap-[20px]">
            <h1 className="font-[family-name:var(--font-sf-pro-rounded)] text-[44px] font-semibold leading-[56px] tracking-[-1.2px]">
              <span className="text-[#101828]">Cut your ping and</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(167deg, #43CBFF 0%, #9708CC 100%)",
                }}
              >
                Play Smoother
              </span>
            </h1>

            <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467]">
              HyperUp is the fastest way to lower ping, kill packet loss, and
              stabilize your mobile games — powered by AI routing.
            </p>
          </div>

          <Link
            href="/quiz"
            className="
              inline-flex w-fit items-center justify-center gap-[10px]
              rounded-[8px] bg-[#7F56D9] px-[24px] py-[16px] text-white
              shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_rgba(34,10,85,0.5)]
              transition-[transform,background-color,box-shadow] duration-150 ease-out
              active:translate-y-[3px]
            "
          >
            <span className="font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px]">
              Get Started
            </span>

            <div className="relative h-[24px] w-[24px] rotate-90">
              <Image src="/assets/chevron-right.svg" alt="" fill />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  );
}
