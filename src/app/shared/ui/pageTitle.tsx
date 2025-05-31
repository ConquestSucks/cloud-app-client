import React from 'react'

const PageTitle = ({ title }: { title: string }) => {
  return (
    <span className='text-2xl font-thin'>{title}</span>
  )
}

export default PageTitle