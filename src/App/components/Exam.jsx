import { useState } from 'react';

const preguntasQuiz = [
  {
    pregunta: "¿Qué es JSX?",
    opciones: [
      "Una extensión de sintaxis para JavaScript que parece HTML",
      "Una base de datos para React",
      "Un nuevo framework de CSS",
      "Un método para conectar APIs"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cómo se pasa información de un componente padre a un componente hijo?",
    opciones: ["State", "Props", "UseEffect", "Redux"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué Hook se utiliza para manejar el estado en un componente funcional?",
    opciones: ["useEffect", "useContext", "useState", "useRef"],
    respuestaCorrecta: 2
  }
];

export default function Examen() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const manejarRespuesta = (indexOpcion) => {
    setOpcionSeleccionada(indexOpcion);
    
    // Validar si es correcta
    if (indexOpcion === preguntasQuiz[indiceActual].respuestaCorrecta) {
      setPuntuacion(puntuacion + 1);
    }

    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
      const siguientePregunta = indiceActual + 1;
      if (siguientePregunta < preguntasQuiz.length) {
        setIndiceActual(siguientePregunta);
        setOpcionSeleccionada(null);
      } else {
        setMostrarResultado(true);
      }
    }, 600);
  };

  const reiniciarQuiz = () => {
    setIndiceActual(0);
    setPuntuacion(0);
    setMostrarResultado(false);
    setOpcionSeleccionada(null);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' }}>
      {mostrarResultado ? (
        <div style={{ textAlign: 'center' }}>
          <h2>¡Examen Finalizado!</h2>
          <p>Tu puntuación es: **{puntuacion}** de **{preguntasQuiz.length}**</p>
          <button 
            onClick={reiniciarQuiz}
            style={{ padding: '10px 20px', backgroundColor: '#61dafb', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reiniciar Examen
          </button>
        </div>
      ) : (
        <div>
          <h3>Pregunta {indiceActual + 1} de {preguntasQuiz.length}</h3>
          <p style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{preguntasQuiz[indiceActual].pregunta}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            {preguntasQuiz[indiceActual].opciones.map((opcion, index) => {
              let backgroundColor = '#f0f0f0';
              if (opcionSeleccionada !== null) {
                if (index === preguntasQuiz[indiceActual].respuestaCorrecta) backgroundColor = '#d4edda'; // Verde
                else if (index === opcionSeleccionada) backgroundColor = '#f8d7da'; // Rojo
              }

              return (
                <button
                  key={index}
                  onClick={() => manejarRespuesta(index)}
                  disabled={opcionSeleccionada !== null}
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: backgroundColor,
                    cursor: opcionSeleccionada === null ? 'pointer' : 'default'
                  }}
                >
                  {opcion}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
}