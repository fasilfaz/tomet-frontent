import React from 'react';
import delivery from "@/assets/delivery.svg";
import support from "@/assets/support.svg";
import guarantee from "@/assets/guarantee.svg";
import { Card } from '../ui/card';

const HeroFooter = () => {
    return (
        <Card className='grid gap-5 md:grid-cols-3 py-5'>
            <div className='grid place-items-center'>
                <img src={delivery} alt="delivery truck image" />
                <h4 className='uppercase font-semibold text-lg'>FREE AND FAST DELIVERY</h4>
                <p className='text-sm'>Free delivery for all orders over 500rs</p>
            </div>
            <div className='grid place-items-center'>
                <img src={support} alt="support truck image" />
                <h4 className='uppercase font-semibold text-lg'>24/7 CUSTOMER SERVICE</h4>
                <p className='text-sm'>Friendly 24/7 customer support</p>
            </div>
            <div className='grid place-items-center'>
                <img src={guarantee} alt="guarantee truck image" />
                <h4 className='uppercase font-semibold text-lg'>MONEY BACK GUARANTEE</h4>
                <p className='text-sm'>We reurn money within 30 days</p>
            </div>
        </Card>
    )
}

export default HeroFooter
