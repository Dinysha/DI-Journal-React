import { Link } from 'react-router-dom'
import styles from './A.module.css'

export function A({ url, cssClass, nameLink }) {
  return (
    <Link to={`${url}`} className={styles[`${cssClass}`]}>
      {nameLink}
    </Link>
  )
}
