import { useState } from 'react';
import { CONFIG_BACKEND } from '../config/config';

export default function FormEditClassDetail({ idTabs, initialBlocks = [], onSaved }) {
    // Inicializamos el estado local con los bloques que ya tiene la pestaña
    const [blocks, setBlocks] = useState(initialBlocks)
    // Ejemplo rápido de cómo adaptar los campos en tu FormEditClassDetail.jsx
    const [contentType, setContentType] = useState('text'); // 'text', 'textarea', 'file'
    const [contentValue, setContentValue] = useState('');
    const [fileObject, setFileObject] = useState(null); // Si vas a subir archivos físicos

    // Manejar cambios en los campos de texto
    const handleBlockChange = (index, field, value) => {
        const updated = [...blocks];
        updated[index][field] = value;
        setBlocks(updated);
    }

    // Manejar la adición de un nuevo bloque
    const handleAddNewBlock = () => {
        setBlocks([
            ...blocks,
            {
                id_content_blocks: null, // Nuevo bloque
                content_type: 'text',
                content_value: '',
                file: null
            }
        ]);
    }

    // Funciones para reordenar los bloques en el estado local
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

    // Enviar los cambios al backend (PHP)
    // Enviar los cambios al backend (PHP)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id_tabs', idTabs); // ID de la pestaña actual

        // Recorremos los bloques para agregarlos al FormData
        blocks.forEach((block, index) => {
            formData.append(`blocks[${index}][id_content_blocks]`, block.id_content_blocks || '');
            formData.append(`blocks[${index}][content_type]`, block.content_type);
            formData.append(`blocks[${index}][content_value]`, block.content_value || '');
            formData.append(`blocks[${index}][order_block]`, index); 

            // 🚀 ¡ESTO ES LO QUE FALTABA! Adjuntar el archivo físico si existe
            if (block.content_type === 'file' && block.file) {
                formData.append(`blocks[${index}][file]`, block.file);
            }
        });

        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/saveClassDetails`, {
                method: 'POST',
                body: formData, 
                credentials: 'include'
            });
            // ... resto del código

            const responseText = await res.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (err) {
                console.error("Respuesta no válida del servidor:", responseText);
                alert("Error crítico en el servidor. Revisa la consola.");
                return;
            }

            if (data.success) {
                onSaved(data.blocks || []); // Actualizamos los bloques en la vista principal
            } else {
                alert("Error al guardar: " + (data.message || "Desconocido"));
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de red al intentar guardar.");
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
                        
                        {/* Botones de reordenamiento */}
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
                        
                        {/* Si el bloque ya existe, mostramos el tipo fijo. Si es nuevo, permitimos elegirlo */}
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
                                        updated[index].content_value = ''; // Limpiamos al cambiar
                                        updated[index].file = null;
                                        setBlocks(updated);
                                    }}
                                    style={{ width: '100%', padding: '8px', background: '#111', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
                                >
                                    <option value="text">Texto corto</option>
                                    <option value="textarea">Texto largo (Párrafo)</option>
                                    <option value="file">Archivo (PDF, Video, etc.)</option>
                                </select>
                            </div>
                        )}

                        {/* --- RENDERIZADO SEGÚN EL TIPO (Sea existente o nuevo) --- */}

                        {/* 1. Si es texto o textarea */}
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

                        {/* 2. Si es archivo */}
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
                                    /* Input para subir el archivo en un bloque NUEVO */
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
                    </div>
                );
            })}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="button" onClick={handleAddNewBlock} style={{ padding: '10px 15px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    + Agregar otro bloque
                </button>
                <button type="submit" style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Guardar Cambios
                </button>
            </div>
        </form>
    )
}