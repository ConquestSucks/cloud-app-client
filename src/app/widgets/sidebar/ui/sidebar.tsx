import React from 'react';
import SidebarItem from './sidebarItem';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';

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
];

function Sidebar() {
    return (
        <div className='flex flex-col min-w-[240px]'>
           {data.map(item => (
            <SidebarItem key={item.id} title={item.title} icon={item.icon} href={item.href} />
           ))} 
        </div>
    )
}

export default Sidebar