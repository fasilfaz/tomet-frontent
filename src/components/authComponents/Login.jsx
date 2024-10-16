import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import toast, { Toaster } from 'react-hot-toast';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../ui/input';
import { Helmet } from 'react-helmet';
import { loginUser } from '../../redux/features/users/userSlice';
import loginImg from "../../assets/row-colorful-shopping-bags-with-one-that-says-shopper-it.jpg"

const signinSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});

const Login = () => {
    const loading = useSelector(state => state.users.isLoading);
    // console.log(loading)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [visiable, setVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(signinSchema) });


    const onSubmit = async (data) => {
        console.log(data);
        dispatch(loginUser(data)).unwrap()
            .then(res => {
                toast.success(res.message, { position: "top-center", duration: 1500 })
                setTimeout(() => {
                    if (res.data.role === "admin") {
                        navigate('/admin/dashboard');
                    } else if (res.data.role === "seller") {
                        navigate('/seller/dashboard');
                    } else {
                        navigate('/');
                    }
                }, 1500)
            })
            .catch(err => toast.error(err, { duration: 1500 }))
    };


    const togglePasswordVisibility = () => {
        setVisible(prevVisible => !prevVisible);
    };

    return (
        <section className="h-full w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login - Tomet Clothing | Sign in to Your Account</title>
                <meta name="description" content="Sign in to your Tomet Clothing account. Access your saved preferences, track orders, and manage your fashion shopping experience securely online." />
                <meta name="keywords" content="Tomet Clothing Login, Sign in to Account, Fashion E-commerce, Online Clothing Store, Account Access, User Login." />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/login" />
            </Helmet>
            <Toaster />
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="mx-auto w-full px-5 sm:px-20 lg:px-10">
                        <h2 className="text-3xl font-bold leading-tight text-black  dark:text-white sm:text-4xl">Log in</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/signup"
                                title=""
                                className="font-semibold text-black dark:text-white transition-all duration-200"
                            >
                                <span className='hover:underline hover:text-blue-500'>Create a free account</span>
                            </Link>
                        </p>
                        <form action="#" className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-5">
                                <div className="mt-2">
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...register('email')}
                                    />
                                    {errors.email?.message && <p className='text-red-500'>{errors.email?.message}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-300">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <Link
                                            to="/forgot-password"
                                            title=""
                                            className="text-sm font-semibold hover:underline"
                                        >
                                            {' '}
                                            Forgot password?{' '}
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <div className='flex relative '>
                                            <Input
                                                type={visiable ? "text" : "password"}
                                                placeholder="Password"
                                                {...register('password')}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-4 top-2"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {visiable ? <Eye className='text-blue-700' /> : <EyeOff className='text-blue-700' />}
                                            </button>
                                        </div>
                                        {errors.password?.message && <p className='text-red-500'>{errors.password?.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        type={loading ? "button" : "submit"}
                                        className="inline-flex w-full items-center justify-center rounded-md =px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray/80"
                                    >
                                        {loading ? (<>processing<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Get started"} <ArrowRight className="ml-2" size={16} />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="lg:inline hidden">
                    <img
                        className="mx-auto h-full w-full object-cover"
                        src={`${loginImg}`}
                        alt="login page image"
                    />
                </div>
            </div>
        </section>
    )
}

export default Login
