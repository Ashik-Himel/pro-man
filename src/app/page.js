import LoginForm from "@/components/login/loginForm";
import Image from "next/image";
import loginImage from '@/assets/images/login.png';

export default function Page() {
  return (
    <main>
      <div className="container h-screen flex items-center">
        <div className="w-full max-w-[900px] mx-auto px-6 py-14 md:py-10 rounded-lg border border-primary [box-shadow:5px_5px_30px_rgba(0,0,0,0.2)] flex justify-between items-center gap-6">
          <div className="flex-1 hidden md:block">
            <Image src={loginImage} alt="Login Image" className="max-w-[300px] mx-auto" />
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
