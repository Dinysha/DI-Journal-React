import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react'

export function useSaveNote() {
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)

  const saveNoteToFirebase = (uid, idNote, noteData) => {
    const db = getDatabase()
    set(ref(db, `${uid}/notes/${idNote}`), noteData)
      .then(() => {
        setIsSuccessPopupOpen(true)
      })
      .catch((error) => console.error('Error adding note: ', error))
  }

  return { saveNoteToFirebase, isSuccessPopupOpen }
}
