import styles from './css/Video.module.css'

function Video({nameVideo}) {

    return ( 
        <>
            <div className={styles.opacityVideo}></div>
            <video className={styles.headerVideo} autoPlay muted loop>
                <source src={`/assets/videos/${nameVideo}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
     )
}

export default Video