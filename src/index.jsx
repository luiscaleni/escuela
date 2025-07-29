import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { UserProvider } from './App/components/UserProvider'
import './index.css'

import Home            from './App/pages/Home'
import News            from './App/pages/News'
import AboutUs         from './App/pages/AboutUs'
import Resources       from './App/pages/Resources'
import Donate          from './App/pages/Donate'
import Contact         from './App/pages/Contact'

import Register        from './App/pages/Register'
import Login           from './App/pages/Login'

/*Protected */
import Profile         from './App/pages/protected/Profile'
import ProfileEdit     from './App/pages/protected/ProfileEdit'
import Wellcome        from './App/pages/protected/Wellcome'
import Configuration   from './App/pages/protected/Configuration'
import PublicRoute     from './App/components/PublicRoute'
import ProtectedRoute  from './App/components/ProtectedRoute'
import NewsDetail      from './App/pages/NewsDetail'
import { CONFIG_PATHS } from './App/config/config'
import NewPost from './App/pages/protected/NewPost'

const routes = [
  { path: CONFIG_PATHS.HOME_PATH,              element: <Home/>,         },
  { path: CONFIG_PATHS.NEWS_PATH,              element: <News/>,         },
  { path: CONFIG_PATHS.NEWS_PATH+"/:id_news",  element: <NewsDetail/>,   },
  { path: CONFIG_PATHS.ABOUT_US_PATH,          element: <AboutUs/>,      },
  { path: CONFIG_PATHS.RESOURCES_PATH,         element: <Resources/>,    },
  { path: CONFIG_PATHS.DONATE_PATH,            element: <Donate/>,       },
  { path: CONFIG_PATHS.CONTACT_PATH,           element: <Contact/>,      },
  { path: CONFIG_PATHS.REGISTER_PATH,          element: <PublicRoute>    <Register/>      </PublicRoute>    },
  { path: CONFIG_PATHS.LOGIN_PATH,             element: <PublicRoute>    <Login/>         </PublicRoute>    },
  //Protected
  { path: CONFIG_PATHS.YOUR_WELLCOME_PATH,     element: <ProtectedRoute> <Wellcome/>      </ProtectedRoute> },
  { path: CONFIG_PATHS.PROFILE_PATH,           element: <ProtectedRoute> <Profile/>       </ProtectedRoute> },
  { path: CONFIG_PATHS.PROFILE_EDIT_PATH,      element: <ProtectedRoute> <ProfileEdit/>   </ProtectedRoute> },
  { path: CONFIG_PATHS.NEW_POST_PATH,          element: <ProtectedRoute> <NewPost/>       </ProtectedRoute> },
  //Config
  { path: CONFIG_PATHS.CONFIG_PATH,            element: <ProtectedRoute> <Configuration/> </ProtectedRoute> },
  //
  { path: "*",                                 element: <Home/>          }
]
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>
)