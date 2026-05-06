/**
 * Aside nav icons — mostly under `public/assets/aside/`.
 * Billing uses `billing.svg` on Account; on Billing route the row uses `i.svg`.
 * `contact` is a copy of `legal` until a separate asset is added.
 */
export const ASIDE_NAV_ICONS = {
  account: "/assets/aside/account.svg",
  /** Gray account glyph when another account section (e.g. Billing) is active. */
  accountInactive: "/assets/aside/account-inactive.svg",
  /** Billing row when `/account/billing` is active. */
  billing: "/assets/i.svg",
  /** Billing row on Account page — legacy sidebar icon + chevron. */
  billingInactive: "/assets/aside/billing.svg",
  pingTest: "/assets/aside/ping-test.svg",
  legal: "/assets/aside/legal.svg",
  /** Legal row when `/account/legal` is active (Figma). */
  legalActive: "/assets/legal-ic.svg",
  contact: "/assets/aside/contact.svg",
  download: "/assets/aside/download.svg",
  /** Mobile drawer toggle — Primary/Black strokes */
  menuBurger: "/assets/aside/menu-burger-24.svg",
} as const;
