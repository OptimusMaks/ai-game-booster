export type GameKey =
  | "valorant"
  | "league-of-legends"
  | "fortnite"
  | "cs2"
  | null;

export type RegionKey = "na" | "eu" | "asia" | "latam" | "oce" | "mena" | null;

export type ProblemKey =
  | "rank"
  | "win-rate"
  | "teammates"
  | "mechanics"
  | "game-knowledge"
  | null;

export interface QuizState {
  game: GameKey;
  region: RegionKey;
  problem: ProblemKey;
  isAuthenticated: boolean;
  isAccountConnected: boolean;
}
