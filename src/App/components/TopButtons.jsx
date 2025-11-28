import styles from './css/TopButtons.module.css'

function TopButtons({children}) {
    return (
        <>
            <div className={styles.topButtons}>{children}</div>
        </>
     )
}

export default TopButtons