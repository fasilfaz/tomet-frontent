import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubBanner } from '@/components';
import { updateUser } from '@/redux/features/users/userSlice';

const passwordSchema = yup.object().shape({
  password: yup.string().required('Current Password is required'),
  newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('New Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required('Confirm Password is required'),
});

const ChangePassword = () => {
  const loading = useSelector(state => state.users.isLoading);
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const togglePasswordVisibility = () => {
    setVisible(prevVisible => !prevVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmVisible(prevVisible => !prevVisible);
  };

  const onSubmit = (data) => {
    dispatch(updateUser(data))
      .unwrap()
      .then(res => {
        toast.success(res.message, { duration: 1000 });
        setTimeout(() => navigate('/'), 1000)
      })
      .catch(err => toast.error(err, { duration: 2000 }));
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change Password - Tomet Clothing | Secure Account Management</title>
        <meta name="description" content="Change your password securely at Tomet Clothing. Protect your account with our easy-to-use password update feature. Manage your fashion shopping experience confidently online." />
        <meta name="keywords" content="Tomet Clothing Change Password, Update Account Password, Secure Account Management, Online Clothing Store, Account Security, Password Reset." />
        <link rel="canonical" href="
        https://tomet-frontent.vercel.app/user/password
        "/>
      </Helmet>
      <Toaster />
      <SubBanner 
      page1={"Home"}
      page2={"Change Password"}
      href={"/"}
      color={"text-black"}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='container py-5'>
        <div className="space-y-5">
          <div className='grid gap-5'>
            <div className="mt-2">
              <Label htmlFor="password" className="text-base font-medium">Password</Label>
              <div className='flex relative'>
                <Input
                className="mt-2"
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-4 top-4"
                  onClick={togglePasswordVisibility}
                >
                  {visible ? <Eye className='text-orange-700' /> : <EyeOff className='text-orange-700' />}
                </button>
              </div>
              {errors.password?.message && <p className='text-red-500'>{errors.password?.message}</p>}
            </div>
            <div className="mt-2">
              <label htmlFor="newPassword" className="text-base font-medium">New Password</label>
              <div className='flex relative'>
                <Input
                className="mt-2"
                  type={visible ? "text" : "password"}
                  placeholder="New Password"
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  className="absolute right-4 top-4"
                  onClick={togglePasswordVisibility}
                >
                  {visible ? <Eye className='text-orange-700' /> : <EyeOff className='text-orange-700' />}
                </button>
              </div>
              {errors.newPassword?.message && <p className='text-red-500'>{errors.newPassword?.message}</p>}
            </div>
            <div className="mt-2">
              <Label htmlFor="confirmPassword" className="text-base font-medium">Confirm Password</Label>
              <div className='flex relative'>
                <Input
                  className="mt-2"
                  type={confirmVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  className="absolute right-4 top-4"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmVisible ? <Eye className='text-orange-700' /> : <EyeOff className='text-orange-700' />}
                </button>
              </div>
              {errors.confirmPassword?.message && <p className='text-red-500'>{errors.confirmPassword?.message}</p>}
            </div>
          </div>
          <div>
            <Button
              type={loading ? "button" : "submit"}
              className="inline-flex w-full items-center justify-center"
            >
              {loading ? (<>processing<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Change Password"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
