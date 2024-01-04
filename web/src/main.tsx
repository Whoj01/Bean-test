import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { LoginPage } from './pages/login/Login.tsx'
import { RegisterPage } from './pages/register/Register.tsx'
import { PrivateRoute } from './pages/private/index.tsx'
import { CreateTeam } from './pages/create-team/index.tsx'
import { Teams } from './pages/teams/Teams.tsx'
import { NotFound } from './components/Error/NotFound.tsx'
import { ErrorPage } from './components/Error/ErrorPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/register',
        element: <RegisterPage />,
        errorElement: <ErrorPage />

      },
      {
        path: '/teams/create',
        element: <PrivateRoute>
          <CreateTeam />
        </PrivateRoute>,
        errorElement: <ErrorPage />

      },
      {
        path: '/teams',
        element: <PrivateRoute>
          <Teams />
        </PrivateRoute>,
        errorElement: <ErrorPage />

      },
      {
        path: '/',
        element: <Navigate to="/login" />,
        errorElement: <ErrorPage />
      },
      {
        path: '*',
        element:
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>,
        errorElement: <ErrorPage />
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
