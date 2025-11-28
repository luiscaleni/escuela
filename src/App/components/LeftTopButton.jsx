import styles from './css/LeftTopButton.module.css'
import ButtonTop from "./ButtonTop"
import { Link } from "react-router-dom"
import arrowLeft from "../assets/icons/utilities/arrowLeft.png"

function LeftTopButton({text, locationElm="", typeElm=""}) {
    return ( 
        <>
            <div className={styles.contLeftTopButton} title="Volver">
                <Link to={locationElm}>
                    <ButtonTop
                        imgElm={arrowLeft}
                        textElm={text}
                        alt='imgBackButton'
                        typeElm={typeElm}
                    />
                </Link>
            </div>
        </>
     )
}

export default LeftTopButton