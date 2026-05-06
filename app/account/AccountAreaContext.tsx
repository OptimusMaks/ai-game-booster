"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { MOCK_ACCOUNT_EMAIL } from "./account-mock";

type AccountAreaValue = {
  accountEmail: string;
  setAccountEmail: Dispatch<SetStateAction<string>>;
};

const AccountAreaContext = createContext<AccountAreaValue | null>(null);

export function AccountAreaProvider({ children }: { children: ReactNode }) {
  const [accountEmail, setAccountEmail] = useState(MOCK_ACCOUNT_EMAIL);
  const value = useMemo(
    () => ({ accountEmail, setAccountEmail }),
    [accountEmail],
  );
  return (
    <AccountAreaContext.Provider value={value}>{children}</AccountAreaContext.Provider>
  );
}

export function useAccountArea() {
  const ctx = useContext(AccountAreaContext);
  if (!ctx) {
    throw new Error("useAccountArea must be used inside AccountAreaProvider");
  }
  return ctx;
}
