import styles from './css/Modal.module.css'
import { createPortal } from 'react-dom'

function Modal({titleElm, onClick, textElm="", children}) {
    const modal = ( 
        <>
            <div className={styles.modal}>
                <div className={styles.groupModal}>
                    <button onClick={onClick} className={styles.closeModal} title='Cerrar'>X</button>
                    <div className={styles.container}>
                        <h2>{titleElm}</h2>
                        <div className={styles.contChildren}>
                            {children}
                        </div>
                        <p>{textElm}</p>
                    </div>
                </div>
            </div>
        </>
     )
    return createPortal(modal, document.body)
}

export default Modal