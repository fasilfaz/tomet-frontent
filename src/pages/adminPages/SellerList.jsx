import { SellerTable } from '@/components'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const SellerListPage = () => {
  return (
    <div className="container py-5 w-full h-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Sellers - Urban Nest Furniture | Manage Seller Accounts</title>
        <meta name="description" content="Efficiently manage seller accounts with Urban Nest's admin panel. Monitor, review, and support furniture sellers to ensure a trusted and reliable marketplace experience." />
        <meta name="keywords" content="urban nest admin sellers, manage seller accounts, furniture e-commerce admin panel, seller management, seller support, marketplace administration" />
        <link rel="canonical" href="https://urban-nest-app.netlify.app/admin/sellers" />
      </Helmet>
      <Toaster />
      <SellerTable />
    </div>
  )
}

export default SellerListPage