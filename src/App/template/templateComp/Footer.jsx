import styles from "./css/Footer.module.css"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import LoadData from '../../components/LoadData'
import { CONFIG_BACKEND, CONFIG_SOCIAL_NETWORK } from "../../config/config"

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
                        <p>Sedes:</p>
                            <ul>
                                <li><Link to="#">Buenos aires</Link></li>
                                <li><Link to="#">Tucuman</Link></li>
                                <li><Link to="#">Mendoza</Link></li>
                                <li><Link to="#">Córdoba</Link></li>
                            </ul>
                    </div>

                    <div className={styles.group}>
                        <p>Conéctate con nosotros:</p>
                        <ul>
                            <li><Link to="#">Política de privacidad</Link></li>
                            <li><Link to="#">Términos y condiciones</Link></li>
                            <li><Link to="#">Servicios para empresas</Link></li>
                        </ul>
                    </div>

                    <div className={styles.group}>
                        <p>Acerca de:</p>
                        <ul>
                            <li><Link to="#">¿Qué es DPISUD?</Link></li>
                            <li><Link to="#">Nuestros colaboradores</Link></li>
                            <li><Link to="#">Nuestra visión</Link></li>
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
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.FB} target="_blank" className="facebook">
                                    <span className="icon-facebook"></span> Facebook
                                </Link>
                            </li>
                            <li>
                                <Link to={CONFIG_SOCIAL_NETWORK.TW} target="_blank" className="twitter">
                                    <span className="icon-twitter"></span> Twitter
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
                    {configData ? `©${configData.yearConfig} ${configData.acrDptoNameConfig}. Todos los derechos reservados.` : "DPISUD"}
                </p>
            </footer>
        </>
     )
}

export default Footer