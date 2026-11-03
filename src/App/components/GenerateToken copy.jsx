import { useState, useEffect } from "react";
import styles from '../components/css/Form.module.css';
import Button from "../components/Button";
import { CONFIG_BACKEND } from "../config/config";

export default function GenerateToken() {
  // Estados para Profesores
  const [profToken, setProfToken] = useState("");
  const [profDate, setProfDate] = useState(null);
  const [copiedProf, setCopiedProf] = useState(false);
  const [showProfToken, setShowProfToken] = useState(false);

  // Estados para Alumnos
  const [studentToken, setStudentToken] = useState("");
  const [studentDate, setStudentDate] = useState(null);
  const [copiedStudent, setCopiedStudent] = useState(false);
  const [showStudentToken, setShowStudentToken] = useState(false);

  // Cargar los tokens activos automáticamente ni bien se abre el componente
  useEffect(() => {
    fetchActiveTokens();
  }, []);

  const fetchActiveTokens = async () => {
    try {
      const res = await fetch(`${CONFIG_BACKEND.API_DIR}/getConsultActiveTokens`, {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();

      if (data.success) {
        // Si el backend devuelve el token del profesor
        if (data.professor) {
          setProfToken(data.professor.content_token);
          setProfDate(new Date(data.professor.created_at));
        }
        // Si el backend devuelve el token del alumno
        if (data.student) {
          setStudentToken(data.student.content_token);
          setStudentDate(new Date(data.student.created_at));
        }
      }
    } catch (error) {
      console.error("Error al cargar los tokens activos:", error);
    }
  };

  // Función para generar o actualizar el token por rol
  const generateTokenForRole = async (roleId) => {
    try {
      const res = await fetch(`${CONFIG_BACKEND.API_DIR}/generateToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role_id: roleId, is_single_use: 0 })
      });
      const data = await res.json();

      if (data.success) {
        const now = new Date();
        if (roleId === 2) {
          setProfToken(data.token);
          setProfDate(now);
          setCopiedProf(false);
          setShowProfToken(false); // Oculto por seguridad al generarlo nuevo
        } else {
          setStudentToken(data.token);
          setStudentDate(now);
          setCopiedStudent(false);
          setShowStudentToken(false); // Oculto por seguridad al generarlo nuevo
        }
      } else {
        alert("❌ Error al generar el token: " + data.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("❌ Error de conexión con el servidor");
    }
  };

  // Función para copiar al portapapeles
  const handleCopy = (tokenText, roleType) => {
    navigator.clipboard.writeText(tokenText);
    if (roleType === 'prof') {
      setCopiedProf(true);
      setTimeout(() => setCopiedProf(false), 2000);
    } else {
      setCopiedStudent(true);
      setTimeout(() => setCopiedStudent(false), 2000);
    }
  };

  // Verificar si la fecha es hoy
  const isToday = (dateObject) => {
    if (!dateObject) return false;
    const today = new Date();
    return (
      dateObject.getDate() === today.getDate() &&
      dateObject.getMonth() === today.getMonth() &&
      dateObject.getFullYear() === today.getFullYear()
    );
  };

  // Formato de fecha legible
  const formatReadableDate = (dateObject) => {
    if (!dateObject) return "";
    return dateObject.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Enmascarar token
  const maskToken = () => {
    return "•".repeat(24);
  };

  return (
    <div className={styles.contForm} style={{ maxWidth: '900px', margin: '40px auto', padding: '30px' }}>
      <h2>Panel de Administración - Generador de Tokens</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Visualiza y administra los códigos de registro activos para profesores y alumnos.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* BLOQUE PROFESORES */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fdfdfd' }}>
          <h3>👨‍🏫 Profesores</h3>
          <p style={{ fontSize: '13px', color: '#555' }}>Token reutilizable para el cuerpo docente.</p>
          
          <Button typeBtn="button" styleBtn={2} onClick={() => generateTokenForRole(2)}>
            Generar Nuevo Token Profesor
          </Button>

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#eee', padding: '8px', borderRadius: '5px', wordBreak: 'break-all', fontFamily: 'monospace', flex: 1, fontSize: '12px' }}>
                {profToken ? (showProfToken ? profToken : maskToken()) : "No hay token generado"}
              </div>
              {profToken && (
                <button 
                  onClick={() => setShowProfToken(!showProfToken)}
                  title={showProfToken ? "Ocultar token" : "Ver token"}
                  style={{ background: 'none', border: '1px solid #ccc', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                >
                  {showProfToken ? "🙈" : "👁️"}
                </button>
              )}
            </div>
            
            <div style={{ marginTop: '10px', fontSize: '13px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: 'black' }}>Generado: </span>
              <span style={{ color: isToday(profDate) ? 'green' : 'black', fontWeight: isToday(profDate) ? 'bold' : 'normal' }}>
                {profDate ? formatReadableDate(profDate) : ""}
              </span>
              {isToday(profDate) && (
                <span style={{ color: '#777', fontSize: '12px', fontStyle: 'italic' }}>
                  (Este código se generó hoy)
                </span>
              )}
            </div>

            {profToken && (
              <button 
                onClick={() => handleCopy(profToken, 'prof')}
                style={{ marginTop: '12px', padding: '6px 12px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'block', width: '100%' }}
              >
                {copiedProf ? "¡Copiado! ✅" : "Copiar Token 📋"}
              </button>
            )}
          </div>
        </div>

        {/* BLOQUE ALUMNOS */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fdfdfd' }}>
          <h3>🎓 Alumnos</h3>
          <p style={{ fontSize: '13px', color: '#555' }}>Token reutilizable para ingresos de estudiantes.</p>
          
          <Button typeBtn="button" styleBtn={2} onClick={() => generateTokenForRole(3)}>
            Generar Nuevo Token Alumno
          </Button>

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#eee', padding: '8px', borderRadius: '5px', wordBreak: 'break-all', fontFamily: 'monospace', flex: 1, fontSize: '12px' }}>
                {studentToken ? (showStudentToken ? studentToken : maskToken()) : "No hay token generado"}
              </div>
              {studentToken && (
                <button 
                  onClick={() => setShowStudentToken(!showStudentToken)}
                  title={showStudentToken ? "Ocultar token" : "Ver token"}
                  style={{ background: 'none', border: '1px solid #ccc', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                >
                  {showStudentToken ? "🙈" : "👁️"}
                </button>
              )}
            </div>
            
            <div style={{ marginTop: '10px', fontSize: '13px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Generado: </span>
              <span style={{ color: isToday(studentDate) ? 'green' : 'black', fontWeight: isToday(studentDate) ? 'bold' : 'normal' }}>
                {studentDate ? formatReadableDate(studentDate) : ""}
              </span>
              {isToday(studentDate) && (
                <span style={{ color: '#777', fontSize: '12px', fontStyle: 'italic' }}>
                  (Este código se generó hoy)
                </span>
              )}
            </div>

            {studentToken && (
              <button 
                onClick={() => handleCopy(studentToken, 'student')}
                style={{ marginTop: '12px', padding: '6px 12px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'block', width: '100%' }}
              >
                {copiedStudent ? "¡Copiado! ✅" : "Copiar Token 📋"}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}