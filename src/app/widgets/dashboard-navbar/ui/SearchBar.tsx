import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
    return (
        <div className="flex items-center rounded-3xl text-black h-[48] max-w-[45%] bg-[#282A2C] grow text-white">
            <SearchIcon sx={{ fill: "white", width: "25px", height: "25px", margin: "0 10px 0 10px" }}/>
            <input placeholder="Поиск" className="outline-none h-[20] w-9/10 placeholder:text-white"/>
        </div>
    );
};

export default SearchBar;
