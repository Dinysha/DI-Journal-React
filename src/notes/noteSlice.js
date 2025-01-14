import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: [],
  selectedColor: null,
}

console.log(initialState.selectedColor)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNotes: (state, action) => {
      const { idNote, titleText, date, write, rawContentState } = action.payload
      state.notes.push({
        id: idNote,
        title: titleText,
        date: date,
        write: write,
        rawContentState: rawContentState,
      })
      console.log(state.notes)
    },
    updateNote: (state, action) => {
      const { id, titleText, write, rawContentState } = action.payload
      const existingNote = state.notes.find((note) => note.id === id)
      if (existingNote) {
        existingNote.title = titleText
        existingNote.write = write
        existingNote.rawContentState = rawContentState
      }
    },
    clearNote: (state, action) => {
      const id = action.payload
      state.notes = state.notes.filter((note) => note.id !== id)
    },
    clearNotes: (state, action) => {
      const idsToRemove = action.payload
      state.notes = state.notes.filter((note) => !idsToRemove.includes(note.id))
    },
  },
})

export const { addNotes, updateNote, clearNote, clearNotes } = noteSlice.actions

export default noteSlice.reducer
