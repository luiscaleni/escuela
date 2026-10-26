import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { UserProvider } from './App/components/UserProvider'
import ContentCampus from './App/components/ContentCampus'
import Template from './App/template/Template'
import TemplateCampus from './App/template/TemplateCampus'
import './index.css'

import Home                     from './App/pages/Home'
import NotFound                 from './App/pages/NotFound'

import AboutUs                  from './App/pages/AboutUs'

import Register                 from './App/pages/Register'
import Login                    from './App/pages/Login'
import Success                  from './App/pages/Success'
import ForgetPassw              from './App/pages/ForgetPassw'
import ResetPassw               from './App/pages/ResetPassw'

/*Protected */
import PublicRoute              from './App/components/PublicRoute'
import ProtectedRoute           from './App/components/ProtectedRoute'
import Profile                  from './App/pages/protected/Profile'
import ProfileEdit              from './App/pages/protected/ProfileEdit'
import Wellcome                 from './App/pages/protected/Wellcome'
import Configuration            from './App/pages/protected/Configuration'
import ConfigurationEdit        from './App/pages/protected/ConfigurationEdit'
import Help                     from './App/pages/protected/Help'
import PrivacyPolitic           from './App/pages/PrivacyPolitic'

import { CONFIG_PATHS }         from './App/config/config'
import Sports                   from './App/pages/Sports'
import DisciplineDetail         from './App/pages/DisciplineDetail'

import Campus                   from './App/pages/protected/campus/Campus'
import MyCourseDetail           from './App/pages/protected/campus/MyCourseDetail'
import MyCourses                from './App/pages/protected/campus/MyCourses'
import MyCoursesId              from './App/pages/protected/campus/MyCoursesId'
import ProfessorAssing          from './App/pages/protected/campus/ProfessorAssing'
import MattersListProfessor     from './App/components/MattersListProfessor'
import CourseInscriptions from './App/pages/protected/campus/CourseInscriptions'
import ManageSports from './App/components/ManageSports'
import ExamView from './App/components/ExamView'


const routes = [
  {
    path: "/",
    element: <Template separator={false} />,
    children: [
      { path: CONFIG_PATHS.HOME_PATH,                                       element: <Home/>,                                                       },
      { path: CONFIG_PATHS.SPORTS_PATH+"/disciplina/:id_discipline",        element: <DisciplineDetail/>,                                           },
      { path: CONFIG_PATHS.ABOUT_US_PATH,                                   element: <AboutUs/>,                                                    },
      { path: CONFIG_PATHS.SPORTS_PATH,                                     element: <Sports/>,                                                     },
      { path: CONFIG_PATHS.PRIVACY_PATH,                                    element: <PrivacyPolitic/>,                                             },
      { path: CONFIG_PATHS.RESET_PASSW,                                     element: <ResetPassw />                                                 },
      { path: CONFIG_PATHS.SUCCESS_PATH,                                    element: <Success />                                                    },
      
      { path: CONFIG_PATHS.LOGIN_PATH,                                      element: <PublicRoute>       <Login/>                 </PublicRoute>    },
      { path: CONFIG_PATHS.FORGET_PASSW_PATH,                               element: <PublicRoute>       <ForgetPassw/>           </PublicRoute>    },
      //
      { path: "*",                                                          element: <NotFound/>                                                    }
    ]
  },
  {
    path: "/",
    element: <Template separator={true} />,
    children: [
      { path: CONFIG_PATHS.REGISTER_PATH,                                   element: <PublicRoute>     <Register/>                </PublicRoute>    },
      // --- AGRUPAMOS TODAS LAS RUTAS PROTEGIDAS DEL USUARIO AQUÍ ---
      { path: CONFIG_PATHS.PROFILE_PATH,                                    element: <ProtectedRoute>  <Profile/>                 </ProtectedRoute> },
      { path: CONFIG_PATHS.PROFILE_EDIT_PATH,                               element: <ProtectedRoute>  <ProfileEdit/>             </ProtectedRoute> },
      { path: CONFIG_PATHS.CONFIG_PATH,                                     element: <ProtectedRoute>  <Configuration/>           </ProtectedRoute> },
      { path: CONFIG_PATHS.CONFIG_EDIT_PATH,                                element: <ProtectedRoute>  <ConfigurationEdit/>       </ProtectedRoute> },
      { path: CONFIG_PATHS.HELP_PATH,                                       element: <ProtectedRoute>  <Help/>                    </ProtectedRoute> },
    ]
  },
  {  
    path: "/",
    element: <Template separator={false} />,
    children: [
      //Protected - ROL 1 y 2
      
    ]
  },
  { 
    path: "/campus",
    element: <TemplateCampus separator={false}/>,
    children: [
      { path: "",                                                           element: <ProtectedRoute>  <Campus/>                  </ProtectedRoute> },
      { path: CONFIG_PATHS.YOUR_WELLCOME_PATH,                              element: <ProtectedRoute>  <Wellcome/>                </ProtectedRoute> },
      { 
        path: "asignar-cursos-a-profesores", // O tu constante de profesores
        element: <ContentCampus separator={false}/>,
        children: [ { path: "",                                             element: <ProtectedRoute>  <ProfessorAssing/>         </ProtectedRoute> }]
      },
      { path: "exam/take/:id_exam",                                         element: <ProtectedRoute>  <ExamView/>                </ProtectedRoute> },
      { 
        path: "crear-un-nuevo-curso", // O tu constante de profesores
        element: <ContentCampus separator={false}/>,
        children: [ { path: "",                                             element: <ProtectedRoute>  <ManageSports/>            </ProtectedRoute> }]
      },
      { 
        path: "profesor-cursos", // O tu constante correspondiente
        element: <ContentCampus separator={false}/>,
        children: [ { path: "",                                             element: <ProtectedRoute>  <MattersListProfessor/>    </ProtectedRoute> }]
      },
      { 
        path: "mis-cursos", // Asegúrate de que coincida con lo que usas en el Link
        element: <ContentCampus separator={false}/>,
        children: [
          { path: "",                                                       element: <ProtectedRoute>  <MyCourses/>               </ProtectedRoute> },
          { path: ":id",                                                    element: <ProtectedRoute>  <MyCoursesId/>             </ProtectedRoute> },
          { path: "detalles/:id",                                           element: <ProtectedRoute>  <MyCourseDetail/>          </ProtectedRoute> },
        ]
      },
      { 
        path: "inscribirme-a-cursos",
        element: <ContentCampus separator={false}/>,
        children: [
          { path: "",                                                       element: <ProtectedRoute>  <CourseInscriptions/>     </ProtectedRoute> },
        ]
      }
    ]
  },
]
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
  </React.StrictMode>
)