import { EmptyMessage, ProductCard, SubBanner } from '@/components';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

const Whislist = () => {
    const whislists = useSelector(state => state.whislists) || [];
    return (
        <section>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wishlist - Tomet Clothing | Save Your Favorite Styles</title>
                <meta name="description" content="Save your favorite styles to your wishlist with Tomet Clothing. Easily track and manage items you want to purchase later for a personalized shopping experience" />
                <meta name="keywords" content="Tomet Clothing Wishlist, Save Favorite Styles, Fashion E-commerce User Dashboard, Item Tracking, Personalized Shopping, Wishlist Management." />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/wishlist" />
            </Helmet>
            <SubBanner title={"Whislist"} href={'/'} page1={"Home"} page2={"Whislist"} color={"text-black"}/>
            <section className='container py-5'>

                {
                    whislists.length > 0 ?
                   ( <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <ProductCard products={whislists} />
                    </div>)
                    : <EmptyMessage msg={"Your Whislists is empty!"}/>
                }
            </section>
        </section>
    )
}

export default Whislist