"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

function HeaderLogoLink({
  onActivate,
}: {
  /** e.g. close mobile menu after handling home / scroll */
  onActivate?: () => void;
}) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onActivate?.();
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex shrink-0 items-center gap-[4px]"
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
  );
}

function DesktopHeader() {
  return (
    <header className="hidden h-[80px] w-full py-[18px] px-[16px] md:px-[80px] md:block">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between">
        <HeaderLogoLink />

        <div className="flex items-center gap-[12px]">
          <Link
            href="/login"
            className="rounded-[8px] px-[16px] py-[10px] text-[16px] font-semibold leading-[24px] text-[#475467] hover:bg-[#F9FAFB] transition-[background-color] duration-150 ease-out"
          >
            Log in
          </Link>

          <Link
            href="/quiz"
            className="rounded-[8px] bg-linear-to-b from-white to-[#7342D9] p-[2px] shadow-sm"
          >
            <span className="block rounded-[8px] bg-[#7342D9] px-6 py-2 text-[16px] font-semibold leading-[24px] text-white">
              Get Started
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleScrollToSection = (id: string) => {
    onClose();

    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 50);
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-300 md:hidden ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-[64px] items-center justify-between border-b border-[#D0D5DD] px-[16px]">
          <HeaderLogoLink onActivate={onClose} />

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-[40px] w-[40px] items-center justify-center"
          >
            <div className="relative h-[24px] w-[24px]">
              <Image
                src="/assets/close-icon.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>

        <div className="flex flex-1 flex-col px-[16px] py-[24px]">
          <div className="flex flex-col items-center gap-[12px]">
            <button
              type="button"
              onClick={() => handleScrollToSection("reviews")}
              className="font-[family-name:var(--font-sf-pro-rounded)] text-[20px] font-semibold leading-[40px] text-[#101828] w-full"
            >
              Reviews
            </button>

            <button
              type="button"
              onClick={() => handleScrollToSection("faq")}
              className="font-[family-name:var(--font-sf-pro-rounded)] text-[20px] font-semibold leading-[40px] text-[#101828] w-full"
            >
              FAQ
            </button>
          </div>

          <div className="mt-[12px] flex flex-col gap-[12px]">
            <Link
              href="/login"
              onClick={() => onClose()}
              className="inline-flex w-full items-center justify-center rounded-[8px] bg-[#F0F1F1] px-[24px] py-[18px] text-[#475467]"
            >
              <span className="font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[24px]">
                Log in
              </span>
            </Link>
            <Link
              href="/quiz"
              onClick={() => onClose()}
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
          </div>

          <div className="mt-auto flex flex-col items-center gap-[32px] py-[44px]">
            <div className="flex items-center justify-center gap-[24px]">
              <Link
                href="/privacy"
                onClick={onClose}
                className="font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px] text-[#475467]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                onClick={onClose}
                className="font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px] text-[#475467]"
              >
                Terms
              </Link>

              <Link
                href="#pricing"
                onClick={onClose}
                className="font-[family-name:var(--font-inter)] text-[18px] font-semibold leading-[28px] text-[#475467]"
              >
                Pricing
              </Link>
            </div>

            <span className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[24px] text-[#667085]">
              © 2026 All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileHeader({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="flex h-[64px] w-full items-center justify-between border-b border-[#D0D5DD] px-5 py-4 md:hidden">
      <HeaderLogoLink />

      <button
        type="button"
        onClick={onOpen}
        aria-label="Open menu"
        className="flex h-[40px] w-[40px] items-center justify-center"
      >
        <div className="relative h-[24px] w-[24px]">
          <Image
            src="/assets/menu-icon.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </button>
    </header>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);
  return (
    <>
      <MobileHeader onOpen={() => setIsMobileMenuOpen(true)} />
      <DesktopHeader />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
