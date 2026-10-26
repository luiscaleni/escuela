import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';

function NotFound() {
  const { user } = useContext(UserContext)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '20px',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>404</h1>
      <h2>Esta ruta no existe</h2>
      <p style={{ marginTop: '10px', color: '#ccc' }}>
        La página que estás buscando no se encuentra disponible o cambió de dirección.
      </p>
      
      <Link 
        to={user ? '/campus' : '/'}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

export default NotFound;