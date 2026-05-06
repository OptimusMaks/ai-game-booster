import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameKey, ProblemKey, QuizState, RegionKey } from "@/types/quiz";

interface QuizStore extends QuizState {
  setGame: (game: GameKey) => void;
  setRegion: (region: RegionKey) => void;
  setProblem: (problem: ProblemKey) => void;
  setAuthenticated: (value: boolean) => void;
  setAccountConnected: (value: boolean) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  game: null,
  region: null,
  problem: null,
  isAuthenticated: false,
  isAccountConnected: false,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      ...initialState,
      setGame: (game) => set({ game }),
      setRegion: (region) => set({ region }),
      setProblem: (problem) => set({ problem }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setAccountConnected: (value) => set({ isAccountConnected: value }),
      resetQuiz: () => set(initialState),
    }),
    {
      name: "quiz-store",
    },
  ),
);
