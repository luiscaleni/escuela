import Template from '../template/Template'
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
import { UserContext } from '../components/UserProvider'

function Resources() {
    const [resources, setResources] = useState([])
    const [showContainer, setShowContainer] = useState(false)
    const { user, loadUser } = useContext(UserContext)

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/showResources`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data=>{
                if (data.success) {
                    setResources(data.result)
                    load()
                }else{
                    console.error('Error: ', data.error)
                }
                
            })
            .catch (error => console.error('Error en API: ', error))
    },[])

    function handleAddResource(newResource) {
        setResources(prev => [newResource, ...prev])
        setShowContainer(false)
    }
    const load = async ()=>{
        await loadUser()
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
                    titleElm="Sube un archivo" 
                    textElm='* Los formatos soportados son: jpg, jpeg, png, webp, pdf, docx, xlsx, pptx, mp4, mp3'
                    onClick={fnCloseContainer}
                >
                <FormResources 
                    onSuccess={handleAddResource}
                />
            </Modal>
            )}
            <Template>
                <Publication 
                    titlePub="Recursos" 
                    typeElm='img' 
                    nameAsset="banner_resources.jpg"
                >
                    {user && user.rolId === 1 && (
                        <div className={styles.contPushButton}>
                            <ButtonTop 
                                id="pushFile"
                                textElm='Sube un archivo' 
                                typeElm='expand'
                                onClick={() => {fnShowContainer()}}
                            />
                        </div>
                    )}
                    {resources.length>0 ? (
                        resources.map(resource => (
                            <Elementor key={resource.id_resource}>
                                <p className={styles.titleResource}>{resource.title_resource}</p>
                                <img src={`src/App/assets/icons/files/${resource.ext_resource}.png`} alt={resource.ext_resource} className={styles.iconResource} />
                                <p className={styles.descriptionResource}>{resource.description_resource}</p>
                                <div className={styles.groupData}>
                                    <p className={styles.dataSize}>
                                        Peso: {resource.size_resource} MB
                                    </p>
                                    <p className={styles.dataDate}>
                                        Fecha: {resource.date_resource}
                                    </p>
                                </div>
                                <Link 
                                    className={stylesButton.button} 
                                    to={CONFIG_BACKEND.API_DIR+"/src/assets/resources/"+resource.file_resource}
                                    id={resource.id_resource}
                                    download={`${resource.id_resource}.${resource.ext_resource}`}
                                    target='_blank'
                                    title="Descargar"
                                >
                                    Descargar
                                </Link>
                            </Elementor> 
                        ))
                    ):(
                        <p>No hay recursos subidos por el momento.</p>
                    )}
                </Publication>
            </Template>
        </>
     )

}

export default Resources