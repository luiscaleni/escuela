import { useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import Block from '../components/Block'
import Publication from '../components/Publication'
import Container from '../components/Container'
import Section from '../components/Section'
import ElmSelection from '../components/ElmSelection'
import LoadData from '../components/LoadData'
import whoWeAre from '/images/quienesSomos.jpg'
import misionImg from '/images/nuestraMision.jpg'
import valoresImg from '/images/nuestrosValores.jpg'
import ContainerTextImg from '../components/ContainerTextImg'

function AboutUs() {
  const [configData, setConfigData]  = useState(null)
  const [cargando, setCargando] = useState(false)
  const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/getDataConfig`
  const loadConfigData = LoadData(setCargando, setConfigData, 'GET', ROUTE)

  useEffect(() => {
      loadConfigData()
  }, [])

  return (
    <>
        <Publication titlePub="" typeElm='img' nameAsset="banner_about_us.jpg">
          <Section>
            <ContainerTextImg rightText={true} imgSrc={whoWeAre} altText="Banner About Us" titleText="¿Quiénes somos?" text="Centro de Formación Profesional en Arbitraje Deportivo
                  Formamos profesionales del arbitraje y del juzgamiento deportivo
                  El deporte necesita reglas. Pero también necesita personas preparadas para interpretarlas, aplicarlas y hacerlas respetar.
                  En ARBITRA® concebimos el arbitraje como una actividad que integra conocimientos técnicos, preparación física y mental, comunicación, ética, capacidad de decisión y actualización permanente.
                  Nuestro enfoque abarca diferentes disciplinas deportivas y reconoce la diversidad de funciones que intervienen en una competencia: árbitros, jueces, oficiales técnicos y otros responsables de su correcto desarrollo.
                  ARBITRA® — Todos los deportes. Una misma pasión."/>
            
            <ContainerTextImg imgSrc={misionImg} altText="Nuestra misión" titleText="Nuestra misión" text="Promover la formación profesional y el perfeccionamiento continuo de árbitros, jueces y oficiales deportivos mediante propuestas educativas que integren teoría, práctica, tecnología, ética y desarrollo personal" / >


            <ContainerTextImg imgSrc={valoresImg} altText="Nuestros valores" titleText="Nuestros Valores" rightText={true} text="Integridad. Actuar con honestidad, responsabilidad y respeto por las reglas. Imparcialidad. Desarrollar criterios de decisión basados en el reglamento y la equidad competitiva. Conocimiento. Estudiar, comprender y actualizar permanentemente los fundamentos distintas disciplinas deportivas. Profesionalismo. Promover la preparación integral y el compromiso con la función arbitral. Innovación. Incorporar herramientas pedagógicas y tecnológicas que mejoren el aprendizaje y el análisis de situaciones de juego." / >

            <Container>
                <h2>Nuestra filosofía</h2>

                <p>No alcanza con conocer las reglas. Hay que saber aplicarlas.
                    Cada decisión arbitral combina observación, interpretación, criterio, comunicación y responsabilidad.
                    Por eso, nuestra propuesta formativa busca preparar personas capaces de comprender el deporte desde una perspectiva integral y de desempeñar sus funciones con confianza, respeto y fundamento técnico.</p>
            </Container>

            <Container>
                <h2>Nuestra visión</h2>

                <p>Consolidarnos como un centro de referencia en formación profesional en arbitraje deportivo, impulsando una cultura de conocimiento, responsabilidad, inclusión y mejora continua.</p>
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