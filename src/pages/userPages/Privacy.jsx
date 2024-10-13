import { SubBanner } from '@/components';
import { Card } from '@/components/ui/card';
import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Privacy Policy - Urban Nest Furniture</title>
                <meta
                    name="description"
                    content="Learn about Urban Nest Furniture's privacy policy and how we collect, use, and protect your personal information. We are committed to respecting your privacy and safeguarding your data."
                />
                <meta
                    name="keywords"
                    content="urban nest furniture, privacy policy, data protection, personal information, online privacy, ecommerce privacy"
                />
                <link rel="canonical" href="https://urban-nest-app.netlify.app/privacy-policy" />
            </Helmet>
            <SubBanner
                page1={"Home"}
                page2={"Privacy Policy"}
                href={"/"}
                color={"text-black"}
                title={"Privacy and Policy"}
            />
            <div className="py-5 container">
                <Card className="p-5 cursor-pointer hover:scale-105 transition-all ease-linear delay-100">
                    <h2 className="text-2xl font-bold text-[#da4444] ">Information We Collect</h2>
                    <p className="mt-4 text-justify">
                        We collect information that you provide to us, such as your name, email address, and billing information, when you make a purchase on our website. We also collect information about your browsing and shopping behavior, such as the pages you visit and the items you add to your cart.
                    </p>
                </Card>
                <Card className="mt-8 p-5 cursor-pointer hover:scale-105 transition-all ease-linear delay-100">
                    <h2 className="text-2xl font-bold text-[#da4444]">How We Use Your Information</h2>
                    <p className="mt-4 text-justify">
                        We use the information we collect to process your orders, improve our website and products, and communicate with you about your purchases and any updates or special offers. We may also use your information for targeted advertising and to analyze customer trends.
                    </p>
                </Card>
                <Card className="mt-8 p-5 cursor-pointer hover:scale-105 transition-all ease-linear delay-100">
                    <h2 className="text-2xl font-bold text-[#da4444]">Sharing Your Information</h2>
                    <p className="mt-4 text-justify">
                        We may share your information with third-party service providers who help us with our business operations, such as fulfilling orders or processing payments. We may also share your information if required by law or to protect our rights and property.
                    </p>
                </Card>
                <Card className="mt-8 p-5 cursor-pointer hover:scale-105 transition-all ease-linear delay-100">
                    <h2 className="text-2xl font-bold text-[#da4444]">Data Security</h2>
                    <p className="mt-4 text-justify">
                        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no data transmission over the internet or electronic storage system is completely secure, and we cannot guarantee the absolute security of your information.
                    </p>
                </Card>
                <Card className="mt-8 p-5 cursor-pointer hover:scale-105 transition-all ease-linear delay-100">
                    <h2 className="text-2xl font-bold text-[#da4444]">Your Rights</h2>
                    <p className="mt-4 text-justify">
                        You have the right to access, correct, or delete the personal information we have about you. You can also opt-out of receiving marketing communications from us. If you have any questions or concerns about our privacy practices, please contact us at privacy@tometClothing.com.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default PrivacyPolicy;