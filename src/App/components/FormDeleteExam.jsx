import React, { useState } from 'react';
import { CONFIG_BACKEND } from '../config/config';

const FormDeleteExam = ({ exam, onExamDeleted, onCancel }) => {
    const [confirmTitle, setConfirmTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        if (confirmTitle !== exam.title_exam) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('id_exam', exam.id_exam);

            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/exam/delete`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                onExamDeleted();
            } else {
                alert("Error al eliminar el examen: " + data.message);
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error al intentar conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleDelete} style={{ padding: '24px', background: '#1d1d1d', color: '#fff', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ color: '#f87171', marginBottom: '16px' }}>⚠️ Eliminar Examen</h3>
            <p style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '16px' }}>
                Esta acción no se puede deshacer. Escribe exactamente el nombre del examen para confirmar: 
                <strong style={{ display: 'block', color: '#fff', marginTop: '4px' }}>{exam.title_exam}</strong>
            </p>
            
            <input 
                type="text" 
                placeholder="Escribe el nombre aquí..." 
                value={confirmTitle}
                onChange={(e) => setConfirmTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', background: '#27272a', border: '1px solid #3f3f46', color: '#fff' }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    type="button" 
                    onClick={onCancel}
                    style={{ flex: 1, padding: '10px', background: '#3f3f46', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    disabled={confirmTitle !== exam.title_exam || loading}
                    style={{ flex: 1, padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', opacity: confirmTitle !== exam.title_exam ? 0.5 : 1 }}
                >
                    {loading ? 'Eliminando...' : 'Eliminar examen'}
                </button>
            </div>
        </form>
    );
};

export default FormDeleteExam;