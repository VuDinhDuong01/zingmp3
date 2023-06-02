import React from 'react'
import { useSelector } from 'react-redux'
import { Icons } from '~/helper/icons'
import { RootState } from '~/redux/store'
import { playList } from '../../types/playList.types'
import { convertToDate, covertTime } from '~/helper/utils'
import { Button } from '~/components/Button/Button'
import { songProp } from '~/types/song.types'
export const Abum = () => {
  const homeList = useSelector((state: RootState) => state?.home.playList)
  const playList = (homeList as any)?.data as playList
  console.log(playList)
  return (
    <div className='grid grid-cols-12 px-[1.75rem] bg-[#170F23] text-[white] gap-[50px] py-[100px]'>
      <div className=' col-span-3 flex flex-col  '>
        <img
          src={playList?.thumbnail}
          alt='ảnh đại diện abum nhạc'
          className='w-full object-cover rounded-lg cursor-pointer'
        />

        <h2 className='font-bold text-[20px] my-3'>{playList?.aliasTitle}</h2>
        <p>{`cập nhật : ${convertToDate(playList?.contentLastUpdate)}`}</p>
        <div className='flex items-center my-2'>
          {playList?.genreIds?.map((item: string, index: number) => {
            return <p key={index}>{item}</p>
          })}
        </div>
        <p>{`${playList?.like} người yêu thích`}</p>
        <div className='flex items-center bg-[rgb(155,77,224)] px-2 py-2 rounded-lg cursor-pointer my-2'>
          <Icons.CgPlayPause size={25} />

          <p className='text-[14px]'>TIẾP TỤC PHÁT</p>
        </div>
        <div className='flex items-center gap-3 my-4'>
          <div className='w-[40px] h-[40px] rounded-full bg-[#2F2739] flex items-center justify-center cursor-pointer'>
            <Icons.BsThreeDots size={20} />
          </div>
          <div className='w-[40px] h-[40px] rounded-full bg-[#2F2739] flex items-center justify-center cursor-pointer'>
            <Icons.AiOutlineHeart size={20} />
          </div>
        </div>
      </div>
      <div className='col-span-9'>
        <p>Lời tựa và những đại diện K-pop ngầu đét</p>
        <div className='grid grid-cols-3 w-full px-2 py-2'>
          <div className=' gap-2 cols-span-4 flex items-center '>
            <Icons.GiLevelThreeAdvanced />
            <p>BÀI HÁT</p>
          </div>
          <p className='cols-span-4  flex items-center justify-center'>ABUM</p>
          <p className='cols-span-4  flex items-center justify-end'> THỜI GIAN</p>
        </div>
        <div>
          {playList?.song?.items?.map((items: songProp, index: number) => {
            return (
              <div
                key={index}
                className='grid grid-cols-3 w-full flex items-center hover:bg-[#423C4B] px-2 hover:rounded-md hover:cursor-pointer border-b border-[#423C4B] '
              >
                <div className='gap-2 cols-span-4 gap-2  flex items-center py-3 cursor-pointer'>
                  <Icons.BiMusic />
                  <img
                    src={items?.thumbnail
                    }
                    alt='ảnh bài hát'
                    className='w-[40px] h-[40px] object-cover rounded-lg'
                  />
                  <div className='flex-col flex items-center'>
                    <p className='font-semibold text-[15px]'>{items?.title}</p>
                    <span className='text-[12px] font-semibold text-[#7C7782]'>{items?.artistsNames}</span>
                  </div>
                </div>
                <p className='cols-span-4 flex items-center justify-center line-clamp-1'>{items?.album?.title}</p>
                <p className='cols-span-4 flex items-center justify-end'>{covertTime(items?.duration)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}