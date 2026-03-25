import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//@ts-ignore
import "./globals.css";
import Navbar from "@/_components/fixed-components/NavBar/navbar";
import Footer from "@/_components/fixed-components/footer/footer";
import SideBar from "@/_components/fixed-components/SideBar/SideBar";
import { SidebarInset, SidebarProvider } from "../_components/ui/sidebar";
import { DrawerDemo } from "./(pages)/contact/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AquaPuer",
  description: "Clean Water, Smart Monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={false}>
          <SideBar />
          <SidebarInset>
            <Navbar />
            {children}
            <Footer />
           
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
