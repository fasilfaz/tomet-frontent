import React, { useEffect, useState } from 'react';
import DefaultStar from './DefaultStar';
import { Button } from '../ui/button';
import { Heart, ShoppingBasket, Truck } from 'lucide-react';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToWhislist, removeFromWhislist, setWhislist } from '@/redux/features/whislists/whislistSlice';
import { addWhislistToLocalStorage, getWhislistFromLocalStorage, removeWhislistFromLocalStorage } from '@/lib/localStorage';
import { addToCart } from '@/redux/features/carts/cartSlice';

const ProductDetails = ({ product }) => {
    const [count, setCount] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const whislists = useSelector(state => state.whislists) || [];
    const isWhislist = whislists.some(p => p._id === product?._id);

    useEffect(() => {
        const whislistFromLocalStorage = getWhislistFromLocalStorage();
        dispatch(setWhislist(whislistFromLocalStorage));
    }, []);

    const toggleFavColor = () => {
        if (isWhislist) {
            dispatch(removeFromWhislist(product));
            removeWhislistFromLocalStorage(product._id);
        } else {
            dispatch(addToWhislist(product));
            addWhislistToLocalStorage(product);
        }
    };

    const handleInc = () => {
        if (count < product?.quantity) {
            setCount(count + 1);
        }
    };

    const handleDec = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const maxDescriptionLength = 500;
    const description = product?.description || '';
    const truncatedDescription = showFullDescription ? description : description.slice(0, maxDescriptionLength) + '...';

    const handleReadMoreClick = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({...product, qty: count}))
        toast.success("Product added successfully", {duration: 1000})
        setTimeout(() => navigate('/cart'), 1000);
    }
    return (
        <aside  className='container lg:p-0 mt-0 md:mt-14 lg:mt-5'>
            <div className='pb-5'>
                <h1 className='capitalize text-2xl'>{product?.name}</h1>
                <div className="py-2">
                    <DefaultStar
                        star={product?.rating}
                        review={product?.numReviews}
                        starSize={true}
                    />
                </div>
                <p className='text-xl'>₹{product?.price} <span className='text-sm dark:text-zinc-300 text-zinc-600'>/per pcs</span></p>
                <div className="py-2 text-justify leading-6 dark:text-zinc-300 text-zinc-600">
                    {truncatedDescription}
                    {description.length > maxDescriptionLength && (
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={handleReadMoreClick}
                        >
                            {showFullDescription ? 'Read less' : 'Read more'}
                        </button>
                    )}
                </div>
                <div>
                    <p className='dark:text-gray-200 text-gray-600'>
                        Available:{' '}
                        <span className={`font-semibold ${product?.quantity === 0 ? "text-red-500" : "text-green-500"}`}>
                            {product?.quantity === 0 ? "Out of stock" : "In stock"}
                        </span>
                    </p>
                    <p className='dark:text-gray-200 text-gray-600'>
                        Brand:{' '}
                        <span className='dark:text-white/85 text-black/65 font-semibold'>
                            {product?.brand}
                        </span>
                    </p>
                    <p className='dark:text-gray-200 text-gray-600'>
                        Category:{' '}
                        <span className='dark:text-white/85 text-black/65 font-semibold'>
                            {product?.category?.name}
                        </span>
                    </p>
                    <p className='dark:text-gray-200 text-gray-600'>
                        Seller:{' '}
                        <span className='dark:text-white/85 capitalize text-black/65 font-semibold'>
                            {product?.seller?.firstName} {' '} {product?.seller?.lastName}
                        </span>
                    </p>
                </div>
            </div>
            <hr />
            <div className='pt-5'>
                <div className='gap-5 flex justify-between items-center flex-wrap'>
                    <div className='flex items-center'>
                        <Button
                            className="bg-transparent font-semibold text-xl hover:dark:bg-[#ea580c] hover:bg-[#f97316] border dark:border-white border-black hover:dark:border-[#ea580c] hover:border-[#f97316] text-black dark:text-white rounded-br-none rounded-tr-none"
                            onClick={handleDec}>
                            -
                        </Button>
                        <Button className="text-xl font-semibold border border-black dark:border-white text-black dark:text-white border-l-transparent px-7 border-r-transparent bg-transparent hover:bg-transparent rounded-none">
                            {count}
                        </Button>
                        <Button
                            className="bg-transparent font-semibold text-xl hover:dark:bg-[#ea580c] hover:bg-[#f97316] border dark:border-white border-black hover:dark:border-[#ea580c] hover:border-[#f97316] text-black dark:text-white rounded-bl-none rounded-tl-none"
                            onClick={handleInc}>
                            +
                        </Button>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <Button 
                        disabled={product?.quantity === 0 ? true : false}
                        onClick={handleAddToCart}
                        className="px-7 text-lg text-white">
                            <ShoppingBasket className='w-6 h-6 me-2' />
                            Buy Now
                        </Button>
                        <Button
                            className="bg-transparent hover:bg-transparent border border-black dark:border-white"
                            onClick={toggleFavColor}>
                            {isWhislist ? <FaHeart className='w-6 h-6 text-red-500' /> : <Heart className='w-6 h-6 text-black/65 dark:text-white/85' />}
                        </Button>
                    </div>
                </div>
                <div className='flex gap-5 items-center pt-5'>
                    <Truck className='w-20 h-20' />
                    <div>
                        <h4 className='font-semibold text-lg'>{product?.price >= 500 ? "Free Delivery" : (<span><span className='text-green-500'>₹50{' '}</span>For Delivery</span>)}</h4>
                        <p className='text-sm text-justify'>For orders of 500rs or above, we offer free delivery. Orders below 500rs will incur a delivery charge of 50rs. Take advantage of this offer and enjoy convenient delivery options when you shop with us.</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default ProductDetails;
