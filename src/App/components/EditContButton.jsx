import pencil from '/assets/images/utilities/pencil.png'
import { Link } from "react-router-dom"
import ButtonTop from './ButtonTop'
import styles from "./css/ButtonTopEdit.module.css"

function EditContButton({text, locationElm}) {
    return ( 
        <> 
        <div className={styles.buttonTopEdit}>
            <Link to={locationElm} title='Editar Perfil'>
                <ButtonTop 
                    imgElm={pencil}
                    textElm={text} 
                    alt='imgEditButton'
                />
            </Link>
        </div>
        </>
     )
}
 
export default EditContButton