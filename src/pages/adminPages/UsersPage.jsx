import { UserTable } from '@/components'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const UserListPage = () => {
  return (
    <div className="container py-5 w-full h-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Users - Urban Nest Furniture | Manage User Accounts</title>
        <meta name="description" content="Efficiently manage user accounts with Urban Nest's admin panel. Monitor, review, and support user activities to ensure a secure and seamless experience on your e-commerce platform." />
        <meta name="keywords" content="urban nest admin users, manage user accounts, furniture e-commerce admin panel, user management, user support, online store administration" />
        <link rel="canonical" href="https://urban-nest-app.netlify.app/admin/users" />
      </Helmet>
      <Toaster />
      <UserTable />
    </div>
  )
}

export default UserListPage