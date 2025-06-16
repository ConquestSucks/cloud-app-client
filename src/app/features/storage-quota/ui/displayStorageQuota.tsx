'use client'

import React from 'react';
import { StorageOverview } from './StorageOverview';
import { StorageTypesList } from './StorageTypesList';
import { StorageWarning } from './StorageWarning';
import { STORAGE_TYPES } from '../config/storageConfig';
import { useGetUserQuota } from '../hooks/useGetUserQuota';
import { useUser } from '@/app/contexts/UserContext';

const DisplayStorageQuota = () => {
    const { userData, isUserLoading: isUserDataLoading } = useUser();
    const { data: quotaData, isLoading: isQuotaDataLoading } = useGetUserQuota();

    if (isUserDataLoading || isQuotaDataLoading) {
        return (
            <div>
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

    const storageTypesWithData = STORAGE_TYPES.map(type => ({
        ...type,
        used: quotaData.find(q => q.fileType === type.type)?.totalSize || 0
    }));

    const usedPercentage = (userData.diskSpaceOccupied / userData.diskSpace) * 100;

    return (
        <div>
            <StorageOverview
                totalSpace={userData.diskSpace}
                usedSpace={userData.diskSpaceOccupied}
                freeSpace={userData.freeDiskSpace}
            />
            <StorageTypesList
                storageTypes={storageTypesWithData}
                totalSpace={userData.diskSpace}
            />
            <StorageWarning show={usedPercentage > 90} />
        </div>
    );
};

export default DisplayStorageQuota;
