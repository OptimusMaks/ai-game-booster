"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAccountArea } from "./AccountAreaContext";
import { AccountOutlineButton } from "./AccountOutlineButton";
import { AccountPasswordSection } from "./AccountPasswordSection";
import { AccountSuccessToast } from "./AccountSuccessToast";
import { EmailVerifyModal } from "./EmailVerifyModal";

/** Figma export Frame 2609759 (top orbs) — public/assets/account-settings-header-bg.png */
const ACCOUNT_SETTINGS_HEADER_BG = "/assets/account-settings-header-bg.png";

const ACCOUNT_SETTINGS_HEADER_ICON = "/assets/aside/account-settings-icon.png";

export function AccountDashboard() {
  const { accountEmail, setAccountEmail } = useAccountArea();

  /** One section in Personal details editable at a time (Figma: inactive row is muted gray). */
  const [personalDetailsMode, setPersonalDetailsMode] = useState<
    "none" | "email" | "password"
  >("none");
  const [emailDraft, setEmailDraft] = useState(accountEmail);
  const [pendingEmailVerify, setPendingEmailVerify] = useState<string | null>(null);
  const pendingVerifyEmailRef = useRef<string | null>(null);
  const [successToast, setSuccessToast] = useState<"email" | "password" | null>(null);

  const emailRowMuted = personalDetailsMode === "password";
  const passwordSectionDimmed = personalDetailsMode === "email";
  const personalDetailsEditing =
    personalDetailsMode !== "none" || pendingEmailVerify !== null;

  const emailDraftOk =
    emailDraft.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailDraft.trim());

  const openEmailEdit = () => {
    setEmailDraft(accountEmail);
    setPersonalDetailsMode("email");
  };

  const handleEmailVerificationComplete = useCallback(() => {
    const next = pendingVerifyEmailRef.current;
    if (next) {
      setAccountEmail(next);
    }
    pendingVerifyEmailRef.current = null;
    setPendingEmailVerify(null);
    setSuccessToast("email");
  }, [setAccountEmail]);

  useEffect(() => {
    if (!successToast) return;
    const id = window.setTimeout(() => setSuccessToast(null), 5000);
    return () => clearTimeout(id);
  }, [successToast]);

  const handleEmailVerifyModalClose = useCallback(() => {
    pendingVerifyEmailRef.current = null;
    setPendingEmailVerify(null);
  }, []);

  return (
    <>
      <AccountSuccessToast
        open={successToast !== null}
        message={
          successToast === "email"
            ? "Email successfully changed"
            : successToast === "password"
              ? "Password successfully changed"
              : ""
        }
      />
      <div
        className={clsx(
          "relative z-[2] mx-auto flex min-h-0 w-full max-w-[700px] flex-1 flex-col px-4 sm:px-6 sm:pt-10 lg:px-12 lg:pb-44",
          "pb-44 sm:pb-52",
          personalDetailsMode !== "none" && "max-lg:pb-64",
        )}
      >
        <header className="relative mb-8 flex flex-col gap-4 pt-8 sm:mb-10 lg:pt-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(225px,52vw)] overflow-hidden bg-cover bg-top bg-no-repeat lg:hidden"
            style={{ backgroundImage: `url(${ACCOUNT_SETTINGS_HEADER_BG})` }}
            aria-hidden
          />
          <div className="relative z-[1] flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative h-[59px] w-[58px] shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={ACCOUNT_SETTINGS_HEADER_ICON}
                  alt=""
                  width={58}
                  height={59}
                  className="size-full object-contain"
                />
              </div>
              <h1 className="text-[30px] font-semibold leading-[38px] text-[#101828]">
                Account settings
              </h1>
            </div>
            <p className="text-[16px] font-normal leading-6 text-[#475467]">
              Manage your login details
            </p>
          </div>
        </header>

        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-[18px] font-semibold leading-7 text-[#101828]">Personal details</h2>
          </div>

          <div className="mx-auto flex w-full max-w-[335px] flex-col lg:mx-0 lg:max-w-none">
            {personalDetailsMode === "email" ? (
              <div className="relative isolate border-b border-[#EAECF0] py-3">
                <AccountOutlineButton
                  className="absolute right-0 top-3 z-[1] flex h-9 w-[75px] shrink-0 items-center justify-center px-3 py-2 lg:hidden"
                  onClick={() => {
                    setEmailDraft(accountEmail);
                    setPersonalDetailsMode("none");
                  }}
                >
                  Cancel
                </AccountOutlineButton>

                <div className="flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
                  <div className="flex min-w-0 flex-col gap-2.5 lg:max-w-[320px] lg:flex-1">
                    <div className="flex max-w-[335px] flex-col gap-1 pr-[83px] lg:max-w-none lg:pr-0">
                      <p className="text-[14px] font-medium leading-5 text-[#101828]">Email address</p>
                      <p className="text-[14px] leading-5 text-[#475467]">{accountEmail}</p>
                    </div>

                    <div className="flex max-w-[335px] flex-col gap-3 lg:max-w-none">
                      <input
                        type="email"
                        autoComplete="email"
                        value={emailDraft}
                        onChange={(e) => setEmailDraft(e.target.value)}
                        placeholder="Enter email address"
                        className="box-border h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-[10px] text-[16px] font-normal leading-6 text-[#101828] outline-none transition-[border-color,box-shadow] placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#F4EBFF]"
                      />
                      <button
                        type="button"
                        disabled={!emailDraftOk}
                        onClick={() => {
                          const next = emailDraft.trim();
                          pendingVerifyEmailRef.current = next;
                          setPendingEmailVerify(next);
                          setPersonalDetailsMode("none");
                        }}
                        className={clsx(
                          "flex h-11 w-full max-w-[335px] items-center justify-center rounded-lg px-4 py-2.5 text-[16px] font-semibold leading-6 transition lg:max-w-none",
                          emailDraftOk
                            ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                            : "cursor-not-allowed bg-[#EAECF0] text-[#667085]",
                        )}
                      >
                        Update email
                      </button>
                    </div>
                  </div>

                  <AccountOutlineButton
                    className="hidden h-9 shrink-0 self-start px-3 py-2 lg:flex"
                    onClick={() => {
                      setEmailDraft(accountEmail);
                      setPersonalDetailsMode("none");
                    }}
                  >
                    Cancel
                  </AccountOutlineButton>
                </div>
              </div>
            ) : (
              <div
                className={clsx(
                  "flex flex-row items-center justify-between gap-4 border-b border-[#EAECF0] py-3",
                  emailRowMuted && "pointer-events-none select-none opacity-50",
                )}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-[14px] font-[500] leading-5 text-[#101828]">Email address</p>
                  <p className="text-[14px] font-normal leading-5 text-[#475467]">{accountEmail}</p>
                </div>
                <AccountOutlineButton
                  className="h-9 min-w-[54px] shrink-0 px-3 py-2"
                  disabled={emailRowMuted}
                  onClick={openEmailEdit}
                >
                  Edit
                </AccountOutlineButton>
              </div>
            )}
            <AccountPasswordSection
              key={personalDetailsMode}
              active={personalDetailsMode === "password"}
              onActiveChange={(open) => setPersonalDetailsMode(open ? "password" : "none")}
              dimmed={passwordSectionDimmed}
              onPasswordUpdated={() => setSuccessToast("password")}
            />
          </div>
        </section>

        <section>
          <div className="mb-4 mx-auto w-full max-w-[335px] lg:mx-0 lg:max-w-none">
            <h2 className="text-[18px] font-semibold leading-7 text-[#101828]">Manage account</h2>
          </div>

          <div
            className={clsx(
              "mx-auto flex w-full max-w-[335px] flex-row items-center justify-between gap-4 border-b border-[#EAECF0] py-3 lg:mx-0 lg:max-w-none",
              personalDetailsEditing && "pointer-events-none select-none",
            )}
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p
                className={clsx(
                  "text-[14px] font-medium leading-5",
                  personalDetailsEditing ? "text-[#98A2B3]" : "text-[#101828]",
                )}
              >
                Delete account
              </p>
              <p
                className={clsx(
                  "max-w-[247px] text-[14px] font-normal leading-5 lg:max-w-none",
                  personalDetailsEditing ? "text-[#98A2B3]" : "text-[#475467]",
                )}
              >
                Permanently delete your account and all data.
              </p>
            </div>
            <AccountOutlineButton
              variant="danger"
              className="h-9 min-w-[54px] shrink-0 px-3 py-2"
              disabled={personalDetailsEditing}
            >
              Delete
            </AccountOutlineButton>
          </div>
        </section>
      </div>

      {pendingEmailVerify ? (
        <EmailVerifyModal
          key={pendingEmailVerify}
          targetEmail={pendingEmailVerify}
          onClose={handleEmailVerifyModalClose}
          onVerified={handleEmailVerificationComplete}
        />
      ) : null}
    </>
  );
}
