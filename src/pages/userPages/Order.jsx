import React, { useEffect, useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { OrderItems, OrderSummary } from '@/components';
import { getOrderById, getPaymentToken, postPayment } from '@/redux/features/orders/orderSlice';
import { Card } from '@/components/ui/card';

const Order = () => {
    const [clientToken, setClientToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [order, setOrder] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPaymentToken())
            .unwrap()
            .then(res => setClientToken(res.data.clientToken))
            .catch(err => console.log(err));
        dispatch(getOrderById(id))
            .unwrap()
            .then(res => setOrder(res.data))
            .catch(err => console.log(err));
    }, [dispatch]);

    const handlePayment = async () => {
        const { nonce } = await instance.requestPaymentMethod();
        dispatch(postPayment({ nonce, orderId: order._id }))
            .unwrap()
            .then(res => {
                toast.success(res.message, { duration: 1000 })
                setTimeout(() => navigate('/user/orders'), 1000)
            })
            .catch(err => toast.success(err, { duration: 1000 }))
    };

    return (

        <Card className="mx-auto my-4 md:my-6 container py-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Order Payment - Urban Nest Furniture | Complete Your Purchase</title>
                <meta name="description" content="Complete your purchase securely at Urban Nest. Follow the payment process to finalize your order for quality furniture and home decor items. Shop confidently online!" />
                <meta name="keywords" content="urban nest order payment, complete purchase furniture, secure online payment, furniture checkout, home decor shopping, order confirmation" />
                <link rel="canonical" href="https://urban-nest-app.netlify.app/order/:id" />
            </Helmet>
            <div className="overflow-hidden rounded-xl ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Product List */}
                    <div className="px-5 py-6 md:border-r md:border-r-gray-200 md:px-8">
                        <div className="flow-root">
                            <ul className="-my-7 divide-y divide-gray-200">
                                <OrderItems orderItems={order?.orderItems} />
                            </ul>
                            <hr className="mt-5 border-gray-200" />
                                <Card className="container mt-5 lg:pt-5 w-full">
                                    <h2 className="text-xl font-bold mb-2 ">Order Summary</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Items</span>
                                        <span>₹ {order?.itemsPrice}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Shipping</span>
                                        <span>₹ {order?.shippingPrice}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Tax</span>
                                        <span>₹ {order?.taxPrice}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Total</span>
                                        <span>₹ {order?.totalPrice}</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        {/* Contact Info */}
                        <div className="px-5 py-6 md:px-8">
                            <div className="flow-root">
                                <div className="-my-6 divide-y divide-gray-200">
                                    <div className="py-6">
                                        <h2 className="text-base font-bold ">Contact Information</h2>
                                        <p className="fontmedium mt-3 text-xs">Order Number: #{order?._id}</p>
                                        <p className="text-xs font-medium">Date: {moment(order?.createdAt).format('DD-MM-YYYY')}</p>
                                    </div>
                                    <div className="py-6">
                                        <h2 className="mb-2 text-base font-bold ">Shipping Information</h2>
                                        <p className="mt-3 text-xs font-medium">{order?.shippingAddress?.state}</p>
                                        <p className="text-xs font-medium">{order?.shippingAddress?.address}</p>
                                        <p className="text-xs font-medium">{order?.shippingAddress?.phone}</p>
                                    </div>
                                    <div className='py-5 container grid place-items-center'>
                                        {clientToken ? (
                                            <DropIn
                                                options={{ authorization: clientToken }}
                                                onInstance={instance => setInstance(instance)}
                                            />
                                        ) : (
                                            <p>Loading payment options...</p>
                                        )}
                                        <Button onClick={handlePayment}
                                            disabled={!instance}
                                        >
                                            Make Payment
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Card>
    );
}

export default Order;
