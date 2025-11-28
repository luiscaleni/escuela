import Template from '../../template/Template'
import Section from '../../components/Section'
import FormPostEdit from '../../components/FormPostEdit'

function PostEdit() {

    return ( 
        <>
            <Template separator={true}>
                <Section>
                    <FormPostEdit/>
                </Section>
            </Template>
        </>
     )
}

export default PostEdit