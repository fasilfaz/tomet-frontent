import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { latestSellers } from '@/redux/features/users/userSlice';

const DashbordCard = () => {
    const [sellers, setSellers] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(latestSellers())
            .unwrap()
            .then(res => setSellers(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recently Joined Sellers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-5'>
                    {sellers?.map(seller => (
                        <div key={seller._id} className='flex items-center gap-5'>
                            <img src={seller.avatar?.url} className='w-10 h-10 rounded-full' alt={seller?.firstName} />
                            <div className='grid sm:flex sm:justify-between w-full gap-5'>
                                <div>
                                    <p>{seller?.firstName} {seller?.lastName}</p>
                                </div>
                                <div>
                                    <p className='text-right'>{moment(seller?.createdAt).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default DashbordCard;
