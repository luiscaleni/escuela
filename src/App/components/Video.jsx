import styles from './css/Video.module.css'

function Video({bg}) {

    return ( 
        <>
            <video className={styles.headerVideo} autoPlay muted loop>
                <source src={bg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
     )
}

export default Video