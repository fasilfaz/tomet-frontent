import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card } from '../ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emailVerification } from '@/redux/features/users/userSlice';
import toast from 'react-hot-toast';

// Define validation schema using Yup
const validationSchema = yup.object({
    otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
});

function VerificationEmail() {
    const [error, setError] = useState(false);
    const loading = useSelector(state => state.users.isLoading);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = (data) => {
        dispatch(emailVerification({
            id: id,
            otp: data.otp
        })).unwrap()
            .then(res => {
                reset();
                toast.success(res.message, { duration: 2000 })
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            })
            .catch(err => {
                toast.error(err, { duration: 2000 })
                setError(true)
            })
    };

    return (
        <div className="flex justify-center items-center h-full">
            <Card className="shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
                <p className="mb-6">
                    We've sent a 4-digit verification code to your email. Enter the code below to verify your account.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label htmlFor="otp" className="block font-bold mb-2">
                            Verification Code
                        </label>
                        <Controller
                            name="otp"
                            control={control}
                            render={({ field }) => (
                                <InputOTP
                                    maxLength={4}
                                    pattern={REGEXP_ONLY_DIGITS}
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                >
                                    <InputOTPGroup>
                                        {[0, 1, 2, 3].map((index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                value={field.value?.[index] ?? ''}
                                                onChange={(value) => {
                                                    const otp = field.value ?? '';
                                                    const newOtp = otp.split('');
                                                    newOtp[index] = value;
                                                    field.onChange(newOtp.join(''));
                                                }}
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                        />
                        {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
                    </div>
                   <div className='grid gap-5'>
                   <Button
                        type={loading ? "button" : "submit"}
                        className="bg-[#da4444] hover:bg-[#da5555] text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                        {loading ? (<>processing<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Verify"}
                    </Button>

                    {error && <Button
                        onClick={() => navigate('/resend-verification-email')}
                        className="bg-[#da4444] hover:bg-[#da5555] text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                        Resend Email
                    </Button>}
                   </div>
                </form>
            </Card>
        </div>
    );
}

export default VerificationEmail;