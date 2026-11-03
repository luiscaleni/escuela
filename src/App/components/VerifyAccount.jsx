import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CONFIG_BACKEND } from '../config/config'

function VerifyAccount() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    
    const [statusMessage, setStatusMessage] = useState('Verificando tu cuenta, por favor espera...')
    const [isSuccess, setIsSuccess] = useState(false)
    const [cargando, setCargando] = useState(true)
    
    const hasFetched = useRef(false) // 👈 Evita doble ejecución de la petición en React StrictMode

    useEffect(() => {
        if (!token) {
            setStatusMessage('No se ha proporcionado un token de verificación válido.')
            setCargando(false)
            return
        }

        if (hasFetched.current) return; // Si ya se hizo la petición, no repetir
        hasFetched.current = true;

        const verifyToken = async () => {
            try {
                const res = await fetch(`${CONFIG_BACKEND.API_DIR}/verifyAccount?token=${token}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                })
                const data = await res.json()
                console.log("Respuesta del backend:", data);

                if (data.success) {
                    setIsSuccess(true)
                    setStatusMessage(data.message || '¡Cuenta activada con éxito! Ya puedes iniciar sesión.')
                } else {
                    const errorMsg = data.error || data.message || '';
                    const isAlreadyVerified = errorMsg.toLowerCase().includes('verificada') || errorMsg.toLowerCase().includes('ya fue utilizado');

                    if (isAlreadyVerified) {
                        setIsSuccess(true)
                        setStatusMessage('Tu cuenta ya se encuentra verificada. Ya puedes iniciar sesión.')
                    } else {
                        setIsSuccess(false)
                        setStatusMessage(errorMsg || 'El enlace de activación es inválido o ya expiró.')
                    }
                }
            } catch (err) {
                console.error(err)
                setStatusMessage('Error de red al intentar conectar con el servidor.')
            } finally {
                setCargando(false)
            }
        }

        verifyToken()
    }, [token])

    return (
        <div className="contForm">
            <div className="form form2" style={{ width: '32rem', textAlign: 'center', padding: '2rem 1.6rem' }}>
                
                <h2 style={{ color: isSuccess ? '#10b981' : '#ef4444', marginBottom: '1rem' }}>
                    {cargando ? 'Verificando...' : (isSuccess ? '¡Verificación Exitosa!' : 'Aviso de Verificación')}
                </h2>

                <div className="contElmsForm" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                    <p style={{ fontSize: '1rem', color: 'var(--color-dark)', lineHeight: '1.5' }}>
                        {statusMessage}
                    </p>

                    {!cargando && (
                        <div className="contBtns" style={{ width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {isSuccess ? (
                                <Link to="/login" className="submitBtn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', color:'#fff' }}>
                                    Ir a Iniciar Sesión
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="submitBtn" style={{ textDecoration: 'none', padding:'1rem' , width:'auto', display: 'block', textAlign: 'center', color:'skyblue' }}>
                                        Ir a Iniciar Sesión
                                    </Link>

                                    <button 
                                        onClick={async () => {
                                            const emailInput = prompt("Ingresa tu correo electrónico registrado para recibir un nuevo enlace:");
                                            if (!emailInput) return;
                                            
                                            try {
                                                const res = await fetch(`${CONFIG_BACKEND.API_DIR}/resendVerification`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ email: emailInput })
                                                });
                                                const data = await res.json();
                                                alert(data.message);
                                            } catch (err) {
                                                alert("Error al conectar con el servidor.");
                                            }
                                        }}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--color-primary, #4f46e5)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', marginTop: '5px' }}
                                    >
                                        ¿Necesitas un nuevo enlace? Reenviar correo
                                    </button>
                                </>
                            )}

                        </div>
                    )}
                    
                </div>

            </div>
        </div>
    )
}

export default VerifyAccount