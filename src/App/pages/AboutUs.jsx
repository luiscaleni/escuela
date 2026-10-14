import { useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import Block from '../components/Block'
import Publication from '../components/Publication'
import Container from '../components/Container'
import Section from '../components/Section'
import ElmSelection from '../components/ElmSelection'
import LoadData from '../components/LoadData'
import whoWeAre from '/images/about_us.png'

function AboutUs() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
  const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)

  useEffect(() => {
      loadConfigData()
  }, [])

  return (
    <>
        <Publication titlePub="¿Quiénes somos?"typeElm='img' nameAsset="banner_about_us.jpg">
          <Section>
            <Container>
              <Block>
                <h2>
                  <span>¿Quiénes somos?</span>
                </h2>

                <p>
                  
                </p>
              </Block>

              <Block>
                <img src={whoWeAre}/>
              </Block>
            </Container>
          </Section>
          <Section>
              <ElmSelection>
                <p>
                  <span>Email:</span> 
                  {configData?.emailConfig}
                </p>
              </ElmSelection>
          </Section>
        </Publication>
    </>
  )
}

export default AboutUs