import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const OrderSummary = ({cart}) => {
    return (
        cart && 
            <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md border lg:col-span-4 lg:mt-0 lg:p-0"
        >
            <h2
                id="summary-heading"
                className="px-4 py-3 text-lg font-medium sm:p-4"
            >
                Price Details
            </h2>
            <hr />
            <div>
                <dl className="space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Price ({cart?.cartItems?.length || 0} item)</dt>
                        <dd className="text-sm font-medium">₹ {cart?.itemsPrice}</dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <dt className="flex text-sm">
                            <span>Tax Price</span>
                        </dt>
                        <dd className="text-sm font-medium">₹ {cart.taxPrice}</dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <dt className="flex text-sm">
                            <span>Delivery Charges</span>
                        </dt>
                        <dd className={`text-sm font-medium ${cart?.totalPrice >= 500 ? "text-green-700" : ""}`}>{cart?.totalPrice >= 500 ? "Free" : `₹ ${cart.shippingPrice}`}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-dashed py-4">
                        <dt className="text-base font-medium">Total Amount</dt>
                        <dd className="text-base font-medium">₹ {cart?.totalPrice}</dd>
                    </div>
                    <div className='flex justify-center'>
                        <Link to={'/shipping'}>
                            <Button>
                                Proceed to checkout
                            </Button>
                        </Link>
                    </div>
                </dl>
            </div>
        </section>
    )
}

export default OrderSummary