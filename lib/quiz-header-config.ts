interface QuizHeaderConfig {
  showBackButton?: boolean;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const quizHeaderConfig: Record<string, QuizHeaderConfig> = {
  "/quiz/choose-game": {
    showBackButton: false,
    showProgress: false,
  },
  "/quiz/choose-region": {
    showBackButton: true,
    showProgress: true,
    currentStep: 1,
    totalSteps: 2,
  },
  "/quiz/choose-problem": {
    showBackButton: true,
    showProgress: true,
    currentStep: 2,
    totalSteps: 2,
  },
  "/quiz/analyzing": {
    showBackButton: false,
    showProgress: false,
  },
  "/quiz/results": {
    showBackButton: false,
    showProgress: false,
  },
  "/login": {
    showBackButton: true,
    showProgress: false,
  },
} as const;
