import styles from './css/ContainerMax.module.css'

function ContainerMax({imgSrc, altText, titleText, text}) {
    return ( 
        <div className={styles.containerMax}>
            <div className={styles.contElemnt}>
                <div className={styles.imgContainer}>
                    <img src={imgSrc} alt={altText}/>
                </div>
                <div className={styles.textContainer}>
                    <h2>{titleText}</h2>
                    <p>{text}</p>
                </div>
            </div>
        </div>
     );
}

export default ContainerMax;