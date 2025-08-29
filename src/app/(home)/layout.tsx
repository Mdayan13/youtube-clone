import React from 'react'
import { HomeLayout } from '@/modules/home/ui/layouts/home-layout'
const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <HomeLayout>
    {children}
    </HomeLayout>
  )
}

export default layout