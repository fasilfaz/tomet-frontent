import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BreadCrumbTwo = ({href, page1, page2, title, color}) => {
  return (
    <div className='items-center'>
        <h1 className='text-black font-semibold text-xl sm:text-4xl'>{title}</h1>
                <div className='flex justify-center items-center py-2'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to={href} className={` font-semibold text-lg ${color ? color : "text-black dark:text-white"}`}>{page1}</Link>
                        </BreadcrumbItem>
                        <ChevronRight className='mt-2'/>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-orange-700 font-semibold text-md sm:text-lg">{page2}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                </div>
            </div>
  )
}

export default BreadCrumbTwo