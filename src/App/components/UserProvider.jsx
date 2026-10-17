import { createContext, useState, useEffect } from 'react'
import { useTheme } from './ThemeContext'
import { CONFIG_BACKEND } from '../config/config'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const { setDark } = useTheme()

  const loadUser = async () => {
    try {
      const res = await fetch(`${CONFIG_BACKEND.API_DIR}/user/session`, {
        method: 'POST',
        credentials: 'include'
      })
      const d = await res.json()
      /*const text = await res.text()
      const d = text ? JSON.parse(text) : { logueado: false }*/
      setUser(d.logueado ? d.usuario : null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
      setInitialized(true)
    }
  }
  
  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
      if (user && user.darkMode !== undefined && user.darkMode !== null) {
          const userMode = user.darkMode === 1 || user.darkMode === '1' || user.darkMode === true
          setDark(userMode)
      }
  }, [user])

  return (
    <UserContext.Provider value={{ user, loading, initialized, loadUser, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
