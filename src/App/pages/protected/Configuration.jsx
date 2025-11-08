import Template from '../../template/Template'
import Section from '../../components/Section'
import ShowConfigData from '../../components/ShowConfigData'

function Configuration() {

    return ( 
        <>
        <Template separator={true}>
            <Section>
                <ShowConfigData />
            </Section>
        </Template>
        </>
     )
}

export default Configuration