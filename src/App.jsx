import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { NotesPage } from './pages/NotesPage/NotesPage'
import { SettingsPage } from './pages/SettingsPage/SettingsPage'
import { StatisticsPage } from './pages/StatisticsPage/StatisticsPage'
import { LoginPage } from './pages/AuthPage/LoginPage/LoginPage'
import { AddNotePage } from './pages/AddNotePage/AddNotePage'
import { NotePage } from './pages/NotePage/NotePage'
import { EditNotePage } from './pages/EditNotePage/EditNotePage'
import { useTheme } from './hooks/use-theme'
import { RegistrationPage } from './pages/AuthPage/RegistrationPage/RegistrationPage'
import './fairbase'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from './notes/userSlice'

function App() {
  const { theme } = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      dispatch(setUser(JSON.parse(user)))
    }
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/add" element={<AddNotePage />} />
        <Route path="/add/:id" element={<EditNotePage />} />
      </Routes>
    </>
  )
}

export default App
