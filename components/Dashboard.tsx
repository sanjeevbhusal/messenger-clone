"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import SideBar from "./SideBar";
import Chat from "./Chat";
import NavBar from "./NavBar";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface DashboardProps {
  user: User;
}

function Dashboard({ user }: DashboardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function changeSelectedUser(user: User) {
    setSelectedUser(user);
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="h-[calc(100vh-64px)] flex">
        <SideBar
          selectedUser={selectedUser}
          changeSelectedUser={changeSelectedUser}
        />
        <Separator orientation="vertical" />
        <Chat user={selectedUser} />
      </div>
    </div>
  );
}

export default Dashboard;
