import { useState } from 'react';
import { CONFIG_BACKEND } from '../config/config';

const FormVideoUploader = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Por favor, completa el título y selecciona un video.');
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // 1. Llamar a tu backend PHP para crear la instancia del video de forma segura
      const createRes = await fetch(`${CONFIG_BACKEND.API_DIR}/createVideo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      const videoData = await createRes.json();
      if (!videoData.guid) throw new Error(videoData.error || 'No se pudo crear la instancia del video');

      const videoId = videoData.guid;
      const libraryId = '791786';
      const apiKey = '415a56af-40f0-418d-b1b73b1b5c6c-990d-4412'; // Opcional: si prefieres subir el binario directo o rutearlo también por PHP.

      // 2. Subida directa del archivo binario a Bunny (o mediante TUS si son archivos muy pesados)
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`, true);
      xhr.setRequestHeader('AccessKey', apiKey);
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          setIsUploading(false);
          setTitle('');
          setFile(null);
          if (onUploadSuccess) {
            onUploadSuccess({ videoId, title });
          }
        } else {
          throw new Error(`Error en la subida del archivo: ${xhr.statusText}`);
        }
      };

      xhr.onerror = () => {
        setError('Error de red al intentar subir el archivo de video.');
        setIsUploading(false);
      };

      xhr.send(file);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error inesperado.');
      setIsUploading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Subir Clase / Video a Bunny</h3>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Título del Video:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            placeholder="Ej: Clase 1 - Introducción"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Archivo de Video:
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={isUploading}
            style={{ width: '100%' }}
          />
        </div>

        {isUploading && (
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              width: '100%',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '12px',
                width: `${progress}%`,
                backgroundColor: '#4caf50',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <small style={{ display: 'block', textAlign: 'center', marginTop: '5px' }}>
              Subiendo a Bunny: {progress}%
            </small>
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isUploading ? '#9e9e9e' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isUploading ? 'not-allowed' : 'pointer'
          }}
        >
          {isUploading ? 'Subiendo...' : 'Subir Video'}
        </button>
      </form>
    </div>
  );
};

export default FormVideoUploader;