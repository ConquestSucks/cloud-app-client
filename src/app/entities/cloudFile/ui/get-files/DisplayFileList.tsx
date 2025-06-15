'use client'

import React, { useState, useRef, useLayoutEffect } from 'react'
import { useGetFiles } from '../../hooks/useGetFiles'
import FileItem from '../file-item/FileItem';
import { Pagination, CircularProgress, Box } from '@mui/material';

const DisplayFileList = ({ deleted = false }: { deleted?: boolean }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0); // Start with 0 to prevent initial fetch
    const containerRef = useRef<HTMLDivElement>(null);

    // Use useLayoutEffect to measure and avoid flickering
    useLayoutEffect(() => {
        if (containerRef.current) {
            const containerHeight = containerRef.current.offsetHeight;
            const ITEM_HEIGHT = 72; // Approximate height of one FileItem including margin
            const newSize = Math.max(1, Math.floor(containerHeight / ITEM_HEIGHT));
            setPageSize(newSize);
        }
    }, []); // Run only on mount

    const { data, isLoading } = useGetFiles({
        pageNumber: page,
        pageSize: pageSize,
        deletedFiles: deleted
    }, {
        enabled: pageSize > 0 // Query will only run when pageSize is calculated
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className='flex flex-col h-full'>
            <div ref={containerRef} className='flex-grow -mx-2 px-2 min-h-0'>
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                )}
                {!isLoading && (
                    <div className='space-y-2 py-2'>
                        {data?.files.map(item => <FileItem key={item.id} fileData={item} />)}
                    </div>
                )}
            </div>
            <div className='pt-4 flex justify-center'>
                <Pagination
                    color="primary"
                    count={data?.headers['x-total-pages'] || 1}
                    page={page}
                    onChange={handlePageChange}
                    size="small"
                    className="md:hidden"
                    disabled={isLoading}
                />
                <Pagination
                    color="primary"
                    count={data?.headers['x-total-pages'] || 1}
                    page={page}
                    onChange={handlePageChange}
                    className="hidden md:flex"
                    disabled={isLoading}
                />
            </div>
        </div>
    )
}

export default DisplayFileList