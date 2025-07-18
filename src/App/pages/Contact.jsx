import Template from '../template/Template'
import Publication from '../components/Publication'
import FormContact from '../components/FormContact'

function Home() {
  return (
    <>
      <Template>
        <Publication titlePub="Contacto">
          <FormContact />
        </Publication>
      </Template>
    </>
  )
}

export default Home