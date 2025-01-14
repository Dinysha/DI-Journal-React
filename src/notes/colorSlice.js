import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedColor: '',
}

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setSelectedColor: (state, action) => {
      console.log(action)
      state.selectedColor = action.payload
    },
  },
})

export const { setSelectedColor } = colorSlice.actions

export default colorSlice.reducer
