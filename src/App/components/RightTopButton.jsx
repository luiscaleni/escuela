import styles from './css/RightTopButton.module.css'
import ButtonTop from "./ButtonTop"
import { Link } from "react-router-dom"

function RightTopButton({text, locationElm="", onClick, typeElm="", marginRight=false, imgElm=""}) {
    return ( 
        <>
            <div className={!marginRight ? styles.contRightTopButton : styles.contRightTopButtonM} onClick={onClick} >
                <Link to={locationElm}>
                    <ButtonTop
                        imgElm={imgElm}
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