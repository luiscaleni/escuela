import { useState, useEffect } from "react"
import imgTop from '/icons/utilities/up.png'
import styles from './css/GoTopButton.module.css'
import { useTranslation } from 'react-i18next'

function GoTopButton() {
    const [visible, setVisible] = useState(false)
    const [t, i18n] = useTranslation()  
    
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

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
              title={t('buttons.top')}
              style={{display: visible ? "flex" : "none"}}
              onClick={scrollTop}
              >
                <img src={imgTop} alt="img top" />
            </button>
        </>
     )
}

export default GoTopButton