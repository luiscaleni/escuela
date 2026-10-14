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

function FormInscriptionCourse({value=""}) {
    const { user } = useContext(UserContext)
    const { id_discipline } = useParams()
    const [discipline, setDiscipline] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const [capture, setCapture] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const alertContainer = document.getElementById('alertContainer')
        if (alertContainer) {
            alertContainer.className = styles.alertContainer 
        }

        const formData = new FormData()
        formData.append('idDiscip', discipline.id_discip)

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
    useEffect(()=>{
        setCapture(value)
        console.log(capture)
    },[])

    return ( 
        <div className={styles.contForm}>
            <form className={`${styles.form} ${styles.form2}`} id='formUpdate' onSubmit={handleSubmit}>
                <TopButtons>
                    <div className={styles.alertContainer} id="alertContainer"></div>
                </TopButtons>
                <div className={styles.contElmsForm}>
                    <h1>{value.name_discip}</h1>
                    
                    <ContFormInput nameElm="Descripción">
                        <p>{value.descript_discip}</p>
                    </ContFormInput>
                    
                    <Button
                        typeBtn="submit"
                        altName="Inscribirme"
                        title="Inscribirme"
                        id="inscribirme"
                        disabled={loading}
                    >
                        {!loading ? <Loader mini={true} /> : "Inscribirme"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormInscriptionCourse