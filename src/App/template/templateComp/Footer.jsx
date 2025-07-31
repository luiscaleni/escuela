import styles from "./css/Footer.module.css"
import { useEffect, useState } from 'react'
import LoadConfigData from '../../components/LoadConfigData'

function Footer() {
    const [configData, setConfigData]  = useState(null)
    const [cargando, setCargando] = useState(false)
    const loadConfigData = LoadConfigData(setCargando, setConfigData)
    
    useEffect(() => {
        loadConfigData()
    }, [])

    return ( 
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>
                        {configData ? `©${configData.yearConfig} ${configData.acrDptoNameConfig}. Todos los derechos reservados.` : "Cargando..."}
                    </p>
                </div>
            </footer>
        </>
     )
}

export default Footer