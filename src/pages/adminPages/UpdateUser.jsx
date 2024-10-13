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
        <title>Edit User - Urban Nest Furniture | Manage User Details</title>
        <meta name="description" content="Edit user details for Urban Nest furniture. Update profiles, preferences, and access permissions to maintain a seamless user experience on your e-commerce platform." />
        <meta name="keywords" content="urban nest edit user, manage user details, furniture e-commerce admin panel, user profile management, user account updates, online store administration" />
        <link rel="canonical" href={`https://urban-nest-app.netlify.app/admin/user/edit/${id}`} />
      </Helmet>
      <Toaster />
      <UserRoleUpdateForm userId={id} />
    </div>
  )
}

export default UserEdit