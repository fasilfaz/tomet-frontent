import { ProductDetails, ProductImage, ProductImageSkeleton, TextLoading } from '@/components'
import { ReviewTab } from '@/components/userComponents/ReviewTab';
import { getProductById } from '@/redux/features/products/productSlice';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        dispatch(getProductById(id)).unwrap()
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(error => {
                setError(true);
                setLoading(false);
            })
    }, [id, dispatch]);

    return (
        loading ? (
            <section className='lg:container mx-auto lg:px-4 lg:pb-5'>
                <article className='py-5 overflow-hidden grid lg:grid-cols-2 gap-5 '>
                    <ProductImageSkeleton images={[1, 2, 3, 4]} />
                    <TextLoading counts={[1, 2, 3, 4, 5, 6,  7, 8, 8, 9]} />
                </article>
            </section>
        ) : (
            <section className='lg:container mx-auto lg:px-4 lg:pb-5'>
                <article className='pb-5 pt-0 overflow-hidden grid lg:grid-cols-2 gap-5 '>
                    <ProductImage images={product?.images} />
                    < ProductDetails product={product} />
                </article >
                <article>
                    <ReviewTab productId={id} product={product} />
                </article>
            </section >
        )
    )
}

export default ProductDetailsPage
