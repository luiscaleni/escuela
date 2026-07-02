import styles from "./css/Main.module.css"

function Main({children, separator=false}) {
    return ( 
        <>
            <main className={`${styles.main} ${separator ? styles.separator : ''}`}>
                <div className={styles.mainContent}>
                    {children}
                </div>
            </main>
        </>
     )
}

export default Main