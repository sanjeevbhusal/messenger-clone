import { HiChat } from "react-icons/hi";
import { FaUserGroup } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "./ui/separator";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  activeUrl: string;
}

function DesktopSidebar({ activeUrl }: Props) {
  return (
    <div className="h-full flex">
      <div className="flex-col gap-4 hidden lg:flex p-2">
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
                <Link
                  href="/search"
                  className={activeUrl === "search" ? "bg-gray-100" : ""}
                >
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
      <Separator orientation="vertical" />
    </div>
  );
}

export default DesktopSidebar;
