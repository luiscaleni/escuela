import { useEffect, useContext } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import NavBar from './templateComp/NavBar'
import MainCampus from './templateComp/MainCampus'
import Footer from './templateComp/Footer'
import Loader from '../components/Loader'
import { UserContext } from '../components/UserProvider'
import GoTopButton from '../components/GoTopButton'
import SidePanel from './templateComp/SidePanel'
import LeftPanel from '../components/LeftPanel'

function TemplateCampus({ separator = false }) {
  const { user, loading } = useContext(UserContext)
  const location = useLocation()

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

  // 1. Si el contexto está verificando la sesión en el servidor, mostramos el Loader global
  if (loading) {
    return <Loader />
  }

  // 2. Si terminó de cargar y no hay usuario, mandamos al login al instante
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 3. Si hay usuario y terminó de cargar, renderizamos el campus de inmediato sin trabas
  return (
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