import styles from "./css/ButtonTop.module.css"

function ButtonTop({imgElm, onClick ,textElm="", typeElm=""}) {
    let typeStyle

    if(typeElm === "expand"){
        typeStyle = "buttonTopExpand"
    }else{
        typeStyle = "buttonTop"
    }

    return ( 
        <>
            <button className={styles[typeStyle]} onClick={onClick} title={textElm}>
                {imgElm ? <img src={imgElm}/> : null}
                <p className={styles.textButton}>{textElm}</p>
            </button>
        </>
     );
}

export default ButtonTop