import styles from '../components/css/Section.module.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Template from '../template/Template'
import Publication from '../components/Publication'
import LeftTopButton from '../components/LeftTopButton'
import Container from '../components/Container'
import Loader from '../components/Loader'
import pencil from '../assets/icons/utilities/pencil.png'
import RightTopButton from '../components/RightTopButton'
import { UserContext } from '../../App/components/UserProvider'

function NewsDetail() {
    const { user } = useContext(UserContext)
    const {id_news} = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        if (!id_news) return
        loadNew()
    },[id_news])

    const loadNew = async ()=>{
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/news/detail?id=${id_news}`)
            const data = await res.json()
            if(data.success){
                setNews(data.result)
            }
        } catch (error) {
            setError(error.message)
            setLoading(false)
            setNews(null)
            console.error('Error en API: ', error)
        }finally{
            setLoading(false)
        }
    }
    
    
    if(loading) return <Loader />
    if(error) return <p>Error: {error}</p>

    const parrafos = typeof news?.textPub === 'string'
    ? news.textPub.split(/\n+/).filter(p => p.trim() !== '')
    : [];

    return ( 
        <>
            <Template>
                <Publication titlePub={news.titlePub} nameAsset={news.imgPub ? news.imgPub : null}  typeElm="img" locationPub='publications'>
                    <LeftTopButton locationElm={CONFIG_PATHS.NEWS_PATH} typeElm='expand' text="Noticias" marginLeft={true}/>
                    {user && user.rolId === 1 && (
                        <RightTopButton locationElm={CONFIG_PATHS.EDIT_POST_PATH+'/'+news.idPub} typeElm='expand' text="Editar" marginRight={true} img={pencil}/>
                    )}
                    <Container widthElm="max" hiddenStyle={true}>
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