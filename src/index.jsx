import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { UserProvider } from './App/components/UserProvider'
import './index.css'
import './App/i18n'

import Home               from './App/pages/Home'
import News               from './App/pages/News'
import AboutUs            from './App/pages/AboutUs'
import Resources          from './App/pages/Resources'
import Donate             from './App/pages/Donate'

import Register           from './App/pages/Register'
import Login              from './App/pages/Login'

/*Protected */
import Profile            from './App/pages/protected/Profile'
import ProfileEdit        from './App/pages/protected/ProfileEdit'
import Wellcome           from './App/pages/protected/Wellcome'
import Configuration      from './App/pages/protected/Configuration'
import ConfigurationEdit  from './App/pages/protected/ConfigurationEdit'
import PublicRoute        from './App/components/PublicRoute'
import ProtectedRoute     from './App/components/ProtectedRoute'
import NewsDetail         from './App/pages/NewsDetail'
import NewPost            from './App/pages/protected/NewPost'
import PostEdit           from './App/pages/protected/PostEdit'
import Help               from './App/pages/protected/Help'
import Success            from './App/pages/protected/Success'
import { CONFIG_PATHS }   from './App/config/config'
import ForgetPassw        from './App/pages/ForgetPassw'
import ResetPassw         from './App/pages/ResetPassw'
import Plantations        from './App/pages/Plantations'
import PlantationsCountry from './App/pages/PlantationsCountry'
import PlantationDetail from './App/pages/PlantationDetail'
import { ThemeProvider } from './App/components/ThemeContext'

const routes = [
  { path: CONFIG_PATHS.HOME_PATH,                    element: <Home/>,                  },
  { path: CONFIG_PATHS.NEWS_PATH,                    element: <News/>,                  },
  { path: CONFIG_PATHS.NEWS_PATH+"/:id_news",        element: <NewsDetail/>,            },
  { path: CONFIG_PATHS.ABOUT_US_PATH,                element: <AboutUs/>,               },
  { path: CONFIG_PATHS.RESOURCES_PATH,               element: <Resources/>,             },
  { path: CONFIG_PATHS.DONATE_PATH,                  element: <Donate/>,                },
  { path: CONFIG_PATHS.PLANTATIONS,                  element: <Plantations/>,           },
  { path: CONFIG_PATHS.PLANTATIONS+"/:country",      element: <PlantationsCountry />,   },
  { path: CONFIG_PATHS.PLANTATIONS+"/:country/:id",  element: <PlantationDetail />,     },
  
  { path: CONFIG_PATHS.RESET_PASSW+"/:id_token",     element: <ResetPassw/>,            },
  
  { path: CONFIG_PATHS.REGISTER_PATH,                element: <PublicRoute>     <Register/>           </PublicRoute>    },
  { path: CONFIG_PATHS.LOGIN_PATH,                   element: <PublicRoute>     <Login/>              </PublicRoute>    },
  { path: CONFIG_PATHS.FORGET_PASSW_PATH,            element: <PublicRoute>     <ForgetPassw/>        </PublicRoute>    },

  //Protected - ROL 1 y 2
  { path: CONFIG_PATHS.YOUR_WELLCOME_PATH,           element: <ProtectedRoute>  <Wellcome/>           </ProtectedRoute> },
  { path: CONFIG_PATHS.PROFILE_PATH,                 element: <ProtectedRoute>  <Profile/>            </ProtectedRoute> },
  { path: CONFIG_PATHS.PROFILE_EDIT_PATH,            element: <ProtectedRoute>  <ProfileEdit/>        </ProtectedRoute> },
  { path: CONFIG_PATHS.HELP_PATH,                    element: <ProtectedRoute>  <Help/>               </ProtectedRoute> },
  { path: CONFIG_PATHS.SUCCESS_PATH,                 element: <ProtectedRoute>  <Success/>            </ProtectedRoute> },
  
  //Protected - ROl 1
  { path: CONFIG_PATHS.NEW_POST_PATH,                element: <ProtectedRoute>  <NewPost/>            </ProtectedRoute> },
  { path: CONFIG_PATHS.EDIT_POST_PATH+"/:id_news",   element: <ProtectedRoute>  <PostEdit/>           </ProtectedRoute> },
  { path: CONFIG_PATHS.CONFIG_PATH,                  element: <ProtectedRoute>  <Configuration/>      </ProtectedRoute> },
  { path: CONFIG_PATHS.CONFIG_EDIT_PATH,             element: <ProtectedRoute>  <ConfigurationEdit/>  </ProtectedRoute> },
  //
  { path: "*",                                       element: <Home/>           }
]
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
)