import SellerProductTable from '@/components/sellerComponents/SellerProductTable'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const SellerProductListPage = () => {
  return (
    <div className='container py-5'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Seller Products - Tomet Clothing | Manage Products</title>
        <meta name="description" content="Efficiently manage products with Tomet Clothing's seller dashboard. Add, update, and showcase apparel products to attract customers and enhance your online store's offerings." />
        <meta name="keywords" content="Tomet Clothing Seller Products, Manage Products, Fashion E-commerce Seller Dashboard, Product Management, Apparel Catalog, Online Store Management." />
        <link rel="canonical" href="https://tomet-frontent.vercel.app/seller/products" />
      </Helmet>
      <Toaster />
      <SellerProductTable />
    </div>
  )
}

export default SellerProductListPage