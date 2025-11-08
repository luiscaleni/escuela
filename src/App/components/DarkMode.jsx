import { CONFIG_BACKEND } from '../config/config'
import styles from './css/DarkMode.module.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserProvider'

function DarkMode({noChangeText=false}) {
    const { user, loadUser } = useContext(UserContext)
    const [dark, setDark] = useState(()=>{
        const savedMode = user?.darkMode ?? localStorage.getItem('dark') === '1'
        return Boolean(savedMode)
    })

    const [form, setForm] = useState({
        check: dark??'0'
    })
    

    
    const updateDarkMode = async (newDark) => {
        const formData = new FormData();
        formData.append('check', newDark?'1':'0');

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/darkMode`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()

            if (data.success) {
                console.log(data.message)
            } else {
                console.log(data.error)
            }
        } catch (error) {
            alert(error)
        } finally{
            if (user) user.darkMode = newDark
        }
    }

    /*Se envia valores */
    const toggleDarkMode = async () => {
        const newDark = !dark
        setDark(newDark)
        localStorage.setItem('dark', newDark ? '1' : '0')
        await updateDarkMode(newDark)
    }

    useEffect(() => {
        if (dark) {
            document.body.classList.add('dark')
            localStorage.setItem('dark', '1')
        } else {
            document.body.classList.remove('dark')
            localStorage.setItem('dark', '0')
        }
    }, [dark])
    
    let colorClass
    if(noChangeText){
        colorClass = styles.colorText
    }else{
        colorClass = dark ? styles.colorText_dark : styles.colorText
    }
  
    return (
        <div className={styles.buttonMode}>
            <p className={colorClass}>Dark mode</p>
            <label className={styles.switch}>
                <button type='button' className={dark ? `${styles.slider} ${styles.right}` : `${styles.slider} ${styles.left}`}onClick={toggleDarkMode} name='check'></button>
                <span className={styles.on}>ON</span>
                <span className={styles.off}>OFF</span>
            </label>
        </div>
    )
}

export default DarkMode