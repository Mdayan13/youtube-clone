import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from "./serach-input"
import AuthButton from "@/modules/auth/ui/component/auth"

export const HomeNavbar = () => {
  return (
    <nav className='fixed top-0 right-0 left-0 h-16 bg-white flex items-center px-2 pr-5 z-50 '>
        <div className='flex items-center gap-4 w-full'>
            {/* menu and logo */}
            <div className="flex items-center gap-2  flex-shrink-0">
                <SidebarTrigger />
                <Link href="/">
                <div className='flex items-center gap-1'>
                    <Image src="/logo.svg" height={32} alt='logo' width={32}/>
                    <p className='text-xl font-semibold tracking-tight'>YouTube!</p>
                </div>
                </Link>
            </div>
            {/* serach bar  */}
            <div className='flex flex-1 justify-center mx-w-[720px] mx-auto'>
                 <SearchInput />
            </div>
            <div>
            <AuthButton/>
            </div>
        </div>
    </nav>
  )
}
