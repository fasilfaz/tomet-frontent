import React from 'react';
import about from "@/assets/about.svg";

const OurStory = () => {
  return (
    <article className="grid lg:grid-cols-2 place-items-center gap-y-5 gap-x-10">
                <aside className='text-justify'>
                    <h1 className="text-4xl font-bold mb-8 text-primary">Our Story</h1>
                    <p className="mb-4">
                    Tomet Clothing was founded with a mission to provide high-quality, stylish apparel for modern fashion enthusiasts. We believe that your wardrobe should be a reflection of your personal style and a source of confidence.
                    </p>
                    <p className="mb-4">
                    Our team of designers and fashion experts has carefully curated a collection of pieces that combine timeless elegance with contemporary style, all while maintaining a focus on comfort and quality
                    </p>
                    <p className="mb-4">
                    What sets us apart is our commitment to sustainability and ethical fashion. We collaborate with responsible manufacturers who share our values, ensuring that our clothing is made from environmentally-friendly materials and processes.
                    </p>
                    <p className="mb-4">
                    Over the years, we've grown to become a trusted brand among fashion enthusiasts who appreciate quality, style, and a commitment to sustainability. Our customers have become part of the Tomet family, and we're dedicated to providing them with an exceptional shopping experience, from the moment they discover our collections to the day their clothing arrives at their doorstep.
                    </p>
                </aside>


                <aside>
                    <img src={about} alt="about" className="w-full h-full" />
                </aside>
            </article>
  )
}

export default OurStory
