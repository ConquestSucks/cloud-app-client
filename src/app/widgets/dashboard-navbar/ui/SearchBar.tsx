import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
    return (
        <div className="flex items-center rounded-3xl text-black h-[48] max-w-[45%] bg-gray-100 grow">
            <SearchIcon sx={{ fill: "#171717", width: "25px", height: "25px", margin: "0 10px 0 10px" }}/>
            <input placeholder="Поиск" className="outline-none h-[20] w-9/10 bg-transparent placeholder:text-gray-500 text-black"/>
        </div>
    );
};

export default SearchBar;
