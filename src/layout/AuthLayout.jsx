import { Outlet } from "react-router-dom"
import UserNavbar from "../components/ui/Navbar"

const AuthLayout = () => {
  return (
    <div className="h-screen">
      <header className="fixed top-0 w-full">
      <UserNavbar />
      </header>
      <main className="h-[100vh] pt-[66px]">
      <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout