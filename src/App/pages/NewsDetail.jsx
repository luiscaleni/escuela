import Template from '../template/Template'
import Publication from '../components/Publication'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CONFIG_BACKEND } from '../config/config'

function NewsDetail() {
    const {id_news} = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetch(`${CONFIG_BACKEND.API_DIR}/new/detail&id=${id_news}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setNews(data)
                setLoading(false)
            }
        })
        .catch(error => {
            setError(error.message)
            setLoading(false)
        })
    },[id_news])
    
   // if(loading) return <p>Cargando ...</p>
    if(error) return <p>Error: {error}</p>

    return ( 
        <>
            <Template>
                <Publication titlePub={news.title_pub}>
                    <p>{news.text_pub}</p>
                </Publication>
            </Template>
        </>
     )

}

export default NewsDetail