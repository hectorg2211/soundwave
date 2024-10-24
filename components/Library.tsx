'use client'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

const Library = () => {
  const onClick = () => {
    // Handle upload later
  }
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={26} />
          <p className='text-neutral-400 font-medium text-base'>Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
          size={20}
        />
      </div>

      <div className='flex flex-col gap-y-2 mt-4 px-3'>List of songs</div>
    </div>
  )
}

export default Library
