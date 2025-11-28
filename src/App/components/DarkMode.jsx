import { useTranslation } from 'react-i18next'
import { CONFIG_BACKEND } from '../config/config'
import styles from './css/DarkMode.module.css'
import { useEffect, useContext } from 'react'
import { UserContext } from './UserProvider'
import { useTheme } from './ThemeContext'

function DarkMode() {
    const { user } = useContext(UserContext)
    const { dark, setDark } = useTheme()
    const [t, i18n] = useTranslation()  

    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    useEffect(()=>{
        if (user && user.darkMode !== undefined && user.darkMode !== null) {
            const userMode = user.darkMode === 1 || user.darkMode === '1' || user.darkMode === true
            setDark(userMode)
        }
    },[user, setDark])
    
    const toggleDarkMode = async () => {
        const newDark = !dark
        setDark(newDark)
        
        if (user) {
            const formData = new FormData()
            formData.append('check', newDark ? '1' : '0')

            try {
                const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/darkMode`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                })
                if (!response.ok) throw new Error('Network response was not ok')
                await response.json()
            } catch (error) {
                if (import.meta.env.DEV) { console.warn(error)}
            }
        }
    }
    
    const colorClass = styles.colorText
  
    return (
        <div className={styles.buttonMode}>
            <p className={colorClass}>{t('navbar.darkMode')}</p>
            <label className={styles.switch}>
                <button type='button' className={`${styles.slider} ${dark ? styles.right : styles.left}`} onClick={toggleDarkMode} name='check' aria-pressed={dark}></button>
                <span className={styles.on}>ON</span>
                <span className={styles.off}>OFF</span>
            </label>
        </div>
    )
}

export default DarkMode