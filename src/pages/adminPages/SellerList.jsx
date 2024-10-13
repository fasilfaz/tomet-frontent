import { SellerTable } from '@/components'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const SellerListPage = () => {
  return (
    <div className="container py-5 w-full h-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Sellers - Tomet Clothing | Manage Seller Accounts</title>
        <meta name="description" content="Efficiently manage seller accounts with Tomet Clothing's admin panel. Monitor, review, and support apparel sellers to ensure a trusted and reliable marketplace experience." />
        <meta name="keywords" content="Tomet Clothing Admin Sellers, Manage Seller Accounts, Fashion E-commerce Admin Panel, Seller Management, Seller Support, Marketplace Administration." />
        <link rel="canonical" href="https://tomet-frontent.vercel.app/admin/sellers" />
      </Helmet>
      <Toaster />
      <SellerTable />
    </div>
  )
}

export default SellerListPage