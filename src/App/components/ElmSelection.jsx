import styles from './css/ElmSelection.module.css'

function ElmSelection({children}) {
    return ( 
        <>
            <div className={styles.contElmSelection}>
                {children}
            </div>
        </>
     );
}

export default ElmSelection