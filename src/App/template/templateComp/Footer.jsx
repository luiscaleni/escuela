import styles from './css/Footer.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadData from '../../components/LoadData'
import { CONFIG_BACKEND, CONFIG_SOCIAL_NETWORK } from '../../config/config'
import { useTranslation } from 'react-i18next'

function Footer() {
    const [configData, setConfigData]  = useState(null)
    const [cargando, setCargando] = useState(false)
    const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
    const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)
    const [t, i18n] = useTranslation()
    
    useEffect(() => {
        loadConfigData()
    }, [])

    return ( 
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.group}>
                        <p>{t('footer.aboutUs')}:</p>
                        <ul>
                            <li><Link to="#">{t('footer.mission')}</Link></li>
                            <li><Link to="#">{t('footer.vision')}</Link></li>
                        </ul>
                    </div>
                    
                    <div className={styles.group}>
                        <p>{t('footer.privacy')}:</p>
                        <ul>
                            <li><Link to="#">{t('footer.privacy')}</Link></li>
                        </ul>
                    </div>

                    <div className={styles.group}>
                        <p>{t('footer.contact')}:</p>
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
                    {configData ? `© ${configData.yearConfig} ${configData.acrDptoNameConfig}. ${t('footer.copyright')}` : "DPISUD"}
                </p>
            </footer>
        </>
     )
}

export default Footer