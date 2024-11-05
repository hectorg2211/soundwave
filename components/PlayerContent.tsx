'use client'
import React, { useEffect, useState } from 'react'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'

import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import Slider from './Slider'
import useSound from 'use-sound'

interface PlayerContentProps {
  songUrl: string
  song: Song
}

const PlayerContent: React.FC<PlayerContentProps> = ({ songUrl, song }) => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) return

    const currentIdx = player.ids.findIndex(id => id === player.activeId)
    const nextSong = player.ids[currentIdx + 1]

    if (!nextSong) return player.setId(player.ids[0])

    player.setId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return

    const currentIdx = player.ids.findIndex(id => id === player.activeId)
    const previousSong = player.ids[currentIdx - 1]

    if (!previousSong) return player.setId(player.ids[player.ids.length - 1])

    player.setId(previousSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  useEffect(() => {
    sound?.play()
    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) play()
    else pause()
  }

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0)
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
      <div className='flex w-full justify-start'>
        <div className='flex items-center gap-x-4'>
          <MediaItem song={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className='flex md:hidden col-auto w-full justify-end items-center'>
        <div
          onClick={handlePlay}
          className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'
        >
          <Icon size={30} className='text-black' />
        </div>
      </div>

      <div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
        <AiFillStepBackward
          size={30}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
          onClick={onPlayPrevious}
        />

        <div
          onClick={handlePlay}
          className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'
        >
          <Icon size={30} className='text-black' />
        </div>

        <AiFillStepForward
          size={30}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
          onClick={onPlayNext}
        />
      </div>

      <div className='hidden md:flex justify-end pr-2'>
        <div className='flex items-center gap-x-2 w-[120px]'>
          <VolumeIcon onClick={toggleMute} className='cursor-pointer' size={34} />
          <Slider value={volume} onChange={value => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
