import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
  
const data = [
    {
        question: "How can I place an order?",
        answer: "You can place an order by browsing our collection, selecting the items you want, and adding them to your cart. Once you're ready, proceed to checkout and follow the steps to complete your purchase."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. You can choose your preferred payment method during checkout."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer international shipping to many countries worldwide. Shipping fees and delivery times may vary depending on your location. You can check the shipping options during checkout."
    },
    {
        question: "Can I track my order?",
        answer: "Yes, once your order is dispatched, you will receive a tracking number via email. You can use this tracking number to monitor the status of your delivery."
    },
    {
        question: "What if I receive damaged or defective items?",
        answer: "In the rare event that you receive damaged or defective items, please contact our customer support team immediately. We will arrange for a replacement or refund as per our return policy."
    },
    {
        question: "Do you offer assembly services for furniture?",
        answer: "Yes, we offer assembly services for select furniture items. You can opt for assembly services during checkout, and our team will arrange for professional assembly upon delivery."
    }
]

const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className='h-auto pt-2 sm:h-[61vh] md:h-[56vh]'>
  {data?.map((data, index) => (
    <AccordionItem key={index} value={`item-${index+1}`}>
    <AccordionTrigger className="hover:text-orange-500">{data.question}</AccordionTrigger>
    <AccordionContent>
      {data.answer}
    </AccordionContent>
  </AccordionItem>
  ))}
</Accordion>
  )
}

export default FaqAccordion;