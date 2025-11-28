import styles from './css/CenterTopButton.module.css'
import ButtonTop from "./ButtonTop"
import { Link } from "react-router-dom"

function CenterTopButton({text, locationElm="", typeElm="", imgElm}) {
    return ( 
        <>
            <div className={styles.contCenterTopButton} title={text}>
                <Link to={locationElm}>
                    <ButtonTop
                        imgElm={imgElm}
                        textElm={text}
                        alt='imgBackButton'
                        typeElm={typeElm}
                    />
                </Link>
            </div>
        </>
     )
}

export default CenterTopButton