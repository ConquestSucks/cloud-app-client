'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { PostUserLogin } from '../api';

const AuthByLoginForm = () => {
    const [login, setLogin] = useState("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await PostUserLogin(login)
    }
    return (
        <form className='flex flex-col h-full w-fit items-center gap-3' onSubmit={handleSubmit}>
            <span>Для авторизации нужно получить логин по ссылке ниже</span>
            <Link href="https://t.me/dev_cloud_app_bot" className='w-100 h-20 text-blue-500 font-xxl' />
            <label className='flex gap-2'>
                Логин
                <input type='text' className='bg-white' onChange={(e) => setLogin(e.target.value)}></input>
            </label>
            <button type='submit'>Отправить</button>
        </form>
    )
}

export default AuthByLoginForm