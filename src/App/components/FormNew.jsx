import styles from './css/Form.module.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from './UserProvider'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Loader from './Loader'
import ContFormInput from './ContFormInput'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import userDefault from '/icons/utilities/user_128.png'

function FormNew() {
    const { user, loadUser } = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [sportsList, setSportsList] = useState([]) 
    const [form, setForm] = useState({})
    const [deporteSeleccionado, setDeporteSeleccionado] = useState(null)
    const [activarSport, setActivarSport] = useState(false) // Estado para el checkbox
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadSports`, { 
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    credentials: 'include'
                })
                const data = await response.json()
                if (data && data.success) {
                    setSportsList(data.result)
                }
            } catch (error) {
                console.error("Error al cargar deportes:", error)
            }
        }
        fetchSports()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSportChange = (e) => {
        const idSeleccionado = e.target.value;
        handleChange(e); 

        const deporteEncontrado = sportsList.find(s => String(s.id_sport) === String(idSeleccionado));
        setDeporteSeleccionado(deporteEncontrado || null);
        setActivarSport(false); // Resetear el checkbox al cambiar de deporte
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)
        const alertContainer = document.getElementById('alertContainer')
        alertContainer.innerHTML = ""
        alertContainer.classList.remove("error")

        const formData = new FormData()
        formData.append('id_sport', form.id_sport)
        formData.append('name_discip', form.name_discip)
        formData.append('descript_discip', form.descript_discip)
        formData.append('enrollment_code', form.enrollment_code)
        formData.append('img_discip', selectedImage)
        formData.append('activar_sport', activarSport ? '1' : '0') // Enviamos si se desea activar el deporte

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/disciplines/create`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            
            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Error en la respuesta de la red')
            }

            if (data.success) {
                await loadUser()
                navigate(CONFIG_PATHS.SUCCESS_PATH, { 
                    state: { 
                        success: true, 
                        message: "Curso/Disciplina creado exitosamente", 
                        path: CONFIG_PATHS.CAMPUS_COURSES_LIST_PROFESSOR_PATH 
                    } 
                })
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error("Error en api:", errorCatch) }
            alertContainer.innerHTML = "❌ " + (errorCatch.message || "Ocurrió un error")
            alertContainer.classList.add("error")
        } finally {
            setCargando(false)
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    let imgResult = preview ? preview : userDefault

    if (!user) {
        return <Loader />
    }
    
    return ( 
        <>
            <div className={`${styles.contForm} ${styles.formPost}`}>
                <form className={`${styles.form} ${styles.form2}`} id='formPost' onSubmit={handleSubmit}>
                    <div className={styles.alertContainer} id="alertContainer"></div>
                    <h1>Nuevo Deporte / Disciplina</h1>

                    <ContFormInput nameElm="Deporte Principal:">
                        <select name="id_sport" onChange={handleSportChange} required className={styles.selectInput}>
                            <option value="">Seleccione un deporte...</option>
                            {sportsList.map((sport) => (
                                <option key={sport.id_sport} value={sport.id_sport}>
                                    {sport.name_sport}
                                </option>
                            ))}
                        </select>

                        {/* Indicador visual y opción para activar si está inactivo */}
                        {deporteSeleccionado && (
                            <div style={{ marginTop: '0.6rem', fontSize: '0.9rem',display: 'flex', alignItems: 'flex-start', flexDirection:'row' }}>
                                Estado: {deporteSeleccionado.activo === 1 ? (
                                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>🟢 Activo (Visible para los alumnos)</span>
                                ) : (
                                    <div>
                                        <span style={{ color: '#dc3545', fontWeight: 'bold' }}>🔴 Inactivo (Oculto)</span>
                                        <div style={{ marginTop: '6px' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', flexDirection:'row', gap: '6px', cursor: 'pointer' }}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={activarSport} 
                                                    onChange={(e) => setActivarSport(e.target.checked)} 
                                                />
                                                Habilitar este deporte ahora
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </ContFormInput>

                    <ContFormInput nameElm="Nombre del Curso / Disciplina:">
                        <input type="text" name="name_discip" placeholder="Ej: Básquetbol General o Futsal" onChange={handleChange}/>
                    </ContFormInput>

                    <ContFormInput nameElm="Código de Matrícula:">
                        <input type="text" name="enrollment_code" placeholder="Ej: BASKET-2026" onChange={handleChange} required/>
                    </ContFormInput>

                    <ContFormInput nameElm="Descripción:">
                        <textarea id="descript_discip" className={styles.textareaPost} name="descript_discip" placeholder="Descripción detallada del curso" onChange={handleChange} required></textarea>
                    </ContFormInput>

                    <ContFormInput nameElm="Banner o Imagen:">
                        <div className={styles.contImgUpPreview}>
                            <img src={imgResult} alt='Banner de disciplina' id='imgDiscip' />
                            <input type="file" name="img_discip" accept="image/*" onChange={handleImageChange}/>
                        </div>
                    </ContFormInput>

                    <Button
                        typeBtn="submit"
                        altName="Guardar curso"
                        title="Guardar curso"
                        id="guardarCurso"
                        disabled={cargando}
                    >
                        {cargando ? <Loader mini={true}/> : "Guardar curso"}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default FormNew