import {useState, useContext, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import styles from "./css/NavBar.module.css"
import isotipo from "/logo.png"
import Button from '../../components/Button'
import ImgProfile from '../../components/ImgProfile'
import menu from '/icons/responsive/menu.png'
import close from '/icons/responsive/close.png'
import arrowBottom from "/icons/utilities/arrowBottom.png"
import imgHome from '/icons/links/home.png'
import imgConfiguration from '/icons/links/configuration.png'

import imgProfessors from '/icons/links/professors.png'
import imgCourses from '/icons/links/courses.png'
import imgStudents from '/icons/links/students.png'
import imgTokens from '/icons/links/tokens.png'
import imgCampus from '/icons/links/campus.png'
import imgSports from '/icons/links/sports.png'
import imgCommissions from '/icons/links/commissions.png'
import info from '/icons/links/info.png'
 
import imgHelp from '/icons/links/help.png'
import imgProfileMen from '/icons/links/profile_men.png'
import imgPublication from '/icons/links/publication.png'
import { UserContext } from '../../components/UserProvider'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../config/config'

function NavBar() {
    const { user, setUser } = useContext(UserContext)
    const [menuProfileOpen, setMenuProfileOpen] = useState(false)
    const [togglePanel, setTogglePanel] = useState(false)
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    const apiUrl = CONFIG_BACKEND.API_DIR
    const [visible, setVisible] = useState(false)
    const [inscript, setInscript] = useState([])

    const getSportIcon = (sportName, courseName) => {
        // Normalizamos el texto del curso y del deporte para limpiar acentos y mayúsculas
        const course = (courseName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const sport = (sportName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        
        // 1. Si el nombre del curso o del deporte pertenece al fútbol, usamos siempre el icono de fútbol
        if (course.includes('futbol') || course.includes('futsal') || sport.includes('futbol')) {
            return '/icons/links/sports/football.png'
        }
        
        // 2. Evaluamos el resto de los deportes (cubriendo 'basket', 'basquet' y 'basketball')
        if (course.includes('basket') || course.includes('basquet') || sport.includes('basket')) {
            return '/icons/links/sports/basketball.png' // Cámbialo a '/icons/links/sports/basketball.png' si tu archivo se llama así
        }
        if (course.includes('rugby') || sport.includes('rugby')) {
            return '/icons/links/sports/rugbyBall.png'
        }
        if (course.includes('voley') || sport.includes('voley')) {
            return '/icons/links/sports/voleyball.png'
        }
        if (course.includes('hockey') || sport.includes('hockey')) {
            return '/icons/links/sports/hockey.png'
        }
        if (course.includes('handball') || sport.includes('handball')) {
            return '/icons/links/sports/handball.png'
        }
        
        return '/icons/links/sports/football.png' // Icono por defecto
    }

    const consult = async () => {
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

        const handleInscriptionChange = () => {
            consult()
        }

        window.addEventListener('inscriptionUpdated', handleInscriptionChange)

        return () => {
            window.removeEventListener('inscriptionUpdated', handleInscriptionChange)
        }
    }, [user])


    function toggleMenuProfile() {
        setMenuProfileOpen(!menuProfileOpen)
    }
    
    function toggleMenuPanel(){
        setTogglePanel(!togglePanel)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)

        try {
            // 1. Limpiamos el usuario de forma instantánea en la interfaz
            setUser(null)

            // 2. Destruimos la sesión en el servidor PHP
            await fetch(`${apiUrl}/user/logout`, {
                method: 'POST',
                credentials: 'include'
            })

            // 3. Redirigimos al login sin requerir F5
            navigate('/login', { replace: true })

        } catch (error) {
            if (import.meta.env.DEV) { 
                console.error('Error al cerrar sesión:', error); 
            }
            navigate('/login', { replace: true })
        } finally {
            setCargando(false)
        }
    }

    useEffect(()=>{
        const handleScroll = ()=>{
            setVisible(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        
        return ()=> window.removeEventListener('scroll', handleScroll)
    },[])

    return ( 
        <>
            <div className={`${styles.navbar} ${visible && styles.navVisible}`} id='navbar'>
                <div className={styles.contMobile}>
                    <Link to={user ? '/campus' : '/'} className={styles.navbarLogoLinkMobile}>
                        <div className={styles.navbarLogo}>
                            <img src={isotipo} alt="Logo" className={styles.logoImage} />
                        </div>
                    </Link>
                    <p>ARBITRA</p>
                    <div className={styles.buttonPanel} alt='buttonPanel' onClick={toggleMenuPanel}>
                        <img src={togglePanel ? close : menu} className={styles.imgMenuButtonPanel} alt="Menu Toggle"/>
                    </div>
                </div>
                <div className={`${styles.contNavbarContent} ${styles.contNavbarContentVisible} ${togglePanel && styles.panelOpen}`} id="contNavbarContent">
                    <nav className={styles.navbarContent} id="navbarContent">
                        <div className={styles.navbarLinks} id='navbarLinks' >
                            {user && (
                                <Link to={CONFIG_PATHS.PROFILE_PATH} className={styles.linkCont}>
                                    <div className={styles.imgProfilePanel}>
                                        <ImgProfile/>
                                        <p>{user.names}</p>
                                    </div>
                                </Link>
                            )}
                            <Link to={user ? '/campus' : '/'} className={styles.navbarLogoLink}>
                                <div className={styles.navbarLogo}>
                                    <img src={isotipo} alt="Logo" className={`${styles.logoImage} ${styles.imgInvert}`} />
                                </div>
                                <p>ARBITRA</p>
                            </Link>
                            <div className={styles.navbarLinksGroup}>
                                {!user ?(
                                    <>
                                    <Link to={CONFIG_PATHS.HOME_PATH} className={styles.linkHome} onClick={toggleMenuPanel}>
                                        <img src={imgHome} className={styles.imgMobile}/>
                                        Inicio
                                    </Link>
                                    <Link to={CONFIG_PATHS.ABOUT_US_PATH} onClick={toggleMenuPanel}>
                                        <img src={info} className={styles.imgMobile}/>
                                        Quiénes somos
                                    </Link>
                                    <Link to={CONFIG_PATHS.FORMATION_PATH} onClick={toggleMenuPanel}>
                                        <img src={info} className={styles.imgMobile}/>
                                        Formación
                                    </Link>
                                    <Link to={CONFIG_PATHS.SPORTS_PATH} onClick={toggleMenuPanel}>
                                        <img src={imgCourses} className={styles.imgMobile}/>
                                        Cursos
                                    </Link>
                                    <Link to={CONFIG_PATHS.LOGIN_PATH} onClick={toggleMenuPanel}>
                                        <img src={imgCampus} className={styles.imgMobile}/>
                                        Campus
                                    </Link>
                                    </>
                                ):(
                                    <Link to={CONFIG_PATHS.CAMPUS_PATH} onClick={toggleMenuPanel}>
                                        <img src={imgHome} className={styles.imgMobile}/>
                                        Inicio
                                    </Link>
                                )}
                            </div>
                            
                            <div className={styles.elmPanel}>
                            {user && (
                            <>
                                <Link to={CONFIG_PATHS.PROFILE_PATH} onClick={toggleMenuPanel}>
                                    <img src={imgProfileMen} className={styles.imgMobile}/>
                                    Perfil
                                </Link>

                                {/* 🎓 SECCIÓN PARA ALUMNOS */}
                                {user.roleId === 3 && (
                                    <div className={styles.adminSectionMobile}>
                                        <span className={styles.adminTitleMobile}>Cursos inscritos</span>
                                        {inscript?.length > 0 ? (
                                            inscript.map(inscp => (
                                                <Link 
                                                    key={inscp.id_inscript}
                                                    to={`/campus/mis-cursos/${inscp.id_course}`}
                                                    title={inscp.title_course}
                                                    onClick={toggleMenuPanel}
                                                >
                                                    <img 
                                                        src={getSportIcon(inscp.name_sport, inscp.title_course)} 
                                                        alt="Sport Icon" 
                                                        style={{ objectFit: 'contain' }} 
                                                    />&nbsp;
                                                    {inscp.title_course}
                                                </Link>
                                            ))
                                        ) : (<span>Ningún curso inscrito</span>)}
                                        <Link to={CONFIG_PATHS.CAMPUS_COURSE_INSCRIPTIONS} onClick={toggleMenuPanel}>
                                            <img src={imgPublication} className={styles.imgMobile}/>Inscribirme a más cursos
                                        </Link>
                                    </div>
                                )}

                                {/* 👨‍🏫 SECCIÓN PARA PROFESORES */}
                                {user.roleId === 2 && (
                                    <div className={styles.adminSectionMobile}>
                                        <span className={styles.adminTitleMobile}>Docencia</span>
                                        {/* Asegúrate de colocar la ruta exacta configurada en tu router */}
                                        <Link to={CONFIG_PATHS.CAMPUS_COURSES_LIST_PROFESSOR_PATH} onClick={toggleMenuPanel}>
                                            <img src={imgCourses} className={styles.imgMobile}/>
                                            Cursos habilitados
                                        </Link>
                                    </div>
                                )}

                                {/* ⚙️ SECCIÓN PARA ADMINISTRADORES */}
                                {user.roleId === 1 && (
                                    <>
                                        <Link to={CONFIG_PATHS.CONFIG_PATH} onClick={toggleMenuPanel}>
                                            <img src={imgConfiguration} className={styles.imgMobile}/>
                                            Configuración
                                        </Link>
                                        
                                        <div className={styles.adminSectionMobile}>
                                            <span className={styles.adminTitleMobile}>Administración</span>
                                            
                                            {/* Asegúrate de anteponer /campus/ o usar la ruta correcta */}
                                            <Link to="/campus/gestion-deportes-disciplinas" onClick={toggleMenuPanel}>
                                                <img src={imgSports} className={styles.imgMobile}/>
                                                Deportes y disciplinas
                                            </Link>

                                            <Link to="/campus/gestion-comisiones" onClick={toggleMenuPanel}>
                                                <img src={imgCommissions} className={styles.imgMobile}/>
                                                Comisiones
                                            </Link>
                                            
                                            <Link to="/campus/gestion-profesores" onClick={toggleMenuPanel}>
                                                <img src={imgProfessors} className={styles.imgMobile}/>
                                                Profesores
                                            </Link>
                                            
                                            <Link to="/campus/gestion-alumnos" onClick={toggleMenuPanel}>
                                                <img src={imgStudents} className={styles.imgMobile}/>
                                                Alumnos
                                            </Link>

                                            <Link to="/campus/gestion-materias" onClick={toggleMenuPanel}>
                                                <img src={imgCourses} className={styles.imgMobile}/>
                                                Materias
                                            </Link>

                                            <Link to="/campus/gestion-campus" onClick={toggleMenuPanel}>
                                                <img src={imgTokens} className={styles.imgMobile}/>
                                                Tokens
                                            </Link>
                                        </div>
                                    </>
                                )}

                                <Link to={CONFIG_PATHS.HELP_PATH} onClick={toggleMenuPanel}>
                                    <img src={imgHelp} className={styles.imgMobile}/>
                                    Ayuda
                                </Link>
                                
                                <form onSubmit={handleSubmit}>
                                    <Button
                                        typeBtn="submit"
                                        altNameBtn="logout"
                                        titleBtn="Cerrar Sesión"
                                        disabled={cargando}
                                    >Cerrar sesión</Button>
                                </form>
                            </>
                            )}
                        </div>
                        </div>
                    </nav>

                    {/* 🖥️ Menú desplegable flotante original de Escritorio */}
                    {user && (
                        <menu className={`${styles.menuProfile} ${menuProfileOpen ? styles.menuProfileActive : ''}`} id="menuProfile">
                            <div className={`${styles.menuButton} ${styles.menuProfileButton}`} id="menuProfileButton" onClick={() => toggleMenuProfile()}>
                                <div className={`${styles.contWellcome} ${menuProfileOpen ? styles.wellcomeActive : ''}`} id="contWellcome">
                                    <div className={styles.contContImgProfile} id="contContImgProfile">
                                        <ImgProfile id="imgProfile"/>
                                    </div>
                                    <p className={`${styles.wellcomeName} ${menuProfileOpen ? styles.nameVisible : ''}`} id="wellcomeName">Hola <br/>{user.names}</p>
                                </div>
                                <img src={arrowBottom} alt="arrowMenu" id="imgMenu" className={`${styles.menuIcon} ${styles.menuIconProfile} ${menuProfileOpen ? styles.rotateArrow : ''}`}/>
                            </div>
                            <ul className={`${styles.menu} ${styles.ulMenuProfile} ${menuProfileOpen ? styles.menuOpen : ''}`} id="ulMenuProfile">
                                <li>
                                    <Link to={CONFIG_PATHS.PROFILE_PATH}>Perfil</Link>
                                </li>
                                {(user.roleId === 1) && (
                                    <li>
                                        <Link to={CONFIG_PATHS.CONFIG_PATH}>Configuración</Link>
                                    </li>
                                )}
                                <li>
                                    <Link to={CONFIG_PATHS.HELP_PATH}>Ayuda</Link>
                                </li>
                                <form onSubmit={handleSubmit}>
                                    <Button
                                        typeBtn="submit"
                                        altNameBtn="logout"
                                        styleBtn={1}
                                        titleBtn="Cerrar Sesión"
                                        disabled={cargando}
                                    >Cerrar sesión</Button>
                                </form>
                            </ul>
                        </menu>
                    )}
                </div>
            </div>
        </>
     )
}

export default NavBar