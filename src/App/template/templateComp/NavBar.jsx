import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import styles from "./css/NavBar.module.css"
import arrow from "../../assets/arrow.png"
import Logo from "/isotipo.svg"
import { CONFIG_PATHS } from '../../config/config'
import Button from '../../components/Button'
import ImgProfile from '../../components/ImgProfile'
import menu from '/assets/images/responsive/menu.png'
import close from '/assets/images/responsive/close.png'
import { UserContext } from '../../components/UserProvider'

function NavBar() {
    const { user, loadUser } = useContext(UserContext)
    const [menuLangOpen, setMenuLangOpen] = useState(false)
    const [menuProfileOpen, setMenuProfileOpen] = useState(true)    
    const [cargando, setCargando] = useState(false)
    const [login, setLogin] = useState(false)
    const [togglePanel, setTogglePanel] = useState(false)
    const navigate = useNavigate()        
    
    const apiUrl = import.meta.env.VITE_API_BASE_URL
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
        }
    }

    function toggleMenuPanel(){
        const panel = document.getElementById('panel')
        const buttonPanel = document.getElementById('buttonPanel')

        setTogglePanel(!togglePanel)
        if(togglePanel){
            setImgMenuButtonPanel(menu)
            panel.style.right="-50vw"
        }else{
            setImgMenuButtonPanel(close)
            panel.style.right="0vw"
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
                // Puedes mostrar el status para depuración
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
            // No mostrar detalles sensibles
            alert("Error al iniciar sesión. Intenta nuevamente.")
            setLogin(false)
        } finally {
            setCargando(false)
            await loadUser()
        }
    }
    
    return ( 
        <>
            <nav className={styles.navbar} id='navbar'>
                <div className={styles.contNavbarContent}>
                    <div className={styles.navbarContent} id="navbarContent">
                        <Link to='/' className={styles.navbarLogoLink}>
                            <div className={styles.navbarLogo}>
                                <img src={Logo} alt="Logo" className={styles.logoImage} />
                            </div>
                        </Link>
                        <div className={styles.navbarLinks} id='navbarLinks'>
                            <Link to={CONFIG_PATHS.HOME_PATH}>Home</Link>
                            <Link to={CONFIG_PATHS.NEWS_PATH}>Noticias</Link>
                            <Link to={CONFIG_PATHS.ABOUT_US_PATH}>Nosotros</Link>
                            <Link to={CONFIG_PATHS.RESOURCES_PATH}>Recursos</Link>
                            <Link to={CONFIG_PATHS.DONATE_PATH}>Donar</Link>
                            {!user && (
                                <Link to={CONFIG_PATHS.LOGIN_PATH}>Login</Link>
                            )}
                        </div>
                        <menu className={styles.navbarMenu} id='navbarMenu' onClick={() => toggleMenu()}>
                            <div className={styles.menuButton} id="menu">
                                <span>Es</span>
                                <img src={arrow} alt="arrowMenu" className={styles.menuIcon} />
                            </div>
                            <ul className={`${styles.menu} ${styles.langMenu}`} id="langMenu">
                                <li><Link to="/">EN</Link></li>
                                <li><Link to="/">FR</Link></li>
                            </ul>
                        </menu>

                        <div className={styles.buttonPanel} id='buttonPanel' alt='buttonPanel' onClick={()=>toggleMenuPanel()}>
                            <img src={imgMenuButtonPanel} className={styles.imgMenuButtonPanel}/>
                        </div>
                        <div className={styles.panel} id='panel'>
                            <div className={styles.navbarLinksPanel}>
                                <Link to={CONFIG_PATHS.HOME_PATH}>Home</Link>
                                <Link to={CONFIG_PATHS.NEWS_PATH}>Noticias</Link>
                                <Link to={CONFIG_PATHS.ABOUT_US_PATH}>Nosotros</Link>
                                <Link to={CONFIG_PATHS.RESOURCES_PATH}>Recursos</Link>
                                <Link to={CONFIG_PATHS.DONATE_PATH}>Donar</Link>
                                {!user && (
                                    <Link to={CONFIG_PATHS.LOGIN_PATH}>Login</Link>
                                )}
                                 {user && (
                                    <>
                                    <Link to={CONFIG_PATHS.NEW_POST_PATH}>Publicar</Link>
                                    <Link to={CONFIG_PATHS.PROFILE_PATH}>Perfil</Link>
                                    <Link to={CONFIG_PATHS.CONFIG_PATH}>Configuración</Link>
                                    <Link to={CONFIG_PATHS.HELP_PATH}>Ayuda</Link>
                                        
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
                    </div>
                    {user && (
                        <menu className={styles.menuProfile} id="menuProfile">
                            <div className={`${styles.menuButton} ${styles.menuProfileButton}`} id="menuProfileButton" onClick={() => toggleMenuProfile()}>
                                <div className={styles.contWellcome} id="contWellcome">
                                    <p className={styles.wellcomeName} id="wellcomeName">{user.names}</p>
                                    <div className={styles.contContImgProfile} id="contContImgProfile">
                                        <ImgProfile id="imgProfile"/>
                                    </div>
                                </div>
                                <img src={arrow} alt="arrowMenu" id="imgMenu" className={`${styles.menuIcon} ${styles.menuIconProfile}`} />
                            </div>
                            <ul className={`${styles.menu} ${styles.ulMenuProfile}`} id="ulMenuProfile">
                                <li><Link to={CONFIG_PATHS.NEW_POST_PATH}>Publicar</Link></li>
                                <li><Link to={CONFIG_PATHS.PROFILE_PATH}>Perfil</Link></li>
                                <li><Link to={CONFIG_PATHS.CONFIG_PATH}>Configuración</Link></li>
                                <li><Link to={CONFIG_PATHS.HELP_PATH}>Ayuda</Link></li>
                                
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
            </nav>
        </>
     )
}

export default NavBar