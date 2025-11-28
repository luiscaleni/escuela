export default function LoadData(setLoading, setData, setMethod, setRoute) {

    return async function (){
        setLoading(true)
        try{
            const res = await fetch(setRoute, {
                method: setMethod==='POST' ? {
                    setMethod, 
                    credentials:'include', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                } : setMethod
            })
            const data = await res.json()
            if (data.success) {
                setData(data.result)
            }
        }catch(error) {
            if (import.meta.env.DEV) { console.error('Error en API: ', error)}
        }finally{
            setLoading(false)
        }
    }
}