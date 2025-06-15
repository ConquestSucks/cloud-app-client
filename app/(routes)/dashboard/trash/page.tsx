import DisplayFileList from '@/app/entities/cloudFile/ui/get-files/DisplayFileList'
import PageTitle from '@/app/shared/ui/PageTitle'
import React from 'react'

const Trash = () => {
    return (
        <div className='dashboard-page relative w-full h-full flex flex-col'>
            <PageTitle title="Корзина" />
            <div className="flex-grow mt-8">
                <DisplayFileList deleted={true}/>
            </div>
        </div>
    )
}

export default Trash