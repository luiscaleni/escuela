import styles from './css/Profile.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import { UserContext } from '../../components/UserProvider'
import ImgProfile from '../../components/ImgProfile'
import Loader from '../../components/Loader'
import pencil from '/icons/utilities/pencil.png'
import { CONFIG_PATHS } from '../../config/config'
import RightTopButton from '../../components/RightTopButton'

function Profile() {   
    const { user, loadUser } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    let nameRol

    useEffect(() => {
        if (location.state?.updated) {
            loadUser()
        }
    }, [location.state])

    if (!user){
        const fn = ()=>{
            <Loader />
            setTimeout(() => {
                navigate(CONFIG_PATHS.LOGIN_PATH, { state: { updated: true } })
            }, 2000)
        }
        return fn()
    }

    if (user.rolId === 1) {
        nameRol="Administradora"
    }else if (user.rolId === 2) {
        nameRol="Plantador"
    }

    return ( 
        <>
            <Section>
                <Container>
                    <div className={styles.bg}>
                        <div className={styles.bannerProfile}>
                            <div className={styles.contTitleProfile}>
                                <div className={styles.contImgProfile}>
                                    <ImgProfile />
                                </div>
                                <div className={styles.contTextProfile}>
                                    <h2>{user?.names} {user.lastNames}</h2>
                                    <p className={styles.nameRol}>{nameRol}</p>
                                </div>
                            </div>
                            
                            <RightTopButton locationElm={CONFIG_PATHS.PROFILE_EDIT_PATH} typeElm='expand' text="Editar" imgElm={pencil}/>
                        </div>                        
                        <div className={styles.dataProfile}>
                            <div className={styles.contElm}>
                                <p className={styles.titleElm}>Email :</p>
                                <p className={styles.valueElm}>{user?.email}</p>
                            </div>
                            <div className={styles.contElm}>
                                <p className={styles.titleElm}>Sobre mi :</p>
                                <p className={styles.valueElm}>{user?.aboutMe}</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
     )
}

export default Profile