import { useState, useEffect } from "react";
import styles from './css/GenerateToken.module.css';
import stylesForm from './css/Form.module.css';
import Button from "../components/Button";
import { CONFIG_BACKEND } from "../config/config";

export default function GenerateToken() {
  // Estados para Profesores (por defecto ocultos: showProfToken = false)
  const [profToken, setProfToken] = useState("");
  const [profDate, setProfDate] = useState(null);
  const [copiedProf, setCopiedProf] = useState(false);
  const [showProfToken, setShowProfToken] = useState(false);

  // Estados para Alumnos (por defecto ocultos: showStudentToken = false)
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
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();

      if (data.success) {
        if (data.professor) {
          setProfToken(data.professor.content_token);
          // Reemplazamos el espacio por 'T' para asegurar compatibilidad total con el formato de fecha SQL
          setProfDate(new Date(data.professor.created_at.replace(" ", "T")));
        }
        if (data.student) {
          setStudentToken(data.student.content_token);
          setStudentDate(new Date(data.student.created_at.replace(" ", "T")));
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
          setShowProfToken(false);
        } else {
          setStudentToken(data.token);
          setStudentDate(now);
          setCopiedStudent(false);
          setShowStudentToken(false);
        }
        alert("✅ " + data.message);
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

  // Enmascarar token con puntos
  const maskToken = () => {
    return "•".repeat(24);
  };

  return (
    <div className={`${stylesForm.contForm} ${styles.containerCustom}`}>
      <h2>Panel de Administración - Generador de Tokens</h2>
      <p className={styles.subtitleText}>
        Visualiza y administra los códigos de registro activos para profesores y alumnos.
      </p>

      <div className={styles.gridContainer}>
        
        {/* BLOQUE PROFESORES */}
        <div className={styles.cardBlock}>
          <h3>👨‍🏫 Profesores</h3>
          <p className={styles.cardDesc}>Token reutilizable para el cuerpo docente.</p>
          
          <div className={styles.mt20}>
            <Button typeBtn="button" styleBtn={2} onClick={() => generateTokenForRole(2)}>
              Generar Nuevo Token Profesor
            </Button>
          </div>

          <div className={styles.mt20}>
            <div className={styles.tokenRow}>
              <div className={styles.tokenBox}>
                {profToken ? (showProfToken ? profToken : maskToken()) : "No hay token generado"}
              </div>
              {profToken && (
                <button 
                  type="button"
                  onClick={() => setShowProfToken(!showProfToken)}
                  title={showProfToken ? "Ocultar token" : "Ver token"}
                  className={styles.visibilityBtn}
                >
                  {showProfToken ? "🙈" : "👁️"}
                </button>
              )}
            </div>
            
            <div className={styles.dateRow}>
              <span className={styles.dateBold}>{profDate ? 'Generado: ' : ''}</span>
              <span className={isToday(profDate) ? styles.dateGreen : styles.dateNormal}>
                {profDate ? formatReadableDate(profDate) : ""}
              </span>
            </div>

            {profToken && (
              <button 
                type="button"
                onClick={() => handleCopy(profToken, 'prof')}
                className={styles.copyBtn}
              >
                {copiedProf ? "¡Copiado! ✅" : "Copiar Token 📋"}
              </button>
            )}
          </div>
        </div>

        {/* BLOQUE ALUMNOS */}
        <div className={styles.cardBlock}>
          <h3>🎓 Alumnos</h3>
          <p className={styles.cardDesc}>Token reutilizable para ingresos de estudiantes.</p>
          
          <div className={styles.mt20}>
            <Button typeBtn="button" styleBtn={2} onClick={() => generateTokenForRole(3)}>
              Generar Nuevo Token Alumno
            </Button>
          </div>

          <div className={styles.mt20}>
            <div className={styles.tokenRow}>
              <div className={styles.tokenBox}>
                {studentToken ? (showStudentToken ? studentToken : maskToken()) : "No hay token generado"}
              </div>
              {studentToken && (
                <button 
                  type="button"
                  onClick={() => setShowStudentToken(!showStudentToken)}
                  title={showStudentToken ? "Ocultar token" : "Ver token"}
                  className={styles.visibilityBtn}
                >
                  {showStudentToken ? "🙈" : "👁️"}
                </button>
              )}
            </div>
            
            <div className={styles.dateRow}>
              <span className={styles.dateBold}>{studentDate ? 'Generado: ' : ''}</span>
              <span className={isToday(studentDate) ? styles.dateGreen : styles.dateNormal}>
                {studentDate ? formatReadableDate(studentDate) : ""}
              </span>
            </div>

            {studentToken && (
              <button 
                type="button"
                onClick={() => handleCopy(studentToken, 'student')}
                className={styles.copyBtn}
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