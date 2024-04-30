import { Poppins } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import QueryProviders from "../lib/queryProviders";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});
export const metadata = {
  title: "ProMan - Project Management System",
  description: "This is a project management system to manage project's task easily among the team.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AntdRegistry>
          <QueryProviders>
            {children}
          </QueryProviders>
        </AntdRegistry>
        
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
