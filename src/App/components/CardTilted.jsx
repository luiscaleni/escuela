import { Link } from 'react-router-dom'
import styles from './css/CardTilted.module.css'

function CardTilted({title="", subtitle="", imgSrc=""}) {
    return ( 
        <Link className={styles.linkSports} to="/deportes">
            <div className={styles.cardTilted}>
                
                <div className={styles.contentRight}>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
                <div className={styles.opacity}></div>
                <img src={imgSrc} />
            </div>
        </Link>
     )
}

export default CardTilted