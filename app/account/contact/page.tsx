import type { Metadata } from "next";
import { AccountContactView } from "./AccountContactView";

export const metadata: Metadata = {
  title: "Contact us — HyperUp",
  description: "Send feedback or questions to the HyperUp team from your account.",
};

export default function AccountContactPage() {
  return <AccountContactView />;
}
