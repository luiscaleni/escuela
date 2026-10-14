import styles from './css/Footer.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadData from '../../components/LoadData'
import { CONFIG_BACKEND, CONFIG_SOCIAL_NETWORK, CONFIG_PATHS } from '../../config/config'

function Footer() {
    const [configData, setConfigData]  = useState(null)
    const [cargando, setCargando] = useState(false)
    const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
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
                            <li><Link to={CONFIG_PATHS.ABOUT_US_PATH}>Acerca de</Link></li>
                        </ul>
                    </div>
                    
                    <div className={styles.group}>
                        <p>Privacidad:</p>
                        <ul>
                            <li><Link to="#">Política de privacidad</Link></li>
                        </ul>
                    </div>

                    <div className={styles.group}>
                        <p>Contacto:</p>
                        <ul>
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.EMAIL}>
                                    <span className="icon-mail4"></span> Email
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.group}>
                        <p>Redes sociales:</p>
                        <ul>
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.FB} target="_blank" className="facebook">
                                    <span className="icon-facebook"></span> Facebook
                                </Link>
                            </li>
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.IG} target="_blank" className="twitter">
                                    <span className="icon-twitter"></span> Instagram
                                </Link>
                            </li>
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.YT} target="_blank" className="youtube">
                                    <span className="icon-play"></span> Youtube
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className={styles.copyright}>
                    {configData ? `© ${configData.yearConfig}` : "2026"} Escuela arbitral. Argentina. Todos los derechos reservados.
                </p>
            </footer>
        </>
     )
}

export default Footer