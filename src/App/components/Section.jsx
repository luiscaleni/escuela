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
                        {typeElm === "xtreme" ? <div className={styles.topXtreme}></div> : null}
                        {titleElm ? <h1>{titleElm}</h1> : null}
                        {children}
                    </>
                ) : (
                    <div className={styles.sectionContent}>
                        {titleElm ? <h3>{titleElm}</h3>: ""}
                        {children}
                    </div>
                )}
            </section>
        </>
     )
}

export default Section