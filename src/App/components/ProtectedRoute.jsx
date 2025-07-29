import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserProvider'
import Loader from './Loader'
import { CONFIG_PATHS } from '../config/config'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext)

  // Mientras aún estamos validando la sesión, no redirigir ni mostrar children:
  if (loading) return <Loader />

  // Una vez cargado:
  if (!user) return <Navigate to={CONFIG_PATHS.LOGIN_PATH} replace />

  return children
}