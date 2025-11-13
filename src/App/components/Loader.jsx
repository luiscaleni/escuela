import { forwardRef } from "react"
import styles from './css/Loader.module.css'

const Loader = forwardRef(({ mini = false, visible = true }, ref) => {
    return ( 
        <div
            ref={ref}
            className={`${mini ? styles.loadingContainerMini : styles.loadingContainer} ${!visible ? styles.hide : ''}`}
        >
            <div className={mini ? styles.loaderMini : styles.loader}></div>
            {!mini && <p>Cargando</p>}
        </div>
     )
})

export default Loader