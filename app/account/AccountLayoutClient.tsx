"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useQuizStore } from "@/stores/quiz-store";
import { AccountAreaProvider, useAccountArea } from "./AccountAreaContext";
import { ASIDE_NAV_ICONS } from "./aside-nav-icons";
import { AccountNavPanel } from "./AccountNavPanel";
import { DownloadAppModal } from "./DownloadAppModal";

/** Decorative art at bottom of account card (Figma). */
const ACCOUNT_CARD_DECORATION = "/assets/account-card-decoration.png";

/** Legal tab bottom illustration (`public/assets/legal-btm.png`). */
const LEGAL_BOTTOM_ILLUSTRATION = "/assets/legal-btm.png";

const BILLING_ILLUSTRATION_FILE = "Gemini_Generated_Image_tnarrvtnarrvtnar 1.png";

/** Bottom illustration on account Contact page (Figma). */
const CONTACT_PAGE_ILLUSTRATION = "/assets/contact-uss.png";

function AccountLayoutInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accountEmail } = useAccountArea();
  const setAuthenticated = useQuizStore((s) => s.setAuthenticated);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [downloadAppModalOpen, setDownloadAppModalOpen] = useState(false);

  const isBilling = pathname.startsWith("/account/billing");
  const isPingTest = pathname.startsWith("/account/ping-test");
  const isContact = pathname.startsWith("/account/contact");
  const isLegal = pathname.startsWith("/account/legal");

  const handleLogout = () => {
    setAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const billingIllustrationSrc = `/assets/${encodeURIComponent(BILLING_ILLUSTRATION_FILE)}`;

  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      <aside className="hidden min-h-screen w-full shrink-0 flex-col border-b border-[#EAECF0] lg:flex lg:w-[270px] lg:border-b-0 lg:border-r">
        <AccountNavPanel
          accountEmail={accountEmail}
          onLogout={handleLogout}
          onOpenDownloadApp={() => setDownloadAppModalOpen(true)}
        />
      </aside>

      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col lg:p-4 lg:pl-0 lg:pr-6 lg:pt-4 lg:pb-6">
        <header className="relative z-40 flex h-16 w-full shrink-0 items-center justify-center border-b border-[#D0D5DD] bg-white px-5 lg:hidden">
          <button
            type="button"
            className="absolute left-5 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center p-2"
            aria-expanded={mobileNavOpen}
            aria-controls="account-mobile-nav"
            onClick={() => setMobileNavOpen(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG from public */}
            <img
              src={ASIDE_NAV_ICONS.menuBurger}
              alt=""
              width={24}
              height={24}
              className="block"
            />
          </button>
          <Link href="/" className="flex items-center gap-2" aria-label="HyperUp home">
            <div className="relative h-8 w-8 shrink-0 -rotate-90">
              <Image src="/assets/logo-symbol.svg" alt="" fill className="object-contain" />
            </div>
            <div className="relative h-6 w-[129px] shrink-0">
              <Image src="/assets/logo-text.svg" alt="HyperUp" fill className="object-contain" />
            </div>
          </Link>
        </header>

        <div className="flex min-h-0 flex-1 flex-col p-0">
          <div
            className={clsx(
              "relative flex min-h-[calc(100vh-2rem)] flex-1 flex-col overflow-hidden rounded-none border-0 bg-[#FCFCFD] max-lg:min-h-[calc(100dvh-8rem)] lg:min-h-[calc(100vh-3rem)] lg:rounded-[32px] lg:border lg:border-[#EAECF0]",
              (isBilling || isContact || isPingTest) && "isolate",
            )}
          >
            <div
              className="pointer-events-none absolute -left-[20%] -top-[18%] hidden h-[480px] w-[620px] rounded-full bg-[#9E77ED] opacity-[0.22] blur-[100px] lg:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-[10%] top-[5%] hidden h-[420px] w-[560px] rounded-full bg-[#43CBFF] opacity-[0.2] blur-[100px] lg:block"
              aria-hidden
            />

            {isBilling ? (
              <>
                <div
                  className="pointer-events-none absolute -left-[28%] -top-[6%] z-0 h-[min(309px,55vh)] w-[min(143px,38vw)] rotate-[30deg] rounded-full bg-[#9E77ED] opacity-[0.15] blur-[32px] lg:hidden"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-[8%] -top-[5%] z-0 h-[min(307px,52vh)] w-[min(142px,40vw)] -rotate-[60deg] rounded-full bg-[#43CBFF] opacity-[0.15] blur-[32px] lg:hidden"
                  aria-hidden
                />
              </>
            ) : null}

            {isBilling ? (
              <>
                <div
                  className="pointer-events-none absolute bottom-6 left-1/2 z-[1] w-[min(145px,40vw)] max-w-[145px] -translate-x-1/2 select-none lg:hidden"
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- filename contains spaces */}
                  <img
                    src={billingIllustrationSrc}
                    alt=""
                    width={145}
                    height={180}
                    className="h-auto w-full object-contain opacity-95"
                  />
                </div>
                <div
                  className="pointer-events-none absolute bottom-0 right-[200px] z-[1] hidden max-w-[45%] select-none lg:block lg:max-w-none"
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- filename contains spaces; avoid optimizer edge cases */}
                  <img
                    src={billingIllustrationSrc}
                    alt=""
                    width={212}
                    height={263}
                    className="h-auto w-[min(212px,42vw)] max-w-[212px] object-contain object-bottom-right opacity-95"
                  />
                </div>
              </>
            ) : isContact ? (
              <div
                className="pointer-events-none absolute bottom-4 left-1/2 z-[1] w-[min(100%,520px)] max-w-[700px] -translate-x-1/2 select-none lg:bottom-8 lg:left-1/2 lg:w-[min(700px,calc(100%-3rem))]"
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local PNG asset */}
                <img
                  src={CONTACT_PAGE_ILLUSTRATION}
                  alt=""
                  width={700}
                  height={280}
                  className="mx-auto h-auto w-full max-w-[min(520px,92vw)] object-contain object-bottom opacity-95 lg:max-w-[620px]"
                />
              </div>
            ) : isLegal ? (
              <div
                className="pointer-events-none absolute bottom-8 right-4 z-0 select-none sm:bottom-10 sm:right-6 lg:bottom-10 lg:right-[400px]"
                aria-hidden
              >
                <Image
                  src={LEGAL_BOTTOM_ILLUSTRATION}
                  alt=""
                  width={271}
                  height={263}
                  className="h-auto w-[271px] max-w-full object-contain object-bottom object-right"
                  sizes="271px"
                />
              </div>
            ) : isPingTest ? null : (
              <div
                className="pointer-events-none absolute bottom-10 left-1/2 z-0 -translate-x-1/2 select-none lg:left-10 lg:translate-x-0"
                aria-hidden
              >
                <Image
                  src={ACCOUNT_CARD_DECORATION}
                  alt=""
                  width={295}
                  height={206}
                  className="h-[154px] w-[221px] object-contain object-bottom lg:h-[206px] lg:w-[min(295px,calc(100%-1rem))] lg:max-w-[295px] lg:object-left-bottom"
                />
              </div>
            )}

            <div className="relative z-[2] flex min-h-0 w-full flex-1 flex-col">{children}</div>
          </div>
        </div>
      </main>

      {mobileNavOpen ? (
        <div
          className="fixed inset-0 z-[95] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#101828]/60"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
          />
          <div
            id="account-mobile-nav"
            className="absolute left-0 top-0 flex h-full w-[min(100%,270px)] min-w-0 flex-col overflow-hidden bg-white shadow-[4px_0_24px_rgba(16,24,40,0.12)]"
          >
            <AccountNavPanel
              accountEmail={accountEmail}
              onLogout={handleLogout}
              onNavAction={() => setMobileNavOpen(false)}
              onOpenDownloadApp={() => setDownloadAppModalOpen(true)}
              tone="mobile"
              onDrawerClose={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <DownloadAppModal open={downloadAppModalOpen} onClose={() => setDownloadAppModalOpen(false)} />
    </div>
  );
}

export function AccountLayoutClient({ children }: { children: ReactNode }) {
  return (
    <AccountAreaProvider>
      <AccountLayoutInner>{children}</AccountLayoutInner>
    </AccountAreaProvider>
  );
}
