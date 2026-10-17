import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from 'react'
import { CONFIG_PATHS } from "../../../config/config"
import { UserContext } from '../../../components/UserProvider'
import Section from "../../../components/Section"
import Wellcome from "./../Wellcome"

function Campus() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(CONFIG_PATHS.HOME_PATH, { replace: true })
        }
    }, [user, navigate])

    return (
        <>
            <Section>
                <Wellcome />
            </Section>
        </>
    )
}

export default Campus