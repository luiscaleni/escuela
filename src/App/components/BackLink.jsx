import ButtonTop from "./ButtonTop"
import arrow from "../assets/arrow.png"
import styles from './css/BackLink.module.css'
import { Link } from "react-router-dom"

function BackLink({text, locationElm=""}) {
    
    return ( 
        <>
        <div className={styles.contBackLink}>
            <Link to={locationElm}>
                <ButtonTop
                    imgElm={arrow}
                    textElm={text}
                    alt='imgBackButton'
                />
            </Link>
        </div>
        </>
     );
}

export default BackLink