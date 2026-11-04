// Configuration file for the application
// This file contains constants that are used throughout the application

export const CONFIG_PRODUCTION_DATA = {
    APP_URL: 'https://beta.infy.uk'
}

export const CONFIG_SOCIAL_NETWORK = {
    IG: 'https://www.instagram.com/arbitracfp/',
    FB: 'https://www.facebook.com/',
    TK: 'https://www.tiktok.com/',
    EMAIL: 'mailto: arbitracfp@gmail.com'
}

export const CONFIG_BACKEND = {
    API_DIR: "http://localhost/api"
    /*API_DIR: import.meta.env.VITE_API_BASE_URL*/
    /*API_IMPORT_URL: import.meta.env.VITE_API_BASE_URL*/
}

export const CONFIG_PATHS = {
    ROOT_PATH: "/",
    HOME_PATH: "/",
    INDEX_PATH: "/index.php",
    SPORTS_PATH: "/deportes",
    ABOUT_US_PATH: "/acerca-de",
    FORMATION_PATH: "/formacion",
    RESOURCES_PATH: "/recursos",
    CONTACT_PATH: "/contacto",
    PRIVACY_PATH: "/politica-de-privacidad",
    TOKEN_EXPIRED_PATH:"/tiempo-expirado",

    REGISTER_PATH: "/registro",
    LOGIN_PATH: "/login",
    FORGET_PASSW_PATH:"/ForgetPassw",
    RESET_PASSW:"/ResetPassw",
    LOGOUT_PATH: "/logout",
    CONFIG_PATH: "/configuracion",
    CONFIG_EDIT_PATH: "/editar-configuracion",
    CONFIG_PASSW_PATH: "/passw",
    HELP_PATH: "/ayuda",

    PROFILE_PATH: "/perfil",
    PROFILE_EDIT_PATH: "/editar-perfil",
    EDIT_POST_PATH: "/editar-publicacion",
    FAQ_PATH: "/faq",
    SUCCESS_PATH: "/registro-exitoso",
    
    CAMPUS_PATH: "/campus",
    YOUR_WELLCOME_PATH: "bienvenida",
    
    CAMPUS_MANAGE_SPORTS_AND_DISCIPLINES_PATH: "gestion-deportes-disciplinas",
    CAMPUS_MANAGE_COMISSIONS_PATH: "gestion-comisiones",
    CAMPUS_MANAGE_PROFESSORS_PATH: "gestion-profesores",
    CAMPUS_MANAGE_STUDENTS_PATH:"gestion-alumnos",
    CAMPUS_MANAGE_MATTERS_PATH:"gestion-materias",
    CAMPUS_MANAGE_CAMPUS_PATH:"gestion-campus",

    CAMPUS_COURSES_LIST_PROFESSOR_PATH: "profesor-cursos",
    
    CAMPUS_MY_COURSES_PATH: "mis-cursos",
    CAMPUS_MY_COURSES_DETAIL_PATH: "mis-cursos/detalles",
    CAMPUS_COURSE_INSCRIPTIONS: "inscribirme-a-cursos",
}

export const CONFIG_NAMES_COUNTRYS = [
    "Argentina"
]

export const ENABLE_TRANSLATION = false