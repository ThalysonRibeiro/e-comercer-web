import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { ModalCartItemsAdded } from "@/components/modalCartItemsAdded";
import AuthProvider from "@/providers/auth";
import { LoginModal } from "@/components/loginModal";
import { FormeRegisterModal } from "@/components/registerModal/formeRegister";
import { serverApi } from "./api/api";
import { SiteContentProps } from "@/types/siteContent";
import { Header } from "@/components/Header/header";
import { Footer } from "@/components/footer";
import AppProvider from "@/context/AppProvider";
import { Bounce, ToastContainer } from "react-toastify";
import { Suspense } from "react";
import ServerThemeLoader from "@/components/serverThemeLoader";
import { fetchData } from "@/utils/fetchData";
import { Category } from "@/types/category";

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
    title: data?.metaTitle || "E-commerce",
    description: data?.metaDescription || "E-commerce",
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

export default async function RootLayout({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const siteContentPromise = fetchData<SiteContentProps[]>('/site-content');
  const categoryMenuPromise = fetchData<Category[]>(`/category?hasChildren=true&limit=6&offset=0`);

  const [
    siteContentData,
    categoryMenuData
  ] = await Promise.all([
    siteContentPromise,
    categoryMenuPromise
  ]);
  const siteContent: SiteContentProps = siteContentData[0];

  const noHeaderPages = ['/login', '/signup', '/checkout'];
  const shouldShowHeader = !noHeaderPages.includes(pathname);

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="bg-background text-foreground ">
        <Suspense fallback={null}>
          <ServerThemeLoader />
        </Suspense>
        <AuthProvider>
          <AppProvider>
            <ModalCartItemsAdded />
            <FormeRegisterModal />
            <LoginModal />
            {shouldShowHeader && (<Header category={categoryMenuData} siteContent={siteContent} />)}
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
              transition={Bounce}
            />
            {children}
            <Footer footerData={siteContent} />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}