import styles from './css/Video.module.css'
import bg from '../assets/videos/bg.mp4'

function Video() {

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