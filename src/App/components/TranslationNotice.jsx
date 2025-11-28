import styles from './css/TranslationNotice.module.css'
import buttonT from './css/Button.module.css'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function TranslationNotice({ forceOriginal, setForceOriginal }) {
    const [t, i18n] = useTranslation()

    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    return (
        <div className={styles.contTotalTranslate}>
            <div className={styles.contTranslate}>

                <span className={styles.text}>
                    {t("alerts.translateTxt")}
                </span>

                <div className={styles.contButton}>
                    <button
                        onClick={() => setForceOriginal(!forceOriginal)}
                        className={buttonT.button}
                    >
                        {forceOriginal ? t("buttons.seeTrad") : t("buttons.seeOriginal")}
                    </button>
                </div>

            </div>
        </div>
    )
}
