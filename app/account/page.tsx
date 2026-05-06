import type { Metadata } from "next";
import { AccountDashboard } from "./AccountDashboard";

export const metadata: Metadata = {
  title: "Account — HyperUp",
  description: "Manage your HyperUp account and login details.",
};

export default function AccountPage() {
  return <AccountDashboard />;
}
