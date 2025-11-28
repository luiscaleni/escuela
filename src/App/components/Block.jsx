import styles from './css/Block.module.css'

function Block({children}) {
    return ( 
        <>
            <div className={styles.block}>
                {children}
            </div>
        </>
     )
}

export default Block