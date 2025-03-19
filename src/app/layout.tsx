import type { Viewport } from "next";
import { Metadata } from "next";
import { absoluteUrl, constructMetadata } from "@/config/site";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { Provider } from "@/provider";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


const geistSansLight = localFont({
  src: "./fonts/AtAero-Light.woff2",
  variable: "--font-geist-sans-light",
  weight: "300",
});

const geistSansRegular = localFont({
  src: "./fonts/AtAero-Regular.woff2",
  variable: "--font-geist-sans-regular",
  weight: "400",
});

const geistSansMedium = localFont({
  src: "./fonts/AtAero-Medium.woff2",
  variable: "--font-geist-sans-medium",
  weight: "500",
});

const geistSansSemibold = localFont({
  src: "./fonts/AtAero-Semibold.woff2",
  variable: "--font-geist-sans-semibold",
  weight: "600",
});

const geistSansBold = localFont({
  src: "./fonts/AtAero-Bold.woff2",
  variable: "--font-geist-sans-bold",
  weight: "700",
});

export const metadata: Metadata = constructMetadata({
  title: "Password Manager",
  description:
    "Password Manager",
  image: absoluteUrl("/og"),
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSansLight.variable} ${geistSansRegular.variable} ${geistSansMedium.variable} ${geistSansSemibold.variable} ${geistSansBold.variable}`}
        >
          <NextTopLoader
            color="linear-gradient(to right, #9353d3, #F38CB8, #FDCC92)"
            initialPosition={0.08}
            crawlSpeed={100}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={100}
          />
          <div className="page_ambientContainer__xFtyW utils_inert__sliHw">
            <div className="page_ambientLight___Dvmo utils_inert__sliHw">
              <div className="page_lightA__3_ZLn"></div>
              <div className="page_lightB__k6xoL"></div>
              <div className="page_lightC__9Yvpx"></div>
            </div>
          </div>
          <Provider>{children}</Provider>
        </body>
      </html>
    </SessionProvider>
  );
}
