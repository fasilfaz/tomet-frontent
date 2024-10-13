import React from 'react';
import about from "@/assets/about.svg";

const OurStory = () => {
  return (
    <article className="grid lg:grid-cols-2 place-items-center gap-y-5 gap-x-10">
                <aside className='text-justify'>
                    <h1 className="text-4xl font-bold mb-8 text-primary">Our Story</h1>
                    <p className="mb-4">
                        UrbanNest was founded in 2015 with a mission to provide high-quality, stylish furniture for modern urban living. We believe that your home should be a reflection of your personal style and a haven of comfort.
                    </p>
                    <p className="mb-4">
                        Our team of designers and furniture experts have carefully curated a collection of pieces that combine timeless elegance with contemporary flair, all while maintaining a focus on functionality and durability.
                    </p>
                    <p className="mb-4">
                        What sets us apart is our commitment to sustainability and ethical sourcing. We work with responsible manufacturers who share our values and ensure that our products are made with environmentally-friendly materials and processes.
                    </p>
                    <p className="mb-4">
                        Over the years, we've grown to become a trusted brand among urban dwellers who appreciate quality, style, and a touch of eco-consciousness. Our customers have become a part of the UrbanNest family, and we're dedicated to providing them with an exceptional shopping experience, from the moment they discover our products to the day their furniture arrives at their doorstep.
                    </p>
                </aside>


                <aside>
                    <img src={about} alt="about" className="w-full h-full" />
                </aside>
            </article>
  )
}

export default OurStory
