import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './css/Home.module.css'
import Template from '../template/Template'
import Section from '../components/Section'
import Publication from '../components/Publication'
import Elementor from '../components/Elementor'
import LoadData from '../components/LoadData'
import stylesButton from '../components/css/Button.module.css'
import { CONFIG_BACKEND, CONFIG_NAMES_COUNTRYS, CONFIG_PATHS } from '../config/config'
import { useTranslation } from 'react-i18next'

function Home() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
  const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)
  const [dbPlantations, setDbPlantations] = useState()
  const [message, setMessage] = useState("")
  const [leadersPlant, setLeadersPlant] = useState()
  const [t, i18n] = useTranslation()

  useEffect(() => {
    loadConfigData()
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      const [plantsRes, leadersRes] = await Promise.all([
      fetch(`${CONFIG_BACKEND.API_DIR}/plantations`, {
          method: 'GET'
      }),
      fetch(`${CONFIG_BACKEND.API_DIR}/leadersPlants`, {
          method: 'GET'
      })])
      
      const [plantsData, leadersData] = await Promise.all([
        plantsRes.json(),
        leadersRes.json()
      ])

      if (plantsData.success) {
        setDbPlantations(plantsData.result)
      }else{
          setMessage('Error: ', "❌ "+plantsData.message)
      }

      if (leadersData.success) {
        setLeadersPlant(leadersData.result.length)
      }
    }catch (error){
      return
    }
  }
  
  const namesCountrys = CONFIG_NAMES_COUNTRYS.join(" • ") + " • "
  const namesCountrysTwo = CONFIG_NAMES_COUNTRYS.slice().reverse().join(" • ") + " • "
  const namesCountrysThree = CONFIG_NAMES_COUNTRYS.slice().sort(() => Math.random() - 0.5).join(" • ") + " • "

  return (
    <Template>
      <Publication
        titlePub={configData?.dptoNameConfig}
        typeElm="img"
        nameAsset="banner_home.jpg">
        <Section>
          <h4>{configData?.contentConfig}</h4>
        </Section>
        <Section>
          <div className={styles.marqueeContainer}>
            <h2>{t('home.sectPlantTitle')}</h2>
            <div className={styles.marquee}>
              <h3 className={styles.one}>{namesCountrys}</h3>
            </div>
            <div className={styles.marquee}>
              <h3 className={styles.two}>{namesCountrysTwo}</h3>
            </div>
            <div className={styles.marquee}>
              <h3 className={styles.three}>{namesCountrysThree}</h3>
            </div>
            <Link to={CONFIG_PATHS.PLANTATIONS} className={stylesButton.button}>{t('buttons.seePlantations')}</Link>
          </div>
        </Section>
        <Section>
          <Elementor>
            <div className={styles.dataCountry}><p>10</p><p>{t('home.countries')}</p></div>
          </Elementor>
          <Elementor>
            <div className={styles.dataChurch}><p>{dbPlantations}</p><p>{t('home.plantations')}</p></div>
          </Elementor>
          <Elementor>
            <div className={styles.dataPlanters}><p>{leadersPlant}</p><p>{t('home.planters')}</p></div>
          </Elementor>
        </Section>
        
        <Section typeElm="maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d256.1527077294531!2d-58.445179678764134!3d-34.65031875185828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-34.6502313198327!2d-58.445158221092!5e1!3m2!1ses!2sar!4v1749513947818!5m2!1ses!2sar"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </Section>
      </Publication>
    </Template>
  )
}

export default Home