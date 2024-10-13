import { addToCart, removeFromCart } from '@/redux/features/carts/cartSlice';
import { Trash } from 'lucide-react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CartItems = ({cartItems}) => {
  const dispatch = useDispatch();
    const cartRemoveHandler = (id) => {
        dispatch(removeFromCart({ _id: id }));
      };
    
      const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
      };
  return (
    cartItems?.map((product) => (
        <div key={product._id} className="">
          <li className="flex py-6 sm:py-6">
            <div className="flex-shrink-0">
              <img
                src={product?.images[0]?.url}
                alt={product.name}
                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm">
                      <Link to={`/product/${product?._id}`} className="font-semibold">
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="mt-1 flex items-end">
                    <p className="text-sm font-medium">
                      ₹ {product.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <div className="mb-2 flex">
            <div className="w-24">
              <select
                className="w-full p-1 border border-orange-500 rounded bg-white dark:bg-gray-900"
                value={product.qty}
                onChange={(e) =>
                  addToCartHandler(product, Number(e.target.value))
                }
              >
                {[...Array(product.quantity).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-6 flex text-sm">
              <button
                type="button"
                className="flex items-center space-x-1 px-2 py-1 pl-0"
                onClick={() => cartRemoveHandler(product._id)}
              >
                <Trash size={12} className="text-red-500" />
                <span className="text-xs font-medium text-red-500">Remove</span>
              </button>
            </div>
          </div>
        </div>
      ))
  )
}

export default CartItems