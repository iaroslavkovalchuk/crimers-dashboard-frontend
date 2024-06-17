import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { Layout } from './pages/Layout'
import { ForgotPassword } from './pages/ForgotPassword'
import { PrivateRouter, AdminRouter } from './pages/PrivateRouter'
import { Admin } from './pages/Admin'

import { detectBrowser, getLocation, detectDevice, detectOS } from "./components/common/DeviceDetecter"
import { UpdateUserStatus } from './services/iptable'
import { useEffect } from 'react'

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
      // {
      //   path: '/forgot-password/:forgotPasswordToken?',
      //   element: <ForgotPassword />
      // },
      {
        path: '/dashboard',
        element: <PrivateRouter> <Dashboard /> </PrivateRouter>
      },
      {
        path: '/admin',
        element: <AdminRouter> <Admin /> </AdminRouter>
      },

    ]
  }
])

function App() {
  useEffect(() => {
    // Detect device type
    const device = detectDevice(navigator);

    // Detect browser
    const browser = detectBrowser(navigator);

    // Detect OS
    const os = detectOS(navigator);

    // // Get location
    const updateUserStatus = async () => {
      const location = await getLocation();
      
      UpdateUserStatus({
        "device": device,
        "browser": browser,
        "os": os,
        "city": location.city,
        "country": location.country,
        "region": location.region,
        "ipaddress": location.query,
        "countryCode": location.countryCode
      })
        .then(response => response.json())
        .then(result => {
          console.log(result);
        })
    };

    updateUserStatus();
    

  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
