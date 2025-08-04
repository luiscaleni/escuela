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