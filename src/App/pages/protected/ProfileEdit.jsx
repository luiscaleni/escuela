import Template from '../../template/Template'
import Section from '../../components/Section'
import FormProfileEdit from '../../components/FormProfileEdit'

function Register() {
    return ( 
        <Template separator={true}>
            <Section>
                <FormProfileEdit/>
            </Section>
        </Template>
     )
}

export default Register