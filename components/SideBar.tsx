"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { User } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SideBarProps {
  selectedUser: User | null;
  changeSelectedUser: (user: User) => void;
}

function SideBar({ selectedUser, changeSelectedUser }: SideBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchedTerm, setLastSearchedTerm] = useState("");
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

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    // make a api call to get users;
    try {
      const response = await axios.get(`/api/users?searchTerm=${searchTerm}`);
      const users = response.data.users as User[];
      setUsers(users);
      setLastSearchedTerm(searchTerm);
    } catch (error) {}
  }

  return (
    <div className="p-4 w-[40%] max-w-[300px]  overflow-y-auto ">
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search messenger"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
      <div className="mt-4">
        {lastSearchedTerm ? (
          <p className="text-gray-500 text-sm">
            Search results for: {lastSearchedTerm}
          </p>
        ) : null}
        <div className="flex flex-col gap-2 mt-4">
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
  );
}

export default SideBar;
