import { FaqAccordion, SubBanner } from '@/components';
import React from 'react';
import { Helmet } from 'react-helmet';

const FaqPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FAQ - Tomet Clothing | Answers to Common Questions About Our Products & Services</title>
        <meta name="description" content="Explore Tomet Clothing's FAQ for answers to common questions about our apparel products and services. Find information on shipping, returns, warranties, and more" />
        <meta name="keywords" content="Tomet Clothing FAQ, Frequently Asked Questions, Apparel Product Details, Shipping Information, Return Policy, Warranty Coverage" />
        <link rel="canonical" href="https://tomet-frontent.vercel.app/faq" />
      </Helmet>
      <SubBanner title={"Frequently Asked Questions"} href={'/'} page1={"Home"} page2={"FAQ"} color={"text-black"}/>
      <section className='container py-20'>
        <FaqAccordion />
      </section>
    </>
  )
}

export default FaqPage