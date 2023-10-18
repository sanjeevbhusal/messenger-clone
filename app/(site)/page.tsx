"use client";

import Image from "next/image";
import AuthenticationForm from "./components/AuthenticationForm";
import useAuth from "../hooks/useAuth";
import { redirect } from "next/navigation";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const { status } = useAuth();

  if (status === "loading") {
    return <div>Loading.....</div>;
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
