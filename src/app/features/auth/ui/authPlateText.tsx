'use client'

import { Link } from '@mui/material'
import React from 'react'

const AuthPlateText = () => {
  return (
    <div className='flex flex-col gap-5 shrink-1 grow-1 basis-0'>
        <h1 className='text-5xl'>Вход</h1>
        <div className='flex flex-col gap-[4px]'>
            <span>Для входа вам потребуется получить логин в нашем телеграм боте</span>
            <Link href="https://t.me/dev_cloud_app_bot" target="_blank" rel="noopener noreferrer" className='w-fit'>Получить логин</Link>
        </div>
    </div>
  )
}

export default AuthPlateText