import styles from'./css/Form.module.css'
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import Button from "./Button"
import { CONFIG_BACKEND } from '../config/config'

function FormRegister() {
		const [form, setForm] = useState({
			names: "",
			lastNames: "",
			email: "",
			passw: "",
			sex: "",
			birthday: "",
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
						setTimeout(() => navigate('/login'), 3000)
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
												<div className={styles.contFormInput}>
																<label>
																				<span>Nombres:</span>
																				<input type='text' name='names' id='name' placeholder='Nombres' onChange={handleChange} required />
																</label>
												</div>
												<div className={styles.contFormInput}>
																<label>
																				<span>Apellidos:</span>
																				<input type='text' name='lastNames' id='lastNames' placeholder='Apellidos' onChange={handleChange} required />
																</label>
												</div>
												<div className={styles.contFormInput}>
																<label>
																				<span>Email:</span>
																				<input type='text' name='email' id='email' placeholder='Email' onChange={handleChange} required />
																</label>
												</div>
												<div className={styles.contFormInput}>
																<label>
																				<span>Contraseña:</span>
																				<input type='password' name='passw' id='passwordRegister' placeholder='Contraseña' onChange={handleChange} required />
																</label>
												</div>
												<div className={styles.contFormInput}>
																<label>
																<span>Sexo:</span>
																				<div className={styles.radio}>
																								<label>
																												<input type='radio' name='sex' id='masculino' value='M' onChange={handleChange} required />
																												Masculino
																								</label>

																								<label>
																												<input type='radio' name='sex' id='femenino' value='F' onChange={handleChange} required />
																												Femenino
																								</label>
																				</div>
																</label>
																
												</div>
												<div className={styles.contFormInput}>
																<label>
																				<span>Fecha de Nacimiento:</span>
																				<input type='date' name='birthday' id='birthday' onChange={handleChange} required />
																</label>
												</div>
												<div className={styles.contFormInput}>
																<label>
																				<span>Código de registro</span>
																				<input type='text' name='hash' id='hash' placeholder='Código de registro' onChange={handleChange} autoComplete="off" required />
																</label>
												</div>
												<div className={`${styles.contFormInput} ${styles.btn}`}>
																<Button
																				type='submit'
																				altName='Registrarme'
																				title='Registrarme'
																				disabled={cargando}
																>
																				{cargando ? "Cargando..." : "Registrarme"}
																</Button>
												</div>
																<Link to='/login'>Iniciar sesión</Link>
								</form>
						</div>
				</>
		)
}

export default FormRegister