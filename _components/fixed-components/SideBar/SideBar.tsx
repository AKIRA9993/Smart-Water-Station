import React from "react";
import {
  Beaker,
  Bell,
  Cpu,
  Gauge,
  Home,
  LogIn,
  Microscope,
  Waves,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../_components/ui/sidebar";

const menu_items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Sensors", href: "/sensors", icon: Waves },
  { label: "Control", href: "/control", icon: Gauge },
  { label: "Ai", href: "/ai", icon: Cpu },
  { label: "Prototype", href: "/prototype", icon: Beaker },
  { label: "Reports", href: "/reports", icon: Microscope },
  { label: "Alerts", href: "/alerts", icon: Bell },
  { label: "Login", href: "/login", icon: LogIn },
];
export default function SideBar() {
  return (
      <Sidebar variant="sidebar">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>AquaPuer 🌊</SidebarGroupLabel>
            <SidebarMenu>
              {menu_items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
  );
}
