import styles from './css/ImgProfile.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserProvider'
import { CONFIG_BACKEND } from '../config/config'
import Loader from './Loader'

function ImgProfile() {
    const { user, loadUser } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [imgSrc, setImgSrc] = useState(null)
    const [triedToLoadUser, setTriedToLoadUser] = useState(false)

    useEffect(() => {
        if (location.state?.updated) {
        loadUser()
        }
    }, [location.state, loadUser])


    useEffect(() => {
        if (user === null && triedToLoadUser) {
            const timeoutId = setTimeout(() => {
                navigate('/login', { state: { updated: true } })
            }, 2000)
            return () => clearTimeout(timeoutId)
        }else if (user !== null){
            setTriedToLoadUser(true)
        }
    }, [user, navigate, triedToLoadUser])

    // 3) Calcula la URL de la imagen solo cuando cambie user.imgProfile o user.id
    let defaultImg = `${CONFIG_BACKEND.API_DIR}/src/assets/user_default.png`;
    useEffect(() => {
        if (user && user.id !== undefined) {
            const img = user?.imgProfile
            ? setImgSrc(`${CONFIG_BACKEND.API_DIR}/src/assets/users/${user.id}/profile/${user.imgProfile}?v=${new Date(user.imgUpdatedAt).getTime()}`)
            : setImgSrc(defaultImg);
        }
    }, [user?.imgProfile, user?.id, user?.imgUpdatedAt]);

    // 4) Rendering
    if (user === null || imgSrc === null) {
        return <Loader />
    }

    return ( 
        <>
            <div className={styles.contImgProfile}>
                <img src={imgSrc} alt="imgProfile" className={styles.imgProfile} />
            </div>
        </>
     )
}

export default ImgProfile