import type { Metadata } from "next";
import { LegalView } from "./LegalView";

export const metadata: Metadata = {
  title: "Legal — HyperUp",
  description: "Privacy, terms, and legal information for HyperUp.",
};

export default function AccountLegalPage() {
  return <LegalView />;
}
