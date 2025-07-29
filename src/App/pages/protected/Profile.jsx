import styles from './css/Profile.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Template from '../../template/Template'
import Section from '../../components/Section'
import Container from '../../components/Container'
import { UserContext } from '../../components/UserProvider'
import ImgProfile from '../../components/ImgProfile'
import Loader from '../../components/Loader'
import pencil from '/assets/images/utilities/pencil.png'
import { CONFIG_PATHS } from '../../config/config'

function Profile() {   
    const { user, loadUser } = useContext(UserContext);
    const location = useLocation()
    const navigate = useNavigate()

    // Si venís de editar, recargás datos
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

    return ( 
        <>
            <Template separator={true}>
                <Section>
                    <Container>
                        <div className={styles.dataProfile}>
                            <div className={styles.contElm}>
                                <p className={styles.titleElm}>Email:</p>
                                <p>{user.email}</p>
                            </div>
                            <div className={styles.contElm}>
                                <p className={styles.titleElm}>País:</p>
                                <p>{user.country}</p>
                            </div>
                            <div className={styles.contElm}>
                                <p className={styles.titleElm}>Provincia:</p>
                                <p>{user.province}</p>
                            </div>
                            <div className={styles.contElm}>
                                <p className={styles.titleElm}>Ministerio:</p>
                                <p>{user.ministry}</p>
                            </div>
                            <div className={styles.contElm}>
                                <p className={styles.titleElm}>Acerca de:</p>
                                <p>{user.aboutMe}</p>
                            </div>
                        </div>

                        <div className={styles.bannerProfile}>
                            <div className={styles.contTitleProfile}>
                                <div className={styles.contImgProfile}>
                                    <ImgProfile />
                                </div>
                                <div className={styles.contTextProfile}>
                                    <h2>{user.names} {user.lastNames}</h2>
                                    <p>Administrador</p>
                                </div>
                            </div>
                            <Link to={CONFIG_PATHS.PROFILE_EDIT_PATH} className={styles.contImgEdit} title='Editar Perfil'>
                                <div className={styles.contImgEdit}>
                                    <img src={pencil} alt="edit" className={styles.imgEdit}/>
                                    <p>Editar</p>
                                </div>
                            </Link>
                        </div>
                    </Container>
                </Section>
            </Template>
        </>
     )
}

export default Profile