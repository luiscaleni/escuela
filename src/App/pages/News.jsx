import Template from '../template/Template'
import Publication from '../components/Publication'
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CONFIG_BACKEND } from '../config/config'

function News() {
    const [publications, setPublications] = useState([])
    const [loading, setLoading] = useState(true)
    const { id_noticias } = useParams()

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/news`, {
            method: 'GET',
            credentials: 'include'
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
            .finally (() => setLoading(false))
    },[])

    if (loading) return <p>Cargando ...</p>
    return ( 
        <>
            <Template>
                <Publication titlePub="Noticias">
                    {publications.map(pub => (
                        <Card key={pub.id_pub}
                            link={`/noticias/${pub.id_pub}`}
                            cardTitle={pub.title_pub} 
                            description={pub.descript_pub}/>
                    ))}
                </Publication>
            </Template>
        </>
     )

}

export default News