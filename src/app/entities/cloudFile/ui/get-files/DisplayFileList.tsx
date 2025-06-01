'use client'

import React, { useState } from 'react'
import { useGetFiles } from '../../hooks/useGetFiles'
import FileItem from '../file-item/FileItem';
import { Pagination } from '@mui/material';

const DisplayFileList = ({ deleted = false }: { deleted?: boolean }) => {
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 7;
    const { data } = useGetFiles({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        deletedFiles: deleted
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className='flex flex-col gap-5 lg:h-fit'>
            <div className='flex flex-col gap-2 overflow-y-hidden'>
                {data?.files.map(item => <FileItem key={item.id} fileData={item} />)}
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