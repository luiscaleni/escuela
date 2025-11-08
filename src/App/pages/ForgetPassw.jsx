import Template from '../template/Template'
import FormForgetPassw from '../components/FormForgetPassw'
import Section from '../components/Section'

function ForgetPassw() {
    return ( 
        <Template separator={true}>
            <Section>
                <FormForgetPassw/>
            </Section>
        </Template>
     )
}

export default ForgetPassw