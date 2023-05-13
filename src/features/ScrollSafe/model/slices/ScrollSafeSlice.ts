import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScrollSafeSchema } from '../types/ScrollSafeSchema'

const initialState: ScrollSafeSchema = {
  scroll: {}
}

export const ScrollSafeSlice = createSlice({
  name: 'ScrollSafe',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{ path: string, postion: number }>) => {
      state.scroll[payload.path] = payload.postion
    }
  }
})

// Action creators are generated for each case reducer function
export const { actions: ScrollSafeActions } = ScrollSafeSlice
export const { reducer: ScrollSafeReducer } = ScrollSafeSlice
