import {
    Heart,
    KeyRound,
    LayoutDashboard,
    LogOut,
    ShoppingBag,
    User,
  } from "lucide-react";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "./dropdown-menu"
  import toast from "react-hot-toast"
  import { useDispatch } from "react-redux"
  import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../../redux/features/users/userSlice";
  
  export const ProfileDropdownMenu = ({ username, avatrUrl, role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogOut = async () => {
      dispatch(logoutUser()).unwrap()
        .then(res => {
          toast.success(res.message, { duration: 1000 })
          setTimeout(() => {
            navigate('/login');
          }, 1000)
        })
        .catch(err => toast.error(err.message, { duration: 1000 }))
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            className="h-10 w-10 rounded-full"
            src={avatrUrl}
            alt={username}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {role === "admin" ? (<Link to={"/admin/dashboard"} className="w-full">
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4 text-orange-600" />
                <span>Admin Dashbord</span>
              </DropdownMenuItem>
            </Link>)
              : role === "seller" ?
                (<Link to={"/seller/dashboard"} className="w-full"><DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4 text-orange-600" />
                  <span>Seller Dashbord</span>
                </DropdownMenuItem>
                </Link>)
                : ""}
            <Link to={'/user/profile'}>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4 text-orange-600" />
                <span>Manage My Account</span>
              </DropdownMenuItem>
            </Link>
            <Link to={"user/password"}>
              <DropdownMenuItem>
                <KeyRound className="mr-2 h-4 w-4 text-orange-600" />
                <span>Change My Password</span>
              </DropdownMenuItem>
            </Link>
            <Link to={'user/orders'}>
            <DropdownMenuItem>
              <ShoppingBag className="mr-2 h-4 w-4 text-orange-600" />
              <span>My Order</span>
            </DropdownMenuItem>
            </Link>
           <Link to={'/whislist'}>
           <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4 text-orange-600" />
              <span>My Whislist</span>
            </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleLogOut}
          >
            <LogOut className="mr-2 h-4 w-4 text-orange-600" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  