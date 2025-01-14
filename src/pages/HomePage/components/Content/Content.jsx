import { useSelector } from 'react-redux'
import styles from './Content.module.css'
import { CardWrites } from '../../../../components/CardWrites/CardWrites'
import { A } from '../../../../components/A/A'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../hooks/use-auth'
import { useColor } from '../../../../hooks/use-color'
import { useNote } from '../../../../hooks/use-note'

export function Content() {
  const { id: uid } = useAuth()
  const { notes } = useNote(uid)

  return (
    <div className={styles.content}>
      <div className={styles.wrires}>
        <A
          url={'/add'}
          cssClass={'link-content'}
          nameLink={'Добавить запись'}
        />{' '}
        {notes.length > 0 ? (
          notes.slice(-1).map((note) => (
            <Link key={notes[0].id} to={`/notes/${notes[0].id}`}>
              <CardWrites {...notes[0]} cssClass={'card-home'} />
            </Link>
          ))
        ) : (
          <CardWrites titleText={'Нет записей'} cssClass={'card-home'} />
        )}
      </div>
      <div className={styles.statistic}>Статистика</div>
    </div>
  )
}
