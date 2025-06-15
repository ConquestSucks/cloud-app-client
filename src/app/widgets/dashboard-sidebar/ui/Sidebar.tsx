'use client';

import React from 'react';
import SidebarItem from './SidebarItem';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { usePathname } from 'next/navigation';

const data = [
  {
    id: 1,
    title: 'Главная',
    icon: HomeFilledIcon,
    href: "home"
  },
  {
    id: 2,
    title: 'Доступные мне',
    icon: FolderSharedIcon,
    href: "shared-with-me"
  },
  {
    id: 3,
    title: 'Недавние',
    icon: ScheduleIcon,
    href: "recent"
  },
  {
    id: 4,
    title: 'Избранное',
    icon: FavoriteBorderIcon,
    href: "starred"
  },
    {
    id: 5,
    title: 'Корзина',
    icon: DeleteIcon,
    href: "trash"
  },
  {
    id: 6,
    title: 'Хранилище',
    icon: CloudDoneIcon,
    href: "quota"
  },
];

const DashboardSidebarComponent = () => {
    const pathname = usePathname();

    return (
        <div className='flex flex-col bg-white rounded-2xl p-2 h-fit shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm border border-slate-100'>
           {data.map(item => {
            const isActive = pathname.endsWith(item.href)
            return <SidebarItem key={item.id} title={item.title} icon={item.icon} href={item.href} isActive={isActive} />
           })} 
        </div>
    )
}

export default DashboardSidebarComponent