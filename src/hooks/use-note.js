import { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, get } from 'firebase/database'

export function useNote(uid, id) {
  const [notes, setNote] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase()

    if (!uid) {
      setLoading(false)
      return
    }

    if (uid && id) {
      const noteRef = ref(db, `${uid}/notes/${id}`)

      setLoading(true)
      get(noteRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setNote({ id: snapshot.key, ...snapshot.val() })
          } else {
            setNote(null)
          }
        })
        .catch((error) => {
          console.error('Error getting note by ID:', error)
          setNote(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else if (uid) {
      const userNotesRef = ref(db, `${uid}/notes`)

      onValue(
        userNotesRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const notesData = snapshot.val()
            const notesArray = Object.keys(notesData).map((key) => ({
              id: key,
              ...notesData[key],
            }))
            setNote(notesArray)
          } else {
            setNote([])
          }
          setLoading(false)
        },
        (error) => {
          console.error('Error getting data:', error)
          setLoading(false)
        }
      )
    }
  }, [uid, id])
  return { notes, loading }
}
