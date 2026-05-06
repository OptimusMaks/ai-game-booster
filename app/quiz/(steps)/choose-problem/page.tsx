"use client";

import Link from "next/link";
import { useState } from "react";

type ProblemOption = {
  id: string;
  label: string;
  icon: string;
};

const problems: ProblemOption[] = [
  {
    id: "high-ping",
    label: "High ping",
    icon: "🐌",
  },
  {
    id: "packet-loss",
    label: "Packet loss",
    icon: "🌀",
  },
  {
    id: "unstable-fps",
    label: "Unstable FPS",
    icon: "📉",
  },
  {
    id: "cant-connect",
    label: "Can't connect",
    icon: "🔌",
  },
  {
    id: "all-of-the-above",
    label: "All of the above",
    icon: "⬆️",
  },
];

export default function ChooseProblemPage() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  const handleSelect = (problemId: string) => {
    setSelectedProblem(problemId);
  };

  return (
    <section className="min-h-[calc(100vh-96px)] px-5 pb-10">
      <div className="mx-auto w-full">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] tracking-[-1.2px] text-[#101828]">
            What&apos;s your biggest problem?
          </h1>

          <p className="mt-6 text-[20px] leading-[30px] text-[#475467]">
            Pick the one that annoys you most
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-[328px] flex-col gap-3">
          {problems.map((problem) => (
            <ProblemCard
              key={problem.id}
              icon={problem.icon}
              label={problem.label}
              active={selectedProblem === problem.id}
              onClick={() => handleSelect(problem.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProblemCardProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function ProblemCard({ icon, label, active, onClick }: ProblemCardProps) {
  return (
    <Link
      href="/quiz/analyzing"
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-2 rounded-[12px] border border-[#E0E3E9] border-b-[3px] bg-white px-3 py-3 text-left transition-all duration-150",
        "hover:border-[#7F56D9]",
        "active:border-b-[1px]",
        active ? "border-[#7F56D9] border-b-[1px]" : "border-[#E0E3E9]",
      ].join(" ")}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#F5F7FB] text-[16px]">
        {icon}
      </span>

      <span className="text-[16px] font-semibold text-[#101828]">{label}</span>
    </Link>
  );
}
