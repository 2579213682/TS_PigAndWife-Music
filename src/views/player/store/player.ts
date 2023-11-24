import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSongDetail } from '../service/player'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      const song = res.songs[0]
      console.log(song)

      // 将song放到currentSong中
      dispatch(changeCurrentSongAction(song))
    })
  }
)

interface IPlayerState {
  currentSong: any
}
const initialState: IPlayerState = {
  currentSong: {}
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    }
  }
})

export const { changeCurrentSongAction } = playerSlice.actions
export default playerSlice.reducer
