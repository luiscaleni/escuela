
import styles from './css/ImgProfile.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from './UserProvider'
import { CONFIG_BACKEND } from '../config/config'

function ImgProfile() {
    const { user, loadUser } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    let source

    useEffect(() => {
        if (location.state?.updated) {
            loadUser()
        }
    }, [location.state])

    if (!user){
        const fn = ()=>{
            <p>Cargando...</p>
            setTimeout(() => {
                navigate("/login", { state: { updated: true } })
            }, 2000)
        }
        return fn()
    }

    if(user.imgProfile){
        source = `${CONFIG_BACKEND.API_DIR}/src/assets/users/${user.id}/profile/${user.imgProfile}`
    }else{
        source = `${CONFIG_BACKEND.API_DIR}/src/assets/user_default.png`
    }

    return ( 
        <>
            <img src={source} alt="imgProfile" className={styles.imgProfile} />
        </>
     )
}

export default ImgProfile