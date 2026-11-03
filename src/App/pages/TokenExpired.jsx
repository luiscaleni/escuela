import { Link } from 'react-router-dom'
import Section from '../components/Section'

function TokenExpired() {
    return ( 
            <Section>
                <h2>El tiempo expiró para usar este token</h2>
                <p style={{padding:'1rem', display:'flex', alignItems:'center'}}>Ir a <Link to='/ForgetPassw' style={{color:'skyblue', paddingLeft:'0.5rem', fontSize:'1rem'}}>Recuperar contraseña</Link></p>
            </Section>
     )
}

export default TokenExpired