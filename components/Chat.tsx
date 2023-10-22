import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2 } from "lucide-react";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  user: User | null;
}
interface Chat {
  id: string;
  senderId: string;
  message: string;
}

function Chat({ user }: Props) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function fetchChat() {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/chats?userId=${user?.id}`);
        const chats = response.data.chats;
        setChats(chats);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchChat();
  }, [user]);

  if (!user) {
    return (
      <div className="grow flex items-center justify-center flex-col gap-2">
        <p className="font-semibold">No User Selected</p>
        <p className="text-gray-500">
          Select a user from the sidebar to start the conversation
        </p>
      </div>
    );
  }
  return (
    <div className="grow flex flex-col justify-between">
      <div className="p-2 border-b">
        <div className="flex gap-2 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={user?.image as string}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">{user?.name}</p>
        </div>
      </div>
      <div className="p-2 border-b grow overflow-auto h-[400px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="animate-spin w-16 h-16" />
          </div>
        ) : (
          chats.map((chat) => {
            return (
              <div
                key={chat.id}
                className={`w-fit p-4 rounded-md ${
                  chat.senderId === user?.id
                    ? "bg-gray-200"
                    : "bg-green-400 ml-auto"
                }`}
              >
                {chat.message}
                {/* This chat can either be of mine or the another person. */}
              </div>
            );
          })
        )}
      </div>
      {isLoading ? null : (
        <div className="p-2 min-h-[60px]">
          <ChatInput />
        </div>
      )}
    </div>
  );
}

export default Chat;
