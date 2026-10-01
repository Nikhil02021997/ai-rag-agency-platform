import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import WhatsAppButton from "@/components/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nisuvmarketing.com"),
  title: {
    default: "NISUV Marketing — AI & Digital Growth Agency",
    template: "%s | NISUV Marketing",
  },
  description:
    "NISUV Marketing builds AI-powered digital experiences, growth campaigns, and web products for brands that want to move faster than their competitors.",
  openGraph: {
    title: "NISUV Marketing — AI & Digital Growth Agency",
    description:
      "AI-powered digital experiences, growth campaigns, and web products.",
    url: "https://nisuvmarketing.com",
    siteName: "NISUV Marketing",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.classList.remove("dark","light");document.documentElement.classList.add(t);}}catch(e){}})();`}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <WhatsAppButton />
      </body>
    </html>
  );
}