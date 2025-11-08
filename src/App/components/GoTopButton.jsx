import { useState, useEffect } from "react"
import imgTop from '../assets/icons/utilities/up.png'
import styles from './css/GoTopButton.module.css'

function GoTopButton() {
    const [visible, setVisible] = useState(false)
    useEffect(()=>{
        const handleButtonTop = ()=>{
            setVisible(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleButtonTop)
        handleButtonTop()
        
        return ()=> window.removeEventListener('scroll', handleButtonTop)
    },[])

    const scrollTop = ()=>{
        window.scrollTo({top:0, behavior:'smooth'})
    }

    return ( 
        <>
            <button 
              className={styles.goTopButton}
              id='goTopButton'
              title="Subir"
              style={{display: visible ? "flex" : "none"}}
              onClick={scrollTop}
              >
                <img src={imgTop} alt="img top" />
            </button>
        </>
     )
}

export default GoTopButton