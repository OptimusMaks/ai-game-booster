"use client";

import { useEffect, useState, type PropsWithChildren } from "react";

export function QuizProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
