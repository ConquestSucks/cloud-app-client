'use client'

import React from "react";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import SearchBar from "./searchBar";
import { Avatar } from "@mui/material";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-[8] px-[12] gap-2">
            <div className="flex items-center">
                <CloudCircleIcon sx={{ width: "40px", height: "40px" }} />
                <span className="md:text-3xl">Хранилище</span>
            </div>
            <SearchBar />
            <Avatar sx={{ width: 40, height: 40 }} />
        </div>
    );
};

export default Navbar;
