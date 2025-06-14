import { formatBytes } from '@/core/entities/cloudFile/lib/formatBytes';

interface StorageOverviewProps {
    totalSpace: number;
    usedSpace: number;
    freeSpace: number;
}

export const StorageOverview = ({ totalSpace, usedSpace, freeSpace }: StorageOverviewProps) => {
    const usedPercentage = (usedSpace / totalSpace) * 100;

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white mb-6">
            <div className="flex items-center justify-between mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <span className="text-sm font-medium">Всего {formatBytes(totalSpace)}</span>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold">{formatBytes(usedSpace)}</span>
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
                    <span className="text-blue-100">Свободно {formatBytes(freeSpace)}</span>
                </div>
            </div>
        </div>
    );
}; 