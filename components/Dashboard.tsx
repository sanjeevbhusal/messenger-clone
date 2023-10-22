"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import SideBar from "./SideBar";
import Chat from "./Chat";
import NavBar from "./NavBar";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function Dashboard() {
  const params = useSearchParams();
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("/api/users");
        const users = response.data.users as User[];
        setUsers(users);
      } catch (error) {}
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const userId = params.get("userId");
    if (!userId) return;

    const user = users.find((user) => user.id === userId);
    if (!user) return;

    setSelectedUser(user);
  }, [users, params]);

  function changeSelectedUser(user: User) {
    router.push(`?userId=${user.id}`);
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="grow flex">
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
