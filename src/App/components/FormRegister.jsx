import styles from'./css/Form.module.css'
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "./Button"
import ContFormInput from './ContFormInput'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Loader from './Loader'
import { useTranslation } from 'react-i18next'

function FormRegister() {
	const [ipAddress, setIpAddress] = useState('')
	const [cargando, setCargando] = useState(false)
	const navigate = useNavigate()
	const [t, i18n] = useTranslation()  

    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

	useEffect(() => {
		const fetchIp = async () => {
			try{
				const response = await fetch("https://api.ipify.org?format=json")
				const data = await response.json()
				setIpAddress(data.ip)
			} catch (error) {
				if (import.meta.env.DEV) { console.error("Error fetching IP address:", error)}
			}
		}

		fetchIp()
	}, [])

	const [form, setForm] = useState({
		names: "",
		lastNames: "",
		email: "",
		passw: "",
		sex: "",
		birthday: "",
		ipAddress: "",
		hash: ""
	})
	
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const formRegister = document.getElementById("formRegister")
		const alertContainer = document.getElementById('alertContainer')
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!emailRegex.test(form.email)) {
			alert("Email inválido")
			return
		}
		if (form.passw.length < 6) {
			alert("La contraseña debe tener al menos 8 caracteres")
			return
		}

		const userData = {
			names: event.target.names.value,
			lastNames: event.target.lastNames.value,
			email: event.target.email.value,
			passw: event.target.passw.value,
			sex: event.target.sex.value,
			birthday: event.target.birthday.value,
			ipAddress: ipAddress,
			hash: event.target.hash.value
		}
		alertContainer.style.padding="0.5em"

		try {
			const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/save`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(userData)
			})
			const contentType = response.headers.get('content-type')
			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()

				if (data.success) {
					alertContainer.style.backgroundColor = "#059c38"
					alertContainer.innerHTML = "✅ " + data.message
					setCargando(true)
					setTimeout(() => navigate(CONFIG_PATHS.LOGIN_PATH), 3000)
				} else {
					alertContainer.style.backgroundColor = "#f00"
					alertContainer.innerHTML = "❌ " + data.error
					formRegister.reset()
					setTimeout(() => {
						alertContainer.innerHTML = ""
						alertContainer.style.padding = ""
					}, 3000)
				}
			} else {
				const text = await response.text()
				throw new Error(`❌ Respuesta no JSON: ${text}`)
			}
		} catch (errorCatch) {
				if (import.meta.env.DEV) { console.error("❌ Error en api:", errorCatch) }
				alertContainer.innerHTML="❌ "+errorCatch.error
				alertContainer.style.backgroundColor="#f00"
				setTimeout(() => {
					formRegister.reset()
				}, 2000)
		}
	}

	return (
		<>
		<div className={styles.contForm}>
			<form className={styles.form} id='formRegister' onSubmit={handleSubmit}>
				<div className={styles.alertContainer} id="alertContainer"></div>
				<h2>{t('buttons.register')}</h2>
				<ContFormInput nameElm={t('form.register.names')+" :"}>
					<input type='text' name='names' value={form.names} id='name' placeholder={t('form.register.names')} onChange={handleChange} required />
				</ContFormInput>

				<ContFormInput nameElm={t('form.register.lastName')+" :"}>
					<input type='text' name='lastNames' value={form.lastNames} id='lastNames' placeholder={t('form.register.lastName')} onChange={handleChange} required />
				</ContFormInput>

				<ContFormInput nameElm={t('form.login.email')+" :"}>
					<input type='text' name='email' value={form.email} id='email' placeholder={t('form.login.email')} onChange={handleChange} required />
				</ContFormInput>

				<ContFormInput nameElm={t('form.login.passw')+" :"}>
					<input type='password' name='passw' value={form.passw} id='passwordRegister' placeholder={t('form.login.passw')} onChange={handleChange} required />
				</ContFormInput>
				
				<ContFormInput nameElm={t('form.register.sex')+" :"}>
					<div className={styles.radio}>
						<label>
							<input type='radio' name='sex' value='M' id='masculino' onChange={handleChange} required />
							{t('form.register.male')}
						</label>

						<label>
							<input type='radio' name='sex' value='F' id='femenino' onChange={handleChange} required />
							{t('form.register.female')}
						</label>
					</div>
				</ContFormInput>

				<ContFormInput nameElm={t('form.register.birthday')+" :"}>
					<input type='date' name='birthday' value={form.birthday} id='birthday' onChange={handleChange} required />
				</ContFormInput>

				<ContFormInput nameElm={t('form.register.code')+" :"}>
					<input type='password' name='hash' value={form.hash} id='hash' placeholder={t('form.register.code')} onChange={handleChange} autoComplete="off" required />
				</ContFormInput>

				<ContFormInput className={styles.btn}>
					<Button
						type='submit'
						altName='Registrarme'
						title={t('buttons.register')}
						disabled={cargando}
					>
						{cargando ? <Loader mini={true}/> : t('buttons.register')}
					</Button>
				</ContFormInput>
				<p className={styles.smallText}>{t('buttons.youAccount')}<Link to='/login'>{t('buttons.login')}</Link></p>
			</form>
		</div>
		</>
	)
}

export default FormRegister