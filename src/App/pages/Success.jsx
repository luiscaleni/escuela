import { useNavigate, useLocation } from "react-router-dom"
import Section from "../components/Section"
import styles from './css/Success.module.css'
import success from "/icons/utilities/success.png"
import CenterContainer from "../components/CenterContainer"
import { CONFIG_PATHS } from "../config/config"
import { useEffect } from "react"

function Success({ valueSuccess = true }) {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state

    useEffect(()=>{
        if (state) {
            setTimeout(() => {
                navigate(state.path)
            }, 5000)
        }
    },[])

    return (
            <Section>
                {valueSuccess ? (
                    <>
                        <h2 className={styles.titleSuccess}>{state.message}</h2>
                        <CenterContainer>
                            <img src={success}/>
                        </CenterContainer>
                        <p className={styles.textMessage}>Redirigiendo en 5 segundos</p>
                    </>
                ) : (
                    navigate(CONFIG_PATHS.HOME_PATH)
                )}
            </Section>
    )
}

export default Success