import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { OutlinedInput, InputAdornment, useTheme, Box } from "@mui/material";

const SearchBar = () => {
    const theme = useTheme();
    return (
        <Box component="form" sx={{ width: { xs: '100%', sm: 300, md: 400 } }}>
            <OutlinedInput
                fullWidth
                size="small"
                sx={{
                    borderRadius: '20px',
                    backgroundColor: theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.grey[800],
                    transition: 'box-shadow 0.3s, background-color 0.3s',
                    fontSize: '0.9rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.35)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '1px',
                    },
                    '&.Mui-focused': {
                        backgroundColor: theme.palette.background.paper,
                    }
                }}
                placeholder="Поиск…"
                startAdornment={ (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                )}
                inputProps={{ 'aria-label': 'поиск' }}
            />
        </Box>
    );
};

export default SearchBar;
