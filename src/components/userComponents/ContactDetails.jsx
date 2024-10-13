import { Facebook, Instagram, Mail, Phone, Twitter, X } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ContactDetails = () => {
    return (
        <div className='grid md:grid-cols-2 gap-5'>
            <div>

                <div className='pb-4'>
                    <div className='flex gap-5 pb-4 items-center'>
                        <Button className='rounded-full'><Phone className='w-4 h-4' /></Button>
                        <h2 className='text-lg font-semibold'>Call To Us</h2>
                    </div>
                    <div className='grid gap-2'>
                        <p className='text-md font-regular'>We are available 24/7, 7 days a week.</p>
                        <p className='text-md font-regular'>Phone: +8801611112222</p>
                    </div>
                </div>
                <hr />
                <div className='py-4'>
                    <div className='flex gap-5 pb-4 items-center'>
                        <Button className='rounded-full'><Mail className='w-4 h-4' /></Button>
                        <h2 className='text-lg font-semibold'>Write To US</h2>
                    </div>
                    <div className='grid gap-2'>
                        <p className='text-md font-regular'>Fill out our form and we will contact you within 24 hours.</p>
                        <p className='text-md font-regular'>
                            Email: <Link to="mailto:customer@exclusive.com" className='hover:underline hover:text-orange-500'>customer@exclusive.com</Link>
                        </p>
                        <p className='text-md font-regular'>
                            Email: <Link to="mailto:support@exclusive.com" className='hover:underline hover:text-orange-500 '>support@exclusive.com</Link>
                        </p>
                        <div className='flex items-center gap-5 pt-5'>
                            <Link to={"/"}><Facebook className='text-orange-500 hover:text-orange-400 transition' /></Link>
                            <Link to={"/"}><Instagram className='text-orange-500 hover:text-orange-400' /></Link>
                            <Link to={"/"}><Twitter className='text-orange-500 hover:text-orange-400' /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:flex hidden'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51862.54740672421!2d139.65141622101993!3d35.66692471554976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188cb2eb3108d1%3A0xf11cd9b2395b6677!2sShibuya%20City%2C%20Tokyo%2C%20Japan!5e0!3m2!1sen!2sin!4v1717073166695!5m2!1sen!2sin" width="100%" height="100%" className='border' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default ContactDetails