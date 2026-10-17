import styles from './css/Wellcome.module.css'
import Section from '../../components/Section'
import Container from '../../components/Container'
import { useContext} from 'react'
import { Link } from 'react-router-dom'
import { CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'
import classBtn from '../../components/css/Button.module.css'

function Wellcome() {
    const { user } = useContext(UserContext)
    const wellcome = user.sex === "M" ? "Bienvenido" : "Bienvenida"

    return ( 
        <>
            <Section>
                <Container>
                    <div className={styles.wellcome}>
                        <h1>{wellcome} {user?.names}</h1>
                            <p>Links de interés:</p>
                        <div className={styles.contLinks}>
                            <Link to={CONFIG_PATHS.PROFILE_PATH} className={classBtn.button}>Perfil</Link>
                            {user && user.rolId === 1 && (
                                <Link to={CONFIG_PATHS.CAMPUS_ASSING_PROFESSORS_PATH} className={classBtn.button}>Asignar cursos a profesores</Link>
                            )}
                        </div>
                    </div>
                </Container>
            </Section>
        </>
     )
}

export default Wellcome