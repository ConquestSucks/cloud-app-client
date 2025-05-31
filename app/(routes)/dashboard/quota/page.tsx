import DisplayStorageQuota from '@/app/features/storage-quota/ui/displayStorageQuota'
import PageTitle from '@/app/shared/ui/pageTitle'
import React from 'react'

const Quota = () => {
    return (
        <div className='dashboard-page'>
            <PageTitle title="Хранилище" />
            <DisplayStorageQuota />
        </div>
    )
}

export default Quota