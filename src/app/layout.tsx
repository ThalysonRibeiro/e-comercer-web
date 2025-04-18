import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { ModalCartItemsAdded } from "@/components/modalCartItemsAdded";
import AuthProvider from "@/providers/auth";
import ProviderContext from "@/context/Context";
import { Flip, ToastContainer } from 'react-toastify';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});;

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body
        className="bg-gray-700 text-gray-200 "
      >
        <AuthProvider>
          <ProviderContext>
            <ModalCartItemsAdded />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Flip}
            />
            {children}
          </ProviderContext>
        </AuthProvider>
      </body>
    </html>
  );
}