"use client";

import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import { usePathname, useRouter } from "next/navigation";

function SideBar() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  const router = useRouter();

  useEffect(() => {
    if (currentPath) return;
    router.push("/dashboard/chat");
  }, [currentPath, router]);

  return (
    <div>
      <DesktopSidebar activeUrl={currentPath} />
      <MobileSidebar activeUrl={currentPath} />
    </div>
  );
}

export default SideBar;
