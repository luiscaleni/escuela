import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import styles from "./css/NavBar.module.css"
import isotipo from "/isotipo_bn.svg"
import DarkMode from '../../components/DarkMode'
import Button from '../../components/Button'
import ImgProfile from '../../components/ImgProfile'

import menu from '../../assets/icons/responsive/menu.png'
import close from '../../assets/icons/responsive/close.png'

import arrowBottom from "../../assets/icons/utilities/arrowBottom.png"

import imgHome from '../../assets/icons/links/home.png'
import imgDonate from '../../assets/icons/links/donate.png'
import imgResources from '../../assets/icons/links/resources.png'
import imgConfiguration from '../../assets/icons/links/configuration.png'
import imgHelp from '../../assets/icons/links/help.png'
import imgProfileMen from '../../assets/icons/links/profile_men.png'
import imgNews from '../../assets/icons/links/news.png'
import imgPlantations from '../../assets/icons/links/plantations.png'
import imgAboutUs from '../../assets/icons/links/about_us.png'
import imgPublication from '../../assets/icons/links/publication.png'
import imgLogout from '../../assets/icons/links/logout.png'

import { UserContext } from '../../components/UserProvider'
import { useTheme } from '../../components/ThemeContext'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../config/config'

function NavBar() {
    const { user, loadUser } = useContext(UserContext)
    const [menuLangOpen, setMenuLangOpen] = useState(false)
    const [menuProfileOpen, setMenuProfileOpen] = useState(true)    
    const [cargando, setCargando] = useState(false)
    const [login, setLogin] = useState(false)
    const [togglePanel, setTogglePanel] = useState(false)
    const navigate = useNavigate()        
    
    const apiUrl = CONFIG_BACKEND.API_DIR
    const [imgMenuButtonPanel, setImgMenuButtonPanel] = useState(menu)

    function toggleMenu() {
        setMenuLangOpen(!menuLangOpen)
        let langMenu = document.getElementById("langMenu")

        if (menuLangOpen) {
            langMenu.style.display = "none"
        }else {
            langMenu.style.display = "flex"
        }
    }
    
    function toggleMenuProfile() {
        setMenuProfileOpen(!menuProfileOpen)
        let menuProfile = document.getElementById("menuProfile")
        let ulMenuProfile = document.getElementById("ulMenuProfile")
        let imgMenu = document.getElementById("imgMenu")
        let wellcomeName = document.getElementById("wellcomeName")
        let contWellcome = document.getElementById("contWellcome")
        let menuProfileButton = document.getElementById("menuProfileButton")
        let contContImgProfile = document.getElementById("contContImgProfile")

        if (menuProfileOpen) {
            menuProfile.style.width = "12rem"
            menuProfile.style.border= "none"
            contWellcome.style.width = "10rem"
            contWellcome.style.paddingTop="0.5rem"
            contContImgProfile.style.width = "3.5rem"
            menuProfileButton.style.width="10rem"
            ulMenuProfile.style.display = "flex"
            imgMenu.style.transform="rotateZ(180deg)"
            
            wellcomeName.style.display="flex"
            setTimeout(() => {
                wellcomeName.style.fontSize="1rem"
            }, 10)
        }else {
            contWellcome.style.width = "4rem"
            contWellcome.style.paddingTop="0rem"
            contContImgProfile.style.width = "4rem"
            ulMenuProfile.style.display = "none"
            menuProfile.style.width = "4rem"
            imgMenu.style.transform="rotateZ(0deg)"
            menuProfileButton.style.width="4rem"
            wellcomeName.style.fontSize="0rem"
            wellcomeName.style.display="none"
            menuProfileButton.style.paddingTop = "0rem"
            setTimeout(() => {
                menuProfile.style.border= "0.1rem solid rgb(190, 190, 190)"
            }, 100)    
        }
    }

    function toggleMenuPanel(){
        const panel = document.getElementById('panel')

        setTogglePanel(!togglePanel)
        if(togglePanel){
            setImgMenuButtonPanel(menu)
            panel.style.right="-16rem"
        }else{
            setImgMenuButtonPanel(close)
            panel.style.right="-1vw"
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCargando(true)

        try {
            const response = await fetch(`${apiUrl}/user/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            if (!response.ok) {
                console.error('Error status:', response.status)
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            if (data.logueado) {
                setLogin(true)
            }else{
                navigate('/login')
            }
        } catch (error) {
            alert("Error al iniciar sesión. Intenta nuevamente.")
            setLogin(false)
        } finally {
            setCargando(false)
            await loadUser()
        }
    }

    const {dark} = useTheme()
    
    return ( 
        <>
            <div className={styles.navbar} id='navbar'>
                <div className={styles.contNavbarContent}>
                    <nav className={styles.navbarContent} id="navbarContent">
                        <Link to='/' className={styles.navbarLogoLink}>
                            <div className={styles.navbarLogo}>
                                <img src={isotipo} alt="Logo" className={styles.logoImage} />
                            </div>
                        </Link>
                        <p>DPISUD</p>
                        <div className={styles.navbarLinks} id='navbarLinks'>
                            <Link to={CONFIG_PATHS.HOME_PATH}>Home</Link>
                            <Link to={CONFIG_PATHS.NEWS_PATH}>Noticias</Link>
                            <Link to={CONFIG_PATHS.ABOUT_US_PATH}>Nosotros</Link>
                            <Link to={CONFIG_PATHS.RESOURCES_PATH}>Recursos</Link>
                            <Link to={CONFIG_PATHS.PLANTATIONS}>Plantaciones</Link>
                            <Link to={CONFIG_PATHS.DONATE_PATH}>Donar</Link>
                            {!user && (
                                <Link to={CONFIG_PATHS.LOGIN_PATH}>Login</Link>
                            )}
                        </div>
                        
                        <menu className={styles.navbarMenu} id='navbarMenu' onClick={() => toggleMenu()}>
                            <div className={styles.menuButton} id="menu">
                                <span>Es</span>
                                <img src={arrowBottom} alt="arrowMenu" className={styles.menuIcon} />
                            </div>
                            <ul className={`${styles.menu} ${styles.langMenu}`} id="langMenu">
                                <li><Link to="/">EN</Link></li>
                                <li><Link to="/">FR</Link></li>
                            </ul>
                        </menu>

                        <div className={styles.buttonPanel} id='buttonPanel' alt='buttonPanel' onClick={()=>toggleMenuPanel()}>
                            <img src={imgMenuButtonPanel} id="imgMenuButtonPanel" className={styles.imgMenuButtonPanel}/>
                        </div>
                        <menu className={dark ? `${styles.panel} ${styles.dark}` : styles.panel} id='panel'>
                            <div className={styles.navbarLinksPanel}>
                                <Link to={CONFIG_PATHS.HOME_PATH} className={styles.link}>
                                    <img src={imgHome} alt="Logo" className={styles.logoImageLink}/>
                                    Home
                                </Link>
                                <Link to={CONFIG_PATHS.NEWS_PATH} className={styles.link}>
                                    <img src={imgNews} alt="Logo" className={styles.logoImageLink}/>
                                    Noticias
                                </Link>
                                <Link to={CONFIG_PATHS.ABOUT_US_PATH} className={styles.link}>
                                    <img src={imgAboutUs} alt="Logo" className={styles.logoImageLink}/>
                                    Nosotros
                                </Link>
                                <Link to={CONFIG_PATHS.RESOURCES_PATH} className={styles.link}>
                                    <img src={imgResources} alt="Logo" className={styles.logoImageLink}/>
                                    Recursos
                                </Link>
                                <Link to={CONFIG_PATHS.PLANTATIONS} className={styles.link}>
                                    <img src={imgPlantations} alt="Logo" className={styles.logoImageLink}/>
                                    Plantaciones
                                </Link>
                                <Link to={CONFIG_PATHS.DONATE_PATH} className={styles.link}>
                                    <img src={imgDonate} alt="Logo" className={styles.logoImageLink}/>
                                    Donar
                                </Link>
                                {!user && (
                                    <>
                                    <Link to={CONFIG_PATHS.LOGIN_PATH} className={styles.link}>
                                        <img src={imgProfileMen} alt="Logo" className={styles.logoImageLink}/>
                                        Login
                                    </Link>
                                    </>
                                )}
                                 {user && (
                                    <>
                                    {(user.rolId === 1) && (
                                        <Link to={CONFIG_PATHS.NEW_POST_PATH} className={styles.link}>
                                            <img src={imgPublication} alt="Logo" className={styles.logoImageLink}/>
                                            Publicar
                                        </Link>
                                    )}
                                    <Link to={CONFIG_PATHS.PROFILE_PATH} className={styles.link}>
                                        <img src={imgProfileMen} alt="Logo" className={styles.logoImageLink}/>
                                        Perfil
                                    </Link>
                                    {(user.rolId === 1) && (
                                        <Link to={CONFIG_PATHS.CONFIG_PATH} className={styles.link}>
                                            <img src={imgConfiguration} alt="Logo" className={styles.logoImageLink}/>
                                            Configuración
                                        </Link>
                                    )}
                                    <Link to={CONFIG_PATHS.HELP_PATH} className={styles.link}>
                                        <img src={imgHelp} alt="Logo" className={styles.logoImageLink}/>
                                        Ayuda
                                    </Link>
                                    <form onSubmit={handleSubmit}>
                                        <button type="submit" className={styles.link} alt="logout" title="Cerrar Sesión" disabled={cargando}>
                                            <img src={imgLogout} alt="Logo" className={styles.logoImageLink}/>
                                            Cerrar sesión
                                        </button>
                                    </form>
                                    </>
                                 )}
                                 <DarkMode />
                            </div>
                        </menu>
                    </nav>
                    {user && (
                        <menu className={styles.menuProfile} id="menuProfile">
                            <div className={`${styles.menuButton} ${styles.menuProfileButton}`} id="menuProfileButton" onClick={() => toggleMenuProfile()}>
                                <div className={styles.contWellcome} id="contWellcome">
                                    <p className={styles.wellcomeName} id="wellcomeName">{user.names}</p>
                                    <div className={styles.contContImgProfile} id="contContImgProfile">
                                        <ImgProfile id="imgProfile"/>
                                    </div>
                                </div>
                                <img src={arrowBottom} alt="arrowMenu" id="imgMenu" className={`${styles.menuIcon} ${styles.menuIconProfile}`} />
                            </div>
                            <ul className={`${styles.menu} ${styles.ulMenuProfile}`} id="ulMenuProfile">
                                <li><Link to={CONFIG_PATHS.PROFILE_PATH}>Perfil</Link></li>
                                {(user.rolId === 1) && (
                                    <>
                                        <li><Link to={CONFIG_PATHS.NEW_POST_PATH}>Publicar</Link></li>
                                        <li><Link to={CONFIG_PATHS.CONFIG_PATH}>Configuración</Link></li>
                                    </>
                                )}
                                <li><Link to={CONFIG_PATHS.HELP_PATH}>Ayuda</Link></li>
                                <li><DarkMode /></li>
                                
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