"use client";

import Image from "next/image";
import AuthenticationForm from "../../components/AuthenticationForm";
import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import { User } from "@prisma/client";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { status, user } = useAuth();

  if (status === "loading") {
    return (
      <div className="flex flex-col w-40 mx-auto justify-center min-h-screen gap-4">
        <Loader2 className="animate-spin mx-auto" size={40} />
        <h3 className="ml-12">Loading...</h3>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen flex flex-col items-center gap-4 p-24 ">
        <Image
          src="/images/logo.jpeg"
          alt="Messenger logo"
          height={40}
          width={40}
        />
        <h3 className="font-semibold text-lg">Signin to your account</h3>
        {/* Login Form goes here */}
        <AuthenticationForm />
      </main>
    );
  }

  return <Dashboard />;
}
