"use client";

import clsx from "clsx";
import { useState } from "react";
import { AccountOutlineButton } from "./AccountOutlineButton";

function PasswordField({
  value,
  onChange,
  placeholder,
  autoComplete,
  ariaLabel,
  focused,
  onFocus,
  onBlur,
  weakBorder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete: string;
  ariaLabel: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  weakBorder?: boolean;
}) {
  return (
    <input
      type="password"
      autoComplete={autoComplete}
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className={clsx(
        "box-border h-11 w-full rounded-lg border bg-white px-3.5 py-2.5 text-[16px] font-normal leading-6 text-[#101828] outline-none transition-[border-color,box-shadow] duration-150",
        "placeholder:text-[#667085]",
        focused
          ? "border-[#7F56D9] ring-2 ring-[#F4EBFF]"
          : weakBorder
            ? "border-[#F04438]"
            : "border-[#D0D5DD]",
      )}
    />
  );
}

export function AccountPasswordSection({
  active,
  onActiveChange,
  dimmed,
  onPasswordUpdated,
}: {
  /** Expanded password form */
  active: boolean;
  onActiveChange: (active: boolean) => void;
  /** Email row is being edited — mute this section */
  dimmed: boolean;
  /** Called after password update submit succeeds (mock flow). */
  onPasswordUpdated?: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusCurrent, setFocusCurrent] = useState(false);
  const [focusNew, setFocusNew] = useState(false);
  const [focusConfirm, setFocusConfirm] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const passwordsMatch =
    newPassword.length > 0 && confirmPassword.length > 0 && newPassword === confirmPassword;

  const canSubmit =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length > 0 &&
    confirmPassword.trim().length > 0 &&
    passwordsMatch;

  const currentError = submitAttempted && currentPassword.trim().length === 0;
  const confirmError =
    (submitAttempted || confirmTouched) &&
    confirmPassword.length > 0 &&
    confirmPassword !== newPassword;

  const handleCancel = () => {
    onActiveChange(false);
  };

  const handleUpdate = () => {
    if (!canSubmit) {
      setSubmitAttempted(true);
      return;
    }
    onActiveChange(false);
    onPasswordUpdated?.();
  };

  if (!active) {
    return (
      <div
        className={clsx(
          "flex flex-row items-center justify-between gap-4 border-b border-[#EAECF0] py-3",
          dimmed && "pointer-events-none select-none",
        )}
      >
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <p
            className={clsx(
              "text-[14px] font-[500] leading-5",
              dimmed ? "text-[#98A2B3]" : "text-[#101828]",
            )}
          >
            Password
          </p>
          <p
            className={clsx(
              "text-[14px] font-normal leading-5",
              dimmed ? "text-[#98A2B3]" : "text-[#475467]",
            )}
          >
            *********
          </p>
        </div>
        <AccountOutlineButton
          className={clsx(
            "h-9 min-w-[54px] shrink-0 px-3 py-2",
            dimmed && "opacity-50",
          )}
          disabled={dimmed}
          onClick={() => onActiveChange(true)}
        >
          Edit
        </AccountOutlineButton>
      </div>
    );
  }

  return (
    <div className="border-b border-[#EAECF0] py-3">
      <div className="mx-auto flex w-full max-w-[335px] flex-col lg:max-w-none">
        {/* Title row: Figma row + Cancel 75×36 top-right; subtitle max 244px, leading 20 */}
        <div className="mb-4 flex shrink-0 items-start justify-between gap-4 lg:mb-3">
          <div className="min-w-0 max-w-[244px] flex-1 lg:max-w-none">
            <p className="text-[14px] font-medium leading-5 text-[#101828]">Password</p>
            <p className="mt-1 max-w-[244px] text-[14px] font-normal leading-5 text-[#475467] lg:max-w-none lg:leading-6">
              Enter current password and create new
            </p>
          </div>
          <AccountOutlineButton
            className="h-9 min-w-[54px] shrink-0 px-3 py-2"
            onClick={handleCancel}
          >
            Cancel
          </AccountOutlineButton>
        </div>

        <div className="flex w-full flex-col gap-3 lg:gap-5">
          <div>
            <PasswordField
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="Enter current password"
              autoComplete="current-password"
              ariaLabel="Current password"
              focused={focusCurrent}
              onFocus={() => setFocusCurrent(true)}
              onBlur={() => setFocusCurrent(false)}
              weakBorder={currentError}
            />
            {currentError ? (
              <p className="mt-2 text-[14px] font-normal leading-5 text-[#F04438]">
                Enter your current password
              </p>
            ) : null}
          </div>

          <div>
            <PasswordField
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Enter new password"
              autoComplete="new-password"
              ariaLabel="New password"
              focused={focusNew}
              onFocus={() => setFocusNew(true)}
              onBlur={() => setFocusNew(false)}
            />
          </div>

          <div>
            <PasswordField
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm new password"
              autoComplete="new-password"
              ariaLabel="Confirm new password"
              focused={focusConfirm}
              onFocus={() => setFocusConfirm(true)}
              onBlur={() => {
                setFocusConfirm(false);
                setConfirmTouched(true);
              }}
              weakBorder={confirmError}
            />
            {confirmError ? (
              <p className="mt-2 text-[14px] font-normal leading-5 text-[#F04438]">
                Passwords do not match
              </p>
            ) : null}
          </div>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleUpdate}
            className={clsx(
              "flex h-11 w-full items-center justify-center rounded-lg px-4 py-2.5 text-[16px] font-semibold leading-6 transition",
              canSubmit
                ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                : "cursor-not-allowed bg-[#EAECF0] text-[#667085]",
            )}
          >
            Update password
          </button>
        </div>
      </div>
    </div>
  );
}
