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
            <div className='flex flex-col gap-2 overflow-y-hidden'>
                {data?.files.map(item => <FileItem key={item.id} data={item} />)}
            </div>
            <Pagination 
                color="primary" 
                count={data?.headers['x-total-pages']} 
                onChange={handlePageChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'white',
                    }
                }}
            />
        </div>
    )
}

export default DisplayFileList