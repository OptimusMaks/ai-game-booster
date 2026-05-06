"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ASIDE_NAV_ICONS } from "./aside-nav-icons";

function ChevronNavIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogOutIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AsideDownloadIcon() {
  const src = ASIDE_NAV_ICONS.download;
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <DownloadIcon className="text-white" />;
  }
  return (
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      className="size-6 shrink-0 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M8 10.667V2M8 10.667L5.333 8M8 10.667L10.667 8M2.667 12.667V13.333C2.667 13.687 2.807 14.026 3.057 14.276C3.307 14.526 3.646 14.667 4 14.667H12C12.354 14.667 12.693 14.526 12.943 14.276C13.193 14.026 13.333 13.687 13.333 13.333V12.667"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AsideNavIcon({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <span className="size-2.5 shrink-0 rounded-full bg-[#D0D5DD]" aria-hidden />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local asset may be missing until export; onError fallback
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      className="size-6 shrink-0 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

function NavRow({
  href,
  active,
  label,
  showChevron,
  iconSrc,
  onNavigate,
}: {
  href: string;
  active?: boolean;
  label: string;
  showChevron?: boolean;
  iconSrc?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={clsx(
        "flex h-10 w-full items-center gap-3 rounded-md px-4 text-[16px] leading-6 transition-colors",
        active
          ? "bg-[#F9F5FF] font-semibold text-[#7F56D9]"
          : "font-medium text-[#344054] hover:bg-[#F9FAFB]",
      )}
    >
      {iconSrc ? (
        <AsideNavIcon src={iconSrc} />
      ) : (
        <span className="size-2.5 shrink-0 rounded-full bg-[#D0D5DD]" aria-hidden />
      )}
      <span className="min-w-0 flex-1 text-left">{label}</span>
      {showChevron ? (
        <ChevronNavIcon className="shrink-0 text-[#98A2B3]" />
      ) : (
        <span className="size-5 shrink-0" aria-hidden />
      )}
    </Link>
  );
}

export function AccountNavPanel({
  accountEmail,
  onLogout,
  onNavAction,
  onOpenDownloadApp,
  tone = "desktop",
  onDrawerClose,
}: {
  accountEmail: string;
  onLogout: () => void;
  onNavAction?: () => void;
  /** Opens the download QR modal (e.g. from account layout). */
  onOpenDownloadApp?: () => void;
  tone?: "desktop" | "mobile";
  onDrawerClose?: () => void;
}) {
  const pathname = usePathname();
  const footerMuted = tone === "mobile" ? "text-[#101828]" : "text-[#475467]";

  const isAccountHome = pathname === "/account" || pathname === "/account/";
  const isBilling = pathname.startsWith("/account/billing");
  const isPingTest = pathname.startsWith("/account/ping-test");
  const isLegal = pathname.startsWith("/account/legal");
  const isContact = pathname.startsWith("/account/contact");

  const logoBlock = (
    <Link
      href="/"
      onClick={onNavAction}
      className={clsx(
        "flex min-w-0 items-center gap-2",
        onDrawerClose ? "flex-1 px-0" : "mb-8 px-2",
      )}
      aria-label="HyperUp home"
    >
      <div className="relative h-8 w-8 shrink-0 -rotate-90">
        <Image src="/assets/logo-symbol.svg" alt="" fill className="object-contain" />
      </div>
      <div className="relative h-6 w-[129px] shrink-0">
        <Image src="/assets/logo-text.svg" alt="HyperUp" fill className="object-contain" />
      </div>
    </Link>
  );

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-6 pt-8 lg:px-4 lg:pt-10">
        {onDrawerClose ? (
          <div className="mb-8 flex items-center justify-between gap-3">
            {logoBlock}
            <button
              type="button"
              onClick={onDrawerClose}
              className="flex size-6 shrink-0 items-center justify-center text-[#101828]"
              aria-label="Close menu"
            >
              <Image src="/assets/close-icon.svg" alt="" width={24} height={24} />
            </button>
          </div>
        ) : (
          logoBlock
        )}

        <nav className="flex flex-col gap-1" aria-label="Account navigation">
          <button
            type="button"
            onClick={() => {
              onOpenDownloadApp?.();
              onNavAction?.();
            }}
            className="mb-2 flex h-11 w-full items-center justify-start gap-2 rounded-lg bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] px-4 text-[16px] font-semibold leading-6 text-white transition hover:opacity-95"
          >
            <span className="flex size-6 items-center justify-center rounded-lg bg-white/20">
              <AsideDownloadIcon />
            </span>
            Download app
          </button>

          <NavRow
            href="/account"
            active={isAccountHome}
            label="Account"
            showChevron={isBilling || isPingTest || isContact || isLegal}
            iconSrc={isAccountHome ? ASIDE_NAV_ICONS.account : ASIDE_NAV_ICONS.accountInactive}
            onNavigate={onNavAction}
          />
          <NavRow
            href="/account/billing"
            active={isBilling}
            label="Billing"
            showChevron={isAccountHome || isPingTest || isContact || isLegal}
            iconSrc={isBilling ? ASIDE_NAV_ICONS.billing : ASIDE_NAV_ICONS.billingInactive}
            onNavigate={onNavAction}
          />
          <NavRow
            href="/account/ping-test"
            active={isPingTest}
            label="Ping test"
            showChevron={isAccountHome || isBilling || isLegal || isContact}
            iconSrc={ASIDE_NAV_ICONS.pingTest}
            onNavigate={onNavAction}
          />
          <NavRow
            href="/account/legal"
            active={isLegal}
            label="Legal"
            showChevron={isAccountHome || isBilling || isPingTest || isContact}
            iconSrc={isLegal ? ASIDE_NAV_ICONS.legalActive : ASIDE_NAV_ICONS.legal}
            onNavigate={onNavAction}
          />
          <NavRow
            href="/account/contact"
            active={isContact}
            label="Contact us"
            showChevron={isAccountHome || isBilling || isPingTest || isLegal}
            iconSrc={ASIDE_NAV_ICONS.contact}
            onNavigate={onNavAction}
          />
        </nav>
      </div>

      <div className="mt-auto border-t border-[#EAECF0] px-4 py-6">
        <div className="flex items-start justify-between gap-3 rounded-lg px-2 py-2">
          <div className="min-w-0">
            <p className={clsx("text-[14px] font-normal leading-5", footerMuted)}>Signed in as</p>
            <p className={clsx("truncate text-[14px] font-semibold leading-5", footerMuted)}>
              {accountEmail}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onNavAction?.();
              onLogout();
            }}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#344054] transition hover:bg-[#F9FAFB]"
            aria-label="Log out"
          >
            <LogOutIcon />
          </button>
        </div>
      </div>
    </>
  );
}
