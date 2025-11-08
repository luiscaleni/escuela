import { useNavigate, useLocation } from "react-router-dom"
import Section from "../../components/Section"
import Template from "../../template/Template"
import styles from './css/Success.module.css'
import success from "../../assets/icons/utilities/success.png"
import CenterContainer from "../../components/CenterContainer"
import { CONFIG_PATHS } from "../../config/config"
import { useEffect } from "react"

function Success({ valueSuccess = true }) {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state

    useEffect(()=>{
        if (state) {
            setTimeout(() => {
                navigate(CONFIG_PATHS.NEW_POST_PATH)
            }, 3000)
        }
    },[])

    return (
        <Template separator={true}>
            <Section>
                {valueSuccess ? (
                    <>
                        <h2 className={styles.titleSuccess}>{state.message}</h2>
                        <CenterContainer>
                            <img src={success}/>
                        </CenterContainer>
                        <p className={styles.textMessage}>Redirigiendo en 3 segundos ...</p>
                    </>
                ) : (
                    navigate(CONFIG_PATHS.HOME_PATH)
                )}
            </Section>
        </Template>
    )
}

export default Success