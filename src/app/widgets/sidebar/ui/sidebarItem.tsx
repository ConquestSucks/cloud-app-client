"use client"
import React from 'react';
import SideBarItemProps from '../model/types';
import Link from 'next/link';


const SidebarItem = ({ title, icon: Icon, href }: SideBarItemProps) => {
    return (
        <Link href={`/dashboard/${href}`} className='flex gap-[14] items-center rounded-[100] hover:bg-black px-3 py-2 cursor-pointer'>
            <Icon style={{ fontSize: 24 }} />
            <span>{title}</span>
        </Link>
    );
};

export default SidebarItem;
