import { useState } from "react"
import styles from './css/Tabs.module.css'

function Tabs() {
    const {activeTab, setActiveTab} = useState(0)

    return ( 
        <>
            <div className={styles.contentTab}>
                <div className={styles.tabsHeader}>
                    <button></button>
                </div>
            </div>
        </>
     )
}

export default Tabs