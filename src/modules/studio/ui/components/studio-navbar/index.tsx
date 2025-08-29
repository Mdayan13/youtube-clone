import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthButton from "@/modules/auth/ui/component/auth";
import { StudioUpload } from "../studio-upload";

export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md ">
      <div className="flex items-center gap-4 w-full">
        {/* menu and logo */}
        <div className="flex items-center gap-2  flex-shrink-0">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="flex items-center gap-1">
              <Image src="/logo.svg" height={32} alt="logo" width={32} />
              <p className="text-xl font-semibold tracking-tight">Studio!</p>
            </div>
          </Link>
        </div>
        {/* serach bar  */}
        <div className=" flex-1 " />
        <div className="flex space-x-4 items-center ">
          <StudioUpload />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
