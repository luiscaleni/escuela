import styles from '../components/css/Section.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Template from '../template/Template'
import Publication from '../components/Publication'
import BackLink from '../components/BackLink'
import Container from '../components/Container'
import Loader from '../components/Loader'

function NewsDetail() {
    const {id_news} = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        if (!id_news) return

        fetch(`${CONFIG_BACKEND.API_DIR}/news/detail?id=${id_news}`)
         .then(async res => {
            const text = await res.text()
            try {
                const json = JSON.parse(text)
                setNews(json)
            } catch (error) {
                console.error("Respuesta no es JSON válido:", error)
            }
        })
        .catch(error => {
            setError(error.message)
            setLoading(false)
            setNews(null)
        }).finally(()=> setLoading(false))
    },[id_news])
    
    if(loading) return <Loader />
    if(error) return <p>Error: {error}</p>

    const parrafos = typeof news?.text_pub === 'string'
    ? news.text_pub.split(/\n+/).filter(p => p.trim() !== '')
    : [];

    return ( 
        <>
            <Template>
                <Publication titlePub={news.title_pub} nameAsset={news.img_pub} locationPub='publications'>
                    <Container widthElm="max">
                        <BackLink typeElm="expand" text="Volver" locationElm={CONFIG_PATHS.NEWS_PATH}/>
                        <div className={styles.separator}></div>
                        {parrafos.map((p, i)=>(
                            <p className={styles.paragraph} key={i}>{p}</p>
                        ))}
                    </Container>
                </Publication>
                
            </Template>
        </>
     )

}

export default NewsDetail