"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  evaluatePasswordRules,
  EyeIcon,
  EyeSlashIcon,
  PasswordRequirementRow,
  PasswordStrengthMeter,
} from "@/components/password-strength";
import { useQuizStore } from "@/stores/quiz-store";

/** Account dashboard (ЛК) — placeholder at `app/account/page.tsx`. */
const ACCOUNT_PATH = "/account";

type LoginLeftStep =
  | "sign-up"
  | "enter-password"
  | "reset-password"
  | "reset-verify-code"
  | "reset-new-password"
  | "reset-success"
  | "verify-inbox"
  | "set-password";

/** Liquid-glass corner tiles — **no backdrop-filter**: Chrome promotes those layers above the ping row. */
const LOGIN_PROMO_SQUARE_SURFACE: CSSProperties = {
  background: "rgba(255, 255, 255, 0.2)",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
};

/** Same silhouette as `public/assets/Union.svg` — white fill layer sits behind the asset. */
const LOGIN_PROMO_UNION_PATH_D =
  "M265.5 0C280.613 0 293.427 11.1095 295.569 26.0693L297.336 38.4033C298.055 43.4247 305.289 43.4699 306.071 38.458L308.614 22.1602C310.604 9.40467 321.59 0 334.5 0H583.5C592.613 0 600 7.3873 600 16.5V139C600 148.113 592.613 155.5 583.5 155.5H334.5C321.519 155.5 310.394 146.216 308.072 133.444L305.72 120.501C304.899 115.988 298.412 116.035 297.657 120.56L296.159 129.534C293.658 144.519 280.692 155.5 265.5 155.5H16.5C7.3873 155.5 0 148.113 0 139V16.5C0 7.3873 7.3873 0 16.5 0H265.5Z";

/** Mock: this email is treated as an existing account (skip verify-inbox). */
const MOCK_REGISTERED_EMAIL = "test@test.test";

function isRegisteredEmail(email: string): boolean {
  return email.trim().toLowerCase() === MOCK_REGISTERED_EMAIL;
}

/** Sizes 60–90px (10px step), one per `game-01` … `game-13`. */
const LOGIN_PROMO_FLOATING_GAME_SIZES = [70, 60, 90, 80, 70, 60, 70, 80, 60, 90, 70, 80, 60] as const;

/** Floating tiles: `public/assets/game-01.png` … `game-13.png` only. */
const LOGIN_PROMO_FLOATING_GAMES_SPECS: { src: string; size: number }[] =
  LOGIN_PROMO_FLOATING_GAME_SIZES.map((size, i) => ({
    src: `/assets/game-${String(i + 1).padStart(2, "0")}.png`,
    size,
  }));

type PromoBouncer = {
  src: string;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function PromoFloatingGameIconInner({ src }: { src: string }) {
  return (
    <div className="relative aspect-square h-full w-full">
      <div
        className="absolute inset-0 rounded-[24px] border border-white/40 bg-white/18 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md ring-1 ring-white/25"
        aria-hidden
      />
      <div className="absolute inset-[4px] overflow-hidden rounded-[20px]">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 90px, 56px"
        />
      </div>
    </div>
  );
}

const PROMO_FLOAT_BASE_SPEED = 62;

function LoginPromoFloatingArena() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<PromoBouncer[] | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);
  const lastTRef = useRef(0);
  const chaosAccRef = useRef(0);
  const chaosThresholdRef = useRef(2.8 + Math.random() * 1.6);

  useEffect(() => {
    const el = boundsRef.current;
    if (!el) return;

    const initIfNeeded = (w: number, h: number) => {
      if (w < 24 || h < 24) return;
      if (itemsRef.current) return;
      itemsRef.current = LOGIN_PROMO_FLOATING_GAMES_SPECS.map((spec) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = PROMO_FLOAT_BASE_SPEED * (0.88 + Math.random() * 0.28);
        const maxX = Math.max(0, w - spec.size);
        const maxY = Math.max(0, h - spec.size);
        return {
          src: spec.src,
          size: spec.size,
          x: Math.random() * maxX,
          y: Math.random() * maxY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });
    };

    const clampItems = (w: number, h: number) => {
      const items = itemsRef.current;
      if (!items) return;
      for (const it of items) {
        const maxX = Math.max(0, w - it.size);
        const maxY = Math.max(0, h - it.size);
        it.x = Math.min(Math.max(0, it.x), maxX);
        it.y = Math.min(Math.max(0, it.y), maxY);
      }
    };

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      initIfNeeded(w, h);
      clampItems(w, h);
    });
    ro.observe(el);
    initIfNeeded(el.clientWidth, el.clientHeight);
    clampItems(el.clientWidth, el.clientHeight);

    const tick = (t: number) => {
      if (!lastTRef.current) lastTRef.current = t;
      let dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;
      if (dt > 0.064) dt = 0.064;

      const items = itemsRef.current;
      if (!items) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const W = el.clientWidth;
      const H = el.clientHeight;
      if (W < 24 || H < 24) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      chaosAccRef.current += dt;
      const nudge = chaosAccRef.current >= chaosThresholdRef.current;
      if (nudge) {
        chaosAccRef.current = 0;
        chaosThresholdRef.current = 2.6 + Math.random() * 1.8;
      }

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (nudge) {
          it.vx += (Math.random() - 0.5) * 42 * dt;
          it.vy += (Math.random() - 0.5) * 42 * dt;
          const mag = Math.hypot(it.vx, it.vy) || 1;
          const target = PROMO_FLOAT_BASE_SPEED * (0.86 + Math.random() * 0.32);
          it.vx = (it.vx / mag) * target;
          it.vy = (it.vy / mag) * target;
        }

        it.x += it.vx * dt;
        it.y += it.vy * dt;

        if (it.x < 0) {
          it.x = 0;
          it.vx = Math.abs(it.vx);
        } else if (it.x + it.size > W) {
          it.x = W - it.size;
          it.vx = -Math.abs(it.vx);
        }

        if (it.y < 0) {
          it.y = 0;
          it.vy = Math.abs(it.vy);
        } else if (it.y + it.size > H) {
          it.y = H - it.size;
          it.vy = -Math.abs(it.vy);
        }

        const node = nodeRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${it.x}px,${it.y}px,0)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      lastTRef.current = 0;
      itemsRef.current = null;
    };
  }, []);

  return (
    <div ref={boundsRef} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      {LOGIN_PROMO_FLOATING_GAMES_SPECS.map((spec, i) => (
        <div
          key={spec.src}
          ref={(node) => {
            nodeRefs.current[i] = node;
          }}
          className="pointer-events-none absolute left-0 top-0 opacity-80 will-change-transform"
          style={{ width: spec.size, height: spec.size }}
        >
          <PromoFloatingGameIconInner src={spec.src} />
        </div>
      ))}
    </div>
  );
}

function LoginShellFallback() {
  return (
    <section className="flex min-h-screen flex-col bg-white lg:h-[100dvh] lg:min-h-0 lg:flex-row lg:overflow-hidden">
      <div className="flex flex-1 items-center justify-center bg-white">
        <span className="text-sm text-[#475467]">Loading…</span>
      </div>
      <div
        className="hidden min-h-0 flex-1 bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)] lg:flex lg:min-h-0"
        aria-hidden
      />
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginShellFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuthenticated = useQuizStore((s) => s.setAuthenticated);
  const [leftStep, setLeftStep] = useState<LoginLeftStep>("sign-up");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [touched, setTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [stepBeforeReset, setStepBeforeReset] = useState<LoginLeftStep | null>(null);
  const [resetOtpDigits, setResetOtpDigits] = useState(["", "", "", ""]);

  const demoRegistered = searchParams.get("registered") === "1";

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const showEmailError = touched && email.length > 0 && !isValidEmail(email);
  const showPasswordError = passwordTouched && password.length === 0;

  const handleContinueEmail = () => {
    setTouched(true);
    if (!isValidEmail(email)) {
      return;
    }
    const trimmed = email.trim();
    setSubmittedEmail(trimmed);
    if (isRegisteredEmail(trimmed)) {
      setPassword("");
      setPasswordTouched(false);
      setShowPasswordSignIn(false);
      setLeftStep("enter-password");
      return;
    }
    setLeftStep("verify-inbox");
  };

  const handleSignIn = () => {
    setPasswordTouched(true);
    if (password.length === 0) {
      return;
    }
    const loginEmail = submittedEmail;
    if (demoRegistered || isRegisteredEmail(loginEmail)) {
      setAuthenticated(true);
      router.push(ACCOUNT_PATH);
      return;
    }
    setLeftStep("verify-inbox");
  };

  return (
    <section className="flex min-h-screen flex-col bg-white lg:h-[100dvh] lg:min-h-0 lg:flex-row lg:overflow-hidden">
      <div className="relative flex min-h-0 w-full flex-1 flex-col bg-white lg:basis-0">
        <div className="flex items-start px-6 pt-8 lg:px-12 lg:pt-10">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="HyperUp home"
          >
            <div className="relative h-8 w-8 shrink-0 -rotate-90">
              <Image
                src="/assets/logo-symbol.svg"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative h-6 w-[129px] shrink-0">
              <Image
                src="/assets/logo-text.svg"
                alt="HyperUp"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center px-6 pb-16 pt-10 lg:px-12 lg:pb-12 lg:pt-6">
          <div
            className={
              leftStep === "reset-password" ||
              leftStep === "reset-verify-code" ||
              leftStep === "reset-new-password" ||
              leftStep === "reset-success"
                ? "mx-auto w-full max-w-[640px] px-0 sm:px-8"
                : "mx-auto w-full max-w-[360px]"
            }
          >
            {leftStep === "sign-up" ? (
              <>
                <div className="text-center">
                  <h1 className="text-[30px] font-semibold leading-[38px] tracking-normal text-[#101828]">
                    Welcome to HyperUp
                  </h1>
                  <p className="mt-2 text-[16px] font-normal leading-6 text-[#475467]">
                    Sign in or sign up for free with your email
                  </p>
                </div>

                <div className="mt-10 rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                  <div className="flex flex-col gap-3">
                    <SocialButton label="Continue with Google" icon={<GoogleIcon />} />
                    <SocialButton
                      label="Continue with Facebook"
                      icon={<FacebookIcon />}
                    />
                    <SocialButton label="Continue with Apple" icon={<AppleIcon />} />
                  </div>

                  <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#EAECF0]" />
                    <span className="text-[14px] font-medium leading-5 text-[#475467]">
                      OR
                    </span>
                    <div className="h-px flex-1 bg-[#EAECF0]" />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        aria-label="Email"
                        aria-invalid={showEmailError}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                          setTouched(true);
                          window.setTimeout(() => setIsFocused(false), 120);
                        }}
                        placeholder="Enter your email"
                        className={[
                          "h-11 w-full rounded-lg border bg-white px-3.5 text-[16px] leading-6 outline-none transition-[border-color,box-shadow] duration-150",
                          "placeholder:text-[#667085]",
                          showEmailError
                            ? "border-[#F04438] text-[#101828]"
                            : isFocused
                              ? "border-[#7F56D9] ring-2 ring-[#F4EBFF]"
                              : "border-[#D0D5DD] text-[#101828]",
                        ].join(" ")}
                      />
                      {showEmailError ? (
                        <p className="mt-1.5 text-left text-[14px] leading-5 text-[#F04438]">
                          Enter a valid email address
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={handleContinueEmail}
                      className="flex h-11 w-full items-center justify-center rounded-lg bg-[#7F56D9] text-[16px] font-semibold leading-6 text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6]"
                    >
                      Continue with email
                    </button>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <label className="flex min-w-0 cursor-pointer items-start gap-2 text-left">
                      <input
                        type="checkbox"
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                        className="mt-0.5 size-4 shrink-0 rounded border-[#D0D5DD] text-[#7F56D9] focus:ring-[#7F56D9]"
                      />
                      <span className="flex min-w-0 flex-col gap-0">
                        <span className="text-[14px] font-medium leading-5 text-[#344054]">
                          Keep me signed in
                        </span>
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (!email.trim()) {
                          return;
                        }
                        setStepBeforeReset("sign-up");
                        setResetPasswordEmail(email.trim());
                        setLeftStep("reset-password");
                      }}
                      className="shrink-0 text-[14px] font-semibold leading-5 text-[#7F56D9]"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              </>
            ) : leftStep === "enter-password" ? (
              <div className="flex w-full max-w-[360px] flex-col items-center gap-8">
                <h1 className="w-full text-center text-[30px] font-semibold leading-[38px] text-[#101828]">
                  Welcome back!
                </h1>

                <div className="flex w-full flex-col items-center gap-6 rounded-[12px]">
                  <form
                    className="flex w-full flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSignIn();
                    }}
                  >
                    <div className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3.5">
                      <span
                        className="min-w-0 truncate text-[16px] leading-6 text-[#101828]"
                        title={submittedEmail}
                      >
                        {submittedEmail}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail(submittedEmail);
                          setLeftStep("sign-up");
                        }}
                        className="shrink-0 text-[16px] font-medium leading-5 text-[#7F56D9] transition hover:text-[#6941C6]"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="relative w-full">
                      <input
                        id="login-password"
                        type={showPasswordSignIn ? "text" : "password"}
                        autoComplete="current-password"
                        aria-label="Password"
                        aria-invalid={showPasswordError}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPwdFocused(true)}
                        onBlur={() => {
                          setPasswordTouched(true);
                          setPwdFocused(false);
                        }}
                        placeholder="Enter your password"
                        className={[
                          "box-border flex h-11 w-full items-center rounded-lg border bg-white py-2.5 pl-3.5 pr-11 text-[16px] font-normal leading-6 text-[#101828] outline-none transition-[border-color,box-shadow] duration-150",
                          "placeholder:text-[#667085]",
                          showPasswordError
                            ? "border-[#F04438]"
                            : pwdFocused
                              ? "border-[#7F56D9] ring-2 ring-[#F4EBFF]"
                              : "border-[#D0D5DD]",
                        ].join(" ")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordSignIn((s) => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667085] transition hover:text-[#344054]"
                        aria-label={showPasswordSignIn ? "Hide password" : "Show password"}
                      >
                        {showPasswordSignIn ? <EyeSlashIconCompact /> : <EyeIconCompact />}
                      </button>
                      {showPasswordError ? (
                        <p className="mt-1.5 text-left text-[14px] leading-5 text-[#F04438]">
                          Enter your password
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="flex h-11 w-full items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white transition hover:bg-[#6941C6]"
                    >
                      Sign in
                    </button>
                  </form>

                  <div className="flex w-full items-center gap-0">
                    <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-2 text-left">
                      <span className="flex h-[18px] shrink-0 items-center justify-center pt-0.5">
                        <input
                          type="checkbox"
                          checked={keepSignedIn}
                          onChange={(e) => setKeepSignedIn(e.target.checked)}
                          className="size-4 shrink-0 rounded border border-[#D0D5DD] text-[#7F56D9] accent-[#7F56D9] focus:ring-[#7F56D9]"
                        />
                      </span>
                      <span className="text-[14px] font-medium leading-5 text-[#344054]">
                        Keep me signed in
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setStepBeforeReset("enter-password");
                        setResetPasswordEmail(submittedEmail);
                        setLeftStep("reset-password");
                      }}
                      className="shrink-0 text-[14px] font-semibold leading-5 text-[#6941C6] transition hover:text-[#53389E]"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              </div>
            ) : leftStep === "reset-password" ? (
              <ResetPasswordLeft
                email={resetPasswordEmail}
                onBackToLogin={() => {
                  const back = stepBeforeReset ?? "sign-up";
                  setStepBeforeReset(null);
                  setLeftStep(back);
                }}
                onContinue={() => {
                  setResetOtpDigits(["", "", "", ""]);
                  setLeftStep("reset-verify-code");
                }}
              />
            ) : leftStep === "reset-verify-code" ? (
              <ResetVerifyCodeLeft
                email={resetPasswordEmail}
                digits={resetOtpDigits}
                onDigitsChange={setResetOtpDigits}
                onContinue={() => setLeftStep("reset-new-password")}
              />
            ) : leftStep === "reset-new-password" ? (
              <ResetNewPasswordLeft onContinue={() => setLeftStep("reset-success")} />
            ) : leftStep === "reset-success" ? (
              <ResetPasswordSuccessLeft
                onContinueToLogin={() => {
                  setStepBeforeReset(null);
                  setResetOtpDigits(["", "", "", ""]);
                  setLeftStep("sign-up");
                }}
              />
            ) : leftStep === "verify-inbox" ? (
              <VerifyInboxLeft
                email={submittedEmail}
                onEmailContinue={() => setLeftStep("set-password")}
              />
            ) : (
              <SetPasswordLeft
                email={submittedEmail}
                keepSignedIn={keepSignedIn}
                onKeepSignedInChange={setKeepSignedIn}
                onEditEmail={() => {
                  setEmail(submittedEmail);
                  setLeftStep("sign-up");
                }}
                onConfirm={() => {
                  setAuthenticated(true);
                  router.push(ACCOUNT_PATH);
                }}
              />
            )}
          </div>
        </div>

        <p className="absolute inset-x-0 bottom-6 text-center text-[14px] leading-5 text-[#475467] lg:inset-x-auto lg:left-12 lg:text-left">
          © HyperUp 2026
        </p>
      </div>

      <LoginPromoPanel />
    </section>
  );
}

function VerifyInboxLeft({
  email,
  onEmailContinue,
}: {
  email: string;
  onEmailContinue: () => void;
}) {
  return (
    <div className="font-sans">
      <div className="mb-10 flex justify-center">
        <div className="relative aspect-[347/231] w-full max-w-[347px]">
          <Image
            src="/assets/login-check-inbox.png"
            alt=""
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 347px"
            priority
          />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-[30px] font-semibold leading-[38px] text-[#101828]">Check your inbox</h1>
        <p className="mt-4 text-[16px] font-normal leading-6 text-[#475467]">
          We&apos;ve just sent an email confirmation to{" "}
          <button
            type="button"
            onClick={onEmailContinue}
            className="inline max-w-full cursor-pointer break-words rounded-sm text-left font-bold text-[#101828] transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
            aria-label="Continue — email verified"
          >
            <EmailSegments value={email} />
          </button>
          , click the link to verify your email.
        </p>
      </div>
    </div>
  );
}

function EmailSegments({ value }: { value: string }) {
  const at = value.indexOf("@");
  if (at <= 0 || at === value.length - 1) {
    return <>{value}</>;
  }
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  );
}

function ResetPasswordLeft({
  email,
  onBackToLogin,
  onContinue,
}: {
  email: string;
  onBackToLogin: () => void;
  onContinue: () => void;
}) {
  const displayEmail = email.trim().length > 0 ? email.trim() : "your email";

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-3">
          <h1 className="w-full text-center text-[30px] font-semibold leading-[38px] text-[#101828]">
            Reset password
          </h1>
          <p className="w-full text-center text-[16px] font-normal leading-6 text-[#475467]">
            Click &quot;Continue&quot; to reset your password for
            <br />
            <span className="font-semibold text-[#101828]">{displayEmail}</span>
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6 rounded-[12px]">
          <button
            type="button"
            onClick={onContinue}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white transition hover:bg-[#6941C6]"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-[14px] font-semibold leading-5 text-[#6941C6] transition hover:text-[#53389E]"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}

function ResetVerifyCodeLeft({
  email,
  digits,
  onDigitsChange,
  onContinue,
}: {
  email: string;
  digits: string[];
  onDigitsChange: (next: string[]) => void;
  onContinue: () => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
  const displayEmail = email.trim().length > 0 ? email.trim() : "your email";

  const codeComplete = digits.length === 4 && digits.every((d) => d.length === 1);

  const setDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    onDigitsChange(next);
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const next = ["", "", "", ""];
    for (let i = 0; i < pasted.length; i += 1) {
      next[i] = pasted[i] ?? "";
    }
    onDigitsChange(next);
    const focusIdx = Math.min(pasted.length, 3);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-3">
          <h1 className="w-full text-center text-[30px] font-semibold leading-[38px] text-[#101828]">
            Check your inbox
          </h1>
          <p className="w-full text-center text-[16px] font-normal leading-6 text-[#475467]">
            Enter the verification code we just sent to{" "}
            <span className="font-semibold text-[#101828]">
              <EmailSegments value={displayEmail} />
            </span>
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6 rounded-[12px]">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-[280px] flex-col items-center gap-1.5">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    aria-label={`Digit ${i + 1} of 4`}
                    value={digits[i] ?? ""}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className={[
                      "box-border flex size-16 shrink-0 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white p-0.5 text-center text-[48px] font-medium leading-[60px] tracking-[-0.02em] outline-none transition-[border-color,box-shadow]",
                      digits[i]
                        ? "text-[#101828] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#F4EBFF]"
                        : "text-[#D0D5DD] placeholder:text-[#D0D5DD] focus:border-[#7F56D9] focus:text-[#101828] focus:ring-2 focus:ring-[#F4EBFF]",
                    ].join(" ")}
                    placeholder="0"
                  />
                ))}
              </div>
              <p className="w-full text-center text-[14px] font-normal leading-5 text-[#475467]">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onDigitsChange(["", "", "", ""]);
                    inputRefs.current[0]?.focus();
                  }}
                  className="font-semibold text-[#6941C6] transition hover:text-[#53389E]"
                >
                  Send a new code
                </button>
              </p>
            </div>

            <button
              type="button"
              disabled={!codeComplete}
              onClick={onContinue}
              className={[
                "flex h-11 w-full items-center justify-center rounded-lg px-4 py-2.5 text-[16px] font-semibold leading-6 transition",
                codeComplete
                  ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                  : "cursor-not-allowed bg-[#EAECF0] text-[#667085]",
              ].join(" ")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResetNewPasswordLeft({ onContinue }: { onContinue: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);

  const { tier, lenOk, categoriesOk, strengthRuleOk, allOk, inputWeakBorder } =
    evaluatePasswordRules(password);
  const showStrengthMeter = password.length > 0;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-3">
          <h1 className="w-full text-center text-[30px] font-semibold leading-[38px] text-[#101828]">
            Reset your password
          </h1>
          <p className="w-full text-center text-[16px] font-normal leading-6 text-[#475467]">
            Enter a new password below to change your password
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-label="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocused(true)}
              onBlur={() => setPwdFocused(false)}
              placeholder="Enter new password"
              className={[
                "box-border flex h-11 w-full items-center rounded-lg border bg-white px-3.5 py-2.5 pr-11 text-[16px] font-normal leading-6 text-[#101828] outline-none transition-[border-color,box-shadow] duration-150",
                "placeholder:text-[#667085]",
                pwdFocused
                  ? "border-[#7F56D9] ring-2 ring-[#F4EBFF]"
                  : inputWeakBorder
                    ? "border-[#F04438]"
                    : "border-[#D0D5DD]",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#344054]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>

          {showStrengthMeter ? <PasswordStrengthMeter tier={tier} /> : null}

          <div className="flex flex-col gap-2">
            <PasswordRequirementRow met={strengthRuleOk}>
              Must be Okay strength or better.
            </PasswordRequirementRow>
            <PasswordRequirementRow met={lenOk}>Password is at least 8 characters long.</PasswordRequirementRow>
            <PasswordRequirementRow met={categoriesOk}>
              Password includes two of the following: letter, number, or symbol.
            </PasswordRequirementRow>
          </div>

          <button
            type="button"
            disabled={!allOk}
            onClick={onContinue}
            className={[
              "flex h-11 w-full items-center justify-center rounded-lg text-[16px] font-semibold leading-6 transition",
              allOk
                ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                : "cursor-not-allowed bg-[#EAECF0] text-[#667085]",
            ].join(" ")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordSuccessLeft({ onContinueToLogin }: { onContinueToLogin: () => void }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-8">
        <div className="relative h-14 w-14 shrink-0">
          <Image
            src="/assets/password-changed-success.png"
            alt=""
            width={56}
            height={56}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <h1 className="w-full text-center text-[30px] font-semibold leading-[38px] text-[#101828]">
            Password changed
          </h1>
          <p className="w-full text-center text-[16px] font-normal leading-6 text-[#475467]">
            Your password has been successfully changed. You can now login using new password
          </p>
        </div>

        <button
          type="button"
          onClick={onContinueToLogin}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white transition hover:bg-[#6941C6]"
        >
          Continue to login
        </button>
      </div>
    </div>
  );
}

function SetPasswordLeft({
  email,
  keepSignedIn,
  onKeepSignedInChange,
  onEditEmail,
  onConfirm,
}: {
  email: string;
  keepSignedIn: boolean;
  onKeepSignedInChange: (value: boolean) => void;
  onEditEmail: () => void;
  onConfirm: () => void;
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);

  const { tier, lenOk, categoriesOk, strengthRuleOk, allOk, inputWeakBorder } =
    evaluatePasswordRules(password);
  const showStrengthMeter = password.length > 0;

  return (
    <div className="font-sans">
      <div className="text-center">
        <h1 className="text-[30px] font-semibold leading-[38px] text-[#101828]">Set Password</h1>
        <p className="mt-2 text-[16px] font-normal leading-6 text-[#475467]">Make sure it&apos;s a good one.</p>
      </div>

      <div className="mt-10 rounded-[12px] border border-[#EAECF0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
        <div className="flex flex-col gap-4">
          <div className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3.5">
            <span className="min-w-0 truncate text-[16px] leading-6 text-[#101828]" title={email}>
              {email}
            </span>
            <button
              type="button"
              onClick={onEditEmail}
              className="shrink-0 text-[16px] font-medium leading-5 text-[#7F56D9] transition hover:text-[#6941C6]"
            >
              Edit
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocused(true)}
              onBlur={() => setPwdFocused(false)}
              placeholder="Type your password"
              className={[
                "h-11 w-full rounded-lg border bg-white py-0 pl-3.5 pr-11 text-[16px] leading-6 outline-none transition-[border-color,box-shadow] duration-150",
                "placeholder:text-[#667085]",
                pwdFocused
                  ? "border-[#7F56D9] ring-2 ring-[#F4EBFF]"
                  : inputWeakBorder
                    ? "border-[#F04438] text-[#101828]"
                    : "border-[#D0D5DD] text-[#101828]",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#344054]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>

          {showStrengthMeter ? <PasswordStrengthMeter tier={tier} /> : null}

          <div className="flex flex-col gap-2">
            <PasswordRequirementRow met={strengthRuleOk}>
              Must be Okay strength or better.
            </PasswordRequirementRow>
            <PasswordRequirementRow met={lenOk}>Password is at least 8 characters long.</PasswordRequirementRow>
            <PasswordRequirementRow met={categoriesOk}>
              Password includes two of the following: letter, number, or symbol.
            </PasswordRequirementRow>
          </div>

          <button
            type="button"
            disabled={!allOk}
            onClick={onConfirm}
            className={[
              "flex h-11 w-full items-center justify-center rounded-lg text-[16px] font-semibold leading-6 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition",
              allOk
                ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                : "cursor-not-allowed bg-[#EAECF0] text-[#667085]",
            ].join(" ")}
          >
            Confirm password
          </button>
        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-2 text-left">
          <input
            type="checkbox"
            checked={keepSignedIn}
            onChange={(e) => onKeepSignedInChange(e.target.checked)}
            className="size-4 shrink-0 rounded border-[#D0D5DD] text-[#7F56D9] focus:ring-[#7F56D9]"
          />
          <span className="text-[14px] font-medium leading-5 text-[#344054]">Keep me signed in</span>
        </label>
      </div>
    </div>
  );
}

/** 16×16 eye control for sign-in field (Figma). */
function EyeIconCompact() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeSlashIconCompact() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10.733 5.076A10.66 10.66 0 0 1 12 5c7 0 10 7 10 7a13.166 13.166 0 0 1-1.487 2.54" />
      <path d="M14.12 14.12a3 3 0 1 1-4.244-4.243" />
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a9.9 9.9 0 0 1 2.279-3.537" />
      <path d="M9.88 9.88a3 3 0 0 0 4.242 4.242" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function SocialButton({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[16px] font-semibold leading-6 text-[#344054] transition hover:bg-[#F9FAFB]"
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        {icon}
      </span>
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function LoginPromoPanel() {
  return (
    <div className="relative hidden min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden lg:flex lg:rounded-none lg:rounded-l-[48px]">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='1.2' fill='%23fff'/%3E%3C/svg%3E")`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <LoginPromoFloatingArena />

      <div className="relative z-[2] flex w-full min-h-0 flex-1 flex-col justify-center overflow-y-auto px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-center">
          <div className="w-full max-w-[560px] text-center">
            <h2 className="text-[26px] font-bold leading-[34px] text-white sm:text-[30px] sm:leading-[45px]">
              Reduce Ping for All Games
              <br />
              on Any Device
            </h2>
            <p className="mt-3 text-[17.8px] font-medium leading-[26.7px] text-[#E9D7FE]">
              Try for free!
            </p>
          </div>

          <div className="relative mt-8 w-full max-w-[720px] sm:mt-10">
            <div className="relative mx-auto box-border w-full max-w-[min(100%,380px)] rounded-[40px] p-0 md:max-w-[601px] md:p-0">
              {/* Glass background контейнера */}
              <div
                className="pointer-events-none absolute inset-0 z-0  "
                aria-hidden
              />

              {/* PNG фон (ширина 600) + цифры поверх */}
              <div className="relative z-[10] flex w-full flex-col items-center gap-4 max-w-unset">
                <div className="relative w-[600px] max-w-full">
                  <Image
                    src="/assets/ping-login-empty.png"
                    alt=""
                    width={600}
                    height={156}
                    priority
                    className="h-auto w-full"
                  />

                  {/* Цифры пинга позиционированы поверх PNG */}
                  <div className="absolute left-[70px] top-[64px] flex flex-col">
                    <span className="text-[60px] font-semibold leading-[72px] tracking-[-1.2px] text-[#f04438]">
                      ~110ms
                    </span>
                    <span className="text-center text-[16px] font-medium leading-[24px] text-[#f04438]">
                      Before
                    </span>
                  </div>

                  <div className="absolute right-[70px] top-[64px] flex flex-col text-right">
                    <span className="text-[60px] font-semibold leading-[72px] tracking-[-1.2px] text-[#17b26a]">
                      ~45ms
                    </span>
                    <span className="text-[16px] font-medium leading-[24px] text-[#17b26a]">
                      After HyperUp
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-[2] mt-4 flex w-full justify-end sm:mt-5">
              <div className="w-full max-w-[269px] rounded-xl border border-white/40 bg-white/95 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[16px] font-semibold leading-6 text-[#101828]">
                    Connection info
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold leading-[18px] text-[#101828]">
                    HyperUp performance
                  </span>
                  <span className="text-[14px] font-semibold leading-4 text-[#7F56D9]">
                    +57% Boost
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EAECF0]">
                  <div
                    className="h-full w-[30%] rounded-full bg-[linear-gradient(135deg,#43CBFF_0%,#9708CC_100%)]"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
