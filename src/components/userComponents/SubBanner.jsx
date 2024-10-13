import React from 'react'
import BreadCrumbTwo from './BeadCrumTwo'
import banner from '../../assets/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera.jpg'


const SubBanner = ({title, href, page1, page2, color}) => {
    return (
        <div
            className='h-[70vh] grid place-items-center w-full bg-[image:var(--image-url)]'
            style={
                {
                    '--image-url': `url(${banner})`,
                    // backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                }
            }
        >
            <BreadCrumbTwo title={title} href={href} page1={page1} page2={page2} color={color}/>

        </div>
    )
}

export default SubBanner