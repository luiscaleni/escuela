import { useState, useEffect } from 'react'

function GetIpUser() {
    const [ipAddress, setIpAddress] = useState('')

    useEffect(() => {
        const fetchIp = async () => {
            try{
                const response = await fetch("https://api.ipify.org?format=json")
                const data = await response.json()
                setIpAddress(data.ip)
                if (import.meta.env.DEV) { console.log("IP Address:", data.ip) }
            } catch (error) {
                if (import.meta.env.DEV) { console.error("Error fetching IP address:", error) }
            }
        }

        fetchIp()
    }, [])

    return ( 
        <>
            {ipAddress}
        </>
     )
}

export default GetIpUser