import { Menu } from 'lucide-react';
import React from 'react';
import { ModeToggle } from '../ui/mode-toggle';
import { useSelector } from 'react-redux';
import { ProfileDropdownMenu } from './ProfileDropDown';

const Header = ({ sidebarToggle, setSidebarToggle }) => {
    const user = useSelector(state => state.users.user.userInfo);
    return (
        <header className='bg-zinc-100 dark:bg-zinc-900 px-4 py-3 flex justify-between'>
            <div className='flex items-center text-lg '>
                <Menu className={`me-4 cursor-pointer md:hidden`} onClick={() => setSidebarToggle(!sidebarToggle)} />
                <span className='font-semibold'>Tomet Clothing</span>
            </div>
            <div className='flex items-center gap-x-5'>
                <div>
                    <ModeToggle />
                </div>
                <div>
                    <ProfileDropdownMenu avatrUrl={user?.avatar?.url} username={user?.firstName} role={user?.role} />
                </div>
            </div>
        </header>
    )
}

export default Header;
