import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Link } from 'react-router-dom'

const BreadCrumbThree = ({page1, page2, page3, href1, href2}) => {
  return (
    <Breadcrumb>
         <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to={href1}>{page1}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link to={href2}>{page2}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{page3}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbThree