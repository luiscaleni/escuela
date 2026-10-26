import Section from '../../components/Section'
import styles from './css/Help.module.css'

function Help() {

  return (
    <>
      <Section>
        <div className={styles.cont}>
          <h2>Preguntas Frecuentes (FAQ)</h2>
          <br />
          <div className={styles.contAnws}>
            <h3>¿Cómo me inscribo a los cursos?</h3>
            <p>Debes tener el codigo de matricula para poder inscribirte.</p>
          </div>
          <div className={styles.contAnws}>
            <h3>¿Dónde consigo el código de matrícula?</h3>
            <p>El código de matricula solo y unicamente es proporcinado por la administración.</p>
          </div>
          <div className={styles.contAnws}>
            <h3>¿Cómo recupero mi contraseña o edito mi perfil?</h3>
            <p>Para recuperar tu contraseña debes ir a la sección de login y en la parte inferior del formulario exite un link que te enviará a  la sección de recuperación de contraseña. Recuerda que el link que te habilita a cambiar tu contraseña solo es vigente por 30 minutos desde que se envió la solicitud.</p>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Help