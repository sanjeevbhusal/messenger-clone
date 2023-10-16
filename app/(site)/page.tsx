import Image from "next/image";
import AuthenticationForm from "./components/AuthenticationForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-4 p-24 ">
      <Image
        src="/images/logo.jpeg"
        alt="Messenger logo"
        height={40}
        width={40}
      />
      <h3 className="font-semibold text-lg">Signin to your account</h3>
      {/* Login Form goes here */}
      <AuthenticationForm />
    </main>
  );
}
