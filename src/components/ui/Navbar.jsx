import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { ProfileDropdownMenu } from './ProfileDropdown';



const UserNavbar = () => {
    const user = useSelector(state => state.users.user.userInfo);
    const menuItems = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Shop',
            href: '/shop',
        },
        {
            name: 'Contact',
            href: '/contact',
        },
        {
            name: 'FAQ',
            href: '/faq',
        },
        ...(user?.role === 'user' ? [{ name: 'Become a Seller', href: '/seller' }] : []),
    ]

    const isAuthenticated = useSelector(state => state.users.user.isAuthenticated);

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const cart = useSelector(state => state.cart);
    // console.log(cart)
    const { cartItems } = cart

    return (
        <nav className="w-full border-b-2 dark:bg-gray-900 bg-zinc-100">
            <Toaster />
            <div className="w-full flex items-center justify-between p-3">
                <Link to={"/"} className="inline-flex items-center space-x-2">
                   
                    <span className="font-bold">Tomet</span><span className='text-blue-600 font-bold'> Clothing</span>
                </Link>
                <div className="hidden lg:block">
                    <ul className="ml-12 inline-flex space-x-8">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className="inline-flex items-center text-sm font-semibold hover:text-blue-600 active:text-blue-600"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {isAuthenticated ? (<div className="flex gap-5 grow justify-end items-center">
                    <Link to={'/cart'} tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator relative">
                            <span className="badge badge-sm pb-0 indicator-item absolute right-4 text-[11px] top-1.5 text-blue-600 font-semibold">{isAuthenticated ? (cartItems?.length || 0) : 0}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                    </Link>
                    <ProfileDropdownMenu avatrUrl={user?.avatar?.url} username={user?.firstName} role={user?.role} />
                    <ModeToggle />
                </div>) : (<div className="flex gap-5 grow justify-end">
                    <div className="flex justify-center items-center gap-5 relative">
                        <Link to={'/cart'} tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator relative">
                                <span className="badge badge-sm pb-0 indicator-item absolute right-4 text-[11px] top-1.5 text-red-600 font-semibold">{isAuthenticated ? (cartItems?.length || 0) : 0}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                        </Link>
                        <Link to={"/login"} className='hover:text-blue-600'>
                            Login
                        </Link>
                        <Link to={"/signup"} className='hover:text-blue-600 sm:inline hidden'>
                            Signup
                        </Link>
                    </div>
                    <ModeToggle />
                </div>)}
                <div className="ml-2 lg:hidden">
                    <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                </div>
                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <Link to={"/"} className="inline-flex items-center space-x-2">
                                     
                                        <span className="font-bold">Tomet</span><span className='font-bold text-blue-600'>Clothing</span>
                                    </Link>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <X className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-4">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-blue-600"
                                            >
                                                <span className="ml-3 text-base font-medium">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default UserNavbar

