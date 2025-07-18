import styles from './css/Configuration.module.css'
import Template from '../../template/Template'
import Section from '../../components/Section'
import Container from '../../components/Container'

function Configuration() {
    
    return ( 
        <>
        <Template separator={true}>
            <Section>
                <Container>
                    <h2>Configuración</h2>
                </Container>
            </Section>
        </Template>
        </>
     );
}

export default Configuration