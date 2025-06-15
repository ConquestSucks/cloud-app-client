"use client"
import React from 'react';
import SideBarItemProps from '../model/types';
import Link from 'next/link';

const SidebarItem = ({ title, icon: Icon, href, isActive }: SideBarItemProps & { isActive?: boolean }) => {
    const baseClasses = 'flex gap-4 items-center rounded-xl px-4 py-2.5 cursor-pointer min-w-[214px] transition-colors';
    const inactiveClasses = 'text-slate-600 hover:bg-slate-50 hover:text-blue-600';
    const activeClasses = 'bg-blue-50 text-blue-600';

    return (
        <Link 
            href={`/dashboard/${href}`} 
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <Icon style={{ fontSize: 22, color: 'inherit' }} />
            <span className="font-medium">{title}</span>
        </Link>
    );
};

export default SidebarItem;
