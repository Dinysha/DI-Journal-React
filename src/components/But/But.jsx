import { Button } from 'react-aria-components'
import styles from './But.module.css'

export function But({ cssClass, nameButton, type, onClick }) {
  return (
    <Button
      onClick={() => onClick()}
      type={type}
      className={styles[`${cssClass}`]}
    >
      {nameButton}
    </Button>
  )
}
