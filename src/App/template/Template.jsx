import { useEffect, useState, useRef } from 'react'
import styles from './Template.module.css'
import NavBar from './templateComp/NavBar'
import Main from './templateComp/Main'
import Footer from './templateComp/Footer'
import Loader from '../components/Loader'

function Template({children, separator=false}) {
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
              <Main>
                  {children}
              </Main>
          <Footer />
          </>
        )}
      </>
     )
}

export default Template