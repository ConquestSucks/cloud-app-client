'use client'

import React from "react";
import SearchBar from "./SearchBar";
import { Avatar } from "@mui/material";
import NavbarLogo from "@/app/shared/ui/NavbarLogo";

const DashboardNavbarComponent = () => {
    return (
        <div className="flex items-center py-[8] px-[12] gap-2 min-h-fit bg-white shadow-sm">
            <NavbarLogo />
            <SearchBar />
            <Avatar sx={{ width: 40, height: 40, marginLeft: "auto", bgcolor: '#1976d2' }} />
        </div>
    );
};

export default DashboardNavbarComponent;
