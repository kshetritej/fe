import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next";
import CTA from "@/components/cta";
import { nunitoSans, outfit } from "@/lib/font";
import { siteConfig } from "@/lib/siteConfig";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Essence Treks",
  description: "Created by Growfore Solution",
  openGraph: {
    siteName: siteConfig.name,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Navigation />
        {children}
        <Analytics />
        <CTA />
        <Footer />
      </body>
    </html>
  );
}
