import { Link } from "react-router-dom"
import styles from './css/Form.module.css'
import { useState } from "react"
import Button from "./Button"
import ContFormInput from "./ContFormInput"
import { CONFIG_BACKEND } from '../config/config'
import Loader from "./Loader"

function FormForgetPassw() {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: '' })
    const alertContainer = document.getElementById('alertContainer')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

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
                alertContainer.style.backgroundColor = "rgba(40, 196, 79, 1)"
                alertContainer.innerHTML = "✅ " + data.message
                setLoading(true)
                setTimeout(() => {
                    setForm({ email: ''})
                    alertContainer.style.backgroundColor= "rgb(255 255 255)"
                    alertContainer.innerHTML=""
                }, 2000)
            } else {
				console.error(data.message)
			}
        } catch (errorCatch) {
            console.error(errorCatch.message)
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
                    <h2>Recuperar contraseña</h2>
                    <ContFormInput nameElm="Email:">
                        <input
                            type="email"
                            placeholder='Email'
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
                            title='Recuperar'
                            disabled={loading}
                        >
                            {loading ? <Loader mini={true}/> : "Recuperar"}
                        </Button>
                    </ContFormInput>
                    <p className={styles.smallText}>¿Ya tienes una cuenta?, <Link to='/login'>Inicia Sesión</Link></p>
                </form>
            </div>
        </>
    )
}

export default FormForgetPassw
