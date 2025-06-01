'use client'

import React, { useState, useEffect } from 'react';
import { formatBytes } from '@/app/entities/cloudFile/lib/formatBytes';
import { useQuery } from '@tanstack/react-query';
import { getSelfUser } from '../api/getSelfUser';
import { getUserQuota } from '../api/getUserQuota';

interface StorageType {
    type: string;
    used: number;
    color: string;
    bgColor: string;
    icon: React.ReactNode;
}

interface MousePosition {
    x: number;
    y: number;
}

const DisplayStorageQuota = () => {
    const [mousePosition, setMousePosition] = useState<{ [key: string]: MousePosition }>({});
    const [currentBlock, setCurrentBlock] = useState<string | null>(null);
    const [opacity, setOpacity] = useState<{ [key: string]: number }>({});

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ['selfUser'],
        queryFn: getSelfUser
    });

    const { data: quotaData, isLoading: isQuotaLoading } = useQuery({
        queryKey: ['userQuota'],
        queryFn: getUserQuota
    });

    useEffect(() => {
        const updateGlow = (e: MouseEvent) => {
            if (!currentBlock) return;
            
            const element = document.querySelector(`[data-type="${currentBlock}"]`) as HTMLElement;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setMousePosition({
                    [currentBlock]: { x, y }
                });
            }
        };

        window.addEventListener('mousemove', updateGlow);
        return () => window.removeEventListener('mousemove', updateGlow);
    }, [currentBlock]);

    const handleMouseEnter = (type: string) => {
        setCurrentBlock(type);
        setOpacity(prev => ({
            ...prev,
            [type]: 1
        }));
    };

    const handleMouseLeave = (type: string) => {
        setOpacity(prev => ({
            ...prev,
            [type]: 0
        }));
        setTimeout(() => {
            if (opacity[type] === 0) {
                setCurrentBlock(null);
                setMousePosition(prev => {
                    const newPos = { ...prev };
                    delete newPos[type];
                    return newPos;
                });
            }
        }, 500);
    };

    if (isUserLoading || isQuotaLoading) {
        return (
            <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white mb-6 animate-pulse">
                    <div className="h-32"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                            <div className="h-24"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!userData || !quotaData) return null;

    const storageTypes: StorageType[] = [
        {
            type: 'Изображения',
            used: quotaData.find(q => q.fileType === 'Изображения')?.totalSize || 0,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            type: 'Видео',
            used: quotaData.find(q => q.fileType === 'Видео')?.totalSize || 0,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 10L19.553 7.724C20.449 7.276 21.5 7.925 21.5 8.929V15.071C21.5 16.075 20.449 16.724 19.553 16.276L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            type: 'Документы',
            used: quotaData.find(q => q.fileType === 'Документы')?.totalSize || 0,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 21H17C18.1046 21 19 20.1046 19 19V9.41421C19 9.149 18.8946 8.89464 18.7071 8.70711L13.2929 3.29289C13.1054 3.10536 12.851 3 12.5858 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9H13M9 13H15M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            type: 'Архивы',
            used: quotaData.find(q => q.fileType === 'Архивы')?.totalSize || 0,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8H19M5 8C3.89543 8 3 7.10457 3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6C21 7.10457 20.1046 8 19 8M5 8L5 18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V8M10 12H14" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            type: 'Прочее',
            used: quotaData.find(q => q.fileType === 'Прочее')?.totalSize || 0,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7H19M5 7C3.89543 7 3 6.10457 3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5C21 6.10457 20.1046 7 19 7M5 7L5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7M9 11H15M9 15H13" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    const usedPercentage = (userData.diskSpaceOccupied / userData.diskSpace) * 100;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Основная информация */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white mb-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                        <span className="text-sm font-medium">Всего {formatBytes(userData.diskSpace)}</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold">{formatBytes(userData.diskSpaceOccupied)}</span>
                        <span className="text-lg text-blue-100 mb-1">использовано</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white transition-all duration-300"
                            style={{ width: `${usedPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-blue-100">Использовано {usedPercentage.toFixed(1)}%</span>
                        <span className="text-blue-100">Свободно {formatBytes(userData.freeDiskSpace)}</span>
                    </div>
                </div>
            </div>

            {/* Типы файлов */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storageTypes.map((type) => {
                    const percentage = (type.used / userData.diskSpace) * 100;
                    const mousePos = mousePosition[type.type] || { x: 0, y: 0 };
                    const currentOpacity = opacity[type.type] ?? 0;
                    
                    return (
                        <div 
                            key={type.type}
                            data-type={type.type}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 group relative overflow-hidden"
                            onMouseEnter={() => handleMouseEnter(type.type)}
                            onMouseLeave={() => handleMouseLeave(type.type)}
                            style={{
                                background: mousePos.x || mousePos.y ? 
                                    `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${type.color === 'text-blue-600' ? '59, 130, 246' : 
                                        type.color === 'text-purple-600' ? '147, 51, 234' : 
                                        type.color === 'text-emerald-600' ? '16, 185, 129' : 
                                        type.color === 'text-amber-600' ? '217, 119, 6' : 
                                        '75, 85, 99'}, ${0.12 * currentOpacity}), transparent 40%)` : 
                                    'white',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`${type.bgColor} ${type.color} p-3 rounded-xl`}>
                                            {type.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{type.type}</h3>
                                            <p className="text-sm text-gray-500">{formatBytes(type.used)}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {percentage.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-300 ${type.bgColor} group-hover:brightness-110 shadow-lg`}
                                        style={{ 
                                            width: `${percentage}%`,
                                            background: `linear-gradient(90deg, ${type.color === 'text-blue-600' ? 'rgb(59, 130, 246)' : 
                                                type.color === 'text-purple-600' ? 'rgb(147, 51, 234)' : 
                                                type.color === 'text-emerald-600' ? 'rgb(16, 185, 129)' : 
                                                type.color === 'text-amber-600' ? 'rgb(217, 119, 6)' : 
                                                'rgb(75, 85, 99)'} 0%, ${type.color === 'text-blue-600' ? 'rgb(37, 99, 235)' : 
                                                type.color === 'text-purple-600' ? 'rgb(126, 34, 206)' : 
                                                type.color === 'text-emerald-600' ? 'rgb(5, 150, 105)' : 
                                                type.color === 'text-amber-600' ? 'rgb(180, 83, 9)' : 
                                                'rgb(55, 65, 81)'} 100%)`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Предупреждение */}
            {usedPercentage > 90 && (
                <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="text-red-600 bg-red-100 p-2 rounded-lg">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-medium text-red-900">Внимание!</h4>
                            <p className="text-sm text-red-600">
                                Ваше хранилище почти заполнено. Рекомендуем освободить место.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayStorageQuota;
