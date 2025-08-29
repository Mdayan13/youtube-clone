import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import React from "react";
import { Mainsection } from "./Mainsection";
import { Personal } from "./personal-section";
import { Separator } from "@/components/ui/separator";
const HomeSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="pt-16 z-40 border-none">
      <SidebarContent  className="bg-background">
        <Mainsection />
        <Separator />
        <Personal />
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSidebar;
