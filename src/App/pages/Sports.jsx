import { UserContext } from '../components/UserProvider'
import { useState, useEffect, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Publication from '../components/Publication'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'

function Sports() {
    const [disciplines, setDisciplines] = useState([])
    const [loadingDisciplines, setLoadingDisciplines] = useState(true)
    const [selectedDiscipline, setSelectedDiscipline] = useState(null) // Estado para controlar el curso seleccionado en el modal
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate(CONFIG_PATHS.CAMPUS_PATH, { replace: true })
        }
    }, [user, navigate])

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/disciplines`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Filtramos por seguridad en el cliente los que tengan sport_status === 1 (o Number(sport_status) === 1)
                const cursosActivos = (data.result || []).filter(
                    item => Number(item.sport_status) === 1 || item.sport_status === undefined
                );
                setDisciplines(cursosActivos);
            } else {
                if (import.meta.env.DEV) { console.error('Error en deportes: ', data.message) }
            }
        })
        .catch(error => {
            if (import.meta.env.DEV) console.error('Error en API: ', error)
        })
        .finally(() => {
            setLoadingDisciplines(false)
        })
    }, [])

    return ( 
        <>
            {/* Modal para mostrar los detalles del curso seleccionado */}
            {selectedDiscipline && (
                <Modal
                    id="containerFloat"
                    onClickElm={() => setSelectedDiscipline(null)}
                >
                    <div style={{ padding: '10px 20px', color: '#000', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{ color: '#000', fontSize: '2rem' }}>{selectedDiscipline.name_discip}</h2>
                        <p style={{ marginTop: '15px', color: '#000', lineHeight: '1.6', textAlign: 'left' }}>
                            {selectedDiscipline.descript_discip || 'Este curso no cuenta con una descripción detallada por el mismo momento.'}
                        </p>
                        
                        {selectedDiscipline.img_discip && (
                            <div style={{ marginTop: '20px' }}>
                                <img 
                                    src={`${CONFIG_BACKEND.API_DIR}/src/assets/disciplines/${selectedDiscipline.img_discip}`} 
                                    alt={selectedDiscipline.name_discip} 
                                    style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '2rem' }} 
                                />
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            <Publication titlePub="" typeElm='img' nameAsset="banner_courses.png">
                {loadingDisciplines ? (
                    <p>Cargando cursos...</p>
                ) : disciplines.length > 0 ? (
                    disciplines.map(discipline => (
                        <div 
                            key={discipline.id_discip} 
                            onClick={() => setSelectedDiscipline(discipline)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <Card 
                                cardTitle={discipline.name_discip} 
                                ubication='disciplines'
                                descriptionCard={discipline.descript_discip}
                                imgCard={discipline.img_discip}
                            />
                        </div>
                    ))
                ) : (
                    <p>Estamos trabajando en nuevos cursos para ti.</p>
                )}
            </Publication>
        </>
     )
}

export default Sports