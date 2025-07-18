import { Link } from "react-router-dom"
import styles from "./css/Card.module.css"

function Card({link, cardTitle, description, imgCard="#"}) {
    let imgSrc
    if(imgCard !== "#"){
        imgSrc = imgCard
    }
    return ( 
        <>
            <Link to={link}>
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <h2 className={styles.cardTitle}>{cardTitle}</h2>
                        <p className={styles.cardText}>{description}</p>
                        <img src={imgSrc} />
                    </div>
                </div>
            </Link>
        </>
     )
}

export default Card