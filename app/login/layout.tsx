import type { ReactNode } from "react";
import { QuizProvider } from "../components/Quiz/QuizProvider";
import { QuizShell } from "../components/Quiz/QuizShell";

export default function LoginRouteLayout({ children }: { children: ReactNode }) {
  return (
    <QuizProvider>
      <QuizShell>{children}</QuizShell>
    </QuizProvider>
  );
}
