import styles from './css/Modal.module.css'
import { createPortal } from 'react-dom'
import imgClose from '/icons/utilities/close.png'

function Modal({titleElm, onClickElm, children, formats=""}) {
    const modal = ( 
        <>
            <div className={styles.modal}>
                <div className={styles.groupModal}>
                    <button onClick={onClickElm} className={styles.closeModal} title='Cerrar'>
                        <img src={imgClose} />
                    </button>
                    <div className={styles.container}>
                        <h2>{titleElm}</h2>
                        <div className={styles.contChildren}>
                            {children}
                        </div>
                        {formats && <p>Formatos permitidos: {formats}</p>}
                    </div>
                </div>
            </div>
        </>
     )
    return createPortal(modal, document.body)
}

export default Modal