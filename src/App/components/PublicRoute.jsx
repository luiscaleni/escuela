import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserProvider'
import Loader from './Loader'
import { CONFIG_PATHS } from '../config/config'

function PublicRoute({ children }) {
  const { user, loading } = useContext(UserContext)

  if (loading) return <Loader />

  return user ? <Navigate to={CONFIG_PATHS.CAMPUS_PATH} replace /> : children
}

export default PublicRoute