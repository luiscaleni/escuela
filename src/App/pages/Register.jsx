import Template from '../template/Template'
import FormRegister from '../components/FormRegister'
import Section from '../components/Section'

function Register() {
    return ( 
        <Template separator={true}>
            <Section>
                <FormRegister/>
            </Section>
        </Template>
     )
}

export default Register