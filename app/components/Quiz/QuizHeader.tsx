import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

interface QuizHeaderProps {
  showBackButton?: boolean;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
}

function QuizLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative h-[32px] w-[32px] -rotate-90">
        <Image
          src="/assets/logo-symbol.svg"
          alt="HyperUp symbol"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative h-[24px] w-[145px]">
        <Image
          src="/assets/logo-text.svg"
          alt="HyperUp"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  return (
    <div className="mx-auto flex w-full max-w-[120px] items-center gap-1.5">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step <= currentStep;

        return (
          <div
            key={step}
            className={clsx(
              "h-2 flex-1 rounded-full",
              isActive ? "bg-[#7342D9]" : "bg-[#EAECF0]",
            )}
          />
        );
      })}
    </div>
  );
}

export function QuizHeader({
  showBackButton = false,
  showProgress = false,
  currentStep = 1,
  totalSteps = 3,
  onBack,
}: QuizHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <header className="border-b border-[#EAECF0]">
      <div className="mx-auto flex h-[80px] max-w-screen-2xl items-center justify-center px-6">
        <div className="grid w-full grid-cols-[40px_1fr_40px] items-center">
          <div className="flex justify-start">
            {showBackButton ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-black/5"
                aria-label="Go back"
              >
                <Image
                  src="/assets/arrow-left.svg"
                  width={24}
                  height={24}
                  alt="back button"
                />
              </button>
            ) : null}
          </div>

          <div className="flex justify-center">
            <QuizLogo />
          </div>

          <div />
        </div>
      </div>

      {showProgress ? (
        <div className="pb-3">
          <QuizProgress currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      ) : null}
    </header>
  );
}
