import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { CONFIG_BACKEND, CONFIG_PATHS } from "../../../config/config" 
import styles from './css/MyCourseDetail.module.css'
import TopButtons from "../../../components/TopButtons"
import LeftTopButton from "../../../components/LeftTopButton"
import RightTopButton from "../../../components/RightTopButton"
import plus from '/icons/utilities/plus.png'
import Modal from "../../../components/Modal"
import FormEditClassDetail from "../../../components/FormEditClassDetail"
import FormCreateExam from "../../../components/FormCreateExam"
import FormDeleteExam from "../../../components/FormDeleteExam"
import { UserContext } from '../../../components/UserProvider'

function MyCourseDetail() {
    const { user } = useContext(UserContext)
    const [course, setCourse] = useState(null)
    const [tabs, setTabs] = useState([]) 
    const [activeTabId, setActiveTabId] = useState(null) 
    const [blocks, setBlocks] = useState([]) 
    
    // Estados para controlar el modal de CREAR PESTAÑA
    const [showTabModal, setShowTabModal] = useState(false)
    const [newTabName, setNewTabName] = useState("")
    const [isTabActive, setIsTabActive] = useState(true)

    // Estados para controlar el modal de AGREGAR CONTENIDO (bloques)
    const [showContainerForm, setShowContainerForm] = useState(false)
    const fnCloseContainerForm = () => setShowContainerForm(false)
    const fnShowContainerForm = () => {
        setShowContainerForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Estado para controlar el modal de CREAR EXAMEN
    const [showExamModal, setShowExamModal] = useState(false)

    // Estados para controlar el MODAL DE DETALLES DE ALUMNOS (Intentos y Cambios de Pestaña)
    const [showExamDetailsModal, setShowExamDetailsModal] = useState(false)
    const [examAttemptsDetail, setExamAttemptsDetail] = useState([])
    const [selectedExamTitle, setSelectedExamTitle] = useState("")
    const [loadingDetails, setLoadingDetails] = useState(false)

    const [loading, setLoading] = useState(true)
    const { id } = useParams() // ID del curso actual (id_matter)
    const location = useLocation()
    const [loactionValue, setLoactionValue] = useState(null)
    const [exams, setExams] = useState([])
    const [examTabActive, setExamTabActive] = useState(0)
    const [examToDelete, setExamToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        if (user.rolId === 1) {
            navigate(CONFIG_PATHS.CAMPUS_PATH)
        }
    },[])

    const loadExams = async (courseId) => {
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/exam/getExams?id_matter=${courseId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const textRes = await res.text();
            if (textRes && textRes.trim() !== "") {
                const data = JSON.parse(textRes);
                if (data.success) {
                    setExams(data.exams || []);
                }
            }
        } catch (err) {
            console.error("Error al cargar exámenes:", err);
        }
    };

    // Función para abrir el modal de detalles y cargar los alumnos que rindieron un examen específico
    const handleOpenExamDetails = async (exam) => {
        setSelectedExamTitle(exam.title_exam);
        setShowExamDetailsModal(true);
        setLoadingDetails(true);

        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/exam/details?id_exam=${exam.id_exam}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setExamAttemptsDetail(data.attempts || []);
            } else {
                setExamAttemptsDetail([]);
            }
        } catch (err) {
            console.error("Error al cargar el detalle de los intentos:", err);
            setExamAttemptsDetail([]);
        } finally {
            setLoadingDetails(false);
        }
    };

    // 1. Cargar datos iniciales del curso, pestañas y exámenes usando el `id`
    useEffect(() => {
        if (!id) return
        loadCourseAndTabs()
        loadExams(id) 
    }, [id])

    const loadCourseAndTabs = async () => {
        setLoading(true)
        try {
            const resCourse = await fetch(`${CONFIG_BACKEND.API_DIR}/course/detail?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (resCourse.ok) {
                const dataCourse = await resCourse.json()
                if (dataCourse && dataCourse.success) {
                    setCourse(dataCourse.result)
                    setExamTabActive(dataCourse.result.exam_tab_active ?? 0)
                }
            }

            const resTabs = await fetch(`${CONFIG_BACKEND.API_DIR}/getTabs?id_matter=${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            
            const textTabs = await resTabs.text();
            if (textTabs && textTabs.trim() !== "") {
                const dataTabs = JSON.parse(textTabs);
                if (dataTabs && dataTabs.success && dataTabs.tabs.length > 0) {
                    setTabs(dataTabs.tabs);

                    const allTabsWithExam = [
                        ...dataTabs.tabs,
                        { id_tabs: 'exam_tab_special', title_tabs: '📝 Exámenes', active: examTabActive }
                    ];

                    const availableForUser = user?.rolId === 3 
                        ? allTabsWithExam.filter(tab => tab.active == 1) 
                        : allTabsWithExam;

                    if (availableForUser.length > 0) {
                        setActiveTabId(availableForUser[0].id_tabs); 
                    } else {
                        setActiveTabId(null);
                    }
                } else {
                    setTabs([]);
                    setActiveTabId('exam_tab_special');
                }
            } else {
                setTabs([]);
                setActiveTabId('exam_tab_special');
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error: ', error)
            setTabs([]);
        } finally {
            setLoading(false)
        }
    }

    // 2. Cargar bloques al cambiar la pestaña activa (si no es la de exámenes)
    useEffect(() => {
        if (!activeTabId || activeTabId === 'exam_tab_special') return
        loadBlocksForTab(activeTabId)
    }, [activeTabId])

    const loadBlocksForTab = async (tabId) => {
        try {
            const resBlocks = await fetch(`${CONFIG_BACKEND.API_DIR}/getClassDetails?id_tabs=${tabId}`, {
                method: 'GET',
                credentials: 'include'
            })
            const textResponse = await resBlocks.text()
            if (textResponse && textResponse.trim() !== "") {
                const dataBlocks = JSON.parse(textResponse)
                if (dataBlocks && dataBlocks.success) {
                    setBlocks(dataBlocks.blocks || [])
                }
            } else {
                setBlocks([])
            }
        } catch (error) {
            console.error("Error al cargar bloques:", error)
            setBlocks([])
        }
    }

    // 3. Función para GUARDAR UNA NUEVA PESTAÑA  
    const handleSaveNewTab = async (e) => {
        e.preventDefault()
        if (!newTabName.trim()) return

        const formData = new FormData()
        formData.append('id_matter', id)
        formData.append('tab_name', newTabName)
        formData.append('active', isTabActive ? 1 : 0)

        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/saveTab`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            const data = await res.json()

            if (data.success) {
                const newTab = {
                    id_tabs: data.id_tabs,
                    title_tabs: newTabName,
                    active: isTabActive ? 1 : 0
                }
                setTabs([...tabs, newTab])
                setActiveTabId(data.id_tabs)
                setNewTabName("")
                setIsTabActive(true)
                setShowTabModal(false)
            } else {
                alert("Error al crear la pestaña: " + data.message)
            }
        } catch (error) {
            console.error("Error de red:", error)
        }
    }

    const handleToggleExamTab = async () => {
        const newStatus = examTabActive == 1 ? 0 : 1;

        const formData = new FormData();
        formData.append('id_matter', id);
        formData.append('active', newStatus);

        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/updateExamTabStatus`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setExamTabActive(newStatus);
            } else {
                alert("Error al actualizar la visibilidad: " + data.message);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    // Función para alternar el estado activo/inactivo de una pestaña
    const handleToggleTabActive = async (tabId, currentActiveStatus) => {
        const newStatus = currentActiveStatus == 1 ? 0 : 1;
        
        const formData = new FormData();
        formData.append('id_tabs', tabId);
        formData.append('active', newStatus);

        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/updateTabStatus`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setTabs(tabs.map(t => t.id_tabs === tabId ? { ...t, active: newStatus } : t));
            } else {
                alert("Error al actualizar el estado: " + data.message);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    useEffect(() => {
        if (!course) return
        if (user?.rolId === 1 || user?.rolId === 2) {
            setLoactionValue('/campus/profesor-cursos')
        } else if (user?.rolId === 3) {
            setLoactionValue('/campus/mis-cursos') 
        }
    }, [course, user])

    // Construcción del listado de pestañas visibles incluyendo la de exámenes al final
    const allTabsWithExam = [
        ...tabs,
        {
            id_tabs: 'exam_tab_special',
            title_tabs: '📝 Exámenes',
            active: examTabActive 
        }
    ];

    const visibleTabs = user?.rolId === 3 
        ? allTabsWithExam.filter(tab => tab.active == 1) 
        : allTabsWithExam;
    
    const uniqueBlocks = blocks.filter((block, index, self) => 
        index === self.findIndex((b) => (
            b.id_content_blocks === block.id_content_blocks
        ))
    )

    const handleTakeExam = (exam) => {
        const now = new Date();
        const endTime = new Date(exam.end_time);

        if (now > endTime) {
            alert("⚠️ El tiempo de este examen ya ha finalizado y no se puede rendir.");
            return;
        }

        navigate(`/campus/exam/take/${exam.id_exam}`);
    };

    if (loading) return <p>Cargando detalle...</p>

    return (
        <>
        {/* MODAL PARA CREAR NUEVA PESTAÑA */}
        {showTabModal && (
            <Modal id="modalTab" onClickElm={() => setShowTabModal(false)}>
                <form onSubmit={handleSaveNewTab} style={{ padding: '20px', background: '#1d1d1d', color: '#fff', borderRadius: '8px' }}>
                    <h3 style={{color:'white'}}>Crear nueva pestaña</h3>
                    <input 
                        type="text" 
                        placeholder="Nombre de la pestaña (ej. Unidad 1)" 
                        value={newTabName}
                        onChange={(e) => setNewTabName(e.target.value)}
                        style={{ width: '100%', padding: '10px', margin: '15px 0' }}
                        required
                    />
                    
                    <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                            type="checkbox" 
                            id="activeTabCheck" 
                            checked={isTabActive}
                            onChange={(e) => setIsTabActive(e.target.checked)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="activeTabCheck" style={{ cursor: 'pointer' }}>Visible / Activa para los alumnos</label>
                    </div>

                    <button type="submit" style={{ padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        Guardar pestaña
                    </button>
                </form>
            </Modal>
        )}

        {/* MODAL PARA CREAR EXAMEN */}
        {showExamModal && (
            <Modal id="modalExam" onClickElm={() => setShowExamModal(false)}>
                <FormCreateExam 
                    courseId={id}
                    onExamSaved={() => {
                        setShowExamModal(false)
                        loadExams(id) 
                    }}
                    onCancel={() => setShowExamModal(false)}
                />
            </Modal>
        )}

        {/* MODAL PARA VER DETALLE DE ALUMNOS Y CAMBIOS DE PESTAÑA (PROFESOR) */}
        {showExamDetailsModal && (
            <Modal id="modalExamDetails" onClickElm={() => setShowExamDetailsModal(false)}>
                <div style={{ background: '#18181b', padding: '24px', borderRadius: '12px', color: '#fff', width: '100%', maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #27272a', paddingBottom: '12px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa' }}>
                            📊 Auditoría: {selectedExamTitle}
                        </h3>
                        <button 
                            onClick={() => setShowExamDetailsModal(false)}
                            style={{ background: 'transparent', border: 'none', color: '#a1a1aa', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            ✕
                        </button>
                    </div>

                    {loadingDetails ? (
                        <p style={{ textAlign: 'center', padding: '20px', color: '#a1a1aa' }}>Cargando registros de alumnos...</p>
                    ) : examAttemptsDetail.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '20px', color: '#a1a1aa' }}>Ningún alumno ha completado este examen todavía.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #27272a', color: '#a1a1aa' }}>
                                        <th style={{ padding: '10px' }}>Estudiante</th>
                                        <th style={{ padding: '10px' }}>Correo</th>
                                        <th style={{ padding: '10px' }}>Puntaje</th>
                                        <th style={{ padding: '10px' }}>Cambios de Pestaña</th>
                                        <th style={{ padding: '10px' }}>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examAttemptsDetail.map((att) => (
                                        <tr key={att.id_attempt} style={{ borderBottom: '1px solid #27272a' }}>
                                            <td style={{ padding: '12px', fontWeight: '500' }}>{att.name} {att.lastname}</td>
                                            <td style={{ padding: '12px', color: '#a1a1aa' }}>{att.email}</td>
                                            <td style={{ padding: '12px', fontWeight: 'bold', color: '#34d399' }}>{att.score} / 10</td>
                                            <td style={{ padding: '12px' }}>
                                                {att.tab_switches > 0 ? (
                                                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                                                        ⚠️ {att.tab_switches} {att.tab_switches == 1 ? 'vez' : 'veces'}
                                                    </span>
                                                ) : (
                                                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>
                                                        0 (Limpio)
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ padding: '12px', textTransform: 'capitalize', color: '#d4d4d8' }}>{att.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Modal>
        )}

        {/* MODAL PARA AGREGAR O EDITAR CONTENIDO (BLOQUES) */}
        {showContainerForm && user && (user.rolId === 1 || user.rolId === 2) && (
            <Modal id="containerFloat" onClickElm={fnCloseContainerForm}>
                <FormEditClassDetail 
                    idTabs={activeTabId} 
                    initialBlocks={blocks} 
                    onSaved={(updatedBlocks) => {
                        if (updatedBlocks && updatedBlocks.length > 0) {
                            setBlocks(updatedBlocks)
                        } else {
                            loadBlocksForTab(activeTabId)
                        }
                        fnCloseContainerForm()
                    }} 
                />
            </Modal>
        )}

        {/* MODAL PARA ELIMINAR EXAMEN (FLUJO DE DOS PASOS) */}
        {showDeleteModal && examToDelete && (
            <Modal id="modalDeleteExam" onClickElm={() => setShowDeleteModal(false)}>
                <FormDeleteExam 
                    exam={examToDelete}
                    onExamDeleted={() => {
                        setShowDeleteModal(false);
                        setExamToDelete(null);
                        loadExams(id); // Recarga la lista de exámenes
                    }}
                    onCancel={() => {
                        setShowDeleteModal(false);
                        setExamToDelete(null);
                    }}
                />
            </Modal>
        )}

            {/* --- BOTONES SUPERIORES --- */}
            <TopButtons>
                <LeftTopButton locationElm={loactionValue} text="Volver" typeElm="expand" />
                {user && (user.rolId === 1 || user.rolId === 2) && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <RightTopButton 
                            onClick={() => setShowTabModal(true)} 
                            text="Agregar pestaña" 
                            typeElm="expand" 
                            imgElm={plus} 
                        />
                    </div>
                )}
            </TopButtons>
            
            <p className={styles.routes}>
                {course && (
                    <>
                        {course.name_sport ? `Deporte: ${course.name_sport}` : ''}
                        {course.name_discip && course.name_discip !== course.name_matter ? ` | Disciplina: ${course.name_discip}` : ''}
                        {course.name_matter ? ` | Materia: ${course.name_matter}` : ''}
                    </>
                )}
                <br /><br />
                Estás en: {location.pathname} 
            </p>
            {course && <h2>{course.title_course}</h2>}

            {/* --- BARRA DE PESTAÑAS (TABS) --- */}
            {visibleTabs.length === 0 ? (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <p>
                        {user?.rolId === 3 
                            ? "Este curso aún no tiene contenido disponible." 
                            : "Este curso aún no tiene pestañas creadas."}
                    </p>
                </div>
            ) : (
                <div className={styles.tabsContainer} style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
                    {visibleTabs.map((tab) => (
                        <button
                            key={tab.id_tabs}
                            onClick={() => setActiveTabId(tab.id_tabs)}
                            className={activeTabId === tab.id_tabs ? 'tabs tabs-active' : 'tabs'}
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                background: activeTabId === tab.id_tabs ? '#4f46e5' : '#1e1b4b',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                fontWeight: activeTabId === tab.id_tabs ? 'bold' : 'normal',
                                minWidth: '100px',
                                opacity: (user?.rolId !== 3 && tab.active == 0) ? 0.5 : 1
                            }}
                        >
                            {tab.title_tabs || tab.tab_name || 'Pestaña sin nombre'} 
                            {user?.rolId !== 3 && tab.active == 0 && ' (Inactiva)'}
                        </button>
                    ))}
                </div>
            )}
            
            {/* --- CONTENIDO DE LA PESTAÑA ACTIVA --- */}
            {visibleTabs.length > 0 && activeTabId && (
                <div className={styles.classContentContainer}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        {user && (user.rolId === 1 || user.rolId === 2) && (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {/* Botón de Mostrar / Ocultar unificado */}
                                {activeTabId === 'exam_tab_special' ? (
                                    <button 
                                        onClick={handleToggleExamTab}
                                        style={{ 
                                            padding: '8px 15px', 
                                            background: examTabActive == 1 ? '#d97706' : '#6b7280', 
                                            color: '#fff', 
                                            border: 'none', 
                                            borderRadius: '5px', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        {examTabActive == 1 ? '👁️ Ocultar (Inactivar)' : '👁️‍🗨️ Mostrar (Activar)'}
                                    </button>
                                ) : (
                                    (() => {
                                        const currentTab = tabs.find(t => t.id_tabs === activeTabId);
                                        if (!currentTab) return null;
                                        const isActive = currentTab.active == 1;

                                        return (
                                            <button 
                                                onClick={() => handleToggleTabActive(currentTab.id_tabs, currentTab.active)}
                                                style={{ 
                                                    padding: '8px 15px', 
                                                    background: isActive ? '#d97706' : '#6b7280', 
                                                    color: '#fff', 
                                                    border: 'none', 
                                                    borderRadius: '5px', 
                                                    cursor: 'pointer' 
                                                }}
                                            >
                                                {isActive ? '👁️ Ocultar (Inactivar)' : '👁️‍🗨️ Mostrar (Activar)'}
                                            </button>
                                        );
                                    })()
                                )}

                                {activeTabId === 'exam_tab_special' ? (
                                    <button 
                                        onClick={() => setShowExamModal(true)}
                                        style={{ padding: '8px 15px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        + Crear nuevo examen
                                    </button>
                                ) : (
                                    <button 
                                        onClick={fnShowContainerForm}
                                        style={{ padding: '8px 15px', background: blocks.length > 0 ? '#4f46e5' : '#10b981', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                        {blocks.length > 0 ? '✏️ Editar contenido' : '+ Agregar contenido'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* SI LA PESTAÑA ACTIVA ES LA DE EXÁMENES */}
                    {activeTabId === 'exam_tab_special' ? (
                        <div style={{ background: '#18181b', padding: '20px', borderRadius: '8px', color: '#fff', marginTop: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>📝 Evaluaciones del Curso</h3>
                            </div>

                            {exams.length === 0 ? (
                                <p style={{ color: '#a1a1aa', fontSize: '14px' }}>No hay exámenes habilitados por el momento.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {exams
                                        .sort((a, b) => b.id_exam - a.id_exam)
                                        .map((exam) => (
                                            <div key={exam.id_exam} style={{ background: '#27272a', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap', flexDirection:'column', justifyContent:'center' }}>
                                                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa' }}>{exam.title_exam}</h4>
                                                        
                                                        {/* Conteo interactivo / botón para profesores */}
                                                        {user?.rolId !== 3 && (
                                                            <button 
                                                                onClick={() => handleOpenExamDetails(exam)}
                                                                title="Haz clic para ver el detalle de los alumnos y cambios de pestaña"
                                                                style={{ 
                                                                    fontSize: '12px', 
                                                                    background: '#312e81', 
                                                                    color: '#c7d2fe', 
                                                                    padding: '4px 12px', 
                                                                    borderRadius: '12px', 
                                                                    fontWeight: '500', 
                                                                    border: '1px solid #4338ca',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '6px'
                                                                }}
                                                            >
                                                                ✅ Alumnos que completaron: <strong>{exam.completed_count ?? 0}</strong> <span style={{ textDecoration: 'underline', fontSize: '11px' }}>(Ver detalle 🔍)</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '6px' }}>
                                                        Apertura: {exam.start_time} | Cierre: {exam.end_time} | Duración: {exam.time_limit} mins
                                                    </p>
                                                </div>

                                                {/* Lógica para Alumnos vs Profesores */}
                                        {user?.rolId === 3 ? (
                                            (exam.student_attempt_status === 'completed' || exam.student_attempt_status === 'expired') ? (
                                                <span style={{ fontSize: '13px', background: '#065f46', color: '#a7f3d0', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold' }}>
                                                    ✅ Ya rendiste este examen
                                                </span>
                                            ) : (
                                                <button 
                                                    onClick={() => handleTakeExam(exam)}
                                                    style={{ padding: '8px 15px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                                >
                                                    Rendir examen
                                                </button>
                                            )
                                        ) : (
                                            /* OPCIONES DE PROFESOR: Botón Eliminar Examen */
                                                <button 
                                                    onClick={() => {
                                                        setExamToDelete(exam);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    style={{ padding: '8px 15px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                                                >
                                                    🗑️ Eliminar examen
                                                </button>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ) : (
                        // BLOQUES DE CONTENIDO NORMALES DE LAS CLASES
                        blocks.length === 0 ? (
                            <p>No hay contenidos en esta pestaña. Haz clic en "Agregar contenido" para comenzar.</p>
                        ) : (
                            uniqueBlocks.map((block, index) => {
                                const getFileDetails = (filePath) => {
                                    if (!filePath) return { type: 'document', icon: '📁', label: 'Ver archivo adjunto' };
                                    const ext = filePath.split('.').pop().toLowerCase();
                                    
                                    if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
                                        return { type: 'video' };
                                    }
                                    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
                                        return { type: 'image' };
                                    }
                                    if (['doc', 'docx'].includes(ext)) {
                                        return { type: 'document', icon: '📄', label: 'Ver documento Word' };
                                    }
                                    if (['pdf'].includes(ext)) {
                                        return { type: 'document', icon: '📑', label: 'Ver archivo PDF' };
                                    }
                                    if (['xls', 'xlsx'].includes(ext)) {
                                        return { type: 'document', icon: '📊', label: 'Ver planilla de Excel' };
                                    }
                                    return { type: 'document', icon: '📁', label: 'Ver archivo adjunto' };
                                };

                                const fileInfo = block.content_type === 'file' ? getFileDetails(block.content_value) : null;
                                const rawFileName = block.content_value ? block.content_value.split('/').pop() : '';
                                const originalFileName = rawFileName.includes('_') ? rawFileName.substring(rawFileName.indexOf('_') + 1) : rawFileName;

                                return (
                                    <div key={block.id_content_blocks || index} className={styles.blockItem} style={{ background: '#18181b', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                                        {block.content_type === 'text' && <p>{block.content_value}</p>}
                                        {block.content_type === 'textarea' && <div className={styles.textAreaContent}>{block.content_value}</div>}
                                        
                                        {block.content_type === 'file' && block.content_value && (
                                            <div className={styles.fileContent}>
                                                {fileInfo.type === 'video' && (
                                                    <div style={{ textAlign: 'center' }}>
                                                        <video 
                                                            controls 
                                                            controlsList="nodownload" /* Oculta el botón de descarga nativo */
                                                            onContextMenu={(e) => e.preventDefault()} /* Deshabilita el clic derecho sobre el video */
                                                            preload="metadata"
                                                            style={{ width: '100%', minHeight: '400px', maxHeight: '500px', borderRadius: '6px', background: '#000' }}
                                                            src={`${CONFIG_BACKEND.API_DIR}/${block.content_value}`}
                                                        >
                                                            Tu navegador no soporta la reproducción de videos.
                                                        </video>
                                                        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px' }}>🎬 {originalFileName}</p>
                                                    </div>
                                                )}

                                                {fileInfo.type === 'image' && (
                                                    <div style={{ textAlign: 'center' }}>
                                                        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px', padding:'1rem' }}>🖼️ {originalFileName}</p>
                                                        <img 
                                                            src={`${CONFIG_BACKEND.API_DIR}/${block.content_value}`} 
                                                            alt="Contenido" 
                                                            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '6px', objectFit: 'contain' }} 
                                                        />
                                                    </div>
                                                )}

                                                {fileInfo.type === 'document' && (
                                                    <a 
                                                        href={`${CONFIG_BACKEND.API_DIR}/${block.content_value}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        style={{ color: '#60a5fa', fontWeight: 'bold', textDecoration: 'none', display: 'block', fontSize: '15px' }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#27272a', padding: '12px 15px', borderRadius: '6px' }}>
                                                            <span style={{ fontSize: '28px' }}>{fileInfo.icon}</span>
                                                            <div style={{ color: '#60a5fa', fontWeight: 'bold', textDecoration: 'none', display: 'flex', flexDirection:'column', fontSize: '15px' }}>
                                                                    {originalFileName}
                                                                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{fileInfo.label}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )
                    )}
                </div>
            )}
        </>
    )
}

export default MyCourseDetail;