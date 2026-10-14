import styles from './css/Form.module.css'
import { useState, useEffect, useContext } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import ShowData from './ShowData'
import ContFormInput from './ContFormInput'
import { UserContext } from './UserProvider'
import Button from './Button'
import TopButtons from './TopButtons'

function FormDisciplineEdit() {
    const { user } = useContext(UserContext)
    const { id_discipline } = useParams()
    const [discipline, setDiscipline] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [preview, setPreview] = useState(null)
    
    // --- DIFERENCIA 1 ---
    // ANTES: No tenías este estado 'form' declarado al inicio, por lo que handleChange fallaba.
    // AHORA: Definimos un estado controlado único para los inputs del formulario.
    const [form, setForm] = useState({
        nameDiscip: '',
        descriptDiscip: ''
    })

    // Sincronizamos el formulario cuando la disciplina se carga de la API
    useEffect(() => {
        if (discipline) {
            setForm({
                nameDiscip: discipline.nameDiscip ?? '',
                descriptDiscip: discipline.descriptDiscip ?? ''
            })
        }
    }, [discipline])

    const imgD = discipline?.img_discip ? `${CONFIG_BACKEND.API_DIR}/src/assets/disciplines/${discipline.img_discip}` : ''

    useEffect(() => {
        if (!id_discipline) return
        loadCourse()
    }, [id_discipline])

    const loadCourse = async () => {
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/discipline/detail?id=${id_discipline}`)
            const data = await res.json()
            if(data.success){
                setDiscipline(data.result)
            } else {
                setError(data.message || "No se pudo cargar la disciplina")
            }
        } catch (err) {
            setError("❌ " + err.message)
            if (import.meta.env.DEV) { console.error('Error en API: ', err) }
        } finally {
            setLoading(false)
        }
    }   

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setSelectedImage(file)

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const alertContainer = document.getElementById('alertContainer')
        if (alertContainer) {
            alertContainer.className = styles.alertContainer 
        }

        const formData = new FormData()
        formData.append('idDiscip', discipline.id_discip)
        formData.append('idSport', discipline.id_sport ?? '') 
        formData.append('nameDiscip', form.nameDiscip)
        formData.append('descriptDiscip', form.descriptDiscip)
        if (selectedImage) {
            formData.append('imgDiscip', selectedImage)
        }

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/user/disciplineUpdate?userRolId=${user.rolId}`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            console.log("Respuesta cruda del backend:", data);

            if(data.success){
                if (alertContainer) {
                    alertContainer.innerHTML = "✅ " + data.message
                    alertContainer.classList.add("success")
                }
                setDiscipline(prev => ({
                    ...prev,
                    nameDiscip: form.nameDiscip,
                    descriptDiscip: form.descriptDiscip,
                    dateDiscip: data.updatePost.datePub,
                    ...(data.updatePost.imgDiscip && { imgDiscip: data.updatePost.imgDiscip })
                }))
            } else {
                if (alertContainer) {
                    alertContainer.innerHTML = "❌ " + (data.error || "Error desconocido")
                    alertContainer.classList.add("error")
                }
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error("❌ Error en api:", errorCatch) }
            if (alertContainer) {
                alertContainer.innerHTML = "❌ " + errorCatch.message
                alertContainer.classList.add("error")
            }
        } finally {
            setLoading(false)
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    let imgResult = preview || imgD

    if(loading && !discipline) return <Loader />
    if(error) return <p>Error en disciplinas: {error}</p>

    return ( 
        <div className={styles.contForm}>
            <form className={`${styles.form} ${styles.form2}`} id='formUpdate' onSubmit={handleSubmit}>
                <TopButtons>
                    <div className={styles.alertContainer} id="alertContainer"></div>
                </TopButtons>
                <div className={styles.contElmsForm}>
                    <h1>Editar</h1>
                    
                    <ContFormInput nameElm="Título:">
                        <input 
                            type="text" 
                            name="nameDiscip" 
                            placeholder={discipline?.name_discip}
                            id="nameDiscip" 
                            value={form.nameDiscip}
                            onChange={handleChange}
                        />
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Descripción:">
                        <input 
                            type="text" 
                            name="descriptDiscip" 
                            placeholder={discipline?.descript_discip}
                            id="descriptDiscip" 
                            value={form.descriptDiscip} 
                            onChange={handleChange}
                        />
                    </ContFormInput>

                    <ContFormInput nameElm="Imagen:">
                        <div className={styles.contImgUpPreview}>
                            {imgResult && <img src={imgResult} alt='Preview imagen' id='imgPreview' />}
                            <input 
                                type="file" 
                                name="imgDiscip" 
                                accept="image/*" 
                                onChange={handleImageChange}
                            />
                        </div>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Actualizado el:">
                        <ShowData>{discipline?.date_discip || ''}</ShowData>
                    </ContFormInput>

                    <Button
                        typeBtn="submit"
                        altName="Guardar cambios"
                        title="Guardar cambios"
                        id="guadarCambios"
                        disabled={loading}
                    >
                        {loading ? <Loader mini={true} /> : "Guardar cambios"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormDisciplineEdit