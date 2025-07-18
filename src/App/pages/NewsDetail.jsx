import styles from '../components/css/Section.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import Template from '../template/Template'
import Publication from '../components/Publication'
import BackLink from '../components/BackLink'
import Container from '../components/Container'

function NewsDetail() {
    const {id_news} = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        if (!id_news) return

        fetch(`${CONFIG_BACKEND.API_DIR}/new/detail?id=${id_news}`)
         .then(async res => {
            const text = await res.text()
            try {
                const json = JSON.parse(text)
                setNews(json)
            } catch (error) {
                console.error("Respuesta no es JSON válido:", text)
            }
        })
        .catch(error => {
            setError(error.message)
            setLoading(false)
            setNews(null)
        }).finally(()=> setLoading(false))
    },[id_news])
    
    if(loading) return <p>Cargando ...</p>
    if(error) return <p>Error: {error}</p>

    const parrafos = news.text_pub
    .split(/\n+/)
    .filter(p => p.trim() !== '');

    return ( 
        <>
            <Template>
                <Publication titlePub={news.title_pub}>
                    <Container widthElm="max">
                        <BackLink typeElm="expand"/>
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