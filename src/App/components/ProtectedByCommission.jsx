import React, { useContext } from 'react';
import { UserContext } from './UserProvider'; // O de donde obtengas los datos del usuario

const ProtectedByCommission = ({ children, allowedCommissions }) => {
    const { user } = useContext(UserContext);

    // Si no hay usuario o no tiene comisión asignada, por seguridad puedes ocultarlo
    if (!user || !user.commission) return null;

    // Validamos si la comisión del usuario está permitida para ver este contenido
    const hasAccess = allowedCommissions.includes(user.commission);

    if (!hasAccess) {
        return null; // Opcional: puedes retornar un mensaje como <p>Contenido no disponible para tu comisión</p>
    }

    return <>{children}</>;
};

export default ProtectedByCommission;