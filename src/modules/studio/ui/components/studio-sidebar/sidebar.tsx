"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {StudioSidebarHeader} from "./studio-sidebar-header";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOutIcon, VideoIcon } from "lucide-react";
const HomeSidebar = () => {
  const pathname =  usePathname();
  return (
    <Sidebar collapsible="icon" className="pt-16 z-40 border-none">
      <StudioSidebarHeader />
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/studio"}
                tooltip="Exit Studio"
                asChild
              >
                <Link href="/studio">
                <VideoIcon  className="size-5"/>
                <span className="text-sm">Content</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/studio"}
                tooltip="Exit Studio"
                asChild
              >
                <Link href="/">
                <LogOutIcon className="size-5" />
                <span className="text-sm">Exit Studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSidebar;
