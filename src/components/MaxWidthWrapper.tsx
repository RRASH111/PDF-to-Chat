import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({
    calssName,
    children
}:{
    calssName?: string,
    children: ReactNode
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', calssName)}>
        {children}
    </div>
  )
}

export default MaxWidthWrapper