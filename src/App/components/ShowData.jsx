import styles from './css/ShowData.module.css'

function ShowData({children}) {
    return ( 
        <>
            <p className={styles.showData}>{children}</p>
        </>
     );
}

export default ShowData;