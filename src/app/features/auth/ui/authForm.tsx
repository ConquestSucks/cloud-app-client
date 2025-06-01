"use client";

import { Button, Link, styled, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePostUserLogin } from "../hooks/usePostUserLogin";
import { LoginData } from "../model/types";
import { useRouter } from "next/navigation";

const CustomTextField = styled(TextField)({
    '& input': {
        color: '#171717',
    },
    '& label': {
        color: '#666666',
    },
    '& label.Mui-focused': {
        color: '#1976d2',
        transition: "0.4s"
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#ffffff',
        '& fieldset': {
            borderColor: '#666666',
            transition: "0.4s"
        },
        '&:hover fieldset': {
            borderColor: "#1976d2",
            transition: "0.4s"
        },
        '&.Mui-focused fieldset': {
            borderColor: "#1976d2",
            transition: "0.4s"
        },
    },
});

const CustomButton = styled(Button)({
    backgroundColor: '#1976d2',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#1565c0',
    },
    '&.Mui-disabled': {
        backgroundColor: '#e0e0e0',
        color: '#9e9e9e',
    },
});

const AuthForm = () => {
    const router = useRouter();
    const { mutate, error, isPending } = usePostUserLogin(router);
    const [login, setLogin] = useState("")
    const [validationError, setValidationError] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData: LoginData = {
            login: login,
        };

        if (formData.login.length !== 17) {
            setValidationError("Неверный формат логина")
            return;
        }

        setValidationError("");
        mutate(formData);
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <form className="flex flex-col justify-center flex-center gap-12 shrink-1 grow-1 basis-0" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <CustomTextField
                    id="outlined-basic"
                    name="login"
                    label="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    autoComplete="off"
                    variant="outlined"
                    className="border-white"
                />
                <Link href="/" target="_blank" rel="noopener noreferrer" className="w-fit">Проблемы с получением логина</Link>
            </div>
            <CustomButton type="submit" variant="contained" disabled={isPending}>
                {isPending && !error ? "Загрузка" : "Далее"}
            </CustomButton>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden text-red-100
                    ${isMounted && (error || isPending || validationError)
                        ? "max-h-20 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2"
                    }`}
            >
                {validationError && !error && <span>{validationError}</span>}
                {!error && isPending && <span>Подтвердите вход в телеграме</span>}
                {error && error.response && error.response.data && error.response.data.error && <span>Ошибка: {error.response.data.error}</span>}
            </div>
        </form>
    );
};

export default AuthForm;
