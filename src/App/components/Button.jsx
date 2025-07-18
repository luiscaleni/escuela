import styles from './css/Button.module.css'

function Button({typeBtn, altName, titleBtn, children}) {
    return ( 
        <>
            <button type={typeBtn} alt={altName} name={altName} title={titleBtn} className={styles.button}>
                {children}
            </button>
        </>
     )
}

export default Button