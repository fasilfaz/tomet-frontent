// import { SellerSidebar } from '@/components'
import { Header, SideBar } from '@/components';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const SellerLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  return (
    <div>
    <SideBar sidebarToggle={openSidebarToggle} setSidebarToggle={setOpenSidebarToggle} />
    <main className={`${openSidebarToggle ? "" : "md:ml-64"}`}>
      <Header sidebarToggle={openSidebarToggle} setSidebarToggle={setOpenSidebarToggle} />
      <Outlet />
    </main>
  </div>
  )
}

export default SellerLayout