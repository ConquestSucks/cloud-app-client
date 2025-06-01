"use client"
import React from 'react';
import SideBarItemProps from '../model/types';
import Link from 'next/link';


const SidebarItem = ({ title, icon: Icon, href }: SideBarItemProps) => {
    return (
        <Link href={`/dashboard/${href}`} className='flex gap-4 items-center rounded-full hover:bg-blue-50 px-3 py-2 cursor-pointer min-w-[214px] text-gray-700 hover:text-blue-600'>
            <Icon style={{ fontSize: 24, color: 'inherit' }} />
            <span>{title}</span>
        </Link>
    );
};

export default SidebarItem;
