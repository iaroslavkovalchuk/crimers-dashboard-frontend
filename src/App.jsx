import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Notifications } from './pages/Notifications'
import { Layout } from './pages/Layout'

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
        path: '/notifications',
        element: <Notifications />
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
