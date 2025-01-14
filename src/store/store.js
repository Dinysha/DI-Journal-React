import { configureStore } from '@reduxjs/toolkit'
import noteSlice from '../notes/noteSlice'
import colorSlice from '../notes/colorSlice'
import userSlice from '../notes/userSlice'

export const store = configureStore({
  reducer: {
    notes: noteSlice,
    color: colorSlice,
    user: userSlice,
  },
})
