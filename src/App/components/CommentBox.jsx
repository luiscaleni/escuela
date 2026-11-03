import React, { useState, useEffect } from 'react';
import styles from './css/CommentBox.module.css';
import { CONFIG_BACKEND } from '../config/config';

export default function CommentBox({ tabId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        if (!tabId || tabId === 'exam_tab_special') return;
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/getComments?id_tabs=${tabId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setComments(data.comments);
            }
        } catch (err) {
            console.error("Error al cargar comentarios:", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [tabId]);

    const handleSendComment = async (e, parentId = null) => {
        e.preventDefault();
        const text = parentId ? replyText : newComment;
        if (!text.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/saveComment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    id_tabs: tabId,
                    comment_text: text,
                    parent_id: parentId
                })
            });
            const data = await res.json();
            if (data.success) {
                if (parentId) {
                    setReplyText('');
                    setReplyingTo(null);
                } else {
                    setNewComment('');
                }
                fetchComments();
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error("Error de red:", err);
        } finally {
            setLoading(false);
        }
    };

    if (tabId === 'exam_tab_special') return null; // Opcional: ocultar en la pestaña de exámenes si aplica

    return (
        <div className={styles.commentContainer}>
            <h3>Foro de la Pestaña</h3>

            {/* Input para comentario principal */}
            <form onSubmit={(e) => handleSendComment(e, null)} className={styles.mainForm}>
                    <textarea
                        rows="3"
                        placeholder="Escribe un comentario en esta pestaña..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading} className={styles.btnSubmit}>
                        Comentar
                    </button>
            </form>

            {/* Listado de Comentarios */}
            <div className={styles.listComments}>
                {comments.length === 0 ? (
                    <p className={styles.noComments}>No hay comentarios en esta pestaña todavía.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id_comment} className={styles.commentCard}>
                            <div className={styles.commentHeader}>
                                <span className={styles.author}>{comment.name} {comment.lastname}</span>
                                <span className={styles.date}>{comment.created_at}</span>
                            </div>
                            <p className={styles.commentText}>{comment.comment_text}</p>

                            {/* Mostrar la única respuesta permitida si existe */}
                            {comment.reply ? (
                                <div className={styles.replyCard}>
                                    <div className={styles.commentHeader}>
                                        <span className={styles.author}>↳ {comment.reply.name} {comment.reply.lastname} (Respuesta)</span>
                                        <span className={styles.date}>{comment.reply.created_at}</span>
                                    </div>
                                    <p className={styles.commentText}>{comment.reply.comment_text}</p>
                                </div>
                            ) : (
                                /* Botón para responder (solo si aún no tiene respuesta) */
                                <div className={styles.replySection}>
                                    {replyingTo === comment.id_comment ? (
                                        <form onSubmit={(e) => handleSendComment(e, comment.id_comment)} className={styles.replyForm}>
                                            <input
                                                type="text"
                                                placeholder="Escribe una respuesta única..."
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className={styles.btnReplySubmit}>Responder</button>
                                            <button type="button" onClick={() => setReplyingTo(null)} className={styles.btnCancel}>Cancelar</button>
                                        </form>
                                    ) : (
                                        <button onClick={() => setReplyingTo(comment.id_comment)} className={styles.btnToggleReply}>
                                            Responder (máx. 1)
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}