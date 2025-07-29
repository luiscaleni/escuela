// Configuration file for the application
// This file contains constants that are used throughout the application
export const CONFIG_DATA = {
    NAME_FULL: 'Departamento de Plantación de Iglesias en Sudamérica',
    NAME_ACRONYM: 'DPISUD',
    CHURCH: "Iglesia de Dios de la Profecía",
    CHURCH_ACRONYM: 'IDP',
    SUPERVISOR: "Francisco Lopez Paz",
    YEAR: '2025'
}
export const CONFIG_VALUES = {
    APP_PRODUCTION_URL: 'https://dpisud-beta.infy.uk',
    APP_LOCAL_URL: 'http://localhost'
}
export const CONFIG_APP = {
    APP_URL: CONFIG_VALUES.APP_LOCAL_URL,
    APP_NAME: CONFIG_DATA.NAME_ACRONYM,
    APP_VERSION: '1.0.0',
    APP_DESCRIPTION: 'Web del ' + CONFIG_DATA.NAME_FULL,
    APP_AUTHOR: CONFIG_DATA.CHURCH,
    APP_COPYRIGHT: '©' + CONFIG_DATA.YEAR + ' ' + CONFIG_DATA.NAME_ACRONYM + '. Todos los derechos reservados.',
}

export const CONFIG_SOCIAL_NETW = {
    FB: 'https://www.facebook.com/IDP',
    TW: 'https://twitter.com/IDP',
    IG: 'https://www.instagram.com/IDP',
    YT: 'https://www.youtube.com/IDP',
    IN: 'https://www.linkedin.com/company/IDP',
}

export const CONFIG_BACKEND = {
    API_DIR: import.meta.env.VITE_API_BASE_URL,
    API_WEB: "https://dpisud-beta.infy.uk/api"
}

export const CONFIG_PATHS = {
    ROOT_Path: "/",
    HOME_PATH: "/",
    INDEX_PATH: "/index.php",
    NEWS_PATH: "/noticias",
    ABOUT_US_PATH: "/acerca-de",
    RESOURCES_PATH: "/recursos",
    DONATE_PATH: "/donar",
    CONTACT_PATH: "/contacto",

    REGISTER_PATH: "/registro",
    LOGIN_PATH: "/login",
    LOGOUT_PATH: "/logout",
    CONFIG_PATH: "/configuracion",
    CONFIG_PASSW_PATH: "/passw",
    HELP_PATH: "/ayuda",

    YOUR_WELLCOME_PATH: "/bienvenida",
    PROFILE_PATH: "/perfil",
    PROFILE_EDIT_PATH: "/editar-perfil",
    NEW_POST_PATH: "/nueva-publicacion"
}