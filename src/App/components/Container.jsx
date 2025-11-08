import styles from "./css/Container.module.css"

function Container({widthElm, hiddenStyle = false, children}) {
    let styleContainer = (widthElm === "max") ? styles.containerMax : styles.container;
    let hiddenStyleContainer = hiddenStyle ? styles.hiddenStyle : "";

    return ( 
        <>
            <div className={`${styleContainer} ${hiddenStyleContainer}`}>
                {children}
            </div>
        </>
     );
}

export default Container