"use client";

import { Button, Link, styled, TextField } from "@mui/material";
import React from "react";

const AuthForm = () => {
    const CustomTextField = styled(TextField)({
  '& label': {
    color: 'gray',
  },
  '& label.Mui-focused': {
    transition: '0.3s'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'gray',
      transition: '0.3s'
    },
    '&:hover fieldset': {
      borderColor: 'none',
      transition: '0.3s'
    },
    '&.Mui-focused fieldset': {
      
    },
  },
});

  return (
    <form className="flex flex-col justify-center flex-center gap-12 shrink-1 grow-1 basis-0">
      <div className="flex flex-col gap-2">
        <CustomTextField 
          id="outlined-basic"
          label="Логин"
          variant="outlined"
          className="border-white"
        />
        <Link href="/" target="_blank" rel="noopener noreferrer" className="w-fit">Проблемы с получением логина</Link>
      </div>
      <Button variant="contained" href="#contained-buttons">
        Далее
      </Button>
    </form>
  );
};

export default AuthForm;
