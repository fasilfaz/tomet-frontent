import { OrderTable } from '@/components'
import BreadCrumbTwo from '@/components/userComponents/BeadCrumTwo';
import { getSellerOrders } from '@/redux/features/orders/orderSlice';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const SellerOrderPage = () => {
  const [orders, setOrders] = useState();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.orders.dataIsLoading);

  useEffect(() => {
    dispatch(getSellerOrders())
      .unwrap()
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
  }, [dispatch, orders])
  return (
    <div className='container py-5'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Seller Orders - Urban Nest Furniture | Manage Orders</title>
        <meta name="description" content="Efficiently manage orders with Urban Nest's seller dashboard. Track, process, and fulfill furniture orders to ensure timely delivery and customer satisfaction." />
        <meta name="keywords" content="urban nest seller orders, manage orders, furniture e-commerce seller dashboard, order tracking, order processing, order fulfillment" />
        <link rel="canonical" href="https://urban-nest-app.netlify.app/seller/orders" />
      </Helmet>
      <Toaster />
      <div className='flex justify-start'>
        <BreadCrumbTwo href={"/seller/dashboard"} page1={"Dashboard"} page2={"Orders"} color={"text-black dark:text-white"} />
      </div>  
      <OrderTable orders={orders} />
    </div>
  )
}

export default SellerOrderPage