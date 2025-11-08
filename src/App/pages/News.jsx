import Template from '../template/Template'
import Publication from '../components/Publication'
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'

function News() {
    const [publications, setPublications] = useState([])

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/news`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data=>{
                if (data.success) {
                    setPublications(data.data)      
                }else{
                    console.error('Error: ', data.message)
                }
            })
            .catch (error => console.error('Error en API: ', error))
            
    },[])
    
    return ( 
        <>
            <Template>
                <Publication titlePub="Noticias" typeElm='img' nameAsset="banner_news.jpg">
                    {publications.map(pub => (
                        <Card key={pub.id_pub}
                            link={`/noticias/${pub.id_pub}`}
                            cardTitle={pub.title_pub} 
                            descriptionCard={pub.descript_pub}
                            imgCard={pub.img_pub}
                        />
                    ))}
                </Publication>
            </Template>
        </>
     )

}

export default News