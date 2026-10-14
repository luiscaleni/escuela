import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import styles from "./css/NavBar.module.css"
import isotipo from "/arbitro.png"
import DarkMode from '../../components/DarkMode'
import Button from '../../components/Button'
import ImgProfile from '../../components/ImgProfile'
import menu from '/icons/responsive/menu.png'
import close from '/icons/responsive/close.png'
import arrowBottom from "/icons/utilities/arrowBottom.png"
import imgHome from '/icons/links/home.png'
import imgConfiguration from '/icons/links/configuration.png'
import imgHelp from '/icons/links/help.png'
import imgProfileMen from '/icons/links/profile_men.png'
import imgNews from '/icons/links/news.png'
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

    return ( 
        <>
            <div className={styles.navbar} id='navbar'>
                <div className={styles.contMobile}>
                    <Link to='/' className={styles.navbarLogoLinkMobile}>
                        <div className={styles.navbarLogo}>
                            <img src={isotipo} alt="Logo" className={styles.logoImage} />
                        </div>
                    </Link>
                    <p>Escuela de Árbitros</p>
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
                            <Link to='/' className={styles.navbarLogoLink}>
                                <div className={styles.navbarLogo}>
                                    <img src={isotipo} alt="Logo" className={`${styles.logoImage} ${styles.imgInvert}`} />
                                </div>
                                <p>Escuela de Árbitros</p>
                            </Link>
                            <div className={styles.navbarLinksGroup}>
                                <Link to={CONFIG_PATHS.HOME_PATH} className={styles.linkHome} onClick={toggleMenuPanel}>
                                    <img src={imgHome} className={styles.imgMobile}/>
                                    Inicio
                                </Link>
                                <Link to={CONFIG_PATHS.SPORTS_PATH} onClick={toggleMenuPanel}>
                                    <img src={imgNews} className={styles.imgMobile}/>
                                    Cursos
                                </Link>
                                {user ?(
                                    <Link to={CONFIG_PATHS.CAMPUS_PATH} onClick={toggleMenuPanel}>
                                        <img src={imgPublication} className={styles.imgMobile}/>
                                        Campus
                                    </Link>
                                ):(
                                    <Link to={CONFIG_PATHS.LOGIN_PATH} onClick={toggleMenuPanel}>
                                        <img src={imgProfileMen} className={styles.imgMobile}/>
                                        Login
                                    </Link>
                                )}
                                <DarkMode float = {true} />

                            </div>
                            
                                <div className={styles.elmPanel}>
                                    {user &&(
                                    <>
                                        <Link to={CONFIG_PATHS.PROFILE_PATH} onClick={toggleMenuPanel}>
                                            <img src={imgProfileMen} className={styles.imgMobile}/>
                                            Perfil
                                        </Link>
                                        {(user.rolId === 1) && (
                                            <>
                                            <Link to={CONFIG_PATHS.CONFIG_PATH} onClick={toggleMenuPanel}>
                                                <img src={imgConfiguration} className={styles.imgMobile}/>
                                                Configuración
                                            </Link>
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
                                    <DarkMode />
                                </div>
                        </div>

                    </nav>
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
                                {(user.rolId === 1) && (
                                    <li>
                                        <Link to={CONFIG_PATHS.CONFIG_PATH}>Configuración</Link>
                                    </li>
                                )}
                                <li>
                                    <Link to={CONFIG_PATHS.HELP_PATH}>Ayuda</Link>
                                </li>
                                <li>
                                    <DarkMode float = {false}/>
                                </li>
                                <form onSubmit={handleSubmit}>
                                    <Button
                                        typeBtn="submit"
                                        altNameBtn="logout"
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