import { useSearchParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import stylesForm from '../components/css/Form.module.css'
import styles from '../components/css/Form.module.css'
import Template from "../template/Template"
import Section from "../components/Section"
import ContFormInput from "../components/ContFormInput"
import Button from "../components/Button"
import Loader from "../components/Loader"
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  console.log('token:'+token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const alertContainer = document.getElementById('alertContainer')
    if (password !== confirmPassword) {
      alertContainer.classList.add("error")
      setTimeout(() => {
        alertContainer.style.transition=""
        alertContainer.style.display="none"
        alertContainer.classList.add("none")
      }, 3000)
      setMessage("Las contraseñas no coinciden, intente nuevamente.")
      setLoading(false)
      setPassword("")
      setConfirmPassword("")
      return
    }
    
console.log('passw:'+password)
    try {
      const res = await fetch(`${CONFIG_BACKEND.API_DIR}/resetPassw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      })
      const data = await res.json()
      if (data.success) {
        setMessage(data.message)
        setLoading(false)
        navigate(CONFIG_PATHS.SUCCESS_PATH, { state: { success: true, message: "Se actualizó correctamente", path: CONFIG_PATHS.LOGIN_PATH } })
      }else{
        alertContainer.classList.add("error")
        setMessage("❌ "+data.message)
      }
    } catch (error) {
      alertContainer.classList.add("error")
      setMessage("❌ Error de conexión con el servidor")
    }finally{
      setTimeout(() => {
        alertContainer.classList.add("none")
      }, 3000)
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
            <div className={stylesForm.alertContainer} id="alertContainer">{message}</div>
            <h2>Reestablecer contraseña</h2>
              
            <ContFormInput nameElm="Contraseña:">
              <input
                type="password"
                placeholder="Nueva contraseña"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </ContFormInput>

            <ContFormInput nameElm="Confirmar contraseña:">
              <input
                  type="password"
                  placeholder='Confirmar contraseña'
                  value={confirmPassword}
                  name='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
