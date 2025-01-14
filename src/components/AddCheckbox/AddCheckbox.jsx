import { Checkbox } from 'react-aria-components'
import styles from './AddCheckbox.module.css'

export function AddCheckbox({ id, checked, onChange }) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        className={styles.input}
        id={`checkbox-${id}`}
        checked={checked}
        onChange={() => onChange(id)}
      />
      <span className={styles['custom-checkbox']}></span>
    </label>
  )
}
