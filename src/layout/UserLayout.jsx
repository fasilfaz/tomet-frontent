import { Outlet } from "react-router-dom"
import Footer from "../components/ui/Footer"
import UserNavbar from "../components/ui/Navbar"

const UserLayout = () => {
  return (
        <div className="min-h-screen">
          <header className="fixed z-20 w-full">
            <UserNavbar />
          </header>
          <main className="pt-[64px] min-h-screen">
            <Outlet />
          </main>
          <Footer />
        </div>
  )
}

export default UserLayout