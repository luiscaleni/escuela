import styles from './css/Form.module.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from './UserProvider'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import LeftTopButton from './LeftTopButton'
import Loader from './Loader'
import ContFormInput from './ContFormInput'
import ShowData from './ShowData'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import userDefault from '../assets/icons/utilities/user_128.png'
import { useTranslation } from 'react-i18next'

function FormProfileEdit() {
    const { user, loadUser } = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const [form, setForm] = useState({
        names: user?.names || '',
        lastNames:  user?.lastNames || '',
        sex:  user?.sex || '',
        birthday:  user?.birthday || '',
        country:  user?.country || '',
        province:  user?.province || '',
        aboutMe:  user?.aboutMe || ''
    })
    const [t, i18n] = useTranslation()
          
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        setSelectedImage(file)

        const reader = new FileReader()
        reader.onloadend = ()=>{
            setPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)
        const alertContainer = document.getElementById('alertContainer')

        const formData = new FormData()
        formData.append('names', form.names)
        formData.append('lastNames', form.lastNames)
        formData.append('sex', form.sex)
        formData.append('birthday', form.birthday)
        formData.append('imgProfile', selectedImage)        
        formData.append('country', form.country)
        formData.append('province', form.province)
        formData.append('aboutMe', form.aboutMe)

        alertContainer.style.padding="0.5rem"

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/update`, {
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
                await loadUser()
                navigate(CONFIG_PATHS.PROFILE_PATH)
            }else{
                alertContainer.innerHTML="❌ "+data.error
                alertContainer.classList.add("error")
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error("❌ Error en api:", errorCatch)}
            alertContainer.innerHTML="❌ "+errorCatch.error
            alertContainer.classList.add("error")
        } finally{
            setCargando(false)
            await loadUser()
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    let imgResult

    if(preview){
        imgResult = preview
    }else if(!preview){
        imgResult = userDefault
    }

    if (!user){
        return <Loader />
    }
    
    return ( 
        <>
            <div className={styles.contForm}>
                <form className={styles.form} id='formUpdate' onSubmit={handleSubmit}>
                    <div className={styles.alertContainer} id="alertContainer"></div>
                    <LeftTopButton typeElm='expand' text={t('buttons.profile')} locationElm={CONFIG_PATHS.PROFILE_PATH}/>
                    <h1>{t('profileEdit.title')+" :"}</h1>
                    <ContFormInput nameElm={t('profileEdit.names')}>
                        <input type="text" name="names" placeholder={user.names} onChange={handleChange}/>
                    </ContFormInput>

                    <ContFormInput nameElm={t('profileEdit.lastName')+" :"}>
                        <input type="text" name="lastNames" placeholder={user.lastNames} id="apellidos" onChange={handleChange}/>
                    </ContFormInput>

                    <ContFormInput nameElm="Email:" iconElm="?" titleElm='No se puede cambiar este valor'>
                        <ShowData>{user.email}</ShowData>
                    </ContFormInput>

                    <ContFormInput nameElm={t('profileEdit.sex')+" :"}>
                        <div className={styles.radio}>
                            <label>
                                <input type="radio" name="sex" value='M' id="masculino" onChange={handleChange}/>
                                {t('profileEdit.male')}
                            </label>

                            <label>
                                <input type="radio" name="sex" value='F' id="femenino" onChange={handleChange}/>
                                {t('profileEdit.female')}
                            </label>
                        </div>
                    </ContFormInput>

                    <ContFormInput nameElm={t('profileEdit.birthdate')+" :"}>
                        <input type="date" name="birthday" placeholder={form.birthday} id="birthday" onChange={handleChange}/>
                    </ContFormInput>
                    
                    <ContFormInput nameElm={t('profileEdit.countryOfResidence')+" :"}>
                        <select className={styles.select} name='country' value={form.country} onChange={handleChange}>
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
                    </ContFormInput>

                    <ContFormInput nameElm={t('profileEdit.province')+" :"}>
                        <input type="text" name="province" placeholder={user.province} id="province" onChange={handleChange}/>
                    </ContFormInput>

                    <ContFormInput nameElm={t('profileEdit.aboutMe')+" :"}>
                        <textarea id="aboutMe" name="aboutMe" placeholder={user.aboutMe} onChange={handleChange}></textarea>
                    </ContFormInput>

                    <ContFormInput nameElm={t('profileEdit.profilePicture')+" :"}>
                        <div className={styles.contImgUpPreview}>
                            <img src={imgResult} alt={t('profileEdit.preview')} id='imgUserPreview' />
                            <input type="file" name="imgProfile" alt={t('profileEdit.buttonUpload')} accept="image/*" onChange={handleImageChange}/>
                        </div>
                    </ContFormInput>
                    
                    <Button
                        typeBtn="submit"
                        altName={t('buttons.saveChanges')}
                        title={t('buttons.saveChanges')}
                        id="guadarCambios"
                        disabled={cargando}
                    >
                        {cargando ? <Loader mini={true}/> : t('buttons.saveChanges')}
                    </Button>
                </form>
            </div>
        </>
     )
}

export default FormProfileEdit