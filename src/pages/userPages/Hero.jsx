import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { getLatestProduct, getTopProducts } from '@/redux/features/products/productSlice';
import { CardLoader, HeroFooter, ProductCard } from '@/components';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import "../../App.css"
import banner from "../../assets/happy-young-man-with-red-hair-shopping-stores-showing-thumbsup-holding-paper-bag-shoulde.jpg"
import banner2 from "../../assets/unrecognizable-woman-with-shopping-bags.jpg"
import banner3 from "../../assets/portrait-man-going-out-shopping-various-consumer-goods.jpg"
const Hero = () => {
    const [bestSeller, setBestSeller] = useState(null);
    const [newArrival, setNewArrival] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const topProducts = await dispatch(getTopProducts()).unwrap();
                setBestSeller(topProducts.data);
                const latestProducts = await dispatch(getLatestProduct()).unwrap();
                setNewArrival(latestProducts.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
                setError(true);
            }
        };

        fetchData();
    }, [dispatch]);
    return (
        <div className='pb-5'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Tomet Clothing - Quality cloths for Everyone | Shop Online</title>
                <meta name="description" content="Discover Tomet Clothing: Stylish and Quality Apparel for You. Explore Our Collection of Trendy Outfits Designed for Comfort and Fashion. Shop Now and Redefine Your Wardrobe!" />
                <meta name="keywords" content="Tomet Clothing: Shop Fashionable Apparel Online, Premium Clothing for Every Occasion, Casual Wear, Formal Outfits, Trendy Accessories, Activewear, and Stylish Footwear." />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/" />
            </Helmet>
            <div
                className="h-[70vh] grid place-items-center w-full bg-[image:var(--image-url-sm)] sm:bg-[image:var(--image-url-md)] xl:bg-[image:var(--image-url)]"
                style={{
                    '--image-url': `url(${banner})`,
                    '--image-url-md': `url(${banner2})`,
                    '--image-url-sm': `url(${banner3})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",

                }}
            >
                <div className="text-white text-right container">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-black">Transform Your Wardrobe with Tomet Clothing</h1>
                    <p className="text-sm font-medium sm:text-lg text-black">Find Stylish and Affordable Outfits to Make Your Wardrobe Stand Out and Uniquely You</p>
                   <Link to={'/shop'}>
                   <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6">
                        Explore Our Collection
                    </button>
                    </Link>
                </div>
            </div>
            <section className='container py-5 grid gap-5'>
                <article>
                    {loading ? (
                        <CardLoader skeletonItems={[1, 2, 3, 4]} />
                    ) : error ? (
                        <div>Error loading top products. Please try again later.</div>
                    ) : (
                        <div>
                            <h1 className='text-3xl font-bold pb-5 text-blue-600 dark:text-blue-600'>Top Products</h1>
                            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                                <ProductCard products={bestSeller} />
                            </div>
                            <div className='grid place-items-center pt-7'>
                                <Link to={'/shop'}>
                                    <Button className="px-7 bg-blue-600">
                                        View All Products
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </article>
                <article>

                    {loading ? (
                        <CardLoader skeletonItems={[1, 2, 3, 4, 5, 6, 7, 8]} />
                    ) : error ? (
                        <div>Error loading latest products. Please try again later.</div>
                    ) : (
                        <div>
                            <h1 className='text-3xl font-bold pb-5 text-blue-600 dark:text-blue-600'>New Arrivals</h1>
                            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                                <ProductCard products={newArrival} />
                            </div>
                            <div className='grid place-items-center pt-7'>
                                <Link to={'/shop'}>
                                    <Button className="px-7 bg-blue-600">
                                        View All Products
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                </article>
                <article className='my-5'>
                    <HeroFooter />
                </article>
            </section>
        </div>
    );
};

export default Hero;
