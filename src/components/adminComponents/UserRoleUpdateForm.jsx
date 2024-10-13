import { axiosInstance } from '@/lib/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '@/redux/features/users/userSlice';

const UserRoleUpdateForm = ({ userId }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(yup.object({
                role: yup.string().required(),
            }))
        }
    );
    const onSubmit = (data) => {
        setLoading(true);
        axiosInstance.patch(`/api/v1/user/${userId}`, data, {withCredentials: true})
        .then(res => {
            setLoading(false);
            toast.success(res.data.message, { duration: 1000 });
            setTimeout(() => {
                navigate('/admin/sellers');
            }, 1000);
        }).catch(err => {
            setLoading(false);
            toast.error(err.response?.data?.message);
        })
    }

    useEffect(() => {
        dispatch(fetchUserById(userId)).unwrap()
            .then(res => setUser(res.user))
            .catch(err => console.log(err))
    }, [userId])

    return (
        <section className='container py-5'>
            <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto w-full">
                    <img
                        src={user?.avatar?.url}
                        alt="Avatar"
                        className="w-[130px] mb-2 mx-auto h-[130px] rounded-full border-2 border-gray-400"
                    />
                </div>

                <div className="space-y-5">
                    <div className='grid sm:grid-cols-2 place-items-center gap-5' >
                        <div className='w-full'>
                            <Label htmlFor="firstName" className="text-base font-medium">
                                {' '}
                                First Name{' '}
                            </Label>
                            <div className="mt-2">
                                <Input
                                    className="flex h-10 w-full rounded-md border border-orange-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    value={user?.firstName}
                                    id="firstName"
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="lastName" className="text-base font-medium">
                                {' '}
                                Last Name{' '}
                            </Label>
                            <div className="mt-2">
                                <Input
                                    className="flex h-10 w-full rounded-md border border-orange-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    value={user?.lastName}
                                    id="lastName"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Label htmlFor="email" className="text-base font-medium">
                            {' '}
                            Email{' '}
                        </Label>
                        <Input
                            className="flex h-10 w-full rounded-md border border-orange-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            value={user?.email}
                            id="email"
                        />
                    </div>
                    <div className="mt-2">
                        <select {...register('role')} className='w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 bg-transparent dark:text-white'>
                            <option className='bg-white dark:bg-gray-900' selected value={'user'}>User</option>
                            <option className='dark:bg-gray-900 bg-white' value="seller">Seller</option>
                            <option className='dark:bg-gray-900 bg-white' value="admin">Admin</option>
                        </select>
                        {errors?.role && <p className="text-red-500">{errors.role.message}</p>}
                    </div>
                    <div>
                        <Button
                            type={loading ? "button" : "submit"}
                            className="inline-flex w-full items-center justify-center rounded-md =px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray/80"
                        >
                            {loading ? (<>Saving<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Save changes"}
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default UserRoleUpdateForm