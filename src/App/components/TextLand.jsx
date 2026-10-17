import styles from './css/TextLand.module.css'
import logo from '/logo_arbitra.png'

function TextLand() {
    return ( 
        <>
            <div className={styles.textLand}>
                <img src={logo}/>
                <div className={styles.contentText}>
                    <h2 className={styles.titleTextLand}>CATEGORÍA <br />FUTBOL</h2>
                    <span className={styles.titleDescript}>ESPECIALIZACIÓN EN:</span>
                    <p className={styles.descript}>FÚTBOL 11, FÚTBOL 5, FÚTBOL PLAYA</p>
                </div>
            </div>
        </>
     )
}

export default TextLand