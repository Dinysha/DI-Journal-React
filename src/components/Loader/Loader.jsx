import styles from './Loader.module.css'

export function Loader() {
  return (
    <div className={styles['three-body']}>
      <div className={styles['three-body__dot']}></div>
      <div className={styles['three-body__dot']}></div>
      <div className={styles['three-body__dot']}></div>
    </div>
  )
}
