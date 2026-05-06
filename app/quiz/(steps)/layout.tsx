import type { ReactNode } from "react";
import { QuizProvider } from "../../components/Quiz/QuizProvider";
import { QuizShell } from "../../components/Quiz/QuizShell";

interface QuizLayoutProps {
  children: ReactNode;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <QuizProvider>
      <QuizShell>{children}</QuizShell>
    </QuizProvider>
  );
}
