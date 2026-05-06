import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export function AccountOutlineButton({
  children,
  variant = "neutral",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "neutral" | "danger";
}) {
  return (
    <button
      type="button"
      className={clsx(
        "shrink-0 rounded-lg border bg-white px-3 py-2 text-[14px] font-medium leading-5 transition hover:bg-[#F9FAFB]",
        variant === "danger"
          ? "border-[#F04438] text-[#F04438] hover:bg-[#FEF3F2] disabled:border-[#EAECF0] disabled:text-[#98A2B3] disabled:hover:bg-white"
          : "border-[#D0D5DD] text-[#101828] disabled:border-[#EAECF0] disabled:text-[#98A2B3] disabled:hover:bg-white",
        "disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
