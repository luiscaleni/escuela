import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Template from '../../template/Template'
import Section from '../../components/Section'
import FormProfileEdit from '../../components/FormProfileEdit'
import { UserContext } from '../../components/UserProvider'
import { CONFIG_PATHS } from '../../config/config'

function Register() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()

    if (!user){
        return navigate(CONFIG_PATHS.LOGIN_PATH, { state: { updated: true } })
    }

    return ( 
        <Template separator={true}>
            <Section>
                <FormProfileEdit/>
            </Section>
        </Template>
     )
}

export default Register