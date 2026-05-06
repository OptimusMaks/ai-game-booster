"use client";

import clsx from "clsx";

function BackChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={clsx("shrink-0", className)}
    >
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type AccountBackButtonProps = {
  onClick: () => void;
};

/**
 * Mobile (`max-lg`): outlined button — white fill, #D0D5DD border, 87×40, 8×12 padding, gap 4px (Figma).
 * Desktop (`lg+`): text-style control with hover fill.
 */
export function AccountBackButton({ onClick }: AccountBackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className={clsx(
        "box-border inline-flex shrink-0 flex-row items-center justify-center gap-1 rounded-lg px-3 py-2 text-[16px] font-semibold leading-5 text-[#7F56D9] transition",
        "h-10 w-[87px] border border-[#D0D5DD] bg-white",
        "lg:h-auto lg:w-auto lg:min-w-0 lg:justify-start lg:gap-2 lg:border-0 lg:bg-transparent lg:px-2 lg:py-1.5 lg:leading-6 lg:text-left lg:-ml-2 lg:hover:bg-[#F9F5FF] lg:hover:text-[#6941C6]",
      )}
    >
      <BackChevronIcon />
      Back
    </button>
  );
}
