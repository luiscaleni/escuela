import Template from '../../template/Template'
import Section from '../../components/Section'
import FormPlantEdit from '../../components/FormPlantEdit'

function PlantationEdit() {

    return ( 
        <>
            <Template separator={true}>
                <Section>
                    <FormPlantEdit />
                </Section>
            </Template>
        </>
     )
}

export default PlantationEdit