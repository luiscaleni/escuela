import Section from '../components/Section'
import styles from './css/Publication.module.css'
import Video from '../components/Video'
import { CONFIG_BACKEND } from '../config/config'

function Publication({titlePub, nameAsset="", typeElm="", locationPub="", children}) {
  let mediaSrc
  let nameImg = nameAsset

  if (typeElm === "img") {
    if(nameAsset && locationPub){
      imgSrc = <img src={`${CONFIG_BACKEND.API_DIR}/src/assets/${locationPub}/${nameImg}`} alt="Imagen de la publicación" />
    }else if(nameAsset && !locationPub){
      mediaSrc = <img src={`${CONFIG_BACKEND.API_DIR}/src/public/assets/images/${nameImg}`} alt="Imagen de la publicación" />
    }
  }else if(typeElm === "video") {
    mediaSrc = <Video nameVideo={nameAsset}/>
  }

  return (
    <>
      <div className={styles.publication}>
        <Section typeElm="banner" titleElm={titlePub} >
          {mediaSrc}
        </Section>
        <Section typeElm='xtreme'>
            {children ? children : <p>Estamos trabajando en ello. Disculpe las molestias.</p>}
        </Section>
      </div>
    </>
  )
}

export default Publication