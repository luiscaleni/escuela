import { CONFIG_BACKEND, ENABLE_TRANSLATION } from "../config/config"

export const traducir = async (texto, source, target) => {

    if (!ENABLE_TRANSLATION) {
        return texto
    }

    try {
        const resp = await fetch(`${CONFIG_BACKEND.API_DIR}/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: texto,
                source,
                target
            })
        })

        const data = await resp.json()
        return data.translatedText ?? texto

    } catch (error) {
        if (import.meta.env.DEV) { console.error("Error en traducción:", error) }
        return texto
    }
}
