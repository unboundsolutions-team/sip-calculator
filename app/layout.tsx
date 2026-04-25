import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UnboundWealth - SIP, SWP and Retirement Planning",
  description:
    "UnboundWealth helps you calculate SIP returns, plan SWP withdrawals, and model your retirement lifecycle with a guided financial planning experience.",
  keywords: ["UnboundWealth", "SIP calculator", "SWP calculator", "mutual fund", "retirement planning", "India", "DPDP Act"],
  openGraph: {
    title: "UnboundWealth",
    description: "Creative, guided planning for SIP growth, SWP withdrawals, and retirement lifecycle decisions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body className="bg-white text-[#0d2338] font-sans antialiased min-h-screen">
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
