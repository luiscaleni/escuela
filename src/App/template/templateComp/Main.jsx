import styles from "./css/Main.module.css"

function Main({children, separator=false}) {
    return ( 
        <>
            <main className={styles.main}>
                <div className={separator && styles.separator}></div>
                <div className={styles.mainContent}>
                    {children}
                </div>
            </main>
        </>
     )
}

export default Main