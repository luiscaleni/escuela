import styles from './css/ContentTextLand.module.css'
import Button from './Button'
import logo from '/logo_arbitra.png'

function ContentTextLand() {
    return ( 
        <div className={styles.contentTextLand}>
            <h1 className={styles.titleTextLand}>
            </h1>
            <img src={logo} />
            <p className={styles.descript}>Capacitate en las distintas disciplinas.</p>
            <div className={styles.contButton}>
                <Button>Explora programa</Button>
                <Button styleBtn={2}>Ve nuestro campus virtual</Button>
            </div>
        </div>
     );
}

export default ContentTextLand;