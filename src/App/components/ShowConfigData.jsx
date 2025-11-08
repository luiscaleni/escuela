import styles from './css/Form.module.css'
import { useState, useEffect } from 'react'
import LoadData from './LoadData'
import { CONFIG_PATHS, CONFIG_BACKEND } from '../config/config'
import ShowData from './ShowData'
import pencil from '../assets/icons/utilities/pencil.png'
import ContFormInput from './ContFormInput'
import RightTopButton from './RightTopButton'

function ShowConfigData() {
    const [configData, setConfigData]  = useState(null)
    const [cargando, setLoading] = useState(false)
    const ROUTE = `${CONFIG_BACKEND.API_DIR}/config/showDataConfig`
    const loadConfigData = LoadData(setLoading, setConfigData, 'GET', ROUTE)
    useEffect(() => {
        loadConfigData()
    }, [])
    
    return ( 
        <>
            <div className={styles.contForm}>
                <form className={styles.form} id='formUpdate'>
                    <div className={styles.alertContainer} id="alertContainer"></div>
                    <RightTopButton locationElm={CONFIG_PATHS.CONFIG_EDIT_PATH} typeElm='expand' text="Editar" img={pencil}/>
                    <h1>Configuración</h1>
                    <ContFormInput nameElm="Nombre completo del dpto:">
                        <ShowData>{configData?.dptoNameConfig}</ShowData>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Acrónimo del nombre del dpto:">
                        <ShowData>{configData?.acrDptoNameConfig}</ShowData>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Nombre de la iglesia:">
                        <ShowData>{configData?.nameChurchConfig}</ShowData>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Acrónimo del nombre de la iglesia:">
                        <ShowData>{configData?.acrNameChurchConfig}</ShowData>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Copyright del sitio web:">
                        <ShowData>{configData?.yearConfig}</ShowData>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Email:">
                        <ShowData>{configData?.emailConfig}</ShowData>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Nombre del supervisor:">
                        <ShowData>{configData?.supvNameConfig}</ShowData>
                    </ContFormInput>
                    
                    <ContFormInput nameElm="Texto de presentación:">
                        <ShowData>{configData?.contentConfig}</ShowData>
                    </ContFormInput>
                </form>
            </div>
        </>
     );
}

export default ShowConfigData;