import styles from './css/Profile.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Template from '../../template/Template'
import Section from '../../components/Section'
import Container from '../../components/Container'
import { UserContext } from '../../components/UserProvider'
import ImgProfile from '../../components/ImgProfile'
import Loader from '../../components/Loader'
import pencil from '../../assets/icons/utilities/pencil.png'
import { CONFIG_PATHS } from '../../config/config'
import RightTopButton from '../../components/RightTopButton'
import { useTranslation } from 'react-i18next'
import TopButtons from '../../components/TopButtons'
import TopButtonNone from '../../components/TopButtonNone'

function Profile() {   
    const { user, loadUser } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    let nameRol
    const [t, i18n] = useTranslation()
      
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

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
        nameRol=t('rol.admin')
    }else if (user.rolId === 2) {
        nameRol=t('rol.planter')
    }

    return ( 
        <>
            <Template separator={true}>
                <Section>
                    <Container>
                        <div className={styles.bg}>
                            <div className={styles.bannerProfile}>
                                <TopButtons>
                                    <TopButtonNone />
                                    <RightTopButton locationElm={CONFIG_PATHS.PROFILE_EDIT_PATH} typeElm='expand' text={t('buttons.edit')} imgElm={pencil}/>
                                </TopButtons>
                                <div className={styles.contTitleProfile}>
                                    <div className={styles.contImgProfile}>
                                        <ImgProfile />
                                    </div>
                                    <div className={styles.contTextProfile}>
                                        <h2>{user.names} {user.lastNames}</h2>
                                        <p className={styles.nameRol}>{nameRol}</p>
                                    </div>
                                </div>
                            </div>                        
                            <div className={styles.dataProfile}>
                                <div className={styles.contElm}>
                                    <p className={styles.titleElm}>Email:</p>
                                    <p className={styles.valueElm}>{user.email}</p>
                                </div>
                                <div className={styles.contElm}>
                                    <p className={styles.titleElm}>{t('profile.country')+" :"}</p>
                                    <p className={styles.valueElm}>{user.country}</p>
                                </div>
                                <div className={styles.contElm}>
                                    <p className={styles.titleElm}>{t('profile.province')+" :"}</p>
                                    <p className={styles.valueElm}>{user.province}</p>
                                </div>
                                <div className={styles.contElm}>
                                    <p className={styles.titleElm}>{t('profile.ministry')+" :"}</p>
                                    <p className={styles.valueElm}>{user.ministry}</p>
                                </div>
                                <div className={styles.contElm}>
                                    <p className={styles.titleElm}>{t('profile.about')+" :"}</p>
                                    <p className={styles.valueElm}>{user.aboutMe}</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>
            </Template>
        </>
     )
}

export default Profile