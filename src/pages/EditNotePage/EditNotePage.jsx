import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateNote } from '../../notes/noteSlice'
import styles from '../AddNotePage/AddNote.module.css'
import { ANave } from '../../components/A/ANave'
import { Input } from '../../components/Input/Input'
import { But } from '../../components/But/But'
import {
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw,
  RichUtils,
} from 'draft-js'
import { EditingPanel } from '../../components/EditingPanel/EditingPanel'
import { getDatabase, ref, update } from 'firebase/database'
import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/use-color'
import { useNote } from '../../hooks/use-note'

export function EditNotePage() {
  const { id: uid } = useAuth()
  const { id } = useParams()
  const { notes: note, loading } = useNote(uid, id)
  const selectedColor = useSelector((state) => state.color.selectedColor)
  const { userColor } = useColor(uid)

  const dispatch = useDispatch()
  const [editorState, setEditorState] = useState(() => {
    if (note && note.rawContentState) {
      const contentState = convertFromRaw(JSON.parse(note.rawContentState))
      return EditorState.createWithContent(contentState)
    } else {
      return EditorState.createEmpty()
    }
  })
  const [titleText, setTitleText] = useState(note.title)
  const [write, setWrite] = useState(note.write)

  useEffect(() => {
    if (!loading && note) {
      setTitleText(note.titleText)
      setWrite(note.write)
      const contentState = convertFromRaw(JSON.parse(note.rawContentState))
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [loading, note])

  function saveUpdatedNoteToFirebase(noteData) {
    const db = getDatabase()
    update(ref(db, `${uid}/notes/${id}`), noteData)
    // .then(() =>
    //   console.log(`Note updated successfully ${uid} + ${noteData.id}`)
    // )
    // .catch((error) => console.error('Error updating note: ', error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    dispatch(
      updateNote({
        id: note.id,
        titleText,
        write,
        rawContentState: JSON.stringify(rawContentState),
      })
    )
    saveUpdatedNoteToFirebase({
      id: note.id,
      titleText,
      write,
      rawContentState: JSON.stringify(rawContentState),
    })
  }

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }
  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }
  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }

  const onColorClick = (color) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, color))
    console.log(write)
  }

  return (
    <div className={styles.gen}>
      <ANave />
      <h1 className={styles.title}>Создать запись</h1>
      <form className={styles.content} onSubmit={handleSubmit}>
        <div className={styles.text}>
          <Input
            cssClass={'add-note__title'}
            type={'text'}
            inText={'Название'}
            value={titleText}
            onChange={(e) => {
              setTitleText(e.target.value)
            }}
          />
          <div className={styles.buttons}>
            <div>{note.date}</div>
            <EditingPanel
              handleClickBold={onBoldClick}
              handleClickItalic={onItalicClick}
              handleClickUnderLine={onUnderlineClick}
              handleClickHighlight={() => onColorClick('purple')}
            />
          </div>
          <div className={styles.subtitle}>
            {userColor && (
              <Editor
                editorState={editorState}
                onChange={(newEditorState) => {
                  setEditorState(newEditorState)
                  const contentState = newEditorState.getCurrentContent()
                  const rawText = contentState.getPlainText()
                  setWrite(rawText)
                }}
                customStyleMap={{
                  purple: {
                    backgroundColor: userColor,
                  },
                }}
              />
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <But
            onClick={() => {
              console.log(note)
            }}
            type={'submit'}
            cssClass={'add-note'}
            nameButton={'Сохранить'}
          />
        </div>
      </form>
    </div>
  )
}
