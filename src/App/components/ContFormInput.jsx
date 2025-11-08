import styles from './css/ContFormInput.module.css'

function ContFormInput({nameElm, titleElm="", iconElm="", children}) {
    const iconAlert = iconElm ? iconElm : null

    return ( 
        <>
            <div className={styles.contFormInput} title={titleElm ? titleElm : ""}>
                <label>
                    <p className={styles.nameElm}>
                        {nameElm}
                        {iconAlert && (
                            <span>{iconAlert}</span>
                        )}   
                    </p>
                    {children}
                </label>
            </div>
        </>
     );
}

export default ContFormInput;