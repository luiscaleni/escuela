import styles from "./css/Main.module.css"

function Main({children}) {
    return ( 
        <>
            <main className={styles.main}>
                <div className={styles.mainContent}>
                    {children}
                </div>
            </main>
        </>
     )
}

export default Main