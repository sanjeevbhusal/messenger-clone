import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function NavBar() {
  return (
    <div className="flex items-center justify-between py-4 border-b px-24 h-16">
      <div></div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}

export default NavBar;
