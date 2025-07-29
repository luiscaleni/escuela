import { useNavigate, Link } from "react-router-dom"
import styles from './css/Form.module.css'
import { useState } from "react"
import Button from "./Button"
import { useContext } from "react"
import { UserContext } from "./UserProvider"
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'

function FormLogin() {
    const { loadUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const [form, setForm] = useState({
        email: '',
        passw: ''
    })

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
            console.error(error)
        } finally {
            setCargando(false)
        }
    }

    return (
        <>
            <div className="spaceTop"></div>
            <div className={styles.contForm}>
                <form
                    autoComplete="off"
                    className='form'
                    id='formLogin'
                    onSubmit={handleSubmit}
                >
                    <h2>Iniciar Sesión</h2>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Email:</span>
                            <input
                                type="email"
                                placeholder='Email'
                                value={form.email}
                                name='email'
                                id='email'
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Contraseña:</span>
                            <input
                                type="password"
                                placeholder='Contraseña'
                                value={form.passw}
                                name='passw'
                                id='passwordLogin'
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className={`${styles.contFormInput} ${styles.btn}`}>
                        <Button
                            typeBtn='submit'
                            altName='IniciarSesion'
                            title='IniciarSesion'
                            disabled={cargando}
                        >
                            {cargando ? "Cargando..." : "Iniciar Sesión"}
                        </Button>
                    </div>
                    <Link to='/Registro'>Registrarme</Link>
                </form>
            </div>
        </>
    )
}

export default FormLogin
