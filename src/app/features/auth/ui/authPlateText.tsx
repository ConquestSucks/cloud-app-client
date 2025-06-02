'use client'

import { Link, Typography, Box } from '@mui/material'
import React from 'react'
import LoginIcon from '@mui/icons-material/Login';

const AuthPlateText = () => {
  return (
    <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            flexBasis: '0',
            flexGrow: 1,
            flexShrink: 1,
        }}
    >
        <Typography 
            variant="h3" 
            component="h1" 
            sx={{
                fontWeight: 'bold',
                color: 'primary.dark',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
            }}
        >
            <LoginIcon sx={{ fontSize: '2.8rem' }} />
            Вход
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body1" color="text.secondary">
                Для входа вам потребуется получить логин в нашем телеграм боте.
            </Typography>
            <Link 
                href="https://t.me/dev_cloud_app_bot" 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{
                    width: 'fit-content',
                    fontWeight: 'medium',
                }}
            >
                Получить логин
            </Link>
        </Box>
    </Box>
  )
}

export default AuthPlateText