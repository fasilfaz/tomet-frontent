import React, { useState } from 'react';

const ProductImage = ({ images }) => {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <>
        {images && <article className="w-full h-[120vh] lg:h-[115vh] gap-5 grid grid-rows-12">
          <div className="h-full row-span-9">
            <img
              src={images[imgIndex]?.url}
              alt={`Product Image ${imgIndex + 1}`}
              className="object-cover bg-purple-50 h-full w-full"
            />
          </div>
          <div className="grid gap-5 grid-cols-12 row-span-3">
            {images?.map((img, i) => (
              <img
                src={img?.url}
                key={i}
                onClick={() => setImgIndex(i)}
                alt={`Thumbnail ${i + 1}`}
                className="object-cover bg-purple-50 col-span-3 h-full w-full cursor-pointer"
              />
            ))}
          </div>
        </article>}
    </>
  );
};

export default ProductImage;
