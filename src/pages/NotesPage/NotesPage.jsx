import { useDispatch } from 'react-redux'
import { A } from '../../components/A/A'
import { ANave } from '../../components/A/ANave'
import { But } from '../../components/But/But'
import { CardWrites } from '../../components/CardWrites/CardWrites'
import styles from './NotesPage.module.css'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AddCheckbox } from '../../components/AddCheckbox/AddCheckbox'
import { clearNotes } from '../../notes/noteSlice'
import { useAuth } from '../../hooks/use-auth'
import { getDatabase, ref, update } from 'firebase/database'
import { useNote } from '../../hooks/use-note'
import { Loader } from '../../components/Loader/Loader'
import { useSaveNote } from '../../hooks/use-saveNote'

export function NotesPage() {
  const dispatch = useDispatch()
  const [activeCheckbox, setActiveCheckbox] = useState(false)
  const [selectedNotes, setSelectedNotes] = useState([])
  const { id: uid } = useAuth()
  const { notes, loading } = useNote(uid)
  const { isSuccessPopupOpen } = useSaveNote()

  function openCheckbox() {
    setActiveCheckbox(!activeCheckbox)
  }

  const handleCheckboxChange = (noteId) => {
    setSelectedNotes((prevSelectedNotes) => {
      if (prevSelectedNotes.includes(noteId)) {
        return prevSelectedNotes.filter((id) => id !== noteId)
      } else {
        return [...prevSelectedNotes, noteId]
      }
    })
  }

  const handleDeleteNotes = () => {
    const db = getDatabase()

    const updates = {}

    selectedNotes.forEach((noteId) => {
      updates[`${uid}/notes/${noteId}`] = null
    })

    update(ref(db), updates)
      .then(() => {
        dispatch(clearNotes(selectedNotes))
        setSelectedNotes([])
      })
      .catch((error) => console.error(`Error deleting selected notes:`, error))
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.gen}>
      <ANave />
      <h1>Записи</h1>
      <div className={styles.options}>
        <A
          url={'/add'}
          cssClass={'link-content'}
          nameLink={'Добавить запись'}
        />
        <But
          onClick={openCheckbox}
          cssClass={'add-clear'}
          nameButton={<FaTrash />}
        />
        {activeCheckbox && (
          <But
            cssClass={'add-delete'}
            nameButton={'удалить'}
            onClick={handleDeleteNotes}
          />
        )}
      </div>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className={styles.note}>
            <Link to={`/notes/${note.id}`}>
              <CardWrites
                {...note}
                cssClass={'card-notes'}
                draftStyles={note.draftStyles}
                activeCheckbox={activeCheckbox}
              />
            </Link>
            {activeCheckbox && (
              <AddCheckbox
                id={note.id}
                onChange={handleCheckboxChange}
                checked={selectedNotes.includes(note.id)}
              />
            )}
          </div>
        ))
      ) : (
        <CardWrites titleText={'Нет записей'} cssClass={'card-notes'} />
      )}
    </div>
  )
}
