import styles from './css/Section.module.css'

function Section({typeElm="", children, titleElm=""}) {
    let nameStyles=""

    if(typeElm === "banner"){
        nameStyles = styles.sectionBanner
    }else if(typeElm === "xtreme"){
        nameStyles = styles.sectionXtreme
    }else if(typeElm === "xtreme2"){
        nameStyles = styles.sectionXtreme2
    }else if(typeElm === "module"){
        nameStyles = styles.module
    }else if(typeElm === "fullScreen"){
        nameStyles = styles.fullScreen
    }else{
        nameStyles = styles.section
    }
    
    return ( 
        <>
            <section className={nameStyles}>
                {typeElm === "banner" || typeElm === "xtreme" || typeElm === "fullScreen" ? (
                    <>
                        {typeElm === "xtreme" ? <div className={styles.topXtreme}></div> : null}
                        {titleElm ? <h1>{titleElm}</h1> : null}
                        {children}
                    </>
                ) : typeElm === "xtreme2" ? (
                    <>
                        {typeElm === "xtreme2" ? <div className={styles.topXtreme}></div> : null}
                        {children}
                    </>
                ) : (
                    <div className={styles.sectionContent}>
                        {titleElm ? <h2>{titleElm}</h2>: ""}
                        <div className={styles.sectionChildren}>
                            {children}
                        </div>
                    </div>
                )}
            </section>
        </>
     )
}

export default Section