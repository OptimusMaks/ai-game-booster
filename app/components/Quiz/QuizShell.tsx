"use client";

import type { PropsWithChildren } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { quizHeaderConfig } from "@/lib/quiz-header-config";
import { QuizHeader } from "./QuizHeader";

export function QuizShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const header = quizHeaderConfig[pathname as keyof typeof quizHeaderConfig];
  const isFullBleedLogin = pathname === "/login";

  return (
    <div
      className={clsx(
        "min-h-screen bg-white text-[#101828]",
        isFullBleedLogin && "flex min-h-screen flex-col",
      )}
    >
      {!isFullBleedLogin ? (
        <QuizHeader
          showBackButton={header?.showBackButton}
          showProgress={header?.showProgress}
          currentStep={header?.currentStep}
          totalSteps={header?.totalSteps}
        />
      ) : null}
      <div
        className={clsx(
          "mx-auto flex w-full flex-col",
          isFullBleedLogin
            ? "min-h-0 flex-1 lg:min-h-0"
            : "min-h-[calc(100vh-64px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-9",
        )}
      >
        {/* {progress > 0 ? <QuizProgress value={progress} /> : null} */}

        <main
          className={clsx(
            "flex flex-1",
            isFullBleedLogin
              ? "min-h-0 w-full items-stretch p-0"
              : "items-center justify-center",
          )}
        >
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
