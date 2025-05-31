'use client'

import NavbarLogo from '@/app/shared/ui/navbarLogo'
import { Button } from '@mui/material'
import React from 'react'

const HomeNavbarComponent = () => {
  return (
    <div className='flex justify-between p-[12]'>
        <NavbarLogo />
        <Button variant="contained" href='/auth'>Войти</Button>
    </div>
  )
}

export default HomeNavbarComponent