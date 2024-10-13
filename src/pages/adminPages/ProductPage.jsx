import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { getProductsForAdmin } from '@/redux/features/products/productSlice';
import { ProductTable } from '@/components';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [search, setSearch] = useState('');
  const pageSize = 6;
  const totalProducts = products.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsForAdmin({search, page}))
    .unwrap()
    .then(res => {
      setProducts(res.data);
      setTotalPages(res.pages);
    })
    .catch(err => console.log(err))
  }, [products, totalPages]);




  return (
    <div className="container py-5 w-full h-full ">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Admin Products - Tomet Clothing | Manage Product Inventory</title>
      <meta name="description" content="Efficiently manage product inventory with Tomet Clothing's admin panel. Update, organize, and showcase apparel products to enhance your online store's offerings." />
      <meta name="keywords" content="Tomet Clothing Admin Products, Manage Product Inventory, Fashion E-commerce Admin Panel, Product Updates, Inventory Management, Online Store Management" />
      <link rel="canonical" href="https://tomet-frontent.vercel.app/admin/products" />
    </Helmet>
    <Toaster />
    <ProductTable />
  </div>
  );
};

export default ProductListingPage;
