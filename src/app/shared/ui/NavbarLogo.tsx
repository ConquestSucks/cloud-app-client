"use client"
import React from 'react'
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import { Typography } from "@mui/material";

const NavbarLogo = () => {
    return (
        <div className="flex items-center gap-2">
            <CloudCircleIcon sx={{ width: "36px", height: "36px", color: "primary.main" }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Cloud Storage
            </Typography>
        </div>
    )
}

export default NavbarLogo