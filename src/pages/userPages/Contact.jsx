import { Helmet } from 'react-helmet'
import React from 'react'
import { ContactDetails, SubBanner } from '../../components'

const ContactPage = () => {
  return (
    <section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us - Urban Nest Furniture | Get in Touch for Support & Inquiries</title>
        <meta name="description" content="Contact Urban Nest for any inquiries or support needs. Reach out to us for assistance with your furniture purchases and home decor questions. We're here to help!" />
        <meta name="keywords" content="urban nest contact us, furniture support, customer service, online furniture store, home decor questions, contact information" />
        <link rel="canonical" href="https://urban-nest-app.netlify.app/contact" />
      </Helmet>
      <SubBanner title={"Contact Us"} href={'/'} page1={"Home"} page2={"Contact"} color={"text-black"} />
      <section className='container py-5'>
        <ContactDetails />
      </section>
    </section>
  )
}

export default ContactPage