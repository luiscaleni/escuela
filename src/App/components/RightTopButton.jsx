import styles from './css/RightTopButton.module.css'
import ButtonTop from "./ButtonTop"
import { Link } from "react-router-dom"

function RightTopButton({text, locationElm="", typeElm="", marginRight=false, img=""}) {
    return ( 
        <>
            <div className={!marginRight ? styles.contRightTopButton : styles.contRightTopButtonM}>
                <Link to={locationElm}>
                    <ButtonTop
                        imgElm={img}
                        textElm={text}
                        alt='Right top button'
                        typeElm={typeElm}
                    />
                </Link>
            </div>
        </>
     )
}

export default RightTopButton