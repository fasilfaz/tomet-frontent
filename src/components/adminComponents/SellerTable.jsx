import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
    DeleteIcon,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from 'moment';
import AlertDialogTamplate from './AlertDialogTamplate';
import { useDispatch } from 'react-redux';
import { EmptyMessage } from '..';
import { fetchSellers } from '@/redux/features/users/userSlice';
import BreadCrumbTwo from '../userComponents/BeadCrumTwo';

const SellerTable = () => {
    const [sellers, setSeller] = useState(null);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSellers(search))
        .unwrap()
        .then(res => setSeller(res.data))
        .catch((err) => console.log(err.response.data))
    }, [search, sellers]);
  return (
    <section className="w-full h-full">
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 ">
        <BreadCrumbTwo 
        href={"/admin/dashboard"} 
        page1={"Dashboard"} 
        page2={"Seller"} 
        color={"text-black dark:text-white"} />
        <div className="flex gap-5 items-center pb-5">
            <div className="relative w-full">
                <Input
                    type="search"
                    id="location-search"
                    className="block p-2.5 w-full md:w-[50vh] z-20 text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-e-lg border-s-2 border border-orange-500 dark:placeholder-gray-400 dark:text-white focus:ring-0 focus-visible:ring-offset-0 focus:border-none"
                    placeholder="Search for users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white rounded-e-lg border border-orange-700 hover:bg-orange-400 focus:outline-none">
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                    <span className="sr-only">Search</span>
                </Button>
            </div>
        </div>
    </div>
    <div className="flex flex-col">
        {sellers?.length === 0 ? (
            <EmptyMessage
            msg={"Sellers Not Found"}
            />
        ) : (
            <>
                <section className='grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-1'>
                    {sellers && sellers.map(seller => (
                        <div key={seller._id} className="bg-gray-100 dark:bg-gray-700 hover:scale-110 relative shadow-md overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-150 ease-in-out transform hover:bg-[#F97316] hover:dark:bg-[#EA580C]">

                            {/* three dots */}
                            <div className='absolute right-2 top-2'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="cursor-pointer relative after:content-['\2807'] after:text-[20px]">
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Manage Users</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <AlertDialogTamplate
                                                description={"This action cannot be undone. This will permanently delete your account and remove associated products from our servers."}
                                                qn={"Are you sure you want to delete this user?"}
                                                action={"Delete"}
                                                textColor={"text-red-500"}
                                                id={seller._id}
                                                path={'user'}
                                                btnText={<div className='flex items-center px-2 py-1 rounded-sm transition-all hover:dark:bg-zinc-800'>
                                                    <DeleteIcon className="mr-2 h-4 w-4 text-black dark:text-white" />
                                                    <span className='text-gray-800 dark:text-gray-200'>Delete</span>
                                                </div>}
                                            />
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            
                            {/* user details */}
                            <div className="flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-4">
                                <img
                                    src={seller.avatar?.url}
                                    alt="Profile picture"
                                    className="rounded-full w-20 h-20 sm:w-14 sm:h-14"
                                    loading="lazy"
                                    width="100"
                                    height="100"
                                />
                                <div className="w-fit transition-all transform duration-500">
                                    <h1 className="text-gray-600 dark:text-gray-200 font-bold capitalize">{seller?.firstName} {seller?.lastName}</h1>
                                    <Link
                                        className="text-xs flex flex-wrap text-gray-500 dark:text-gray-200"
                                    >
                                        {seller?.email}
                                    </Link>
                                    <p className='text-sm text-gray-500 dark:text-gray-200'>role: {seller?.role}</p>
                                    <p className='text-[12px] text-gray-500 dark:text-gray-200'>
                                        joined: {moment(seller?.createdAt).format("MMMM Do YYYY")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </>
        )}
    </div>
</section>
  )
}

export default SellerTable