import { ANave } from '../../components/A/ANave'
import styles from './SettingsPage.module.css'
import { ItemsSetting } from './components/ItemSettingsPage/ItemSetting'

export function SettingsPage() {
  return (
    <div className={styles.gen}>
      <ANave />
      <h1>Настройки</h1>
      <ItemsSetting />
    </div>
  )
}
