import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { UserProvider } from './App/components/UserProvider'
import './index.css'

import Home          from './App/pages/Home'
import News          from './App/pages/News'
import AboutUs       from './App/pages/AboutUs'
import Resources     from './App/pages/Resources'
import Donate        from './App/pages/Donate'
import Contact       from './App/pages/Contact'

import Register      from './App/pages/Register'
import Login         from './App/pages/Login'

/*Protected */
import Profile       from './App/pages/protected/Profile'
import ProfileEdit   from './App/pages/protected/ProfileEdit'
import Wellcome      from './App/pages/protected/Wellcome'
import Configuration from './App/pages/protected/Configuration'
import PublicRoute from './App/components/PublicRoute'
import ProtectedRoute from './App/components/ProtectedRoute'
import NewsDetail from './App/pages/NewsDetail'

const routes = [
  { path: "/",                        element: <Home/>,         },
  { path: "/noticias",                element: <News/>,         },
  { path: "/noticias/:id_news",        element: <NewsDetail/>,   },
  { path: "/sobre-nosotros",          element: <AboutUs/>,      },
  { path: "/recursos",                element: <Resources/>,    },
  { path: "/donar",                   element: <Donate/>,       },
  { path: "/contacto",                element: <Contact/>,      },
  { path: "/registro",                element: <PublicRoute>    <Register/>      </PublicRoute>    },
  { path: "/login",                   element: <PublicRoute>    <Login/>         </PublicRoute>    },
  //Protected
  { path: "/bienvenida",              element: <ProtectedRoute> <Wellcome/>      </ProtectedRoute> },
  { path: "/perfil",                  element: <ProtectedRoute> <Profile/>       </ProtectedRoute> },
  { path: "/perfil/editar",           element: <ProtectedRoute> <ProfileEdit/>   </ProtectedRoute> },
  { path: "/configuracion",           element: <ProtectedRoute> <Configuration/> </ProtectedRoute> },
  //
  { path: "*",               element: <Home/>          }
]
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>
)