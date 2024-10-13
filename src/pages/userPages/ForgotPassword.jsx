import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { forgotPassword } from '@/redux/features/users/userSlice';

const ForgotPassword = () => {
  const loading = useSelector(state => state.users.isLoading);
  const dispatch = useDispatch();

  // Define the validation schema
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
  });

  // Initialize the form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    dispatch(forgotPassword(data))
      .unwrap()
      .then((res) => {
        toast.success(res.message, { duration: 3000 });
      })
      .catch((error) => {
        toast.error(error || "An error occurred");
      });
  };

  return (
    <div className='container py-20'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password - Tomet Clothing | Reset Your Account Password</title>
        <meta name="description" content="Forgot your password? Reset it securely at Tomet Clothing. Follow the simple steps to regain access to your account and manage your clothing shopping experience confidently online." />
        <meta name="keywords" content="Tomet Clothing Forgot Password, Reset Account Password, Secure Password Reset, Online Clothing Store, Account Recovery, Password Recovery." />
        <link rel="canonical" href="https://tomet-frontent.vercel.app/forget-password" />
      </Helmet>
      <Toaster />
        <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              className="mt-2"
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <Button
            type={loading ? "button" : "submit"}
            className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray/80"
          >
            {loading ? (
              <>
                Processing
                <span className='animate-pulse'>.</span>
                <span className='animate-pulse'>.</span>
                <span className='animate-pulse'>.</span>
              </>
            ) : "Reset Password"}
          </Button>
        </form>
    </div>
  );
};

export default ForgotPassword;
