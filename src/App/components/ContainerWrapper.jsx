import styles from './css/ContainerWrapper.module.css';

function ContainerWrapper({ children, images = [] }) {
    return (
        <section className={styles.fullWidthSection}>
            {/* Contenedor de las imágenes de fondo en bucle full screen */}
            <div className={styles.bgSliderContainer}>
                <div className={styles.opacityOverlay}></div>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt=""
                        className={styles.bgSlide}
                    />
                ))}
            </div>

            {/* Contenido interior (tus tarjetas, títulos, etc.) */}
            <div className={styles.innerContainer}>
                {children}
            </div>
        </section>
    );
}

export default ContainerWrapper;