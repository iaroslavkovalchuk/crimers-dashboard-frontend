import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Notifications } from './pages/Notifications'
import { Layout } from './pages/Layout'
import { ForgotPassword } from './pages/ForgotPassword'
import { PrivateRouter } from './pages/PrivateRouter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/forgot-password/:forgotPasswordToken?',
        element: <ForgotPassword />
      },
      {
        path: '/notifications',
        element: <PrivateRouter><Notifications /></PrivateRouter>
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
