import { useEffect, useState } from 'react'
import styles from './css/Home.module.css'
import Section from '../components/Section'
import Publication from '../components/Publication'
import Elementor from '../components/Elementor'
import LoadData from '../components/LoadData'
import { CONFIG_BACKEND, CONFIG_NAMES_COUNTRYS, CONFIG_PATHS } from '../config/config'

function Home() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
  const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)

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
      }/**/

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
      <Publication
        type="xtreme2"
        nameAsset="banner.webp"
        home={true}
      >
        <Section>
          <h2>{configData?.contentConfig}</h2>
        </Section>
        <Section>
          <Elementor>
            <div className={styles.dataCountry}><p>FUTBOL</p><p>11, 8 y 5</p></div>
          </Elementor>
          <Elementor>
            <div className={styles.dataCountry}><p>FUTSAL</p></div>
          </Elementor>
          <Elementor>
            <div className={styles.dataCountry}><p>FUTBOL</p><p>PLAYA</p></div>
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
  )
}

export default Home