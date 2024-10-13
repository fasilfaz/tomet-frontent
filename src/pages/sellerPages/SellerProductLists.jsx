import SellerProductTable from '@/components/sellerComponents/SellerProductTable'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const SellerProductListPage = () => {
  return (
    <div className='container py-5'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Seller Products - Urban Nest Furniture | Manage Products</title>
        <meta name="description" content="Efficiently manage products with Urban Nest's seller dashboard. Add, update, and showcase furniture products to attract customers and enhance your online store's offerings." />
        <meta name="keywords" content="urban nest seller products, manage products, furniture e-commerce seller dashboard, product management, furniture catalog, online store management" />
        <link rel="canonical" href="https://urban-nest-app.netlify.app/seller/products" />
      </Helmet>
      <Toaster />
      <SellerProductTable />
    </div>
  )
}

export default SellerProductListPage