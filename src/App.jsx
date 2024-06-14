import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
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
        path: '/dashboard',
        element: <PrivateRouter><Dashboard /></PrivateRouter>
      },
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
