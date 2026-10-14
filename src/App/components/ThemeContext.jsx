import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const getInitialDark = () => {
        const saved = localStorage.getItem('darkMode')
        if (saved !== null) return saved === '1'
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        localStorage.setItem('darkMode', prefersDark ? '1' : '0')
        return prefersDark
    }
    const [dark, setDark] = useState(getInitialDark)

    useEffect(() => {
        document.body.classList.toggle('dark', dark)
        localStorage.setItem('darkMode', dark ? '1' : '0')
    }, [dark])

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}