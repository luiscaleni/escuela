import Section from '../components/Section'
import styles from './css/Help.module.css'

function FAQ() {

  return (
    <>
      <Section>
        <div className={styles.cont}>
          <h2>Preguntas Frecuentes (FAQ)</h2>
          <br />
          <div className={styles.contAnws}>
            <h3>¿ARBITRA® forma solamente árbitros de fútbol?</h3>
            <p>No. ARBITRA® es un Centro de Formación Profesional con enfoque multideportivo. Su proyecto académico contempla árbitros, jueces y oficiales de diferentes disciplinas. La disponibilidad de cursos depende de la programación vigente.</p>
          </div>
          <div className={styles.contAnws}>
            <h3>¿Necesito experiencia previa?</h3>
            <p>Depende de la especialización. Algunos programas pueden ser introductorios y otros requerir conocimientos o experiencia.</p>
          </div>
          <div className={styles.contAnws}>
            <h3>¿Puedo cursar online?</h3>
            <p>Sí, existen modalidades con formación virtual. Las prácticas presenciales y sus condiciones varían según la modalidad.</p>
          </div>

          <div className={styles.contAnws}>
            <h3>¿Todas las modalidades incluyen tutorías?</h3>
            <p>Las modalidades regulares incluyen tutorías personalizadas semanales o quincenales. Rookie promocional online no las incluye.</p>
          </div>
          <div className={styles.contAnws}>
            <h3>¿Los cursos habilitan automáticamente para arbitrar competencias oficiales?</h3>
            <p>No necesariamente. Las designaciones, licencias y habilitaciones dependen de los requisitos de las federaciones, asociaciones u organismos competentes. La información sobre reconocimientos específicos debe verificarse para cada programa.</p>
          </div>
          <div className={styles.contAnws}>
            <h3>¿Puedo acceder a reglamentos de distintos deportes?</h3>
            <p>La biblioteca reglamentaria de ARBITRA® está concebida para reunir enlaces a fuentes oficiales y recursos de consulta, organizados por disciplina.</p>
          </div>
        </div>
      </Section>
    </>
  )
}

export default FAQ