"use client"
import React from 'react'
import CloudCircleIcon from "@mui/icons-material/CloudCircle";

const NavbarLogo = () => {
    return (
        <div className="flex items-center">
            <CloudCircleIcon sx={{ width: "40px", height: "40px" }} />
            <span className="md:text-3xl">Хранилище</span>
        </div>
    )
}

export default NavbarLogo