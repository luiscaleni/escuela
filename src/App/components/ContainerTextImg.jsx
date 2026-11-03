import styles from './css/ContainerTextImg.module.css';

function ContainerTextImg({imgSrc, altText, titleText, text, rightText=false}) {
    return ( 
        <div className={styles.containerTextImg}>
            <div className={styles.contElemnt}>
                {!rightText && (
                    <>
                    <div className={styles.textContainer}>
                        <h2>{titleText}</h2>
                        <p>{text}</p>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={imgSrc} alt={altText}/>
                    </div>
                    </>
                )}
                {rightText && (
                    <>
                    <div className={styles.imgContainer}>
                        <img src={imgSrc} alt={altText}/>
                    </div>
                    <div className={styles.textContainer}>
                        <h2>{titleText}</h2>
                        <p>{text}</p>
                    </div>
                    </>
                )}
            </div>
        </div>
     );
}

export default ContainerTextImg;