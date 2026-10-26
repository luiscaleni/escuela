import { useEffect, useState } from 'react'
import styles from './css/Home.module.css'
import Section from '../components/Section'
import Publication from '../components/Publication'
import Elementor from '../components/Elementor'
import LoadData from '../components/LoadData'
import { CONFIG_BACKEND, CONFIG_NAMES_COUNTRYS, CONFIG_PATHS } from '../config/config'
import { Link } from 'react-router-dom'
import SimulatorAndSuccess from '../components/SimulatorAndSuccess'

function Home() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
  const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)

  useEffect(() => {
    loadConfigData()
  }, [])

  return (
      <Publication
        type="xtreme2"
        nameAsset="banner.webp"
        home={true}
      >
        <Section>
          <h2>{configData?.contentConfig}</h2>
        </Section>
        <Section>
            {/* TARJETA 1: FÚTBOL 11 */}
            <Elementor>
                <div className={styles.cardContainer}>
                    <div>
                        <div className={styles.cardHeader}>
                            <span className={styles.badgeLevel}>Nivel Inicial / Intermedio</span>
                            <span className={styles.cardDuration}><i className="fa-regular fa-clock mr-1"></i> 6 Meses</span>
                        </div>
                        <h3 className={styles.cardTitle}>Árbitro de Campo (Fútbol 11)</h3>
                        <p className={styles.cardDescription}>Dominio completo de las 17 reglas del juego IFAB, posicionamiento táctico, lenguaje corporal y señalética oficial.</p>
                        
                        <ul className={styles.cardList}>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Táctica y Posicionamiento de Diagonal</li>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Preparación Física &amp; Test Yo-Yo</li>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Redacción de Actas e Informes Oficiales</li>
                        </ul>
                    </div>
                    <div className={styles.cardFooter}>
                        <div>
                            <span className={styles.investmentLabel}>Inversión</span>
                            <span className={styles.investmentPrice}>Consultar <span className={styles.investmentSub}>/mes</span></span>
                        </div>
                        <Link to='/deportes' className={styles.cardButton}>
                            Ver Programa
                        </Link>
                    </div>
                </div>
            </Elementor>

            {/* TARJETA 2: FÚTBOL 8 Y FÚTBOL 5 (DESTACADA) */}
            <Elementor>
                <div className={`${styles.cardContainer} ${styles.cardFeatured}`}>
                    <div>
                        <div className={styles.cardHeader}>
                            <span className={styles.badgeLevel}>Avanzado / Formativo</span>
                            <span className={styles.cardDuration}><i className="fa-regular fa-clock mr-1"></i> 4 Meses</span>
                        </div>
                        <h3 className={styles.cardTitle}>Árbitro de Fútbol 8 y 5</h3>
                        <p className={styles.cardDescription}>Gestión de espacios reducidos, control de faltas tácticas, arbitraje dinámico y manejo de banco de suplentes.</p>
                        
                        <ul className={styles.cardList}>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Criterio de Ley de Ventaja en Espacios Reducidos</li>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Control Disciplinario y Tarjetas en F5/F8</li>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Coordinación con Cronometraje y Planilleros</li>
                        </ul>
                    </div>
                    <div className={styles.cardFooter}>
                        <div>
                            <span className={styles.investmentLabel}>Inversión</span>
                            <span className={styles.investmentPrice}>Consultar <span className={styles.investmentSub}>/mes</span></span>
                        </div>
                        <Link to='/deportes' className={styles.cardButton}>
                            Ver Programa
                        </Link>
                    </div>
                </div>
            </Elementor>

            {/* TARJETA 3: FUTSAL / FÚTBOL SALA */}
            <Elementor>
                <div className={styles.cardContainer}>
                    <div>
                        <div className={styles.cardHeader}>
                            <span className={styles.badgeLevel}>Especialidad</span>
                            <span className={styles.cardDuration}><i className="fa-regular fa-clock mr-1"></i> 3 Meses</span>
                        </div>
                        <h3 className={styles.cardTitle}>Árbitro de Futsal (Fútbol Sala)</h3>
                        <p className={styles.cardDescription}>Reglamentación específica FIFA/AFA de superficies indoor, faltas acumuladas, doble penal y conteo de 4 segundos.</p>
                        
                        <ul className={styles.cardList}>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Reglas Oficiales de Futsal y Dinámica de Dupla</li>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Manejo de Cronómetro Electrónico y Tiempos Muertos</li>
                            <li className={styles.cardListItem}><i className="fa-solid fa-check"></i> Protocolo de Sustituciones y Área Técnica</li>
                        </ul>
                    </div>
                    <div className={styles.cardFooter}>
                        <div>
                            <span className={styles.investmentLabel}>Inversión</span>
                            <span className={styles.investmentPrice}>Consultar <span className={styles.investmentSub}>/mes</span></span>
                        </div>
                        <Link to='/deportes' className={styles.cardButton}>
                            Ver Programa
                        </Link>
                    </div>
                </div>
            </Elementor>
        </Section>
        <SimulatorAndSuccess />

      </Publication>
  )
}

export default Home