import styles from './css/GroupPanel.module.css'

function GroupPanel({titleElm="", children}) {
    return ( 
        <div className={styles.groupPanel}>
            <p className={styles.titleGroupPanel}>{titleElm}</p>
            {children}
        </div>
     );
}

export default GroupPanel;