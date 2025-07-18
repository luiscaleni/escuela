import { forwardRef } from "react"
import styles from './css/Loader.module.css'

const Loader = forwardRef((_, ref) => {
    return ( 
        <>
            <div ref={ref} className={styles.loadingContainer} id='loadingContainer'>
                <div className={styles.loader}></div>
            </div>
        </>
     )
})

export default Loader