import styles from './css/Wellcome.module.css'
import Template from '../../template/Template'
import Section from '../../components/Section'
import Container from '../../components/Container'
import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'

function Wellcome() {
    const { user, loadUser } = useContext(UserContext)
    const wellcome = user.sex === "M" ? "Bienvenido" : "Bienvenida"

    return ( 
        <>
        <Template separator={true}>
            <Section>
                <Container>
                    <div className={styles.wellcome}>
                        <h1>{wellcome} a DPISUD <br/>{user.names}</h1>
                            <p>Algunos enlaces de interés:</p>
                        <div className={styles.contLinks}>
                            <Link to={CONFIG_PATHS.PROFILE_PATH} className={styles.buttonLink}>Perfil</Link>
                            <Link to={CONFIG_PATHS.PROFILE_EDIT_PATH} className={styles.buttonLink}>Editar mis datos</Link>
                            <Link to={CONFIG_PATHS.CONFIG_PATH} className={styles.buttonLink}>Configuración</Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </Template>
        </>
     )
}

export default Wellcome