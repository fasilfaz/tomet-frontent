import { BarGraph, DashBoardLoader, DashbordCard, LineGraph, Stats } from '@/components';
import { Card, CardTitle } from '@/components/ui/card';
import { getAdminData } from '@/redux/features/products/productSlice';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from './ErrorMessage';
import { getTotalSalesForAdmin } from '@/redux/features/orders/orderSlice';

const AdminDashboard = () => {
    const user = useSelector(state => state.users.user.userInfo);
    const [data, setData] = useState();
    const [totalSales, setTotalSales] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(getAdminData())
            .unwrap()
            .then(res => {
                setData(res.data);
                setLoading(false);
                setError(false);
            })
            .catch(err => {
                setLoading(false);
                setError(true);
                console.log(err);
            });

        dispatch(getTotalSalesForAdmin())
            .unwrap()
            .then(res => setTotalSales(res.data))
            .catch(err => console.log(err));
            // console.log(data)
    }, [dispatch]);

    const barData = [
        data?.totalProduct,
        data?.totalOrder,
        data?.totalUser,
        data?.totalSeller,
    ];

    return (
        <div className='container py-5'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin Dashboard - Urban Nest Furniture | Manage Your E-commerce Operations</title>
                <meta name="description" content="Monitor and manage your e-commerce operations efficiently with Urban Nest's admin dashboard. Track sales, manage inventory, and optimize your furniture store's performance." />
                <meta name="keywords" content="urban nest admin dashboard, e-commerce operations management, furniture store admin panel, sales tracking, inventory management, performance optimization" />
                <link rel="canonical" href="https://urban-nest-app.netlify.app/admin/dashboard" />
            </Helmet>
            {error ? (
                <ErrorMessage />
            ) : loading ? (
                <DashBoardLoader skeletonItems={[1, 2, 3, 4]} />
            ) : (
                <div>
                    <h1 className="text-2xl font-semibold pb-5">
                        Welcome,{' '}
                        <span className='text-orange-500 capitalize'>{user.firstName}</span>{' '}
                        <span className='text-orange-500 capitalize'>{user.lastName}</span>
                    </h1>
                    <div className='grid sm:grid-cols-2 gap-5 lg:grid-cols-4'>
                        <Stats title={"Total Sales"} data={`₹ ${totalSales ? totalSales : 0}`} />
                        <Stats title={"Total Orders"} data={data?.totalOrder} />
                        <Stats title={"Total Customers"} data={data?.totalUser} />
                        <Stats title={"Total Sellers"} data={data?.totalSeller} />
                    </div>
                    <div className='grid md:grid-cols-2 gap-5 mt-5'>
                        <div className="overflow-x-auto overflow-y-hidden">
                            <Card className="min-w-[30rem] grid place-items-center py-5 container">
                                <LineGraph data={barData} />
                            </Card>
                        </div>
                        <DashbordCard />
                    </div>
                    <div className='grid gap-5 lg:grid-cols-3 mt-5'>
                        <Card className="grid gap-4 p-5 place-items-center  hover:scale-105 transition-all delay-150 ease-in-out ">
                            <div className="uppercase font-semibold">Total Products</div>
                            <div className="text-2xl font-semibold">{data?.totalProduct ? data.totalProduct : 0}</div>
                        </Card>
                        <Card className="grid gap-4 p-5 place-items-center  hover:scale-105 transition-all delay-150 ease-in-out ">
                            <div className="uppercase font-semibold">Total Categories</div>
                            <div className="text-2xl font-semibold">{data?.totalCategory ? data.totalCategory : 0}</div>
                        </Card>
                        <Card className="grid gap-4 p-5 place-items-center  hover:scale-105 transition-all delay-150 ease-in-out ">
                            <div className="uppercase font-semibold">Total Brands</div>
                            <div className="text-2xl font-semibold">{data?.totalBrand ? data.totalBrand : 0}</div>
                        </Card>
                    </div>
                    <div className="overflow-x-auto overflow-y-hidden">
                    <Card className="min-w-[30rem] h-[25rem] grid place-items-center py-5 container mt-5">
                        <BarGraph values={barData} />
                    </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
