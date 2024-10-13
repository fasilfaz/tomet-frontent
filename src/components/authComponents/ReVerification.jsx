import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { resentEmailVerification } from '@/redux/features/users/userSlice';
import toast from 'react-hot-toast';

const ReEmailVerificationPage = () => {
    const loading = useSelector(state => state.users.isLoading);
    const dispatch = useDispatch();


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        dispatch(resentEmailVerification(data))
        .unwrap()
        .then(res => {
            toast.success(res.message, {duration: 3000})
            reset();
        })
        .catch(
            err => toast.error(err, {duration: 3000})
        )
    };

    return (
        <div className="flex justify-center items-center h-full">
            <Card className="rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Email Verification</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Label htmlFor="email" className="block font-bold mb-2">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type={loading ? "button" : "submit"}
                        className="bg-[#da4444] hover:bg-[#da5555] text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                        {loading ? (<>Submitting<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Submit"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ReEmailVerificationPage;