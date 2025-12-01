import styles from './css/Form.module.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from "./Button"
import ContFormInput from "./ContFormInput"
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Loader from "./Loader"
import { useTranslation } from 'react-i18next'


function FormForgetPassw() {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const [t, i18n] = useTranslation()  
    
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const alertContainer = document.getElementById('alertContainer')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!emailRegex.test(form.email)) {
			alert("Email inválido")
			return
		}

        const userData = {
            email: event.target.email.value
        }

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/forgetPassw`, {
                method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(userData)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            if (data.success) {
                setLoading(true)
                setTimeout(() => {
                    setForm({ email: ''})
                }, 2000)
                navigate(CONFIG_PATHS.SUCCESS_PATH, { state: { success: true, message: "Si esta registrado se le enviará un email", path: CONFIG_PATHS.LOGIN_PATH } })
            } else {
                alertContainer.innerHTML="❌ "+data.message
                alertContainer.classList.add("error")
			}
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={styles.contForm}>
                <form
                    autoComplete="off"
                    id='formForgetPassw'
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.alertContainer} id="alertContainer"></div>
                    <h2>{t('form.recoveryPassw.title')}</h2>
                    <ContFormInput nameElm={t('form.login.email')+" :"}>
                        <input
                            type="email"
                            placeholder={t('form.login.email')}
                            value={form.email}
                            name='email'
                            id='email'
                            onChange={handleChange}
                            required
                        />
                    </ContFormInput>
                    
                    <ContFormInput className={styles.btn}>
                        <Button
                            typeBtn='submit'
                            altName='Recuperar'
                            title={t('buttons.recovery')}
                            disabled={loading}
                        >
                            {loading ? <Loader mini={true}/> : t('buttons.recovery')}
                        </Button>
                    </ContFormInput>
                    <p className={styles.smallText}>{t('buttons.youAccount')}<Link to='/login'>{t('buttons.login')}</Link></p>
                </form>
            </div>
        </>
    )
}

export default FormForgetPassw
