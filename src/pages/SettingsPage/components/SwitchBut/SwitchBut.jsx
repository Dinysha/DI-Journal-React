import styles from './SwitchBut.module.css'

export function SwitchBut({ onClick }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onClick={onClick} />
      <span className={styles.slider}></span>
    </label>
  )
}
