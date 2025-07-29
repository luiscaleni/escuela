import styles from './css/NewPost.module.css'
import Template from '../../template/Template'
import Section from '../../components/Section'
import FormPost from '../../components/FormPost'

function NewPost() {
    return ( 
        <>
            <Template separator={true}>
                <Section>
                    <FormPost id="formPost"/>
                </Section>
            </Template>
        </>
     );
}

export default NewPost;