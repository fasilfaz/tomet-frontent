import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import toast, { Toaster } from 'react-hot-toast';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createUser } from '../../redux/features/users/userSlice';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const signupSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
    profile: yup.mixed().required('Image is required')
        .test('required', 'You need to provide one profile pic', value => value && value.length === 1)
        .test('fileFormat', 'Unsupported file format', value => value && value.length === 1 && SUPPORTED_FORMATS.includes(value[0].type))
});

const Signup = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const [visiable, setVisible] = useState(false);
    const [confirmVisiable, setComfirmVisible] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(signupSchema) });

    const onSubmit = async (data) => {
        setloading(true);
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('avatar', data.profile[0]);

        // Inspect the FormData content
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        dispatch(createUser(formData)).unwrap()
            .then(res => {
                setloading(false);
                toast.success(res.message, { position: "top-center", duration: 3000 })
            })
            .catch(err =>{
                setloading(false);
                toast.error(err.message, { duration: 3000 })
            })
    }

    const togglePasswordVisibility = () => {
        setVisible(prevVisible => !prevVisible);
    };
    const toggleComfirmPasswordVisibility = () => {
        setComfirmVisible(prevVisible => !prevVisible);
    };

    const [file, setFile] = useState("https://res.cloudinary.com/freestyle07/image/upload/v1718778160/user_wv18wq.png");

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        // setValue('profile', e.target.files);
    }

    return (
        <section className="h-full w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up - Urban Nest Furniture | Create Your Account</title>
                <meta name="description" content="Create your Urban Nest account today. Join our community, save preferences, track orders, and enjoy a personalized furniture shopping experience online." />
                <meta name="keywords" content="urban nest sign up, create account furniture store, furniture e-commerce, online registration, user registration, personalized shopping experience" />
                <link rel="canonical" href="https://urban-nest-app.netlify.app/signup" />
            </Helmet>
            <Toaster />
            <div className='grid lg:grid-cols-2 h-full'>
                <div className='lg:flex hidden'>
                    <img
                        src="https://res.cloudinary.com/freestyle07/image/upload/v1718778060/signup_etk28h.webp"
                        className='object-center'
                        alt="sign up image"
                    />
                </div>
                <div className='container'>
                    <h2 className="text-3xl text-center font-bold leading-tight text-black dark:text-white sm:text-4xl">Sign Up</h2>
                    <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-auto w-full">
                            <img
                                src={file}
                                alt="Avatar"
                                className="w-[130px] mb-2 mx-auto h-[130px] rounded-full border-2 border-gray-400"
                            />
                            <input
                                type="file"
                                {...register('profile')}
                                onChange={handleChange}
                            />
                            {errors.profile?.message && <p className='text-red-500'>{errors.profile?.message}</p>}
                        </div>

                        <div className="space-y-5">
                            <div className='grid sm:grid-cols-2 place-items-center gap-5' >
                                <div className='w-full'>
                                    <label htmlFor="firstName" className="text-base font-medium">
                                        {' '}
                                        First Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="First Name"
                                            id="firstName"
                                            {...register('firstName')}
                                        ></input>
                                        {errors.firstName?.message && <p className='text-red-500'>{errors.firstName?.message}</p>}
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="lastName" className="text-base font-medium">
                                        {' '}
                                        Last Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Last Name"
                                            id="lastName"
                                            {...register('lastName')}
                                        ></input>
                                        {errors.lastName?.message && <p className='text-red-500'>{errors.lastName?.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="email" className="text-base font-medium">
                                    {' '}
                                    Email{' '}
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    {...register('email')}
                                ></input>
                                {errors.email?.message && <p className='text-red-500'>{errors.email?.message}</p>}
                            </div>
                            <div>
                                <div className='grid gap-5 sm:grid-cols-2'>
                                    <div className="mt-2">
                                        <label htmlFor="" className="text-base font-medium text-gray-300">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <div className='flex relative '>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
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
                                    <div className="mt-2">
                                        <label htmlFor="email" className="text-base font-medium">
                                            {' '}
                                            Confirm Password{' '}
                                        </label>
                                        <div className='flex relative '>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                                type={confirmVisiable ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                {...register('confirmPassword')}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-4 top-2"
                                                onClick={toggleComfirmPasswordVisibility}
                                            >
                                                {confirmVisiable ? <Eye className='text-blue-700' /> : <EyeOff className='text-blue-700' />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword?.message && <p className='text-red-500'>{errors.confirmPassword?.message}</p>}
                                    </div>
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
                            <p className="mt-2 text-right text-sm text-gray-600 pb-2">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    title=""
                                    className="font-semibold text-black dark:text-white transition-all duration-200"
                                >
                                    <span className='hover:underline hover:text-blue-500'>Log in</span>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signup
