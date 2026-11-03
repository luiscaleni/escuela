import { useState } from 'react';
import { CONFIG_BACKEND } from '../config/config';

export default function FormEditClassDetail({ idTabs, initialBlocks = [], onSaved }) {
    const [blocks, setBlocks] = useState(initialBlocks);
    const [contentType, setContentType] = useState('text');
    const [contentValue, setContentValue] = useState('');
    const [fileObject, setFileObject] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleBlockChange = (index, field, value) => {
        const updated = [...blocks];
        updated[index][field] = value;
        setBlocks(updated);
    };

    const handleAddNewBlock = () => {
        setBlocks([
            ...blocks,
            {
                id_content_blocks: null,
                content_type: 'text',
                content_value: '',
                file: null
            }
        ]);
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const updated = [...blocks];
        const temp = updated[index];
        updated[index] = updated[index - 1];
        updated[index - 1] = temp;
        setBlocks(updated);
    };

    const handleMoveDown = (index) => {
        if (index === blocks.length - 1) return;
        const updated = [...blocks];
        const temp = updated[index];
        updated[index] = updated[index + 1];
        updated[index + 1] = temp;
        setBlocks(updated);
    };

    // Función interna para subir el video directamente a Bunny
    const uploadVideoToBunny = async (fileObject, title) => {
        // Asegúrate de usar la ruta exacta que maneja tu enrutador (/createVideo)
        const createRes = await fetch(`${CONFIG_BACKEND.API_DIR}/createVideo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ title: title || 'Clase de Video' })
        });

        // Verificamos si la respuesta es válida antes de parsearla a JSON
        const responseText = await createRes.text();
        let videoData;
        try {
            videoData = JSON.parse(responseText);
        } catch (e) {
            console.error("Respuesta del servidor no es JSON:", responseText);
            throw new Error("El servidor no devolvió una respuesta JSON válida.");
        }

        if (!createRes.ok || !videoData.guid) {
            throw new Error(videoData.error || 'No se pudo crear la instancia del video en Bunny');
        }

        const videoId = videoData.guid;
        const libraryId = videoData.libraryId || '791786';

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`, true);
            // Tu API Key privada se usa para subir el binario directamente
            xhr.setRequestHeader('AccessKey', '415a56af-40f0-418d-b1b73b1b5c6c-990d-4412');
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(percent);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(videoId);
                } else {
                    reject(new Error(`Error al subir el binario a Bunny (Status ${xhr.status})`));
                }
            };

            xhr.onerror = () => reject(new Error('Error de red al intentar conectar con Bunny para la subida.'));
            xhr.send(fileObject);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setUploadProgress(0);

        try {
            const processedBlocks = [...blocks];

            // Si hay bloques de tipo video nuevos con archivo, los subimos a Bunny primero
            for (let i = 0; i < processedBlocks.length; i++) {
                const block = processedBlocks[i];
                if (block.content_type === 'video' && block.file && !block.id_content_blocks) {
                    const videoGuid = await uploadVideoToBunny(block.file, `Clase - Pestaña ${idTabs}`);
                    block.content_value = videoGuid; 
                }
            }

            const formData = new FormData();
            formData.append('id_tabs', idTabs);

            processedBlocks.forEach((block, index) => {
                formData.append(`blocks[${index}][id_content_blocks]`, block.id_content_blocks || '');
                formData.append(`blocks[${index}][content_type]`, block.content_type);
                formData.append(`blocks[${index}][content_value]`, block.content_value || '');
                formData.append(`blocks[${index}][order_block]`, index); 

                if ((block.content_type === 'file' || block.content_type === 'video') && block.file) {
                    formData.append(`blocks[${index}][file]`, block.file);
                }
            });

            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/saveClassDetails`, {
                method: 'POST',
                body: formData, 
                credentials: 'include'
            });

            const responseText = await res.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (err) {
                console.error("Respuesta no válida del servidor:", responseText);
                alert("Error crítico en el servidor. Revisa la consola.");
                setIsSubmitting(false);
                return;
            }

            if (data.success) {
                onSaved(data.blocks || []); 
            } else {
                alert("Error al guardar: " + (data.message || "Desconocido"));
            }
        } catch (error) {
            console.error("Error en el proceso:", error);
            alert("Ocurrió un error: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', background: '#1d1d1d', color: '#fff', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
            <h3>Agregar contenido a esta pestaña</h3>
            <p style={{ margin: '0.4rem 0', fontSize: '11px', color: '#9ca3af' }}>
                🔒 Por seguridad, los archivos subidos no se pueden eliminar ni reemplazar.<br/>
                👁‍🗨 Los nombres de las imagenes, videos y archivos serán visibles.
            </p>

            {blocks.map((block, index) => {
                const isExisting = block.id_content_blocks !== null && block.id_content_blocks !== undefined;

                return (
                    <div key={block.id_content_blocks || index} style={{ marginBottom: '20px', padding: '15px', background: '#2a2a2e', borderRadius: '6px', position: 'relative' }}>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Bloque #{index + 1}</span>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button 
                                    type="button" 
                                    onClick={() => handleMoveUp(index)} 
                                    disabled={index === 0}
                                    style={{ background: '#444', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: '3px', cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.5 : 1 }}
                                >
                                    ⬆️
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleMoveDown(index)} 
                                    disabled={index === blocks.length - 1}
                                    style={{ background: '#444', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: '3px', cursor: index === blocks.length - 1 ? 'not-allowed' : 'pointer', opacity: index === blocks.length - 1 ? 0.5 : 1 }}
                                >
                                    ⬇️
                                </button>
                            </div>
                        </div>
                        
                        {isExisting ? (
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Tipo de contenido: <strong>{block.content_type}</strong>
                            </label>
                        ) : (
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#9ca3af' }}>
                                    Seleccionar tipo de contenido:
                                </label>
                                <select 
                                    value={block.content_type || 'text'} 
                                    onChange={(e) => {
                                        const updated = [...blocks];
                                        updated[index].content_type = e.target.value;
                                        updated[index].content_value = ''; 
                                        updated[index].file = null;
                                        setBlocks(updated);
                                    }}
                                    style={{ width: '100%', padding: '8px', background: '#111', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
                                >
                                    <option value="text">Texto corto</option>
                                    <option value="textarea">Texto largo (Párrafo)</option>
                                    <option value="file">Archivo (PDF, etc.)</option>
                                    <option value="video">🎥 Video (Bunny Stream)</option>
                                </select>
                            </div>
                        )}

                        {(block.content_type === 'text' || block.content_type === 'textarea') && (
                            <textarea
                                value={block.content_value || ''}
                                onChange={(e) => handleBlockChange(index, 'content_value', e.target.value)}
                                placeholder="Escribe el contenido aquí..."
                                style={{ width: '100%', padding: '8px', background: '#111', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
                                rows="3"
                                required
                            />
                        )}

                        {block.content_type === 'file' && (
                            <div style={{ marginTop: '10px' }}>
                                {isExisting && block.content_value ? (
                                    <div style={{ padding: '10px', background: '#18181b', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
                                        <p style={{ margin: 0, fontSize: '14px' }}>📁 Archivo adjunto actual:</p>
                                        <a href={`${CONFIG_BACKEND.BASE_URL}/${block.content_value}`} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontSize: '13px' }}>
                                            {block.content_value}
                                        </a>
                                        <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#9ca3af' }}>
                                            🔒 Por seguridad, los archivos subidos no se pueden eliminar ni reemplazar.
                                        </p>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const updated = [...blocks];
                                            updated[index].file = e.target.files[0];
                                            setBlocks(updated);
                                        }}
                                        style={{ color: '#fff', width: '100%' }}
                                        required
                                    />
                                )}
                            </div>
                        )}

                        {block.content_type === 'video' && (
                            <div style={{ marginTop: '10px' }}>
                                {isExisting && block.content_value ? (
                                    <div style={{ padding: '10px', background: '#18181b', borderLeft: '4px solid #34d399', borderRadius: '4px' }}>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#34d399' }}>✅ Video vinculado en Bunny (GUID: {block.content_value})</p>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const updated = [...blocks];
                                            updated[index].file = e.target.files[0];
                                            setBlocks(updated);
                                        }}
                                        style={{ color: '#fff', width: '100%' }}
                                        required
                                    />
                                )}
                            </div>
                        )}
                    </div>
                );
            })}

            {isSubmitting && (
                <div style={{ margin: '15px 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#38bdf8' }}>Subiendo video a Bunny Stream... {uploadProgress}%</p>
                    <div style={{ width: '100%', background: '#444', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${uploadProgress}%`, background: '#3b82f6', height: '100%', transition: 'width 0.2s' }} />
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="button" onClick={handleAddNewBlock} disabled={isSubmitting} style={{ padding: '10px 15px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    + Agregar otro bloque
                </button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', background: isSubmitting ? '#555' : '#10b981', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </form>
    );
}