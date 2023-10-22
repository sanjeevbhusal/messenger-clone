import useAuth from "@/app/hooks/useAuth";
import { User } from "@prisma/client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  selectedUser: User | null;
  changeSelectedUser: (user: User) => void;
}

function ChatSidebar({ selectedUser, changeSelectedUser }: Props) {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchedTerm, setLastSearchedTerm] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/users?searchTerm=${searchTerm}`);
      const users = response.data.users as User[];
      setUsers(users);
      setLastSearchedTerm(searchTerm);
    } catch (error) {}
  }

  return (
    <div className="flex">
      <div className="flex py-2 px-4 flex-col gap-4">
        <h1 className="font-semibold text-lg">Chats</h1>
        <form onSubmit={handleSearch}>
          <Input
            placeholder="Search messenger"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </form>
        <div className="overflow-y-auto">
          {lastSearchedTerm ? (
            <p className="text-gray-500 text-sm">
              Search results for: {lastSearchedTerm}
            </p>
          ) : null}
          <div className="mt-4 flex flex-col gap-2">
            {users.map((user) => {
              return (
                <div
                  key={user.id}
                  className={`p-2 rounded-lg border flex items-center gap-4 cursor-pointer hover:bg-gray-200 ${
                    selectedUser?.id === user.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => changeSelectedUser(user)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image as string}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <p className="text-sm">{user.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
    </div>
  );
}

export default ChatSidebar;
