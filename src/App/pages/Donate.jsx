import Template from '../template/Template'
import Publication from '../components/Publication'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

function Donate() {
  const [t, i18n] = useTranslation()
  
  useEffect(()=>{
      const lang = localStorage.getItem('lang') || 'es'
      i18n.changeLanguage(lang)
  },[i18n])

  return (
    <>
      <Template>
        <Publication titlePub={t('donate.title')} typeElm='img' nameAsset="banner_donate.jpg">
        </Publication>
      </Template>
    </>
  )
}

export default Donate