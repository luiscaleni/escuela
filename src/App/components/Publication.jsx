import Section from '../components/Section'
import styles from './css/Publication.module.css'

function Publication({titlePub, imgPub="", children}) {
  let imgSrc
  if(imgPub !== ""){
    imgSrc = <img src={imgPub}/>
  }

  return (
    <>
      <div className={styles.publication}>
        <Section typeElm="banner" titleElm={titlePub}>
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