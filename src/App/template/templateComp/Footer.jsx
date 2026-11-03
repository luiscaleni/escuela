import styles from './css/Footer.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadData from '../../components/LoadData'
import mail from '/icons/links/mail.png'
import info from '/icons/links/info.png'
import privacy from '/icons/links/privacy.png'
import tiktok from '/icons/social/tiktok.png'
import facebook from '/icons/social/facebook.png'
import instagram from '/icons/social/instagram.png'
import { CONFIG_BACKEND, CONFIG_SOCIAL_NETWORK, CONFIG_PATHS } from '../../config/config'

function Footer() {
    const [configData, setConfigData]  = useState(null)
    const [cargando, setCargando] = useState(false)
    const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/getDataConfig`
    const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)
    
    useEffect(() => {
        loadConfigData()
    }, [])

    return ( 
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.group}>
                        <p>Sobre nosotros:</p>
                        <ul>
                            <li>
                                <Link to={CONFIG_PATHS.ABOUT_US_PATH}>
                                    <img src={info} />
                                    Quiénes somos
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className={styles.group}>
                        <p>Privacidad:</p>
                        <ul>
                            <li>
                                <Link to={CONFIG_PATHS.PRIVACY_PATH}>
                                    <img src={privacy} />
                                    Política de privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.group}>
                        <p>Contacto:</p>
                        <ul>
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.EMAIL}>
                                    <img src={mail} /> Email
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.group}>
                        <p>Redes sociales:</p>
                        <ul>
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.FB} target="_blank" className={styles.facebook}>
                                    <img src={facebook} />
                                </Link>
                                <Link to={CONFIG_SOCIAL_NETWORK.TK} target="_blank" className={styles.tiktok}>
                                    <img src={tiktok} />
                                </Link>
                                <Link to={CONFIG_SOCIAL_NETWORK.IG} target="_blank" className={styles.instagram}>
                                    <img src={instagram} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className={styles.copyright}>
                    {configData ? `© ${configData.yearConfig}` : "2026"} ARBITRA. Argentina. Todos los derechos reservados.
                </p>
            </footer>
        </>
     )
}

export default Footer