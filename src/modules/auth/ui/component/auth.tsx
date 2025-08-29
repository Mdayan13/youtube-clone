"use client"
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Clapperboard, UserCircleIcon } from "lucide-react";
import React from "react";

const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              href="/studio"
              label="Studio"
              labelIcon={<Clapperboard className="size-4" />}
            />
            <UserButton.Action label="manageAccount" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="px-2 py-2 text-sm text-blue-400 hover:text-blue-500 shadow-none border-blue-500 rounded-full "
          >
            <UserCircleIcon />
            Sign-in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthButton;
