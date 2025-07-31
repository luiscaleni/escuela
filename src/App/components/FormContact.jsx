import styles from'./css/Form.module.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "./Button"
import { CONFIG_BACKEND } from '../config/config'

function FormContact() {
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
    /*
    const handleSubmit = async (event) => {
        event.preventDefault()
        const tagForm = document.getElementById("formRegister")
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
                email: event.target.email.value,
                country: event.target.country.value,
                province: event.target.province.value,
                message: event.target.message.value
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
                const data = await response.json()
                
                if(data.error==="Faltan datos"){
                        alertContainer.style.backgroundColor="#f00"
                        alertContainer.innerHTML="❌ "+data.error
                        tagForm.reset()
                        setTimeout(() => {
                                alertContainer.innerHTML=""
                                alertContainer.style.padding=""
                        }, 3000)
                }else if(data.success === true){
                        alertContainer.style.backgroundColor="#059c38"
                        alertContainer.innerHTML="✅ "+data.message
                        setCargando(true)
                        setTimeout(() => {
                                navigate('/login')
                        }, 3000)
                }
        } catch (errorCatch) {
                console.error("❌ Error en api:", errorCatch)//
                alertContainer.innerHTML="❌ "+errorCatch.error
                alertContainer.style.backgroundColor="#f00"
                setTimeout(() => {
                        tagForm.reset()
                }, 2000)
        }
    }
    */

    return (
        <>
            <div className={styles.contForm}>
                <form className={styles.form} id='formRegister' action="mailto:luis.caleni@gmail.com" method="post" enctype="text/plain">
                        <div className={styles.alertContainer} id="alertContainer"></div>
                        <h2>Contactate con nosotros</h2>
                        <div className={styles.contFormInput}>
                                <label>
                                        <span>Nombre y apellido: *</span>
                                        <input type='text' name='names' id='name' placeholder='Nombre y apellido' onChange={handleChange} required />
                                </label>
                        </div>
                        <div className={styles.contFormInput}>
                                <label>
                                        <span>Email: *</span>
                                        <input type='text' name='email' id='email' placeholder='Email' onChange={handleChange} required />
                                </label>
                        </div>
                        <div className={styles.contFormInput}>
                                <label>
                                <span>País:</span>
                                <select className={styles.select} name='country' onChange={handleChange}>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Brasil">Brasil</option>
                                        <option value="Chile">Chile</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="Paraguay">Paraguay</option>
                                        <option value="Perú">Perú</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="Venezuela">Venezuela</option>
                                </select>
                                </label>
                        </div>
                        <div className={styles.contFormInput}>
                                <label>
                                <span>Provincia:</span>
                                <input type="text" name="province" placeholder="Provincia o departamento" id="province" onChange={handleChange}/>
                                </label>
                        </div>
                        <div className={styles.contFormInput}>
                                <label>
                                <span>Mensaje: *</span>
                                <textarea id="message" name="message" placeholder="Mensaje" onChange={handleChange}></textarea>
                                </label>
                        </div>
                        <div className={`${styles.contFormInput} ${styles.btn}`}>
                                <Button
                                        type='submit'
                                        altName='enviar'
                                        title='Enviar'
                                        disabled={cargando}
                                >
                                        {cargando ? "Cargando..." : "Enviar"}
                                </Button>
                        </div>
                </form>
            </div>
        </>
    )
}

export default FormContact