import { useNavigate, Link } from "react-router-dom"
import styles from './css/Form.module.css'
import { useEffect, useState } from "react"
import Button from "./Button"
import { useContext } from "react"
import { UserContext } from "./UserProvider"
import ContFormInput from "./ContFormInput"
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Loader from "./Loader"
import { useTranslation } from 'react-i18next'

function FormLogin() {
    const { loadUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const [form, setForm] = useState({
        email: '',
        passw: ''
    })
    const [t, i18n] = useTranslation()  

    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(form),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            if (data.success) {
                await loadUser()
                setForm({ email: '', passw: '' })
                navigate(CONFIG_PATHS.YOUR_WELLCOME_PATH)
            } else {
                alert("Credenciales incorrectas. Intenta nuevamente.")
            }
        } catch (error) {
            alert("Error al iniciar sesión. Intenta nuevamente.")
            if (import.meta.env.DEV) {console.error(error)}
        } finally {
            setCargando(false)
        }
    }

    return (
        <>
            <div className={styles.contForm}>
                <form
                    autoComplete="off"
                    id='formLogin'
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <h2>{t('buttons.login')}</h2>
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
                    <ContFormInput nameElm={t('form.login.passw')+" :"}>
                        <input
                            type="password"
                            placeholder={t('form.login.passw')}
                            value={form.passw}
                            name='passw'
                            id='passwordLogin'
                            onChange={handleChange}
                            required
                        />
                    </ContFormInput>
                    <ContFormInput className={styles.btn}>
                        <Button
                            typeBtn='submit'
                            altName='IniciarSesion'
                            title={t('buttons.login')}
                            disabled={cargando}
                        >
                            {cargando ? <Loader mini={true}/> : t('buttons.login')}
                        </Button>
                    </ContFormInput>
                    <p className={styles.smallText}>
                        <Link to='/ForgetPassw' title="Olvidé mi contraseña">{t('buttons.fPassw')}</Link>
                        |
                        <Link to='/Registro' title="Me quiero registrar">{t('buttons.iWantR')}</Link>
                    </p>
                    
                </form>
            </div>
        </>
    )
}

export default FormLogin
