export const QUIZ_STEPS = {
  CHOOSE_GAME: "/quiz/choose-game",
  CHOOSE_REGION: "/quiz/choose-region",
  CHOOSE_PROBLEM: "/quiz/choose-problem",
  ANALYZING: "/quiz/analyzing",
  RESULTS: "/quiz/results",
  PAYWALL: "/quiz/paywall",
  LOGIN: "/login",
  CONNECT_ACCOUNT: "/quiz/connect-account",
  CONFIRMATION: "/quiz/confirmation",
} as const;

export const quizStepOrder = [
  QUIZ_STEPS.CHOOSE_GAME,
  QUIZ_STEPS.CHOOSE_REGION,
  QUIZ_STEPS.CHOOSE_PROBLEM,
  QUIZ_STEPS.ANALYZING,
  QUIZ_STEPS.RESULTS,
  QUIZ_STEPS.PAYWALL,
  QUIZ_STEPS.LOGIN,
  QUIZ_STEPS.CONNECT_ACCOUNT,
  QUIZ_STEPS.CONFIRMATION,
];

export function getStepProgress(pathname: string) {
  const visibleSteps = [
    QUIZ_STEPS.CHOOSE_GAME,
    QUIZ_STEPS.CHOOSE_REGION,
    QUIZ_STEPS.CHOOSE_PROBLEM,
    QUIZ_STEPS.RESULTS,
  ];

  const currentIndex = visibleSteps.findIndex((step) => step === pathname);

  if (currentIndex === -1) {
    return 0;
  }

  return ((currentIndex + 1) / visibleSteps.length) * 100;
}
