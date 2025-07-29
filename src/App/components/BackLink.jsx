import arrow from "../assets/arrow.png"
import styles from "./css/BackLink.module.css"

function BackLink({typeElm}) {
    const backHistory = ()=>{ history.back() }
    let content
    let typeStyle

    if(typeElm === "expand"){
        typeStyle = "backLinkExpand"
        content = " Volver"
    }else{
        typeStyle = "backLink"
    }

    return ( 
        <>
            <div className={styles[typeStyle]} id='backLink' onClick={backHistory}>
                <img src={arrow} alt='imgBackButton'/>
                {content ? content : null}
            </div>
        </>
     );
}

export default BackLink;