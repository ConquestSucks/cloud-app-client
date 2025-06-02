'use client'

import React from "react";
import SearchBar from "./SearchBar";
import { Avatar, AppBar, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";
import NavbarLogo from "@/app/shared/ui/NavbarLogo";

const DashboardNavbarComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static" sx={{ 
            backgroundColor: 'background.paper', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            color: 'text.primary' 
        }}>
            <Toolbar sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingX: { xs: 2, sm: 3 } // Адаптивные отступы по горизонтали
            }}>
                <NavbarLogo />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    {!isMobile && <SearchBar />} {/* Скрываем SearchBar на мобильных устройствах для начала, можно будет добавить иконку поиска */} 
                    <Avatar 
                        sx={{ 
                            width: { xs: 32, sm: 40 }, // Адаптивный размер аватара
                            height: { xs: 32, sm: 40 }, 
                            bgcolor: 'primary.main', 
                            color: 'white' 
                        }}
                    />
                </Box>
            </Toolbar>
            {isMobile && (
                <Toolbar sx={{ paddingX: { xs: 2, sm: 3 }, paddingBottom: 1, justifyContent: 'center' }}>
                    <SearchBar /> {/* Показываем SearchBar под лого/аватаром на мобильных */} 
                </Toolbar>
            )}
        </AppBar>
    );
};

export default DashboardNavbarComponent;
