import { useLayoutEffect, useState } from 'react'

export function useTheme() {
  const savedTheme = localStorage.getItem('app-theme')
  const [theme, setTheme] = useState(savedTheme || 'light')

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  localStorage.setItem('app-theme', theme)
  return { theme, setTheme }
}
