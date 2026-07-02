import Section from '../../components/Section'
import FormConfigEdit from '../../components/FormConfigEdit'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'

function ConfigurationEdit() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    if(user.rolId !== 1){
        navigate(CONFIG_PATHS.HOME_PATH)
    }

    return ( 
        <>
            <Section>
                {(user && (user.rolId === 1)) ? (
                    <FormConfigEdit />
                ): null}
            </Section>
        </>
     )
}

export default ConfigurationEdit