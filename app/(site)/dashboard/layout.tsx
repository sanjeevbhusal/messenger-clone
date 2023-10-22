import SideBar from "@/components/SideBar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex">
      <div className={`h-screen flex`}>
        <SideBar />
      </div>
      {children}
    </div>
  );
}

export default Layout;
