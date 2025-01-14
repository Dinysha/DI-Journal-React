import { RiLoginBoxFill } from 'react-icons/ri'
import { IoMdSettings } from 'react-icons/io'
import { IoStatsChart } from 'react-icons/io5'
import { TfiWrite } from 'react-icons/tfi'
import { FaHome } from 'react-icons/fa'
import { A } from './A'
import { SlNotebook } from 'react-icons/sl'
import { useAuth } from '../../hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function ANave({ home, reg }) {
  const { isAuth, email } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth && !home && !reg) {
      navigate('/login')
    }
  }, [isAuth, home, navigate])

  return (
    <div
      style={{
        ...(home ? null : { display: 'flex', justifyContent: 'space-between' }),
      }}
    >
      {!home && (
        <A
          url={'/'}
          nameLink={<SlNotebook style={{ fontSize: 50, marginBottom: 10 }} />}
          cssClass={'link-logo'}
        ></A>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'flex-start',
        }}
      >
        {isAuth && <h4>{email}</h4>}
        <A url={'/'} cssClass={'link-header'} nameLink={<FaHome />} />
        <A url={'/notes'} cssClass={'link-header'} nameLink={<TfiWrite />} />
        <A
          url={'/statistics'}
          cssClass={'link-header'}
          nameLink={<IoStatsChart />}
        />
        <A
          url={'/settings'}
          cssClass={'link-header'}
          nameLink={<IoMdSettings />}
        />
        {!isAuth && (
          <A
            url={'/login'}
            cssClass={'link-header'}
            nameLink={<RiLoginBoxFill />}
          />
        )}
      </div>
    </div>
  )
}
