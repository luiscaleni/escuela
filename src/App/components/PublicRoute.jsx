import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserProvider'

function PublicRoute({ children }) {
  const { user, loading } = useContext(UserContext)

  if (loading) return <p>Cargando…</p>

  return user ? <Navigate to="/bienvenida" replace /> : children
}

export default PublicRoute