import Image from "next/image";
import Link from "next/link";

const linkClass =
  "text-[16px] font-normal leading-[24px] text-[#475467] transition-colors hover:text-[#101828]";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col bg-white px-5 py-11 md:px-[80px] md:py-[48px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        {/* Top: logo + link columns — mobile Figma: left-aligned, 32px between sections */}
        <div className="flex w-full flex-col items-start gap-8 md:flex-row md:justify-between md:gap-[100px]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1 md:gap-[3px]"
            aria-label="HyperUp home"
          >
            <div className="relative h-8 w-8 shrink-0 -rotate-90 md:hidden">
              <Image
                src="/assets/logo-symbol.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="relative hidden h-[24px] w-[24px] shrink-0 -rotate-90 md:block">
              <Image
                src="/assets/logo-symbol-sm.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-6 w-[145px] shrink-0 md:hidden">
              <Image
                src="/assets/logo-text.svg"
                alt="HyperUp"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative hidden h-[18px] w-[109px] shrink-0 md:block">
              <Image
                src="/assets/logo-text-sm.svg"
                alt="HyperUp"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex w-full flex-col items-start gap-8 md:w-auto md:flex-row md:justify-end md:gap-[100px]">
            <nav
              className="flex w-full flex-col items-start gap-2 md:max-w-[250px]"
              aria-label="Company"
            >
              <p className="text-[16px] font-semibold leading-[24px] text-[#667085]">
                Company
              </p>
              <Link href="/contact" className={linkClass}>
                Contact us
              </Link>
              <a
                href="mailto:support@hyperup.gg"
                className={`${linkClass} underline underline-offset-2`}
              >
                support@hyperup.gg
              </a>
            </nav>

            <nav
              className="flex w-full flex-col items-start gap-2 md:max-w-[250px]"
              aria-label="Legal"
            >
              <p className="text-[16px] font-semibold leading-[24px] text-[#667085]">
                Legal
              </p>
              <Link href="/privacy" className={linkClass}>
                Privacy policy
              </Link>
              <Link href="/terms" className={linkClass}>
                Terms of use
              </Link>
              <Link href="/money-back" className={linkClass}>
                Money-back policy
              </Link>
              <Link href="/subscription" className={linkClass}>
                Subscription Terms
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom: divider — mobile Figma: copyright 205px box text-right, then address 24px gap */}
        <div className="flex w-full flex-col gap-6 border-t border-[#EAECF0] py-6 md:flex-row md:items-start md:justify-between md:gap-4">
          <p className="w-full max-w-[205px] text-right text-[16px] font-normal leading-[24px] text-[#667085] md:max-w-none md:text-left">
            © 2026 All rights reserved.
          </p>
          <p className="w-full max-w-[335px] text-left text-[16px] font-normal leading-[24px] text-[#475467] md:max-w-none md:text-right">
            A-Z Tech Ventures Ltd&nbsp;&nbsp;|&nbsp;&nbsp;63 St. Mary Axe London, England, EC3A 8AA
          </p>
        </div>
      </div>
    </footer>
  );
}
