import { CONFIG_BACKEND } from '../config/config'
import styles from './css/DarkMode.module.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserProvider'

function DarkMode() {
    const { user } = useContext(UserContext)
    const getInitialDark = () => {
        const saved = localStorage.getItem('dark')
        if (saved !== null) {
            return saved === '1'
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            localStorage.setItem('dark', prefersDark ? '1' : '0')
            return prefersDark
        }
    }

    const [dark, setDark] = useState(getInitialDark)

    useEffect(() => {
        document.body.classList.toggle('dark', dark)
        localStorage.setItem('dark', dark ? '1' : '0')
    }, [dark])
    
    useEffect(()=>{
        if (user && user.darkMode !== undefined && user.darkMode !== null) {
            const userMode = user.darkMode === 1 || user.dakMode === true
            setDark(userMode)
            localStorage.setItem('dark', userMode ? '1' : '0')
            document.body.classList.toggle('dark', userMode)
        }
    },[user])
    
    const toggleDarkMode = async () => {
        const newDark = !dark
        setDark(newDark)
        localStorage.setItem('dark', newDark ? '1' : '0')
        document.body.classList.toggle('dark', newDark)
        
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
                console.warn(error)
            }
        }
    }
    
    const colorClass = styles.colorText
  
    return (
        <div className={styles.buttonMode}>
            <p className={colorClass}>Modo oscuro</p>
            <label className={styles.switch}>
                <button type='button' className={`${styles.slider} ${dark ? styles.right : styles.left}`} onClick={toggleDarkMode} name='check' aria-pressed={dark}></button>
                <span className={styles.on}>ON</span>
                <span className={styles.off}>OFF</span>
            </label>
        </div>
    )
}

export default DarkMode