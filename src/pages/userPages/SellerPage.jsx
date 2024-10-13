import React from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { RequestBecomesAnSeller } from '@/redux/features/users/userSlice'

const SellerPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.users.isLoading);
    console.log(isLoading)

    const handleRequest = () => {
        dispatch(RequestBecomesAnSeller())
            .unwrap()
            .then(res => toast.success(res.message, { duration: 1000 }))
            .catch(err => toast.error(err, { duration: 1000 }))
    }
    return (
        <section className='container py-5'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Become a Seller - Tomet Clothing | Start Selling Your Fashion Products</title>
                <meta name="description" content="Join Tomet Clothing as a seller. Start selling your fashion products online. Sign up, list your items, and reach a wide audience of fashion enthusiast" />
                <meta name="keywords" content="Tomet Clothing Become a Seller, Start Selling Fashion Products, Fashion E-commerce Seller Registration, List Fashion Items, Reach Fashion Buyers" />
                <link rel="canonical" href="https://tomet-frontent.vercel.app/seller" />
            </Helmet>
            <div>
                <h1 className='text-center sm:text-4xl pb-2 text-2xl font-bold line-clamp-4'>Become a Seller<span className='sm:inline hidden'> of Tomet Clothing</span></h1>
                <h3 className='text-lg font-semibold'>Join Our Seller Community!</h3>
                <p className='text-justify'>
                    Are you looking to expand your reach and showcase your products to a wider audience? Our e-commerce platform offers you the perfect opportunity to do just that! Becoming a seller with us is straightforward but requires approval to ensure a seamless fit within our community and standards.
                </p>
                <div className='py-5'>
                    <h3 className='text-lg font-semibold'>Here’s how to start your journey as a seller:</h3>
                    <ul className='grid gap-5 px-5 pt-5 text-justify'>
                        <li className='list-decimal'>
                            <span className='font-semibold'>Click on 'Send a Request':</span> By clicking this button, you express your interest in becoming a seller. This action sends a notification to our admin team, who are responsible for reviewing and approving new sellers.
                        </li>
                        <li className='list-decimal'>
                            <span className='font-semibold'>Wait for Approval:</span> Once your request has been sent, our admin team will review your application. We look for potential sellers who align with our values and commitment to quality and service. This process ensures that our marketplace remains a trusted environment for both buyers and sellers.
                        </li>
                        <li className='list-decimal'>
                            <span className='font-semibold'>Check Your Inbox:</span> Keep an eye on your email inbox. We will contact you with the next steps once your request has been reviewed. Approval times can vary, but we strive to respond as quickly as possible.
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>Important to Note:</h3>
                    <ul className='grid gap-5 pt-5 px-5 text-justify'>
                        <li className='list-disc'>
                            The approval process is essential to maintain the quality of our marketplace and ensure that all sellers meet our guidelines.
                        </li>
                        <li className='list-disc'>
                            During the wait, consider preparing the details about your products, business model, and any questions you may have about selling on our platform.
                        </li>
                        <li className='list-disc'>
                            If you have any concerns or questions while waiting for approval, our support team is here to assist you. Feel free to reach out to us.
                        </li>
                    </ul>
                </div>
                <div className='grid py-5 place-items-center'>
                    <Button
                        onClick={handleRequest}
                        type={isLoading ? "button" : "submit"}
                        className="inline-flex w-full items-center justify-center rounded-md =px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray/80"
                    >
                        {isLoading ? (<>Sending Mail...<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Send a Request"}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default SellerPage