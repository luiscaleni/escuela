import styles from '../components/css/Section.module.css'
import stylesNews from './css/News.module.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS, ENABLE_TRANSLATION } from '../config/config'
import Template from '../template/Template'
import Publication from '../components/Publication'
import LeftTopButton from '../components/LeftTopButton'
import Container from '../components/Container'
import Loader from '../components/Loader'
import pencil from '../assets/icons/utilities/pencil.png'
import RightTopButton from '../components/RightTopButton'
import { UserContext } from '../../App/components/UserProvider'
import TranslationNotice from "../components/TranslationNotice"
import { useTranslation } from 'react-i18next'
import TopButtons from '../components/TopButtons'

function NewsDetail() {
    const { user } = useContext(UserContext)
    const {id_news} = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [t, i18n] = useTranslation()
    const langd = i18n.language
    
    const [translatedBody, setTranslatedBody] = useState("")
    const [translatedTitle, setTranslatedTitle] = useState("")
    const [forceOriginal, setForceOriginal] = useState(false)
    
    const navigate = useNavigate()
    const [translating, setTranslating] = useState(true)

    const [lastLangTranslated, setLastLangTranslated] = useState(null);


    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    useEffect(()=>{
        if (!id_news) return
        loadNew()
    },[id_news])

    const loadNew = async ()=>{
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/news/detail?id=${id_news}&lang=${langd}`)
            const data = await res.json()
            if(data.success){
                let post = data.result
                post.originalText = post.textPub
                post.originalTitle = post.titlePub
                setNews(post)
            }
        }catch (error) {
            navigate(CONFIG_PATHS.NEWS_PATH)
            setLoading(false)
            setNews(null)
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {
    if (!news) return;

    // Evitar traducir otra vez si ya lo hicimos para este idioma
    if (lastLangTranslated === i18n.language) return;

    setTranslating(true);

    // Si coincide idioma → no traducir
    if (news.langPub === i18n.language) {
        setTranslatedBody("");
        setTranslatedTitle("");
        setLastLangTranslated(i18n.language);
        setTranslating(false);
        return;
    }

    if (!ENABLE_TRANSLATION) {
        setTranslatedBody("");
        setTranslatedTitle("");
        setLastLangTranslated(i18n.language);
        setTranslating(false);
        return;
    }

    const translate = async () => {
        try {
            const bodyReq = fetch(`${CONFIG_BACKEND.API_DIR}/translate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: news.originalText,
                    source: news.langPub,
                    target: i18n.language
                })
            });

            const titleReq = fetch(`${CONFIG_BACKEND.API_DIR}/translate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: news.originalTitle,
                    source: news.langPub,
                    target: i18n.language
                })
            });

            const [resBody, resTitle] = await Promise.all([bodyReq, titleReq]);

            const bodyData = await resBody.json();
            const titleData = await resTitle.json();

            setTranslatedBody(bodyData?.translatedText || "");
            setTranslatedTitle(titleData?.translatedText || "");

            // ⬅ recordamos que este idioma ya fue traducido
            setLastLangTranslated(i18n.language);

        } catch (err) {
            if (import.meta.env.DEV) console.warn("Error traduciendo:", err);
            setTranslatedBody("");
            setTranslatedTitle("");
        } finally {
            setTranslating(false);
        }
    };

    translate();

}, [news, i18n.language]);

    if(loading) return <Loader />
    if(error) return <p>Error: {error}</p>

    const showTitle =
        forceOriginal || !translatedTitle
            ? news?news.originalTitle:""
            : translatedTitle

    const showBody =
        forceOriginal || !translatedBody
            ? news?news.originalText:""
            : translatedBody

    const parrafos = showBody
        ? showBody.split(/\n+/).filter(p => p.trim() !== "")
        : []
    
    const formateada = new Date(news.datePub).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })

    return (
        <>
            {news && (
                <Template>
                    <Publication 
                        titlePub={showTitle}
                        nameAsset={news.imgPub ? news.imgPub : null}
                        typeElm="img"
                        locationPub='publications'
                    >
                        <TopButtons>
                            <LeftTopButton
                                locationElm={CONFIG_PATHS.NEWS_PATH}
                                typeElm='expand'
                                text={t('buttons.news')}
                            />

                            {news.langPub !== i18n.language && translatedBody && (
                                <TranslationNotice
                                    forceOriginal={forceOriginal}
                                    setForceOriginal={setForceOriginal}
                                />
                            )}

                            {user && user.rolId === 1 && (
                                <RightTopButton
                                    locationElm={CONFIG_PATHS.EDIT_POST_PATH + '/' + news.idPub}
                                    typeElm='expand'
                                    text={t('buttons.edit')}
                                    imgElm={pencil}
                                />
                            )}
                        </TopButtons>

                        <Container widthElm="max" hiddenStyle={true}>
                            {/* Mientras traduce, mostrar un loader */}
                            {translating ? (
                                <Loader />
                            ) : (
                                parrafos.map((p, i) => (
                                    <p className={styles.paragraph} key={i}>
                                        {p}
                                    </p>
                                ))
                                
                            )}
                            <p className={styles.editor}>Editor: {news.nameUserPub}, {formateada}</p>
                        </Container>
                    </Publication>
                </Template>
            )}
        </>
    )
}

export default NewsDetail