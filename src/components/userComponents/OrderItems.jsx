import React from 'react'

const OrderItems = ({orderItems}) => {
  return (
    orderItems?.map((product) => (
        <li
            key={product._id}
            className="flex items-stretch justify-between space-x-5 py-7"
        >
            <div className="flex flex-1 items-stretch">
                <div className="flex-shrink-0">
                    <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                        src={product.image?.url}
                        alt={product?.name}
                    />
                </div>

                <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-bold">{product?.name}</p>
                    </div>
                    <p className="mt-4 text-sm font-medium ">x {product?.qty}</p>
                </div>
            </div>
            <div className="ml-auto flex flex-col items-end justify-between">
                <p className="text-right text-sm font-bold">₹ {product?.price}</p>
            </div>
        </li>
    ))
  )
}

export default OrderItems