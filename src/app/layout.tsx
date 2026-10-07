import type { Metadata } from "next";
import {
  Arvo,
  Bitter,
  Cormorant_Garamond,
  Instrument_Serif,
  Outfit,
  Sacramento,
} from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { t } from "@/i18n/messages";
import "./globals.css";

const arvo = Arvo({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-arvo",
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sacramento",
});

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: t("brand.name"),
    template: `%s · ${t("brand.name")}`,
  },
  description: t("hero.slogan"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${arvo.variable} ${sacramento.variable} ${bitter.variable} ${outfit.variable} ${cormorant.variable} ${instrument.variable}`}
    >
      <body className="flex min-h-screen min-w-0 flex-col bg-paper font-body text-muted antialiased">
        <SiteHeader />
        <main className="w-full min-w-0 flex-1 pb-24">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
