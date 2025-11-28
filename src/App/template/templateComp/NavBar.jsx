import {useState, useContext, useEffect} from 'react'
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

import { UserContext } from '../../components/UserProvider'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../config/config'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../../components/LanguageSelector'

function NavBar() {
    const { user, loadUser } = useContext(UserContext)
    const [menuProfileOpen, setMenuProfileOpen] = useState(true)    
    const [cargando, setCargando] = useState(false)
    const [togglePanel, setTogglePanel] = useState(false)
    const navigate = useNavigate()
    const [t, i18n] = useTranslation()    
    const apiUrl = CONFIG_BACKEND.API_DIR
    const [imgMenuButtonPanel, setImgMenuButtonPanel] = useState(menu)

    
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
            menuProfileButton.style.width="10rem"
            ulMenuProfile.style.display = "flex"
            imgMenu.style.transform="rotateZ(180deg)"
            
            wellcomeName.style.display="flex"
            setTimeout(() => {
                wellcomeName.style.fontSize="0.95rem"
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
        const contNavbarContent = document.getElementById('contNavbarContent')

        setTogglePanel(!togglePanel)
        if(togglePanel){
            setImgMenuButtonPanel(menu)
            contNavbarContent.style.right="-20rem"
        }else{
            setImgMenuButtonPanel(close)
            contNavbarContent.style.right="-1vw"
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
                if (import.meta.env.DEV) { console.error('Error status:', response.status) }
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            if (!data.logueado) {
                navigate('/login')
            }
        } catch (error) {
            alert("❌ Error al iniciar sesión. Intenta nuevamente.")
        } finally {
            setCargando(false)
            await loadUser()
        }
    }

    /*traduccion */
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])


    return ( 
        <>
            <div className={styles.navbar} id='navbar'>
                <div className={styles.contMobile}>
                    <Link to='/' className={styles.navbarLogoLinkMobile}>
                        <div className={styles.navbarLogo}>
                            <img src={isotipo} alt="Logo" className={styles.logoImage} />
                        </div>
                    </Link>
                    <p>DPISUD</p>
                    <div className={styles.buttonPanel} alt='buttonPanel' onClick={toggleMenuPanel}>
                        <img src={imgMenuButtonPanel} className={styles.imgMenuButtonPanel}/>
                    </div>
                </div>
                <div className={styles.contNavbarContent} id="contNavbarContent">
                    <nav className={styles.navbarContent} id="navbarContent">
                        <div className={styles.navbarLinks} id='navbarLinks'>
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
                                    <img src={isotipo} alt="Logo" className={styles.logoImage} />
                                </div>
                                <p>DPISUD</p>
                            </Link>
                            <Link to={CONFIG_PATHS.HOME_PATH}>
                                <img src={imgHome} className={styles.imgMobile}/>
                                {t('navbar.home')}
                            </Link>
                            <Link to={CONFIG_PATHS.NEWS_PATH}>
                                <img src={imgNews} className={styles.imgMobile}/>
                                {t('navbar.news')}
                            </Link>
                            <Link to={CONFIG_PATHS.ABOUT_US_PATH}>
                                <img src={imgAboutUs} className={styles.imgMobile}/>
                                {t('navbar.aboutUs')}
                            </Link>
                            <Link to={CONFIG_PATHS.RESOURCES_PATH}>
                                <img src={imgResources} className={styles.imgMobile}/>
                                {t('navbar.resources')}
                            </Link>
                            <Link to={CONFIG_PATHS.PLANTATIONS}>
                                <img src={imgPlantations} className={styles.imgMobile}/>
                                {t('navbar.plantations')}
                            </Link>
                            <Link to={CONFIG_PATHS.DONATE_PATH}>
                                <img src={imgDonate} className={styles.imgMobile}/>
                                {t('navbar.donate')}
                            </Link>
                            
                            {!user ? (
                            <>
                            <Link to={CONFIG_PATHS.LOGIN_PATH}>
                                <img src={imgProfileMen} className={styles.imgMobile}/>
                                {t('navbar.login')}
                            </Link>
                            <div className={styles.contNavbarMenuPanel}>
                                <LanguageSelector />
                            </div>

                            <DarkMode />
                            </>
                            ) : (
                            <>
                            <div className={styles.elmPanel}>
                                <Link to={CONFIG_PATHS.PROFILE_PATH}>
                                    <img src={imgProfileMen} className={styles.imgMobile}/>
                                    {t('navbar.profile')}
                                </Link>
                                {(user.rolId === 1) && (
                                    <>
                                    <Link to={CONFIG_PATHS.NEW_POST_PATH}>
                                        <img src={imgPublication} className={styles.imgMobile}/>
                                        {t('navbar.publication')}
                                    </Link>
                                    <Link to={CONFIG_PATHS.CONFIG_PATH}>
                                        <img src={imgConfiguration} className={styles.imgMobile}/>
                                        {t('navbar.configuration')}
                                    </Link>
                                    </>
                                )}
                                <Link to={CONFIG_PATHS.HELP_PATH}>
                                    <img src={imgHelp} className={styles.imgMobile}/>
                                    {t('navbar.help')}
                                </Link>
                                <div className={styles.contNavbarMenuPanel}>
                                    <LanguageSelector />
                                </div>
                                <DarkMode />
                                <form onSubmit={handleSubmit}>
                                    <Button
                                        typeBtn="submit"
                                        altNameBtn="logout"
                                        titleBtn="Cerrar Sesión"
                                        disabled={cargando}
                                    >{t('navbar.logout')}</Button>
                                </form>
                            </div>
                            </>
                            )}
                        </div>
                        <div className={styles.contNavbarMenu}>
                            <LanguageSelector />
                        </div>

                    </nav>
                    {user && (
                        <menu className={styles.menuProfile} id="menuProfile">
                            <div className={`${styles.menuButton} ${styles.menuProfileButton}`} id="menuProfileButton" onClick={() => toggleMenuProfile()}>
                                <div className={styles.contWellcome} id="contWellcome">
                                    <div className={styles.contContImgProfile} id="contContImgProfile">
                                        <ImgProfile id="imgProfile"/>
                                    </div>
                                    <p className={styles.wellcomeName} id="wellcomeName">{user.names}</p>
                                </div>
                                <img src={arrowBottom} alt="arrowMenu" id="imgMenu" className={`${styles.menuIcon} ${styles.menuIconProfile}`} />
                            </div>
                            <ul className={`${styles.menu} ${styles.ulMenuProfile}`} id="ulMenuProfile">
                                <li>
                                    <Link to={CONFIG_PATHS.PROFILE_PATH}>{t('buttons.profile')}</Link>
                                </li>
                                {(user.rolId === 1) && (
                                    <>
                                    <li>
                                        <Link to={CONFIG_PATHS.NEW_POST_PATH}>{t('navbar.publication')}</Link>
                                    </li>
                                    <li>
                                        <Link to={CONFIG_PATHS.CONFIG_PATH}>{t('navbar.configuration')}</Link>
                                    </li>
                                    </>
                                )}
                                <li>
                                    <Link to={CONFIG_PATHS.HELP_PATH}>{t('navbar.help')}</Link>
                                </li>
                                <li>
                                    <DarkMode />
                                </li>
                                <form onSubmit={handleSubmit}>
                                    <Button
                                        typeBtn="submit"
                                        altNameBtn="logout"
                                        titleBtn="Cerrar Sesión"
                                        disabled={cargando}
                                    >{t('navbar.logout')}</Button>
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