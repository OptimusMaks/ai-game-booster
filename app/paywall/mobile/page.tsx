import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import PaywallMobileHeader from "../components/PaywallMobileHeader";
import PaywallMobileFaq from "./components/PaywallMobileFaq";
import PaywallMobilePlans from "./components/PaywallMobilePlans";

function HeadingAndPing() {
  return (
    <div className="w-[375px] px-[20px] py-[44px] flex flex-col items-start gap-[32px]">
      <p className="mx-auto flex h-[168px] w-[335px] flex-col justify-center text-center font-[family-name:var(--font-sf-pro-rounded)] text-[44px] font-semibold leading-[56px] tracking-[-0.02em] text-[#101828]">
        <span className="block">Dominate the</span>
        <span className="block">Lobby with</span>
        <span className="block text-[#7F56D9]">Zero Lag!</span>
      </p>

      <div className="relative w-[335px] h-[93.594px]">
        <Image
          src="/assets/paywall-mobile/ping-union.png"
          alt=""
          fill
          className="object-contain"
        />

        <div className="absolute left-[10.9px] top-[13.93px] w-[125.398px] flex flex-col items-center gap-[7.269px] text-center">
          <div className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[36.347px] leading-[43.617px] tracking-[-0.7269px] text-[#F04438]">
            ~110ms
          </div>
          <div className="font-[family-name:var(--font-inter)] font-semibold text-[14px] leading-[14.539px] text-[#F04438]">
            Before
          </div>
        </div>

        <div className="absolute left-[198.7px] top-[13.93px] w-[125.398px] flex flex-col items-center gap-[7.269px] text-center">
          <div className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[36.347px] leading-[43.617px] tracking-[-0.7269px] text-[#17B26A]">
            ~45ms
          </div>
          <div className="font-[family-name:var(--font-inter)] font-semibold text-[14px] leading-[14.539px] text-[#17B26A]">
            After HyperUp
          </div>
        </div>
      </div>
    </div>
  );
}

function MoneyBackGuarantee() {
  return (
    <div className="w-[375px] px-[20px] py-[44px]">
      <div className="relative w-[335px] h-[314px] mx-auto">
        <div className="absolute left-0 top-[66.512px] w-[335px] rounded-[24px] bg-[#F6FEF9] px-[24px] pt-[60px] pb-[24px] flex flex-col items-center gap-[20px]">
          <p className="font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[#101828] text-[24px] leading-[32px] text-center">
            Money-Back Guarantee
          </p>
          <p className="text-[#475467] text-[16px] leading-[1.4] text-center font-[family-name:var(--font-inter)]">
            If you are not satisfied with our service we are ready to offer a full
            refund within 30 days of your initial purchase or before the end of
            your first subscription period. Additional{" "}
            <Link href="/terms" className="underline">
              Terms &amp; Conditions
            </Link>{" "}
            apply.
          </p>

          <div className="absolute left-1/2 -translate-x-1/2 top-[-68.504px] w-[100px] h-[112px]">
            <div className="absolute left-[-0.43px] top-[51.04px] w-[51.133px] h-[61.564px] rotate-[30deg]">
              <Image
                src="/assets/paywall-mobile/guarantee-left.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute left-[49.57px] top-[51.04px] w-[51.133px] h-[61.564px] rotate-[150deg] scale-y-[-1]">
              <Image
                src="/assets/paywall-mobile/guarantee-right.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute left-[0.066px] top-[-1.464px] w-[100px] h-[100px]">
              <Image
                src="/assets/paywall-mobile/guarantee-star.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-[29.536px] text-white text-center font-[family-name:var(--font-sf-pro-rounded)] font-bold text-[16px] leading-[normal]">
              <div>30</div>
              <div>DAYS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaywallMobilePage() {
  return (
    <div className="w-full bg-white flex justify-center">
      <div className="w-[375px]">
        <PaywallMobileHeader alwaysShow />
        <HeadingAndPing />

        <div className="w-[375px] px-[20px] py-[44px] flex justify-center">
          <PaywallMobilePlans />
        </div>

        {/* Remaining sections (supported games, iPhone, features, testimonials, etc.)
            are present in the Figma node but will be added next with the rest of
            the exported assets for strict 1:1 parity. */}

        <MoneyBackGuarantee />

        <div className="w-[375px] px-[20px] py-[44px] flex justify-center">
          <PaywallMobileFaq />
        </div>

        <Footer />
      </div>
    </div>
  );
}

