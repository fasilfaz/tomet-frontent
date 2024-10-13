import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProgressSteps from '@/components/userComponents/ProgressSteps';
import { savePaymentMethod, saveShippingAddress } from '@/redux/features/carts/cartSlice';

const ShippingPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!shippingAddress?.address) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress]);

    const onSubmit = (data) => {
        console.log(data)
        dispatch(saveShippingAddress(data));
        dispatch(savePaymentMethod("Card"));
        navigate('/placeorder');
    };

    return (
        <div className='container py-5 mx-auto'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Shipping Address - Tomet Clothing | Enter Your Shipping Details</title>
                <meta name="description" content="Enter your shipping address for Tomet Clothing orders. Provide accurate delivery information to ensure your fashion purchases arrive promptly and securely" />
                <meta name="keywords" content="Tomet Clothing Shipping Address, Enter Shipping Details, Fashion E-commerce Checkout, Order Delivery Information, Shipping Information Update" />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/shipping" />
            </Helmet>
            <ProgressSteps step1 step2 />
            <div className="pt-5 flex justify-around items-center flex-wrap">
                <form onSubmit={handleSubmit(onSubmit)} className="w-[40rem] grid gap-5">
                    <h1 className='text-2xl font-semibold'>Shipping</h1>
                    <div className='grid gap-3'>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="Address"
                            id="address"
                            {...register("address", { required: "Address is required" })}
                        />
                        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor="city">City</Label>
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="City"
                            id="city"
                            {...register("city", { required: "City is required" })}
                        />
                        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor="state">State</Label>
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="State"
                            id="state"
                            {...register("state", { required: "State is required" })}
                        />
                        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="Postal Code"
                            id="postalCode"
                            {...register("postalCode", {
                                required: "Postal Code is required",
                                minLength: { value: 6, message: "Postal Code must be 6 characters" },
                                maxLength: { value: 6, message: "Postal Code must be 6 characters" }
                            })}
                        />
                        {errors.postalCode && <p className='text-red-500'>{errors.postalCode.message}</p>}
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor="country">Country</Label>
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="Country"
                            id="country"
                            {...register("country", { required: "Country is required" })}
                        />
                        {errors.country && <p className="text-red-500">{errors.country.message}</p>}
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="Phone Number"
                            id="phone"
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Phone number must be a 10-digit number"
                                }
                            })}
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>
                    <Button type="submit">Continue</Button>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;
