"use client";

import useAuth from "@/app/hooks/useAuth";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Dashboard() {
  const { status, user } = useAuth();

  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}

export default Dashboard;
