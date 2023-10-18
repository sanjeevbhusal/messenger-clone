"use client";

import useAuth from "@/app/hooks/useAuth";
import { User } from "@prisma/client";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface DashboardProps {
  user: User;
}

function Dashboard({ user }: DashboardProps) {
  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}

export default Dashboard;
