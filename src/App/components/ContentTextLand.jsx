import styles from './css/ContentTextLand.module.css'
import Button from './Button'

function ContentTextLand() {
    return ( 
        <div className={styles.contentTextLand}>
            <h1 className={styles.titleTextLand}>
                Lleva el Reglamento al
                <span>Siguiente Nivel</span>
            </h1>
            <p className={styles.descript}>Formación profesional de árbitros con análisis de video VAR, tecnología de seguimiento, simulación de toma de decisiones e instrucción certificada FIFA/AFA.</p>
            <div className={styles.contButton}>
                <Button>Explora programa</Button>
                <Button styleBtn={2}>Ve nuestro campus virtual</Button>
            </div>
        </div>
     );
}

export default ContentTextLand;