import { createContext, useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  const loadUser = async () => {
    try {
      const res = await fetch(`${CONFIG_BACKEND.API_DIR}/user/session`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Accept': 'application/json' }
      })
      const d = await res.json()
      
      if (d.logueado && d.usuario) {
        setUser(d.usuario)
      } else {
        setUser(null)
      }
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

  return (
    <UserContext.Provider value={{ user, loading, initialized, loadUser, setUser }}>
      {children}
    </UserContext.Provider>
  )
}