import { useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import Publication from '../components/Publication'
import Container from '../components/Container'
import Section from '../components/Section'
import LoadData from '../components/LoadData'
import styles from './css/PrivacyPolitic.module.css'

function PrivacyPolitic() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
  const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)


  useEffect(() => {
      loadConfigData()
  }, [])

  return (
    <>
      <Publication titlePub="Políticas de privacidad" typeElm='img' nameAsset="banner_privacy_politic.webp">
        <Section>
          <Container>
            <div className={styles.contTitle}>
              <h2>
                Escuela de árbitros
              </h2>
              
              <p>
                
              </p>

              <br/><br/>
              <div className={styles.contPrivacyDate}>
                <p className={styles.privacyDate}>
                  Actualizado el: 13 de octubre del 2026
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </Publication>
    </>
  )
}

export default PrivacyPolitic