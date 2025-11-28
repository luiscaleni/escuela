import Template from '../template/Template'
import Publication from '../components/Publication'
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import { useTranslation } from 'react-i18next'

function News() {
    const [publications, setPublications] = useState([])
    const [t, i18n] = useTranslation()    
    
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/news`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data=>{
                if (data.success) {
                    setPublications(data.data)      
                }else{
                    if (import.meta.env.DEV) { console.error('Error: ', data.message)}
                }
            })
            .catch (error => import.meta.env.DEV ?? console.error('Error en API: ', error))
            
    },[])
    
    return ( 
        <>
            <Template>
                <Publication titlePub={t('news.title')} typeElm='img' nameAsset="banner_news.jpg">
                    {publications && publications.length > 0 ? (
                        publications.map(pub => (
                            <Card key={pub.id_pub}
                                link={`/noticias/${pub.id_pub}`}
                                cardTitle={pub.title_pub} 
                                descriptionCard={pub.descript_pub}
                                imgCard={pub.img_pub}
                            />
                        ))
                    ) : (
                        <p>{t('alerts.noneNews')}</p>
                    )}
                </Publication>
            </Template>
        </>
     )

}

export default News