import PageTitle from '@/app/shared/ui/PageTitle'
import React from 'react'

const Shared = () => {
    return (
        <div className='dashboard-page'>
            <PageTitle title="Доступные мне" />
            <div className="flex-1 mt-8">
                {/* Контент страницы */}
            </div>
        </div>
    )
}

export default Shared