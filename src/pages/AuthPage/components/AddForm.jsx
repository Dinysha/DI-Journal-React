import { FieldError, Form, TextField } from 'react-aria-components'
import styles from './AddForm.module.css'
import { Input } from '../../../components/Input/Input'
import { But } from '../../../components/But/But'
import { A } from '../../../components/A/A'
import { useState } from 'react'

export function AddForm({ url, nameLink, nameButton, onClick }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  return (
    <Form className={styles.form}>
      <TextField aria-label="Почта" name="username" isRequired>
        <Input
          inText={'Почта'}
          type={'email'}
          cssClass={'login'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FieldError />
      </TextField>
      <TextField aria-label="Пароль" name="password" type="password" isRequired>
        <Input
          inText={'Пароль'}
          type={'password'}
          cssClass={'login'}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <FieldError />
      </TextField>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <But
          nameButton={nameButton}
          cssClass={'add-note'}
          onClick={() => onClick(email, pass)}
        />
        <A url={url} cssClass={'link-text'} nameLink={nameLink} />
      </div>
    </Form>
  )
}
