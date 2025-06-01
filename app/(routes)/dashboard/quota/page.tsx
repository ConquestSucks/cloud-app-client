'use client'

import DisplayStorageQuota from '@/app/features/storage-quota/ui/DisplayStorageQuota'
import PageTitle from '@/app/shared/ui/PageTitle'
import React from 'react'

const Quota = () => {
    return (
        <>
            <PageTitle title="Хранилище" />
            <div className="mt-8">
                <DisplayStorageQuota />
            </div>
        </>
    )
}

export default Quota