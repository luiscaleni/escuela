import styles from './css/ShowData.module.css'

function ShowData({children}) {
    return ( 
        <>
            <p className={styles.showData} title='No se puede cambiar este valor'>{children}</p>
        </>
     );
}

export default ShowData;