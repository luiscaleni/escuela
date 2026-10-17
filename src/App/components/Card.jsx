import { Link } from "react-router-dom"
import styles from "./css/Card.module.css"
import bannerDefaultCard from '/logo.png'
import { CONFIG_BACKEND } from "../config/config"

function Card({link, cardTitle, ubication="", descriptionCard, imgCard=""}) {
    let imgSrc
    let routeImg = CONFIG_BACKEND.API_DIR+"/src/assets/"+ubication+"/"+imgCard
    
    if(imgCard){
        imgSrc = routeImg
    }

    return ( 
        <>
            <div className={styles.contCard}>
                <Link to={link}>
                    <div className={styles.card}>
                        <img src={!imgCard ? bannerDefaultCard : imgSrc}/>
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>{cardTitle}</h2>
                            <p className={styles.cardText}>{descriptionCard}</p>    
                        </div>
                    </div>
                </Link>
            </div>
        </>
     )
}

export default Card