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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categoryMenu } = await serverApi.get(`/category?hasChildren=true&limit=6&offset=0`);
  const response = await serverApi.get('/site-content');
  const siteContent: SiteContentProps = response.data[0];

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="bg-themeColor text-textColor ">
        <AuthProvider>
          <AppProvider>
            <ModalCartItemsAdded />
            <FormeRegisterModal />
            <LoginModal />
            <Header
              category={categoryMenu}
              siteContent={siteContent}
            />
            {children}
            <Footer footerData={siteContent} />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
