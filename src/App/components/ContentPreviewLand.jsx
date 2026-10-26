import styles from './css/ContentPreviewLand.module.css'
import videoHome from '/videos/arbitros.mp4'

function ContentPreviewLand() {
    return ( 
        <>
            <div className={styles.contentPreviewLand}>
                <div className={styles.contentElements}>
                    <div className={styles.cards}>
                        <div className={styles.cardYellow}></div>
                        <div className={styles.cardRed}></div>
                    </div>
                    <div className={styles.contentTitleElements}>
                        <div className={styles.icon}></div>
                        <div className={styles.contentTitle}>
                            <h3>Tecnologías V.A.R. 360º</h3>
                            <p>Capacitación de Vanguardia</p>
                        </div>
                    </div>
                    <div className={styles.contentVideo}>
                        <video muted loop autoPlay playsInline>
                            <source src={videoHome} type="video/mp4"/>
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    </div>
                    <p className={styles.descriptVideo}>
                        Accede a nuestro simulador interactivo con más de 500 clips de jugadas reales para evaluar fueras de juego, disputas tácticas y mano punible.
                    </p>
                    <div className={styles.contentFooter}>
                        <span>
                            <i>✔</i>
                            Actualizado IFAB 2026</span>
                        <p></p>
                    </div>
                </div>
            </div>
        </>
     )
}

export default ContentPreviewLand