"use client";

import { SessionProvider } from "next-auth/react";
import { type FC, type ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProviderWrapper: FC<SessionProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
