"use client";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user as User | null;

  return {
    user,
    status,
  };
}

export default useAuth;
