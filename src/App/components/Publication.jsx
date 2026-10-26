import Section from '../components/Section'
import styles from './css/Publication.module.css'
import Video from '../components/Video'
import bannerDefault from '/images/banner_default.jpg'
import { CONFIG_BACKEND } from '../config/config'
import ContentTextLand from './ContentTextLand'
import CardTilted from './CardTilted'

import futbol from '/images/others/futbol.png'
import basket from '/images/others/basket.png'
import voley from '/images/others/voley.png'
import rugby from '/images/others/rugby.png'
import ContainerWrapper from './ContainerWrapper'

function Publication({home=false, titlePub, nameAsset="", type="", typeElm="", locationPub="", locationAlt= "", children}) {
  let mediaSrc

  if (typeElm === "img") {

    if(nameAsset && locationPub){
      mediaSrc = `${CONFIG_BACKEND.API_DIR}/src/assets/${locationPub}/${nameAsset}`
    }else if(nameAsset && locationAlt){
      mediaSrc = `/images/${locationAlt}/${nameAsset}`
    }else if(nameAsset && !locationPub){
      mediaSrc = `/images/${nameAsset}`
    }else if(!nameAsset && !locationPub || nameAsset === null){
      mediaSrc = bannerDefault
    }

  }else if(typeElm === "video") {
    mediaSrc = null
  }

  return (
    <>
      <div className={styles.publication}>
        <Section home={home} typeElm={type === "xtreme2" ? "fullScreen" : "banner"} titleElm={titlePub} >
          {home ===true ? (
              <div className={styles.contTotal}>
                <div className={styles.degrade}></div>
                <ContainerWrapper images={['/images/others/img1.jpg', '/images/others/img2.jpg', '/images/others/img3.jpg']}>
                      <ContentTextLand />
                      <div className={styles.cont}>
                        <CardTilted 
                          title='Fútbol'
                          subtitle='Tácticas VAR / Reglas FIFA'
                          imgSrc={futbol}
                        />
                        <CardTilted 
                          title='Básquet'
                          subtitle='Sistema de Repetición Instantánea (IRS) / Reglas FIBA'
                          imgSrc={basket}
                        />
                        <CardTilted 
                          title='Voley'
                          subtitle='Sistema de Desafío (Challenge System) / Reglas FIVB'
                          imgSrc={voley}
                        />
                        <CardTilted 
                          title='Rugby'
                          subtitle='Oficial de Partido de Televisión (TMO) / Reglas World Rugby'
                          imgSrc={rugby}
                        />
                      </div>
                </ContainerWrapper>
              </div>                        
            ) : typeElm === "img" ? (
              <img src={mediaSrc} alt="Imagen de la publicación" loading='lazy'/>
            ) : typeElm === "video" ? (
              <Video />
            ) : null
          }
        </Section>
        <Section typeElm={type === "xtreme2" ? "xtreme2" : "xtreme"}>
            {children ? children : <p>No hay nada aqui</p>}
        </Section>
      </div>
    </>
  )
}

export default Publication