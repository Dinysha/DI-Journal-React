import { ANave } from '../../components/A/ANave'
import { Input } from '../../components/Input/Input'
import styles from './AddNote.module.css'
import { But } from '../../components/But/But'
import { AddCalendar } from './components/AddCalendar/AddCaledar'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotes } from '../../notes/noteSlice'
import { EditingPanel } from '../../components/EditingPanel/EditingPanel'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/use-color'
import { useSaveNote } from '../../hooks/use-saveNote'
import { useNavigate } from 'react-router-dom'

export function AddNotePage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [titleText, setTitleText] = useState('')
  const [date, setDate] = useState()
  const [write, setWrite] = useState('')
  const { id: uid } = useAuth()
  const { userColor } = useColor(uid)
  const { saveNoteToFirebase } = useSaveNote()

  const notes = useSelector((state) => state.notes.notes)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const idRef = useRef(1)
  const generateId = () => {
    const id = idRef.current
    idRef.current += 1
    return id
  }

  function addDate(dateString) {
    const dateObject = new Date(dateString)

    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()
    const date = `${year}-${month}-${day}`
    setDate(date)
  }

  const idNote = generateId()

  function createNote() {
    const contentState = editorState.getCurrentContent()
    const rawText = contentState.getPlainText()
    const rawContentState = convertToRaw(contentState)

    const noteData = {
      uid: uid,
      id: idNote,
      titleText: titleText,
      date: date,
      write: write,
      rawContentState: JSON.stringify(rawContentState),
    }

    saveNoteToFirebase(uid, idNote, noteData)
    dispatch(
      addNotes({
        idNote,
        titleText,
        date,
        write,
        rawContentState: JSON.stringify(rawContentState),
      })
    )

    navigate('/notes')
    setTitleText('')
    setDate('')
    setWrite('')
    setEditorState(EditorState.createEmpty())
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
  }

  return (
    <div className={styles.gen}>
      <ANave />
      <h1 className={styles.title}>Создать запись</h1>
      <form className={styles.content}>
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
            <AddCalendar onChange={addDate} />
            {userColor === null && <p>Выберите цвет выделения в настройках</p>}
            <EditingPanel
              handleClickBold={onBoldClick}
              handleClickItalic={onItalicClick}
              handleClickUnderLine={onUnderlineClick}
              handleClickHighlight={() => onColorClick('purple')}
            />
          </div>
          <div className={`${styles.subtitle} ${styles.editorContainer}`}>
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
          </div>
        </div>
        <div className={styles.buttons}>
          <But
            onClick={() => {
              createNote()
            }}
            cssClass={'add-note'}
            nameButton={'Добавить'}
          />
        </div>
      </form>
    </div>
  )
}
