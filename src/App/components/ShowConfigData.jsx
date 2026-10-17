import styles from './css/Form.module.css'
import { useState, useEffect } from 'react'
import LoadData from './LoadData'
import { CONFIG_PATHS, CONFIG_BACKEND } from '../config/config'
import ShowData from './ShowData'
import pencil from '/icons/utilities/pencil.png'
import ContFormInput from './ContFormInput'
import RightTopButton from './RightTopButton'
import TopButtons from './TopButtons'

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
                    <TopButtons>
                        <div className={styles.alertContainer} id="alertContainer"></div>
                        <RightTopButton locationElm={CONFIG_PATHS.CONFIG_EDIT_PATH} typeElm='expand' text="Editar" imgElm={pencil}/>
                    </TopButtons>
                    <div className={styles.contElmsForm}>
                        <h1>Configuración</h1>
                        <ContFormInput nameElm={"Nombre :"}>
                            <ShowData>{configData?.nameWebConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={"Copyright :"}>
                            <ShowData>{configData?.yearConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm="Email:">
                            <ShowData>{configData?.emailConfig}</ShowData>
                        </ContFormInput>
                        
                        <ContFormInput nameElm={"Contenido :"}>
                            <ShowData>{configData?.contentConfig}</ShowData>
                        </ContFormInput>
                    </div>
                </form>
            </div>
        </>
     )
}

export default ShowConfigData