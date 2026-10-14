import { CONFIG_BACKEND } from '../config/config'
import styles from './css/DarkMode.module.css'
import { useEffect, useContext } from 'react'
import { UserContext } from './UserProvider'
import { useTheme } from './ThemeContext'
import MoonIcon from "/icons/moon.png"

function DarkMode({float = false}) {
    const { user } = useContext(UserContext)
    const { dark, setDark } = useTheme()

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
        !float ? (
            <div className={styles.buttonMode}>
                <p className={`${colorClass} ${styles.desktop}`}>Modo oscuro</p>
                <label className={styles.switch}>
                    <button type='button' className={`${styles.slider} ${dark ? styles.right : styles.left}`} onClick={toggleDarkMode} name='check' aria-pressed={dark}></button>
                    <span className={styles.on}>ON</span>
                    <span className={styles.off}>OFF</span>
                </label>
                <p className={`${colorClass} ${styles.mobile}`}>Modo oscuro</p>
            </div>
        ) : (
            <div className={styles.buttonMode_float} id='buttonMode_float'>
                <label className={styles.switch_float}>
                    <button type='button' className={`${styles.slider} ${dark ? styles.right : styles.left}`} onClick={toggleDarkMode} name='check' aria-pressed={dark}>
                        <img src={MoonIcon} className={styles.moonIcon} alt="Moon" />
                    </button>
                    <span className={styles.off}>OFF</span>
                    <span className={styles.on}>ON</span>
                </label>
            </div>
        )
    )
}

export default DarkMode