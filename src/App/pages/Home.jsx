import Template from '../template/Template'
import Section from '../components/Section'
import Publication from '../components/Publication'
import { useEffect, useState } from 'react'
import LoadConfigData from '../components/LoadConfigData'

function Home() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const loadConfigData = LoadConfigData(setCargando, setConfigData)
  useEffect(() => {
      loadConfigData()
  }, [])

  return (
    <Template>
      <Publication
        titlePub={configData?.dptoNameConfig}
        typeElm="video"
        nameAsset="bg">
        <Section titleElm="Bienvenido a mi sitio web">
          {configData?.contentConfig}
        </Section>
        <Section typeElm="maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d256.1527077294531!2d-58.445179678764134!3d-34.65031875185828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-34.6502313198327!2d-58.445158221092!5e1!3m2!1ses!2sar!4v1749513947818!5m2!1ses!2sar"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
            style={{ border: 0, width: '100%', height: '400px' }}
          ></iframe>
        </Section>
      </Publication>
    </Template>
  )
}

export default Home