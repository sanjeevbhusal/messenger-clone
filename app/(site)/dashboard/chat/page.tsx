"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import ChatSidebar from "@/components/ChatSidebar";
import Chat from "@/components/Chat";

interface I_Chat {
  id: string;
  senderId: string;
  message: string;
}

function ChatPage() {
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
    <div className="flex grow">
      <ChatSidebar
        selectedUser={selectedUser}
        changeSelectedUser={changeSelectedUser}
      />
      <Chat user={selectedUser} />
    </div>
  );
}

export default ChatPage;
