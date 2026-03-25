"use client";
import logo from "../../../Project photos/logo.png"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beaker, Bell, Cpu, Gauge, Home, LogIn, Microscope, Waves } from "lucide-react";
import { SidebarTrigger } from "@/_components/ui/sidebar";
// navbar items & icons & links
const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Sensors", href: "/sensors", icon: Waves },
  { label: "Control", href: "/control", icon: Gauge },
  { label: "Ai", href: "/ai", icon: Cpu },
  { label: "Prototype", href: "/prototype", icon: Beaker },
  { label: "Reports", href: "/reports", icon: Microscope },
  { label: "Alerts", href: "/alerts", icon: Bell },
  { label: "Login", href: "/login", icon: LogIn },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarTrigger className="fixed top-3 left-3 z-50 text-white hover:bg-white/15 md:hidden" />

      <header className="sticky top-0 z-50 hidden border-b border-white/20 bg-[#6f89b8]/95 backdrop-blur md:block">
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:gap-8 sm:px-6">
          <SidebarTrigger className="text-white hover:bg-white/15" />
          <Link href="/" className="mr-4 flex shrink-0 items-center sm:mr-8">
            <Image
              src={logo}
              alt="SmarterWater"
              width={300}
              height={200}
              className="h-24 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          <div className="no-scrollbar flex min-w-0 flex-1 items-center justify-start gap-3 overflow-x-auto py-2 sm:justify-center sm:gap-4 lg:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-1 rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                    isActive ? "bg-blue-900 text-[#4f74b6]" : "text-white hover:bg-white/15"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
    </>
  );
}
