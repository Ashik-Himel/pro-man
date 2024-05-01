import Image from "next/image";
import notFoundImage from '@/assets/images/404.png'
import Link from "next/link";
import { Button, ConfigProvider } from "antd";

export default function NotFound() {
  return (
    <main className="my-10 text-center">
      <div className="container">
        <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row justify-center items-center gap-6 [&>*]:flex-1">
          <div>
            <Image src={notFoundImage} alt="404 Image" className="w-full max-w-[300px] md:max-w-[400px] mx-auto" />
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-2">Page Not Found!</h2>
            <p className="max-w-[550px] mx-auto mb-6">The page you are looking for doesn&apos;t exist or maybe broken. Please try again later!</p>
            
            <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
              <Link href='/dashboard'>
                <Button type="primary">Return to Dashboard</Button>
              </Link>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
