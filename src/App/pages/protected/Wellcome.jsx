import styles from './css/Wellcome.module.css'
import Section from '../../components/Section'
import Container from '../../components/Container'
import { useContext} from 'react'
import { UserContext } from '../../components/UserProvider'

function Wellcome() {
    const { user } = useContext(UserContext)
    const wellcome = user.sex === "M" ? "Bienvenido" : "Bienvenida"

    return ( 
        <>
            <Section>
                <Container>
                    <div className={styles.wellcome}>
                        <h1>{wellcome} {user?.names}</h1>
                    </div>
                </Container>
            </Section>
        </>
     )
}

export default Wellcome