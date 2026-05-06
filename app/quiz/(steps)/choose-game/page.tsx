"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type GameOption = {
  id: string;
  label: string;
  icon: string;
};

const games: GameOption[] = [
  {
    id: "brawl-stars",
    label: "Brawl Stars",
    icon: "/assets/game-01.png",
  },
  {
    id: "roblox",
    label: "Roblox",
    icon: "/assets/game-02.png",
  },
  {
    id: "free-fire",
    label: "Free Fire: Undersea Mystery",
    icon: "/assets/game-07.png",
  },
  {
    id: "blood-strike",
    label: "Blood Strike",
    icon: "/assets/game-04.png",
  },
  {
    id: "call-of-duty",
    label: "Call of Duty",
    icon: "/assets/game-09.png",
  },
  {
    id: "other",
    label: "Other",
    icon: "/assets/controller.png",
  },
];

export default function ChooseGamePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };

  return (
    <section className="flex min-h-[calc(100vh-84px)] flex-col">
      <div className="flex-1">
        <div className="mx-auto w-full max-w-[598px]">
          <div className="text-center">
            <h1 className="text-[30px] font-[family-name:var(--font-sf-pro-rounded)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#101828] sm:text-[38px]">
              Choose a game.
              <br />
              Watch us{" "}
              <span className="font-extrabold bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] bg-clip-text text-transparent">
                BOOOST
              </span>{" "}
              it
            </h1>

            <div className="mt-5 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-[8px] bg-[#FDF4FF] px-3 py-2 text-[14px] text-[#101828]">
                <Image
                  src="/assets/clock.svg"
                  alt=""
                  className="w-4 h-4"
                  width={16}
                  height={16}
                />
                <span>Start 30-second quiz</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4 text-[15px] text-[#344054]">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/assets/check-icon.svg"
                  alt=""
                  className="w-4 h-4"
                  width={16}
                  height={16}
                />
                <span>AI-powered routing</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Image
                  src="/assets/check-icon.svg"
                  alt=""
                  className="w-4 h-4"
                  width={16}
                  height={16}
                />
                <span>One-tap boost</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 max-w-[328px] mx-auto">
            {games.map((game) => {
              const isSelected = selectedGame === game.id;

              return (
                <Link
                  href="/quiz/choose-region"
                  key={game.id}
                  type="button"
                  onClick={() => handleSelect(game.id)}
                  className={[
                    "flex w-full items-center gap-2 rounded-[12px] border border-[#E0E3E9] border-b-[3px] bg-white px-3 py-3 text-left transition-all duration-150",
                    "hover:border-[#7F56D9]",
                    "active:border-b-[1px]",
                    isSelected
                      ? "border-[#7F56D9] border-b-[1px]"
                      : "border-[#E0E3E9]",
                  ].join(" ")}
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[12px] bg-[#F5F7FB]">
                    <Image
                      src={game.icon}
                      alt={game.label}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <span className="text-[16px] font-semibold text-[#101828]">
                    {game.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-[620px] text-center text-[12px] leading-[1.4] text-[#475467]">
          By clicking “Male” or “Female” you agree with the{" "}
          <a href="#" className="underline underline-offset-2">
            Terms of Use and Service
          </a>
          ,{" "}
          <a href="#" className="underline underline-offset-2">
            Privacy Policy
          </a>
          ,{" "}
          <a href="#" className="underline underline-offset-2">
            Subscription Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2">
            Cookie Policy
          </a>
        </div>
      </footer>
    </section>
  );
}
