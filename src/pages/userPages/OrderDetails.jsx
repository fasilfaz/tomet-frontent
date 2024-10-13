import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BreadCrumbThree, OrderDetailTable, TableSkeleton, TextLoading } from '@/components';
import { getOrderById } from '@/redux/features/orders/orderSlice';
import moment from 'moment';

const OrderDetail = () => {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const role = useSelector((state) => state.users.user.userInfo.role);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        dispatch(getOrderById(id))
            .unwrap()
            .then(res => {
                setOrder(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            });
    }, [dispatch, id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>No order found</div>;
    }

    const getBreadcrumb = () => {
        switch (role) {
            case 'admin':
                return (
                    <BreadCrumbThree
                        href1={'/admin/dashboard'}
                        href2={'/admin/orders'}
                        page1={"Dashboard"}
                        page2={"Orders"}
                        page3={"Order Details"}
                    />
                );
            case 'seller':
                return (
                    <BreadCrumbThree
                        href1={'/seller/dashboard'}
                        href2={'/seller/orders'}
                        page1={"Dashboard"}
                        page2={"Orders"}
                        page3={"Order Details"}
                    />
                );
            default:
                return (
                    <BreadCrumbThree
                        href1={'/'}
                        href2={'/user/orders'}
                        page1={"Home"}
                        page2={"Orders"}
                        page3={"Order Details"}
                    />
                );
        }
    };

    return (
        <div className="container py-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Order Details - Tomet Clothing | View Order Details</title>
                <meta name="description" content="View detailed order information for Tomet Clothing. Track order status, manage shipping details, and ensure timely delivery to enhance customer satisfaction." />
                <meta name="keywords" content="Tomet Clothing Order Details, View Order Details, Fashion E-commerce Order Management, Order Tracking, Shipping Details, Customer Satisfaction." />
                <link rel="canonical" href={`https://tomet-frontent.vercel.app/order-details/${id}`} />
            </Helmet>
            <div className="py-5">
                {getBreadcrumb()}
            </div>

            {isLoading ? (
                <TableSkeleton rows={[1,2,3,4,5,6,7,8,9,0]}/>
            ) : (
                <div className="overflow-x-auto ">
                    <OrderDetailTable order={order} />
                    {isLoading ? (
                        <TextLoading counts={[1, 2, 3, 4, 5, 5]} />
                    ) : (
                        <div className='overflow-x-auto container py-5 my-5'>
                            <p className="mb-4">
                                <strong className="text-pink-500">Name:</strong>{" "}
                                <span className='capitalize'>{order.user.firstName}{' '} {order.user.lastName}</span>
                            </p>

                            <p className="mb-4">
                                <strong className="text-pink-500">Email:</strong> {order.user.email}
                            </p>

                            <p className="mb-4">
                                <strong className="text-pink-500">Address:</strong>{" "}
                                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>

                            <p className="mb-4">
                                <strong className="text-pink-500">Method:</strong>{" "}
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <p>Paid on {moment(order?.paidAt).format('DD-MM-YYYY')}</p>
                            ) : (
                                <p className='bg-red-500'>Not paid</p>
                            )}
                        </div>
                    )}

                   <div className="container py-5 w-full">
                   <h2 className="text-xl font-bold mb-2 ">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Items</span>
                        <span>₹ {order.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>₹ {order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>₹ {order.taxPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Total</span>
                        <span>₹ {order.totalPrice}</span>
                    </div>
                   </div>

                    {!order.isPaid && (
                        <div>
                            <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                            ></PayPalButtons>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderDetail;