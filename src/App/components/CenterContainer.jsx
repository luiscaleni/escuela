import styles from './css/CenterContainer.module.css'

function CenterContainer({children}) {
    return ( 
        <>
            <div className={styles.centerContainer}>
                {children}
            </div>
        </>
     )
}

export default CenterContainer