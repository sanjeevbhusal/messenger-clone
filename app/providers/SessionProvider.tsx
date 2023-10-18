"use client";

import { PropsWithChildren } from "react";
import { SessionProvider as AuthProvider } from "next-auth/react";

function SessionProvider({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default SessionProvider;
