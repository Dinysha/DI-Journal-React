import { RiLoginBoxFill } from 'react-icons/ri'
import { But } from '../../../../components/But/But'
import { SwitchBut } from '../SwitchBut/SwitchBut'
import styles from './ItemSetting.module.css'
import { useEffect } from 'react'
import { useTheme } from '../../../../hooks/use-theme'
import { GithubPicker } from 'react-color'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedColor } from '../../../../notes/colorSlice'
import { clearUserData } from '../../../../notes/userSlice'
import { useAuth } from '../../../../hooks/use-auth'
import { getDatabase, ref, update } from 'firebase/database'
import { useColor } from '../../../../hooks/use-color'

export function ItemsSetting() {
  const { theme, setTheme } = useTheme()
  const dispatch = useDispatch()
  const { isAuth, email, id: uid } = useAuth()
  const { userColor } = useColor(uid)
  const selectedColor = useSelector((state) => state.color.selectedColor)
  console.log(useTheme)

  function handleSwitchBut() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const db = getDatabase()
    const userRef = ref(db, `${uid}/`)
    update(userRef, { theme })
      .then(() => console.log('Selected theme updated successfully'))
      .catch((error) => console.error('Error updating selected color: ', error))
  }, [theme])

  const handleColorSelection = (color) => {
    dispatch(setSelectedColor(color.hex))
    const db = getDatabase()
    const userRef = ref(db, `${uid}/color`)
    update(userRef, { selectedColor: color.hex })
      .then(() => console.log('Selected color updated successfully'))
      .catch((error) => console.error('Error updating selected color: ', error))
  }

  return (
    <div className={styles.items}>
      <div className={styles.item}>
        <p>Тема</p>
        <SwitchBut onClick={handleSwitchBut} />
      </div>
      <div className={styles.item}>
        <p>Цвет выделения</p>
        <span style={{ backgroundColor: selectedColor || userColor }}>
          пример
        </span>
        <GithubPicker
          onChangeComplete={handleColorSelection}
          triangle={'hide'}
          colors={[
            '#20a7d8',
            '#6b54ab',
            '#ed5c60',
            '#f8669e',
            '#ffaf74',
            '#f5f497',
            '#c0ffe6',
            '#c5ff77',
            '#6098d1',
            '#a1a3d0',
            '#d0a1a1',
            '#e5bdbf',
            '#f1ce7b',
            '#d6e293',
            '#b1c8ce',
            '#a3d0a1',
          ]}
        />
      </div>
      <div className={styles.item}>
        <p>Выйти из аккаунта</p>
        <But
          onClick={() => dispatch(clearUserData())}
          cssClass={'add-exit'}
          nameButton={<RiLoginBoxFill />}
        />
      </div>
    </div>
  )
}
