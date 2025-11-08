import styles from './css/Form.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Loader from './Loader'
import LoadData from './LoadData'
import ContFormInput from './ContFormInput'
import LeftTopButton from './LeftTopButton'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import { UserContext } from './UserProvider'
import { useContext } from 'react'

function FormConfigEdit() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [configData, setConfigData]  = useState(null)
    const [cargando, setCargando] = useState(false)
    const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
    const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)
    
    useEffect(() => {
        loadConfigData()
    }, [])

    
    const [form, setForm] = useState({
        dptoNameConfig:  configData?.dptoNameConfig || '',
        acrDptoNameConfig: configData?.acrDptoNameConfig || '',
        nameChurchConfig:  configData?.nameChurchConfig || '',
        acrNameChurchConfig:  configData?.acrNameChurchConfig || '',
        yearConfig:  configData?.yearConfig || '',
        emailConfig:  configData?.emailConfig || '',
        supvNameConfig:  configData?.supvNameConfig || '',
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
        if (form.dptoNameConfig) formData.append('dptoNameConfig', form.dptoNameConfig)
        if (form.acrDptoNameConfig) formData.append('acrDptoNameConfig', form.acrDptoNameConfig)
        if (form.nameChurchConfig) formData.append('nameChurchConfig', form.nameChurchConfig)
        if (form.acrNameChurchConfig) formData.append('acrNameChurchConfig', form.acrNameChurchConfig)
        if (form.yearConfig) formData.append('yearConfig', form.yearConfig)
        if (form.emailConfig) formData.append('emailConfig', form.emailConfig)     
        if (form.supvNameConfig) formData.append('supvNameConfig', form.supvNameConfig)
        if (form.contentConfig) formData.append('contentConfig', form.contentConfig)

        alertContainer.style.padding="0.5rem"

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
                    alertContainer.innerHTML="✅ "+data.message
                    alertContainer.classList.add("success")
                    navigate(CONFIG_PATHS.CONFIG_PATH)
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
                }else{
                    alertContainer.innerHTML="❌ "+data.error
                    alertContainer.classList.add("error")
                }
            } catch (errorCatch) {
                console.error("❌ Error en api:", errorCatch)
                alertContainer.innerHTML="❌ "+errorCatch.error
                alertContainer.classList.add("error")
            } finally{
                setCargando(false)
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
                <div className={styles.alertContainer} id="alertContainer"></div>
                <LeftTopButton text="Configuración" locationElm={CONFIG_PATHS.CONFIG_PATH} typeElm='expand'/>
                <h1>Editar</h1>
                <ContFormInput nameElm="Nombre completo del dpto:">
                    <input type="text" name="dptoNameConfig" value={form.dptoNameConfig} placeholder={configData.dptoNameConfig} onChange={handleChange}/>
                </ContFormInput>
                
                <ContFormInput nameElm="Acrónimo del nombre del dpto:">
                    <input type="text" name="acrDptoNameConfig" value={form.acrDptoNameConfig} placeholder={configData.acrDptoNameConfig} onChange={handleChange}/>
                </ContFormInput>
                
                <ContFormInput nameElm="Nombre de la iglesia:">
                    <input type="text" name="nameChurchConfig" value={form.nameChurchConfig} placeholder={configData.nameChurchConfig} onChange={handleChange}/>
                </ContFormInput>
                
                <ContFormInput nameElm="Acrónimo del nombre de la iglesia:">
                    <input type="text" name="acrNameChurchConfig" value={form.acrNameChurchConfig} placeholder={configData.acrNameChurchConfig} onChange={handleChange}/>
                </ContFormInput>
                
                <ContFormInput nameElm="Copyright del sitio web:">
                    <input type="number" name="yearConfig" value={form.yearConfig} placeholder={configData.yearConfig} min={2025} max={2026} onChange={handleChange}/>
                </ContFormInput>
                
                <ContFormInput nameElm="Email:">
                    <input type="text" name="emailConfig" value={form.emailConfig} placeholder={configData.emailConfig} onChange={handleChange}/>
                </ContFormInput>
                
                <ContFormInput nameElm="Nombre del supervisor:">
                    <input type="text" name="supvNameConfig" value={form.supvNameConfig} placeholder={configData.supvNameConfig} onChange={handleChange}/>
                </ContFormInput>
                
                <ContFormInput nameElm="Texto de presentación:">
                    <textarea name="contentConfig" value={form.contentConfig} placeholder={configData.contentConfig} onChange={handleChange}></textarea>
                </ContFormInput>
                <Button
                    typeBtn="submit"
                    altName="Guardar cambios"
                    title="Guardar cambios"
                    id="guadarCambios"
                    disabled={cargando}
                >
                    {cargando ? <Loader mini={true}/> : "Guardar Cambios"}
                </Button>
            </form>
        </div>
        </>
     )
}

export default FormConfigEdit