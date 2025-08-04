import styles from './css/ContFormInput.module.css'

function ContFormInput({nameElm, children}) {
    return ( 
        <>
            <div className={styles.contFormInput}>
                <label>
                    <span>{nameElm}</span>
                    {children}
                </label>
            </div>
        </>
     );
}

export default ContFormInput;