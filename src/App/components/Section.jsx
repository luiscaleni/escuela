import styles from './css/Section.module.css'

function Section({typeElm="", children, titleElm=""}) {
    let nameStyles=""
    if(typeElm === "banner"){
        nameStyles = styles.sectionBanner
    }else if(typeElm === "xtreme"){
        nameStyles = styles.sectionXtreme
    }else{
        nameStyles = styles.section
    }
    return ( 
        <>
            <section className={nameStyles}>
                {typeElm === "banner" || typeElm === "xtreme" ? (
                    <>
                        <h1>{titleElm}</h1>
                        {children}
                    </>
                ) : (
                    <div className={styles.sectionContent}>
                        {children}
                    </div>
                )}
            </section>
        </>
     )
}

export default Section