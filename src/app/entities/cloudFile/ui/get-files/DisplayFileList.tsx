import React, { useState } from 'react'
import { useGetFiles } from '../../hooks/useGetFiles'
import FileItem from '../file-item/FileItem';
import { Pagination } from '@mui/material';

const DisplayFileList = () => {
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 7;
    const { data } = useGetFiles(page, PAGE_SIZE);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className='flex flex-col gap-5 lg:h-fit'>
            <div className='flex flex-col gap-3 overflow-visible p-1'>
                {data?.files.map(item => (
                    <div key={item.id} className="overflow-visible">
                        <FileItem data={item} />
                    </div>
                ))}
            </div>
            <Pagination 
                color="primary" 
                count={data?.headers['x-total-pages']} 
                onChange={handlePageChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: '#171717',
                    }
                }}
            />
        </div>
    )
}

export default DisplayFileList