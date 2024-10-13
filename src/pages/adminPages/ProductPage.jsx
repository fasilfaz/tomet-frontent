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
      <title>Admin Products - Urban Nest Furniture | Manage Product Inventory</title>
      <meta name="description" content="Efficiently manage product inventory with Urban Nest's admin panel. Update, organize, and showcase furniture products to enhance your online store's offerings." />
      <meta name="keywords" content="urban nest admin products, manage product inventory, furniture e-commerce admin panel, product updates, inventory management, online store management" />
      <link rel="canonical" href="https://urban-nest-app.netlify.app/admin/products" />
    </Helmet>
    <Toaster />
    <ProductTable />
  </div>
  );
};

export default ProductListingPage;
