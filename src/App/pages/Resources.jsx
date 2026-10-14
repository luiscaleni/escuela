import Publication from '../components/Publication'
import Elementor from '../components/Elementor'
import { useState, useEffect, useContext } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import { Link } from 'react-router-dom'
import ButtonTop from '../components/ButtonTop'
import styles from './css/Resources.module.css'
import stylesButton from '../components/css/Button.module.css'
import Modal from '../components/Modal'
import FormResources from '../components/FormResources'
import imgUpload from '/icons/links/upload.png'
import { UserContext } from '../components/UserProvider'

function Resources() {
    const [resources, setResources] = useState([])
    const [showContainer, setShowContainer] = useState(false)
    const { user } = useContext(UserContext)
    
    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/showResources`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data=>{
                if (data.success) {
                    setResources(data.result)
                }                
            })
            .catch (error => import.meta.env.DEV ?? console.error('Error en API: ', error))
    },[])

    function handleAddResource(newResource) {
        setResources(prev => [newResource, ...prev])
        setShowContainer(false)
    }

    
    const fnCloseContainer = () => setShowContainer(false)
    const fnShowContainer = () => {
        setShowContainer(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return ( 
        <>  
            {showContainer && (
                <Modal
                    id="containerFloat"
                    titleElm="Recursos"
                    textElm={`* Formatos soportados : jpg, jpeg, png, webp, pdf, docx, xlsx, pptx, mp4, mp3.`}
                    onClickElm={fnCloseContainer}
                >
                <FormResources 
                    onSuccess={handleAddResource}
                />
            </Modal>
            )}
            <Publication 
                titlePub="Recursos"
                typeElm='img' 
                nameAsset="banner_resources.jpg"
            >
                {user && user.rolId === 1 && (
                    <div className={styles.contPushButton}>
                        <ButtonTop 
                            id="pushFile"
                            textElm="Subir"
                            typeElm='expand'
                            imgElm={imgUpload}
                            onClick={() => {fnShowContainer()}}
                        />
                    </div>
                )}
                {resources.length > 0 ? (
                    resources.map(resource => (
                        <Elementor key={resource.idResource}>
                            <p className={styles.titleResource}>{resource.titleResource}</p>
                            <img src={`src/App/assets/icons/files/${resource.extResource ?? resource.ext_resource}.png`} alt={resource.extResource} className={styles.iconResource} />
                            <p className={styles.descriptionResource}>{resource.descriptionResource}</p>
                            <div className={styles.groupData}>
                                <p className={styles.dataSize}>
                                    Peso: {resource.sizeResource??resource.size_resource} MB
                                </p>
                                <p className={styles.dataDate}>
                                    Fecha: {resource.dateResource??resource.date_resource}
                                </p>
                            </div>
                            <Link 
                                className={stylesButton.button} 
                                to={CONFIG_BACKEND.API_DIR+"/src/assets/resources/"+(resource.fileResource??resource.file_resource)}
                                id={resource.idResource}
                                download={`${resource.idResource}.${resource.extResource}`}
                                target='_blank'
                                title="Descargar"
                            >
                                Descargar
                            </Link>
                        </Elementor> 
                    ))
                ):(
                    <p>Nada por aqui</p>
                )}
            </Publication>
        </>
     )

}

export default Resources