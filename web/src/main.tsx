import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { LoginPage } from './pages/login/Login.tsx'
import { RegisterPage } from './pages/register/Register.tsx'
import { useCookies } from './hooks/useCookies.tsx'
import { PrivateRoute } from './pages/private/index.tsx'
import { CreateTeam } from './pages/create-team/index.tsx'
import { Teams } from './pages/teams/Teams.tsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/create-team',
        element: <PrivateRoute>
          <CreateTeam />
        </PrivateRoute>,
      },
      {
        path: '/teams',
        element: <PrivateRoute>
          <Teams />
        </PrivateRoute>,
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)
