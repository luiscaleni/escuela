import styles from './css/Button.module.css'

function Button({typeBtn, altName, titleBtn, children, styleBtn=""}) {
    return ( 
        <>
            <button type={typeBtn} alt={altName} name={altName} title={titleBtn} className={styleBtn === 2 ? styles.button2 : styles.button}>
                {children}
            </button>
        </>
     )
}

export default Button