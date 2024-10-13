import { CartItems, EmptyMessage, OrderSummary } from '@/components';
import BreadCrumbTwo from '@/components/userComponents/BeadCrumTwo';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

export const CartPage = () => {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Your Cart - Tomet Clothing | Checkout & Complete Your Purchase</title>
                <meta name="description" content="View your shopping cart at Tomet Clothing. Review and finalize your apparel selections before completing your purchase. Shop stylish clothing conveniently online." />
                <meta name="keywords" content="Tomet Clothing Cart, View Shopping Cart, Complete Purchase Apparel, Online Clothing Store, Fashion Shopping, Clothing Checkout."/>
                <link rel="canonical" 
                href="
                //  https://urban-nest-app.netlify.app/cart
                " />

            </Helmet>

            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <div className='flex justify-start'>
                    <BreadCrumbTwo page1={"Home"} page2={"Cart"} href={'/'} />
                </div>
                <h1 className="text-3xl text-center font-bold tracking-tight sm:text-4xl">
                    Shopping Cart
                </h1>
                {cart.length === 0 || cartItems.length === 0 ? (<EmptyMessage msg={"your cart is empty"} />)
                    : (
                        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <section aria-labelledby="cart-heading" className="rounded-lg lg:col-span-8">
                                <h2 id="cart-heading" className="sr-only">
                                    Items in your shopping cart
                                </h2>
                                <ul role="list" className="divide-y divide-gray-200">
                                    <CartItems cartItems={cartItems} />
                                </ul>
                            </section>
                            {/* Order summary */}
                            <OrderSummary cart={cart} />
                        </form>
                    )}
            </div>
        </div>
    );
};
