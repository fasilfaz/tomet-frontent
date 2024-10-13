import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubBanner } from '@/components';
import { updateUser } from '@/redux/features/users/userSlice';
import BreadCrumbTwo from '@/components/userComponents/BeadCrumTwo';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const AdminProfilePage = () => {
    const profile = useSelector(state => state.users.user.userInfo.avatar.url);
    const user = useSelector(state => state.users.user.userInfo);
    const loading = useSelector(state => state.users.isLoading);
    const [file, setFile] = useState(profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type)) {
            setFile(URL.createObjectURL(file));
            setFormData(prevData => ({ ...prevData, profile: file }));
            setErrors(prevErrors => ({ ...prevErrors, profile: '' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, profile: 'Unsupported file format' }));
        }
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.firstName) formErrors.firstName = 'First Name is required';
        if (!formData.lastName) formErrors.lastName = 'Last Name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Invalid email format';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form data:', formData); // Log the form data to the console
            dispatch(updateUser(formData))
                .unwrap()
                .then(res => {
                    toast.success(res.message, { duration: 1000 });
                    setTimeout(() => navigate('/'), 1000)
                })
                .catch(err => toast.error(err, { duration: 1000 }));
        } else {
            toast.error('Please fix the errors in the form.');
        }
    };

    return (
        <div className='container py-5'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>User Profile - Urban Nest Furniture | Manage Your Account</title>
                <meta name="description" content="Manage your account with Urban Nest furniture. Update personal information, view order history, and adjust preferences to enhance your shopping experience." />
                <meta name="keywords" content="urban nest user profile, manage account, furniture e-commerce user dashboard, personal information update, order history, account preferences" />
                <link rel="canonical" href="https://urban-nest-app.netlify.app/user/profile" />
            </Helmet>
            <Toaster />
            <BreadCrumbTwo 
            page1={"Dashboard"}
                page2={"Profile"}
                href={'/admin/dashboard'}
            />
            <form onSubmit={onSubmit} className='container py-5 sm:py-10'>
                <div className="mx-auto w-full ">
                    <img
                        src={file}
                        alt="Avatar"
                        className="w-[130px] mb-4 mx-auto h-[130px] rounded-full border-2 border-gray-400"
                    />
                    <Input
                        type="file"
                        name="profile"
                        onChange={handleFileChange}
                    />
                    {errors.profile && <p className='text-red-500'>{errors.profile}</p>}
                </div>
                <div className="space-y-5">
                    <div className='grid sm:grid-cols-2 place-items-center gap-5'>
                        <div className='w-full'>
                            <Label htmlFor="firstName" className="text-base font-medium">First Name</Label>
                            <div className="mt-2">
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="First Name"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className='text-red-500'>{errors.firstName}</p>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="lastName" className="text-base font-medium">Last Name</Label>
                            <div className="mt-2">
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="Last Name"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className='text-red-500'>{errors.lastName}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Label htmlFor="email" className="text-base font-medium">Email</Label>
                        <Input
                            className="flex h-10 w-full rounded-md border border-orange-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>
                    <div>
                        <Button
                            type={loading ? "button" : "submit"}
                            className="inline-flex w-full items-center justify-center "
                        >
                            {loading ? (<>processing<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Update Profile"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AdminProfilePage;
