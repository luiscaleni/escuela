// Configuration file for the application
// This file contains constants that are used throughout the application

export const CONFIG_VALUES = {
    APP_PRODUCTION_URL: 'https://dpisud-beta.infy.uk',
    APP_LOCAL_URL: 'http://localhost'
}

export const CONFIG_SOCIAL_NETW = {
    FB: 'https://www.facebook.com/IDP',
    TW: 'https://twitter.com/IDP',
    IG: 'https://www.instagram.com/IDP',
    YT: 'https://www.youtube.com/IDP',
    IN: 'https://www.linkedin.com/company/IDP'
}

export const CONFIG_BACKEND = {
    API_DIR: import.meta.env.VITE_API_BASE_URL/*"http://localhost/api" */
    /*API_IMPORT_URL: import.meta.env.VITE_API_BASE_URL*/
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
    CONFIG_EDIT_PATH: "/editar-configuracion",
    CONFIG_PASSW_PATH: "/passw",
    HELP_PATH: "/ayuda",

    YOUR_WELLCOME_PATH: "/bienvenida",
    PROFILE_PATH: "/perfil",
    PROFILE_EDIT_PATH: "/editar-perfil",
    NEW_POST_PATH: "/nueva-publicacion"
}