import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultStar from './DefaultStar';
import { FaHeart } from 'react-icons/fa';
import { Heart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addWhislistToLocalStorage, getWhislistFromLocalStorage, removeWhislistFromLocalStorage } from '@/lib/localStorage';
import { addToWhislist, removeFromWhislist, setWhislist } from '../../redux/features/whislists/whislistSlice';
import { Card } from '../ui/card';

const ProductCard = ({ products }) => {
    const dispatch = useDispatch();
    const [id, setId] = useState(null);
    const whislists = useSelector(state => state.whislists) || [];

    useEffect(() => {
        const whislistFromLocalStorage = getWhislistFromLocalStorage();
        dispatch(setWhislist(whislistFromLocalStorage));
    }, [dispatch]);

    const toggleFavColor = (product) => {
        setId(product._id);
        const isWhislist = whislists.some(p => p._id === product._id);

        if (isWhislist) {
            dispatch(removeFromWhislist(product));
            removeWhislistFromLocalStorage(product._id);
        } else {
            dispatch(addToWhislist(product));
            addWhislistToLocalStorage(product);
        }
    };

    return (
         products?.map(product => (
                    <Card key={product._id} className="product h-[380px] sm:h-[350px] lg:h-[380px]  relative z-15 shadow-md hover:scale-105 transition-all delay-100 ease-in-out rounded-md">
                        <figure className="w-full h-64">
                            <img
                                src={product.images[0]?.url}
                                alt="Product Image"
                                className="product-image w-full h-full object-cover rounded-t-md"
                            />
                        </figure>
                        <div className='absolute top-2 right-2' onClick={() => toggleFavColor(product)}>
                            {whislists.some(p => p._id === product._id) ? (
                                <FaHeart className='w-6 h-6 text-red-500' />
                            ) : (
                                <Heart className='w-6 h-6 text-black dark:text-white/85' />
                            )}
                        </div>
                        <Link to={`/product/${product._id}`} className="block">
                            <div className="py-2 px-4 0 clearfix">
                                <div className="text-gray-500 dark:text-gray-200 text-sm">
                                    <h1 className="text-xl mb-1">{product.name}</h1>
                                    <DefaultStar star={product.rating} review={product.numReviews} starSize={false} />
                                </div>
                                <div>
                                    <span className="text-xl font-medium">₹{product.price}</span>
                                </div>
                            </div>
                        </Link>
                    </Card>
                ))
    );
};

export default ProductCard;
