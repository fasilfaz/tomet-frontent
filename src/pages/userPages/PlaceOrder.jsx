import { EmptyMessage } from '@/components';
import { Card } from '@/components/ui/card';
import ProgressSteps from '@/components/userComponents/ProgressSteps';
import { clearCartItems } from '@/redux/features/carts/cartSlice';
import { createOrder } from '@/redux/features/orders/orderSlice';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const isLoading = useSelector((state) => state.orders.isLoading); 

    useEffect(() => {
        if (!cart.shippingAddress?.address) {
            navigate("/shipping");
        }
    }, [cart.paymentMethod, cart.shippingAddress?.address, navigate]);

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            totalPrice: cart.totalPrice,
            taxPrice: cart.taxPrice,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
        }))
            .unwrap()
            .then(res => {
                toast.success(res.message, { duration: 1000 });
                dispatch(clearCartItems());
                setTimeout(() => navigate(`/order/${res.data?._id}`), 1000);
            })
            .catch(err => {
                toast.error(err || "Failed to create order", { duration: 1000 });
                // Handle specific error scenarios as needed
            });
    };

    return (
        <div className='container py-5'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Place Order - Tomet Clothing | Complete Your Purchase</title>
                <meta name="description" content="Complete your purchase with Tomet Clothing. Proceed securely to finalize your order, enter shipping details, and choose payment options for a seamless shopping experience" />
                <meta name="keywords" content="Tomet Clothing Place Order, Complete Purchase, Fashion E-commerce Checkout, Order Finalization, Shipping Details, Payment Options" />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/placeorder" />
            </Helmet>
            <ProgressSteps step1 step2 step3 />
            <div>
                {cart.cartItems.length === 0 ? (
                    <EmptyMessage msg={"your cart is empty"} />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <td className="px-1 py-2 text-left align-top">Image</td>
                                    <td className="px-1 py-2 text-left">Product</td>
                                    <td className="px-1 py-2 text-left">Quantity</td>
                                    <td className="px-1 py-2 text-left">Price</td>
                                    <td className="px-1 py-2 text-left">Total</td>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <img
                                                src={item.images[0]?.url}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>

                                        <td className="p-2">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </td>
                                        <td className="p-2">{item.qty}</td>
                                        <td className="p-2">₹ {item.price.toFixed(0)}</td>
                                        <td className="p-2">₹ {(item.qty * item.price).toFixed(0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Card className="mt-8 p-5">
                <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
                <div className="grid sm:grid-cols-3 gap-5 ">
                    <ul className="text-lg">
                        <li>
                            <span className="font-semibold mb-4">Items:</span> ₹
                            {cart.itemsPrice}
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Shipping:</span> ₹
                            {cart.shippingPrice}
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Tax:</span> ₹
                            {cart.taxPrice}
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Total:</span> ₹
                            {cart.totalPrice}
                        </li>
                    </ul>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                        <div>
                            <p><strong>Address:</strong> {cart.shippingAddress?.address}</p>
                            <p><strong>City:</strong> {cart.shippingAddress?.city}</p>
                            <p><strong>Postal Code:</strong> {cart.shippingAddress?.postalCode}</p>
                            <p><strong>Country:</strong> {cart.shippingAddress?.country}</p>
                            <p><strong>Phone:</strong> {cart.shippingAddress?.phone}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                        <strong>Method:</strong> {cart.paymentMethod}
                    </div>
                </div>

                {isLoading ? (
                    <button
                        type="button"
                        className="bg-[#DB4444] text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                        disabled={cart.cartItems === 0}
                    >
                        Processing
                        <span className='animate-pulse'>.</span>
                        <span className='animate-pulse'>.</span>
                        <span className='animate-pulse'>.</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="bg-[#DB4444] text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                    >
                        Place Order
                    </button>
                )}

                {/* {isLoading && <Loader />} */}
            </Card>
        </div>
    );
};

export default PlaceOrder;
