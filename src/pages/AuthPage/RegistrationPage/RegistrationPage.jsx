import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { ANave } from '../../../components/A/ANave'
import styles from './RegistrationPage.module.css'
import { AddForm } from '../components/AddForm'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../notes/userSlice'
import { useNavigate } from 'react-router-dom'

export function RegistrationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleClickReg(email, password) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        )
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        )
        navigate('/')
      })
      .catch(console.error)
  }

  return (
    <div className={styles.gen}>
      <ANave reg />
      <div className={styles.flex}>
        <h2>Регистрация</h2>
        <div className={styles.bc}>
          <AddForm
            url={'/login'}
            nameLink={'Войти'}
            nameButton={'Зарегистрироваться'}
            onClick={handleClickReg}
          />
        </div>
      </div>
    </div>
  )
}
