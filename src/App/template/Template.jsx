import { useEffect, useState, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Template.module.css'
import NavBar from './templateComp/NavBar'
import Main from './templateComp/Main'
import Footer from './templateComp/Footer'
import Loader from '../components/Loader'
import GoTopButton from '../components/GoTopButton'

function Template({separator=false}) {
  const [isLoading, setIsLoading] = useState(true)
  const loadingRef = useRef(null)

  useEffect(() => {
    if (loadingRef.current) {
      setIsLoading(false)
    }
  }, [])

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