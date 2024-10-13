import { OrderTable, SubBanner, TableSkeleton } from '@/components';
import { getUserOrders } from '@/redux/features/orders/orderSlice';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';

const OrderLists = () => {
    const [orders, setOrders] = useState();
    const dispatch = useDispatch();
    const role = useSelector(state => state.users.user.userInfo.role);
    // const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // const loading = true;

    useEffect(() => {
        dispatch(getUserOrders())
            .unwrap()
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
                setError(true)
            })
    }, [dispatch, orders]);

    return (
        <div className="p-0">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Orders - Tomet Clothing | View Order History</title>
                <meta name="description" content="View your order history with Tomet Clothing. Track order status, manage returns, and review past purchases to stay updated on your apparel deliveries" />
                <meta name="keywords" content="Tomet Clothing My Orders, View Order History, Fashion E-commerce User Dashboard, Order Tracking, Returns Management, Purchase History" />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/user/orders" />
            </Helmet>
            {role === "admin" ? <Toaster /> : null}
            <div className="mb-5">
                <SubBanner color={"text-black"} href={'/'} page1={"Home"} page2={"My Orders"} />
            </div>
            {
                error ?
                    (<p>error....</p>)
                    : (
                        <div className="container">
                            <OrderTable orders={orders} />
                        </div>
                    )
            }
        </div>
    )
}

export default OrderLists