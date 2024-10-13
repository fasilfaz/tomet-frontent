import React from 'react';
import { HeroFooter, MemberCard, OurStory, SubBanner } from '@/components';
import { Helmet } from 'react-helmet';

const AboutPage = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>About Us - Tomet Clothing | Crafting Stylish and Sustainable Apparel</title>
                <meta
                    name="description"
                    content="Learn about Tomet Clothing, a leading provider of high-quality, stylish apparel. Discover our mission, values, and commitment to creating fashionable and eco-friendly clothing."
                />
                <meta
                    name="keywords"
                    content="Tomet Clothing, About Tomet, Sustainable Fashion, Eco-Friendly Apparel, Fashion Design, Clothing Craftsmanship."
                />
                <link rel="canonical" 
                // href="https://urban-nest-app.netlify.app/about"
                 />
            </Helmet>
            <SubBanner
                page1={'Home'}
                page2={"About"}
                color={"text-black"}
                href={'/'}
                title={"About Us"}
            />
            <div className="container py-5 grid gap-5">
                <OurStory />
                <article className='text-justify'>
                    <h1 className="text-4xl text-center font-bold mb-8 text-primary">Our Team</h1>
                    <MemberCard />
                </article>
                <HeroFooter />
            </div>
        </div>
    );
};

export default AboutPage;