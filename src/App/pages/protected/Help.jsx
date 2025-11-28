import Template from '../../template/Template'
import Section from '../../components/Section'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

function Help() {
  const [t, i18n] = useTranslation()
  
  useEffect(()=>{
      const lang = localStorage.getItem('lang') || 'es'
      i18n.changeLanguage(lang)
  },[i18n])

  return (
    <>
      <Template separator={true}>
        <Section>
          <p>{t('alerts.WeAreW')}</p>
        </Section>
      </Template>
    </>
  )
}

export default Help