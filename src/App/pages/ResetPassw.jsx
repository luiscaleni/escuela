import styles from '../components/css/Form.module.css'
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../components/UserProvider"
import Button from "../components/Button"
import ContFormInput from "../components/ContFormInput"
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Loader from "../components/Loader"
import Template from '../template/Template'
import Section from '../components/Section'

function ResetPassw() {
    const { loadUser } = useContext(UserContext)
    const {id_token} = useParams()
    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ passwOne: '', passwTwo: '' })
    const navigate = useNavigate()


    useEffect(()=>{
        if (!id_token) return
        loadEmail()
    },[id_token])

    const encoded = encodeURIComponent(id_token);
    const loadEmail = async ()=>{
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/consultToken?id_token=${encoded}`)
            const data = await res.json()
            if(data.success){
                setEmail(data.result)
            }else{
                console.error(data.message)
            }
        } catch (error) {
            console.error('Error en API: ', error)
        }finally{
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        if (form.passwOne === form.passwTwo) {  
            const formData = new FormData()
            formData.append('passwOne', form.passwOne)
            formData.append('email', email.email_token)

            try {
                const response = await fetch(`${CONFIG_BACKEND.API_DIR}/updatePassw`, {
                    method: 'POST',
                    body: formData,
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()

                if (data.success) {
                    await loadUser()
                    setForm({ passwOne: '', passwTwo: '' })
                    navigate(CONFIG_PATHS.YOUR_WELLCOME_PATH)
                } else {
                    console.log(data.message)
                }
            } catch (err) {
                alert("Error al iniciar sesión. Intenta nuevamente.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }else{
            alert("Las contraseñas no coinciden")
        }
    }

    return (
        <>
            <Template separator={true}>
                <Section>
                    <div className={styles.contForm}>
                        <form
                            autoComplete="off"
                            id='formReset'
                            className={styles.form}
                            onSubmit={handleSubmit}
                        >
                            <h2>Reestablecer contraseña</h2>
                            
                            <ContFormInput nameElm="Contraseña:">
                                <input
                                    type="password"
                                    placeholder='Contraseña'
                                    value={form.passwOne}
                                    name='passwOne'
                                    id='passwordResetOne'
                                    onChange={handleChange}
                                    required
                                />
                            </ContFormInput>

                            <ContFormInput nameElm="Confirmar contraseña:">
                                <input
                                    type="password"
                                    placeholder='Confirmar contraseña'
                                    value={form.passwTwo}
                                    name='passwTwo'
                                    id='passwordResetTwo'
                                    onChange={handleChange}
                                    required
                                />
                            </ContFormInput>
                            <ContFormInput className={styles.btn}>
                                <Button
                                    typeBtn='submit'
                                    altName='Guardar cambios'
                                    title='Guardar cambios'
                                    disabled={loading}
                                >
                                    {loading ? <Loader mini={true}/> : "Guardar cambios"}
                                </Button>
                            </ContFormInput>                    
                        </form>
                    </div>
                </Section>
            </Template>
        </>
    )
}

export default ResetPassw
