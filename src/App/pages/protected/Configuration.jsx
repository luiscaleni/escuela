import Section from '../../components/Section'
import ShowConfigData from '../../components/ShowConfigData'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'

function Configuration() {    
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user.rolId !== 1){
            navigate(CONFIG_PATHS.HOME_PATH)
        }
    },[])

    return ( 
        <>
            <Section>
                <ShowConfigData />
            </Section>
        </>
     )
}

export default Configuration