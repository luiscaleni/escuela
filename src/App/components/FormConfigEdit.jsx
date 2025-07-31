import styles from './css/Form.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import BackLink from './BackLink'
import Loader from './Loader'
import LoadConfigData from './LoadConfigData'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'

function FormConfigEdit() {
    const navigate = useNavigate()
    const [configData, setConfigData]  = useState(null)
    const [cargando, setCargando] = useState(false)
    const loadConfigData = LoadConfigData(setCargando, setConfigData)
    
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

        const formData = new FormData();
        formData.append('dptoNameConfig', form.dptoNameConfig);
        formData.append('acrDptoNameConfig', form.acrDptoNameConfig);
        formData.append('nameChurchConfig', form.nameChurchConfig);
        formData.append('acrNameChurchConfig', form.acrNameChurchConfig);
        formData.append('yearConfig', form.yearConfig);
        formData.append('emailConfig', form.emailConfig);     
        formData.append('supvNameConfig', form.supvNameConfig);
        formData.append('contentConfig', form.contentConfig);

        alertContainer.style.padding="0.5rem"

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
                    <BackLink />
                    <h1>Editar</h1>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Nombre completo:</span>
                            <input type="text" name="dptoNameConfig" placeholder={configData.dptoNameConfig} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Acrónimo del nombre:</span>
                            <input type="text" name="acrDptoNameConfig" placeholder={configData.acrDptoNameConfig} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Nombre de la iglesia:</span>
                            <input type="text" name={configData.nameChurchConfig} placeholder={configData.nameChurchConfig} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Acrónimo del nombre de la iglesia:</span>
                            <input type="text" name={configData.acrNameChurchConfig} placeholder={configData.acrNameChurchConfig} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Copyright del sitio web:</span>
                            <input type="number" name={configData.yearConfig} placeholder={configData.yearConfig} min={2025} max={2026} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Email:</span>
                            <input type="text" name="emailConfig" placeholder={configData.emailConfig} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Nombre del supervisor:</span>
                            <input type="text" name={configData.supvNameConfig} placeholder={configData.supvNameConfig} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Texto de presentación:</span>
                            <textarea name="contentConfig" placeholder={configData.contentConfig} onChange={handleChange}></textarea>
                        </label>
                    </div>
                    <Button
                        typeBtn="submit"
                        altName="Guardar cambios"
                        title="Guardar cambios"
                        id="guadarCambios"
                        disabled={cargando}
                    >
                        {cargando ? "Cargando..." : "Guardar Cambios"}
                    </Button>
                </form>
            </div>
        </>
     );
}

export default FormConfigEdit