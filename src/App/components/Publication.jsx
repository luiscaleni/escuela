import Section from '../components/Section'
import styles from './css/Publication.module.css'
import { CONFIG_BACKEND } from '../config/config'

function Publication({titlePub, imgPub="", location="", children}) {
  let imgSrc
  let nameImg = imgPub

  if(imgPub){
    imgSrc = <img src={`${CONFIG_BACKEND.API_DIR}/src/assets/${location}/${nameImg}`} alt="Imagen de la publicación" />
  }

  if(imgPub && !location){
    imgSrc = <img src={`${CONFIG_BACKEND.API_DIR}/src/assets/public/images/${nameImg}`} alt="Imagen de la publicación" />
  }

  return (
    <>
      <div className={styles.publication}>
        <Section typeElm="banner" titleElm={titlePub} >
          {imgSrc}
        </Section>
        <Section typeElm='xtreme'>
            {children ? children : <p>Estamos trabajando en ello. Disculpe las molestias.</p>}
        </Section>
      </div>
    </>
  )
}

export default Publication