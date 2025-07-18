import Template from '../template/Template'
import FormLogin from '../components/FormLogin'
import Section from '../components/Section'

function Login() {
    return ( 
        <Template>
            <Section>
                <FormLogin/>
            </Section>
        </Template>
     )
}

export default Login