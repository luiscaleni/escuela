import Template from '../../template/Template'
import Section from '../../components/Section'
import FormPost from '../../components/FormPost'

function NewPost() {

    return ( 
        <>
            <Template separator={true}>
                <Section>
                    <FormPost/>
                </Section>
            </Template>
        </>
     );
}

export default NewPost