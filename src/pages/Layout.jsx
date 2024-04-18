import { useSelector } from "react-redux"
import { Loading } from "../components/common/Loading"
import { Outlet } from "react-router-dom"

export const Layout = () => {
  const isLoading = useSelector(store => store.auth.isLoading)

  return (
    <div>
        {isLoading && <Loading />}
        <Outlet />
    </div>
  )
}
