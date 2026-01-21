import styles from './css/Form.module.css'
import { useState, useEffect } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import ShowData from './ShowData'
import ContFormInput from './ContFormInput'
import { UserContext } from '../../App/components/UserProvider'
import Button from './Button'
import LeftTopButton from './LeftTopButton'
import TopButtons from './TopButtons'
import TopButtonNone from './TopButtonNone'
import { useTranslation } from 'react-i18next'

function FormPostEdit() {
    const { user, loadUser } = useContext(UserContext)
    const {id_news} = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [dataUpdate, setDataUpdate] = useState([])
     const [t, i18n] = useTranslation()
    const imgD = CONFIG_BACKEND.API_DIR+'/src/assets/publications/'+post?.imgPub

    useEffect(()=>{
        if (!id_news) return
        loadNew()
    },[id_news])

    const loadNew = async ()=>{
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/news/detail?id=${id_news}`)
            const data = await res.json()
            if(data.success){
                setPost(data.result)
            }
        } catch (error) {
            setError("❌ "+error.message)
            setLoading(false)
            setPost(null)
            if (import.meta.env.DEV) {console.error('Error en API: ', error)}
        }finally{
            setLoading(false)
        }
    }   

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

    const [form, setForm] = useState({
        titlePub:  post?.titlePub || '',
        textPub: post?.textPub || '',
        descriptPub: post?.descriptPub || ''
    })

    useEffect(() => {
        if (post) {
            setForm({
                titlePub: post.titlePub ?? '',
                textPub: post.textPub ?? '',
                descriptPub: post.descriptPub ?? ''
            })
        }
    }, [post])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const alertContainer = document.getElementById('alertContainer')

        const formData = new FormData()
        formData.append('idPub', post.idPub)
        formData.append('titlePub', form.titlePub)
        formData.append('textPub', form.textPub)
        formData.append('descriptPub', form.descriptPub)
        formData.append('imgPub', selectedImage)

        if (user.rolId === 1) {
            try {
                const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/postUpdate`, {
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
                }else{
                    alertContainer.innerHTML="❌ "+data.error
                    alertContainer.classList.add("error")
                }
            } catch (errorCatch) {
                if (import.meta.env.DEV) { console.error("❌ Error en api:", errorCatch)}
                alertContainer.innerHTML="❌ "+errorCatch.error
                alertContainer.classList.add("error")
            } finally{
                setLoading(false)
            }
        }else{
            location(CONFIG_PATHS.HOME_PATH)
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
        imgResult = imgD
    }
    
    if(loading) return <Loader />
    if(error) return <p>Error: {error}</p>

    const parrafos = typeof (post?.textPub === 'string') || (dataUpdate.textPub === 'string') 
    ? post.textPub.split(/\n+/).filter(p => p.trim() !== '')
    : []
    
    return ( 
        <>
            <div className={styles.contForm}>
                <form className={styles.form} id='formUpdate' onSubmit={handleSubmit}>
                    <TopButtons>
                        <LeftTopButton locationElm={`${CONFIG_PATHS.NEWS_PATH}/${id_news}`} typeElm='expand' text={t('buttons.back')}/>
                        <div className={styles.alertContainer} id="alertContainer"></div>
                        <TopButtonNone />
                    </TopButtons>
                    <div className={styles.contElmsForm}>
                        <h1>{t('buttons.edit')}</h1>
                        <ContFormInput nameElm={t('form.postEdit.titlePost')+" :"}>
                            <input type="text" name="titlePub" id="titlePub" value={dataUpdate.titlePub??post.titlePub} onChange={handleChange}/>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('form.postEdit.text')+" :"}>
                            <textarea name="textPub" id="textPub" className={styles.textareaPost} value={dataUpdate.textPub??parrafos}onChange={handleChange}></textarea>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('form.postEdit.descript')+" :"}>
                            <input type="text" name="descriptPub" id="descriptPub"value={dataUpdate.titlePub??post.descriptPub} onChange={handleChange}/>
                        </ContFormInput>

                        <ContFormInput nameElm={t('form.postEdit.frontPage')+" :"}>
                            <div className={styles.contImgUpPreview}>
                                <img src={imgResult} alt='Preview imagen' id='imgPreview' />
                                <input type="file" name="imgPub" alt='Boton de carga de imagen' accept="image/*" onChange={handleImageChange}/>
                            </div>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('form.postEdit.date')+" :"}>
                            <ShowData>{dataUpdate.titlePub??post.datePub}</ShowData>
                        </ContFormInput>
                        <Button
                            typeBtn="submit"
                            altName={t('buttons.saveChanges')}
                            title={t('buttons.saveChanges')}
                            id="guadarCambios"
                            disabled={loading}
                        >
                            {loading ? <Loader mini={true}/> : t('buttons.saveChanges')}
                        </Button>
                    </div>
                </form>
            </div>
        </>
     )
}

export default FormPostEdit