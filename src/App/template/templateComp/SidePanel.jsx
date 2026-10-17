import styles from './css/SidePanel.module.css'
import arrowLeft from '/icons/utilities/arrowLeft.png'
import close from '/icons/responsive/close.png'
import GroupPanel from '../../components/GroupPanel'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classBtn from '../../components/css/Button.module.css'


function SidePanel() {
    const [cargando, setCargando] = useState(false)
    const [inscript, setInscript] = useState([])
    const { user } = useContext(UserContext)
    const [togglePanel, setTogglePanel] = useState(false)

    function toggleMenuPanel(){
        setTogglePanel(!togglePanel)
    }

    const consult = async () => {
        //  Si no hay usuario en el contexto, salimos de inmediato sin hacer fetch
        if (!user) {
            setInscript([])
            setCargando(false)
            return
        }

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/inscriptions`, {
                method: 'POST',
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            if (data && data.success) {
                setInscript(data.result)
            } else {
                setInscript([])
            }
        } catch (error) {
            console.log("❌ Error " + error)
            setInscript([])
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        consult()
    },[])

    return ( 
        <>
            <div className={`${styles.sidePanel} ${togglePanel && styles.panelOpen}`}>
                <div className={styles.buttonPanel} alt='buttonPanel' onClick={toggleMenuPanel}>
                    <img src={togglePanel ? close : arrowLeft} className={styles.imgMenuButtonPanel} alt="Menu Toggle"/>
                </div>
                <h2>Campus</h2>
                <Link to={CONFIG_PATHS.CAMPUS_ASSING_PROFESSORS_PATH} className={classBtn.button}>Configuración - profesores</Link>
                <GroupPanel titleElm='Cursos inscriptos'>
                    {inscript?.length > 0 ? (
                        inscript.map(inscp => (
                            <Link 
                                key={inscp.id_inscript}
                                to={`/campus/mis-cursos/${inscp.id_course}`}
                                title={inscp.title_course}
                            >
                                <img src='/icons/links/futbol.png'/>&nbsp;
                                {inscp.title_course}
                            </Link>
                        ))
                    ) : (
                        <>
                        <span>Ningún curso inscrito</span>
                        </>
                    )}
                    <Link to={CONFIG_PATHS.SPORTS_PATH}>Inscribirme a más cursos</Link>
                </GroupPanel>
            </div>
        </>
     )
}

export default SidePanel