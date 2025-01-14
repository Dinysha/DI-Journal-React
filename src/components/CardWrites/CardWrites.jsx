import { Editor, EditorState, convertFromRaw } from 'draft-js'
import styles from './CardWrites.module.css'
import { useColor } from '../../hooks/use-color'
import { useAuth } from '../../hooks/use-auth'

export function CardWrites({
  cssClass,
  titleText,
  date,
  write,
  rawContentState,
  id,
  activeCheckbox,
}) {
  const { id: uid } = useAuth()
  const { userColor } = useColor(uid)
  let editorState = EditorState.createEmpty()
  if (rawContentState) {
    try {
      const contentState = convertFromRaw(JSON.parse(rawContentState))
      editorState = EditorState.createWithContent(contentState)
    } catch (error) {
      console.error('Error parsing rawContentState JSON:', error)
    }
  }

  return (
    <div className={styles[`${cssClass}`]}>
      <h3 className={styles.h3}>{titleText}</h3>
      <h5 className={styles.h5}>{date}</h5>
      <div className={styles.text}>
        {userColor && (
          <Editor
            editorState={editorState}
            readOnly={true}
            className={styles.text}
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
