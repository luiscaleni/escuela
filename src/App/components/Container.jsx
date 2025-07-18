import styles from "./css/Container.module.css"

function Container({widthElm, children}) {
    return ( 
        <>
            <div className={widthElm === "max" ? styles.containerMax : styles.container}>
                {children}
            </div>
        </>
     )
}

export default Container