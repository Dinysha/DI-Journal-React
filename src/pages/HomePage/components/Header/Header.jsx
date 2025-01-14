import { ANave } from '../../../../components/A/ANave'
import { useTheme } from '../../../../hooks/use-theme'
import styles from './Header.module.css'

export function Header() {
  const { theme } = useTheme()
  return (
    <>
      {theme === 'dark' ? (
        <div className={styles['bc-dark']}>
          <ANave home />
          <div className={styles.glass}>
            <h1 className={styles.title}>
              DI Journal
              <p className={styles.subtitle}>
                {' '}
                Твой личный простор для внутреннего роста{' '}
              </p>
            </h1>
          </div>
        </div>
      ) : (
        <div className={styles['bc-light']}>
          <ANave home />
          <div className={styles.glass}>
            <h1 className={styles.title}>
              DI Journal
              <p className={styles.subtitle}>
                {' '}
                Твой личный простор для внутреннего роста{' '}
              </p>
            </h1>
          </div>
        </div>
      )}
    </>
  )
}
