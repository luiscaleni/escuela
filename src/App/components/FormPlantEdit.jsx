import styles from './css/Form.module.css'
import { useState, useRef, useEffect, useContext } from 'react'
import Button from './Button'
import Loader from './Loader'
import ContFormInput from './ContFormInput'
import { CONFIG_BACKEND } from '../config/config'
import { UserContext } from '../components/UserProvider'

function FormPlantEdit({countryPlant, plantation, onSuccess}) {
    const { user } = useContext(UserContext)
    const [cargando, setCargando] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [result, setResult] = useState('')

    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        setSelectedImage(file)

        const reader = new FileReader()
        reader.onloadend = ()=>{
            setPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const [form, setForm] = useState({
        countryPlant:  plantation?.country_plant || '',
        provincePlant: plantation?.province_plant || '',
        matchPlant:  plantation?.match_plant || '',
        streetPlant:  plantation?.street_plant || '',
        membersPlant: plantation?.members_plant || '',
        leaderPlant:  plantation?.leader_plant || '',
        startPlant: plantation?.start_plant || '',
        imgPlant: plantation?.img_plant || ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)
        const alertContainer = document.getElementById('alertContainer')
        alertContainer.style.padding="0.5rem"
        
        const formData = new FormData()
        formData.append('countryPlant', countryPlant)
        formData.append('provincePlant', form.provincePlant)
        formData.append('matchPlant', form.matchPlant)
        formData.append('streetPlant', form.streetPlant)
        formData.append('membersPlant', form.membersPlant)
        formData.append('leaderPlant', form.leaderPlant)
        formData.append('startPlant', form.startPlant)
        formData.append('imgPlant', selectedImage)
        formData.append('leaderPushPlantId', user.id)


        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/updatePlant?country=${countryPlant}&id=${plantation.id_plant}`, {
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
                setResult(data.result)
                setTimeout(() => {
                    alertContainer.classList.remove("success")
                    if(onSuccess && data.result){
                        onSuccess(data.result)
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
            <form className={styles.form} id='formPushPlant' onSubmit={handleSubmit}>
                <div className={styles.alertContainer} id="alertContainer"></div>
                <h1>{t('profileEdit.title')}</h1>
                <ContFormInput nameElm={t('form.plantation.province')+" :"}>
                    <input 
                        type="text" 
                        alt="provincePlant" 
                        name="provincePlant" 
                        placeholder= {result.provincePlant??plantation.province_plant}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.match')+" :"}>
                    <input 
                        type="text"
                        alt="matchPlant" 
                        name="matchPlant" 
                        placeholder={result.provincePlant??plantation.match_plant}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.street')+" :"}>
                    <input 
                        type="text"
                        alt="streetPlant" 
                        name="streetPlant" 
                        placeholder={result.streetPlant??plantation.street_plant}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.members')+" :"}>
                    <input 
                        type="number"
                        alt="membersPlant" 
                        name="membersPlant" 
                        placeholder={result.membersPlant??plantation.members_plant}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.leader')+" :"}>
                    <input 
                        type="text"
                        alt="leaderPlant" 
                        name="leaderPlant" 
                        placeholder={result.leaderPlant??plantation.leader_plant}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput nameElm={t('form.plantation.start')+" :"}>
                    <input 
                        type="date"
                        alt="startPlant" 
                        name="startPlant" 
                        placeholder={result.startPlant??plantation.start_of_work_plant}
                        onChange={handleChange}
                    />
                </ContFormInput>
                <ContFormInput>
                    <input 
                        type="file" 
                        alt="imgPlant" 
                        name="imgPlant"
                        onChange={handleImageChange}
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

export default FormPlantEdit