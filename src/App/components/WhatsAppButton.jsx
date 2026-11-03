import React from 'react';

const WhatsAppButton = () => {
  // Reemplaza con tu número de teléfono incluyendo el código de país (sin el signo +)
  // Ejemplo para Argentina: 5491234567890
  const phoneNumber = '5491155792122';
  
  // Mensaje predeterminado opcional (codificado para URL)
  const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre sus capacitaciones.');
  
  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.button}
      aria-label="Chat de WhatsApp"
      title='Contáctanos'
    >
      {/* Icono SVG de WhatsApp */}
      <svg xmlns="http://w3.org" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.348.1-.1.133-.17.198-.28.065-.11.033-.201-.016-.298-.049-.098-.445-1.072-.61-1.47-.16-.389-.323-.337-.45-.343-.112-.005-.243-.006-.374-.006s-.345.048-.525.24c-.18.198-.687.676-.687 1.648s.703 1.905.802 2.038c.098.133 1.385 2.113 3.36 2.96.47.202.835.322 1.127.412.475.152.906.129 1.246.078.38-.057 1.17-.478 1.338-.94.17-.463.17-.861.119-.942-.048-.081-.178-.13-.375-.228z"/>
    </svg>
    </a>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '5.4rem',
    right: '1.7rem',
    backgroundColor: '#25D366',
    color: '#FFF',
    borderRadius: '50%',
    width: '4rem',
    height: '4rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    zIndex: 1000,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function App() {
  return (
    <div>
      {/* El resto de tu contenido */}
      <WhatsAppButton />
    </div>
  );
}
