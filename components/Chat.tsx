import { User } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ChatProps {
  user: User | null;
}

interface Chat {
  id: string;
  senderId: string;
  message: string;
}

function Chat({ user }: ChatProps) {
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

  return (
    <div className="w-[60%] grow">
      <div className="h-16 border-b px-8 py-2">
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
      <div className="h-[calc(100%-64px)] overflow-auto px-8 pt-4 ">
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
    </div>
  );
}

export default Chat;
