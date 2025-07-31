import { CONFIG_BACKEND } from "../config/config"

export default function LoadConfigData(setCargando,setConfigData) {
    return async function (){
        setCargando(true)
        try{
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/config/consultData`, {
                method: 'POST',
                credentials: 'include'
            })
            const d = await res.json()
            if (d.success) {
                setConfigData(d.config)
            }
        }catch(error) {
            console.error('Error en API: ', error)
        }finally{
            setCargando(false)
        }
    }
}