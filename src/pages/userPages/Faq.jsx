import { FaqAccordion, SubBanner } from '@/components';
import React from 'react';
import { Helmet } from 'react-helmet';

const FaqPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FAQ - Urban Nest Furniture | Answers to Common Questions About Our Products & Services</title>
        <meta name="description" content="Explore Urban Nest's FAQ for answers to common questions about our furniture products and services. Find information on shipping, returns, warranties, and more." />
        <meta name="keywords" content="urban nest faq, frequently asked questions, furniture product details, shipping information, return policy, warranty coverage" />
        <link rel="canonical" href="https://urban-nest-app.netlify.app/faq" />
      </Helmet>
      <SubBanner title={"Frequently Asked Questions"} href={'/'} page1={"Home"} page2={"FAQ"} color={"text-black"}/>
      <section className='container py-20'>
        <FaqAccordion />
      </section>
    </>
  )
}

export default FaqPage