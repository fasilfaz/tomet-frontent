import { UpdateProduct } from '@/components';
import { getProductById } from '@/redux/features/products/productSlice';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductUpdatePage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductById(id))
            .unwrap()
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="container py-5 w-full overflow-x-hidden h-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Update Product - Tomet Clothing | Edit Product Details</title>
                <meta name="description" content="Edit product details for Tomet Clothing. Update descriptions, images, and specifications for the selected apparel to enhance your online store's offerings." />
                <meta name="keywords" content="Tomet Clothing Update Product, Edit Product Details, Fashion E-commerce Admin Panel, Product Management, Apparel Product Update, Online Store Updates." />
                <link rel="canonical" href={`https://tomet-frontent.vercel.app/admin/product-update/${id}`} />
            </Helmet>
            <Toaster />
            <UpdateProduct product={product} id={id} />
        </div>
    );
};

export default ProductUpdatePage;