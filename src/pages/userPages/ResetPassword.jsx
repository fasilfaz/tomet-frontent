import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast, { Toaster } from 'react-hot-toast'; // assuming you're using react-hot-toast
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { resetPassword } from '@/redux/features/users/userSlice';

// Define validation schema using yup
const schema = yup.object().shape({
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const user = searchParams.get('user');
    const token = searchParams.get('token');
    const [visible, setVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const loading = useSelector(state => state.users.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const togglePasswordVisibility = () => setVisible(!visible);
    const toggleConfirmPasswordVisibility = () => setConfirmVisible(!confirmVisible);

    const onSubmit = async (data) => {
        dispatch(resetPassword({
            password: data.password,
            token: token,
            user: user,
        }))
            .unwrap()
            .then(res => {
                toast.success(res.message, { duration: 1000 });
                setTimeout(() => navigate('/login'), 1000);
            })
            .catch(err => {
                toast.error(err, { duration: 1000 });
            });
    };
    //   console.log(queryParam)

    return (
        <div className='container py-20'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password - Tomet Clothing | Update Your Password</title>
                <meta name="description" content="Update your password securely with Tomet Clothing. Follow simple steps to reset your account password and ensure secure access to your online account" />
                <meta name="keywords" content="Tomet Clothing Reset Password, Update Password, Fashion E-commerce Account Security, Password Reset, Secure Password Update" />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/reset-password" />
            </Helmet>
            <Toaster />
            <h1 className="text-center text-2xl font-bold mb-6">Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-5'>
                    <div className="mt-2">
                        <Label htmlFor="password" className="text-base font-medium text-gray-300">Password</Label>
                        <div className='flex relative mt-2'>
                            <Input
                                className="flex h-10 w-full rounded-md border border-orange-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                type={visible ? "text" : "password"}
                                placeholder="Password"
                                {...register('password')}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-2"
                                onClick={togglePasswordVisibility}
                            >
                                {visible ? <Eye className='text-orange-700' /> : <EyeOff className='text-orange-700' />}
                            </button>
                        </div>
                        {errors.password?.message && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="mt-2 pb-5">
                        <Label htmlFor="confirmPassword" className="text-base font-medium text-gray-300">Confirm Password</Label>
                        <div className='flex relative mt-2'>
                            <Input
                                className="flex h-10 w-full rounded-md border border-orange-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                type={confirmVisible ? "text" : "password"}
                                placeholder="Confirm Password"
                                {...register('confirmPassword')}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-2"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmVisible ? <Eye className='text-orange-700' /> : <EyeOff className='text-orange-700' />}
                            </button>
                        </div>
                        {errors.confirmPassword?.message && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                    </div>
                </div>
                <Button
                    type={loading ? "button" : "submit"}
                    className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray/80"
                >
                    {loading ? (
                        <>
                            Reseting
                            <span className='animate-pulse'>.</span>
                            <span className='animate-pulse'>.</span>
                            <span className='animate-pulse'>.</span>
                        </>
                    ) : "Reset Password"}
                </Button>
            </form>
        </div>
    );
}

export default ResetPassword;