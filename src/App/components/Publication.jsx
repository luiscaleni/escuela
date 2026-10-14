import Section from '../components/Section'
import styles from './css/Publication.module.css'
import Video from '../components/Video'
import bannerDefault from '/images/banner_default.jpg'
import { CONFIG_BACKEND } from '../config/config'

function Publication({titlePub, nameAsset="", type="", typeElm="", locationPub="", locationAlt= "", children}) {
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
        <Section typeElm={type === "xtreme2" ? "fullScreen" : "banner"} titleElm={titlePub} >
          {type === "xtreme2" ? (<div className={styles.opacity}></div>) : null}
          {typeElm === "img" ? (
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