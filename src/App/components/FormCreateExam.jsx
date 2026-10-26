import React, { useState } from 'react';
import { CONFIG_BACKEND } from '../config/config';

const FormCreateExam = ({ courseId, onExamSaved, onCancel }) => {
    const [examData, setExamData] = useState({
        title_exam: '',
        time_limit: 30,
        start_time: '',
        end_time: ''
    });

    const [questions, setQuestions] = useState([
        {
            question_text: '',
            question_order: 1,
            options: [
                { option_text: '', is_correct: 1 },
                { option_text: '', is_correct: 0 }
            ]
        }
    ]);

    const handleExamChange = (e) => {
        setExamData({ ...examData, [e.target.name]: e.target.value });
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question_text: '',
                question_order: questions.length + 1,
                options: [
                    { option_text: '', is_correct: 1 },
                    { option_text: '', is_correct: 0 }
                ]
            }
        ]);
    };

    const handleQuestionChange = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index].question_text = text;
        setQuestions(newQuestions);
    };

    const addOption = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.push({ option_text: '', is_correct: 0 });
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, text) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex].option_text = text;
        setQuestions(newQuestions);
    };

    const handleCorrectOptionChange = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.forEach((opt, idx) => {
            opt.is_correct = idx === oIndex ? 1 : 0;
        });
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...examData,
            course_id: courseId,
            questions: questions
        };

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/exam/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.success) {
                alert('¡Examen creado con éxito!');
                if (onExamSaved) onExamSaved();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err) {
            console.error('Error de red al crear el examen', err);
        }
    };

    return (
        <div style={{ padding: '20px', background: '#1d1d1d', color: '#fff', borderRadius: '8px', maxWidth: '700px', maxHeight: '85vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>Crear Nuevo Examen</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div style={{ background: '#27272a', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Título del Examen</label>
                    <input
                        type="text"
                        name="title_exam"
                        value={examData.title_exam}
                        onChange={handleExamChange}
                        required
                        placeholder="Ej: Examen Parcial - Mes 2"
                        style={{ width: '100%', padding: '8px', background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '4px' }}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Límite (min)</label>
                            <input
                                type="number"
                                name="time_limit"
                                value={examData.time_limit}
                                onChange={handleExamChange}
                                required
                                style={{ width: '100%', padding: '8px', background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '4px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Inicio</label>
                            <input
                                type="datetime-local"
                                name="start_time"
                                value={examData.start_time}
                                onChange={handleExamChange}
                                required
                                style={{ width: '100%', padding: '8px', background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '4px', fontSize: '12px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Cierre Global</label>
                            <input
                                type="datetime-local"
                                name="end_time"
                                value={examData.end_time}
                                onChange={handleExamChange}
                                required
                                style={{ width: '100%', padding: '8px', background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '4px', fontSize: '12px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Preguntas */}
                <div className="space-y-4">
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Preguntas</h3>
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} style={{ background: '#27272a', padding: '15px', borderRadius: '6px', marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Pregunta {qIndex + 1}</label>
                            <input
                                type="text"
                                value={q.question_text}
                                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                required
                                placeholder="Escribe la pregunta..."
                                style={{ width: '100%', padding: '8px', background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '4px', marginBottom: '10px' }}
                            />

                            <div style={{ marginLeft: '10px' }}>
                                <span style={{ fontSize: '11px', color: '#a1a1aa' }}>Opciones (selecciona el punto de la correcta):</span>
                                {q.options.map((opt, oIndex) => (
                                    <div key={oIndex} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                                        <input
                                            type="radio"
                                            name={`correct_${qIndex}`}
                                            checked={opt.is_correct === 1}
                                            onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <input
                                            type="text"
                                            value={opt.option_text}
                                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                            required
                                            placeholder={`Opción ${oIndex + 1}`}
                                            style={{ flex: 1, padding: '6px', background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '4px', fontSize: '13px' }}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addOption(qIndex)}
                                    style={{ fontSize: '12px', color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', marginTop: '6px' }}
                                >
                                    + Agregar otra opción
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addQuestion}
                        style={{ width: '100%', padding: '8px', background: 'transparent', border: '2px dashed #4f46e5', color: '#818cf8', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        + Agregar otra pregunta
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', borderTop: '1px solid #27272a', paddingTop: '15px' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{ padding: '8px 15px', background: '#3f3f46', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        style={{ padding: '8px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Guardar Examen
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormCreateExam;