// Configuration file for the application
// This file contains constants that are used throughout the application

export const CONFIG_PRODUCTION_DATA = {
    APP_URL: 'https://dpisud-beta.infy.uk'
}

export const CONFIG_SOCIAL_NETWORK = {
    FB: 'https://www.facebook.com/',
    IG: 'https://www.instagram.com/',
    IG: 'https://www.instagram.com/',
    YT: 'https://www.youtube.com/',
    EMAIL: 'mailto:luis.caleni@gmail.com'
}

export const CONFIG_BACKEND = {
    API_DIR: "http://localhost/api"
    /*API_DIR: import.meta.env.VITE_API_BASE_URL*/
    /*API_IMPORT_URL: import.meta.env.VITE_API_BASE_URL*/
}

export const CONFIG_PATHS = {
    ROOT_Path: "/",
    HOME_PATH: "/",
    INDEX_PATH: "/index.php",
    SPORTS_PATH: "/deportes",
    ABOUT_US_PATH: "/acerca-de",
    RESOURCES_PATH: "/recursos",
    CONTACT_PATH: "/contacto",

    REGISTER_PATH: "/registro",
    LOGIN_PATH: "/login",
    FORGET_PASSW_PATH:"/ForgetPassw",
    RESET_PASSW:"/ResetPassw",
    LOGOUT_PATH: "/logout",
    CONFIG_PATH: "/configuracion",
    CONFIG_EDIT_PATH: "/editar-configuracion",
    CONFIG_PASSW_PATH: "/passw",
    HELP_PATH: "/ayuda",

    YOUR_WELLCOME_PATH: "/bienvenida",
    PROFILE_PATH: "/perfil",
    PROFILE_EDIT_PATH: "/editar-perfil",
    EDIT_POST_PATH: "/editar-publicacion",
    SUCCESS_PATH: "/registro-exitoso",

    CAMPUS_PATH: "/campus",
    CAMPUS_MY_COURSES_PATH: "/campus/mis-cursos",
    CAMPUS_MY_COURSES_DETAIL_PATH: "/campus/mis-cursos/detalles"
}

export const CONFIG_NAMES_COUNTRYS = [
    "Argentina"
]

export const ENABLE_TRANSLATION = false