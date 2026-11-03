import { useEffect, useContext } from 'react'
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom'
import NavBar from './templateComp/NavBar'
import MainCampus from './templateComp/MainCampus'
import Footer from './templateComp/Footer'
import Loader from '../components/Loader'
import { UserContext } from '../components/UserProvider'
import GoTopButton from '../components/GoTopButton'
import SidePanel from './templateComp/SidePanel'
import LeftPanel from '../components/LeftPanel'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'

function TemplateCampus({ separator = false }) {
  const { user, loading, setUser } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()

  // 🛑 Verificación en tiempo real al cambiar de ruta por si el usuario fue inhabilitado
  useEffect(() => {
    const verifyUserStatus = async () => {
      if (!user) return

      try {
        const res = await fetch(`${CONFIG_BACKEND.API_DIR}/user/session`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Accept': 'application/json' }
        })
        const d = await res.json()

        if (!d.logueado) {
          setUser(null)
          // 🛑 Eliminamos el alert de aquí para evitar la duplicidad con el del proveedor/backend
          navigate(CONFIG_PATHS.ROOT_PATH, { replace: true })
        }
      } catch (error) {
        if (import.meta.env.DEV) { console.error(error) }
      }
    }

    verifyUserStatus()
  }, [location.pathname])

  // Manejo del scroll con el hash o al inicio
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  if (loading) { // 1. Si el contexto está verificando la sesión en el servidor, mostramos el Loader global
    return <Loader />
  }

  if (!user) {// 2. Si terminó de cargar y no hay usuario, mandamos al login al instante
    return <Navigate to="/login" replace />
  }

  return (// 3. Si hay usuario y terminó de cargar, renderizamos el campus de inmediato sin trabas
    <>
      <NavBar />
      {separator && <div className={styles.separator}></div>}
      <GoTopButton />
      <MainCampus separator={separator}>
        <LeftPanel>
          <Outlet />
        </LeftPanel>
        <SidePanel />
      </MainCampus>
      <Footer />
    </>
  )
}

export default TemplateCampus