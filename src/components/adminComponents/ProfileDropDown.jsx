import {
    KeyRound,
    LogOut,
    User,
  } from "lucide-react";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
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
            <Link to={'/admin/profile'}>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4 text-orange-600" />
                <span>Manage My Account</span>
              </DropdownMenuItem>
            </Link>
            <Link to={"/admin/password"}>
              <DropdownMenuItem>
                <KeyRound className="mr-2 h-4 w-4 text-orange-600" />
                <span>Change My Password</span>
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
  