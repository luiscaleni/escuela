import ContProfessor from './ContProfessor'
import styles from './css/ProfessorRow.module.css'

function ProfessorRow({ professors = [] }) {
    return ( 
        <div className={styles.container}>
            <div className={styles.headers}>
                <p className={styles.title}>Profesor/a</p>
                <p>Deportes</p>
                <p>Disciplinas</p>
                <p>Materias habilitadas</p>
                <p>Acción</p>
            </div>
            <div className={styles.contentProfessors}>
                {professors && professors.length > 0 ? (
                    professors.map(prof => (
                        <ContProfessor key={prof.id_professor} professor={prof} />
                    ))
                ) : (
                    <p>No hay profesores para mostrar.</p>
                )}
            </div>
        </div>
    )
}

export default ProfessorRow