import { useSelector } from 'react-redux'

import { RootState } from '~/redux/store'
import OutSandSong from '../OutStandSong/OutSandSong'
import { SongItem } from '~/components/SongItem/SongItem'
import { convertLike, covertTime } from '~/helper/utils'
import ItemSong from '~/components/ItemSong/ItemSong'
import MVItem from '~/components/MVItem/MVItem'
import ArtisItem from '~/components/ArtisItem/ArtisItem'

const SearchAll = () => {
  const searchSong = useSelector((state: RootState) => state?.home?.searchAll?.songs)
  const playListSong = useSelector((state: RootState) => state?.home?.searchAll?.playlists)
  const mv = useSelector((state: RootState) => state?.home?.searchAll?.videos)
  const artis = useSelector((state: RootState) => state?.home?.searchAll?.artists)

  return (
    <div className='text-[white]  bg-[#170F23] px-[1.75rem]'>
      <div className='pb-[30px]'>
        <h2 className='text-[18px] font-bold py-4'>Nổi Bật</h2>
        <div>
          <div className='grid grid-cols-3 gap-9'>
            {searchSong.slice(0, 3).map((item, index) => {
              return (
                <OutSandSong
                  key={index}
                  encodeId={item.encodeId}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  artistsNames={item.artistsNames}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className='pb-[40px]'>
        <h2 className='text-[18px] font-bold py-4'>Bài Hát</h2>
        <div className='grid grid-cols-2 gap-4'>
          {searchSong?.slice(0, 6)?.map((item, index) => {
            return (
              <SongItem
                key={index}
                encodeId={item.encodeId}
                title={item.title}
                thumbnail={item.thumbnail}
                artistsNames={item.artistsNames}
                time={covertTime(item.duration)}
              />
            )
          })}
        </div>
      </div>
      <div className='pb-[40px]'>
        <h2 className='text-[18px] font-bold py-4'>Playlist/Album</h2>
        <div className='grid grid-cols-5 gap-4'>
          {playListSong?.slice(0, 5)?.map((item) => {
            return (
              <ItemSong
                key={item.encodeId}
                encodeId={item.encodeId}
                title={item.title}
                thumbnail={item.thumbnail}
                link={item.link}
                artistsNames={item.artistsNames}
              />
            )
          })}
        </div>
      </div>
      <div className='pb-[50px]'>
        <h2 className='text-[18px] font-bold py-4'>MV</h2>
        <div className='grid grid-cols-3 gap-4'>
          {mv?.slice(0, 3)?.map((item) => {
            return (
              <MVItem
                key={item.encodeId}
                encodeId={item.encodeId}
                title={item.title}
                thumbnail={item.thumbnail}
                link={item.link}
                artistsNames={item.artistsNames}
                thumbnailM={item.thumbnailM}
              />
            )
          })}
        </div>
      </div>
      <div className='pb-[150px]'>
        <h2 className='text-[18px] font-bold py-4'>Nghệ Sĩ/OA</h2>
        <div className='grid grid-cols-5 gap-4'>
          {artis?.slice(0, 5)?.map((item) => {
            return (
              <ArtisItem
                key={item.id}
                encodeId={item.id}
                thumbnail={item.thumbnail}
                link={item.link}
                name={item.name}
                alias={item.alias}
                totalFollow={convertLike(item.totalFollow) as number}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchAll
