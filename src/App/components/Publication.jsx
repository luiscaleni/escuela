import Section from '../components/Section'
import styles from './css/Publication.module.css'
import Video from '../components/Video'
import bannerDefault from '../assets/images/banner_default.jpg'
import { CONFIG_BACKEND } from '../config/config'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

function Publication({titlePub, nameAsset="", typeElm="", locationPub="", locationAlt= "", children}) {
  const [t, i18n] = useTranslation()
  
  useEffect(()=>{
      const lang = localStorage.getItem('lang') || 'es'
      i18n.changeLanguage(lang)
  },[i18n])

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
            {children ? children : <p>{t('alerts.WeAreW')}</p>}
        </Section>
      </div>
    </>
  )
}

export default Publication