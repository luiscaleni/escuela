import Template from '../../template/Template'
import Section from '../../components/Section'
import FormConfigEdit from '../../components/FormConfigEdit'

function ConfigurationEdit() {

    return ( 
        <>
            <Template separator={true}>
                <Section>
                    <FormConfigEdit />
                </Section>
            </Template>
        </>
     )
}

export default ConfigurationEdit