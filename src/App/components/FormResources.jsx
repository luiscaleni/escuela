import styles from './css/Form.module.css'
import { useState, useRef, useEffect } from 'react'
import Button from './Button'
import Loader from './Loader'
import ContFormInput from './ContFormInput'
import { CONFIG_BACKEND } from '../config/config'
import TopButtons from './TopButtons'
import TopButtonNone from './TopButtonNone'

function FormResources({onSuccess}) {
    const [cargando, setCargando] = useState(false)
    const [selectedResource, setSelectedResource] = useState(null)
    const [form, setForm] = useState({})
    const formRef = useRef(null)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedResource(file)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)
        const alertContainer = document.getElementById('alertContainer')
        alertContainer.style.padding="0.5rem"
        
        const formData = new FormData()
        formData.append('titleResource', form.titleResource)
        formData.append('descriptionResource', form.descriptionResource)
        formData.append('fileResource', selectedResource)

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/pushResources`, {
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
                setTimeout(() => {
                    alertContainer.classList.remove("success")
                    if(onSuccess && data.newResource){
                        onSuccess(data.newResource)
                    }
                }, 3000)
            }else{
                alertContainer.innerHTML="❌ "+data.error
                alertContainer.classList.add("error")
                setTimeout(() => {
                    alertContainer.classList.remove("error")
                }, 1000)
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error("Error en api:", errorCatch)}
            alertContainer.innerHTML="❌ "+errorCatch.error
            alertContainer.classList.add("error")
            setTimeout(() => {
                alertContainer.classList.remove("error")
            }, 3000)
        } finally{
            setCargando(false)
            setTimeout(() => {
                alertContainer.innerHTML=""
            }, 3000)
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    return ( 
        <>
        <div className={styles.contForm}>
            <form className={styles.form} id='formPushResource' onSubmit={handleSubmit}>
                <TopButtons>
                    <TopButtonNone />
                    <div className={styles.alertContainer} id="alertContainer"></div>
                    <TopButtonNone />
                </TopButtons>
                <div className={styles.contElmsForm}>
                    <ContFormInput nameElm="Recurso">
                        <input 
                            type="text" 
                            alt="titleResource" 
                            name="titleResource" 
                            placeholder= "nombre"
                            onChange={handleChange}
                            required
                        />
                    </ContFormInput>
                    <ContFormInput nameElm="descripcion">
                        <textarea 
                            alt="descriptionResource" 
                            name="descriptionResource" 
                            placeholder="descripcion del recurso"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </ContFormInput>
                    <ContFormInput>
                        <input 
                            type="file" 
                            alt="fileResource" 
                            name="fileResource"
                            onChange={handleFileChange}
                            required
                        />
                    </ContFormInput>
                    
                    <Button
                        typeBtn="submit"
                        altName="Subir"
                        title="Subir"
                        id="subirArchivo"
                        disabled={cargando}
                    >
                        {cargando ? <Loader mini={true}/> : "Subir"}
                    </Button>
                </div>
            </form>
        </div>
        </>
     )
}

export default FormResources