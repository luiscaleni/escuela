import styles from "./css/ButtonTop.module.css"

function ButtonTop({imgElm, textElm, positionElm, typeElm=""}) {
    let cont = textElm ? textElm : null
    let typeStyle

    if(typeElm === "expand"){
        typeStyle = "buttonTopExpand"
    }else{
        typeStyle = "buttonTop"
    }

    if(positionElm){
        typeStyle = styles[positionElm]
    }

    return ( 
        <>
            <button className={`${styles[typeStyle]} ${styles[positionElm]}`}>
                {imgElm ? <img src={imgElm}/> : null}
                {cont}
            </button>
        </>
     );
}

export default ButtonTop