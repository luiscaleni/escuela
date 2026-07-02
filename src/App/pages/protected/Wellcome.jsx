import styles from './css/Wellcome.module.css'
import Section from '../../components/Section'
import Container from '../../components/Container'
import { useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'
import { useTranslation } from 'react-i18next'

function Wellcome() {
    const { user, loadUser } = useContext(UserContext)
    const wellcome = user.sex === "M" ? "Bienvenido" : "Bienvenida"
    const langEs = (localStorage.getItem("lang","es") === "es")
    const [t, i18n] = useTranslation()    

    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    return ( 
        <>
            <Section>
                <Container>
                    <div className={styles.wellcome}>
                        <h1>{langEs ? wellcome : (t('buttons.wellcome'))} a DPISUD <br/>{user.names}</h1>
                            <p>{t('buttons.someLinks')}:</p>
                        <div className={styles.contLinks}>
                            <Link to={CONFIG_PATHS.PROFILE_PATH} className={styles.buttonLink}>{t('buttons.profile')}</Link>
                            <Link to={CONFIG_PATHS.PROFILE_EDIT_PATH} className={styles.buttonLink}>{t('buttons.editMyData')}</Link>
                            <Link to={CONFIG_PATHS.CONFIG_PATH} className={styles.buttonLink}>{t('buttons.configuration')}</Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
     )
}

export default Wellcome