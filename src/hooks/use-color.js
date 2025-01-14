import { useEffect, useState } from 'react'
import { get, getDatabase, ref } from 'firebase/database'

export function useColor(uid) {
  const [userColor, setUserColor] = useState(null)

  useEffect(() => {
    const fetchUserColor = async () => {
      try {
        const db = getDatabase()
        const userRef = ref(db, `${uid}/color/selectedColor`)
        const snapshot = await get(userRef)
        if (snapshot.exists()) {
          const color = snapshot.val()
          setUserColor(color)
        }
      } catch (error) {
        console.error('Error fetching user color: ', error)
      }
    }
    fetchUserColor()
  }, [uid])

  return { userColor }
}
