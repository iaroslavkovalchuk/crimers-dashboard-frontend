import { useSelector } from "react-redux"
import { Loading } from "../components/common/Loading"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Layout = () => {
  const isLoading = useSelector(store => store.auth.isLoading)
  const {pathname} = useLocation();
  const navigate = useNavigate()
 
  useEffect(() => {
    if (pathname === "/") {
      navigate('/notifications')
    }
  }, [])


  return (
    <div>
        {isLoading && <Loading />}
        <Outlet />
    </div>
  )
}
