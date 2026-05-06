import Image from "next/image";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="w-full bg-white px-[16px] py-[44px] md:px-[80px] md:pb-[96px] md:pt-0">
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-[32px] overflow-hidden rounded-[16px] bg-[#7342d9] p-[20px] text-center md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-y-[32px] md:p-[64px] md:text-left">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <Image
            src="/assets/dots-bg-pattern.svg"
            alt=""
            fill
            className="object-cover md:object-center"
          />
        </div>

        <div className="relative z-10 flex w-full max-w-[768px] flex-col items-center gap-[16px] md:min-w-[480px] md:flex-1 md:items-start">
          <h2 className="font-[family-name:var(--font-sf-pro-rounded)] text-[30px] font-semibold leading-[38px] text-white">
            No Disconnects. No
            <br className="md:hidden" />
            Lag. Just Crisp,
            <br className="md:hidden" />
            {" "}Seamless Gameplay
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#E9D7FE] md:text-[20px] md:leading-[30px]">
            Every match — a new record. HeperUp
            <br className="md:hidden" />
            learns from your sessions
            <br className="md:hidden" />
            {" "}and gets faster every day.
          </p>
        </div>

        <Link
          href="/quiz"
          className="
            relative z-10 inline-flex items-center justify-center
            gap-[10px] rounded-[8px] bg-white px-[24px] py-[16px]
            text-[#101828]
            shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_#D0D0D0]
            transition-[transform,background-color,box-shadow] duration-150 ease-out
            hover:bg-[#DCDCDC]
            hover:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_-3px_0_0_#B4B4B4]
            active:translate-y-[3px]
            active:bg-[#DCDCDC]
            active:shadow-[0px_1px_2px_rgba(16,24,40,0.05),inset_0_0_0_0_#B4B4B4]
          "
        >
          <span className="font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px]">
            Get Started
          </span>

          <div className="relative h-[24px] w-[24px] rotate-90">
            <Image src="/assets/chevron-cta.svg" alt="" fill />
          </div>
        </Link>
      </div>
    </section>
  );
}
