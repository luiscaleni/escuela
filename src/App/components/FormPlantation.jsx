import styles from './css/Form.module.css'
import { useState, useRef, useEffect, useContext } from 'react'
import Button from './Button'
import Loader from './Loader'
import ContFormInput from './ContFormInput'
import { UserContext } from '../components/UserProvider'
import { CONFIG_BACKEND } from '../config/config'

function FormPlantation({onSuccess, countryPlant}) {
    const { user } = useContext(UserContext)
    const [cargando, setCargando] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [form, setForm] = useState({})
    const formRef = useRef(null)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
    }
    console.log(user.id)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)
        const alertContainer = document.getElementById('alertContainer')
        
        const formData = new FormData()
        formData.append('countryPlant', countryPlant)
        formData.append('provincePlant', form.provincePlant)
        formData.append('matchPlant', form.matchPlant)
        formData.append('streetPlant', form.streetPlant)
        formData.append('membersPlant', form.membersPlant)
        formData.append('leaderPlant', form.leaderPlant)
        formData.append('startPlant', form.startPlant)
        formData.append('filePlant', selectedImage)
        formData.append('userId', user.id)

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/pushPlant`, {
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
                formRef.current.reset()
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
            if (import.meta.env.DEV) {console.error("❌ Error en api:", errorCatch)}
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
            <form className={styles.form} ref={formRef} id='formPushPlant' onSubmit={handleSubmit}>
                <div className={styles.alertContainer} id="alertContainer"></div>
                <ContFormInput nameElm={t('form.plantation.province')+" :"}>
                    <input 
                        type="text" 
                        alt="provincePlant" 
                        name="provincePlant" 
                        placeholder= {t('form.plantation.provinceH')}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.match')+" :"}>
                    <input 
                        type="text"
                        alt="matchPlant" 
                        name="matchPlant" 
                        placeholder={t('form.plantation.matchH')}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.street')+" :"}>
                    <input 
                        type="text"
                        alt="streetPlant" 
                        name="streetPlant" 
                        placeholder={t('form.plantation.streetH')}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.members')+" :"}>
                    <input 
                        type="number"
                        alt="membersPlant" 
                        name="membersPlant" 
                        placeholder={t('form.plantation.membersH')}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.leader')+" :"}>
                    <input 
                        type="text"
                        alt="leaderPlant" 
                        name="leaderPlant" 
                        placeholder={t('form.plantation.leaderH')}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.start')+" :"}>
                    <input 
                        type="date"
                        alt="startPlant" 
                        name="startPlant" 
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput>
                    <input 
                        type="file" 
                        alt="filePlant" 
                        name="filePlant"
                        onChange={handleFileChange}
                    />
                </ContFormInput>
                
                <Button
                    typeBtn="submit"
                    altName={t('buttons.public')}
                    title={t('buttons.public')}
                    disabled={cargando}
                >
                    {cargando ? <Loader mini={true}/> : t('buttons.public')}
                </Button>
            </form>
        </div>
        </>
     )
}

export default FormPlantation