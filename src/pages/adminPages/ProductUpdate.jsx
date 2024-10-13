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
                <title>Update Product - Urban Nest Furniture | Edit Product Details</title>
                <meta name="description" content="Edit product details for Urban Nest furniture. Update descriptions, images, and specifications for the selected product to enhance your online store's offerings." />
                <meta name="keywords" content="urban nest update product, edit product details, furniture e-commerce admin panel, product management, furniture product update, online store updates" />
                <link rel="canonical" href={`https://urban-nest-app.netlify.app/admin/product-update/${id}`} />
            </Helmet>
            <Toaster />
            <UpdateProduct product={product} id={id} />
        </div>
    );
};

export default ProductUpdatePage;