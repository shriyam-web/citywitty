import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Layout/Navigation";
import Footer from "@/components/Layout/Footer";

// Dynamically import interactive components with SSR disabled
const WhatsAppWidget = dynamic(
  () => import("@/components/Widgets/WhatsAppWidget"),
  {
    ssr: false,
  }
);

const CallWidget = dynamic(() => import("@/components/Widgets/CallWidget"), {
  ssr: false,
});

const StickyCTABar = dynamic(() => import("@/components/Layout/StickyCTABar"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CityWitty - Your Premium Discount Card ",
  description:
    "Get exclusive discounts and offers with CityWitty Card across your favorite merchants in the city.",
  keywords: "city card, discounts, offers, merchants, subscription",
  authors: [{ name: "CityWitty Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <Navigation />
          <main className="main-content">{children}</main>
          <Footer />
          <WhatsAppWidget />
          <CallWidget />
          <StickyCTABar />
        </AppProvider>
      </body>
    </html>
  );
}
