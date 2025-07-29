import Template from '../template/Template'
import Block from '../components/Block'
import Publication from '../components/Publication'

function AboutUs() {
  return (
    <>
      <Template>
        <Publication titlePub="Acerca de nosotros" imgPub="aboutUs.jpg">
          <Block>
            <h2>Iglesia de Dios de la Profecía</h2>
            <p>
              La Iglesia de Dios de la Profecía es un movimiento cristiano vibrante, arraigado en las Escrituras, firme en la fe y resuelto en su pasión por la gente. Es un cuerpo mundial de creyentes, unidos en la adoración, que trabajan juntos para compartir el amor de Dios y un mensaje de esperanza a los que sufren.
              <br/><br/>
              El impacto de la Iglesia de Dios de la Profecía es trascendental. Se estima que cada 24 horas, alrededor del mundo, 300 personas reciben la salvación, casi 100 se bautizan en agua y más de 14,000 lugares de predicación proclaman activamente el evangelio. Al menos una nueva iglesia abre sus puertas cada día para impactar a una comunidad local gracias a los esfuerzos de este movimiento.
              <br/><br/>
              La Iglesia es étnica y culturalmente diversa, y el 90 % de sus miembros residen fuera de Norteamérica. Actualmente, la Iglesia ministra en 133 países, con más de 1400 miembros cada mes. Se estima que 14 000 hombres y mujeres están autorizados para predicar el evangelio en labores pastorales y evangelísticas.
            </p>
          </Block>

          <Block>
            <img src="https://cogop.org/wp-content/uploads/2025/03/Who-We-Are.png"/>
          </Block>
        </Publication>
      </Template>
    </>
  )
}

export default AboutUs