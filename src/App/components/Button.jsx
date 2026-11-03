import styles from './css/Button.module.css'

function Button({typeBtn, altName, titleBtn, children, styleBtn="", disabled=false, onClick}) {
    return ( 
        <>
            <button 
                type={typeBtn} 
                onClick={onClick}
                alt={altName} 
                name={altName} 
                title={titleBtn} 
                disabled={disabled} 
                style={{ backgroundColor: disabled ? '#ccc' : '' }}
                className={
                    styleBtn === 1 ? styles.button : (styleBtn === 2 ? styles.button2 : styles.buttonHome)
                } 
            >
                {children}
            </button>
        </>
     )
}

export default Button