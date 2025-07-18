import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserProvider'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext)

  // Mientras aún estamos validando la sesión, no redirigir ni mostrar children:
  if (loading) return <p>Cargando…</p>

  // Una vez cargado:
  if (!user) return <Navigate to="/login" replace />

  return children
}