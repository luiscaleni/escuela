import styles from "./css/Main.module.css"

function MainCampus({children, separator=false}) {
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

export default MainCampus