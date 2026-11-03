import styles from './css/ContainerWrapper.module.css';

function ContainerWrapper({ children, images }) {
    return (
        <section className={styles.fullWidthSection}>
            {/* Contenedor de las imágenes de fondo en bucle full screen */}
            <div className={styles.bgSliderContainer}>
                <div className={styles.opacityOverlay}></div>
                <img
                    key={1}
                    src={images}
                    alt="bgSlide"
                    className={styles.bgSlide}
                />
                {/*
                images.map((img, index) => (
                ))
                */}
            </div>

            {/* Contenido interior (tus tarjetas, títulos, etc.) */}
            <div className={styles.innerContainer}>
                {children}
            </div>
        </section>
    )
}

export default ContainerWrapper;