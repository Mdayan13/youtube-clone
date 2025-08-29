import React from 'react'
import { StudioLayout } from '@/modules/studio/ui/layout/stud-layout'
const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <StudioLayout>
    {children}
    </StudioLayout>
  )
}

export default layout