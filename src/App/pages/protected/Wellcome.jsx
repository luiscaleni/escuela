import styles from './css/Wellcome.module.css'
import Template from '../../template/Template'
import Section from '../../components/Section'
import Container from '../../components/Container'
import { Link } from 'react-router-dom'

function Wellcome() {
    return ( 
        <>
        <Template separator={true}>
            <Section>
                <Container>
                    <div className={styles.wellcome}>
                        <h1>Bienvenido a la Plataforma de DPISUD</h1>
                        <div className={styles.contLinks}>
                            <Link to="/perfil" className={styles.buttonLink}>Perfil</Link>
                            <Link to="/perfil/editar" className={styles.buttonLink}>Editar mis datos</Link>
                            <Link to="/configuracion" className={styles.buttonLink}>Configuración</Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </Template>
        </>
     )
}

export default Wellcome