"use client"
import React from 'react';
import SideBarItemProps from '../model/types';
import Link from 'next/link';

const SidebarItem = ({ title, icon: Icon, href }: SideBarItemProps) => {
    return (
        <Link 
            href={`/dashboard/${href}`} 
            className='flex gap-4 items-center rounded-xl hover:bg-slate-50 px-4 py-2.5 cursor-pointer min-w-[214px] text-slate-600 hover:text-blue-600 transition-colors'
        >
            <Icon style={{ fontSize: 22, color: 'inherit' }} />
            <span className="font-medium">{title}</span>
        </Link>
    );
};

export default SidebarItem;
