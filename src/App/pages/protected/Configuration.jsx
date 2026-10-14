import Section from '../../components/Section'
import ShowConfigData from '../../components/ShowConfigData'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'

function Configuration() {    
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    if(user.rolId !== 1){
        navigate(CONFIG_PATHS.HOME_PATH)
    }

    return ( 
        <>
            <Section>
                {user?.rolId === 1 ? (
                    <ShowConfigData />
                ) : (
                    <p>Nada por aqui</p>
                )}
            </Section>
        </>
     )
}

export default Configuration