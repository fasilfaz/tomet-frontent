import React from 'react'

const EmptyMessage = ({msg}) => {
  return (
    <div className="my-12 grid place-items-center px-2 md:my-24 md:px-0">
                <div className="lg:flex lg:items-center lg:space-x-10">
                    <img
                        src="https://res.cloudinary.com/freestyle07/image/upload/v1718628757/collecting-concept-illustration_elzdbi.png"
                        alt="question-mark"
                        className="h-[300px] w-auto"
                    />
                </div>
                <div className="mt-6 capitalize text-lg font-semibold">
                    {msg? msg : "NO PRODUCTS"}
                </div>
            </div>
  )
}

export default EmptyMessage