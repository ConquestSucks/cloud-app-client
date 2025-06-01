import DisplayFileList from '@/app/entities/cloudFile/ui/get-files/DisplayFileList'
import PageTitle from '@/app/shared/ui/PageTitle'
import React from 'react'

const Trash = () => {
    return (
        <div className='dashboard-page'>
            <PageTitle title="Корзина" />
            <DisplayFileList deleted={true}/>
        </div>
    )
}

export default Trash