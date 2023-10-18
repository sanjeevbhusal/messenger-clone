"use client";

import useAuth from "@/app/hooks/useAuth";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function DashboardPage() {
  const { status, user } = useAuth();

  if (status === "loading") {
    return <div>Loading.....</div>;
  }

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}

export default DashboardPage;
