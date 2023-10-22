import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Link } from "lucide-react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { HiChat } from "react-icons/hi";

interface Props {
  activeUrl: string;
}

function MobileSidebar({ activeUrl }: Props) {
  return (
    <div className="fixed flex justify-around left-0 right-0 bottom-0 bg-white border-t p-2 lg:hidden">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`p-2 hover:bg-gray-100 cursor-pointer rounded-lg ${
                activeUrl === "chat" ? "bg-gray-200" : ""
              }`}
            >
              <Link href="/chat">
                <HiChat size={20} />
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
              <Link href="/search">
                <FaUserGroup size={20} />
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search Users</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => signOut()}
            >
              <BiLogOut size={20} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default MobileSidebar;
