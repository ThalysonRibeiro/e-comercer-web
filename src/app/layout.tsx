import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { ModalCartItemsAdded } from "@/components/modalCartItemsAdded";
import AuthProvider from "@/providers/auth";
import ProviderContext from "@/context/Context";
import { Flip, ToastContainer } from 'react-toastify';
import { LoginModal } from "@/components/loginModal";
import { FormeRegisterModal } from "@/components/registerModal/formeRegister";
import { serverApi } from "./api/api";
import { SiteContentProps } from "@/types/siteContent";
import ThemeLoader from "./ThemeLoader";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const response = await serverApi.get("/site-content");
  const data: SiteContentProps = response.data[0];

  return {
    title: data?.metaTitle || "E-commerce TR",
    description: data?.metaDescription || "E-commerce TR",
    icons: {
      icon: data?.favicon || "/default-favicon.ico",
    },
    openGraph: {
      title: data?.metaTitle,
      description: data?.metaDescription,
      images: data?.image_openGraph ? [data.image_openGraph] : [],
      type: "website",
      url: "https://seusite.com",
    },
    keywords: data?.keywords?.map(item => item) || [],
    robots: {
      index: true,
      follow: true,
      noarchive: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
      }
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="bg-themeColor text-textColor ">
        <AuthProvider>
          <ProviderContext>
            <ThemeLoader />
            <ModalCartItemsAdded />
            <FormeRegisterModal />
            <LoginModal />
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
