import styles from './css/ImgProfile.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserProvider'
import { CONFIG_BACKEND } from '../config/config'
import Loader from './Loader'

function ImgProfile() {
    const { user, loadUser, loading, initialized } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [imgSrc, setImgSrc] = useState(null)

    useEffect(() => {
        if (location.state?.updated) loadUser()
    }, [location.state, loadUser])

    const [showLoader, setShowLoader] = useState(true)

    useEffect(() => {
        if (!loading && initialized) {
            const t = setTimeout(() => setShowLoader(false), 400)
            return () => clearTimeout(t)
        }
    }, [loading, initialized])

    useEffect(() => {
        if (!loading && initialized && !user) {
            const timeoutId = setTimeout(() => {
                navigate('/login', { state: { updated: true } })
            }, 1000)
            return () => clearTimeout(timeoutId)
        }
    }, [user, loading, initialized, navigate])

    // 3) Calcula la URL de la imagen solo cuando cambie user.imgProfile o user.id
    useEffect(() => {
        if (user && user.id) {
            const src = user?.imgProfile
                ? `${CONFIG_BACKEND.API_DIR}/src/assets/users/${user.id}/profile/${user.imgProfile}?v=${new Date(user.imgUpdatedAt).getTime()}`
                :`${CONFIG_BACKEND.API_DIR}/src/assets/user_default.png`
                setImgSrc(src);
        }
    }, [user])

    // 4) Rendering
    if (showLoader) return <Loader visible={loading} />

    return ( 
        <div className={styles.contImgProfile}>
            <img src={imgSrc} alt="imgProfile" className={styles.imgProfile} />
        </div>
     )
}

export default ImgProfile