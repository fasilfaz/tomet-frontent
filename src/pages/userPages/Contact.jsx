import { Helmet } from 'react-helmet'
import React from 'react'
import { ContactDetails, SubBanner } from '../../components'

const ContactPage = () => {
  return (
    <section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us - Tomet Clothing | Get in Touch for Support & Inquiries</title>
        <meta name="description" content="Contact Tomet Clothing for any inquiries or support needs. Reach out to us for assistance with your clothing purchases and fashion-related questions. We're here to help!" />
        <meta name="keywords" content="Tomet Clothing Contact Us, Fashion Support, Customer Service, Online Clothing Store, Fashion Questions, Contact Information" />
        <link rel="canonical" href="https://tomet-frontent.vercel.app/contact" />
      </Helmet>
      <SubBanner title={"Contact Us"} href={'/'} page1={"Home"} page2={"Contact"} color={"text-black"} />
      <section className='container py-5'>
        <ContactDetails />
      </section>
    </section>
  )
}

export default ContactPage