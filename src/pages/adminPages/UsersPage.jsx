import { UserTable } from '@/components'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const UserListPage = () => {
  return (
    <div className="container py-5 w-full h-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Users - Tomet Clothing | Manage User Accounts</title>
        <meta name="description" content="Efficiently manage user accounts with Tomet Clothing's admin panel. Monitor, review, and support user activities to ensure a secure and seamless experience on your fashion e-commerce platform." />
        <meta name="keywords" content="Tomet Clothing Admin Users, Manage User Accounts, Fashion E-commerce Admin Panel, User Management, User Support, Online Store Administration." />
        <link rel="canonical" href="https://tomet-frontent.vercel.app/admin/users" />
      </Helmet>
      <Toaster />
      <UserTable />
    </div>
  )
}

export default UserListPage