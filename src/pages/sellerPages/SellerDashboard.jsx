import { AreaGraph, DashBoardLoader, SellerBarGraph, Stats } from '@/components'
import { Card } from '@/components/ui/card'
import { getSellerData } from '@/redux/features/products/productSlice'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../adminPages/ErrorMessage'
import { getTotalSalesForSeller } from '@/redux/features/orders/orderSlice'

const SellerDashBoardPage = () => {
  const user = useSelector(state => state.users.user.userInfo)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [sales, setSales] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getSellerData())
      .unwrap()
      .then(res => {
        setData(res.data);
        setLoading(false);
        setError(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err)
      })

    dispatch(getTotalSalesForSeller())
      .unwrap()
      .then(res => {
        setSales(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  const barData = [
    {
      name: 'Products',
      uv: data?.totalProduct,
    },
    {
      name: 'Orders',
      uv: data?.totalOrder,
    }
  ];

  return (
    <div className="h-screen container py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Seller Dashboard - Tomet Clothing | Manage Your Store</title>
        <meta name="description" content="Manage your clothing store effectively with Tomet Clothing's seller dashboard. Track sales, manage orders, and optimize your store to grow your business and enhance customer satisfaction." />
        <meta name="keywords" content="Tomet Clothing Seller Dashboard, Manage Clothing Store, Fashion E-commerce Seller Tools, Sales Tracking, Order Management, Store Optimization" />
        <link rel="canonical" href="https://tomet-frontent.vercel.app/seller/dashboard" />
      </Helmet>
      <Toaster />
      {error ? <ErrorMessage /> :
        loading ? <DashBoardLoader />
          : (
            <div>
              <h1
                className="text-2xl font-semibold pb-5"
              >
                Welcome,{' '}
                <span className='text-orange-500 capitalize'>{user.firstName}</span>{' '}
                <span className='text-orange-500 capitalize'>{user.lastName}</span>
              </h1>
              <div className='grid lg:grid-cols-3 gap-5'>
                <Stats
                  data={`₹ ${sales ? sales : 0}`}
                  title={"Total Sales"}
                />
                <Stats
                  data={data?.totalProduct || 0}
                  title={"Total Products"}
                />
                <Stats
                  data={data?.totalOrder || 0}
                  title={"Total Orders"}
                />
              </div>
              <div className='grid md:grid-cols-2 gap-5 mt-5'>
                <div className="overflow-x-auto overflow-y-hidden">
                  <Card className="min-w-[30rem] grid place-items-center py-5 container h-full">
                    <AreaGraph />
                  </Card>
                </div>
                <div className="overflow-x-auto overflow-y-hidden">
                  <Card className="min-w-[30rem] grid place-items-center py-5 container h-full">
                    <SellerBarGraph values={[data?.totalProduct || 0, data?.totalOrder || 0]} />
                  </Card>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}

export default SellerDashBoardPage