import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ANave } from '../../../components/A/ANave'
import styles from './LoginPage.module.css'
import { AddForm } from '../components/AddForm'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../notes/userSlice'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleClickLogin(email, password) {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
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
      <ANave />
      <div className={styles.flex}>
        <h2>Вход</h2>
        <div className={styles.bc}>
          <AddForm
            url={'/registration'}
            nameLink={'Зарегистрироваться'}
            nameButton={'Войти'}
            onClick={handleClickLogin}
          />
        </div>
      </div>
    </div>
  )
}
