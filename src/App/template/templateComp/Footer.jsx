import styles from "./css/Footer.module.css"
import { CONFIG_APP } from "../../config/config.js"

function Footer() {
    return ( 
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>{CONFIG_APP.APP_COPYRIGHT}</p>
                </div>
            </footer>
        </>
     )
}

export default Footer