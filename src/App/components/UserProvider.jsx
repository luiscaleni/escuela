// UserProvider.jsx
import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/user/session`, {
        method: 'POST',
        credentials: 'include'
      })
      const d = await res.json()
      setUser(d.logueado ? d.usuario : null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, loadUser }}>
      {children}
    </UserContext.Provider>
  )
}
