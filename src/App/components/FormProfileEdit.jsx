import styles from './css/Form.module.css'
import { useState, useContext } from 'react'
import { UserContext } from './UserProvider'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import BackLink from './BackLink'
import Loader from './Loader'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import userDefault from '/assets/images/utilities/usuario_128.png'

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

        const formData = new FormData();
        formData.append('names', form.names);
        formData.append('lastNames', form.lastNames);
        formData.append('sex', form.sex);
        formData.append('birthday', form.birthday);
        formData.append('imgProfile', selectedImage);        
        formData.append('country', form.country);
        formData.append('province', form.province);
        formData.append('aboutMe', form.aboutMe);

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
            console.error("❌ Error en api:", errorCatch)
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
                    <BackLink />
                    <h1>Editar</h1>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Nombres:</span>
                            <input type="text" name="names" placeholder={user.names} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Apellidos:</span>
                            <input type="text" name="lastNames" placeholder={user.lastNames} id="apellidos" onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Email:</span>
                            <p className={styles.emailData} title='No se puede cambiar este valor'>{user.email}</p>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Sexo:</span>
                            <div className={styles.radio}>
                                <label>
                                    <input type="radio" name="sex" value='M' id="masculino" onChange={handleChange}/>
                                    Masculino
                                </label>

                                <label>
                                    <input type="radio" name="sex" value='F' id="femenino" onChange={handleChange}/>
                                    Femenino
                                </label>
                            </div>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>F. de nac.:</span>
                            <input type="date" name="birthday" id="birthday" onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>País:</span>
                            <select className={styles.select} name='country' onChange={handleChange}>
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
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Provincia:</span>
                            <input type="text" name="province" placeholder={user.province} id="province" onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Acerca de mí:</span>
                            <textarea id="aboutMe" name="aboutMe" placeholder={user.aboutMe} onChange={handleChange}></textarea>
                        </label>
                    </div>
                    <div className={styles.contFormInput}>
                        <label>
                            <span>Imagen de Perfil:</span>
                            <div className={styles.contImgProfilePreview}>
                                <img src={imgResult} alt='Preview imagen de perfil' id='imgUserPreview' />
                                <input type="file" name="imgProfile" alt='Boton de carga de imagen de perfil' accept="image/*" onChange={handleImageChange}/>
                            </div>
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

export default FormProfileEdit