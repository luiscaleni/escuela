import styles from'./css/Form.module.css'
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "./Button"
import ContFormInput from './ContFormInput'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'

function FormRegister() {
		const [ipAddress, setIpAddress] = useState('')
	
		useEffect(() => {
			const fetchIp = async () => {
				try{
						const response = await fetch("https://api.ipify.org?format=json")
						const data = await response.json()
						setIpAddress(data.ip)
				} catch (error) {
						console.error("Error fetching IP address:", error)
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
		const navigate = useNavigate()

		const [cargando, setCargando] = useState(false)
		
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
					console.error("❌ Error en api:", errorCatch)//
					alertContainer.innerHTML="❌ "+errorCatch.error
					alertContainer.style.backgroundColor="#f00"
					setTimeout(() => {
						formRegister.reset()
					}, 2000)
			}
		}

		return (
				<>
					<div className="spaceTop"></div>
					<div className={styles.contForm}>
						<form className={styles.form} id='formRegister' onSubmit={handleSubmit}>
							<div className={styles.alertContainer} id="alertContainer"></div>
							<h2>Registro</h2>
							<ContFormInput nameElm="Nombres:">
								<input type='text' name='names' value={form.names} id='name' placeholder='Nombres' onChange={handleChange} required />
							</ContFormInput>

							<ContFormInput nameElm="Apellidos:">
								<input type='text' name='lastNames' value={form.lastNames} id='lastNames' placeholder='Apellidos' onChange={handleChange} required />
							</ContFormInput>

							<ContFormInput nameElm="Email:">
								<input type='text' name='email' value={form.email} id='email' placeholder='Email' onChange={handleChange} required />
							</ContFormInput>

							<ContFormInput nameElm="Contraseña:">
								<input type='password' name='passw' value={form.passw} id='passwordRegister' placeholder='Contraseña' onChange={handleChange} required />
							</ContFormInput>
							
							<ContFormInput nameElm="Sexo:">
								<div className={styles.radio}>
									<label>
										<input type='radio' name='sex' value='M' id='masculino' onChange={handleChange} required />
										Masculino
									</label>

									<label>
										<input type='radio' name='sex' value='F' id='femenino' onChange={handleChange} required />
										Femenino
									</label>
								</div>
							</ContFormInput>

							<ContFormInput nameElm="Fecha de Nacimiento:">
								<input type='date' name='birthday' value={form.birthday} id='birthday' onChange={handleChange} required />
							</ContFormInput>

							<ContFormInput nameElm="Código de registro">
								<input type='text' name='hash' value={form.hash} id='hash' placeholder='Código de registro' onChange={handleChange} autoComplete="off" required />
							</ContFormInput>

							<ContFormInput className={styles.btn}>
								<Button
									type='submit'
									altName='Registrarme'
									title='Registrarme'
									disabled={cargando}
								>
									{cargando ? "Cargando..." : "Registrarme"}
								</Button>
							</ContFormInput>
							<Link to='/login'>Iniciar sesión</Link>
						</form>
					</div>
				</>
		)
}

export default FormRegister