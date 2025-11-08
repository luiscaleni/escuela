import Section from '../components/Section'
import styles from './css/Publication.module.css'
import Video from '../components/Video'
import bannerDefault from '../assets/images/banner_default.jpg'
import { CONFIG_BACKEND, CONFIG_ALERT_MESSAGE } from '../config/config'

function Publication({titlePub, nameAsset="", typeElm="", locationPub="", locationAlt= "", children}) {
  let mediaSrc

  if (typeElm === "img") {

    if(nameAsset && locationPub){
      mediaSrc = `${CONFIG_BACKEND.API_DIR}/src/assets/${locationPub}/${nameAsset}`
    }else if(nameAsset && locationAlt){
      mediaSrc = `${CONFIG_BACKEND.API_DIR}/src/public/assets/images/${locationAlt}/${nameAsset}`
    }else if(nameAsset && !locationPub){
      mediaSrc = `${CONFIG_BACKEND.API_DIR}/src/public/assets/images/${nameAsset}`
    }else if(!nameAsset && !locationPub || nameAsset === null){
      mediaSrc = bannerDefault
    }

  }else if(typeElm === "video") {
    mediaSrc = null
  }

  return (
    <>
      <div className={styles.publication}>
        <Section typeElm="banner" titleElm={titlePub} >
          {typeElm === "img" ? (
            <img src={mediaSrc} alt="Imagen de la publicación" loading='lazy'/>
          ) : typeElm === "video" ? (
            <Video />
          ) : null}
        </Section>
        <Section typeElm='xtreme'>
            {children ? children : <p>{CONFIG_ALERT_MESSAGE}</p>}
        </Section>
      </div>
    </>
  )
}

export default Publication