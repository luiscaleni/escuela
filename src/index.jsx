import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { UserProvider } from './App/components/UserProvider'
import ContentCampus from './App/components/ContentCampus'
import Template from './App/template/Template'
import TemplateCampus from './App/template/TemplateCampus'
import './index.css'

import Home                     from './App/pages/Home'
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
import PostEdit                 from './App/pages/protected/PostEdit'
import Help                     from './App/pages/protected/Help'
import PrivacyPolitic     from './App/pages/PrivacyPolitic'

import { CONFIG_PATHS }         from './App/config/config'
import { ThemeProvider }        from './App/components/ThemeContext'
import Sports                   from './App/pages/Sports'

import Campus                   from './App/pages/protected/campus/Campus'
import MyCourseDetail           from './App/pages/protected/campus/MyCourseDetail'
import MyCourses                from './App/pages/protected/campus/MyCourses'
import DisciplineDetail         from './App/pages/DisciplineDetail'

const routes = [
  {
    path: "/",
    element: <Template separator={false} />,
    children: [
      { path: CONFIG_PATHS.HOME_PATH,                                       element: <Home/>,                  },
      { path: CONFIG_PATHS.SPORTS_PATH,                                     element: <Sports/>,                },
      { path: CONFIG_PATHS.SPORTS_PATH+"/disciplina/:id_discipline",        element: <DisciplineDetail/>,      },
      { path: CONFIG_PATHS.ABOUT_US_PATH,                                   element: <AboutUs/>,               },
      { path: CONFIG_PATHS.PRIVACY_PATH,                                    element: <PrivacyPolitic/>,        },
      { path: CONFIG_PATHS.RESET_PASSW,                                     element: <ResetPassw />                                                 },
      { path: CONFIG_PATHS.SUCCESS_PATH,                                    element: <Success />                                                    },
      
      { path: CONFIG_PATHS.REGISTER_PATH,                                   element: <PublicRoute>     <Register/>                </PublicRoute>    },
      { path: CONFIG_PATHS.LOGIN_PATH,                                      element: <PublicRoute>     <Login/>                   </PublicRoute>    },
      { path: CONFIG_PATHS.FORGET_PASSW_PATH,                               element: <PublicRoute>     <ForgetPassw/>             </PublicRoute>    },
      //
      { path: "*",                                                          element: <Home/>                   }
    ]
  },
  {  
    path: "/",
    element: <Template separator={true} />,
    children: [
      //Protected - ROL 1 y 2
      { path: CONFIG_PATHS.YOUR_WELLCOME_PATH,                              element: <ProtectedRoute>  <Wellcome/>                </ProtectedRoute> },
      { path: CONFIG_PATHS.PROFILE_PATH,                                    element: <ProtectedRoute>  <Profile/>                 </ProtectedRoute> },
      { path: CONFIG_PATHS.PROFILE_EDIT_PATH,                               element: <ProtectedRoute>  <ProfileEdit/>             </ProtectedRoute> },
      { path: CONFIG_PATHS.HELP_PATH,                                       element: <ProtectedRoute>  <Help/>                    </ProtectedRoute> },
      
      //Protected - ROl 1
      { path: CONFIG_PATHS.EDIT_POST_PATH+"/:id_course",                    element: <ProtectedRoute>  <PostEdit/>                </ProtectedRoute> },
      { path: CONFIG_PATHS.CONFIG_PATH,                                     element: <ProtectedRoute>  <Configuration/>           </ProtectedRoute> },
      { path: CONFIG_PATHS.CONFIG_EDIT_PATH,                                element: <ProtectedRoute>  <ConfigurationEdit/>       </ProtectedRoute> },
    ]
  },
  { 
    path: "campus",
    element: <TemplateCampus separator={false}/>,
    children: [
      { path: CONFIG_PATHS.CAMPUS_PATH,                                     element: <ProtectedRoute> <Campus/>         </ProtectedRoute> },
      { 
        path: "mis-cursos",
        element: <ContentCampus separator={false}/>, // <--- Este componente es el contenedor clave
        children: [
          { path: CONFIG_PATHS.CAMPUS_MY_COURSES_PATH+"/:id",               element: <ProtectedRoute> <MyCourses/>      </ProtectedRoute> },
          { path: CONFIG_PATHS.CAMPUS_MY_COURSES_DETAIL_PATH+"/:id",        element: <ProtectedRoute> <MyCourseDetail/> </ProtectedRoute> },
        ]
      }
    ]
  },
]
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
)