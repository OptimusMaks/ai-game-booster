import Image from "next/image";

export default function PingSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-[44px] md:pb-[64px] md:pt-[0px] md:pb-[96px]">
      {/* Left pattern */}
      <div className="absolute left-[-70px] top-0 h-[232px] w-[170px] md:left-0 md:h-[408px] md:w-[298px]">
        <Image
          src="/assets/line-pattern.svg"
          alt="line pattern"
          fill
          className="object-contain"
        />
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-[44px] md:gap-[64px]">
        {/* Heading */}
        <div className="flex max-w-[768px] flex-col items-center text-center gap-[20px] px-[16px] md:px-[80px]">
          <h2 className="font-[family-name:var(--font-sf-pro-rounded)] text-[32px] font-semibold leading-[40px] tracking-[-1.2px] md:text-[36px] md:leading-[44px]">
            <span className="text-[#101828]">Watch </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(178deg, #43CBFF 0%, #9708CC 100%)",
              }}
            >
              Ping Drop
            </span>
            <br />
            <span className="text-[#101828]">in Your Favorite Games</span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#475467] md:text-[20px] md:leading-[30px]">
            HyperUp optimizes routes for 200+ mobile games. Here&apos;s what
            <br className="block" />
            real players see after one tap.
          </p>
        </div>

        {/* Ping comparison */}
        <div className="relative h-[92px] w-[100%] max-w-[340px] md:h-[154px] md:w-[553px] md:max-w-none px-[16px] md:px-[80px]">
          <Image
            src="/assets/ping-union.svg"
            alt=""
            fill
            className="object-contain"
          />

          <div className="absolute left-[16px] top-[16px] flex flex-col md:left-[18px] md:top-[23px]">
            <span className="font-[family-name:var(--font-sf-pro-rounded)] text-[36px] font-semibold leading-[44px] tracking-[-0.72px] text-[#f04438] md:text-[60px] md:leading-[72px] md:tracking-[-1.2px]">
              ~110ms
            </span>
            <span className="font-[family-name:var(--font-inter)] text-center text-[12px] font-medium leading-[18px] text-[#f04438] md:text-[16px] md:leading-[24px]">
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

        {/* Phones */}
        <div className="relative h-[298px] w-full overflow-hidden md:h-[512px]">
          {/* Right pattern */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-[232px] w-[170px] md:right-[60px] md:top-[70px] md:h-[408px] md:w-[298px]">
            <Image
              src="/assets/line-pattern.svg"
              alt="line pattern"
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute left-1/2 top-0 h-full w-[335px] -translate-x-1/2 md:w-[760px]">
            {/* Left phone */}
            <div className="absolute left-[0px] top-[-20px] z-10 h-[470px] w-[164.33px] md:left-[120px] md:top-[80px] md:h-[618px] md:w-[284px]">
              <div className="absolute inset-0 z-10 overflow-hidden rounded-[30px] md:rounded-[40px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="h-full w-full object-contain"
                >
                  <source
                    src="/assets/ping-screen-lag.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>

            {/* Right phone */}
            <div className="absolute left-[150px] top-[-60px] z-20 h-[470px] w-[164.33px] md:left-[360px] md:top-[20px] md:h-[618px] md:w-[284px]">
              <div className="absolute inset-0 z-10 overflow-hidden rounded-[40px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="h-full w-full object-contain"
                >
                  <source
                    src="/assets/ping-screen-smooth.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
