import React from 'react';
import styles from './css/SimulatorAndSuccess.module.css';

function SimulatorAndSuccess() {
  return (
    <>
      {/* SECCIÓN 1: DESAFÍO ARBITRAL / SIMULADOR */}
      <section className={styles.simulatorSection}>
        <div className={styles.simulatorCard}>
          {/* Header del Desafío */}
          <div className={styles.simulatorHeader}>
            <div className={styles.badgeExprss}>
              <i className="fa-solid fa-bolt"></i> DESAFÍO ARBITRAL EXPRÉS
            </div>
            <div className={styles.ruleTag}>
              REGLA 11 &amp; 12 <span className={styles.yearTag}>IFAB 2026</span>
            </div>
          </div>

          <h2 className={styles.simulatorTitle}>Prueba tu Criterio Reglamentario</h2>
          <p className={styles.simulatorSubtitle}>¿Qué decisión tomarías en la siguiente jugada real?</p>

          {/* Caja del Caso de Estudio */}
          <div className={styles.caseBox}>
            <p className={styles.caseText}>
              <strong className={styles.caseHighlight}>Caso de Juego:</strong> Un atacante en posición de fuera de juego recibe el balón directamente tras un despeje <span className={styles.underlineText}>voluntario / deliberado</span> de un defensor que intentaba jugar el balón. ¿Cuál es la decisión correcta del árbitro?
            </p>

            {/* Opciones */}
            <div className={styles.optionsList}>
              <label className={styles.optionItem}>
                <span className={styles.optionText}>A) Sancionar fuera de juego inmediatamente.</span>
                <input type="radio" name="playCase" className={styles.radioInput} />
                <span className={styles.customRadio}></span>
              </label>

              <label className={styles.optionItem}>
                <span className={styles.optionText}>B) Dejar seguir el juego. Al ser jugada deliberada del defensor, habilita al atacante.</span>
                <input type="radio" name="playCase" className={styles.radioInput} />
                <span className={styles.customRadio}></span>
              </label>

              <label className={styles.optionItem}>
                <span className={styles.optionText}>C) Repetición de la jugada tras revisión de VAR.</span>
                <input type="radio" name="playCase" className={styles.radioInput} />
                <span className={styles.customRadio}></span>
              </label>
            </div>
          </div>

          {/* Footer del Desafío */}
          <div className={styles.simulatorFooter}>
            <span className={styles.footerPromptText}>¿Quieres resolver más de 500 jugadas complejas?</span>
            <a href="#campus" className={styles.footerLink}>
              Iniciar Simulador Completo en el Campus <i className="fa-solid fa-chevron-right ml-1"></i>
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: CASOS DE ÉXITO (EGRESADOS) */}
      <section className={styles.successSection}>
        <div className={styles.successHeader}>
          <span className={styles.successTag}>CASOS DE ÉXITO</span>
          <h2 className={styles.successTitle}>Nuestros Egresados en Primera División</h2>
        </div>

        <div className={styles.successGrid}>
          {/* Tarjeta 1 */}
          <div className={styles.successCard}>
            <div className={styles.graduateHeader}>
              <div className={styles.avatar}>MA</div>
              <div>
                <h4 className={styles.graduateName}>Mateo Álvarez</h4>
                <p className={styles.graduateRole}>Árbitro Categoría A1</p>
              </div>
            </div>
            <p className={styles.graduateQuote}>
              "El campus virtual con análisis cuadro a cuadro de VAR fue la clave para aprobar mis exámenes en la Federación Nacional."
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className={styles.successCard}>
            <div className={styles.graduateHeader}>
              <div className={styles.avatar}>CR</div>
              <div>
                <h4 className={styles.graduateName}>Camila Rodríguez</h4>
                <p className={styles.graduateRole}>Árbitra Asistente FIFA</p>
              </div>
            </div>
            <p className={styles.graduateQuote}>
              "La formación física y el entrenamiento en fuera de juego mediante el simulador te preparan para la velocidad real de la cancha."
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className={styles.successCard}>
            <div className={styles.graduateHeader}>
              <div className={styles.avatar}>SG</div>
              <div>
                <h4 className={styles.graduateName}>Santiago Gómez</h4>
                <p className={styles.graduateRole}>Instructor de Futsal</p>
              </div>
            </div>
            <p className={styles.graduateQuote}>
              "Excelente plataforma. Poder repasar las reglas de juego actualizadas en PDF interactivo y realizar trivias diarias me dio un salto de calidad."
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SimulatorAndSuccess;