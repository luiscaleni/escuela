import styles from './css/Configuration.module.css'
import Template from '../../template/Template'
import Section from '../../components/Section'
import FormConfigEdit from '../../components/FormConfigEdit'

function Configuration() {

    return ( 
        <>
        <Template separator={true}>
            <Section>
                <FormConfigEdit />
            </Section>
        </Template>
        </>
     );
}

export default Configuration