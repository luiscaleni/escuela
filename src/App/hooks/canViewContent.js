// utils/permissions.js o dentro de un hook
export const canViewContent = (userCommission, allowedCommissions) => {
    // Si no se requiere comisión específica, se muestra por defecto
    if (!allowedCommissions || allowedCommissions.length === 0) return true;
    
    // Compara si la comisión del usuario está en la lista de permitidas
    return allowedCommissions.includes(userCommission);
};