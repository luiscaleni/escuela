import { useEffect, useState, useRef, useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './templateComp/NavBar'
import Main from './templateComp/Main'
import Footer from './templateComp/Footer'
import Loader from '../components/Loader'
import { UserContext } from '../components/UserProvider'
import GoTopButton from '../components/GoTopButton'

function Template({separator=false}) {
  const { user, loadUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const loadingRef = useRef(null)
  const location = useLocation()


  useEffect(() => {
    if (loadingRef.current) {
      setIsLoading(false)
    }
  }, [])

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

    return ( 
      <>
        {isLoading ? (
          <Loader ref={loadingRef} />
        ):(
          <>
            <NavBar/>
            {separator && <div className={styles.separator}></div>}
            <GoTopButton />
              <Main separator={separator}>
                <Outlet />
              </Main>
            <Footer />
          </>
        )}
      </>
     )
}

export default Template