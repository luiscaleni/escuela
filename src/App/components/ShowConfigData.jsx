import styles from './css/Form.module.css'
import { useState, useEffect } from 'react'
import LoadData from './LoadData'
import { CONFIG_PATHS, CONFIG_BACKEND } from '../config/config'
import ShowData from './ShowData'
import pencil from '../assets/icons/utilities/pencil.png'
import ContFormInput from './ContFormInput'
import RightTopButton from './RightTopButton'
import { useTranslation } from 'react-i18next'
import TopButtons from './TopButtons'

function ShowConfigData() {
    const [configData, setConfigData]  = useState(null)
    const [cargando, setLoading] = useState(false)
    const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
    const loadConfigData = LoadData(setLoading, setConfigData, 'GET', ROUTE)
    const [t, i18n] = useTranslation()
  
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    useEffect(() => {
        loadConfigData()
    }, [])
    
    return ( 
        <>
            <div className={styles.contForm}>
                <form className={styles.form} id='formUpdate'>
                    <TopButtons>
                        <div className={styles.alertContainer} id="alertContainer"></div>
                        <RightTopButton locationElm={CONFIG_PATHS.CONFIG_EDIT_PATH} typeElm='expand' text={t('buttons.edit')} imgElm={pencil}/>
                    </TopButtons>
                    <div className={styles.contElmsForm}>
                        <h1>{t('showCongiData.title')}</h1>
                        <ContFormInput nameElm={t('showCongiData.fullNameDpto')+" :"}>
                            <ShowData>{configData?.dptoNameConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('showCongiData.acronymNameDpto')+" :"}>
                            <ShowData>{configData?.acrDptoNameConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('showCongiData.nameChurch')+" :"}>
                            <ShowData>{configData?.nameChurchConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('showCongiData.acronymChurch')+" :"}>
                            <ShowData>{configData?.acrNameChurchConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('showCongiData.copyright')+" :"}>
                            <ShowData>{configData?.yearConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm="Email:">
                            <ShowData>{configData?.emailConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('showCongiData.supervisorName')+" :"}>
                            <ShowData>{configData?.supvNameConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={t('showCongiData.introText')+" :"}>
                            <ShowData>{configData?.contentConfig}</ShowData>
                        </ContFormInput>
                    </div>
                </form>
            </div>
        </>
     )
}

export default ShowConfigData