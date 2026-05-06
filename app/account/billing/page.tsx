import type { Metadata } from "next";
import { BillingView } from "./BillingView";

export const metadata: Metadata = {
  title: "Billing — HyperUp",
  description: "Manage your HyperUp subscription and payment methods.",
};

export default function BillingPage() {
  return <BillingView />;
}
