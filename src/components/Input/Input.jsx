import styles from './Input.module.css'

export function Input({ cssClass, type, id, inText, onChange, value }) {
  return (
    <input
      className={styles[`${cssClass}`]}
      type={type}
      id={id}
      placeholder={inText}
      onChange={onChange}
      value={value}
    />
  )
}
