"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { AccountSuccessToast } from "../AccountSuccessToast";
import { AddCardDetailsModal, type SavedCardDetails } from "../AddCardDetailsModal";
import { CancelFeedbackModal } from "../CancelFeedbackModal";
import { CancelSubscriptionModal } from "../CancelSubscriptionModal";
import { RemovePaymentMethodModal } from "../RemovePaymentMethodModal";
import { AccountOutlineButton } from "../AccountOutlineButton";

const BILLING_TITLE_CARD = "/assets/Card.png";

function MastercardListMark() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#EAECF0] bg-white lg:h-[22px] lg:w-8"
      aria-hidden
    >
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="overflow-visible">
        <circle cx="7.5" cy="6" r="4.5" fill="#EB001B" />
        <circle cx="12.5" cy="6" r="4.5" fill="#F79E1B" />
      </svg>
    </div>
  );
}

function VisaMark() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#EAECF0] bg-white lg:h-[22px] lg:w-8"
      aria-hidden
    >
      <span className="text-[8px] font-bold leading-none tracking-tight text-[#1A1F71]">VISA</span>
    </div>
  );
}

const PREVIOUS_SUBSCRIPTION_INVOICES = [
  { date: "Apr 14, 2026", price: "$9.99" },
  { date: "Mar 14, 2026", price: "$9.99" },
  { date: "Feb 14, 2026", price: "$9.99" },
  { date: "Jan 14, 2026", price: "$9.99" },
] as const;

function PaidStatusBadge() {
  return (
    <span className="inline-flex h-[22px] items-center gap-0.5 rounded-full border border-[#ABEFC6] bg-[#ECFDF3] py-0.5 pl-1.5 pr-2 text-[12px] font-medium leading-[18px] text-[#067647]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0" aria-hidden>
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="#17B26A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Paid
    </span>
  );
}

function InvoiceLink() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 text-[14px] font-medium leading-5 text-[#7F56D9] transition hover:text-[#6941C6]"
      onClick={(e) => e.preventDefault()}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
        <path
          d="M8 10.5V2M8 10.5l2.5-2.5M8 10.5L5.5 8"
          stroke="#7F56D9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M2.5 12.5h11" stroke="#7F56D9" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      Invoice
    </a>
  );
}

function PreviousSubscriptionsSection() {
  return (
    <section className="flex w-full max-w-[700px] flex-col items-start gap-6 self-stretch">
      <h2 className="w-full text-[18px] font-semibold leading-7 text-[#101828]">Previous subscriptions</h2>

      <div className="flex w-full flex-col items-stretch gap-6">
        <div className="flex w-full flex-row items-center justify-between gap-4 border-b border-[#EAECF0] py-3 lg:gap-8">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[14px] font-medium leading-5 text-[#101828]">HyperUp Pro · Monthly</p>
            <p className="text-[14px] font-normal leading-5 text-[#475467]">Expired May 14, 2026</p>
          </div>
          <p className="shrink-0 text-[14px] font-medium leading-5 text-[#475467]">Expired</p>
        </div>

        <div className="w-full max-w-[700px] touch-pan-x overflow-x-auto overscroll-x-contain rounded-xl border border-[#EAECF0] bg-white [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-[600px] table-fixed border-collapse text-left lg:min-w-full">
            <colgroup>
              <col style={{ width: "188px" }} />
              <col style={{ width: "124px" }} />
              <col style={{ width: "128px" }} />
              <col style={{ width: "128px" }} />
            </colgroup>
            <thead>
              <tr className="border-b border-[#EAECF0] bg-[#F9FAFB]">
                <th className="px-4 py-3 text-left text-[12px] font-medium leading-[18px] text-[#475467] lg:px-6">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-[12px] font-medium leading-[18px] text-[#475467] lg:px-6">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium leading-[18px] text-[#475467] lg:px-6">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium leading-[18px] text-[#475467] lg:px-6">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {PREVIOUS_SUBSCRIPTION_INVOICES.map((row, i) => {
                const zebra = i % 2 === 0;
                const cellPad = i === 0 ? "py-1" : "py-4";
                return (
                  <tr
                    key={row.date}
                    className={clsx("border-b border-[#EAECF0] last:border-b-0", zebra ? "bg-[#F9FAFB]" : "bg-white")}
                  >
                    <td className={clsx("px-2 text-left text-[14px] font-normal leading-5 text-[#101828] lg:px-6", cellPad)}>
                      {row.date}
                    </td>
                    <td
                      className={clsx(
                        "px-4 text-right text-[14px] font-normal leading-5 text-[#101828] lg:px-6",
                        cellPad,
                      )}
                    >
                      {row.price}
                    </td>
                    <td className={clsx("px-4 lg:px-6", cellPad)}>
                      <PaidStatusBadge />
                    </td>
                    <td className={clsx("px-4 lg:px-6", cellPad)}>
                      <InvoiceLink />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function BillingView() {
  const [subscriptionCanceled, setSubscriptionCanceled] = useState(false);
  const [savedCard, setSavedCard] = useState<SavedCardDetails | null>({
    brand: "visa",
    lastFour: "6535",
    expirySubtitle: "Expiration 01/28",
  });
  const [cancelSubscriptionModalOpen, setCancelSubscriptionModalOpen] = useState(false);
  const [cancelFeedbackModalOpen, setCancelFeedbackModalOpen] = useState(false);
  const [cancellationSuccessToastOpen, setCancellationSuccessToastOpen] = useState(false);
  const [removePaymentMethodModalOpen, setRemovePaymentMethodModalOpen] = useState(false);
  const [addCardDetailsModalOpen, setAddCardDetailsModalOpen] = useState(false);
  const feedbackModalDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackModalDelayRef.current) clearTimeout(feedbackModalDelayRef.current);
    };
  }, []);

  useEffect(() => {
    if (!cancellationSuccessToastOpen) return;
    const id = window.setTimeout(() => setCancellationSuccessToastOpen(false), 5000);
    return () => clearTimeout(id);
  }, [cancellationSuccessToastOpen]);

  const handleCancelFeedbackModalClose = useCallback(() => {
    setCancelFeedbackModalOpen(false);
    setCancellationSuccessToastOpen(true);
  }, []);

  const isFreePlanAfterCancel = subscriptionCanceled && savedCard === null;

  return (
    <>
      <AccountSuccessToast open={cancellationSuccessToastOpen} message="Cancellation confirmed" />
      <div
        className={clsx(
          "relative z-[2] mx-auto flex min-h-0 w-full max-w-[375px] flex-1 flex-col gap-8 px-5 pt-12",
          "pb-[calc(14rem+env(safe-area-inset-bottom,0px))] lg:max-w-[700px] lg:gap-10 lg:px-6 lg:pt-12 lg:pb-[calc(13rem+env(safe-area-inset-bottom,0px))]",
        )}
      >
        <header className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element -- user-provided PNG may be missing locally */}
            <img
              src={BILLING_TITLE_CARD}
              alt=""
              width={44}
              height={44}
              className="size-full -rotate-[4deg] object-contain"
            />
          </div>
          <h1 className="text-[30px] font-semibold leading-[38px] text-[#101828]">Billing</h1>
        </div>
        <p className="text-[16px] font-normal leading-6 text-[#475467]">
          Manage your subscription plan.
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:gap-10">
        <section
          className={clsx(
            "flex w-full max-w-[700px] flex-col items-start self-stretch",
            isFreePlanAfterCancel ? "gap-6" : "gap-6 lg:gap-3",
          )}
        >
          <h2 className="text-[18px] font-semibold leading-7 text-[#101828]">Your subscription</h2>

          {isFreePlanAfterCancel ? (
            <div className="flex w-full flex-col items-start gap-3">
              <div className="flex w-full flex-col items-start gap-4">
                <div className="box-border flex w-full flex-row items-start justify-between gap-4 border-b border-[#EAECF0] py-3 lg:gap-8">
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                    <p className="text-[24px] font-semibold leading-8 text-[#101828]">Free plan</p>
                    <p className="w-full text-[16px] font-normal leading-6 text-[#475467]">
                      Starting at $9.99/mo · Cancel anytime
                    </p>
                  </div>
                </div>
              </div>
              <p className="w-full text-[16px] font-normal leading-6 text-[#475467]">
                Subscribe to HyperUp Pro in iOS app to reduce your in-game ping.
              </p>
            </div>
          ) : (
            <>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="box-border flex w-full flex-row items-start justify-between gap-4 border-b border-[#EAECF0] py-3 lg:gap-8">
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                    <div className="flex w-full min-w-0 flex-row flex-nowrap items-center gap-2">
                      <p className="text-[24px] font-semibold leading-8 text-[#101828]">
                        HyperUp <span className="text-[#7F56D9]">Pro</span>
                      </p>
                      {subscriptionCanceled ? (
                        <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-[#FEDF89] bg-[#FFFAEB] px-2.5 py-0.5 text-[14px] font-medium leading-5 text-[#B54708]">
                          Canceled
                        </span>
                      ) : (
                        <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-[#ABEFC6] bg-[#ECFDF3] px-2.5 py-0.5 text-[14px] font-medium leading-5 text-[#067647]">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="w-full text-[16px] font-normal leading-6 text-[#475467]">Monthly · $9,99</p>
                  </div>
                  <div className="flex min-w-0 shrink-0 flex-col items-end gap-1 text-right lg:min-w-[116px]">
                    <p className="text-[14px] font-medium leading-5 text-[#101828]">
                      {subscriptionCanceled ? "Access until" : "Renewal date"}
                    </p>
                    <p className="text-[16px] font-semibold leading-5 text-[#101828]">May, 14, 2026</p>
                  </div>
                </div>

                {subscriptionCanceled ? (
                  <p className="max-w-[676px] text-[16px] font-normal leading-6 text-[#475467]">
                    Your subscription is canceled but still works until the current billing cycle. After
                    that, you&apos;ll lose access to game boosting.
                  </p>
                ) : null}
              </div>

              {!subscriptionCanceled ? (
                <button
                  type="button"
                  onClick={() => setCancelSubscriptionModalOpen(true)}
                  className="flex h-11 w-fit min-w-[191px] items-center justify-center rounded-lg border border-[#F04438] bg-white px-4 py-2.5 text-[16px] font-semibold leading-6 text-[#F04438] transition hover:bg-[#FEF3F2]"
                >
                  Cancel subscription
                </button>
              ) : null}
            </>
          )}
        </section>

        <section className="flex w-full max-w-[700px] flex-col items-start gap-6">
          {savedCard ? (
            <>
              <div className="flex w-full flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[18px] font-semibold leading-7 text-[#101828]">Payment method</h2>
                  <p className="text-[16px] font-normal leading-6 text-[#475467]">
                    Add and manage your payment methods using our secure payment system.
                  </p>
                </div>

                <div className="flex flex-row items-start justify-between gap-4 border-b border-[#EAECF0] py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {savedCard.brand === "mastercard" ? <MastercardListMark /> : <VisaMark />}
                    <div className="flex flex-col gap-1">
                      <p className="text-[14px] font-medium leading-5 text-[#101828]">
                        {savedCard.brand === "mastercard" ? "Mastercard" : "Visa"} {savedCard.lastFour}
                      </p>
                      <p className="text-[14px] font-normal leading-5 text-[#475467]">{savedCard.expirySubtitle}</p>
                    </div>
                  </div>
                  <AccountOutlineButton
                    variant="danger"
                    className="h-9 min-h-9 shrink-0 justify-center px-3 py-2 text-[14px] max-lg:min-w-[72px]"
                    onClick={() => setRemovePaymentMethodModalOpen(true)}
                  >
                    Delete
                  </AccountOutlineButton>
                </div>

                <button
                  type="button"
                  onClick={() => setAddCardDetailsModalOpen(true)}
                  className="flex h-11 w-full max-w-[203px] items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white transition hover:bg-[#6941C6] lg:w-fit lg:max-w-none"
                >
                  Add payment method
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-2">
                  <h2 className="w-full text-[18px] font-semibold leading-7 text-[#101828]">Payment method</h2>
                  <p className="w-full text-[16px] font-normal leading-6 text-[#475467]">
                    Add and manage your payment methods using our secure payment system.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddCardDetailsModalOpen(true)}
                  className="flex h-11 w-full max-w-[203px] shrink-0 items-center justify-center rounded-lg bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-6 text-white transition hover:bg-[#6941C6] lg:w-[203px]"
                >
                  Add payment method
                </button>
              </div>
            </>
          )}
        </section>

        {isFreePlanAfterCancel ? <PreviousSubscriptionsSection /> : null}
      </div>

      <CancelSubscriptionModal
        open={cancelSubscriptionModalOpen}
        onClose={() => setCancelSubscriptionModalOpen(false)}
        onConfirm={() => {
          setSubscriptionCanceled(true);
          if (feedbackModalDelayRef.current) clearTimeout(feedbackModalDelayRef.current);
          feedbackModalDelayRef.current = setTimeout(() => {
            feedbackModalDelayRef.current = null;
            setCancelFeedbackModalOpen(true);
          }, 2000);
        }}
      />

      <CancelFeedbackModal open={cancelFeedbackModalOpen} onClose={handleCancelFeedbackModalClose} />

      <RemovePaymentMethodModal
        open={removePaymentMethodModalOpen}
        onClose={() => setRemovePaymentMethodModalOpen(false)}
        onConfirm={() => setSavedCard(null)}
      />

      <AddCardDetailsModal
        open={addCardDetailsModalOpen}
        onClose={() => setAddCardDetailsModalOpen(false)}
        onConfirm={(card) => setSavedCard(card)}
      />
      </div>
    </>
  );
}
