import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import https from '../apis/https'
// import { songProp } from '~/types/song.types'
import { playList } from '~/types/playList.types'
interface song {
  err: number
  msg?: string
  timestamp?: string
  data: {
    128: string
    320: string
  }
}
interface detailplaylist {
  err: number
  data: playList
}

interface bannerProps {
  type: number
  link: string
  banner: string
  cover: string
  target: string
  title: string
  description: string
  ispr: number
  encodeId: string
}
export interface MusicProps{
  items: art[]
  title: string
}
export interface art {
  artists: [
    {
      alias: string
      id: string
      isOA: boolean
      isOABrand: boolean
      link: string
      name: string
      playlistId: string
      spotlight: false
      thumbnail: string
      thumbnailM: string
      totalFollow: number
    }
  ]
  artistsNames: string
  encodeId: string
  link: string
  sortDescription: string
  thumbnail: string
  thumbnailM: string
  title: string
}
interface initialState {
  banner: bannerProps[]
  song: song
  play: boolean
  alBum: boolean
  detailplaylist: detailplaylist
  friday:  MusicProps
  newEveryMusic:  MusicProps
  top100:  MusicProps
  alBumHot: MusicProps
  newRelease: {
    title: string
    items: {
      all: art[]
      others: art[]
      vPop: art[]
    }
  }
}

const initialState: initialState = {
  banner: [],
  friday: {
    title: '',
    items: []
  },
  detailplaylist: {
    err: 0,
    data: {
      like: 0,
      contentLastUpdate: 0,
      thumbnail: '',
      genreIds: [],
      description: '',
      aliasTitle: '',
      song: {
        items: [],
        total: 0,
        totalDuration: 0
      }
    }
  },
  top100: {
    title: '',
    items: []
  },
  song: {
    err: 0,
    data: {
      128: '',
      320: ''
    }
  },
  play: false,
  alBum: false,
  newEveryMusic: {
    title: '',
    items: []
  },
  alBumHot: {
    title: '',
    items: []
  },
  newRelease: {
    title: '',
    items: {
      all: [],
      others: [],
      vPop: []
    }
  }
}

export const fetchHome = createAsyncThunk('home', async (_, thunkAPI) => {
  try {
    const response = await https.get('/api/home', {
      signal: thunkAPI.signal
    })
    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const fetchInfoSong = createAsyncThunk('songInfo', async (id: { id: string }, thunkAPI) => {
  try {
    const response = await https.get('/api/infosong', {
      params: id,
      signal: thunkAPI.signal
    })
    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const detailplaylist = createAsyncThunk('detailplaylist', async (id: { id: string }, thunkAPI) => {
  try {
    const response = await https.get('/api/detailplaylist', {
      params: id,
      signal: thunkAPI.signal
    })
    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const fetchSong = createAsyncThunk('song', async (id: { id: string }, thunkAPI) => {
  try {
    const response = await https.get<song>('/api/song', {
      params: id,
      signal: thunkAPI.signal
    })

    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    playMusic: (state, action: PayloadAction<boolean>) => {
      state.play = action.payload
    },
    playAlbum:
      (fetchSong.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.alBum = action.payload
      })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.banner = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hSlider')?.items
          state.friday = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hArtistTheme')
          state.newEveryMusic = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hEditorTheme2')
          state.top100 = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'h100')
          state.alBumHot = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hAlbum')
          state.newRelease = action?.payload?.data?.items?.find((item: any) => item?.sectionType === 'new-release')
        }
      })

      .addCase(detailplaylist.fulfilled, (state, action) => {
        state.detailplaylist = action.payload
      })
      .addCase(fetchSong.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.song = action.payload
        }
      })
  }
})

export const { playMusic, playAlbum } = homeSlice.actions
export default homeSlice.reducer
