import styles from './css/Button.module.css'

function Button({typeBtn, altName, titleBtn, children, styleBtn="", disabled=false}) {
    return ( 
        <>
            <button type={typeBtn} alt={altName} name={altName} title={titleBtn} className={styleBtn === 2 ? styles.button2 : styles.button} disabled={disabled} style={{ backgroundColor: disabled ? '#ccc' : '' }}>
                {children}
            </button>
        </>
     )
}

export default Button