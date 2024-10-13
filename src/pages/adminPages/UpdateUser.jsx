import { UserRoleUpdateForm } from '@/components'
import React from 'react'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  return (
    <div className="container py-5 w-full h-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit User - Tomet Clothing | Manage User Details</title>
        <meta name="description" content="Edit user details for Tomet Clothing. Update profiles, preferences, and access permissions to maintain a seamless user experience on your fashion e-commerce platform." />
        <meta name="keywords" content="Tomet Clothing Edit User, Manage User Details, Fashion E-commerce Admin Panel, User Profile Management, User Account Updates, Online Store Administration" />
        <link rel="canonical" href={`https://tomet-frontent.vercel.app/admin/user/edit/${id}`} />
      </Helmet>
      <Toaster />
      <UserRoleUpdateForm userId={id} />
    </div>
  )
}

export default UserEdit