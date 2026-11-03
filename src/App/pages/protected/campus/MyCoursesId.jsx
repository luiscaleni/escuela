import { useContext, useEffect, useState } from "react"
import ContentCourses from "../../../components/ContentCourses"
import LeftTopButton from "../../../components/LeftTopButton"
import RightTopButton from "../../../components/RightTopButton"
import TopButtons from "../../../components/TopButtons"
import { UserContext } from "../../../components/UserProvider"

function MyCoursesId() {
    const { user } = useContext(UserContext)
    const [loactionValue, setLoactionValue] = useState(null)

    useEffect(() => {
        if (user?.roleId === 1 || user?.roleId === 2) {
            setLoactionValue('/campus/profesor-cursos')
        } else if (user?.roleId === 3) {
            setLoactionValue('/campus/mis-cursos') 
        }
    }, [user])

    return (
            <>
            <TopButtons>
                {user && (
                    <LeftTopButton 
                        locationElm={loactionValue} 
                        text="Mis cursos" 
                        typeElm="expand" />
                )}
            </TopButtons>
                <ContentCourses />
            </>
    )
}

export default MyCoursesId