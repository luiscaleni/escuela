import styles from './css/Form.module.css'
import { useState, useContext } from 'react'
import { UserContext } from './UserProvider'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Loader from './Loader'
import ContFormInput from './ContFormInput'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import userDefault from '../assets/icons/utilities/user_128.png'
import { useTranslation } from 'react-i18next'

function FormPost() {
    const { user, loadUser } = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [t, i18n] = useTranslation()

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
        formData.append('titlePub', form.titlePub)
        formData.append('textPub', form.textPub)
        formData.append('descriptPub', form.descriptPub)
        formData.append('imgPub', selectedImage)
        formData.append('langPub', form.langPub)     

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/post`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()

            if(data.success){
                await loadUser()
                navigate(CONFIG_PATHS.SUCCESS_PATH, { state: { success: true, message: "Se publicó exitosamente", path: CONFIG_PATHS.NEWS_PATH } })
            }else{
                alertContainer.innerHTML="❌ "+data.error
                alertContainer.classList.add("error")
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) {console.error("Error en api:", errorCatch)}
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
                <form className={styles.form} id='formPost' onSubmit={handleSubmit}>
                    <div className={styles.alertContainer} id="alertContainer"></div>
                    <h1>Nueva Noticia</h1>
                    <ContFormInput nameElm="Titulo:">
                        <input type="text" name="titlePub" placeholder="Título" onChange={handleChange}/>
                    </ContFormInput>

                    <ContFormInput nameElm="Contenido:">
                        <textarea id="textPub" className={styles.textareaPost} name="textPub" placeholder="Contenido de publicación" onChange={handleChange}></textarea>
                    </ContFormInput>

                    <ContFormInput nameElm="Descripción:">
                        <input type="text" name="descriptPub" placeholder="Descripción de la publicación" onChange={handleChange}/>
                    </ContFormInput>

                    <ContFormInput nameElm="Banner de Publicación:">
                        <div className={styles.contImgUpPreview}>
                            <img src={imgResult} alt='Banner de publicación' id='imgPub' />
                            <input type="file" name="imgPub" alt='Boton de carga de banner de publicación' accept="image/*" onChange={handleImageChange}/>
                        </div>
                    </ContFormInput>
                    <ContFormInput nameElm={t('form.newPub.lang.title')+" :"}>
                        <div className={styles.radio}>
                            <label>
                                <input type='radio' name='langPub' value='es' id='español' onChange={handleChange} required />
                                {t('form.newPub.lang.es')}
                            </label>

                            <label>
                                <input type='radio' name='langPub' value='pt' id='portugues' onChange={handleChange} required />
                                {t('form.newPub.lang.pt')}
                            </label>

                            <label>
                                <input type='radio' name='langPub' value='en' id='ingles' onChange={handleChange} required />
                                {t('form.newPub.lang.en')}
                            </label>
                        </div>
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

export default FormPost