"use client";

import { Button, TextField, Box, CircularProgress, Alert } from "@mui/material";
import React, { useState } from "react";
import { usePostUserLogin } from "../hooks/usePostUserLogin";
import { LoginData } from "../model/types";
import { useRouter } from "next/navigation";
import TextMaskAdapter from "@/core/shared/ui/TextMaskAdapter";
import { checkIsUserExists } from "../api/checkIsUserExists";
import { AxiosError } from "axios";

interface ErrorResponse {
    error?: string;
}

const AuthForm = () => {
    const router = useRouter();
    const { mutate: loginMutate, error: loginError, isPending: isLoginPending } = usePostUserLogin(router);
    const [login, setLogin] = useState("");
    const [validationError, setValidationError] = useState("");
    const [isCheckingUser, setIsCheckingUser] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const expectedFormat = /^\d{12}-[a-zA-Z]{4}$/;
        setValidationError("");

        if (login.trim().length === 0) {
            setValidationError("Логин не может быть пустым.");
            return;
        } 
        if (!expectedFormat.test(login)) {
            setValidationError("Логин не заполнен полностью или имеет неверный формат.");
            return;
        }

        setIsCheckingUser(true);
        const userExists = await checkIsUserExists(login);
        setIsCheckingUser(false);

        if (!userExists) {
            setValidationError("Пользователь с таким логином не найден.");
            return;
        }

        const formData: LoginData = {
            login: login,
        };
        loginMutate(formData);
    };

    const isLoading = isCheckingUser || isLoginPending;

    let feedbackMessage: React.ReactNode = null;
    let feedbackSeverity: "error" | "info" | "success" | "warning" = "info";

    const axiosLoginError = loginError as AxiosError<ErrorResponse> | null;

    if (validationError) {
        feedbackMessage = validationError;
        feedbackSeverity = "error";
    } else if (axiosLoginError?.response?.status === 408) {
        feedbackMessage = "Время ожидания подтверждения в Telegram истекло. Попробуйте снова.";
        feedbackSeverity = "error";
    } else if (axiosLoginError && axiosLoginError.response?.data?.error) {
        feedbackMessage = `Ошибка: ${axiosLoginError.response.data.error}`;
        feedbackSeverity = "error";
    } else if (loginError) {
        feedbackMessage = "Произошла неизвестная ошибка при входе.";
        feedbackSeverity = "error";
    } else if (isLoginPending) {
        feedbackMessage = "Подтвердите вход в телеграме...";
        feedbackSeverity = "info";
    } else if (isCheckingUser) {
        feedbackMessage = "Проверка пользователя...";
        feedbackSeverity = "info";
    }

    return (
        <Box 
            component="form" 
            noValidate
            onSubmit={handleSubmit} 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 3,
                flexBasis: '0',
                flexGrow: 1,
                flexShrink: 1,
                width: '100%'
            }}
        >
            <TextField
                id="login-textfield"
                name="login"
                label="Логин"
                placeholder="893451977335-ziye"
                value={login}
                onChange={(event) => {
                    setLogin(event.target.value);
                    if (validationError) setValidationError("");
                }}
                autoComplete="off"
                variant="outlined"
                required
                fullWidth
                disabled={isLoading}
                error={!!validationError || (!!loginError && !isLoginPending && !isCheckingUser)}
                InputProps={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    inputComponent: TextMaskAdapter as any,
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: 'primary.light',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                        },
                    },
                    '& label.Mui-focused': {
                        color: 'primary.main',
                    },
                }}
            />
            
            <Button 
                type="submit" 
                variant="contained" 
                disabled={isLoading}
                fullWidth
                size="large"
                sx={{
                    py: 1.5,
                    fontWeight: 'medium',
                    textTransform: 'none',
                    fontSize: '1.05rem'
                }}
            >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Войти"}
            </Button>

            {feedbackMessage && (
                <Alert severity={feedbackSeverity} sx={{ mt: 1 }}>
                    {feedbackMessage}
                </Alert>
            )}
        </Box>
    );
};

export default AuthForm;
