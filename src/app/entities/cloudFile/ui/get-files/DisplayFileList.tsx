'use client'

import React, { useState } from 'react'
import { useGetFiles } from '../../hooks/useGetFiles'
import FileItem from '../file-item/FileItem';
import { Pagination } from '@mui/material';

const DisplayFileList = ({ deleted = false }: { deleted?: boolean }) => {
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;
    const { data } = useGetFiles({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        deletedFiles: deleted
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='flex-grow -mx-2 px-2 min-h-0 overflow-auto md:overflow-visible'>
                <div className='space-y-2 py-2'>
                    {data?.files.map(item => <FileItem key={item.id} fileData={item} />)}
                </div>
            </div>
            <div className='pt-4 flex justify-center'>
                <Pagination
                    color="primary"
                    count={data?.headers['x-total-pages']}
                    onChange={handlePageChange}
                    size="small"
                    className="md:hidden"
                />
                <Pagination
                    color="primary"
                    count={data?.headers['x-total-pages']}
                    onChange={handlePageChange}
                    className="hidden md:flex"
                />
            </div>
        </div>
    )
}

export default DisplayFileList