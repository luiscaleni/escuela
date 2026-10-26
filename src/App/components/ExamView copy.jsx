import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CONFIG_BACKEND } from '../config/config';
import Container from './Container';
import styles from './css/ExamView.module.css';

const ExamView = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [examData, setExamData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const { id_exam } = useParams();

    // 1. Cargar el examen al montar el componente
    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await fetch(`${CONFIG_BACKEND.API_DIR}/exam/take`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ id_exam: id_exam })
                });
                const data = await response.json();

                if (!data.success) {
                    setErrorMsg(data.message);
                    setLoading(false);
                    return;
                }

                setExamData(data.exam);
                setQuestions(data.questions);
                setAnswers(data.saved_answers || {});

                // Normalizar fecha para evitar NaN
                if (data.exam && data.exam.end_time) {
                    const endTime = new Date(data.exam.end_time.replace(/-/g, '/')).getTime();
                    const now = new Date().getTime();
                    const secondsRemaining = Math.floor((endTime - now) / 1000);
                    setTimeLeft(secondsRemaining > 0 ? secondsRemaining : 0);
                } else {
                    setTimeLeft(0);
                }

                setLoading(false);
            } catch (err) {
                setErrorMsg('Error de conexión con el servidor');
                setLoading(false);
            }
        };

        fetchExam();
    }, [id_exam]);

    // 2. Temporizador regresivo en tiempo real (Síncrono para evitar NaN)
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // 2.1 Efecto separado para manejar el cierre automático cuando el tiempo llega a 0
    useEffect(() => {
        if (timeLeft === 0 && examData && examData.id_attempt) {
            const handleTimeout = async () => {
                try {
                    await fetch(`${CONFIG_BACKEND.API_DIR}/exam/timeout`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ id_attempt: examData.id_attempt })
                    });
                } catch (err) {
                    console.error('Error al cerrar el examen por tiempo agotado');
                }

                alert('El tiempo se ha agotado. El examen ha sido enviado automáticamente con las respuestas guardadas.');
                navigate('/campus');
            };

            handleTimeout();
        }
    }, [timeLeft, examData, navigate]);

    // 3. Manejar la selección de una opción
    const handleSelectOption = async (id_question, id_option) => {
        setAnswers((prev) => ({
            ...prev,
            [id_question]: id_option
        }));

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/exam/saveAnswer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    id_attempt: examData.id_attempt,
                    id_question,
                    selected_option_id: id_option
                })
            });
            const data = await response.json();

            if (data.expired) {
                alert('El tiempo del examen ha expirado.');
                navigate('/campus');
            }
        } catch (err) {
            console.error('Error al guardar la respuesta en segundo plano');
        }
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center py-20">
                <div className="text-gray-300 font-medium text-lg animate-pulse">Cargando evaluación...</div>
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className="w-full flex items-center justify-center py-12 px-4">
                <div className="max-w-lg w-full bg-white text-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-200 text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Aviso del Examen</h2>
                    <p className="text-gray-600 mb-6 text-base leading-relaxed">{errorMsg}</p>
                    <button
                        onClick={() => navigate('/campus')}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-md"
                    >
                        Volver al Campus
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isAnswered = answers[currentQuestion.id_question] !== undefined;

    const minutes = Math.floor((timeLeft || 0) / 60);
    const seconds = (timeLeft || 0) % 60;

    return (
        <Container>
            <div className={styles.cont}>
                <div className={styles.contExam}>
                    {/* Reloj compacto y elegante */}
                    <div className={styles.contTimer}>
                        <span>⏳</span>
                        <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                    </div>
                    
                    {/* Cabecera del examen */}
                    <div className={styles.contHeaders}>
                        <div className={styles.headerExam}>
                            <span>Evaluación oficial</span>
                            <h2>{examData?.title}</h2>
                        </div>
                    </div>

                    {/* Cuerpo de la pregunta */}
                    <div className={styles.contGralAnsw}>
                        <div className={styles.contNumAnsw}>
                            <span>
                                Pregunta {currentIndex + 1} de {questions.length}
                            </span>
                        </div>

                        <h2>
                            {currentQuestion.question_text}
                        </h2>

                        {/* Opciones de respuesta */}
                        <div className={styles.questions}>
                            {currentQuestion.options.map((option) => {
                                const isSelected = answers[currentQuestion.id_question] === option.id_option;
                                return (
                                    <div
                                        key={option.id_option}
                                        onClick={() => handleSelectOption(currentQuestion.id_question, option.id_option)}
                                        className={`${styles.contQuest} ${
                                            isSelected 
                                                ? styles.contQuestTrue
                                                : styles.contQuestFalse
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question_${currentQuestion.id_question}`}
                                            checked={isSelected}
                                            onChange={() => handleSelectOption(currentQuestion.id_question, option.id_option)}
                                        />
                                        <span>
                                            {option.option_text}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Botones de navegación inferiores */}
                        <div className={styles.contBtns}>
                            <button
                                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                disabled={currentIndex === 0}
                                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                Anterior
                            </button>

                            {currentIndex < questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                                    disabled={!isAnswered}
                                    title='Siguiente'
                                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    onClick={async () => {
                                        if (confirm('¿Estás seguro de finalizar el examen? Una vez finalizado no podrás volver a ingresar.')) {
                                            try {
                                                await fetch(`${CONFIG_BACKEND.API_DIR}/exam/finish`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    credentials: 'include',
                                                    body: JSON.stringify({ id_attempt: examData.id_attempt })
                                                });
                                            } catch (err) {
                                                console.error('Error al notificar la finalización del examen');
                                            }
                                            navigate('/campus');
                                        }
                                    }}
                                    disabled={!isAnswered}
                                    className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                                >
                                    Finalizar Examen
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    );
};

export default ExamView;