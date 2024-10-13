import { BadgeDollarSign, Boxes, Cross, LayoutDashboard, ShoppingBag, ShoppingBasket, UserRoundIcon, X } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebarData, SellerSidebarData } from '@/data';
import { useSelector } from 'react-redux';

const SideBar = ({ sidebarToggle, setSidebarToggle }) => {
    const role = useSelector(state => state.users.user?.userInfo?.role);
    console.log(role);
    return (
        <aside
            id="sidebar"
            className={`fixed h-full z-10 shadow py-2 px-4 bg-zinc-100 dark:bg-zinc-900 
                        ${sidebarToggle ? "block" : "hidden"} 
                        md:block w-64`}>
            <div className='my-2 mb-4'>
                <h1 className='text-2xl font-bold'>
                    {role === "admin" ? "Admin Dashboard" : "Seller Dashboard"} 
                </h1>
            </div>
            <X className='w-6 h-6 absolute top-2 right-2 md:hidden' onClick={() => setSidebarToggle(false)} />
            <hr />
            <ul className='mt-3 font-bold'>
                {role === "admin" ? (
                    AdminSidebarData.map((data, i) => (
                        <li key={i} className='mb-2 rounded hover:shadow hover:bg-[#DB4444] py-2'>
                            <Link to={data.href} className='px-3 w-full' onClick={() => setSidebarToggle(false)}>
                                {data.icon === "dashboard" ? (<LayoutDashboard className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                    : data.icon === "category" ?
                                        (<Boxes className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                        : data.icon === "product" ?
                                            (<ShoppingBag className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                            : data.icon === "user" ?
                                                (<UserRoundIcon className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                                : data.icon === "seller" ?
                                                    (<BadgeDollarSign className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                                    : data.icon === "order" ?
                                                        (<ShoppingBasket className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                                        : null}
                                {data.title}
                            </Link>
                        </li>
                    ))
                ) :
                    (SellerSidebarData.map((data, i) => (
                        <li key={i} className='mb-2 rounded hover:shadow hover:bg-[#DB4444] py-2'>
                            <Link to={data.href} className='px-3 w-full' onClick={() => setSidebarToggle(false)}>
                                {data.icon === "dashboard" ? (<LayoutDashboard className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                    : data.icon === "category" ?
                                        (<Boxes className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                        : data.icon === "product" ?
                                            (<ShoppingBag className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                            : data.icon === "user" ?
                                                (<UserRoundIcon className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                                : data.icon === "seller" ?
                                                    (<BadgeDollarSign className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                                    : data.icon === "order" ?
                                                        (<ShoppingBasket className='inline-block w-6 h-6 mr-2 -mt-2' />)
                                                        : null}
                                {data.title}
                            </Link>
                        </li>
                    )))}
            </ul>
        </aside>
    )
}

export default SideBar;
