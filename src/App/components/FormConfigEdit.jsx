import styles from './css/Form.module.css'
import { useState, useEffect } from 'react'
import Button from './Button'
import Loader from './Loader'
import LoadData from './LoadData'
import ContFormInput from './ContFormInput'
import LeftTopButton from './LeftTopButton'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import { UserContext } from './UserProvider'
import { useContext } from 'react'
import TopButtons from './TopButtons'

function FormConfigEdit() {
    const { user } = useContext(UserContext)
    const [configData, setConfigData]  = useState(null)
    const [cargando, setCargando] = useState(false)
    const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
    const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        loadConfigData()
    }, [])

    
    const [form, setForm] = useState({
        nameWebConfig:  configData?.nameWebConfig || '',
        yearConfig:  configData?.yearConfig || '',
        emailConfig:  configData?.emailConfig || '',
        contentConfig:  configData?.contentConfig || ''
    })
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)
        const alertContainer = document.getElementById('alertContainer')

        const formData = new FormData()
        if (form.nameWebConfig) formData.append('nameWebConfig', form.nameWebConfig)
        if (form.yearConfig) formData.append('yearConfig', form.yearConfig)
        if (form.emailConfig) formData.append('emailConfig', form.emailConfig)     
        if (form.contentConfig) formData.append('contentConfig', form.contentConfig)

        if (user.rolId === 1) {
            try {
                const response = await fetch(`${CONFIG_BACKEND.API_DIR}/config/updateData`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()

                if(data.success){
                    alertContainer.classList.add("success")
                    setMessage("✅ ¡"+data.message+"!")
                    setForm({ 
                        dptoNameConfig:  '',
                        acrDptoNameConfig: '',
                        nameChurchConfig:  '',
                        acrNameChurchConfig:  '',
                        yearConfig:  '',
                        emailConfig:  '',
                        supvNameConfig:  '',
                        contentConfig:  ''
                    })
                    setTimeout(() => {
                        alertContainer.classList.remove("success")
                        setMessage("")
                    }, 3000)
                }else{
                    alertContainer.classList.add("error")
                    setMessage("❌ ¡"+data.error+"!")
                    setTimeout(() => {
                        alertContainer.classList.remove("error")
                        setMessage("")
                    }, 3000)
                }
            } catch (errorCatch) {
                alertContainer.classList.add("error")
                setMessage("❌ ¡"+errorCatch.error+"!")
                setTimeout(() => {
                    alertContainer.classList.remove("error")
                    setMessage("")
                }, 3000)
            } finally{
                setCargando(false)
                setTimeout(() => {
                    alertContainer.classList.remove("error")
                    setMessage("")
                }, 3000)
            }
        }else{
            location(CONFIG_PATHS.HOME_PATH)
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    if (!configData){
        return <Loader />
    }
    
    return ( 
        <>
        <div className={styles.contForm}>
            <form className={styles.form} id='formConfigUpdate' onSubmit={handleSubmit}>
                <div className={styles.alertContainer} id="alertContainer">{message}</div>
                <TopButtons>
                    <LeftTopButton text="Configuración" locationElm={CONFIG_PATHS.CONFIG_PATH} typeElm='expand'/>
                </TopButtons>
                <div className={styles.contElmsForm}>
                    <h1>Editar</h1>
                    <ContFormInput nameElm="departamento">
                        <input type="text" name="nameWebConfig" value={form.nameWebConfig} placeholder={configData.nameWebConfig} onChange={handleChange}/>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="copyright">
                        <input type="number" name="yearConfig" value={form.yearConfig} placeholder={configData.yearConfig} min={2025} max={2026} onChange={handleChange}/>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Email:">
                        <input type="text" name="emailConfig" value={form.emailConfig} placeholder={configData.emailConfig} onChange={handleChange}/>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="contenido">
                        <textarea name="contentConfig" value={form.contentConfig} placeholder={configData.contentConfig} onChange={handleChange}></textarea>
                    </ContFormInput>
                    <Button
                        typeBtn="submit"
                        altName="Guardar cambios"
                        title="Guardar cambios"
                        id="guadarCambios"
                        disabled={cargando}
                    >
                        {cargando ? <Loader mini={true}/> : "Guardar cambios"}
                    </Button>
                </div>
            </form>
        </div>
        </>
     )
}

export default FormConfigEdit