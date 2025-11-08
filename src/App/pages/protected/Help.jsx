import Template from '../../template/Template'
import Section from '../../components/Section'
import { CONFIG_ALERT_MESSAGE } from '../../config/config'

function Help() {
  return (
    <>
      <Template separator={true}>
        <Section>
          <p>{CONFIG_ALERT_MESSAGE}</p>
        </Section>
      </Template>
    </>
  )
}

export default Help