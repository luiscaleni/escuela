import styles from './css/Elementor.module.css'

function Elementor({children}) {
    return ( 
        <>
            <div className={styles.elementor}>
                {children}
            </div>
        </>
     )
}

export default Elementor