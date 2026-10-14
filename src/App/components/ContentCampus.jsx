import { Outlet, useLocation } from "react-router-dom"
import styles from './css/ContentCampus.module.css'

function ContentCampus() {
    const location = useLocation();

    return (
        <div className={styles.contentCampusWrapper}>
            {/* Aquí puedes tener elementos fijos si lo deseas, 
                y el Outlet renderizará <CampusMyCourses> o <CampusMyCourseDetail> 
                según la URL en la que estés */}
            <Outlet />
        </div>
    )
}

export default ContentCampus