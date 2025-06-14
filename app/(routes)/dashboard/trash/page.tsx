import DisplayFileList from '@/core/entities/cloudFile/ui/get-files/DisplayFileList'
import PageTitle from '@/app/shared/ui/PageTitle'
import React from 'react'

const Trash = () => {
    return (
        <div className='dashboard-page'>
            <PageTitle title="Корзина" />
            <div className="flex-1 mt-8">
                <DisplayFileList deleted={true}/>
            </div>
        </div>
    )
}

export default Trash