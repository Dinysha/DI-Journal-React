import { FaTrash } from 'react-icons/fa'
import { A } from '../../components/A/A'
import { ANave } from '../../components/A/ANave'
import { But } from '../../components/But/But'
import styles from './NotePage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { stateToHTML } from 'draft-js-export-html'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { clearNote } from '../../notes/noteSlice'
import { useAuth } from '../../hooks/use-auth'
import { useNote } from '../../hooks/use-note'
import { useColor } from '../../hooks/use-color'
import { Loader } from '../../components/Loader/Loader'
import { getDatabase, ref, remove, update } from 'firebase/database'

export function NotePage() {
  // const notes = useSelector((state) => state.notes.notes)
  const { id } = useParams()
  // const selectedColor = useSelector((state) => state.color.selectedColor)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: uid } = useAuth()
  const { notes: entry, loading } = useNote(uid, id)
  const { userColor } = useColor(uid)

  if (!entry) {
    return <div>Запись не найдена</div>
  }

  if (loading) {
    return <Loader />
  }

  const contentState = convertFromRaw(JSON.parse(entry.rawContentState))
  const html = stateToHTML(contentState)
  const editorState = EditorState.createWithContent(contentState)

  function handleClickClear() {
    const db = getDatabase()
    const noteRef = ref(db, `${uid}/notes/${id}`)

    remove(noteRef)
      .then(() => {
        dispatch(clearNote(id))
        navigate('/notes')
      })
      .catch((error) => {
        console.error(`Error deleting note with id ${id}:`, error)
      })
  }

  return (
    <div className={styles.gen}>
      <ANave />
      <div className={styles.options}>
        <A
          url={`/add/${entry.id}`}
          cssClass={'link-content'}
          nameLink={'Редактировать запись'}
        />
        <But
          onClick={handleClickClear}
          cssClass={'add-clear'}
          nameButton={<FaTrash />}
        />
      </div>
      <h3>{entry.titleText}</h3>
      <h5>{entry.date}</h5>
      <div className="editor-container">
        {userColor && (
          <Editor
            editorState={editorState}
            readOnly={true}
            customStyleMap={{
              purple: {
                backgroundColor: userColor,
              },
            }}
          />
        )}
      </div>
    </div>
  )
}
