import { forwardRef } from "react"
import styles from './css/Loader.module.css'

const Loader = forwardRef(({ mini = false }, ref) => {
    return ( 
        <>
            <div
                ref={ref}
                className={mini ? styles.loadingContainerMini : styles.loadingContainer}
                id='loadingContainer'
            >
                <div className={mini ? styles.loaderMini : styles.loader}></div>
            </div>
        </>
     )
})

export default Loader