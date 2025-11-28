import styles from './css/Modal.module.css'
import { createPortal } from 'react-dom'
import imgClose from '../assets/icons/utilities/close.png'

function Modal({titleElm, onClickElm, textElm="", children}) {
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
                        <p>{textElm}</p>
                    </div>
                </div>
            </div>
        </>
     )
    return createPortal(modal, document.body)
}

export default Modal