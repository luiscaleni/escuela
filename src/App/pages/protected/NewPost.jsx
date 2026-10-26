import Section from '../../components/Section'
import FormPost from '../../components/FormPost'
import { UserContext } from '../../components/UserProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONFIG_PATHS } from '../../config/config'

function NewPost() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (user.rolId !== 1) {
            navigate(CONFIG_PATHS.CAMPUS_PATH)
        }
    },[])

    return ( 
        <>
            <Section>
                {(user && (user.rolId === 1)) ? (
                    <FormPost />
                ) : null}
            </Section>
        </>
     )
}

export default NewPost