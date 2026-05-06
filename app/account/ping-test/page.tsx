import type { Metadata } from "next";

import { AccountPingTestView } from "./AccountPingTestView";

export const metadata: Metadata = {
  title: "Ping test — HyperUp",
  description: "Pick a game and run a connection latency check from your device.",
};

export default function AccountPingTestPage() {
  return <AccountPingTestView />;
}
