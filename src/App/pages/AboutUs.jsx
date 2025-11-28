import Template from '../template/Template'
import { useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import Block from '../components/Block'
import Publication from '../components/Publication'
import Container from '../components/Container'
import Section from '../components/Section'
import ElmSelection from '../components/ElmSelection'
import LoadData from '../components/LoadData'
import whoWeAre from '../assets/images/about_us.png'
import { useTranslation } from 'react-i18next'

function AboutUs() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
  const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)
  const [t, i18n] = useTranslation()    

  useEffect(()=>{
      const lang = localStorage.getItem('lang') || 'es'
      i18n.changeLanguage(lang)
  },[i18n])


  useEffect(() => {
      loadConfigData()
  }, [])

  return (
    <>
      <Template>
        <Publication titlePub={t('aboutUs.title')}typeElm='img' nameAsset="banner_about_us.jpg">
          <Section>
            <Container>
              <Block>
                  <h2>
                    <span>{t('aboutUs.whoWeAreOne')}</span>
                    {t('aboutUs.whoWeAreTwo')}
                  </h2>

                <p>
                  {t('aboutUs.textOne')}
                  <br/><br/>
                  {t('aboutUs.textTwo')}
                  <br/><br/>
                  {t('aboutUs.textThree')}
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
      </Template>
    </>
  )
}

export default AboutUs