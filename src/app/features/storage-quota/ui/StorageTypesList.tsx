import { useState } from 'react';
import { formatBytes } from '@/app/entities/cloudFile/lib/formatBytes';
import { StorageType, MousePosition } from '../types/types';

interface StorageTypesListProps {
    storageTypes: StorageType[];
    totalSpace: number;
}

export const StorageTypesList = ({ storageTypes, totalSpace }: StorageTypesListProps) => {
    const [mousePosition, setMousePosition] = useState<{ [key: string]: MousePosition }>({});
    const [currentBlock, setCurrentBlock] = useState<string | null>(null);
    const [opacity, setOpacity] = useState<{ [key: string]: number }>({});

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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, type: string) => {
        if (currentBlock !== type) return;
        
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({
            [type]: { x, y }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storageTypes.map((type) => {
                const percentage = (type.used / totalSpace) * 100;
                const mousePos = mousePosition[type.type] || { x: 0, y: 0 };
                const currentOpacity = opacity[type.type] ?? 0;
                
                return (
                    <div 
                        key={type.type}
                        data-type={type.type}
                        className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 group relative overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(type.type)}
                        onMouseLeave={() => handleMouseLeave(type.type)}
                        onMouseMove={(e) => handleMouseMove(e, type.type)}
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
    );
}; 